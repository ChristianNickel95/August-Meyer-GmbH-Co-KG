'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  useEffect(() => {
    // Automatische Spracherkennung basierend auf dem Standort
    const userLanguage = navigator.language.toLowerCase();
    const isEnglish = userLanguage.startsWith('en');
    setLanguage(isEnglish ? 'en' : 'de');
  }, []);

  // Deutsche Version
  if (language === 'de') {
  return (
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
              {/* Linke Spalte: Text und Buttons */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left bg-gradient-to-r from-yellow-500 via-blue-500 to-blue-800 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Ihr zuverlässiger Partner für Industrieputzlappen und Reinigungstextilien seit über 150 Jahren
                </h1>
                <p className="text-lg text-gray-600 mb-8 text-left max-w-3xl">
                  Als traditionsreiches Familienunternehmen stehen wir für höchste Qualität und Zuverlässigkeit. 
                  Unsere Industrieputzlappen und Reinigungstextilien werden nach strengen Qualitätsstandards 
                  hergestellt und erfüllen die Anforderungen modernster Produktionsprozesse. Profitieren Sie 
                  von unserer langjährigen Erfahrung und unserem umfassenden Know-how in der Textilindustrie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                  <a
                    href="/produkte" 
                    className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-md inline-block transition-colors text-center font-medium shadow-sm hover:shadow-md"
                  >
                    Produkte entdecken
          </a>
          <a
                    href="/kontakt" 
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-8 py-3 rounded-md inline-block transition-colors text-center font-medium"
                  >
                    Kontakt aufnehmen
                  </a>
                </div>
              </div>
              {/* Rechte Spalte: Produktbild */}
              <div className="flex justify-center items-center w-full h-full min-h-[300px]">
                <img 
                  src="/lappen-tuecher_2400x.jpg" 
                  alt="Industrieputzlappen und Reinigungstextilien" 
                  className="w-full h-64 object-cover rounded-xl shadow-md border border-stone-200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 text-left">Unsere Kernkompetenzen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-stone-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Produktion & Lieferung</h3>
              <p className="text-gray-700">Hochwertige Industrieputzlappen aus recycelten Alttextilien, hergestellt nach DIN 61650. Schneller Lieferservice aus unserem europäischen Netzwerk mit kurzen Wegen zu unseren Kunden.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Umfassendes Sortiment</h3>
              <p className="text-gray-600">Von Putzlappen und Putzwolle bis zu Putzpapierrollen und Faservliestüchern - alles für Ihre industrielle Reinigung.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Schnelle Lieferung</h3>
              <p className="text-gray-600">Kurze Lieferzeiten durch unser eigenes Logistiknetzwerk und flexible Bestellmengen für Ihren Bedarf.</p>
            </div>
          </div>
        </div>

        {/* Products Preview Section */}
        <section className="bg-stone-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-gray-800 text-left">Unsere Produkte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-stone-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Putzlappen</h3>
                <p className="text-gray-700 mb-4">Hochwertige Industrieputzlappen aus recycelten Alttextilien, hergestellt nach DIN 61650. Ideal für die Aufnahme von Ölen, Fetten und anderen Flüssigkeiten in der industriellen Reinigung.</p>
                <a href="/produkte#putzlappen" className="text-blue-800 hover:text-blue-900 font-medium">
                  Produkte ansehen →
                </a>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border">
                <h3 className="text-xl font-semibold mb-4">Putzwolle</h3>
                <p className="text-gray-600 mb-4">Professionelle Putzwolle für anspruchsvolle Reinigungsaufgaben in der Industrie.</p>
                <a href="/produkte#putzwolle" className="text-blue-800 hover:text-blue-900 font-medium">
                  Produkte ansehen →
                </a>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border">
                <h3 className="text-xl font-semibold mb-4">Vliestücher</h3>
                <p className="text-gray-600 mb-4">Hochwertige Vliestücher für sensible Oberflächen und technische Anlagen.</p>
                <a href="/produkte#vliestuecher" className="text-blue-800 hover:text-blue-900 font-medium">
                  Produkte ansehen →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-left">Kontaktieren Sie uns</h2>
              <p className="text-lg text-gray-700 mb-8 text-left">
                Haben Sie Fragen zu unseren Produkten oder benötigen Sie eine individuelle Beratung? 
                Unser erfahrenes Team steht Ihnen gerne zur Verfügung. Wir beraten Sie kompetent und 
                finden gemeinsam die optimale Lösung für Ihre Anforderungen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <a href="/kontakt" className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-md inline-block transition-colors">
                  Kontakt aufnehmen
                </a>
                <a href="tel:027735080" className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-8 py-3 rounded-md inline-block transition-colors">
                  0 27 73 / 50 80
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // English Version
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
            {/* Linke Spalte: Text und Buttons */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left bg-gradient-to-r from-yellow-500 via-blue-500 to-blue-800 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Your reliable partner for industrial cleaning rags and textiles for over 150 years
              </h1>
              <p className="text-lg text-gray-600 mb-8 text-left max-w-3xl">
                Your reliable partner for industrial cleaning rags and textiles for over 150 years
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <a 
                  href="/products" 
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg inline-block transition-colors text-center font-medium shadow-sm hover:shadow-md"
                >
                  Discover products
        </a>
        <a
                  href="/contact" 
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-8 py-3 rounded-lg inline-block transition-colors text-center font-medium"
                >
                  Get in touch
                </a>
              </div>
            </div>
            {/* Rechte Spalte: Produktbild */}
            <div className="flex justify-center items-center w-full h-full min-h-[300px]">
              <img 
                src="/lappen-tuecher_2400x.jpg" 
                alt="Industrieputzlappen und Reinigungstextilien" 
                className="w-full h-64 object-cover rounded-xl shadow-md border border-stone-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-stone-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Production & Delivery</h3>
            <p className="text-gray-700">High-quality industrial cleaning rags from recycled textiles and fast delivery service from our European network.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Range</h3>
            <p className="text-gray-600">From cleaning rags and cleaning wool to paper rolls and fiber cloths - everything for your industrial cleaning needs.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick delivery times through our own logistics network and flexible order quantities for your needs.</p>
          </div>
        </div>
      </div>

      {/* Products Preview Section */}
      <section className="bg-stone-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-stone-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Cleaning Rags</h3>
              <p className="text-gray-700 mb-4">High-quality industrial cleaning rags made from recycled textiles, manufactured according to DIN 61650.</p>
              <a href="/products#cleaning-rags" className="text-blue-800 hover:text-blue-900 font-medium">
                View products →
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border">
              <h3 className="text-xl font-semibold mb-4">Cleaning Wool</h3>
              <p className="text-gray-600 mb-4">Professional cleaning wool for demanding cleaning tasks in industry.</p>
              <a href="/products#cleaning-wool" className="text-blue-800 hover:text-blue-900 font-medium">
                View products →
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border">
              <h3 className="text-xl font-semibold mb-4">Non-woven Cloths</h3>
              <p className="text-gray-600 mb-4">High-quality non-woven cloths for sensitive surfaces and technical equipment.</p>
              <a href="/products#non-woven" className="text-blue-800 hover:text-blue-900 font-medium">
                View products →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-left">Kontaktieren Sie uns</h2>
            <p className="text-lg text-gray-700 mb-8 text-left">
              Haben Sie Fragen zu unseren Produkten oder benötigen Sie eine individuelle Beratung? 
              Unser erfahrenes Team steht Ihnen gerne zur Verfügung. Wir beraten Sie kompetent und 
              finden gemeinsam die optimale Lösung für Ihre Anforderungen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <a href="/kontakt" className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-md inline-block transition-colors">
                Kontakt aufnehmen
              </a>
              <a href="tel:027735080" className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-8 py-3 rounded-md inline-block transition-colors">
                0 27 73 / 50 80
        </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}