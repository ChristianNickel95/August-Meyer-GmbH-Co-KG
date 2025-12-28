import { render } from '@react-email/render';
import { CustomerConfirmation } from './templates/CustomerConfirmation';
import { AdminNotification } from './templates/AdminNotification';
import { writeFileSync } from 'fs';
import { join } from 'path';
import type { LeadEmailData } from './types';

/**
 * Test mode: Saves emails as HTML files instead of sending them
 * Useful for testing without Resend API key
 */
export async function sendLeadEmailsTest(
  data: LeadEmailData,
  siteUrl: string,
  referrer?: string
): Promise<{
  customerEmail: { success: boolean; error?: string; filePath?: string };
  adminEmail: { success: boolean; error?: string; filePath?: string };
}> {
  try {
    // Render customer email
    const customerHtml = await render(
      CustomerConfirmation({
        name: data.name,
        productName: data.productName || 'Allgemeine Anfrage',
        cartItems: data.cartItems?.map(item => ({
          categoryName: item.categoryName,
          quantity: item.quantity,
          unit: item.unit,
          articleNumber: item.articleNumber,
        })),
        message: data.message || undefined,
        siteUrl: siteUrl,
      })
    );

    // Render admin email
    const adminHtml = await render(
      AdminNotification({
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        phone: data.phone || undefined,
        message: data.message || undefined,
        productName: data.productName || 'Allgemeine Anfrage',
        cartItems: data.cartItems,
        referrer: referrer || data.referrer || undefined,
        timestamp: data.timestamp,
      })
    );

    // Save to files
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const customerPath = join(process.cwd(), `email-preview-customer-${timestamp}.html`);
    const adminPath = join(process.cwd(), `email-preview-admin-${timestamp}.html`);

    writeFileSync(customerPath, customerHtml, 'utf-8');
    writeFileSync(adminPath, adminHtml, 'utf-8');

    console.log('✅ E-Mails als HTML-Dateien gespeichert:');
    console.log(`   Kunden-E-Mail: ${customerPath}`);
    console.log(`   Admin-E-Mail: ${adminPath}`);

    return {
      customerEmail: { success: true, filePath: customerPath },
      adminEmail: { success: true, filePath: adminPath },
    };
  } catch (error) {
    console.error('Error in test mode:', error);
    return {
      customerEmail: {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      adminEmail: {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

