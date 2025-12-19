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
    <nav className="relative w-full bg-[#0b1a33] border-b border-white/8 h-20 md:h-24" role="navigation" aria-label="Hauptnavigation">
      {/* Innerer Container für Inhalt - full-width Hintergrund, zentrierter Inhalt */}
      <div className="w-full mx-auto flex h-20 md:h-24 items-center justify-between px-6 md:px-10 lg:px-12">
        {/* Links: Branding als Link */}
        <div className="flex items-center gap-6 md:gap-8 xl:gap-10">
          {/* Branding-Block als Link zur Startseite */}
          <Link href="/" className="flex flex-col leading-tight hover:opacity-90 transition-opacity duration-300 flex-shrink-0">
            <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-white">
              August Meyer
            </span>
            <span className="text-[10px] md:text-xs text-[#c7d2e0]">
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
                className="w-40 lg:w-48 xl:w-64 pl-10 pr-4 py-2 text-sm bg-[#13294b] border-white/8 text-white placeholder:text-[#c7d2e0] focus:border-[#00ffb3] focus:ring-[#00ffb3]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
          </form>

          </div>

        {/* Rechts: Produkte, Kontakt, Impressum + Button + Hamburger-Menü */}
        <div className="flex items-center justify-end gap-4 lg:gap-6">
          {/* Navigation Links "Produkte", "Kontakt" und "Impressum" - Desktop (ab xl) */}
          <div className="hidden xl:flex items-center gap-6 text-base text-white">
            <Link href="/produkte" className="text-base text-white hover:text-[#00ffb3] font-medium transition-colors duration-150">
              Produkte
            </Link>
            <Link href="/kontakt" className="hover:text-[#00ffb3] font-medium transition-colors duration-150">
              Kontakt
            </Link>
            <Link href="/impressum" className="text-[#c7d2e0] hover:text-white font-medium transition-colors duration-150">
              Impressum
            </Link>
          </div>

          {/* Button - Desktop/Tablet */}
          <div className="hidden md:flex">
            <Button asChild variant="sustainability" size="sm">
              <Link href="/kontakt">Angebot einholen</Link>
            </Button>
          </div>

          {/* Mobile/Tablet: Burger Menu Button - zeigt sich wenn Produkte-Button versteckt wird */}
          <div className="xl:hidden">
          <button
              className="p-2 rounded-sm text-white hover:text-[#00ffb3] hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#00ffb3] transition-colors duration-150"
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
          {/* Dropdown Menu Box - zeigt sich wenn Produkte-Button versteckt wird */}
          <div className="xl:hidden absolute top-full right-4 mt-2 w-80 max-w-[85vw] bg-[#0b1a33] border border-white/8 rounded-sm shadow-2xl z-50 overflow-hidden">
            <div className="w-full px-6 py-4 space-y-2">
              {/* Mobile Search (nur wenn nicht bereits sichtbar) */}
              <form onSubmit={handleSearch} className="mb-4 md:hidden">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Produkte suchen..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-[#13294b] border-white/8 text-white placeholder:text-[#c7d2e0] focus:border-[#00ffb3] focus:ring-[#00ffb3]"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                </div>
              </form>
              
              <Link
                href="/produkte"
                className="block px-4 py-3 text-white hover:text-[#00ffb3] hover:bg-white/8 rounded-sm font-medium transition-colors duration-150"
                onClick={closeMenu}
              >
                Produkte
              </Link>
              <Link
                href="/kontakt"
                className="block px-4 py-3 text-white hover:text-[#00ffb3] hover:bg-white/8 rounded-sm font-medium transition-colors duration-150"
                onClick={closeMenu}
              >
                Kontakt
              </Link>
              <Link
                href="/impressum"
                className="block px-4 py-3 text-[#c7d2e0] hover:text-white hover:bg-white/8 rounded-sm font-medium transition-colors duration-150"
                onClick={closeMenu}
              >
                Impressum
              </Link>
              {/* Button nur anzeigen, wenn er nicht bereits in der Navbar sichtbar ist (also nur auf sehr kleinen Bildschirmen) */}
              <div className="pt-6 md:hidden">
                <Button asChild variant="sustainability" className="w-full">
                  <Link href="/kontakt" onClick={closeMenu}>
                    Angebot einholen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
        )}

      {/* LogoPanel - rund, größer, zentriert mit stärkerer Überlappung zur Topbar - ohne Border */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-2 md:top-3 lg:top-4 z-20 hover:opacity-90 transition-opacity duration-300 hidden sm:flex">
        <div className="flex items-center justify-center rounded-full bg-[#0b1a33] shadow-xl w-[72px] h-[72px] md:w-[88px] md:h-[88px] lg:w-32 lg:h-32 xl:w-36 xl:h-36">
          <Logo variant="dark" className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-28 xl:h-28" />
      </div>
      </Link>
    </nav>
  );
}
