'use client';

import { useState } from 'react';
import { generateLeadEmailHTML, generateLeadEmailText, generateLeadEmailSubject } from '@/lib/email-templates';

export default function TestEmail() {
  const [testData, setTestData] = useState({
    name: 'Max Mustermann',
    email: 'max.mustermann@beispiel.de',
    telefon: '+49 123 456789',
    nachricht: 'Ich interessiere mich für Ihre Hygienepapiere und benötige ein Angebot für 100 Stück. Bitte senden Sie mir weitere Informationen zu den Produktspezifikationen und Lieferzeiten.',
    productSlug: 'papierhandtuecher',
    categorySlug: 'hygienepapiere',
    timestamp: new Date().toISOString()
  });

  const htmlContent = generateLeadEmailHTML(testData);
  const textContent = generateLeadEmailText(testData);
  const subjectContent = generateLeadEmailSubject(testData);

  const handleInputChange = (field: string, value: string) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimestampChange = (value: string) => {
    setTestData(prev => ({ ...prev, timestamp: new Date(value).toISOString() }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('In Zwischenablage kopiert!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">E-Mail-Template Test</h1>
          <p className="text-lg text-gray-600">
            Testen Sie hier Ihre E-Mail-Templates mit verschiedenen Daten
          </p>
        </div>

        {/* Test-Daten Eingabe - Zentriert */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Test-Daten anpassen</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={testData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={testData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={testData.telefon}
                  onChange={(e) => handleInputChange('telefon', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachricht
                </label>
                <textarea
                  value={testData.nachricht}
                  onChange={(e) => handleInputChange('nachricht', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Produkt-Slug
                </label>
                <input
                  type="text"
                  value={testData.productSlug}
                  onChange={(e) => handleInputChange('productSlug', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorie-Slug
                </label>
                <input
                  type="text"
                  value={testData.categorySlug}
                  onChange={(e) => handleInputChange('categorySlug', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zeitstempel
                </label>
                <input
                  type="datetime-local"
                  value={new Date(testData.timestamp).toISOString().slice(0, 16)}
                  onChange={(e) => handleTimestampChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vollständige E-Mail-Vorschau */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">HTML-E-Mail Vorschau</h2>
              <p className="text-xl text-gray-600">
                Hier sehen Sie das komplette E-Mail-Template in voller Größe:
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Generiert am:</p>
              <p className="text-sm font-medium">{new Date(testData.timestamp).toLocaleString('de-DE')}</p>
            </div>
          </div>
          
          <div className="border-2 rounded-lg bg-white overflow-hidden shadow-xl">
            {/* E-Mail-Client Simulation */}
            <div className="bg-gray-100 px-6 py-3 border-b-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="ml-6 text-base text-gray-600 font-medium">E-Mail-Client Vorschau</span>
              </div>
            </div>
            
            {/* E-Mail-Inhalt in voller Größe */}
            <div 
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="p-0 m-0"
            />
          </div>
        </div>

        {/* Zusätzliche Informationen */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Template-Informationen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">HTML-Template Features:</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                <li>Responsive Design für alle E-Mail-Clients</li>
                <li>August Meyer Branding mit Farbverlauf</li>
                <li>Strukturierte Darstellung aller Informationen</li>
                <li>Call-to-Action Button zum direkten Antworten</li>
                <li>Emojis und Icons für bessere Lesbarkeit</li>
                <li>Professioneller Footer mit Kontaktdaten</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Text-Template Features:</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                <li>Klare Struktur mit Überschriften</li>
                <li>Alle wichtigen Informationen auf einen Blick</li>
                <li>Handlungsaufforderungen für den Empfänger</li>
                <li>Vollständige Kontaktinformationen</li>
                <li>Kompatibel mit allen E-Mail-Clients</li>
                <li>Fallback für HTML-E-Mails</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
