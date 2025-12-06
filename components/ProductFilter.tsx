'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllProducts, Product } from '@/lib/products';
import useCasesData from '@/content/useCases.json';

interface ProductFilterProps {
  onFilterChange: (filteredProducts: Product[]) => void;
  onPropertyFilterChange: (selectedProperties: string[]) => void;
}

export function ProductFilter({ onFilterChange, onPropertyFilterChange }: ProductFilterProps): JSX.Element {
  const allProducts = getAllProducts();
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const useCasesMeta = useCasesData.useCasesMeta;

  // Use-Cases mit Labels mappen
  const useCaseMap = useMemo(() => {
    const map = new Map<string, string>();
    useCasesMeta.forEach((uc: { id: string; label: string }) => {
      map.set(uc.id, uc.label);
    });
    return map;
  }, [useCasesMeta]);

  const handleUseCaseToggle = (useCaseId: string): void => {
    const newSelected = selectedUseCases.includes(useCaseId)
      ? selectedUseCases.filter((uc) => uc !== useCaseId)
      : [...selectedUseCases, useCaseId];
    
    setSelectedUseCases(newSelected);
    onPropertyFilterChange(newSelected);

    // Produkte filtern - ein Produkt muss mindestens einen der ausgewählten Use-Cases haben
    const filtered = allProducts.filter((product) => {
      if (newSelected.length === 0) return true;
      return product.useCases?.some((uc) => newSelected.includes(uc));
    });

    onFilterChange(filtered);
  };

  const clearFilters = (): void => {
    setSelectedUseCases([]);
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
        {selectedUseCases.length > 0 && (
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
        {useCasesMeta.map((useCase: { id: string; label: string }) => (
          <Button
            key={useCase.id}
            variant={selectedUseCases.includes(useCase.id) ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleUseCaseToggle(useCase.id)}
            className="text-sm"
          >
            {useCase.label}
          </Button>
        ))}
      </div>

      {selectedUseCases.length > 0 && (
        <div className="mt-4 text-sm text-neutral-600">
          {selectedUseCases.length} {selectedUseCases.length === 1 ? 'Anwendung' : 'Anwendungen'} ausgewählt
        </div>
      )}
    </div>
  );
}

