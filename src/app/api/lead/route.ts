import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { 
  generateLeadEmailHTML, 
  generateLeadEmailText, 
  generateLeadEmailSubject 
} from '@/lib/email-templates';

// Einfaches In-Memory Rate Limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface LeadData {
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
  datenschutz: boolean;
  website: string;
  productSlug?: string;
  categorySlug?: string;
  timestamp: string;
}

function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0] || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    // Neue Rate Limit Periode
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 Minute
    return true;
  }
  
  if (limit.count >= 1) { // Max 1 Request pro Minute
    return false;
  }
  
  limit.count++;
  return true;
}

function validateLeadData(data: LeadData): { isValid: boolean; error?: string } {
  // Pflichtfelder prüfen
  if (!data.name?.trim()) {
    return { isValid: false, error: 'Name ist erforderlich' };
  }
  
  if (!data.email?.trim()) {
    return { isValid: false, error: 'E-Mail ist erforderlich' };
  }
  
  // E-Mail-Format prüfen
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: 'Ungültige E-Mail-Adresse' };
  }
  
  // Nachrichtlänge prüfen
  if (!data.nachricht?.trim() || data.nachricht.trim().length < 20) {
    return { isValid: false, error: 'Nachricht muss mindestens 20 Zeichen lang sein' };
  }
  
  // Datenschutz prüfen
  if (!data.datenschutz) {
    return { isValid: false, error: 'Datenschutzerklärung muss akzeptiert werden' };
  }
  
  // Honeypot prüfen
  if (data.website?.trim()) {
    return { isValid: false, error: 'Ungültige Eingabe' };
  }
  
  return { isValid: true };
}

async function sendEmail(data: LeadData): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.log('RESEND_API_KEY nicht gesetzt - E-Mail wird nicht gesendet');
    return;
  }
  
  try {
    // Resend-Client nur initialisieren, wenn API-Key vorhanden
    const resend = new Resend(resendApiKey);
    
    // E-Mail-Adressen aus Environment-Variablen oder Standardwerte
    const fromEmail = process.env.FROM_EMAIL || 'noreply@august-meyer.de';
    const toEmail = process.env.TO_EMAIL || 'vertrieb@august-meyer.de';
    
    // E-Mail-Templates generieren
    const subject = generateLeadEmailSubject(data);
    const htmlContent = generateLeadEmailHTML(data);
    const textContent = generateLeadEmailText(data);
    
    // E-Mail über Resend versenden
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: subject,
      text: textContent,
      html: htmlContent,
      replyTo: data.email, // Direkte Antwort an den Kunden
    });

    if (error) {
      console.error('Fehler beim E-Mail-Versand über Resend:', error);
      throw new Error('E-Mail-Versand fehlgeschlagen');
    }

    console.log('E-Mail erfolgreich versendet:', {
      to: toEmail,
      subject: subject,
      replyTo: data.email,
      messageId: emailData?.id
    });
    
  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error);
    // Wir werfen den Fehler nicht weiter, da der Lead trotzdem gespeichert werden soll
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting prüfen
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warten Sie eine Minute.' },
        { status: 429 }
      );
    }
    
    // Request Body parsen
    const body = await request.json();
    const leadData: LeadData = body;
    
    // Validierung
    const validation = validateLeadData(leadData);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // Lead-Daten loggen
    console.log('Neue Lead-Anfrage:', {
      name: leadData.name,
      email: leadData.email,
      product: leadData.productSlug ? `${leadData.categorySlug}/${leadData.productSlug}` : 'Allgemein',
      timestamp: new Date().toISOString(),
      ip: clientIP
    });
    
    // E-Mail versenden (optional)
    await sendEmail(leadData);
    
    // Erfolg zurückgeben
    return NextResponse.json({ ok: true });
    
  } catch (error) {
    console.error('Fehler bei Lead-API:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    );
  }
}
