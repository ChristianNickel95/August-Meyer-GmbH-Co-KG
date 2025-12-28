# Hetzner SMTP Setup - Schnellstart

## Warum Hetzner SMTP?

✅ **Kostenlos** - Im Hosting-Paket enthalten  
✅ **Direkt `info@august-meyer.de` als Absender** - Keine Domain-Verifizierung nötig  
✅ **DSGVO-konform** - Daten bleiben in Deutschland  
✅ **Keine Limits** - So viele E-Mails wie nötig  
✅ **Keine Umstellung nötig** - Funktioniert dauerhaft  

## Schritt 1: SMTP-Daten von Hetzner besorgen

Sie benötigen folgende Informationen von Ihrem Hetzner-Provider:

1. **SMTP-Host:** 
   - Meist: `smtp.your-server.de` oder `smtp.august-meyer.de`
   - Oder: `mail.august-meyer.de`
   - **Fragen Sie Ihren Provider nach dem genauen SMTP-Host!**

2. **SMTP-Port:**
   - Meist: `587` (STARTTLS) oder `465` (SSL)
   - Standard ist meist `587`

3. **E-Mail-Passwort:**
   - Das Passwort für `info@august-meyer.de`
   - Oft das gleiche wie für Webmail

## Schritt 2: .env.local konfigurieren

**Wichtig:** Entfernen Sie die Resend-Variablen und fügen Sie SMTP-Variablen hinzu:

```bash
# Hetzner SMTP Konfiguration
SMTP_HOST=smtp.your-server.de  # Vom Provider erhalten
SMTP_PORT=587                   # Meist 587 (STARTTLS) oder 465 (SSL)
SMTP_SECURE=false               # false für Port 587, true für Port 465
SMTP_USER=info@august-meyer.de
SMTP_PASSWORD=ihr_email_passwort
SMTP_FROM=August Meyer <info@august-meyer.de>
MAIL_TO_ADMIN=info@august-meyer.de

# Website URL
NEXT_PUBLIC_SITE_URL=http://test.august-meyer.de  # Für Test
# NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de  # Für Produktion
```

**Port-Konfiguration:**

**Port 587 (STARTTLS - empfohlen):**
```bash
SMTP_PORT=587
SMTP_SECURE=false
```

**Port 465 (SSL):**
```bash
SMTP_PORT=465
SMTP_SECURE=true
```

## Schritt 3: Resend-Variablen entfernen (optional)

Falls Sie Resend nicht mehr benötigen, können Sie diese Zeilen entfernen:
```bash
# RESEND_API_KEY=re_xxxxxxxxxxxxx  # Nicht mehr nötig
# MAIL_FROM=August Meyer <onboarding@resend.dev>  # Nicht mehr nötig
```

**Aber:** Sie können die Resend-Variablen auch drin lassen - das System verwendet automatisch SMTP, wenn `SMTP_HOST` gesetzt ist (Priorität: SendGrid > SMTP > Resend > Test).

## Schritt 4: Testen

1. **Dev-Server neu starten** (nach Änderung der `.env.local`)
2. **Kontaktformular ausfüllen** und absenden
3. **Prüfen Sie:**
   - Kunden-E-Mail kommt an (an die E-Mail-Adresse aus dem Formular)
   - Admin-E-Mail kommt an (an info@august-meyer.de)
   - Absender ist `info@august-meyer.de` ✅

## Fragen an Ihren Hetzner-Provider

Falls Sie die SMTP-Daten nicht kennen, fragen Sie:

> "Ich benötige die SMTP-Einstellungen für meine E-Mail-Adresse info@august-meyer.de:
> - SMTP-Host (z.B. smtp.your-server.de)
> - SMTP-Port (587 oder 465)
> - Benötige ich SSL/TLS? (STARTTLS oder SSL)
> - Ist das E-Mail-Passwort das gleiche wie für Webmail?"

## Troubleshooting

### "Connection timeout"
- Prüfen Sie, ob der SMTP-Host korrekt ist
- Prüfen Sie Firewall-Einstellungen
- Versuchen Sie Port 465 statt 587 (oder umgekehrt)

### "Authentication failed"
- Prüfen Sie Benutzername (`info@august-meyer.de`) und Passwort
- Stellen Sie sicher, dass die E-Mail-Adresse existiert
- Prüfen Sie, ob 2FA aktiviert ist (dann App-Passwort nötig)

### "E-Mails landen im Spam"
- SPF/DKIM/DMARC Records prüfen
- Hetzner sollte diese Records automatisch setzen
- Absender-Domain sollte mit SMTP-Domain übereinstimmen

## Vorteile gegenüber Resend

| Feature | Hetzner SMTP | Resend (Test-Domain) |
|---------|--------------|---------------------|
| Kosten | ✅ Kostenlos | ✅ Kostenlos (bis 3.000/Monat) |
| Absender | ✅ `info@august-meyer.de` | ⚠️ `onboarding@resend.dev` |
| Domain-Verifizierung | ✅ Nicht nötig | ❌ Nötig für eigene Domain |
| DSGVO | ✅ Deutschland | ✅ EU (aber externe Firma) |
| Limits | ✅ Keine | ⚠️ 3.000 E-Mails/Monat |
| Umstellung nötig | ✅ Nein | ⚠️ Nach 2 Monaten |

## Migration von Resend zu Hetzner SMTP

1. SMTP-Daten von Hetzner besorgen
2. `.env.local` aktualisieren (SMTP-Variablen setzen)
3. Dev-Server neu starten
4. Testen

**Das System erkennt automatisch SMTP und verwendet es statt Resend!**

Die Priorität ist: SendGrid > SMTP > Resend > Test-Modus

