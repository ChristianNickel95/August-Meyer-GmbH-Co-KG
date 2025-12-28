import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmails } from '@/lib/email/send';
import { sendLeadEmailsTest } from '@/lib/email/send-test';
import { sendLeadEmailsSMTP } from '@/lib/email/send-smtp';
import { sendLeadEmailsSendGrid } from '@/lib/email/send-sendgrid';
import type { LeadEmailData } from '@/lib/email/types';

interface LeadData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  productName: string;
  cartItems?: Array<{
    categoryId: string;
    categoryName: string;
    quantity: string;
    unit: string | null;
  }>;
  cartSummary?: string;
}

/**
 * Extracts article number from categoryName if present
 * Format: "Product Name (Art.-Nr.: 1234)" -> "1234"
 */
function extractArticleNumber(categoryName: string): string | undefined {
  const match = categoryName.match(/\(Art\.-Nr\.:\s*(\d+)\)/);
  return match ? match[1] : undefined;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LeadData = await request.json();
    
    // Validate required fields
    // Message is only required if no cart items are present
    const hasCartItems = body.cartItems && body.cartItems.length > 0;
    if (!body.name || !body.email || (!body.message && !hasCartItems)) {
      return NextResponse.json(
        { error: 'Fehlende Pflichtfelder' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    // Prepare email data with article numbers extracted
    const emailData: LeadEmailData = {
      name: body.name,
      email: body.email,
      company: body.company || undefined,
      phone: body.phone || undefined,
      message: body.message || undefined,
      productName: body.productName || 'Allgemeine Anfrage',
      cartItems: body.cartItems?.map(item => ({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        quantity: item.quantity,
        unit: item.unit,
        articleNumber: extractArticleNumber(item.categoryName),
      })),
      cartSummary: body.cartSummary,
      timestamp: new Date().toISOString(),
    };

    // Get site URL from environment or request
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
                    request.headers.get('origin') || 
                    'https://www.august-meyer.de';

    // Get referrer from request headers
    const referrer = request.headers.get('referer') || undefined;

    // Log the lead
    console.log('New lead received:', {
      name: body.name,
      email: body.email,
      company: body.company,
      productName: body.productName,
      timestamp: emailData.timestamp,
      ip: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      hasCartItems: hasCartItems,
      cartItemCount: body.cartItems?.length || 0,
    });

    // Send emails (non-blocking - we accept the lead even if emails fail)
    let emailErrors: string[] = [];
    
    // Determine email mode: SendGrid > SMTP > Resend > Test Mode
    const hasSendGrid = process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'SG.xxxxxxxxxxxxx';
    const hasSMTP = process.env.SMTP_SERVICE || process.env.SMTP_HOST;
    const hasResend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_xxxxxxxxxxxxx';
    const useTestMode = !hasSendGrid && !hasSMTP && !hasResend;
    
    if (useTestMode) {
      console.log('📧 Test-Modus aktiviert: E-Mails werden als HTML-Dateien gespeichert');
    } else if (hasSendGrid) {
      console.log('📧 SendGrid-Modus: E-Mails werden über SendGrid versendet');
    } else if (hasSMTP) {
      console.log('📧 SMTP-Modus: E-Mails werden über SMTP versendet');
    } else {
      console.log('📧 Resend-Modus: E-Mails werden über Resend versendet');
    }
    
    try {
      console.log('📧 Starte E-Mail-Versand...');
      let emailResults;
      if (useTestMode) {
        emailResults = await sendLeadEmailsTest(emailData, siteUrl, referrer);
      } else if (hasSendGrid) {
        emailResults = await sendLeadEmailsSendGrid(emailData, siteUrl, referrer);
      } else if (hasSMTP) {
        emailResults = await sendLeadEmailsSMTP(emailData, siteUrl, referrer);
      } else {
        emailResults = await sendLeadEmails(emailData, siteUrl, referrer);
      }
      
      console.log('📧 E-Mail-Ergebnisse:', {
        customer: emailResults.customerEmail.success ? '✅ Erfolgreich' : `❌ Fehler: ${emailResults.customerEmail.error}`,
        admin: emailResults.adminEmail.success ? '✅ Erfolgreich' : `❌ Fehler: ${emailResults.adminEmail.error}`,
      });
      
      if (!emailResults.customerEmail.success) {
        emailErrors.push(`Kunden-E-Mail: ${emailResults.customerEmail.error || 'Unbekannter Fehler'}`);
        console.error('❌ Failed to send customer confirmation email:', emailResults.customerEmail.error);
      } else if (useTestMode && 'filePath' in emailResults.customerEmail && emailResults.customerEmail.filePath) {
        console.log('✅ Kunden-E-Mail gespeichert:', emailResults.customerEmail.filePath);
      }
      
      if (!emailResults.adminEmail.success) {
        emailErrors.push(`Admin-E-Mail: ${emailResults.adminEmail.error || 'Unbekannter Fehler'}`);
        console.error('❌ Failed to send admin notification email:', emailResults.adminEmail.error);
      } else if (useTestMode && 'filePath' in emailResults.adminEmail && emailResults.adminEmail.filePath) {
        console.log('✅ Admin-E-Mail gespeichert:', emailResults.adminEmail.filePath);
      }
      
      if (emailErrors.length > 0) {
        console.warn('⚠️ Some emails failed to send, but lead was accepted:', emailErrors);
      } else {
        console.log('✅ Alle E-Mails erfolgreich verarbeitet');
      }
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('❌ Error sending emails (lead still accepted):', emailError);
      if (emailError instanceof Error) {
        console.error('Error details:', emailError.message, emailError.stack);
      }
      emailErrors.push('E-Mail-Versand fehlgeschlagen, aber Anfrage wurde gespeichert');
    }

    // Here you would typically also:
    // 1. Save to database
    // 2. Integrate with CRM system
    // 3. Additional logging/analytics

    return NextResponse.json(
      { 
        success: true, 
        message: 'Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.',
        leadId: `LEAD-${Date.now()}`,
        ...(emailErrors.length > 0 && {
          warning: 'Anfrage wurde gespeichert, aber E-Mail-Versand hatte Probleme'
        })
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing lead:', error);
    
    return NextResponse.json(
      { 
        error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' 
      },
      { status: 500 }
    );
  }
}
