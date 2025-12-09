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
    <>
      <div className="flex items-center justify-between mb-4">
        {selectedUseCases.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-400 hover:text-white hover:bg-[#2A3F55] ml-auto"
          >
            <X className="w-4 h-4 mr-1" />
            Filter zurücksetzen
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {useCasesMeta.map((useCase: { id: string; label: string }) => (
          <Button
            key={useCase.id}
            variant={selectedUseCases.includes(useCase.id) ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleUseCaseToggle(useCase.id)}
            className={`text-sm rounded-full px-4 py-1 ${
              selectedUseCases.includes(useCase.id)
                ? 'bg-[#2F6BA8] text-white border-[#2F6BA8]'
                : 'border-[#2F6BA8] text-[#E6EDF3] hover:bg-[#2F6BA8]/20'
            }`}
          >
            {useCase.label}
          </Button>
        ))}
      </div>

      {selectedUseCases.length > 0 && (
        <div className="mt-4 text-sm text-gray-400">
          {selectedUseCases.length} {selectedUseCases.length === 1 ? 'Anwendung' : 'Anwendungen'} ausgewählt
        </div>
      )}
    </>
  );
}

