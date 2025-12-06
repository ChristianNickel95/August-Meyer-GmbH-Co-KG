'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from './CategoryCard';
import { getAllCategories, getAllProducts } from '@/lib/products';
import { Category } from '@/lib/products';

// Kategorien-Mapping für die neue Struktur
const categoryMapping: Record<string, { name: string; id: string; slug: string; description: string; defaultValue?: string | null; unit?: string | null }> = {
  'industrieputzlappen': {
    name: 'Industrieputzlappen',
    id: 'putzlappen',
    slug: 'putzlappen',
    description: 'Manuell gefertigte Putzlappen aus recycelten Alttextilien',
    defaultValue: '360',
    unit: 'kg'
  },
  'vliestuecher': {
    name: 'Vliestücher',
    id: 'vliestuecher',
    slug: 'vliestuecher',
    description: 'Saugfähige Vliestücher aus textilen Fasermaterialien',
    defaultValue: '300',
    unit: 'kg'
  },
  'putzwolle': {
    name: 'Putzwolle',
    id: 'putzwolle',
    slug: 'putzwolle',
    description: 'Hochwertige Putzwolle für anspruchsvolle Reinigungsaufgaben',
    defaultValue: '250',
    unit: 'kg'
  },
  'putzpapierrollen': {
    name: 'Putzpapierrollen',
    id: 'putzpapierrollen',
    slug: 'putzpapierrollen',
    description: 'Putzpapier in Rollenform',
    defaultValue: '12',
    unit: 'Rollen'
  },
  'putzpapier-karton': {
    name: 'Putzpapier im Karton',
    id: 'putztuch-einzelblatt',
    slug: 'putztuch-im-einzelblatt',
    description: 'Putzpapier in Einzelblattform',
    defaultValue: '12',
    unit: 'Kartons'
  },
  'falthandtuecher-handtuchrollen': {
    name: 'Falthandtücher und Handtuchrollen',
    id: 'falthandtuecher-handtuchrollen',
    slug: 'falthandtuecher-handtuchrollen',
    description: 'Falthandtücher und Handtuchrollen für sanitäre Einrichtungen',
    defaultValue: '12',
    unit: 'Kartons'
  },
  'toilettenpapier-kuechenrollen': {
    name: 'Toilettenpapier und Küchenrollen',
    id: 'toilettenpapier-kuechenrollen',
    slug: 'toilettenpapier-kuechenrollen',
    description: 'Toilettenpapier und Küchenrollen für Industrie und Gewerbe',
    defaultValue: '12',
    unit: 'Kartons'
  },
  'maschinenputztuecher': {
    name: 'Maschinenputztücher',
    id: 'putztuchreinigung',
    slug: 'putztuchreinigung',
    description: 'Mehrwegsystem Putztuchreinigung - sauber und umweltfreundlich',
    defaultValue: null,
    unit: null
  },
  'sonstiges': {
    name: 'Sonstiges',
    id: 'sonstiges',
    slug: 'sonstiges',
    description: 'Weitere Produkte für Industrie und Gewerbe',
    defaultValue: null,
    unit: null
  }
};

// Reihenfolge der Kategorien
const categoryOrder = [
  'industrieputzlappen',
  'vliestuecher',
  'putzwolle',
  'putzpapierrollen',
  'putzpapier-karton',
  'falthandtuecher-handtuchrollen',
  'toilettenpapier-kuechenrollen',
  'maschinenputztuecher',
  'sonstiges'
];

export function CategoryCarousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allCategories = getAllCategories();
  const allProducts = getAllProducts();
  const itemsPerView = 3;

  // Funktion zur Berechnung der Produktanzahl (Anzahl der Varianten)
  const calculateProductCount = (categoryId: string, subcategoryId?: string): number => {
    let products = allProducts.filter(product => product.category === categoryId);
    if (subcategoryId) {
      products = products.filter(product => product.subcategory === subcategoryId);
    }
    return products.reduce((sum, product) => sum + (product.variants?.length || 0), 0);
  };

  // Kategorien für die Startseite erstellen
  const homepageCategories: (Category & { defaultValue?: string | null; unit?: string | null })[] = categoryOrder.map(key => {
    const mapping = categoryMapping[key];
    const originalCategory = allCategories.find(cat => cat.id === mapping.id);
    
    // Produktanzahl berechnen und Link-Slug bestimmen
    let productCount = 0;
    let linkSlug = mapping.slug; // Standard: eigener Slug
    
    if (mapping.id === 'putzpapierrollen') {
      // Putzpapierrollen ist eine Unterkategorie von Putzpapier
      productCount = calculateProductCount('putzpapier', 'putzpapierrollen');
      linkSlug = 'putzpapier/putzpapierrollen'; // Link zur Unterkategorie
    } else if (mapping.id === 'putztuch-einzelblatt') {
      // Putztuch im Einzelblatt ist eine Unterkategorie von Putzpapier
      productCount = calculateProductCount('putzpapier', 'putztuch-einzelblatt');
      linkSlug = 'putzpapier/putztuch-im-einzelblatt'; // Link zur Unterkategorie
    } else if (mapping.id === 'falthandtuecher-handtuchrollen') {
      // Kombiniert: Papierhandtücher + Handtuchrollen
      const papierhandtuecherCount = calculateProductCount('hygienepapiere', 'papierhandtuecher');
      const handtuchrollenCount = calculateProductCount('hygienepapiere', 'handtuchrollen');
      productCount = papierhandtuecherCount + handtuchrollenCount;
      linkSlug = 'hygienepapiere'; // Link zur Hauptkategorie
    } else if (mapping.id === 'toilettenpapier-kuechenrollen') {
      // Kombiniert: Toilettenpapier + Küchenrollen (aus Sonstiges)
      const toilettenpapierCount = calculateProductCount('hygienepapiere', 'toilettenpapier');
      const kuechenrollenCount = calculateProductCount('sonstiges'); // Küchenrollen sind in Sonstiges
      productCount = toilettenpapierCount + kuechenrollenCount;
      linkSlug = 'hygienepapiere'; // Link zur Hauptkategorie (Toilettenpapier)
    } else {
      // Standard: Alle Varianten der Kategorie
      productCount = calculateProductCount(mapping.id);
    }
    
    return {
      id: mapping.id,
      name: mapping.name,
      description: mapping.description,
      image: originalCategory?.image || '/images/categories/default.jpg',
      slug: linkSlug, // Verwende linkSlug für Navigation
      productCount: productCount,
      defaultValue: mapping.defaultValue,
      unit: mapping.unit,
      subcategories: originalCategory?.subcategories || []
    };
  });

  const totalSlides = Math.ceil(homepageCategories.length / itemsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  const goToPrevious = (): void => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const goToNext = (): void => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  // Auto-rotate (optional)
  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides, maxIndex]);

  const visibleCategories = homepageCategories.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  // Wenn weniger als itemsPerView Kategorien vorhanden sind, zeige alle
  if (homepageCategories.length <= itemsPerView) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {homepageCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {homepageCategories
                .slice(slideIndex * itemsPerView, slideIndex * itemsPerView + itemsPerView)
                .map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border-2 shadow-lg hover:bg-neutral-50 z-10"
            onClick={goToPrevious}
            aria-label="Vorherige Kategorien"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border-2 shadow-lg hover:bg-neutral-50 z-10"
            onClick={goToNext}
            aria-label="Nächste Kategorien"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-neutral-900'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Zu Slide ${index + 1} gehen`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

