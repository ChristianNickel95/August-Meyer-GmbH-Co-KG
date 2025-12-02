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

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Unser Unternehmen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">August Meyer GmbH & Co. KG</h4>
                    <p className="text-gray-600">Seibertstr. 5</p>
                    <p className="text-gray-600">35708 Haiger</p>
                    <p className="text-gray-600">Deutschland</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Kontaktdaten</h4>
                    <p className="text-gray-600">Tel. 0 27 73 / 50 80</p>
                    <p className="text-gray-600">Fax 0 27 73 / 71 48 5</p>
                    <p className="text-gray-600">
                      <a href="mailto:info@august-meyer.de" className="hover:text-neutral-900 transition-colors">
                        info@august-meyer.de
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Geschäftszeiten</h4>
                    <p className="text-gray-600">Montag - Freitag: 8:00 - 17:00 Uhr</p>
                    <p className="text-gray-600">Samstag: 9:00 - 12:00 Uhr</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ihre Ansprechpartner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Andreas Meyer-Nechterchen</h4>
                    <p className="text-gray-600 text-sm">Geschäftsführung</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Stefan Moritz</h4>
                    <p className="text-gray-600 text-sm">Co-Geschäftsführung</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Bettina Urban</h4>
                    <p className="text-gray-600 text-sm">Kundenbetreuung</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Warum August Meyer?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Seit 1863 in der Herstellung von Putzlappen tätig</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Maßgeschneiderte Lösungen für Ihre Anforderungen</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Persönliche Beratung und Support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Schnelle Lieferung und zuverlässiger Service</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <LeadForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
