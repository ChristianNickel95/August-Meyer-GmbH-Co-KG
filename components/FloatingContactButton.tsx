'use client';

import { Phone } from 'lucide-react';
import Link from 'next/link';

export function FloatingContactButton(): JSX.Element {
  return (
    <Link
      href="tel:+4927735080"
      className="fixed bottom-6 left-6 z-40 bg-sustainability-600 text-white p-4 rounded-full shadow-lg hover:bg-sustainability-700 transition-all duration-200 flex items-center gap-3 group"
      aria-label="Telefonisch kontaktieren"
    >
      <Phone className="w-6 h-6" />
      <span className="hidden sm:block font-semibold text-sm whitespace-nowrap">
        0 27 73 / 50 80
      </span>
      <span className="sm:hidden font-semibold text-sm">
        Anrufen
      </span>
    </Link>
  );
}

