# August Meyer GmbH & Co. KG - Website

Eine moderne, professionelle Website für die August Meyer GmbH & Co. KG, entwickelt mit Next.js 14 und modernen Web-Technologien.

## 🚀 Features

- **Next.js 14** mit App Router
- **TypeScript** für typsichere Entwicklung
- **TailwindCSS** für modernes Styling
- **shadcn/ui** Komponenten-Bibliothek
- **Responsive Design** für alle Geräte
- **SEO-optimiert** mit Metadaten und JSON-LD
- **Barrierefreiheit** nach WCAG-Richtlinien
- **E2E-Tests** mit Playwright
- **CI/CD** mit GitHub Actions

## 📁 Projektstruktur

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── globals.css        # Globale Styles
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Homepage
├── components/            # React Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   ├── Navbar.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   └── ...               # Weitere Komponenten
├── content/              # Content Layer
│   ├── categories.json   # Produktkategorien
│   └── products.json     # Produktdaten
├── lib/                  # Utility-Funktionen
│   ├── products.ts       # Produkt-Logik
│   └── utils.ts          # Hilfsfunktionen
├── tests/                # E2E Tests
├── .github/              # GitHub Actions
└── public/               # Statische Assets
```

## 🛠️ Installation

### Voraussetzungen

- Node.js 18+ oder 20+
- pnpm (empfohlen) oder npm

### Setup

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd august-meyer-website
   ```

2. **Dependencies installieren**
   ```bash
   pnpm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   pnpm dev
   ```

4. **Browser öffnen**
   ```
   http://localhost:3000
   ```

## 📜 Verfügbare Scripts

```json
{
  "dev": "next dev",           # Entwicklungsserver
  "build": "next build",       # Produktions-Build
  "start": "next start",       # Produktions-Server
  "lint": "next lint",         # ESLint
  "typecheck": "tsc --noEmit", # TypeScript Check
  "test:e2e": "playwright test", # E2E Tests
  "ci:quality": "npm run lint && npm run typecheck && npm run test:e2e"
}
```

## 🧪 Testing

### E2E Tests mit Playwright

```bash
# Tests ausführen
pnpm test:e2e

# Tests im UI-Modus
pnpm exec playwright test --ui

# Tests für spezifischen Browser
pnpm exec playwright test --project=chromium
```

### Accessibility Tests

Die Tests überprüfen automatisch:
- Korrekte Heading-Hierarchie
- Alt-Text für Bilder
- Form-Labels
- ARIA-Attribute
- Keyboard-Navigation

## 🚀 Deployment

### Produktions-Build

```bash
pnpm build
pnpm start
```

### Umgebungsvariablen

Erstellen Sie eine `.env.local` Datei:

```env
NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
```

## 📱 Seiten

- **/** - Homepage mit Hero-Section und Produkt-Highlights
- **/produkte** - Produktübersicht nach Kategorien
- **/produkte/[category]** - Produkte einer Kategorie
- **/produkte/[category]/[slug]** - Produktdetailseite
- **/kontakt** - Kontaktformular und Unternehmensinformationen
- **/impressum** - Rechtliche Informationen
- **/datenschutz** - Datenschutzerklärung

## 🔧 Konfiguration

### TailwindCSS

Konfiguriert in `tailwind.config.js` mit:
- Custom Color Palette
- Responsive Breakpoints
- Animation Utilities

### ESLint & Prettier

Strikte TypeScript-Regeln und Accessibility-Checks:
- `@typescript-eslint/recommended`
- `plugin:jsx-a11y/recommended`
- Automatische Formatierung

### SEO & Performance

- **Metadaten** für jede Seite
- **OpenGraph** und **Twitter Cards**
- **JSON-LD** strukturierte Daten
- **Core Web Vitals** optimiert
- **Lighthouse Budget** konfiguriert

## 📊 Performance

### Lighthouse Budget

```json
{
  "scripts": "<=150 KB",
  "images": "<=800 KB",
  "third-party": "<=3"
}
```

### Optimierungen

- **Image Optimization** mit Next.js
- **Code Splitting** automatisch
- **Bundle Analysis** verfügbar
- **Lazy Loading** für Komponenten

## 🌐 Internationalisierung

- **Deutsch** als Standardsprache
- **Erweiterbare Struktur** für weitere Sprachen
- **Locale-spezifische** Metadaten

## 🔒 Sicherheit

- **CSRF Protection** in Formularen
- **Input Validation** auf Server-Seite
- **HTTPS** erzwungen
- **Security Headers** konfiguriert

## 📈 Monitoring

### Analytics

- **Core Web Vitals** Tracking
- **Error Monitoring** implementiert
- **Performance Metrics** verfügbar

### Logging

- **Strukturierte Logs** für Leads
- **Error Tracking** für Debugging
- **Audit Trail** für Compliance

## 🤝 Beitragen

1. **Fork** das Repository
2. **Feature Branch** erstellen (`git checkout -b feature/AmazingFeature`)
3. **Änderungen committen** (`git commit -m 'Add some AmazingFeature'`)
4. **Branch pushen** (`git push origin feature/AmazingFeature`)
5. **Pull Request** erstellen

## 📄 Lizenz

Dieses Projekt ist proprietär und gehört der August Meyer GmbH & Co. KG.

## 📞 Support

Bei Fragen oder Problemen wenden Sie sich an:
- **E-Mail**: info@august-meyer.de
- **Telefon**: +49 123 456789

---

**Entwickelt mit ❤️ für August Meyer GmbH & Co. KG**
