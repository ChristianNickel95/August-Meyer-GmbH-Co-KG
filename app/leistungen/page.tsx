import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Leistungen - August Meyer GmbH & Co. KG',
  description: 'Unsere Produkte und Dienstleistungen: Industrieputzlappen, Putzwolle, Vliestücher, Putzpapierrollen und Reinigungsdienstleistungen',
  openGraph: {
    title: 'Leistungen - August Meyer GmbH & Co. KG',
    description: 'Unsere Produkte und Dienstleistungen: Industrieputzlappen, Putzwolle, Vliestücher, Putzpapierrollen und Reinigungsdienstleistungen',
  },
};

export default function LeistungenPage(): JSX.Element {
  return (
    <>
      <PageHeader
        title="Unsere Produkte & Dienstleistungen"
        description={`August Meyer ist ein traditionsreiches Familienunternehmen, das sich auf den Vertrieb von hochwertigen Industrieputzlappen und Reinigungstextilien spezialisiert hat. Als zuverlässiger Partner beliefern wir Kunden in ganz Deutschland mit einem umfassenden Sortiment an Reinigungsprodukten.

Unser Erfolg basiert auf drei wichtigen Säulen: der sorgfältigen Auswahl unserer Lieferanten, der Qualität unserer Produkte und unserem zuverlässigen Lieferservice. Wir arbeiten eng mit ausgewählten Herstellern zusammen, um Ihnen stets die beste Qualität zu fairen Preisen anbieten zu können.

Als mittelständisches Unternehmen legen wir besonderen Wert auf persönlichen Service und individuelle Beratung. Unser erfahrenes Team steht Ihnen bei allen Fragen zur Verfügung und entwickelt gemeinsam mit Ihnen maßgeschneiderte Lösungen für Ihre Reinigungsanforderungen.`}
        fullWidth={true}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Leistungen' }
        ]}
      />

      <Section className="bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Industrieputzlappen */}
            <Card className="border-2 border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl font-semibold mb-2">Industrieputzlappen</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 leading-relaxed">
                  Hochwertige Putzlappen aus recycelten Alttextilien, speziell für die industrielle Reinigung entwickelt. Unsere Putzlappen sind ideal für die Reinigung von Maschinen und Anlagen.
                </p>
              </CardContent>
            </Card>

            {/* Putzwolle & Vliestücher */}
            <Card className="border-2 border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl font-semibold mb-2">Putzwolle & Vliestücher</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 leading-relaxed">
                  Spezialisierte Putzwolle und Faservliestücher für anspruchsvolle Reinigungsaufgaben. Ideal für die Reinigung empfindlicher Oberflächen und technischer Anlagen.
                </p>
              </CardContent>
            </Card>

            {/* Putzpapierrollen */}
            <Card className="border-2 border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl font-semibold mb-2">Putzpapierrollen</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 leading-relaxed">
                  Verschiedene Sorten von Putzpapierrollen für jeden Einsatzbereich. Von Standard bis Spezialpapier für spezifische Reinigungsanforderungen.
                </p>
              </CardContent>
            </Card>

            {/* Reinigungsdienstleistungen */}
            <Card className="border-2 border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl md:text-2xl font-semibold mb-2">Reinigungsdienstleistungen</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 leading-relaxed">
                  Professionelle Wäscherei- und Reinigungsservices für Ihre Maschinenputztücher. Wir bieten maßgeschneiderte Lösungen für Ihre spezifischen Anforderungen.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Individual Consultation CTA */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              Individuelle Beratung
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              Unser erfahrenes Team berät Sie gerne bei der Auswahl der richtigen Produkte für Ihre spezifischen Anforderungen. Kontaktieren Sie uns für eine persönliche Beratung.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" variant="default" className="font-semibold">
                <Link href="/kontakt">Beratung anfordern</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

