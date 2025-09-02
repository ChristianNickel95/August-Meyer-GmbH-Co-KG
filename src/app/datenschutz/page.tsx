import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - August Meyer GmbH & Co KG',
  description: 'Datenschutzerklärung der August Meyer GmbH & Co KG - Informationen zum Umgang mit Ihren personenbezogenen Daten',
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Stand:</strong> {new Date().toLocaleDateString('de-DE')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Verantwortlicher</h2>
              <p className="text-gray-700 mb-4">
                August Meyer GmbH & Co KG<br />
                Seibertstr. 5<br />
                35708 Haiger<br />
                Deutschland
              </p>
              <p className="text-gray-700">
                <strong>Kontakt:</strong><br />
                Telefon: 0 27 73 / 50 80<br />
                E-Mail: info@august-meyer.de
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p className="text-gray-700 mb-4">
                Wir erheben und verarbeiten personenbezogene Daten nur im notwendigen Umfang und ausschließlich für die in dieser Datenschutzerklärung genannten Zwecke.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Kontaktformular</h3>
              <p className="text-gray-700 mb-4">
                Wenn Sie unser Kontaktformular nutzen, erheben wir folgende Daten:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name (zur persönlichen Ansprache)</li>
                <li>E-Mail-Adresse (zur Kontaktaufnahme)</li>
                <li>Telefonnummer (optional, für Rückruf)</li>
                <li>Nachricht (zur Bearbeitung Ihrer Anfrage)</li>
              </ul>
              <p className="text-gray-700">
                Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme verwendet.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Rechtsgrundlage der Verarbeitung</h2>
              <p className="text-gray-700 mb-4">
                Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage von:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Zur Durchführung vorvertraglicher Maßnahmen</li>
                <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Aufgrund unseres berechtigten Interesses an der Bearbeitung Ihrer Anfrage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Zweck der Datenverarbeitung</h2>
              <p className="text-gray-700 mb-4">
                Ihre personenbezogenen Daten werden verarbeitet, um:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Ihre Anfragen zu beantworten</li>
                <li>Angebote zu erstellen</li>
                <li>Geschäftsbeziehungen aufzubauen und zu pflegen</li>
                <li>Unseren Service zu verbessern</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Speicherdauer</h2>
              <p className="text-gray-700 mb-4">
                Ihre personenbezogenen Daten werden gelöscht, sobald sie für die genannten Zwecke nicht mehr erforderlich sind. 
                Dies geschieht in der Regel nach Abschluss der Bearbeitung Ihrer Anfrage, spätestens jedoch nach 2 Jahren.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Ihre Rechte</h2>
              <p className="text-gray-700 mb-4">
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über die zu Ihrer Person gespeicherten Daten verlangen</li>
                <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen</li>
                <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
                <li><strong>Einschränkungsrecht:</strong> Sie können die Einschränkung der Verarbeitung verlangen</li>
                <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung widersprechen</li>
                <li><strong>Datenübertragbarkeitsrecht:</strong> Sie können die Übertragung Ihrer Daten verlangen</li>
              </ul>
              <p className="text-gray-700">
                Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter den oben genannten Kontaktdaten.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Beschwerderecht</h2>
              <p className="text-gray-700">
                Sie haben das Recht, sich bei einer Aufsichtsbehörde für den Datenschutz zu beschweren, 
                wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten rechtswidrig erfolgt.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Datensicherheit</h2>
              <p className="text-gray-700 mb-4">
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre personenbezogenen Daten 
                gegen Manipulation, Verlust, Zerstörung oder gegen den Zugriff unberechtigter Personen zu schützen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Änderungen dieser Datenschutzerklärung</h2>
              <p className="text-gray-700">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Kontakt</h2>
              <p className="text-gray-700">
                Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten wenden Sie sich bitte an:
              </p>
              <p className="text-gray-700 mt-2">
                <strong>August Meyer GmbH & Co KG</strong><br />
                Datenschutzbeauftragter<br />
                Seibertstr. 5<br />
                35708 Haiger<br />
                E-Mail: datenschutz@august-meyer.de
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
