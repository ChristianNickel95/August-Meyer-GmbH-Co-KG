export default function About() {
  const team = [
    {
      name: 'Stefan Moritz',
      position: 'Geschäftsführer',
      description: 'Stefan Moritz führt das Unternehmen mit über 40 Jahren Erfahrung in der Branche. Als Geschäftsführer ist er verantwortlich für die strategische Ausrichtung und die Kundenbeziehungen.',
      image: '/team/stefan-moritz.jpg'
    },
    {
      name: 'Andreas Meyer-Nechterchen',
      position: 'Co-Geschäftsführer',
      description: 'Michael Weber unterstützt als Co-Geschäftsführer die operative Leitung des Unternehmens. Seine Expertise liegt im Bereich Logistik und Lieferantenmanagement.',
      image: '/team/michael-weber.jpg'
    },
    {
      name: 'Laura Schmidt',
      position: 'Assistentin der Geschäftsführung',
      description: 'Laura Schmidt ist die zentrale Ansprechpartnerin für Kunden und Lieferanten. Sie koordiniert die täglichen Geschäftsabläufe und unterstützt das Management-Team.',
      image: '/team/laura-schmidt.jpg'
    },
    {
      name: 'Thomas Müller',
      position: 'LKW-Fahrer',
      description: 'Thomas Müller ist für die zuverlässige Auslieferung unserer Produkte an Kunden in ganz Deutschland verantwortlich. Mit seiner langjährigen Erfahrung im Transportwesen garantiert er eine pünktliche Lieferung.',
      image: '/team/thomas-mueller.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Über August Meyer</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ihr zuverlässiger Partner für Industrieputzlappen und Reinigungstextilien in Deutschland
          </p>
        </div>

        {/* Unternehmensgeschichte */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Unser Unternehmen</h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-600 mb-4">
              August Meyer ist ein traditionsreiches Familienunternehmen, das sich auf den Vertrieb von hochwertigen Industrieputzlappen und Reinigungstextilien spezialisiert hat. Als zuverlässiger Partner beliefern wir Kunden in ganz Deutschland mit einem umfassenden Sortiment an Reinigungsprodukten.
            </p>
            <p className="text-gray-600 mb-4">
              Unser Erfolg basiert auf drei wichtigen Säulen: der sorgfältigen Auswahl unserer Lieferanten, der Qualität unserer Produkte und unserem zuverlässigen Lieferservice. Wir arbeiten eng mit ausgewählten Herstellern zusammen, um Ihnen stets die beste Qualität zu fairen Preisen anbieten zu können.
            </p>
            <p className="text-gray-600">
              Als mittelständisches Unternehmen legen wir besonderen Wert auf persönlichen Service und individuelle Beratung. Unser erfahrenes Team steht Ihnen bei allen Fragen zur Verfügung und entwickelt gemeinsam mit Ihnen maßgeschneiderte Lösungen für Ihre Reinigungsanforderungen.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Unser Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  {/* Placeholder für Teammitglied-Foto */}
                  <div className="w-full h-64 bg-gray-200" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Werte Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Unsere Werte</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualität</h3>
              <p className="text-gray-600">
                Wir garantieren höchste Qualitätsstandards bei allen unseren Produkten und Dienstleistungen.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zuverlässigkeit</h3>
              <p className="text-gray-600">
                Pünktliche Lieferungen und verlässliche Partnerschaften sind unser Versprechen an Sie.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Persönlicher Service</h3>
              <p className="text-gray-600">
                Als Familienunternehmen bieten wir Ihnen eine persönliche und individuelle Betreuung.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Werden Sie unser Partner</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Suchen Sie einen zuverlässigen Partner für Ihre Reinigungsbedürfnisse? Kontaktieren Sie uns für ein persönliches Gespräch.
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </div>
  );
} 