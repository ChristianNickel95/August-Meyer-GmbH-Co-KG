# Hetzner SMTP Konfiguration

## Übersicht

Wenn dein Hosting bei Hetzner liegt, kannst du den Hetzner SMTP-Server verwenden. Das hat den Vorteil, dass alle Daten in Deutschland bleiben und du volle Kontrolle hast.

## Setup

### 1. SMTP-Daten von Hetzner ermitteln

Die SMTP-Daten findest du normalerweise in deinem Hetzner-Kundenpanel:

**Typische Hetzner SMTP-Einstellungen:**
- **Host:** `smtp.your-server.de` oder `smtp.your-domain.de`
- **Port:** `587` (STARTTLS) oder `465` (SSL)
- **Benutzername:** Deine E-Mail-Adresse (z.B. `info@august-meyer.de`)
- **Passwort:** Dein E-Mail-Passwort (oft das gleiche wie für Webmail)

**Alternative:** Wenn du einen Hetzner Managed Server hast, kann der SMTP-Host auch anders sein. Prüfe in deinem Hetzner-Kundenpanel unter "E-Mail" oder "SMTP-Einstellungen".

### 2. .env.local konfigurieren

```bash
# Hetzner SMTP Konfiguration
SMTP_HOST=smtp.your-server.de
SMTP_PORT=587
SMTP_SECURE=false  # true für Port 465 (SSL), false für Port 587 (STARTTLS)
SMTP_USER=info@august-meyer.de
SMTP_PASSWORD=dein_email_passwort
SMTP_FROM=August Meyer <info@august-meyer.de>
MAIL_TO_ADMIN=info@august-meyer.de
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

### 3. Port-Konfiguration

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

### 4. Testen

1. Dev-Server neu starten (nach Änderung der `.env.local`)
2. Kontaktformular ausfüllen und absenden
3. Prüfe, ob E-Mails ankommen

## Vorteile von Hetzner SMTP

✅ **Daten bleiben in Deutschland** - Beste DSGVO-Konformität  
✅ **Kostenlos** - Im Hosting-Paket enthalten  
✅ **Keine Limits** - So viele E-Mails wie nötig  
✅ **Volle Kontrolle** - Keine Abhängigkeit von Drittanbietern  
✅ **Professionell** - Eigene Domain im Absender  

## Troubleshooting

### "Connection timeout"
- Prüfe, ob der SMTP-Host korrekt ist
- Prüfe Firewall-Einstellungen
- Versuche Port 465 statt 587 (oder umgekehrt)

### "Authentication failed"
- Prüfe Benutzername und Passwort
- Stelle sicher, dass die E-Mail-Adresse existiert
- Prüfe, ob 2FA aktiviert ist (dann App-Passwort nötig)

### "E-Mails landen im Spam"
- SPF/DKIM/DMARC Records prüfen
- Absender-Domain sollte mit SMTP-Domain übereinstimmen
- Hetzner sollte diese Records automatisch setzen

## Migration von Resend zu Hetzner SMTP

1. SMTP-Daten von Hetzner besorgen
2. `.env.local` aktualisieren (SMTP-Variablen setzen, Resend-Variablen entfernen)
3. Dev-Server neu starten
4. Testen

Das System erkennt automatisch SMTP und verwendet es statt Resend.

