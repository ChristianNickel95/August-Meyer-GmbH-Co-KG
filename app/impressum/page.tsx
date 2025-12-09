import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Impressum - August Meyer GmbH & Co. KG',
  description: 'Rechtliche Informationen und Unternehmensangaben der August Meyer GmbH & Co. KG',
  openGraph: {
    title: 'Impressum - August Meyer GmbH & Co. KG',
    description: 'Rechtliche Informationen und Unternehmensangaben der August Meyer GmbH & Co. KG',
  },
};

export default function ImpressumPage(): JSX.Element {
  return (
    <>
      <PageHeader
        title="Impressum"
        description="Rechtliche Informationen und Unternehmensangaben"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Impressum' }
        ]}
      />

      <Section className="bg-[#0D1C2E] py-12 md:py-16">
        <Container className="py-0">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">Angaben gemäß § 5 TMG</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Unternehmen</h4>
                  <p className="text-neutral-300">August Meyer GmbH & Co. KG</p>
                  <p className="text-neutral-300">Seibertstr. 5</p>
                  <p className="text-neutral-300">35708 Haiger</p>
                  <p className="text-neutral-300">Deutschland</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Kontakt</h4>
                  <p className="text-neutral-300">Tel.: 02773 / 5080</p>
                  <p className="text-neutral-300">Fax: 02773 / 71485</p>
                  <p className="text-neutral-300">
                    <a href="mailto:info@august-meyer.de" className="text-[#6FE0FF] hover:text-[#6FE0FF]/80 transition-colors">
                      info@august-meyer.de
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Umsatzsteuer-ID</h4>
                  <p className="text-neutral-300">Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:</p>
                  <p className="text-neutral-300">DE111796861</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Steuer-Nr.</h4>
                  <p className="text-neutral-300">00934630062</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-neutral-300">August Meyer GmbH & Co. KG</p>
                <p className="text-neutral-300">Seibertstr. 5</p>
                <p className="text-neutral-300">35708 Haiger</p>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">Haftungsausschluss</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Haftung für Inhalte</h4>
                  <p className="text-neutral-300">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Haftung für Links</h4>
                  <p className="text-neutral-300">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Urheberrecht</h4>
                  <p className="text-neutral-300">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
