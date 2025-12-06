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
    if (searchQuery.trim()) {
      if (pathname === '/produkte') {
        // Auf Produktseite: Event für Filter auslösen
        window.dispatchEvent(new CustomEvent('search', { detail: searchQuery }));
      } else {
        // Auf anderen Seiten: Zur Produktseite mit Suchparameter
        router.push(`/produkte?suche=${encodeURIComponent(searchQuery.trim())}`);
      }
      setIsSearchOpen(false);
    }
  };

  // Suche schließen, wenn Route wechselt
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  return (
    <nav className="bg-white border-b-2 border-neutral-200" role="navigation" aria-label="Hauptnavigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 md:space-x-5" onClick={closeMenu}>
            <Logo variant="light" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-sky-600 leading-tight tracking-tight">August Meyer</span>
              <span className="text-xs md:text-sm lg:text-base text-sky-500 leading-tight font-medium">GmbH & Co. KG</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-300 text-sm lg:text-base">
              Startseite
            </Link>
            <Link href="/produkte" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-300 text-sm lg:text-base">
              Produkte
            </Link>
            <Link href="/kontakt" className="text-neutral-700 hover:text-neutral-900 font-medium transition-colors duration-300 text-sm lg:text-base">
              Kontakt
            </Link>
            <Link href="/impressum" className="text-neutral-500 hover:text-neutral-700 font-medium transition-colors duration-300 text-sm lg:text-base">
              Impressum
            </Link>
            
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Produkte suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm border-neutral-300 focus:border-sky-500 focus:ring-sky-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
            </form>
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
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Produkte suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border-neutral-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                </div>
              </form>
              
              <Link
                href="/"
                className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Startseite
              </Link>
              <Link
                href="/produkte"
                className="block px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200"
                onClick={closeMenu}
              >
                Produkte
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
