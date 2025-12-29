import type { Metadata } from 'next';
import Link from 'next/link';
import { Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { CategoryCarousel } from '@/components/CategoryCarousel';
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

      {/* Hero Section - Dark Clean Industrial - Full Width */}
      <section className="relative w-full overflow-hidden">
        {/* Hintergrundbild mit Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/Geb%C3%A4ude%20und%20Sonstiges/Geb%C3%A4ude%20mit%20LKWrechts_Herosection.png)',
          }}
        />
        {/* Overlay für Lesbarkeit - behält Farbton bei, aber Bild bleibt präsenter */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1C2E]/70 via-[#122536]/65 to-[#1B2B3C]/70" />
        
        <div className="relative z-10 max-w-4xl px-6 md:px-10 lg:px-12 xl:px-16 pt-20 md:pt-24 pb-14 md:pb-16 text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            August Meyer
          </h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
            Ihr zuverlässiger Partner für Industrieputzlappen und Betriebshygiene
          </h2>
          
          <p className="mt-4 text-base md:text-lg text-white max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Als traditionsreiches Familienunternehmen stehen wir seit über 150 Jahren für höchste Qualität und Zuverlässigkeit. Unsere Produkte werden nach strengen Qualitätsstandards hergestellt und erfüllen die Anforderungen modernster Produktionsprozesse. Profitieren Sie von unserer langjährigen Erfahrung und unserem umfassenden Know-how im Vertrieb von Reinigungstextilien.
          </p>
          
          {/* USP Badges */}
          <div className="mt-6 inline-flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 bg-[#1B2B3C] border border-[#2A3F55] rounded-full text-sm text-[#E6EDF3]">
              Seit 1863
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-[#1B2B3C] border border-[#2A3F55] rounded-full text-sm text-[#E6EDF3]">
              DIN 61650
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-[#1B2B3C] border border-[#2A3F55] rounded-full text-sm text-[#E6EDF3]">
              Putzlappen
            </span>
              </div>
              
          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 mb-6">
            <Button asChild size="lg" variant="sustainability" className="font-semibold text-base">
                  <Link href="/produkte">Produkte entdecken</Link>
                </Button>
            <Button asChild size="lg" variant="outline" className="font-semibold border-2 border-[#2F6BA8] text-[#E6EDF3] hover:bg-[#2F6BA8]/20 text-base">
                  <Link href="/kontakt">Kontakt aufnehmen</Link>
                </Button>
              </div>
        </div>
      </section>
              
      {/* Core Competencies Section - Dark Industrial */}
      <Section className="bg-[#0D1C2E] py-12 md:py-16">
        <Container className="py-0">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 md:mb-10">
            <h2 className="text-balance text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Unsere Kernkompetenzen
            </h2>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Produktion & Lieferung */}
            <Card className="bg-surface border border-border-divider hover:border-accent-green hover:shadow-[0_0_8px_rgba(0,255,179,0.2)] transition-all duration-150 rounded-sm">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-accent-green/20 border border-accent-green/30 rounded-sm flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <CardTitle className="text-lg md:text-xl font-semibold text-white">Produktion & Lieferung</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed line-clamp-3">
                  Hochwertige Industrieputzlappen aus recycelten Alttextilien, hergestellt nach DIN 61650. Schneller Lieferservice aus unserem europäischen Netzwerk mit kurzen Wegen zu unseren Kunden.
                </p>
              </CardContent>
            </Card>

            {/* Umfassendes Produktsortiment */}
            <Card className="bg-surface border border-border-divider hover:border-accent-green hover:shadow-[0_0_8px_rgba(0,255,179,0.2)] transition-all duration-150 rounded-sm">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-accent-green/20 border border-accent-green/30 rounded-sm flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
              </div>
                <CardTitle className="text-lg md:text-xl font-semibold text-white">Umfassendes Produktsortiment</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed line-clamp-3">
                  Von Putzlappen und Putzwolle bis zu Putzpapierrollen und Faservliestüchern - alles für Ihre industrielle Reinigung.
                </p>
              </CardContent>
            </Card>

            {/* Schnelle Lieferung */}
            <Card className="bg-surface border border-border-divider hover:border-accent-green hover:shadow-[0_0_8px_rgba(0,255,179,0.2)] transition-all duration-150 rounded-sm">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-accent-green/20 border border-accent-green/30 rounded-sm flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
            </div>
                <CardTitle className="text-lg md:text-xl font-semibold text-white">Schnelle Lieferung</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed line-clamp-3">
                  Kurze Lieferzeiten durch unser eigenes Logistiknetzwerk und flexible Bestellmengen für Ihren Bedarf.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Product Categories - Dark Industrial */}
      <Section className="bg-[#0D1C2E] py-12 md:py-16">
        <Container className="py-0">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 md:mb-10">
            <h2 className="text-balance text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Unsere Produktkategorien
            </h2>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Bewährte Lösungen für Industrie, Handel und Handwerk. 
              Qualität, die über Generationen hält.
            </p>
          </div>

          <CategoryCarousel />

          <div className="text-center mt-10 md:mt-12">
            <Button asChild size="lg" variant="outline" className="font-semibold border-2 border-[#2F6BA8] text-[#E6EDF3] hover:bg-[#2F6BA8]/20">
              <Link href="/produkte">Alle Produkte ansehen</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Company Values - Dark Industrial */}
      <Section className="bg-[#0D1C2E] py-12 md:py-16">
        <Container className="py-0">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 md:mb-10">
            <h2 className="text-balance text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Unsere Werte
            </h2>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Die Grundlage für langfristige Partnerschaften und nachhaltige Geschäftsbeziehungen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1B2B3C] border border-[#2F6BA8]/30 rounded-full flex items-center justify-center mx-auto transition-all duration-200 hover:scale-105 hover:border-[#2F6BA8]">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-[#2F6BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Tradition</h3>
              <p className="text-base text-text-secondary leading-relaxed max-w-sm mx-auto">
                Seit 1863 in der Herstellung von Putzlappen tätig. 
                Eine solide Grundlage für Kompetenz und Service.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1B2B3C] border border-[#4CC17C]/30 rounded-full flex items-center justify-center mx-auto transition-all duration-200 hover:scale-105 hover:border-[#4CC17C]">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-[#4CC17C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m10 9v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Nachhaltigkeit</h3>
              <p className="text-base text-text-secondary leading-relaxed max-w-sm mx-auto">
                Putzlappen aus recycelten Alttextilien. Putzpapier aus Zellstoff oder Altpapieren. 
                Kreislaufwirtschaft, die überzeugt.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1B2B3C] border border-[#2F6BA8]/30 rounded-full flex items-center justify-center mx-auto transition-all duration-200 hover:scale-105 hover:border-[#2F6BA8]">
                <Handshake className="w-10 h-10 md:w-12 md:h-12 text-[#2F6BA8]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Zuverlässigkeit</h3>
              <p className="text-base text-text-secondary leading-relaxed max-w-sm mx-auto">
                Pünktliche Lieferungen und konsistente Qualität. 
                Wir sind stets bemüht, Ihren Bedürfnissen in Qualität und Service gerecht zu werden.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section - Dark Industrial */}
      <Section className="bg-[#1B2B3C] border-t border-[#2A3F55] py-12 md:py-16">
        <Container className="py-0">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <div className="space-y-3">
              <h2 className="text-balance text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
                Bereit für Ihre nächste Herausforderung?
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Lassen Sie uns gemeinsam die optimale Lösung für Ihre Anforderungen finden. 
                Persönliche Beratung, maßgeschneiderte Lösungen.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <Button asChild size="lg" variant="sustainability" className="font-semibold">
                <Link href="/kontakt">Jetzt Angebot einholen</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-[#2F6BA8] text-[#E6EDF3] hover:bg-[#2F6BA8]/20 font-semibold">
                <Link href="/produkte">Produkte ansehen</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
