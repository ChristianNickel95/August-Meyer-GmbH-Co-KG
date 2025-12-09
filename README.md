# August Meyer GmbH & Co. KG - Website

Eine moderne, professionelle Website für die August Meyer GmbH & Co. KG, entwickelt mit Next.js 14 und modernen Web-Technologien.

## 🚀 Features

- **Next.js 14** mit App Router
- **TypeScript** für typsichere Entwicklung
- **TailwindCSS** für modernes Styling
- **Radix UI** Komponenten-Bibliothek für barrierefreie UI
- **Responsive Design** für alle Geräte
- **Semantische Suche** mit Synonym-Expansion und Relevance Scoring
- **Warenkorb-System** mit LocalStorage Persistierung
- **Use-Case-Filter** für intelligente Produktfilterung
- **SEO-optimiert** mit Metadaten und JSON-LD
- **Barrierefreiheit** nach WCAG-Richtlinien
- **E2E-Tests** mit Playwright
- **Vercel Deployment** mit automatischem CI/CD

## 🛠️ Technischer Stack

### Framework & Core
- **Next.js 14.0.4** - React Framework mit App Router
- **React 18.2.0** - UI Library
- **TypeScript 5.0.4** - Typsichere Entwicklung

### Styling & UI
- **Tailwind CSS 3.3.0** - Utility-First CSS Framework
- **Radix UI** - Barrierefreie UI-Komponenten
  - `@radix-ui/react-dialog` - Dialog/Modal Komponenten
  - `@radix-ui/react-label` - Form Labels
  - `@radix-ui/react-radio-group` - Radio Buttons
  - `@radix-ui/react-slot` - Composition Pattern
- **Lucide React 0.344.0** - Icon Library
- **class-variance-authority 0.7.0** - Component Variants
- **clsx & tailwind-merge** - Conditional CSS Classes

### Datenstruktur
- **JSON-basierte Content-Dateien**:
  - `content/products.json` - Produktdaten mit Varianten
  - `content/categories.json` - Kategorien & Subkategorien
  - `content/useCases.json` - Use-Case-Tags für Filter

### Features & Funktionalität
- **Warenkorb-System** - React Context API mit LocalStorage
- **Semantische Suche** - Synonym-Expansion & Relevance Scoring
- **URL-basierte Filterung** - Shareable Links mit `useSearchParams`
- **SEO & Structured Data** - JSON-LD Schema Markup

## 📁 Projektstruktur

```
August-Meyer/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── lead/          # Lead-Formular Endpoint
│   ├── produkte/          # Produktseiten
│   │   ├── page.tsx       # Produktübersicht
│   │   └── [category]/    # Kategorie-Seiten
│   ├── kontakt/           # Kontaktseite
│   ├── leistungen/        # Leistungsseite
│   ├── datenschutz/       # Datenschutz
│   ├── globals.css        # Globale Styles
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Homepage
├── components/            # React Komponenten
│   ├── ui/               # Reusable UI Components
│   ├── Navbar.tsx        # Navigation mit Suche
│   ├── Footer.tsx        # Footer
│   ├── ProductCard.tsx   # Produktkarte
│   ├── CategoryCard.tsx  # Kategoriekarte
│   ├── Cart.tsx          # Warenkorb
│   ├── CartContext.tsx   # Warenkorb State Management
│   ├── ProductFilter.tsx # Use-Case-Filter
│   ├── SearchResultsBadge.tsx # Suchergebnis-Badge
│   └── ...               # Weitere Komponenten
├── content/              # JSON Daten
│   ├── categories.json   # Produktkategorien
│   ├── products.json     # Produktdaten
│   └── useCases.json     # Use-Case-Mapping
├── lib/                  # Utility-Funktionen
│   ├── products.ts       # Produkt-Helpers
│   ├── semanticSearch.ts # Semantische Suchlogik
│   └── utils.ts          # Allgemeine Utilities
├── tests/                # E2E Tests
├── public/               # Statische Assets
└── .github/              # GitHub Actions (optional)
```

## 🛠️ Installation

### Voraussetzungen

- **Node.js 18+** oder **20+**
- **npm** (mitgeliefert mit Node.js)

### Setup

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd august-meyer-website
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

4. **Browser öffnen**
   ```
   http://localhost:3000
   ```

## 📜 Verfügbare Scripts

```bash
npm run dev      # Entwicklungsserver starten (http://localhost:3000)
npm run build    # Produktions-Build erstellen
npm run start    # Produktions-Server starten (nach build)
```

### Weitere verfügbare Commands

- **ESLint**: Automatisch über Next.js integriert
- **TypeScript**: Type Checking läuft automatisch im Build-Prozess
- **Playwright Tests**: `npx playwright test` (falls konfiguriert)

## 🧪 Testing

### E2E Tests mit Playwright

```bash
# Tests ausführen
npx playwright test

# Tests im UI-Modus
npx playwright test --ui

# Tests für spezifischen Browser
npx playwright test --project=chromium
```

### Accessibility Tests

Die Tests überprüfen automatisch:
- Korrekte Heading-Hierarchie
- Alt-Text für Bilder
- Form-Labels
- ARIA-Attribute
- Keyboard-Navigation

### Code Quality

- **ESLint**: Konfiguriert mit `next/core-web-vitals`
- **TypeScript**: Strict Mode aktiviert
- **Automatische Checks**: Während des Build-Prozesses

## 🚀 Deployment

### Vercel Deployment (Empfohlen)

Das Projekt ist für **Vercel** optimiert und nutzt automatisches CI/CD:

1. **Repository mit Vercel verbinden**
   - GitHub Repository mit Vercel verknüpfen
   - Automatisches Deployment bei jedem Push zu `main`

2. **Umgebungsvariablen** (optional)
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.august-meyer.de
   ```

### Lokaler Produktions-Build

```bash
npm run build
npm run start
```

### Build-Konfiguration

- **Next.js Config**: `next.config.js`
  - WebAssembly Support (für zukünftige Features)
  - Image Optimization
  - Webpack Fallbacks für Browser-Kompatibilität
- **TypeScript Config**: `tsconfig.json`
  - ES5 Target für Browser-Kompatibilität
  - Path Aliases (`@/*`)
  - Strict Type Checking

## 📱 Seiten

- **/** - Homepage mit Hero-Section und Kategorie-Carousel
- **/produkte** - Produktübersicht nach Kategorien mit Suche & Filter
- **/produkte/[category]** - Produkte einer Kategorie
- **/produkte/[category]/[slug]** - Produktdetailseite
- **/kontakt** - Kontaktformular und Unternehmensinformationen
- **/leistungen** - Leistungsübersicht
- **/impressum** - Rechtliche Informationen
- **/datenschutz** - Datenschutzerklärung

## 🎯 Hauptfunktionen

### Semantische Suche

Die Website verfügt über eine intelligente Suchfunktion (`lib/semanticSearch.ts`):
- **Synonym-Expansion**: Erweitert Suchbegriffe mit verwandten Begriffen
- **Relevance Scoring**: Bewertet Produkte nach Relevanz
- **Multi-Field Search**: Durchsucht Name, Beschreibung, Kategorien, Use Cases
- **Kategorie-Integration**: Berücksichtigt auch Kategorie-Beschreibungen

### Warenkorb-System

- **React Context API**: Globaler State Management (`CartContext.tsx`)
- **LocalStorage Persistierung**: Warenkorb bleibt nach Seiten-Reload erhalten
- **Produktvarianten**: Unterstützung für verschiedene Größen/Mengen
- **Responsive Design**: Mobile-optimierte Warenkorb-Ansicht

### Use-Case-Filter

- **9 Use-Case-Tags**: Öl & Fett entfernen, Grobe Verschmutzungen, etc.
- **Multi-Select**: Mehrere Filter gleichzeitig aktivierbar
- **URL-basiert**: Filter werden in URL gespeichert (shareable Links)
- **Auto-Expand**: Relevante Kategorien werden automatisch aufgeklappt

## 🔧 Konfiguration

### TailwindCSS

Konfiguriert in `tailwind.config.js` mit:
- **Custom Color Palette**: Neutral & Sustainability Farben
- **Responsive Breakpoints**: Mobile-First Design
- **Custom Typography**: Inter Font Family
- **Animation Utilities**: Fade-in & Slide-up
- **Container**: Responsive Container mit Padding

### ESLint

Konfiguriert in `.eslintrc.json`:
- **next/core-web-vitals**: Next.js optimierte Regeln
- **Automatische Checks**: Während Development und Build

### TypeScript

Konfiguriert in `tsconfig.json`:
- **Target**: ES5 (Browser-Kompatibilität)
- **Strict Mode**: Aktiviert
- **Path Aliases**: `@/*` für einfache Imports
- **Module Resolution**: Bundler (Next.js optimiert)

### SEO & Performance

- **Metadaten** für jede Seite
- **OpenGraph** und **Twitter Cards**
- **JSON-LD** strukturierte Daten
- **Core Web Vitals** optimiert
- **Lighthouse Budget** konfiguriert

## 📊 Performance

### Optimierungen

- **Image Optimization** mit Next.js automatisch
- **Code Splitting** automatisch durch Next.js
- **Client-Side Rendering** für interaktive Komponenten
- **Server-Side Rendering** für SEO-kritische Seiten
- **Static Generation** wo möglich
- **Lazy Loading** für Komponenten und Bilder

### Bundle-Größe

- **Minimal Dependencies**: Nur notwendige Bibliotheken
- **Tree Shaking**: Automatische Entfernung ungenutzten Codes
- **Optimierte Imports**: Nur benötigte Komponenten werden geladen

## 📦 Dependencies

### Production Dependencies

```json
{
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-label": "^2.1.8",
  "@radix-ui/react-radio-group": "^1.3.8",
  "@radix-ui/react-slot": "^1.1.0",
  "@xenova/transformers": "^2.17.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "lucide-react": "^0.344.0",
  "next": "14.0.4",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "tailwind-merge": "^2.2.0"
}
```

### Development Dependencies

```json
{
  "@types/node": "20.10.0",
  "@types/react": "18.2.0",
  "@types/react-dom": "18.2.0",
  "@typescript-eslint/eslint-plugin": "^6.21.0",
  "@typescript-eslint/parser": "^6.21.0",
  "autoprefixer": "10.4.0",
  "eslint": "^8.57.0",
  "eslint-config-next": "^14.2.33",
  "eslint-plugin-jsx-a11y": "^6.8.0",
  "postcss": "8.4.0",
  "tailwindcss": "3.3.0",
  "typescript": "5.0.4"
}
```

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
