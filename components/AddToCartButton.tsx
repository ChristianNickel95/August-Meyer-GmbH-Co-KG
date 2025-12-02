'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from './CartContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AddToCartButtonProps {
  categoryId: string;
  categoryName: string;
  defaultQuantity?: string;
  unit?: string | null;
}

export function AddToCartButton({ 
  categoryId, 
  categoryName, 
  defaultQuantity = '',
  unit = null 
}: AddToCartButtonProps): JSX.Element {
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const existingItem = items.find(item => item.categoryId === categoryId);

  const handleAddToCart = (): void => {
    if (quantity && quantity !== '0') {
      addItem({
        categoryId,
        categoryName,
        quantity,
        unit,
      });
      setIsAdded(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAdded(false);
        setQuantity(defaultQuantity);
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full font-semibold">
          <ShoppingCart className="w-4 h-4 mr-2" />
          {existingItem ? 'Menge ändern' : 'Zum Warenkorb'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{categoryName}</DialogTitle>
          <DialogDescription>
            Geben Sie die gewünschte Menge ein
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {existingItem && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm">
              <p className="text-neutral-600">Aktuell im Warenkorb:</p>
              <p className="font-semibold text-neutral-900">
                {existingItem.quantity}{existingItem.unit ? ` ${existingItem.unit}` : ''}
              </p>
            </div>
          )}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-2">
              Menge {unit && `(${unit})`}
            </label>
            <Input
              id="quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={defaultQuantity || '0'}
              className="text-lg"
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={!quantity || quantity === '0' || isAdded}
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

