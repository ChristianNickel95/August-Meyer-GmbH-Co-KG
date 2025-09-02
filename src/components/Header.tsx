'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { items } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  useEffect(() => {
    // Automatische Spracherkennung basierend auf dem Standort
    const userLanguage = navigator.language.toLowerCase();
    const isEnglish = userLanguage.startsWith('en');
    setLanguage(isEnglish ? 'en' : 'de');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            August Meyer
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/produkte" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Produkte
            </Link>
            <Link 
              href="/ueber-uns" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Über uns
            </Link>
            <Link 
              href="/kontakt" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Kontakt
            </Link>
          </nav>

          {/* Right side: Cart and Language */}
          <div className="flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === 'de' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                DE
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
            </div>

            {/* Cart */}
            <Link href="/warenkorb" className="relative group">
              <FaShoppingCart className="text-2xl text-gray-600 group-hover:text-blue-600 transition-colors" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 