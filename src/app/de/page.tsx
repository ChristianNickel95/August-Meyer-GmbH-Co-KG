export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">August Meyer GmbH</h1>
            <p className="text-xl mb-8">Ihr Partner für Industrieputzlappen und Reinigungstextilien seit über 150 Jahren</p>
            <a href="/kontakt" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg inline-block transition-colors">
              Kontaktieren Sie uns
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Kernkompetenzen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produktion & Lieferung</h3>
              <p className="text-gray-600">Hochwertige Industrieputzlappen aus recycelten Alttextilien und schneller Lieferservice aus unserem europäischen Netzwerk.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Umfassendes Sortiment</h3>
              <p className="text-gray-600">Von Putzlappen und Putzwolle bis zu Putzpapierrollen und Faservliestüchern - alles für Ihre industrielle Reinigung.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Persönlicher Service</h3>
              <p className="text-gray-600">Fachliche Beratung, Außendienstbesuche und maßgeschneiderte Lösungen für Ihre spezifischen Anforderungen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Produkte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Industrieputzlappen</h3>
              <p className="text-gray-600">Hochwertige Putzlappen aus recycelten Alttextilien für die industrielle Reinigung.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Putzwolle</h3>
              <p className="text-gray-600">Spezialisierte Putzwolle für anspruchsvolle Reinigungsaufgaben.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Putzpapierrollen</h3>
              <p className="text-gray-600">Verschiedene Sorten von Putzpapierrollen für jeden Einsatzbereich.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Faservliestücher</h3>
              <p className="text-gray-600">Hochwertige Faservliestücher für spezielle Reinigungsanforderungen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ihr Partner für industrielle Reinigung</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für eine individuelle Beratung und ein maßgeschneidertes Angebot für Ihre Reinigungsbedürfnisse.
          </p>
          <a href="/kontakt" className="bg-white text-blue-600 px-8 py-3 rounded-lg inline-block hover:bg-gray-100 transition-colors">
            Jetzt anfragen
          </a>
        </div>
      </section>
    </div>
  );
} 