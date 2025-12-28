# Test-Deployment auf test.august-meyer.de

## ✅ Vorbereitung

### 1. Umgebungsvariablen für Test-Subdomain anpassen

In `.env.local` (oder `.env.production` für Server) anpassen:

```bash
# Resend Konfiguration (Test-Domain für 2 Monate)
RESEND_API_KEY=re_dYzmKQpk_9CFfVsM21G9amdwCrz4Zx1P7
MAIL_FROM=August Meyer <onboarding@resend.dev>
MAIL_TO_ADMIN=info@august-meyer.de

# Website URL für Test-Subdomain
NEXT_PUBLIC_SITE_URL=http://test.august-meyer.de
```

**Wichtig:** `NEXT_PUBLIC_SITE_URL` muss auf `http://test.august-meyer.de` gesetzt werden (ohne SSL, da Test-Subdomain kein SSL hat).

### 2. Build lokal erstellen

```bash
npm run build
```

Dies erstellt die optimierten Build-Dateien im `.next/` Ordner.

## 📤 Upload via SFTP

### SFTP-Verbindungsdaten

```
Server: dedi1676.your-server.de
User: cnickel_ameyer
Passwort: p6^W?Zk6(31c
Port: 22 (SFTP)
```

### Zu uploadende Dateien/Ordner

1. **`.next/`** Ordner (komplett) - Build-Artefakte
2. **`public/`** Ordner (komplett) - Statische Assets (Bilder, etc.)
3. **`package.json`** - Dependencies
4. **`package-lock.json`** - Exakte Versionsangaben
5. **`next.config.js`** - Next.js Konfiguration
6. **`.env.local`** oder **`.env.production`** - Umgebungsvariablen (⚠️ Sicher!)

**Wichtig:** 
- ❌ NICHT `node_modules/` hochladen (zu groß, wird auf Server installiert)
- ❌ NICHT `.git/` hochladen
- ✅ `.env.local` sollte sicher sein und nicht öffentlich zugänglich!

### Upload-Verzeichnis

Fragen Sie Ihren Provider, in welches Verzeichnis Sie die Dateien für `test.august-meyer.de` hochladen sollen.

Mögliche Pfade:
- `/var/www/test.august-meyer.de/`
- `/home/cnickel_ameyer/public_html/test/`
- `/var/www/html/test/`

## 🚀 Starten der Anwendung

### Option A: Automatisch (wenn Provider Node.js-Support hat)

Wenn Ihr Provider Node.js unterstützt:
- Provider erkennt `package.json`
- Provider führt automatisch `npm install --production` aus
- Provider startet automatisch `npm start`
- App läuft auf Port 3000

### Option B: Manuell via SSH (falls verfügbar)

Falls automatischer Start nicht funktioniert und SSH-Zugang verfügbar:

```bash
# 1. Verbinden Sie sich via SSH
ssh cnickel_ameyer@dedi1676.your-server.de

# 2. Navigieren Sie zum Test-Verzeichnis
cd /path/to/test-subdomain  # Vom Provider erhalten

# 3. Dependencies installieren
npm install --production

# 4. App starten
npm run start

# 5. Oder mit PM2 (für automatische Neustarts)
npm install -g pm2
pm2 start npm --name "august-meyer-test" -- start
pm2 save
pm2 startup
```

## ✅ Testen

### 1. Website öffnen

Öffnen Sie: **http://test.august-meyer.de**

### 2. Funktionen prüfen

- [ ] Startseite lädt korrekt
- [ ] Produktkategorien werden angezeigt
- [ ] Produktseiten funktionieren
- [ ] Navigation funktioniert
- [ ] Bilder werden angezeigt

### 3. Kontaktformular testen (WICHTIG!)

- [ ] Kontaktformular öffnet sich
- [ ] Formular kann ausgefüllt werden
- [ ] **Absenden funktioniert** (API Route muss funktionieren!)
- [ ] **Kunden-E-Mail wird versendet** (an Test-E-Mail-Adresse)
- [ ] **Admin-E-Mail wird versendet** (an info@august-meyer.de)

### 4. Browser-Konsole prüfen

- Öffnen Sie Browser-Entwicklertools (F12)
- Prüfen Sie die Konsole auf Fehler
- Prüfen Sie das Network-Tab auf fehlgeschlagene Requests

## 🔍 Troubleshooting

### Website lädt nicht

1. Prüfen Sie, ob die App auf dem Server läuft
2. Prüfen Sie, ob der Port korrekt konfiguriert ist
3. Prüfen Sie, ob ein Reverse Proxy (nginx/Apache) eingerichtet ist

### Kontaktformular funktioniert nicht

1. Prüfen Sie die Server-Logs auf Fehler
2. Prüfen Sie, ob `RESEND_API_KEY` korrekt gesetzt ist
3. Prüfen Sie, ob `MAIL_FROM` korrekt gesetzt ist
4. Prüfen Sie die Browser-Konsole auf API-Fehler

### E-Mails kommen nicht an

1. Prüfen Sie den Spam-Ordner (Test-Domain kann im Spam landen)
2. Prüfen Sie Resend Dashboard: https://resend.com/emails
3. Prüfen Sie die Server-Logs auf Fehler

### Bilder werden nicht angezeigt

1. Prüfen Sie, ob der `public/` Ordner korrekt hochgeladen wurde
2. Prüfen Sie die Pfade in den Bild-URLs

## 📝 Nach erfolgreichem Test

Wenn alles funktioniert:

1. ✅ Notieren Sie alle Änderungen, die nötig waren
2. ✅ Dokumentieren Sie den genauen Deployment-Prozess
3. ✅ Bereiten Sie das Deployment für die Hauptdomain vor
4. ✅ Für Hauptdomain: `NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de` setzen

## ⚠️ Wichtige Hinweise

- **Kein SSL auf Test-Subdomain:** Das ist normal, die Hauptdomain hat SSL
- **Test-Domain für E-Mails:** `onboarding@resend.dev` ist für 2 Monate OK
- **API Routes:** Müssen als Node.js-Prozess laufen (nicht statisch)

