# E-Mail-System Dokumentation

## Übersicht

Dieses E-Mail-System sendet automatisch Bestätigungs-E-Mails an Kunden und Benachrichtigungs-E-Mails an Administratoren nach erfolgreicher Anfrage über das Lead-Formular.

## DSGVO-Konformität

**Wichtig für DSGVO-Konformität:**
- ✅ **Resend** (empfohlen): EU-Server, DSGVO-konform, kostenlos bis 3.000 E-Mails/Monat
- ✅ **Eigener SMTP** (Hosting-Provider): Beste Option wenn Server in Deutschland/EU
- ⚠️ **Gmail/Outlook SMTP**: Nicht DSGVO-konform (US-Server, Schrems II Problem)
- ✅ **SendGrid/Mailgun**: EU-Server möglich, DSGVO-konform

**Empfehlung:** Verwende Resend oder SMTP deines deutschen Hosting-Providers.

## Umgebungsvariablen

Folgende Umgebungsvariablen müssen in `.env.local` (lokal) oder in den Vercel Environment Variables (Produktion) gesetzt werden:

### Option 1: SMTP (kostenlos - empfohlen für Tests)

**Mit Outlook/Hotmail (kostenlos):**
```bash
SMTP_SERVICE=outlook
SMTP_FROM=August Meyer <deine-email@hotmail.com>
SMTP_USER=deine-email@hotmail.com
SMTP_PASSWORD=dein_passwort
MAIL_TO_ADMIN=deine-email@hotmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Mit Gmail (kostenlos, benötigt App-Passwort):**
```bash
SMTP_SERVICE=gmail
SMTP_FROM=August Meyer <deine-email@gmail.com>
SMTP_USER=deine-email@gmail.com
SMTP_PASSWORD=dein_app_passwort  # Nicht normales Passwort!
MAIL_TO_ADMIN=deine-email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Mit Custom SMTP (z.B. von Hosting-Provider):**
```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=deine-email@example.com
SMTP_PASSWORD=dein_passwort
SMTP_FROM=August Meyer <deine-email@example.com>
MAIL_TO_ADMIN=deine-email@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Option 2: SendGrid (kostenlos bis 100 E-Mails/Tag = ~3.000/Monat) ⭐

```bash
# SendGrid API Key (von https://app.sendgrid.com/settings/api_keys)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Absender-E-Mail-Adresse (muss in SendGrid verifiziert sein)
MAIL_FROM=August Meyer <no-reply@august-meyer.de>

# Empfänger für Admin-Benachrichtigungen
MAIL_TO_ADMIN=info@august-meyer.de

# Öffentliche URL der Website (für Links in E-Mails)
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

**Setup:**
1. Account auf https://sendgrid.com erstellen
2. API Key erstellen (Settings → API Keys)
3. Domain verifizieren (Settings → Sender Authentication)
4. In `.env.local` eintragen

---

### Option 3: Resend (kostenlos bis 3.000 E-Mails/Monat) ⭐ Empfohlen

**Wichtig:** Resend sendet automatisch **beide E-Mails**:
- ✅ **Bestätigungs-E-Mail an den Kunden** (an die E-Mail-Adresse aus dem Formular)
- ✅ **Benachrichtigungs-E-Mail an August-Meyer** (an `MAIL_TO_ADMIN`)

```bash
# Resend API Key (von https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Absender-E-Mail-Adresse (muss in Resend verifiziert sein)
MAIL_FROM=August Meyer <no-reply@august-meyer.de>

# Empfänger für Admin-Benachrichtigungen (wird automatisch benachrichtigt)
MAIL_TO_ADMIN=info@august-meyer.de

# Öffentliche URL der Website (für Links in E-Mails)
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

**Hinweis:** Das System verwendet automatisch SendGrid (wenn gesetzt), sonst SMTP, sonst Resend, sonst Test-Modus.

### Optional

```bash
# Falls nicht gesetzt, wird automatisch aus Request-Headers ermittelt
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

## Setup

### 1. Resend Account erstellen

1. Gehe zu https://resend.com
2. Erstelle einen kostenlosen Account (3.000 E-Mails/Monat kostenlos)
3. Gehe zu "API Keys" → "Create API Key"
4. Kopiere den API Key in `RESEND_API_KEY` in deiner `.env.local`

### 2. Domain verifizieren (für Produktion)

**Für Produktion (empfohlen):**
1. In Resend: "Domains" → "Add Domain"
2. Füge deine Domain hinzu (z.B. `august-meyer.de`)
3. Folge den DNS-Anweisungen zur Verifizierung (TXT und MX Records)
4. Verwende die verifizierte Domain in `MAIL_FROM`:
   ```bash
   MAIL_FROM=August Meyer <no-reply@august-meyer.de>
   ```

### 3. Test-Domain (für Entwicklung/Testing)

**Für schnelles Testen ohne Domain-Verifizierung:**
Resend bietet eine Test-Domain (`onboarding.resend.dev`), die sofort funktioniert:

```bash
MAIL_FROM=August Meyer <onboarding@resend.dev>
```

**Wichtig:** 
- ✅ E-Mails werden **beide gesendet** (Kunde + Admin)
- ⚠️ E-Mails von der Test-Domain landen möglicherweise im Spam-Ordner
- ✅ Für Produktion sollte die eigene Domain verifiziert werden

### 4. Was wird automatisch gesendet?

Bei jeder Anfrage über das Kontaktformular werden **automatisch 2 E-Mails** versendet:

1. **Kunden-Bestätigung** → Geht an die E-Mail-Adresse des Kunden
   - Bestätigt den Erhalt der Anfrage
   - Enthält Zusammenfassung der Anfrage
   - Professionelles Design

2. **Admin-Benachrichtigung** → Geht an `MAIL_TO_ADMIN`
   - Enthält alle Kontaktdaten des Kunden
   - Enthält alle Produktanfragen
   - `Reply-To` ist auf Kunden-E-Mail gesetzt (direktes Antworten möglich)

### 4. Hetzner SMTP (für später - wenn Hosting bei Hetzner)

Wenn du später auf Hetzner SMTP umstellen möchtest (da Hosting bei Hetzner):

```bash
# Hetzner SMTP Konfiguration
SMTP_HOST=smtp.your-server.de  # Oder smtp.your-domain.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=deine-email@deine-domain.de
SMTP_PASSWORD=dein_smtp_passwort
SMTP_FROM=August Meyer <deine-email@deine-domain.de>
MAIL_TO_ADMIN=info@august-meyer.de
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

**Hetzner SMTP Details:**
- Host: `smtp.your-server.de` oder `smtp.your-domain.de` (je nach Hetzner-Konfiguration)
- Port: `587` (STARTTLS) oder `465` (SSL) - dann `SMTP_SECURE=true`
- Authentifizierung: E-Mail-Adresse + Passwort (oft das gleiche wie für Webmail)
- Vorteil: Daten bleiben in Deutschland, volle Kontrolle

**Umstellung:** Einfach die ENV-Variablen ändern, das System erkennt automatisch SMTP.

## Lokales Testen

### Option 1: Test-Endpoint (empfohlen)

Erstelle eine Test-Route `app/api/lead/test/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { sendLeadEmails } from '@/lib/email/send';
import type { LeadEmailData } from '@/lib/email/types';

export async function GET() {
  const testData: LeadEmailData = {
    name: 'Max Mustermann',
    email: 'test@example.com',
    company: 'Test GmbH',
    phone: '0123456789',
    message: 'Dies ist eine Test-Nachricht',
    productName: 'Trikotputzlappen bunt',
    cartItems: [
      {
        categoryId: 'test-1',
        categoryName: 'Trikotputzlappen bunt (Art.-Nr.: 2222)',
        quantity: '360',
        unit: 'kg',
        articleNumber: '2222',
      },
    ],
    timestamp: new Date().toISOString(),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const results = await sendLeadEmails(testData, siteUrl);
  
  return NextResponse.json({
    success: true,
    customerEmail: results.customerEmail,
    adminEmail: results.adminEmail,
  });
}
```

Dann aufrufen: `http://localhost:3000/api/lead/test`

### Option 2: Direktes Testen über Lead-Formular

1. Starte den Dev-Server: `npm run dev`
2. Fülle das Lead-Formular auf der Kontaktseite oder Produktseite aus
3. Sende die Anfrage ab
4. Prüfe die E-Mail-Postfächer (Kunde und Admin)

### Option 3: Preview HTML (optional)

Erstelle `scripts/preview-email.ts`:

```typescript
import { render } from '@react-email/render';
import { CustomerConfirmation } from '../lib/email/templates/CustomerConfirmation';
import { writeFileSync } from 'fs';
import { join } from 'path';

const html = await render(
  CustomerConfirmation({
    name: 'Max Mustermann',
    productName: 'Trikotputzlappen bunt',
    cartItems: [
      {
        categoryName: 'Trikotputzlappen bunt (Art.-Nr.: 2222)',
        quantity: '360',
        unit: 'kg',
        articleNumber: '2222',
      },
    ],
    message: 'Test-Nachricht',
    siteUrl: 'https://www.august-meyer.de',
  })
);

writeFileSync(join(process.cwd(), 'preview-customer-email.html'), html);
console.log('Preview saved to preview-customer-email.html');
```

## Fehlerbehandlung

Das System ist so konzipiert, dass Anfragen auch dann akzeptiert werden, wenn der E-Mail-Versand fehlschlägt:

- **Kunden-E-Mail fehlgeschlagen:** Anfrage wird trotzdem gespeichert, Fehler wird geloggt
- **Admin-E-Mail fehlgeschlagen:** Anfrage wird trotzdem gespeichert, Fehler wird geloggt
- **Beide E-Mails fehlgeschlagen:** Anfrage wird trotzdem gespeichert, beide Fehler werden geloggt

Fehler werden in den Server-Logs ausgegeben und können in Vercel unter "Logs" eingesehen werden.

## E-Mail-Templates

### Kunden-Bestätigung (`CustomerConfirmation.tsx`)

- **Betreff:** "Ihre Anfrage bei August Meyer – Bestätigung"
- **Inhalt:**
  - Dankesnachricht
  - Zusammenfassung der Anfrage (Produkt, Artikelnummer, Menge, Verpackung)
  - Kontaktdaten August Meyer
  - CTA-Button "Kontakt aufnehmen"
  - Automatisch generiert Hinweis

### Admin-Benachrichtigung (`AdminNotification.tsx`)

- **Betreff:** "Neue Anfrage über Website – {Name} ({Firma})"
- **Inhalt:**
  - Alle Kontaktdaten strukturiert
  - Produktinformationen
  - Metadaten (Zeitstempel, Herkunft)
  - Reply-To auf Kunden-E-Mail gesetzt

## Design

Die E-Mails verwenden ein konsistentes, modernes Corporate Layout:

- **Hintergrund:** Dark Blue (`#0b1a33`)
- **Karten:** Secondary Background (`#13294b`)
- **Akzentfarbe:** Siemens-Grün (`#00ffb3`)
- **Text:** Weiß (`#ffffff`) und Light Gray (`#c7d2e0`)
- **Border-Radius:** Minimal (2px)
- **Responsive:** Max-width 600px, mobile-optimiert

## Troubleshooting

### E-Mails kommen nicht an

1. **Prüfe Resend Dashboard:** Gehe zu "Emails" in Resend und prüfe den Status
2. **Prüfe Spam-Ordner:** Besonders bei Test-Domain
3. **Prüfe Logs:** Server-Logs zeigen Fehlerdetails
4. **Prüfe ENV-Variablen:** Stelle sicher, dass alle Variablen gesetzt sind

### "RESEND_API_KEY is not configured"

- Stelle sicher, dass `RESEND_API_KEY` in `.env.local` gesetzt ist
- Nach Änderung der ENV-Variablen: Dev-Server neu starten

### "MAIL_FROM is not configured"

- Stelle sicher, dass `MAIL_FROM` in `.env.local` gesetzt ist
- Format: `"Name <email@domain.com>"` oder `"email@domain.com"`

### E-Mails landen im Spam

- Verwende eine verifizierte Domain (nicht Test-Domain)
- Prüfe SPF/DKIM/DMARC Einstellungen in Resend
- Verwende eine professionelle Absender-Adresse

## Produktions-Checkliste

- [ ] Resend Account erstellt
- [ ] Domain in Resend verifiziert
- [ ] Alle ENV-Variablen in Vercel gesetzt
- [ ] Test-E-Mail erfolgreich versendet
- [ ] Kunden-E-Mail wird empfangen
- [ ] Admin-E-Mail wird empfangen
- [ ] Reply-To funktioniert (Antworten an Kunde)

