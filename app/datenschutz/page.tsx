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

      <Section className="bg-[#0D1C2E] py-12 md:py-16">
        <Container className="py-0">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">1. Datenschutz auf einen Blick</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Allgemeine Hinweise</h4>
                  <p className="text-text-secondary">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen. 
                    Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
                    werden können.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Datenerfassung auf dieser Website</h4>
                  <p className="text-text-secondary">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                    Dessen Kontaktdaten können Sie dem Abschnitt &quot;Hinweis zur Verantwortlichen Stelle&quot; 
                    in dieser Datenschutzerklärung entnehmen.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">2. Verantwortliche Stelle</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-text-secondary mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-[#0D1C2E] border border-[#2A3F55] p-4 rounded-lg">
                  <p className="text-text-secondary">August Meyer GmbH & Co. KG</p>
                  <p className="text-text-secondary">Seibertstr. 5</p>
                  <p className="text-text-secondary">35708 Haiger</p>
                  <p className="text-text-secondary">Deutschland</p>
                  <p className="text-text-secondary">Telefon: 02773 / 5080</p>
                  <p className="text-text-secondary">E-Mail: info@august-meyer.de</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">3. Ihre Rechte</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <p className="text-text-secondary">
                  Sie haben folgende Rechte bezüglich der Sie betreffenden personenbezogenen Daten:
                </p>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Recht auf Auskunft</li>
                  <li>• Recht auf Berichtigung oder Löschung</li>
                  <li>• Recht auf Einschränkung der Verarbeitung</li>
                  <li>• Recht auf Widerspruch gegen die Verarbeitung</li>
                  <li>• Recht auf Datenübertragbarkeit</li>
                </ul>
                <p className="text-text-secondary">
                  Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über 
                  die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">4. Datenerfassung auf dieser Website</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Cookies</h4>
                  <p className="text-text-secondary">
                    Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem 
                    Endgerät gespeichert werden und die Ihren Browser analysieren. Cookies richten 
                    auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Server-Log-Files</h4>
                  <p className="text-text-secondary">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so 
                    genannten Server-Log Files, die Ihr Browser automatisch an uns übermittelt. 
                    Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, 
                    Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Kontaktformular</h4>
                  <p className="text-text-secondary">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben 
                    aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                    zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                    Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">5. Analyse-Tools und Tools von Drittanbietern</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-text-secondary">
                  Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. 
                  Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen 
                  zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">6. Datensicherheit</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-text-secondary">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                  Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen 
                  Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt 
                  und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">7. Änderungen</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-text-secondary">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den 
                  aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen 
                  in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1B2B3C] border border-[#2A3F55] rounded-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-white">8. Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-text-secondary mb-2">
                  Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten 
                  wenden Sie sich bitte an:
                </p>
                <div className="bg-[#0D1C2E] border border-[#2A3F55] p-4 rounded-lg">
                  <p className="text-text-secondary">August Meyer GmbH & Co. KG</p>
                  <p className="text-text-secondary">Datenschutzbeauftragter</p>
                  <p className="text-text-secondary">E-Mail: datenschutz@august-meyer.de</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
