# Deployment-Checkliste für test.august-meyer.de

## ✅ Vor dem Deployment

- [ ] Build lokal erstellt (`npm run build`)
- [ ] `.env.production` Datei erstellt (mit korrekten Werten)
- [ ] SFTP-Client installiert (z.B. FileZilla, WinSCP)
- [ ] SFTP-Zugangsdaten bereit
- [ ] Upload-Verzeichnis vom Provider erfragt

## 📦 Dateien für Upload vorbereiten

### Erforderliche Dateien/Ordner:

- [ ] `.next/` Ordner (komplett) - Build-Artefakte
- [ ] `public/` Ordner (komplett) - Statische Assets (Bilder, etc.)
- [ ] `package.json` - Dependencies
- [ ] `package-lock.json` - Exakte Versionsangaben
- [ ] `next.config.js` - Next.js Konfiguration
- [ ] `.env.production` - Umgebungsvariablen (⚠️ Sicher aufbewahren!)

### NICHT hochladen:

- [ ] ❌ `node_modules/` (zu groß, wird auf Server installiert)
- [ ] ❌ `.git/` (nicht nötig)
- [ ] ❌ `.env.local` (nur für lokale Entwicklung)

## 📤 SFTP-Upload

### Verbindungsdaten:

```
Server: dedi1676.your-server.de
User: cnickel_ameyer
Passwort: p6^W?Zk6(31c
Port: 22 (SFTP)
```

### Upload-Schritte:

- [ ] SFTP-Verbindung herstellen
- [ ] Zum richtigen Verzeichnis navigieren (vom Provider erhalten)
- [ ] Alle Dateien/Ordner hochladen
- [ ] Berechtigungen prüfen (falls nötig)

## 🚀 App starten

### Option A: Automatisch (wenn Provider Node.js-Support hat)

- [ ] Provider erkennt `package.json` automatisch
- [ ] Provider führt `npm install --production` aus
- [ ] Provider startet `npm start` automatisch
- [ ] App läuft auf Port 3000

### Option B: Manuell via SSH (falls verfügbar)

- [ ] SSH-Verbindung herstellen
- [ ] Zum Website-Verzeichnis navigieren
- [ ] `npm install --production` ausführen
- [ ] `npm start` ausführen (oder PM2 verwenden)

## ✅ Testen

### Website-Funktionen:

- [ ] Startseite lädt: http://test.august-meyer.de
- [ ] Produktkategorien werden angezeigt
- [ ] Produktseiten funktionieren
- [ ] Navigation funktioniert
- [ ] Bilder werden angezeigt

### Kontaktformular (WICHTIG!):

- [ ] Kontaktformular öffnet sich
- [ ] Formular kann ausgefüllt werden
- [ ] **Absenden funktioniert** (API Route muss funktionieren!)
- [ ] **Kunden-E-Mail wird versendet** (an Test-E-Mail-Adresse)
- [ ] **Admin-E-Mail wird versendet** (an info@august-meyer.de)
- [ ] Browser-Konsole zeigt keine Fehler

### Browser-Prüfung:

- [ ] Entwicklertools (F12) öffnen
- [ ] Konsole auf Fehler prüfen
- [ ] Network-Tab auf fehlgeschlagene Requests prüfen

## 🔍 Troubleshooting

### Website lädt nicht:

- [ ] Prüfen, ob App auf Server läuft
- [ ] Prüfen, ob Port korrekt konfiguriert ist
- [ ] Prüfen, ob Reverse Proxy eingerichtet ist

### Kontaktformular funktioniert nicht:

- [ ] Server-Logs auf Fehler prüfen
- [ ] `RESEND_API_KEY` in `.env.production` prüfen
- [ ] `MAIL_FROM` in `.env.production` prüfen
- [ ] Browser-Konsole auf API-Fehler prüfen

### E-Mails kommen nicht an:

- [ ] Spam-Ordner prüfen (Test-Domain kann im Spam landen)
- [ ] Resend Dashboard prüfen: https://resend.com/emails
- [ ] Server-Logs auf Fehler prüfen

## 📝 Nach erfolgreichem Test

- [ ] Alle Änderungen dokumentieren
- [ ] Deployment-Prozess dokumentieren
- [ ] Für Hauptdomain vorbereiten
- [ ] `NEXT_PUBLIC_SITE_URL` auf `https://www.august-meyer.de` ändern

