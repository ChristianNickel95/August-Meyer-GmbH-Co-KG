# SFTP-Deployment Checkliste

## ✅ Voraussetzung prüfen

**Wichtig:** Stellen Sie sicher, dass Ihr Provider Node.js unterstützt!

Fragen Sie:
> "Unterstützt der Server Node.js? Wenn ich eine Next.js-App mit `package.json` hochlade, wird sie automatisch gestartet?"

## 📋 Schritt-für-Schritt

### 1. Build lokal erstellen

```bash
npm run build
```

### 2. Dateien via SFTP hochladen

**SFTP-Verbindung:**
- Server: `dedi1676.your-server.de`
- User: `cnickel_ameyer`
- Passwort: `p6^W?Zk6(31c`
- Port: `22` (SFTP)

**Hochzuladen:**
- ✅ `.next/` Ordner (komplett)
- ✅ `public/` Ordner (komplett)
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.js`
- ✅ `.env.local` (mit allen Umgebungsvariablen)

**NICHT hochladen:**
- ❌ `node_modules/` (wird auf Server installiert)
- ❌ `.git/`
- ❌ Entwicklungsdateien

### 3. Provider startet automatisch

Wenn Node.js-Support vorhanden:
- Provider erkennt `package.json`
- Führt `npm install --production` aus
- Startet `npm start` automatisch

### 4. Testen

1. Öffnen: http://test.august-meyer.de
2. Prüfen: Lädt die Seite?
3. **Wichtig:** Kontaktformular testen (API Route muss funktionieren!)

## 🔧 Falls es nicht funktioniert

1. **Provider kontaktieren:** "Die App startet nicht automatisch. Brauche ich SSH-Zugang?"
2. **Logs prüfen:** Provider sollte Logs bereitstellen
3. **Manuell starten:** Falls SSH verfügbar, siehe DEPLOYMENT.md

## 📝 Umgebungsvariablen für Produktion

Stellen Sie sicher, dass `.env.local` auf dem Server diese Variablen enthält:

```bash
RESEND_API_KEY=re_dYzmKQpk_9CFfVsM21G9amdwCrz4Zx1P7
MAIL_FROM=August Meyer <no-reply@august-meyer.de>
MAIL_TO_ADMIN=info@august-meyer.de
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

**Wichtig:** `.env.local` sollte sicher sein und nicht öffentlich zugänglich!

