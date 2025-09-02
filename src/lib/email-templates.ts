interface LeadData {
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
  productSlug?: string;
  categorySlug?: string;
  timestamp: string;
}

export function generateLeadEmailHTML(data: LeadData): string {
  const productInfo = data.productSlug && data.categorySlug 
    ? `${data.categorySlug}/${data.productSlug}`
    : 'Allgemeine Anfrage';

  const telefonInfo = data.telefon || 'Nicht angegeben';

  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neue Lead-Anfrage - August Meyer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #003366 0%, #0066CC 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .lead-info {
            background-color: #f8f9fa;
            border-left: 4px solid #003366;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: bold;
            color: #003366;
            display: inline-block;
            width: 120px;
        }
        .field-value {
            color: #333;
        }
        .message-box {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        .cta-button {
            display: inline-block;
            background-color: #003366;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
        }
        .priority-high {
            background-color: #dc3545;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🚀 Neue Lead-Anfrage</h1>
            <p>August Meyer GmbH & Co KG</p>
        </div>

        <div class="priority-high">
            ⚡ SOFORTIGE BEARBEITUNG ERFORDERLICH
        </div>

        <div class="lead-info">
            <h2 style="color: #003366; margin-top: 0;">📋 Anfrage-Details</h2>
            
            <div class="field">
                <span class="field-label">👤 Name:</span>
                <span class="field-value">${data.name}</span>
            </div>
            
            <div class="field">
                <span class="field-label">📧 E-Mail:</span>
                <span class="field-value">${data.email}</span>
            </div>
            
            <div class="field">
                <span class="field-label">📞 Telefon:</span>
                <span class="field-value">${telefonInfo}</span>
            </div>
            
            <div class="field">
                <span class="field-label">🛍️ Produkt:</span>
                <span class="field-value">${productInfo}</span>
            </div>
            
            <div class="field">
                <span class="field-label">🕒 Zeitstempel:</span>
                <span class="field-value">${new Date(data.timestamp).toLocaleString('de-DE')}</span>
            </div>
        </div>

        <div class="message-box">
            <h3 style="color: #003366; margin-top: 0;">💬 Nachricht des Kunden</h3>
            <p style="margin: 0; white-space: pre-wrap;">${data.nachricht}</p>
        </div>

        <div style="text-align: center;">
            <a href="mailto:${data.email}" class="cta-button">
                📧 Direkt antworten
            </a>
        </div>

        <div class="footer">
            <p><strong>August Meyer GmbH & Co KG</strong></p>
            <p>Seibertstr. 5 | 35708 Haiger | Deutschland</p>
            <p>Telefon: 0 27 73 / 50 80 | E-Mail: info@august-meyer.de</p>
            <p style="margin-top: 15px; color: #999;">
                Diese E-Mail wurde automatisch generiert. Bitte antworten Sie direkt auf die E-Mail-Adresse des Kunden.
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();
}

export function generateLeadEmailText(data: LeadData): string {
  const productInfo = data.productSlug && data.categorySlug 
    ? `${data.categorySlug}/${data.productSlug}`
    : 'Allgemeine Anfrage';

  const telefonInfo = data.telefon || 'Nicht angegeben';

  return `
NEUE LEAD-ANFRAGE - AUGUST MEYER
================================

SOFORTIGE BEARBEITUNG ERFORDERLICH!

ANFRAGE-DETAILS:
----------------
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${telefonInfo}
Produkt: ${productInfo}
Zeitstempel: ${new Date(data.timestamp).toLocaleString('de-DE')}

NACHRICHT DES KUNDEN:
---------------------
${data.nachricht}

AKTIONEN:
---------
1. Direkt auf ${data.email} antworten
2. Kunde innerhalb von 24 Stunden kontaktieren
3. Angebot erstellen (falls erforderlich)
4. Lead in CRM-System eintragen

KONTAKT:
--------
August Meyer GmbH & Co KG
Seibertstr. 5
35708 Haiger
Deutschland

Telefon: 0 27 73 / 50 80
E-Mail: info@august-meyer.de

---
Diese E-Mail wurde automatisch generiert.
Bitte antworten Sie direkt auf die E-Mail-Adresse des Kunden.
  `.trim();
}

export function generateLeadEmailSubject(data: LeadData): string {
  if (data.productSlug && data.categorySlug) {
    return `🚀 NEUE ANFRAGE: ${data.productSlug} (${data.categorySlug}) - ${data.name}`;
  }
  return `🚀 NEUE ANFRAGE: Allgemein - ${data.name}`;
}
