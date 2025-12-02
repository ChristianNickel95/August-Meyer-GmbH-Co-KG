'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllProducts, Product } from '@/lib/products';

interface ProductFilterProps {
  onFilterChange: (filteredProducts: Product[]) => void;
  onPropertyFilterChange: (selectedProperties: string[]) => void;
}

export function ProductFilter({ onFilterChange, onPropertyFilterChange }: ProductFilterProps): JSX.Element {
  const allProducts = getAllProducts();
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  // Alle verfügbaren anwendungsbezogenen Eigenschaften sammeln
  const availableProperties = useMemo(() => {
    const properties = new Set<string>();
    allProducts.forEach((product) => {
      if (product.properties) {
        product.properties.forEach((prop) => {
          properties.add(prop);
        });
      }
    });
    return Array.from(properties).sort();
  }, [allProducts]);

  const handlePropertyToggle = (property: string): void => {
    const newSelected = selectedProperties.includes(property)
      ? selectedProperties.filter((p) => p !== property)
      : [...selectedProperties, property];
    
    setSelectedProperties(newSelected);
    onPropertyFilterChange(newSelected);

    // Produkte filtern
    const filtered = allProducts.filter((product) => {
      if (newSelected.length === 0) return true;
      return product.properties?.some((prop) => newSelected.includes(prop));
    });

    onFilterChange(filtered);
  };

  const clearFilters = (): void => {
    setSelectedProperties([]);
    onPropertyFilterChange([]);
    onFilterChange(allProducts);
  };

  return (
    <div className="bg-neutral-50 border-2 border-neutral-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">Nach Anwendung filtern</h3>
          <p className="text-sm text-neutral-600">Finden Sie das passende Produkt für Ihre Anforderungen</p>
        </div>
        {selectedProperties.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-neutral-600 hover:text-neutral-900"
          >
            <X className="w-4 h-4 mr-1" />
            Filter zurücksetzen
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {availableProperties.map((property) => (
          <Button
            key={property}
            variant={selectedProperties.includes(property) ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePropertyToggle(property)}
            className="text-sm"
          >
            {property}
          </Button>
        ))}
      </div>

      {selectedProperties.length > 0 && (
        <div className="mt-4 text-sm text-neutral-600">
          {selectedProperties.length} {selectedProperties.length === 1 ? 'Eigenschaft' : 'Eigenschaften'} ausgewählt
        </div>
      )}
    </div>
  );
}

