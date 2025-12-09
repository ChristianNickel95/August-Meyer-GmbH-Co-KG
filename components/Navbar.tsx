'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/Logo';

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    if (pathname === '/produkte') {
      // Auf Produktseite: Event für Filter auslösen (auch bei leerem String)
      window.dispatchEvent(new CustomEvent('search', { detail: searchQuery }));
    } else {
      // Auf anderen Seiten: Zur Produktseite mit Suchparameter
      if (searchQuery.trim()) {
        router.push(`/produkte?suche=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        router.push('/produkte');
      }
    }
    setIsSearchOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchQuery(value);
    // Wenn auf Produktseite und Suche geleert wird, sofort Event senden
    if (pathname === '/produkte' && !value.trim()) {
      window.dispatchEvent(new CustomEvent('search', { detail: '' }));
    }
  };

  // Suche schließen, wenn Route wechselt
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  return (
    <nav className="relative w-full bg-[#0B1622] border-b border-[#2A3F55] h-16 md:h-20" role="navigation" aria-label="Hauptnavigation">
      {/* Innerer Container für Inhalt - full-width Hintergrund, zentrierter Inhalt */}
      <div className="w-full mx-auto flex h-16 md:h-20 items-center justify-between px-6 md:px-10 lg:px-12">
        {/* Links: Branding als Link */}
        <div className="flex items-center gap-4 md:gap-6 xl:gap-8">
          {/* Branding-Block als Link zur Startseite */}
          <Link href="/" className="flex flex-col leading-tight hover:opacity-90 transition-opacity duration-300 flex-shrink-0">
            <span className="text-base md:text-lg lg:text-xl font-semibold text-[#6FE0FF]">
              August Meyer
            </span>
            <span className="text-[10px] md:text-xs text-gray-300">
              GmbH &amp; Co. KG
            </span>
          </Link>

          {/* Suchfeld - rechts vom Branding, wenn Platz */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Produkte suchen..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-40 lg:w-48 xl:w-64 pl-10 pr-4 py-2 text-sm bg-[#1B2B3C] border-[#2A3F55] text-[#E6EDF3] placeholder:text-neutral-400 focus:border-[#2F6BA8] focus:ring-[#2F6BA8]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
          </form>

          {/* Navigation Link "Produkte" - rechts neben Suchfeld */}
          <div className="hidden lg:flex items-center">
            <Link href="/produkte" className="text-sm text-gray-200 hover:text-white font-medium transition-colors duration-300">
              Produkte
            </Link>
          </div>
          </div>

        {/* Rechts: Kontakt, Impressum + Button + Hamburger-Menü */}
        <div className="flex items-center justify-end gap-4 lg:gap-6">
          {/* Navigation Links "Kontakt" und "Impressum" - Desktop (ab lg) */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-gray-200">
            <Link href="/kontakt" className="hover:text-white font-medium transition-colors duration-300">
              Kontakt
            </Link>
            <Link href="/impressum" className="text-gray-400 hover:text-gray-200 font-medium transition-colors duration-300">
              Impressum
            </Link>
          </div>

          {/* Button - Desktop/Tablet */}
          <div className="hidden md:flex">
            <Button asChild variant="sustainability" size="sm">
              <Link href="/kontakt">Angebot anfragen</Link>
            </Button>
          </div>

          {/* Mobile/Tablet: Burger Menu Button */}
          <div className="xl:hidden">
          <button
              className="p-2 rounded-md text-[#E6EDF3] hover:text-white hover:bg-[#1B2B3C] focus:outline-none focus:ring-2 focus:ring-[#2F6BA8] transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        </div>
        </div>

        {/* Mobile/Tablet Navigation - Dropdown unterhalb der Navbar */}
        {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 xl:hidden"
                onClick={closeMenu}
            aria-hidden="true"
          />
          {/* Dropdown Menu Box */}
          <div className="xl:hidden absolute top-full right-4 mt-2 w-80 max-w-[85vw] bg-[#0B1622] border border-[#2A3F55] rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="w-full px-6 py-4 space-y-2">
              {/* Mobile Search (nur wenn nicht bereits sichtbar) */}
              <form onSubmit={handleSearch} className="mb-4 md:hidden">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Produkte suchen..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-[#1B2B3C] border-[#2A3F55] text-[#E6EDF3] placeholder:text-neutral-400 focus:border-[#2F6BA8] focus:ring-[#2F6BA8]"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                </div>
              </form>
              
              <Link
                href="/produkte"
                className="block px-4 py-3 text-[#E6EDF3] hover:text-white hover:bg-[#1B2B3C] rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Produkte
              </Link>
              <Link
                href="/kontakt"
                className="block px-4 py-3 text-[#E6EDF3] hover:text-white hover:bg-[#1B2B3C] rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Kontakt
              </Link>
              <Link
                href="/impressum"
                className="block px-4 py-3 text-gray-400 hover:text-[#E6EDF3] hover:bg-[#1B2B3C] rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Impressum
              </Link>
              {/* Button nur anzeigen, wenn er nicht bereits in der Navbar sichtbar ist (also nur auf sehr kleinen Bildschirmen) */}
              <div className="pt-6 md:hidden">
                <Button asChild variant="sustainability" className="w-full">
                  <Link href="/kontakt" onClick={closeMenu}>
                    Angebot anfragen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
        )}

      {/* LogoPanel - rund, größer, zentriert mit stärkerer Überlappung zur Topbar - ohne Border */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-2 md:top-3 lg:top-4 z-20 hover:opacity-90 transition-opacity duration-300 hidden sm:flex">
        <div className="flex items-center justify-center rounded-full bg-[#0D1C2E] shadow-xl w-[72px] h-[72px] md:w-[88px] md:h-[88px] lg:w-32 lg:h-32 xl:w-36 xl:h-36">
          <Logo variant="dark" className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-28 xl:h-28" />
      </div>
      </Link>
    </nav>
  );
}
