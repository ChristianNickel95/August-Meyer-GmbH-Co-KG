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

      <Section className="bg-[#0D1C2E] py-12 md:py-16">
        <Container className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Contact Information */}
            <div className="space-y-6">
              <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-white">Unser Unternehmen</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">August Meyer GmbH & Co. KG</h4>
                    <p className="text-neutral-300">Seibertstr. 5</p>
                    <p className="text-neutral-300">35708 Haiger</p>
                    <p className="text-neutral-300">Deutschland</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Kontaktdaten</h4>
                    <p className="text-neutral-300">Tel. 0 27 73 / 50 80</p>
                    <p className="text-neutral-300">Fax 0 27 73 / 71 48 5</p>
                    <p className="text-neutral-300">
                      <a href="mailto:info@august-meyer.de" className="hover:text-white transition-colors text-[#2F6BA8]">
                        info@august-meyer.de
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">Geschäftszeiten</h4>
                    <p className="text-neutral-300">Montag - Freitag: 8:00 - 17:00 Uhr</p>
                    <p className="text-neutral-300">Samstag: 9:00 - 12:00 Uhr</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-white">Ihre Ansprechpartner</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">Andreas Meyer-Nechterchen</h4>
                    <p className="text-neutral-300 text-sm">Geschäftsführung</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Stefan Moritz</h4>
                    <p className="text-neutral-300 text-sm">Co-Geschäftsführung</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Bettina Urban</h4>
                    <p className="text-neutral-300 text-sm">Kundenbetreuung</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-white">Warum August Meyer?</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-[#2F6BA8] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-300">Seit 1863 in der Herstellung von Putzlappen tätig</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-[#2F6BA8] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-300">Maßgeschneiderte Lösungen für Ihre Anforderungen</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-[#2F6BA8] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-300">Persönliche Beratung und Support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-[#2F6BA8] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-300">Schnelle Lieferung und zuverlässiger Service</span>
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
