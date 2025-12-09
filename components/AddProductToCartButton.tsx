'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from './CartContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Product, ProductVariant } from '@/lib/products';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AddProductToCartButtonProps {
  product: Product;
  defaultQuantity?: string;
  unit?: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onTriggerClick?: () => void;
}

export function AddProductToCartButton({ 
  product,
  defaultQuantity = '',
  unit = null,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onTriggerClick
}: AddProductToCartButtonProps): JSX.Element {
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [internalOpen, setInternalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = controlledOnOpenChange || setInternalOpen;

  // Prüfen, ob dieses Produkt bereits im Warenkorb ist
  const itemId = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id;
  const existingItem = items.find(item => item.categoryId === itemId);

  const handleAddToCart = (): void => {
    if (selectedVariant) {
      // Wenn keine defaultValue vorhanden ist (z.B. bei Services), erlaube auch leere Menge
      const finalQuantity = (defaultQuantity === null || defaultQuantity === undefined || defaultQuantity === '') 
        ? (quantity || '1') 
        : quantity;
      
      if (finalQuantity && finalQuantity !== '0') {
        // Wenn Produktname und Variantenname gleich sind, nur einmal anzeigen
        const displayName = product.name === selectedVariant.name 
          ? `${product.name} (Art.-Nr.: ${selectedVariant.articleNumber})`
          : `${product.name} - ${selectedVariant.name} (Art.-Nr.: ${selectedVariant.articleNumber})`;
        
        addItem({
          categoryId: itemId,
          categoryName: displayName,
          quantity: finalQuantity,
          unit,
        });
        setIsAdded(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsAdded(false);
          setQuantity(defaultQuantity || '');
        }, 1000);
      }
    }
  };

  const handleTriggerClick = (): void => {
    if (onTriggerClick) {
      onTriggerClick();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          size="sm" 
          className="w-full justify-center font-semibold text-xs sm:text-sm"
          onClick={handleTriggerClick}
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
          {existingItem ? 'Menge ändern' : 'Anfragen'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Wählen Sie eine Variante und geben Sie die gewünschte Menge ein
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {existingItem && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm">
              <p className="text-neutral-600">Aktuell im Warenkorb:</p>
              <p className="font-semibold text-neutral-900">
                {existingItem.quantity}{existingItem.unit ? ` ${existingItem.unit}` : ''}
              </p>
            </div>
          )}

          {/* Varianten-Auswahl */}
          {product.variants.length > 1 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">Variante auswählen</Label>
              <RadioGroup value={selectedVariant?.id} onValueChange={(value) => {
                const variant = product.variants.find(v => v.id === value);
                if (variant) setSelectedVariant(variant);
              }}>
                {product.variants.map((variant) => (
                  <div key={variant.id} className="flex items-start space-x-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <RadioGroupItem value={variant.id} id={variant.id} className="mt-1" />
                    <Label htmlFor={variant.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-neutral-900">{variant.name}</div>
                      <div className="text-sm text-neutral-600 mt-1">
                        Art.-Nr.: <span className="font-mono">{variant.articleNumber}</span>
                      </div>
                      {variant.description && (
                        <div className="text-sm text-neutral-500 mt-1">{variant.description}</div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {product.variants.length === 1 && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
              <div className="text-sm">
                <span className="font-medium text-neutral-900">{product.variants[0].name}</span>
                <div className="text-neutral-600 mt-1">
                  Art.-Nr.: <span className="font-mono">{product.variants[0].articleNumber}</span>
                </div>
              </div>
            </div>
          )}

          {/* Mengen-Eingabe */}
          <div>
            <Label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-2">
              {defaultQuantity === null || defaultQuantity === undefined || defaultQuantity === '' 
                ? 'Anzahl (optional)' 
                : `Menge ${unit ? `(${unit})` : ''}`}
            </Label>
            <Input
              id="quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={defaultQuantity || (defaultQuantity === null || defaultQuantity === undefined || defaultQuantity === '' ? '1' : '0')}
              className="text-lg"
            />
            {product.variants[0]?.description && (
              <p className="text-sm text-neutral-500 mt-2">{product.variants[0].description}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={isAdded || !selectedVariant || (defaultQuantity !== null && defaultQuantity !== undefined && defaultQuantity !== '' && (!quantity || quantity === '0'))}
              className="flex-1"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Hinzugefügt
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {existingItem ? 'Aktualisieren' : 'Hinzufügen'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

