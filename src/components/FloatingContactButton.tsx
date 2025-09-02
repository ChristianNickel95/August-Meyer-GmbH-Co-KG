'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 mb-2 w-64">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Kontakt</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <Link
              href="/kontakt"
              className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Kontaktformular
            </Link>
            <a
              href="tel:+49123456789"
              className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              +49 123 456789
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-2xl"
        aria-label="Kontakt öffnen"
      >
        📞
      </button>
    </div>
  );
} 