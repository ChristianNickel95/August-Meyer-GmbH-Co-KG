# Resend Domain-Verifizierung - Schritt für Schritt

## Übersicht

Um `no-reply@august-meyer.de` als Absender zu verwenden, muss die Domain `august-meyer.de` bei Resend verifiziert werden. Dazu müssen DNS-Einträge bei Ihrem Domain-Provider hinzugefügt werden.

## Schritt 1: DNS-Einträge in Resend abrufen

1. Gehen Sie zu https://resend.com
2. Loggen Sie sich ein
3. Gehen Sie zu **"Domains"** im Menü
4. Klicken Sie auf die Domain **"august-meyer.de"**
5. Sie sehen jetzt die benötigten DNS-Einträge:
   - **Domain Verification (DKIM)**: Ein TXT-Eintrag
   - **Enable Sending (SPF)**: Wird automatisch aktiviert

## Schritt 2: DNS-Einträge bei Hetzner hinzufügen

### Option A: Über Hetzner Konsole (Web-Interface)

1. **Hetzner Konsole öffnen:**
   - Gehen Sie zu https://console.hetzner.cloud oder https://www.hetzner.com
   - Loggen Sie sich in Ihr Hetzner-Kundenpanel ein

2. **DNS-Verwaltung finden:**
   - Suchen Sie nach "DNS" oder "Domain-Verwaltung"
   - Oder gehen Sie zu "Server" → Ihr Server → "DNS" / "Domain"

3. **TXT-Eintrag hinzufügen:**
   - Klicken Sie auf "DNS-Einträge" oder "DNS Records"
   - Klicken Sie auf "Neuer Eintrag" oder "Add Record"
   - Wählen Sie **Typ: TXT**
   - **Name:** `resend._domainkey` (oder wie in Resend angegeben)
   - **Wert/Content:** Den kompletten Wert aus Resend kopieren (beginnt mit `p=MIGfMA0GCSqGSIb3DQEB...`)
   - **TTL:** 3600 (oder Auto/Standard)
   - Speichern

### Option B: Über SSH (wenn Sie direkten Server-Zugriff haben)

Wenn Sie SSH-Zugriff auf den Server haben und die DNS-Zone direkt verwalten:

1. **SSH-Verbindung zum Server:**
   ```bash
   ssh cnickel_ameyer@dedi1676.your-server.de
   ```

2. **DNS-Zone bearbeiten:**
   - Die DNS-Zone liegt meist in `/etc/bind/` oder wird über ein Control Panel verwaltet
   - Bei Hetzner Managed Servern: Verwenden Sie das Hetzner Konsole Web-Interface (Option A)

### Option C: Über Domain-Registrar (wenn Domain nicht bei Hetzner registriert)

Wenn die Domain `august-meyer.de` bei einem anderen Registrar registriert ist (z.B. Strato, 1&1, etc.):

1. **Loggen Sie sich bei Ihrem Domain-Registrar ein**
2. **Gehen Sie zu DNS-Verwaltung / Nameserver-Einstellungen**
3. **Fügen Sie den TXT-Eintrag hinzu:**
   - Typ: TXT
   - Name: `resend._domainkey`
   - Wert: Den Wert aus Resend kopieren
   - TTL: 3600

## Schritt 3: Warten auf DNS-Propagation

- DNS-Änderungen können **5 Minuten bis 48 Stunden** dauern
- Normalerweise sind sie nach **15-30 Minuten** aktiv
- Sie können den Status in Resend prüfen

## Schritt 4: Status in Resend prüfen

1. Gehen Sie zurück zu Resend → "Domains" → "august-meyer.de"
2. Der Status sollte sich von **"Pending"** zu **"Verified"** ändern
3. Wenn "Verified" angezeigt wird, ist die Domain bereit!

## Schritt 5: .env.local aktualisieren

Sobald die Domain verifiziert ist, aktualisieren Sie Ihre `.env.local`:

```bash
# Resend API Key
RESEND_API_KEY=re_dYzmKQpk_9CFfVsM21G9amdwCrz4Zx1P7

# Absender mit verifizierter Domain
MAIL_FROM=August Meyer <no-reply@august-meyer.de>

# Admin-E-Mail
MAIL_TO_ADMIN=info@august-meyer.de

# Website URL
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

## Troubleshooting

### DNS-Eintrag wird nicht erkannt

1. **Prüfen Sie die DNS-Einträge online:**
   - Verwenden Sie https://mxtoolbox.com/TXTLookup.aspx
   - Geben Sie `resend._domainkey.august-meyer.de` ein
   - Prüfen Sie, ob der Eintrag sichtbar ist

2. **Warten Sie länger:**
   - DNS-Propagation kann bis zu 48 Stunden dauern
   - Meistens funktioniert es nach 15-30 Minuten

3. **Prüfen Sie Tippfehler:**
   - Name muss exakt sein: `resend._domainkey`
   - Wert muss komplett kopiert sein (sehr lang!)

### Domain bleibt "Pending"

- Prüfen Sie, ob der DNS-Eintrag korrekt gesetzt wurde
- Warten Sie länger (bis zu 48 Stunden)
- Kontaktieren Sie Resend Support, wenn es nach 48 Stunden noch nicht funktioniert

## Wichtige Hinweise

✅ **SPF wird automatisch aktiviert** - Sie müssen keinen zusätzlichen SPF-Eintrag hinzufügen  
✅ **Nur TXT-Eintrag für DKIM nötig** - Resend zeigt Ihnen genau, was Sie brauchen  
✅ **Domain muss bei Resend hinzugefügt sein** - Das haben Sie bereits gemacht  
✅ **Nach Verifizierung können Sie sofort `no-reply@august-meyer.de` verwenden**

## Alternative: Test-Domain (für schnelles Testen)

Falls Sie die Domain-Verifizierung später machen möchten, können Sie vorerst die Test-Domain verwenden:

```bash
MAIL_FROM=August Meyer <onboarding@resend.dev>
```

⚠️ **Hinweis:** E-Mails von der Test-Domain landen möglicherweise im Spam-Ordner.

