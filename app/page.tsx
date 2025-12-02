import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'August Meyer GmbH & Co. KG - Putzlappen & Reinigungstextilien',
  description: 'Seit 1863: Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere für Industrie und Gewerbe.',
  openGraph: {
    title: 'August Meyer GmbH & Co. KG - Putzlappen & Reinigungstextilien',
    description: 'Seit 1863: Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere für Industrie und Gewerbe.',
  },
};

export default function HomePage(): JSX.Element {
  const featuredProducts = getFeaturedProducts(3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'August Meyer GmbH & Co. KG - Putzlappen & Reinigungstextilien',
          description: 'Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere',
          url: 'https://www.august-meyer.de',
          mainEntity: {
            '@type': 'Organization',
            name: 'August Meyer GmbH & Co. KG',
            description: 'Putzlappen aus recycelten Alttextilien, Putztuchreinigung, Putzpapier und Hygienepapiere'
          }
        }}
      />

      {/* Hero Section - Dyson-inspired precision: Links Text, Rechts Bild */}
      <Section className="bg-white py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-5 md:space-y-6 text-left">
              <div className="space-y-4 md:space-y-5">
                <div>
                  <h1 className="text-balance text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight">
                    Ihr zuverlässiger Partner für Industrieputzlappen und Betriebshygiene
                    <span className="block mt-2 md:mt-3 text-neutral-700 font-normal text-lg md:text-xl lg:text-2xl tracking-normal">
                      Seit 1863
                    </span>
                  </h1>
                </div>
                <p className="text-base md:text-lg lg:text-xl text-neutral-600 leading-relaxed text-balance max-w-2xl">
                  Als traditionsreiches Familienunternehmen stehen wir seit über 150 Jahren für höchste Qualität und Zuverlässigkeit. Unsere Produkte werden nach strengen Qualitätsstandards hergestellt und erfüllen die Anforderungen modernster Produktionsprozesse. Profitieren Sie von unserer langjährigen Erfahrung uns unserem umfassenden Know-How im Vertrieb von Reinigungstextilien.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild size="default" variant="default" className="font-semibold">
                  <Link href="/produkte">Sortiment entdecken</Link>
                </Button>
                <Button asChild size="default" variant="outline" className="font-semibold border-2">
                  <Link href="/kontakt">Kontakt aufnehmen</Link>
                </Button>
              </div>
              
              {/* Sustainability Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sustainability-50 border border-sustainability-200 rounded-full">
                  <svg className="w-4 h-4 text-sustainability-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-sustainability-800">Nachhaltige Kreislaufwirtschaft</span>
                </div>
              </div>
            </div>

            {/* Right: Image Placeholder */}
            <div className="relative aspect-[4/3] lg:aspect-[3/2] bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-300/80 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-neutral-700 font-semibold text-3xl md:text-4xl">AM</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Competencies Section */}
      <Section className="bg-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8 mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl font-semibold">
              Unsere Kernkompetenzen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Produktion & Lieferung */}
            <Card className="border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <CardTitle className="text-xl md:text-2xl font-semibold">Produktion & Lieferung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 leading-relaxed">
                  Hochwertige Industrieputzlappen aus recycelten Alttextilien, hergestellt nach DIN 61650. Schneller Lieferservice aus unserem europäischen Netzwerk mit kurzen Wegen zu unseren Kunden.
                </p>
              </CardContent>
            </Card>

            {/* Umfassendes Sortiment */}
            <Card className="border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <CardTitle className="text-xl md:text-2xl font-semibold">Umfassendes Sortiment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 leading-relaxed">
                  Von Putzlappen und Putzwolle bis zu Putzpapierrollen und Faservliestüchern - alles für Ihre industrielle Reinigung.
                </p>
              </CardContent>
            </Card>

            {/* Schnelle Lieferung */}
            <Card className="border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-xl md:text-2xl font-semibold">Schnelle Lieferung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 leading-relaxed">
                  Kurze Lieferzeiten durch unser eigenes Logistiknetzwerk und flexible Bestellmengen für Ihren Bedarf.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Featured Products - Vitsœ-inspired minimalism */}
      <Section className="bg-neutral-50 section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8 mb-20 md:mb-24 lg:mb-28">
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl font-semibold">
              Unsere Produktkategorien
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Bewährte Lösungen für Industrie, Handel und Handwerk. 
              Qualität, die über Generationen hält.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-20 md:mt-24 lg:mt-28">
            <Button asChild size="lg" variant="outline" className="font-semibold border-2">
              <Link href="/produkte">Zum Sortiment</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Company Values - Patagonia-inspired sustainability storytelling */}
      <Section className="bg-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8 mb-20 md:mb-24 lg:mb-28">
            <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl font-semibold">
              Unsere Werte
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Die Grundlage für langfristige Partnerschaften und nachhaltige Geschäftsbeziehungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 lg:gap-24">
            <div className="text-center space-y-5 md:space-y-6">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-neutral-100 rounded-full flex items-center justify-center mx-auto transition-all duration-200 hover:scale-105">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">Tradition</h3>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-sm mx-auto">
                Seit 1863 in der Herstellung von Putzlappen tätig. 
                Eine solide Grundlage für Kompetenz und Service.
              </p>
            </div>

            <div className="text-center space-y-5 md:space-y-6">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-sustainability-100 rounded-full flex items-center justify-center mx-auto transition-all duration-200 hover:scale-105">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-sustainability-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m10 9v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">Nachhaltigkeit</h3>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-sm mx-auto">
                Putzlappen aus recycelten Alttextilien. Putzpapier aus Zellstoff oder Altpapieren. 
                Kreislaufwirtschaft, die überzeugt.
              </p>
            </div>

            <div className="text-center space-y-5 md:space-y-6">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-neutral-100 rounded-full flex items-center justify-center mx-auto transition-all duration-200 hover:scale-105">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">Zuverlässigkeit</h3>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-sm mx-auto">
                Pünktliche Lieferungen und konsistente Qualität. 
                Wir sind stets bemüht, Ihren Bedürfnissen in Qualität und Service gerecht zu werden.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section - Lenzing-inspired professional CTA */}
      <Section className="bg-neutral-800 text-white section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-8 md:space-y-10 lg:space-y-12">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-balance text-white text-3xl md:text-4xl lg:text-5xl font-semibold">
                Bereit für Ihre nächste Herausforderung?
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                Lassen Sie uns gemeinsam die optimale Lösung für Ihre Anforderungen finden. 
                Persönliche Beratung, maßgeschneiderte Lösungen.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" variant="sustainability" className="font-semibold">
                <Link href="/kontakt">Jetzt Angebot anfragen</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-neutral-400 text-white hover:bg-neutral-800 hover:border-neutral-300 font-semibold">
                <Link href="/produkte">Sortiment ansehen</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
