import { NextResponse } from 'next/server';
import { sendLeadEmails } from '@/lib/email/send';
import type { LeadEmailData } from '@/lib/email/types';

/**
 * Test endpoint for E-Mail system
 * GET /api/lead/test
 * 
 * Sends test emails to verify the system is working correctly.
 * Only use in development!
 */
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Test endpoint not available in production' },
      { status: 403 }
    );
  }

  // Check if required ENV variables are set
  const missingVars: string[] = [];
  if (!process.env.RESEND_API_KEY) missingVars.push('RESEND_API_KEY');
  if (!process.env.MAIL_FROM) missingVars.push('MAIL_FROM');
  if (!process.env.MAIL_TO_ADMIN) missingVars.push('MAIL_TO_ADMIN');

  if (missingVars.length > 0) {
    return NextResponse.json(
      {
        error: 'Missing required environment variables',
        missing: missingVars,
        hint: 'Set these in .env.local',
      },
      { status: 500 }
    );
  }

  // Get test email from query parameter or use admin email
  const testEmail = process.env.TEST_EMAIL || process.env.MAIL_TO_ADMIN || 'test@example.com';

  // Create test data
  const testData: LeadEmailData = {
    name: 'Max Mustermann',
    email: testEmail, // Use test email for both customer and admin testing
    company: 'Test GmbH & Co. KG',
    phone: '0 27 73 / 50 80',
    message: 'Dies ist eine Test-Nachricht zur Überprüfung des E-Mail-Systems.',
    productName: 'Trikotputzlappen bunt',
    cartItems: [
      {
        categoryId: 'test-trikot-bunt',
        categoryName: 'Trikotputzlappen bunt (Art.-Nr.: 2222)',
        quantity: '360',
        unit: 'kg',
        articleNumber: '2222',
      },
      {
        categoryId: 'test-vliestuecher',
        categoryName: 'Vliestücher',
        quantity: '300',
        unit: 'kg',
      },
    ],
    timestamp: new Date().toISOString(),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
    const results = await sendLeadEmails(testData, siteUrl, 'http://localhost:3000/kontakt');

    return NextResponse.json({
      success: true,
      message: 'Test emails sent',
      results: {
        customerEmail: {
          success: results.customerEmail.success,
          error: results.customerEmail.error,
        },
        adminEmail: {
          success: results.adminEmail.success,
          error: results.adminEmail.error,
        },
      },
      testData: {
        ...testData,
        email: '***masked***', // Don't expose email in response
      },
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      {
        error: 'Failed to send test emails',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

