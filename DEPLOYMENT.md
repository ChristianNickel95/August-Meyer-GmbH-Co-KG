# Deployment-Anleitung für August-Meyer Website

## Übersicht

Diese Anleitung beschreibt, wie die Next.js-Anwendung auf dem Hetzner-Server (`dedi1676.your-server.de`) deployed wird.

## Wichtige Informationen

- **Test-Subdomain:** http://test.august-meyer.de (ohne SSL)
- **Hauptdomain:** https://www.august-meyer.de (mit SSL)
- **FTP-Zugang:** Verfügbar (für statische Dateien)
- **SSH-Zugang:** Möglich, aber benötigt Vorbereitung

## Voraussetzungen

- Node.js 18+ oder 20+ auf dem Server (oder lokal für Build)
- FTP-Client (z.B. FileZilla, WinSCP)
- Zugriff auf `.env.local` mit allen Umgebungsvariablen

## ✅ SFTP-Deployment (wenn Provider Node.js-Support hat)

**Gute Nachricht:** Wenn Ihr Hosting-Provider Node.js-Support hat, kann es funktionieren!

**So funktioniert es:**
1. Sie laden Dateien via SFTP hoch
2. Der Provider erkennt `package.json` automatisch
3. Der Provider führt `npm install` und `npm start` automatisch aus
4. Die App läuft als Node.js-Prozess

**Das bedeutet:**
- ✅ Mit **SFTP** können Sie Dateien hochladen
- ✅ Wenn Provider **Node.js-Support** hat → App startet automatisch
- ✅ **Kontaktformular funktioniert** (API Routes laufen)
- ⚠️ **ABER:** Sie müssen sicherstellen, dass der Provider Node.js unterstützt!

## ⚠️ Wichtige Voraussetzung

**Ihr Hosting-Provider muss Node.js unterstützen!**

Fragen Sie vorher:
> "Unterstützt der Server Node.js? Wenn ich eine Next.js-App mit `package.json` hochlade, wird sie automatisch gestartet?"

## Deployment-Strategie

Da Sie aktuell nur FTP-Zugang haben, gibt es zwei Optionen:

### Option 1: SSH-Zugang anfragen (Empfohlen)

**Vorteile:**
- ✅ Volle Funktionalität (inkl. Kontaktformular)
- ✅ Professionelles Deployment
- ✅ Automatische Neustarts bei Server-Reboot

**Was Sie brauchen:**
- SSH-Zugang vom Hosting-Provider anfragen
- Node.js auf dem Server installieren (falls nicht vorhanden)
- Process Manager (PM2) für automatische Neustarts

### Option 2: Vercel Deployment (Alternative)

**Vorteile:**
- ✅ Kein Server-Management nötig
- ✅ Automatisches Deployment
- ✅ SSL automatisch
- ✅ Kostenlos für kleine Projekte

**Nachteile:**
- ⚠️ Externe Hosting-Lösung (nicht auf eigenem Server)

## Schritt-für-Schritt: SFTP-Deployment (wenn Provider Node.js unterstützt)

### Schritt 1: Build lokal erstellen

```bash
# Lokal auf Ihrem Computer
npm run build
```

Dies erstellt die optimierten Build-Dateien im `.next/` Ordner.

### Schritt 2: Dateien via SFTP hochladen

**SFTP-Verbindungsdaten:**
```
Server: dedi1676.your-server.de
User: cnickel_ameyer
Passwort: p6^W?Zk6(31c
Port: 22 (SFTP)
```

**Zu uploadende Dateien/Ordner:**
1. **`.next/`** Ordner (komplett) - Build-Artefakte
2. **`public/`** Ordner (komplett) - Statische Assets (Bilder, etc.)
3. **`package.json`** - Dependencies (wichtig für automatischen Start!)
4. **`package-lock.json`** - Exakte Versionsangaben
5. **`next.config.js`** - Next.js Konfiguration
6. **`.env.local`** - Umgebungsvariablen (⚠️ Sicher aufbewahren!)

**Wichtig:** 
- ❌ Laden Sie NICHT `node_modules/` hoch (zu groß, wird auf Server installiert)
- ❌ Laden Sie NICHT `.git/` hoch
- ✅ `.env.local` sollte sicher sein und nicht öffentlich zugänglich!

### Schritt 3: Provider startet automatisch (wenn Node.js-Support vorhanden)

**Wenn Ihr Provider Node.js unterstützt:**
- Provider erkennt `package.json`
- Provider führt automatisch `npm install --production` aus
- Provider startet automatisch `npm start`
- App läuft auf Port 3000 (oder konfiguriertem Port)

**Falls es nicht automatisch startet:**
- Prüfen Sie, ob der Provider Node.js unterstützt
- Kontaktieren Sie den Provider für Hilfe
- Oder: SSH-Zugang anfragen für manuelles Starten

### Schritt 4: Testen

1. Öffnen Sie http://test.august-meyer.de
2. Prüfen Sie, ob die Seite lädt
3. **Wichtig:** Testen Sie das Kontaktformular (API Route muss funktionieren!)
4. Prüfen Sie die Browser-Konsole auf Fehler

### Schritt 5: Falls SSH-Zugang verfügbar (optional, für manuelles Management)

Falls Sie später manuell starten/stoppen möchten oder Logs prüfen:

```bash
# 1. Verbinden Sie sich via SSH
ssh cnickel_ameyer@dedi1676.your-server.de

# 2. Navigieren Sie zum Website-Verzeichnis
cd /path/to/website  # Ihr Hosting-Provider sagt Ihnen den genauen Pfad

# 3. Manuell starten (falls automatisch nicht funktioniert)
npm install --production
npm run start

# 4. Mit PM2 (Process Manager - für automatische Neustarts)
npm install -g pm2
pm2 start npm --name "august-meyer" -- start
pm2 save
pm2 startup
```

## Alternative: Vercel Deployment (Empfohlen)

**Vorteile:**
- ✅ Automatisches Deployment
- ✅ SSL automatisch
- ✅ CDN global
- ✅ Serverless Functions für API Routes
- ✅ Kostenlos für kleine Projekte

**Setup:**
1. Repository mit Vercel verbinden
2. Umgebungsvariablen in Vercel eintragen
3. Automatisches Deployment bei jedem Push

## Umgebungsvariablen für Produktion

Erstellen Sie eine `.env.production` oder tragen Sie die Variablen direkt auf dem Server ein:

### Für Test-Subdomain (test.august-meyer.de)

```bash
# Resend Konfiguration (Test-Domain für 2 Monate)
RESEND_API_KEY=re_dYzmKQpk_9CFfVsM21G9amdwCrz4Zx1P7
MAIL_FROM=August Meyer <onboarding@resend.dev>
MAIL_TO_ADMIN=info@august-meyer.de

# Website URL für Test-Subdomain (ohne SSL)
NEXT_PUBLIC_SITE_URL=http://test.august-meyer.de
```

### Für Hauptdomain (www.august-meyer.de)

```bash
# Resend Konfiguration
RESEND_API_KEY=re_dYzmKQpk_9CFfVsM21G9amdwCrz4Zx1P7
MAIL_FROM=August Meyer <onboarding@resend.dev>  # Später: info@august-meyer.de (nach Domain-Verifizierung)
MAIL_TO_ADMIN=info@august-meyer.de

# Website URL für Hauptdomain (mit SSL)
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

## Test-Deployment auf test.august-meyer.de

1. **Build lokal erstellen:**
   ```bash
   npm run build
   ```

2. **Dateien via FTP hochladen** auf Test-Subdomain-Verzeichnis

3. **Auf Server konfigurieren (via SSH):**
   ```bash
   ssh cnickel_ameyer@dedi1676.your-server.de
   cd /path/to/test-subdomain
   npm install --production
   npm run start
   # Oder mit PM2:
   pm2 start npm --name "august-meyer-test" -- start
   ```

4. **Testen:**
   - Öffnen Sie http://test.august-meyer.de
   - Prüfen Sie alle Funktionen
   - **Wichtig:** Testen Sie das Kontaktformular (API Route muss funktionieren!)

5. **Nach erfolgreichem Test:** Gleiche Schritte für Hauptdomain wiederholen

## Was Sie vor dem Deployment prüfen sollten

### Fragen an Ihren Hosting-Provider:

1. **Node.js-Support:**
   > "Unterstützt der Server Node.js? Wenn ich eine Next.js-App mit `package.json` via SFTP hochlade, wird sie automatisch gestartet?"

2. **Node.js-Version:**
   > "Welche Node.js-Version ist installiert? (Benötigt: 18+ oder 20+)"

3. **Verzeichnis:**
   > "In welchem Verzeichnis soll ich die Website-Dateien hochladen? (z.B. `/var/www/html/` oder `/home/cnickel_ameyer/public_html/`)"

4. **Port & Reverse Proxy:**
   > "Auf welchem Port soll die Next.js-App laufen? (Standard: 3000) Wird automatisch ein Reverse Proxy (nginx/Apache) eingerichtet, um die Domain auf Port 3000 zu mappen?"

5. **SSH-Terminal (optional):**
   > "Falls automatischer Start nicht funktioniert: Ist SSH-Terminal-Zugang möglich, um manuell `npm start` auszuführen?"

## Checkliste vor dem Upload

- [ ] Build lokal erstellt (`npm run build`)
- [ ] `.env.local` mit allen Umgebungsvariablen vorbereitet
- [ ] Provider bestätigt Node.js-Support
- [ ] Upload-Verzeichnis vom Provider erhalten
- [ ] SFTP-Client installiert (z.B. FileZilla, WinSCP)

## Mögliche Lösungen ohne SSH

### Option A: Hosting-Provider hat Node.js-Support

Manche Provider bieten Node.js-Apps über ein Control Panel an:
- Dateien via SFTP hochladen
- Im Control Panel: "Node.js App starten" klicken
- Automatische Konfiguration

**Fragen Sie Ihren Provider, ob das verfügbar ist!**

### Option B: Pre-Build lokal, dann Upload

1. **Lokal bauen:**
   ```bash
   npm run build
   ```

2. **Dateien via SFTP hochladen:**
   - `.next/` Ordner
   - `public/` Ordner
   - `package.json`
   - `node_modules/` (kann sehr groß sein!)

3. **Provider startet automatisch:**
   - Manche Provider erkennen `package.json` und starten automatisch
   - Oder: Provider hat ein Control Panel zum Starten

**Aber:** API Routes benötigen trotzdem einen laufenden Node.js-Prozess!

## Wichtige Hinweise

⚠️ **API Routes:** Wenn Sie Static Export verwenden, funktionieren API Routes nicht. Das Kontaktformular benötigt dann eine Alternative (z.B. externer Service).

✅ **SSL:** Auf der Hauptdomain wird automatisch ein SSL-Zertifikat installiert.

✅ **Umgebungsvariablen:** Stellen Sie sicher, dass alle `.env.local` Variablen auch auf dem Server gesetzt sind.

## Troubleshooting

### "Cannot find module" Fehler
- Stellen Sie sicher, dass `npm install --production` auf dem Server ausgeführt wurde

### API Routes funktionieren nicht
- Prüfen Sie, ob Node.js auf dem Server läuft
- Prüfen Sie, ob der Server die API Routes erreichen kann

### Bilder werden nicht angezeigt
- Prüfen Sie, ob der `public/` Ordner korrekt hochgeladen wurde
- Prüfen Sie die Pfade in `next.config.js`

