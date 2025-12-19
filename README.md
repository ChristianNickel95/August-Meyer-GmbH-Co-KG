# August Meyer GmbH & Co. KG - Website

Eine moderne, professionelle Website für die August Meyer GmbH & Co. KG, entwickelt mit Next.js 14 und einem industriellen, Siemens-inspirierten Design-System.

## 🚀 Features

- **Next.js 14** mit App Router und TypeScript
- **Industrielles Design-System** inspiriert von Siemens (Dark Blue, präzise Interaktionen)
- **Responsive Design** für alle Geräte
- **Semantische Suche** mit Synonym-Expansion und Relevance Scoring
- **Warenkorb-System** mit LocalStorage Persistierung
- **Use-Case-Filter** für intelligente Produktfilterung
- **SEO-optimiert** mit Metadaten und JSON-LD
- **Barrierefreiheit** nach WCAG-Richtlinien
- **E2E-Tests** mit Playwright

## 🛠️ Technischer Stack

### Framework & Core

- **Next.js 14.0.4** - React Framework mit App Router
- **React 18.2.0** - UI Library
- **React DOM 18.2.0** - React DOM Renderer
- **TypeScript 5.0.4** - Typsichere Entwicklung

### Styling & UI

- **Tailwind CSS 3.3.0** - Utility-First CSS Framework
- **Radix UI** - Barrierefreie, unstyled UI-Komponenten
  - `@radix-ui/react-dialog` (^1.1.1) - Dialog/Modal Komponenten
  - `@radix-ui/react-label` (^2.1.8) - Form Labels
  - `@radix-ui/react-radio-group` (^1.3.8) - Radio Button Groups
  - `@radix-ui/react-slot` (^1.1.0) - Composition Pattern für Komponenten
- **Lucide React 0.344.0** - Moderne Icon Library
- **class-variance-authority 0.7.0** - Type-safe Component Variants
- **clsx 2.1.0** - Conditional CSS Classes
- **tailwind-merge 2.2.0** - Intelligentes Mergen von Tailwind-Klassen

### Machine Learning & Suche

- **@xenova/transformers 2.17.2** - Transformers.js für semantische Suche (WebAssembly)

### Development Tools

- **ESLint 8.57.0** - Code Linting
- **eslint-config-next 14.2.33** - Next.js ESLint Konfiguration
- **eslint-plugin-jsx-a11y 6.8.0** - Accessibility Linting
- **@typescript-eslint/eslint-plugin 6.21.0** - TypeScript ESLint Plugin
- **@typescript-eslint/parser 6.21.0** - TypeScript ESLint Parser
- **TypeScript 5.0.4** - Type Checking
- **PostCSS 8.4.0** - CSS Processing
- **Autoprefixer 10.4.0** - CSS Vendor Prefixes

### Type Definitions

- **@types/node 20.10.0** - Node.js Type Definitions
- **@types/react 18.2.0** - React Type Definitions
- **@types/react-dom 18.2.0** - React DOM Type Definitions

## 🎨 Design-System

### Farbkonzept (Siemens-inspiriert)

- **Primary Background**: `#0b1a33` bis `#0e1f3d` (Dark Blue)
- **Secondary Background**: `#13294b`
- **Surface / Card Backgrounds**: `#13294b` (leicht aufgehelltes Dark Blue)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#c7d2e0`
- **Accent / Interaction Color**: `#00ffb3` (Siemens-Grün)
- **Borders / Divider**: `rgba(255,255,255,0.08)`

### UI-Prinzipien

- **Border-Radius**: Maximal 2-4px (`rounded-sm`)
- **Klare, rechteckige Buttons** - keine stark abgerundeten Ecken
- **Industrielle, technische Anmutung**
- **Weißer Text auf dunklem Blau** als Standard
- **Grün ausschließlich für**: Hover, Fokus, aktive Zustände, CTAs

### Interaktionen

- **Hover-Effekte**: Subtile grüne Akzente (Border, Glow)
- **Transition-Dauer**: 150-200ms
- **Keine verspielten Animationen** - präzise und technisch

## 📁 Projektstruktur

```
August-Meyer/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   └── lead/                # Lead-Formular Endpoint
│   ├── produkte/                # Produktseiten
│   │   ├── page.tsx             # Produktübersicht
│   │   └── [category]/         # Kategorie-Seiten
│   │       ├── page.tsx         # Kategorie-Übersicht
│   │       └── [slug]/          # Produktdetailseiten
│   │           ├── page.tsx
│   │           └── ProductDetailClient.tsx
│   ├── kontakt/                 # Kontaktseite
│   ├── leistungen/              # Leistungsseite
│   ├── datenschutz/             # Datenschutz
│   ├── impressum/               # Impressum
│   ├── globals.css              # Globale Styles & CSS Variables
│   ├── layout.tsx               # Root Layout
│   ├── page.tsx                 # Homepage
│   ├── error.tsx                # Error Boundary
│   └── not-found.tsx            # 404 Seite
├── components/                  # React Komponenten
│   ├── ui/                     # Reusable UI Components (Shadcn)
│   │   ├── button.tsx          # Button Komponente
│   │   ├── card.tsx            # Card Komponente
│   │   ├── dialog.tsx           # Dialog/Modal
│   │   ├── input.tsx            # Input Field
│   │   ├── label.tsx            # Form Label
│   │   ├── radio-group.tsx      # Radio Group
│   │   └── table.tsx            # Table Komponente
│   ├── Navbar.tsx               # Navigation mit Suche
│   ├── Footer.tsx               # Footer
│   ├── ProductCard.tsx          # Produktkarte
│   ├── CategoryCard.tsx         # Kategoriekarte
│   ├── CategoryCarousel.tsx     # Kategorie-Carousel (jetzt Grid)
│   ├── Cart.tsx                 # Warenkorb
│   ├── CartContext.tsx          # Warenkorb State Management
│   ├── ProductFilter.tsx        # Use-Case-Filter
│   ├── SearchResultsBadge.tsx   # Suchergebnis-Badge
│   ├── LeadForm.tsx             # Kontaktformular
│   ├── PageHeader.tsx           # Seiten-Header mit Breadcrumbs
│   ├── Logo.tsx                 # Logo Komponente
│   └── ...                      # Weitere Komponenten
├── content/                     # JSON Daten
│   ├── categories.json          # Produktkategorien & Subkategorien
│   ├── products.json            # Produktdaten mit Varianten
│   └── useCases.json            # Use-Case-Mapping für Filter
├── lib/                         # Utility-Funktionen
│   ├── products.ts              # Produkt-Helpers & Datenzugriff
│   ├── semanticSearch.ts        # Semantische Suchlogik
│   ├── packaging.ts             # Verpackungs-Informationen
│   └── utils.ts                 # Allgemeine Utilities
├── tests/                       # E2E Tests (Playwright)
│   ├── home.spec.ts             # Homepage Tests
│   └── contact.spec.ts          # Kontaktseite Tests
├── public/                      # Statische Assets
│   ├── images/                 # Bilder
│   │   ├── Hero_Section_Startseite_AM_cleaning-cloths.jpg
│   │   └── Produkte/           # Produktbilder
│   └── logo.svg                 # Logo
├── next.config.js               # Next.js Konfiguration
├── tailwind.config.js           # Tailwind CSS Konfiguration
├── tsconfig.json                # TypeScript Konfiguration
├── postcss.config.js            # PostCSS Konfiguration
├── playwright.config.ts         # Playwright Test Konfiguration
└── package.json                 # Dependencies & Scripts
```

## 🛠️ Installation

### Voraussetzungen

- **Node.js 18+** oder **20+**
- **npm** (mitgeliefert mit Node.js)

### Setup

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd August-Meyer
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
  - WebAssembly Support (für Transformers.js)
  - Image Optimization
  - Webpack Fallbacks für Browser-Kompatibilität
- **TypeScript Config**: `tsconfig.json`
  - ES5 Target für Browser-Kompatibilität
  - Path Aliases (`@/*`)
  - Strict Type Checking

## 📱 Seiten

- **/** - Homepage mit Hero-Section und Produktkategorien
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
- **Transformers.js**: Nutzt WebAssembly für semantische Ähnlichkeit

### Warenkorb-System

- **React Context API**: Globaler State Management (`CartContext.tsx`)
- **LocalStorage Persistierung**: Warenkorb bleibt nach Seiten-Reload erhalten
- **Produktvarianten**: Unterstützung für verschiedene Größen/Mengen
- **Responsive Design**: Mobile-optimierte Warenkorb-Ansicht
- **Kategorie-spezifische Defaults**: Automatische Mengenangaben je nach Produkttyp

### Use-Case-Filter

- **9 Use-Case-Tags**: Öl & Fett entfernen, Grobe Verschmutzungen, etc.
- **Multi-Select**: Mehrere Filter gleichzeitig aktivierbar
- **URL-basiert**: Filter werden in URL gespeichert (shareable Links)
- **Auto-Expand**: Relevante Kategorien werden automatisch aufgeklappt

### Produktverwaltung

- **JSON-basierte Datenstruktur**: Einfache Verwaltung ohne Datenbank
- **Varianten-System**: Produkte mit verschiedenen Varianten (Größe, Farbe, etc.)
- **Kategorien & Subkategorien**: Hierarchische Produktstruktur
- **Artikelnummern**: Automatische Verwaltung und Anzeige
- **Verpackungsinformationen**: Kategorie-spezifische Verpackungs- und Palettengrößen

## 🔧 Konfiguration

### TailwindCSS

Konfiguriert in `tailwind.config.js` mit:
- **Custom Color Palette**: Design-System Farben (Primary, Secondary, Surface, Accent)
- **Responsive Breakpoints**: Mobile-First Design
- **Custom Typography**: Inter Font Family
- **CSS Variables**: Integration mit `globals.css`
- **Container**: Responsive Container mit Padding

### CSS Variables (globals.css)

Das Design-System nutzt CSS Variables für konsistente Farben:
- `--primary-bg`: `#0b1a33`
- `--primary-bg-alt`: `#0e1f3d`
- `--secondary-bg`: `#13294b`
- `--surface`: `#13294b`
- `--text-primary`: `#ffffff`
- `--text-secondary`: `#c7d2e0`
- `--accent-green`: `#00ffb3`
- `--border-divider`: `rgba(255,255,255,0.08)`

### ESLint

Konfiguriert in `.eslintrc.json`:
- **next/core-web-vitals**: Next.js optimierte Regeln
- **Automatische Checks**: Während Development und Build
- **Accessibility**: JSX-A11y Plugin aktiviert

### TypeScript

Konfiguriert in `tsconfig.json`:
- **Target**: ES5 (Browser-Kompatibilität)
- **Strict Mode**: Aktiviert
- **Path Aliases**: `@/*` für einfache Imports
- **Module Resolution**: Bundler (Next.js optimiert)

### SEO & Performance

- **Metadaten** für jede Seite
- **OpenGraph** und **Twitter Cards**
- **JSON-LD** strukturierte Daten (Schema.org)
- **Core Web Vitals** optimiert
- **Image Optimization** automatisch durch Next.js

## 📊 Performance

### Optimierungen

- **Image Optimization** mit Next.js automatisch
- **Code Splitting** automatisch durch Next.js
- **Client-Side Rendering** für interaktive Komponenten
- **Server-Side Rendering** für SEO-kritische Seiten
- **Static Generation** wo möglich
- **Lazy Loading** für Komponenten und Bilder
- **WebAssembly** für effiziente semantische Suche

### Bundle-Größe

- **Minimal Dependencies**: Nur notwendige Bibliotheken
- **Tree Shaking**: Automatische Entfernung ungenutzten Codes
- **Optimierte Imports**: Nur benötigte Komponenten werden geladen
- **Dynamic Imports**: Semantische Suche wird nur bei Bedarf geladen

## 📦 Dependencies

### Production Dependencies

| Package | Version | Beschreibung |
|---------|---------|--------------|
| `next` | 14.0.4 | React Framework mit App Router |
| `react` | 18.2.0 | React Library |
| `react-dom` | 18.2.0 | React DOM Renderer |
| `@radix-ui/react-dialog` | ^1.1.1 | Barrierefreie Dialog/Modal Komponenten |
| `@radix-ui/react-label` | ^2.1.8 | Barrierefreie Form Labels |
| `@radix-ui/react-radio-group` | ^1.3.8 | Barrierefreie Radio Button Groups |
| `@radix-ui/react-slot` | ^1.1.0 | Composition Pattern für Komponenten |
| `@xenova/transformers` | ^2.17.2 | Transformers.js für ML (WebAssembly) |
| `class-variance-authority` | ^0.7.0 | Type-safe Component Variants |
| `clsx` | ^2.1.0 | Conditional CSS Classes |
| `lucide-react` | ^0.344.0 | Moderne Icon Library |
| `tailwind-merge` | ^2.2.0 | Intelligentes Mergen von Tailwind-Klassen |

### Development Dependencies

| Package | Version | Beschreibung |
|---------|---------|--------------|
| `typescript` | 5.0.4 | TypeScript Compiler |
| `@types/node` | 20.10.0 | Node.js Type Definitions |
| `@types/react` | 18.2.0 | React Type Definitions |
| `@types/react-dom` | 18.2.0 | React DOM Type Definitions |
| `eslint` | ^8.57.0 | JavaScript/TypeScript Linter |
| `eslint-config-next` | ^14.2.33 | Next.js ESLint Konfiguration |
| `eslint-plugin-jsx-a11y` | ^6.8.0 | Accessibility ESLint Plugin |
| `@typescript-eslint/eslint-plugin` | ^6.21.0 | TypeScript ESLint Plugin |
| `@typescript-eslint/parser` | ^6.21.0 | TypeScript ESLint Parser |
| `tailwindcss` | 3.3.0 | Tailwind CSS Framework |
| `postcss` | 8.4.0 | CSS Processing Tool |
| `autoprefixer` | 10.4.0 | CSS Vendor Prefixes |

## 🌐 Browser-Unterstützung

- **Chrome/Edge**: Aktuelle Versionen
- **Firefox**: Aktuelle Versionen
- **Safari**: Aktuelle Versionen
- **Mobile Browser**: iOS Safari, Chrome Mobile

## 🔒 Sicherheit

- **CSRF Protection** in Formularen
- **Input Validation** auf Server-Seite
- **HTTPS** erzwungen (in Production)
- **Security Headers** konfiguriert
- **XSS Protection** durch React's automatisches Escaping

## 📈 Monitoring

### Analytics

- **Core Web Vitals** Tracking
- **Error Monitoring** implementiert
- **Performance Metrics** verfügbar

### Logging

- **Strukturierte Logs** für Leads
- **Error Tracking** für Debugging
- **Audit Trail** für Compliance

## Guidelines

1. **Fork** das Repository
2. **Feature Branch** erstellen (`git checkout -b feature/newFeature`)
3. **Änderungen committen** (`git commit -m 'Add some newFeature'`)
4. **Branch pushen** (`git push origin feature/newFeature`)
5. **Pull Request** erstellen