'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SearchResultsBadge(): JSX.Element | null {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [resultCount, setResultCount] = useState<number>(0);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Suchparameter aus URL lesen
    const sucheParam = searchParams.get('suche');
    if (sucheParam) {
      setSearchQuery(sucheParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  // Event-Listener für Suche aus Navbar und Ergebnisanzahl
  useEffect(() => {
    const handleSearch = (event: CustomEvent<string>): void => {
      setSearchQuery(event.detail);
    };

    const handleSearchResults = (event: CustomEvent<number>): void => {
      setResultCount(event.detail);
    };

    window.addEventListener('search', handleSearch as EventListener);
    window.addEventListener('searchResults', handleSearchResults as EventListener);
    
    return () => {
      window.removeEventListener('search', handleSearch as EventListener);
      window.removeEventListener('searchResults', handleSearchResults as EventListener);
    };
  }, []);

  // Nur auf Produktseite anzeigen
  if (pathname !== '/produkte' || !searchQuery) {
    return null;
  }

  const handleClear = (): void => {
    setSearchQuery('');
    setResultCount(0);
    router.push('/produkte');
  };

  return (
    <div className="bg-sky-50 border-b border-sky-200 py-2.5 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-sky-700 font-medium">
            Suche: &quot;{searchQuery}&quot;
          </span>
          {resultCount > 0 && (
            <span className="text-xs text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">
              {resultCount} {resultCount === 1 ? 'Ergebnis' : 'Ergebnisse'}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="text-sky-700 hover:text-sky-900 h-auto py-1"
        >
          <X className="w-3.5 h-3.5 mr-1" />
          Zurücksetzen
        </Button>
      </div>
    </div>
  );
}

