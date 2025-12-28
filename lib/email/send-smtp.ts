import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { CustomerConfirmation } from './templates/CustomerConfirmation';
import { AdminNotification } from './templates/AdminNotification';
import type { LeadEmailData } from './types';

/**
 * Creates a nodemailer transporter based on environment variables
 * Supports multiple SMTP providers (Gmail, Outlook, custom SMTP)
 */
function createTransporter() {
  // Option 1: Gmail (kostenlos, aber benötigt App-Passwort)
  if (process.env.SMTP_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // App-Passwort, nicht normales Passwort!
      },
    });
  }

  // Option 2: Outlook/Hotmail (kostenlos)
  if (process.env.SMTP_SERVICE === 'outlook') {
    return nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Option 3: Custom SMTP (z.B. von deinem Hosting-Provider)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true für 465, false für andere Ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  throw new Error('SMTP nicht konfiguriert. Setze SMTP_SERVICE oder SMTP_HOST in .env.local');
}

/**
 * Sends confirmation email to customer using SMTP
 */
export async function sendCustomerConfirmationSMTP(
  data: LeadEmailData,
  siteUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.SMTP_FROM) {
      throw new Error('SMTP_FROM is not configured');
    }

    const transporter = createTransporter();

    const html = await render(
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

    // Plaintext version
    const text = `
August Meyer GmbH & Co. KG

Vielen Dank für Ihre Anfrage!

Sehr geehrte/r ${data.name},

wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.

Zusammenfassung Ihrer Anfrage:
Produkt: ${data.productName || 'Allgemeine Anfrage'}

${data.cartItems && data.cartItems.length > 0
  ? data.cartItems.map(item => `
Kategorie: ${item.categoryName}
${item.articleNumber ? `Artikelnummer: ${item.articleNumber}` : ''}
${item.quantity ? `Menge: ${item.quantity}${item.unit ? ` ${item.unit}` : ''}` : ''}
`).join('\n')
  : ''}

${data.message ? `Ihre Nachricht:\n${data.message}\n` : ''}

Kontakt:
August Meyer GmbH & Co. KG
Seibertstr. 5
35708 Haiger
Deutschland

Tel.: 0 27 73 / 50 80
Fax: 0 27 73 / 71 48 5
E-Mail: info@august-meyer.de

${siteUrl}/kontakt

---
Diese E-Mail wurde automatisch generiert.
    `.trim();

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Ihre Anfrage bei August Meyer – Bestätigung',
      html,
      text,
    });

    console.log('Customer confirmation email sent successfully:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending customer confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sends notification email to admin using SMTP
 */
export async function sendAdminNotificationSMTP(
  data: LeadEmailData,
  referrer?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.SMTP_FROM) {
      throw new Error('SMTP_FROM is not configured');
    }

    if (!process.env.MAIL_TO_ADMIN) {
      throw new Error('MAIL_TO_ADMIN is not configured');
    }

    const transporter = createTransporter();

    const html = await render(
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

    // Plaintext version
    const text = `
Neue Anfrage über Website

Kontaktdaten:
Name: ${data.name}
E-Mail: ${data.email}
${data.company ? `Unternehmen: ${data.company}` : ''}
${data.phone ? `Telefon: ${data.phone}` : ''}
${data.message ? `Nachricht: ${data.message}` : ''}

Produktinformationen:
Produkt: ${data.productName || 'Allgemeine Anfrage'}

${data.cartItems && data.cartItems.length > 0
  ? data.cartItems.map(item => `
Kategorie: ${item.categoryName}
${item.articleNumber ? `Artikelnummer: ${item.articleNumber}` : ''}
${item.quantity ? `Menge: ${item.quantity}${item.unit ? ` ${item.unit}` : ''}` : ''}
`).join('\n')
  : ''}

Metadaten:
Zeitstempel: ${new Date(data.timestamp).toLocaleString('de-DE')}
${referrer || data.referrer ? `Herkunft: ${referrer || data.referrer}` : ''}

---
Diese E-Mail wurde automatisch generiert.
Antworten Sie direkt auf diese E-Mail, um dem Kunden zu antworten.
    `.trim();

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.MAIL_TO_ADMIN,
      replyTo: data.email, // Reply-To setzen
      subject: `Neue Anfrage über Website – ${data.name}${data.company ? ` (${data.company})` : ''}`,
      html,
      text,
    });

    console.log('Admin notification email sent successfully:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sends both customer confirmation and admin notification using SMTP
 */
export async function sendLeadEmailsSMTP(
  data: LeadEmailData,
  siteUrl: string,
  referrer?: string
): Promise<{
  customerEmail: { success: boolean; error?: string };
  adminEmail: { success: boolean; error?: string };
}> {
  const [customerResult, adminResult] = await Promise.allSettled([
    sendCustomerConfirmationSMTP(data, siteUrl),
    sendAdminNotificationSMTP(data, referrer),
  ]);

  const customerEmail =
    customerResult.status === 'fulfilled'
      ? customerResult.value
      : { success: false, error: customerResult.reason?.message || 'Unknown error' };

  const adminEmail =
    adminResult.status === 'fulfilled'
      ? adminResult.value
      : { success: false, error: adminResult.reason?.message || 'Unknown error' };

  return { customerEmail, adminEmail };
}

