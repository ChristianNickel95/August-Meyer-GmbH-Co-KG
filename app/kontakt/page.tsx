import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadForm } from '@/components/LeadForm';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Kontakt - August Meyer GmbH & Co. KG',
  description: 'Kontaktieren Sie uns für ein persönliches Gespräch oder eine unverbindliche Beratung.',
  openGraph: {
    title: 'Kontakt - August Meyer GmbH & Co. KG',
    description: 'Kontaktieren Sie uns für ein persönliches Gespräch oder eine unverbindliche Beratung.',
  },
};

export default function ContactPage(): JSX.Element {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Kontakt - August Meyer GmbH & Co. KG',
          description: 'Kontaktieren Sie uns für ein persönliches Gespräch',
          url: 'https://www.august-meyer.de/kontakt',
          mainEntity: {
            '@type': 'Organization',
            name: 'August Meyer GmbH & Co. KG',
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
          }
        }}
      />

      <PageHeader
        title="Kontakt"
        description="Kontaktieren Sie uns für ein persönliches Gespräch oder eine unverbindliche Beratung"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Kontakt' }
        ]}
      />

      <Section className="bg-background py-12 md:py-16 dark:bg-[#0b1a33]">
        <Container className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Contact Information */}
            <div className="space-y-6">
              <Card className="rounded-[2px] dark:rounded-sm">
                <CardHeader className="p-6">
                  <CardTitle>Unser Unternehmen</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2">August Meyer GmbH & Co. KG</h4>
                    <p className="text-muted-foreground">Seibertstr. 5</p>
                    <p className="text-muted-foreground">35708 Haiger</p>
                    <p className="text-muted-foreground">Deutschland</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2">Kontaktdaten</h4>
                    <p className="text-muted-foreground">Tel. 0 27 73 / 50 80</p>
                    <p className="text-muted-foreground">Fax 0 27 73 / 71 48 5</p>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@august-meyer.de" className="hover:text-foreground transition-colors text-primary">
                        info@august-meyer.de
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2">Geschäftszeiten</h4>
                    <p className="text-muted-foreground">Montag – Donnerstag: 08:00 – 15:30</p>
                    <p className="text-muted-foreground">Freitag: 08:00 – 14:30</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2px] dark:rounded-sm">
                <CardHeader className="p-6">
                  <CardTitle>Ihre Ansprechpartner</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Andreas Meyer-Nechterchen</h4>
                    <p className="text-muted-foreground text-sm">Geschäftsführung</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Stefan Moritz</h4>
                    <p className="text-muted-foreground text-sm">Geschäftsführung</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">Bettina Urban</h4>
                    <p className="text-muted-foreground text-sm">Sekretariat</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2px] dark:rounded-sm">
                <CardHeader className="p-6">
                  <CardTitle>Warum August Meyer?</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                          <path d="m9 11 3 3L22 4"/>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Seit 1863 in der Herstellung von Putzlappen tätig</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                          <path d="m9 11 3 3L22 4"/>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Maßgeschneiderte Lösungen für Ihre Anforderungen</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                          <path d="m9 11 3 3L22 4"/>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Persönliche Beratung und Support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                          <path d="m9 11 3 3L22 4"/>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Schnelle Lieferung und zuverlässiger Service</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right: Contact Form */}
            <div>
              <LeadForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
