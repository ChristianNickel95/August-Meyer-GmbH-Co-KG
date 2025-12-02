'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b-2 border-neutral-200" role="navigation" aria-label="Hauptnavigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28 lg:h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 md:space-x-5" onClick={closeMenu}>
            <Logo variant="light" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-sky-600 leading-tight tracking-tight">August Meyer</span>
              <span className="text-sm md:text-base text-sky-500 leading-tight font-medium">GmbH & Co. KG</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link href="/" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-300 text-sm lg:text-base">
              Startseite
            </Link>
            <Link href="/leistungen" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-300 text-sm lg:text-base">
              Leistungen
            </Link>
            <Link href="/produkte" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-300 text-sm lg:text-base">
              Sortiment
            </Link>
            <Link href="/kontakt" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-300 text-sm lg:text-base">
              Kontakt
            </Link>
            <Link href="/impressum" className="text-neutral-500 hover:text-neutral-700 font-medium transition-colors duration-300 text-sm lg:text-base">
              Impressum
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild variant="sustainability" size="default">
              <Link href="/kontakt">Angebot anfragen</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200">
            <div className="px-4 pt-6 pb-8 space-y-2 bg-white">
              <Link
                href="/"
                className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Startseite
              </Link>
              <Link
                href="/leistungen"
                className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Leistungen
              </Link>
              <Link
                href="/produkte"
                className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Sortiment
              </Link>
              <Link
                href="/kontakt"
                className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Kontakt
              </Link>
              <Link
                href="/impressum"
                className="block px-4 py-3 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Impressum
              </Link>
              <div className="pt-6">
                <Button asChild variant="sustainability" className="w-full">
                  <Link href="/kontakt" onClick={closeMenu}>
                    Angebot anfragen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
