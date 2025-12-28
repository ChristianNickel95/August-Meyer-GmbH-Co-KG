# Schritt-für-Schritt: Deployment auf test.august-meyer.de

## Schritt 1: Build lokal erstellen

```bash
npm run build
```

Dies erstellt die optimierten Build-Dateien im `.next/` Ordner.

**Erwartete Ausgabe:**
- ✅ Build erfolgreich
- ✅ `.next/` Ordner erstellt
- ⚠️ Warnungen sind OK (z.B. `<img>` statt `<Image />`)

## Schritt 2: Umgebungsvariablen prüfen

Die Datei `.env.production` wurde bereits erstellt mit:

```bash
RESEND_API_KEY=re_dYzmKQpk_9CFfVsM21G9amdwCrz4Zx1P7
MAIL_FROM=August Meyer <onboarding@resend.dev>
MAIL_TO_ADMIN=info@august-meyer.de
NEXT_PUBLIC_SITE_URL=http://test.august-meyer.de
```

**Wichtig:** Diese Datei wird auf den Server hochgeladen (nicht `.env.local`!).

## Schritt 3: SFTP-Client öffnen

**Empfohlene Clients:**
- **FileZilla** (kostenlos): https://filezilla-project.org/
- **WinSCP** (kostenlos): https://winscp.net/
- **VS Code Extension**: SFTP Extension

## Schritt 4: SFTP-Verbindung herstellen

**Verbindungsdaten:**
```
Server: dedi1676.your-server.de
User: cnickel_ameyer
Passwort: p6^W?Zk6(31c
Port: 22 (SFTP)
```

**Wichtig:** 
- Port **22** für SFTP (nicht 21 für FTP!)
- Protokoll: **SFTP** (nicht FTP!)

## Schritt 5: Upload-Verzeichnis finden

**Fragen Sie Ihren Provider:**
> "In welches Verzeichnis soll ich die Dateien für test.august-meyer.de hochladen?"

**Mögliche Pfade:**
- `/var/www/test.august-meyer.de/`
- `/home/cnickel_ameyer/public_html/test/`
- `/var/www/html/test/`

## Schritt 6: Dateien hochladen

### Zu uploadende Dateien/Ordner:

1. **`.next/`** Ordner (komplett)
   - Enthält alle Build-Artefakte
   - Wichtig: Komplett hochladen!

2. **`public/`** Ordner (komplett)
   - Enthält alle Bilder und statischen Assets
   - Wichtig: Komplett hochladen!

3. **`package.json`**
   - Wird vom Provider erkannt für automatischen Start

4. **`package-lock.json`**
   - Exakte Versionsangaben für Dependencies

5. **`next.config.js`**
   - Next.js Konfiguration

6. **`.env.production`**
   - Umgebungsvariablen
   - **Wichtig:** Auf Server als `.env.local` oder `.env.production` speichern
   - **Sicherheit:** Nicht öffentlich zugänglich machen!

### NICHT hochladen:

- ❌ `node_modules/` (zu groß, wird auf Server installiert)
- ❌ `.git/` (nicht nötig)
- ❌ `.env.local` (nur für lokale Entwicklung)

## Schritt 7: App starten

### Option A: Automatisch (wenn Provider Node.js-Support hat)

**Wenn Ihr Provider Node.js unterstützt:**
- Provider erkennt `package.json` automatisch
- Provider führt `npm install --production` aus
- Provider startet `npm start` automatisch
- App läuft auf Port 3000

**Warten Sie 2-5 Minuten** und testen Sie dann die Website.

### Option B: Manuell via SSH (falls verfügbar)

Falls automatischer Start nicht funktioniert:

```bash
# 1. SSH-Verbindung herstellen
ssh cnickel_ameyer@dedi1676.your-server.de

# 2. Zum Website-Verzeichnis navigieren
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

## Schritt 8: Testen

### 1. Website öffnen

Öffnen Sie: **http://test.august-meyer.de**

**Erwartetes Ergebnis:**
- ✅ Website lädt
- ✅ Keine Fehler in der Browser-Konsole
- ✅ Bilder werden angezeigt

### 2. Funktionen prüfen

- [ ] Startseite lädt korrekt
- [ ] Produktkategorien werden angezeigt
- [ ] Produktseiten funktionieren
- [ ] Navigation funktioniert
- [ ] Bilder werden angezeigt

### 3. Kontaktformular testen (WICHTIG!)

**Das ist der wichtigste Test!**

1. Gehen Sie zur Kontaktseite
2. Füllen Sie das Formular aus:
   - Name: Test
   - E-Mail: Ihre Test-E-Mail-Adresse
   - Nachricht: Test-Nachricht
3. Absenden klicken

**Erwartetes Ergebnis:**
- ✅ Erfolgsmeldung wird angezeigt
- ✅ Kunden-E-Mail kommt an (an Ihre Test-E-Mail-Adresse)
- ✅ Admin-E-Mail kommt an (an info@august-meyer.de)
- ✅ Absender ist `onboarding@resend.dev` (Test-Domain)

**Falls E-Mails nicht ankommen:**
- Prüfen Sie den Spam-Ordner
- Prüfen Sie Resend Dashboard: https://resend.com/emails
- Prüfen Sie die Server-Logs

### 4. Browser-Konsole prüfen

1. Öffnen Sie Browser-Entwicklertools (F12)
2. Gehen Sie zur "Console"-Registerkarte
3. Prüfen Sie auf Fehler (rot markiert)
4. Gehen Sie zur "Network"-Registerkarte
5. Prüfen Sie auf fehlgeschlagene Requests (rot markiert)

## Schritt 9: Troubleshooting

### Website lädt nicht

**Mögliche Ursachen:**
- App läuft nicht auf dem Server
- Port ist nicht korrekt konfiguriert
- Reverse Proxy ist nicht eingerichtet

**Lösung:**
- Kontaktieren Sie Ihren Provider
- Prüfen Sie, ob Node.js auf dem Server läuft

### Kontaktformular funktioniert nicht

**Mögliche Ursachen:**
- API Route läuft nicht (Node.js-Prozess fehlt)
- Umgebungsvariablen sind nicht korrekt gesetzt
- Resend API Key ist falsch

**Lösung:**
- Prüfen Sie Server-Logs
- Prüfen Sie `.env.production` auf dem Server
- Prüfen Sie Resend Dashboard

### E-Mails kommen nicht an

**Mögliche Ursachen:**
- E-Mails landen im Spam
- Resend API Key ist falsch
- `MAIL_FROM` ist falsch konfiguriert

**Lösung:**
- Prüfen Sie Spam-Ordner
- Prüfen Sie Resend Dashboard: https://resend.com/emails
- Prüfen Sie Server-Logs

## Schritt 10: Nach erfolgreichem Test

Wenn alles funktioniert:

1. ✅ Notieren Sie alle Änderungen, die nötig waren
2. ✅ Dokumentieren Sie den genauen Deployment-Prozess
3. ✅ Bereiten Sie das Deployment für die Hauptdomain vor
4. ✅ Für Hauptdomain: `NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de` setzen

## ⚠️ Wichtige Hinweise

- **Kein SSL auf Test-Subdomain:** Das ist normal, die Hauptdomain hat SSL
- **Test-Domain für E-Mails:** `onboarding@resend.dev` ist für 2 Monate OK
- **API Routes:** Müssen als Node.js-Prozess laufen (nicht statisch)
- **Umgebungsvariablen:** `.env.production` auf Server hochladen (nicht `.env.local`!)

## 📞 Support

Falls etwas nicht funktioniert:
1. Prüfen Sie die Server-Logs
2. Prüfen Sie die Browser-Konsole
3. Kontaktieren Sie Ihren Hetzner-Provider
4. Prüfen Sie Resend Dashboard

