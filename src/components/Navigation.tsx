'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.length;
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'de';
  const switchLocale = (locale: string) => {
    const segments = pathname.split('/');
    if (segments.length <= 2 && !segments[1]) {
      router.push(`/${locale}`);
      return;
    }
    if (segments[1] === 'de' || segments[1] === 'en') {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    router.push(segments.join('/'));
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/August-Meyer-Logo.svg"
              alt="August-Meyer Logo"
              width={50}
              height={40}
              className="h-16 w-auto object-contain"
              priority
            />
            <div className="ml-4 flex flex-col">
              <span className="text-base md:text-lg font-bold text-[#003366] leading-tight whitespace-nowrap">AUGUST MEYER GmbH & Co KG</span>
              <span className="text-sm md:text-base text-[#D4AF37] font-semibold">seit 1860</span>
            </div>
            <div className="ml-6 flex gap-2 items-center">
              <button
                onClick={() => switchLocale('de')}
                className={`px-2 py-1 rounded text-sm font-semibold border ${currentLocale === 'de' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
                aria-label="Deutsch"
              >
                DE
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={`px-2 py-1 rounded text-sm font-semibold border ${currentLocale === 'en' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/produkte" className="text-gray-600 hover:text-gray-900">
              Produkte
            </Link>
            <Link href="/leistungen" className="text-gray-600 hover:text-gray-900">
              Leistungen
            </Link>
            <Link href="/ueber-uns" className="text-gray-600 hover:text-gray-900">
              Über uns
            </Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-gray-900">
              Kontakt
            </Link>
            <Link href="/warenkorb" className="relative text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/produkte"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Produkte
              </Link>
              <Link
                href="/leistungen"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Leistungen
              </Link>
              <Link
                href="/ueber-uns"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Über uns
              </Link>
              <Link
                href="/kontakt"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Kontakt
              </Link>
              <Link
                href="/warenkorb"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Warenkorb
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 