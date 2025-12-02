import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Datenschutz - August Meyer GmbH & Co. KG',
  description: 'Datenschutzerklärung der August Meyer GmbH & Co. KG - Informationen zum Umgang mit Ihren personenbezogenen Daten',
  openGraph: {
    title: 'Datenschutz - August Meyer GmbH & Co. KG',
    description: 'Datenschutzerklärung der August Meyer GmbH & Co. KG - Informationen zum Umgang mit Ihren personenbezogenen Daten',
  },
};

export default function DatenschutzPage(): JSX.Element {
  return (
    <>
      <PageHeader
        title="Datenschutz"
        description="Informationen zum Umgang mit Ihren personenbezogenen Daten"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Datenschutz' }
        ]}
      />

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Datenschutz auf einen Blick</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Allgemeine Hinweise</h4>
                  <p className="text-gray-700">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen. 
                    Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
                    werden können.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Datenerfassung auf dieser Website</h4>
                  <p className="text-gray-700">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                    Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" 
                    in dieser Datenschutzerklärung entnehmen.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Verantwortliche Stelle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">August Meyer GmbH & Co. KG</p>
                  <p className="text-gray-700">Musterstraße 123</p>
                  <p className="text-gray-700">12345 Musterstadt</p>
                  <p className="text-gray-700">Deutschland</p>
                  <p className="text-gray-700">Telefon: +49 123 456789</p>
                  <p className="text-gray-700">E-Mail: info@august-meyer.de</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Ihre Rechte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Sie haben folgende Rechte bezüglich der Sie betreffenden personenbezogenen Daten:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Recht auf Auskunft</li>
                  <li>• Recht auf Berichtigung oder Löschung</li>
                  <li>• Recht auf Einschränkung der Verarbeitung</li>
                  <li>• Recht auf Widerspruch gegen die Verarbeitung</li>
                  <li>• Recht auf Datenübertragbarkeit</li>
                </ul>
                <p className="text-gray-700">
                  Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über 
                  die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Datenerfassung auf dieser Website</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cookies</h4>
                  <p className="text-gray-700">
                    Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem 
                    Endgerät gespeichert werden und die Ihren Browser analysieren. Cookies richten 
                    auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Server-Log-Files</h4>
                  <p className="text-gray-700">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so 
                    genannten Server-Log Files, die Ihr Browser automatisch an uns übermittelt. 
                    Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, 
                    Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Kontaktformular</h4>
                  <p className="text-gray-700">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben 
                    aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                    zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                    Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Analyse-Tools und Tools von Drittanbietern</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. 
                  Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen 
                  zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Datensicherheit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                  Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen 
                  Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt 
                  und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Änderungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den 
                  aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen 
                  in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Kontakt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">
                  Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten 
                  wenden Sie sich bitte an:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">August Meyer GmbH & Co. KG</p>
                  <p className="text-gray-700">Datenschutzbeauftragter</p>
                  <p className="text-gray-700">E-Mail: datenschutz@august-meyer.de</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
