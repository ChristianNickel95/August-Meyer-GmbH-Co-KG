'use client';

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import LeadForm from '@/components/LeadForm';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
});

export default function Kontakt() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontakt</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wir freuen uns auf Ihre Anfrage. Nutzen Sie das Kontaktformular oder rufen Sie uns direkt an.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kontaktinformationen */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kontaktinformationen</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-blue-600 mt-1 mr-4"><FaPhone size={20} /></span>
                <div>
                  <h3 className="font-medium text-gray-900">Telefon</h3>
                  <p className="text-gray-600">0 27 73 / 50 80</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 mt-1 mr-4"><FaEnvelope size={20} /></span>
                <div>
                  <h3 className="font-medium text-gray-900">E-Mail</h3>
                  <p className="text-gray-600">info@august-meyer.de</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 mt-1 mr-4"><FaMapMarkerAlt size={20} /></span>
                <div>
                  <h3 className="font-medium text-gray-900">Adresse</h3>
                  <p className="text-gray-600">
                    August Meyer GmbH & Co KG<br />
                    Seibertstr. 5<br />
                    35708 Haiger
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LeadForm */}
          <LeadForm />
        </div>

        {/* Karte */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
} 