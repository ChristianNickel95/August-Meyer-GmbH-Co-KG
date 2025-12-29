'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

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
    <nav className="relative w-full bg-card border-b border-border h-20 md:h-24 dark:bg-[#0b1a33] dark:border-white/8" role="navigation" aria-label="Hauptnavigation">
      {/* Innerer Container für Inhalt - full-width Hintergrund, zentrierter Inhalt */}
      <div className="w-full mx-auto flex h-20 md:h-24 items-center justify-between px-6 md:px-10 lg:px-12">
        {/* Links: Branding als Link */}
        <div className="flex items-center gap-6 md:gap-8 xl:gap-10">
          {/* Branding-Block als Link zur Startseite */}
          <Link href="/" className="flex flex-col leading-tight hover:opacity-90 transition-opacity duration-300 flex-shrink-0">
            <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
              August Meyer
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground">
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
                className="w-40 lg:w-48 xl:w-64 pl-10 pr-4 py-2 text-sm bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary dark:bg-[#13294b] dark:border-white/8 dark:text-white dark:placeholder:text-[#c7d2e0] dark:focus:border-[#00ffb3] dark:focus:ring-[#00ffb3]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-neutral-400" />
            </div>
          </form>

          </div>

        {/* Rechts: Produkte, Kontakt, Impressum + Button + Hamburger-Menü */}
        <div className="flex items-center justify-end gap-4 lg:gap-6">
          {/* Navigation Links "Produkte", "Kontakt" und "Impressum" - Desktop (ab xl) */}
          <div className="hidden xl:flex items-center gap-6 text-base text-foreground">
            <Link href="/produkte" className="text-base text-foreground hover:text-primary font-medium transition-colors duration-150 border-b-2 border-transparent hover:border-primary dark:text-white dark:hover:text-[#00ffb3] dark:hover:border-[#00ffb3]">
              Produkte
            </Link>
            <Link href="/kontakt" className="text-foreground hover:text-primary font-medium transition-colors duration-150 border-b-2 border-transparent hover:border-primary dark:text-white dark:hover:text-[#00ffb3] dark:hover:border-[#00ffb3]">
              Kontakt
            </Link>
            <Link href="/impressum" className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-150 border-b-2 border-transparent hover:border-primary dark:text-[#c7d2e0] dark:hover:text-white dark:hover:border-[#00ffb3]">
              Impressum
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-[2px] dark:rounded-sm text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150 dark:text-white dark:hover:text-[#00ffb3] dark:hover:bg-white/8 dark:focus:ring-[#00ffb3]"
            aria-label={theme === 'dark' ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Button - Desktop/Tablet */}
          <div className="hidden md:flex">
            <Button asChild variant="sustainability" size="sm">
              <Link href="/kontakt">Angebot einholen</Link>
            </Button>
          </div>

          {/* Mobile/Tablet: Burger Menu Button - zeigt sich wenn Produkte-Button versteckt wird */}
          <div className="xl:hidden">
          <button
              className="p-2 rounded-[2px] dark:rounded-sm text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150 dark:text-white dark:hover:text-[#00ffb3] dark:hover:bg-white/8 dark:focus:ring-[#00ffb3]"
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
          <div className="xl:hidden absolute top-full right-4 mt-2 w-80 max-w-[85vw] bg-card border border-border rounded-[2px] dark:rounded-sm shadow-2xl z-50 overflow-hidden dark:bg-[#0b1a33] dark:border-white/8">
            <div className="w-full px-6 py-4 space-y-2">
              {/* Mobile Search (nur wenn nicht bereits sichtbar) */}
              <form onSubmit={handleSearch} className="mb-4 md:hidden">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Produkte suchen..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary dark:bg-[#13294b] dark:border-white/8 dark:text-white dark:placeholder:text-[#c7d2e0] dark:focus:border-[#00ffb3] dark:focus:ring-[#00ffb3]"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-neutral-400" />
                </div>
              </form>
              
              <Link
                href="/produkte"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-[2px] dark:rounded-sm font-medium transition-colors duration-150 dark:text-white dark:hover:text-[#00ffb3] dark:hover:bg-white/8"
                onClick={closeMenu}
              >
                Produkte
              </Link>
              <Link
                href="/kontakt"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-[2px] dark:rounded-sm font-medium transition-colors duration-150 dark:text-white dark:hover:text-[#00ffb3] dark:hover:bg-white/8"
                onClick={closeMenu}
              >
                Kontakt
              </Link>
              <Link
                href="/impressum"
                className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-[2px] dark:rounded-sm font-medium transition-colors duration-150 dark:text-[#c7d2e0] dark:hover:text-white dark:hover:bg-white/8"
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

      {/* LogoPanel - rund, größer, zentriert mit perfekter Überlappung zur Topbar - ohne Border */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 hover:opacity-90 transition-opacity duration-300 hidden sm:flex">
        <div className="flex items-center justify-center rounded-full bg-[#0b1a33] shadow-xl w-[72px] h-[72px] md:w-[88px] md:h-[88px] lg:w-32 lg:h-32 xl:w-36 xl:h-36">
          <Logo variant="dark" className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-28 xl:h-28" />
      </div>
      </Link>
    </nav>
  );
}
