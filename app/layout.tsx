import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchResultsBadge } from '@/components/SearchResultsBadge';
import { JsonLd } from '@/components/JsonLd';
import { CartProvider } from '@/components/CartContext';
import { Cart } from '@/components/Cart';
import { FloatingContactButton } from '@/components/FloatingContactButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'August Meyer GmbH & Co. KG - Industrielle Lösungen',
    template: '%s | August Meyer GmbH & Co. KG'
  },
  description: 'Seit 1863: Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere für Industrie und Gewerbe.',
  keywords: ['Industrie', 'Lösungen', 'Produkte', 'Technik', 'August Meyer'],
  authors: [{ name: 'August Meyer GmbH & Co. KG' }],
  creator: 'August Meyer GmbH & Co. KG',
  publisher: 'August Meyer GmbH & Co. KG',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.august-meyer.de'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.august-meyer.de',
    title: 'August Meyer GmbH & Co. KG - Industrielle Lösungen',
    description: 'Seit 1863: Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere für Industrie und Gewerbe.',
    siteName: 'August Meyer GmbH & Co. KG',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'August Meyer GmbH & Co. KG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'August Meyer GmbH & Co. KG - Industrielle Lösungen',
    description: 'Seit 1863: Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere für Industrie und Gewerbe.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'August Meyer GmbH & Co. KG',
            url: 'https://www.august-meyer.de',
            logo: 'https://www.august-meyer.de/logo.png',
            description: 'Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Seibertstr. 5',
              addressLocality: 'Haiger',
              postalCode: '35708',
              addressCountry: 'DE'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+49-2773-5080',
              contactType: 'customer service',
              areaServed: 'DE',
              availableLanguage: 'German'
            }
          }}
        />
        <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#0b1a33]">
          <Navbar />
            <SearchResultsBadge />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
            <Cart />
            <FloatingContactButton />
        </div>
        </CartProvider>
      </body>
    </html>
  );
}
