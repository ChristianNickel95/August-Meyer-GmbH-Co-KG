'use client';

import { useState } from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from './CartContext';
import Link from 'next/link';

export function Cart(): JSX.Element {
  const { items, removeItem, updateItem, clearCart, getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (categoryId: string, newQuantity: string): void => {
    if (newQuantity === '' || newQuantity === '0') {
      removeItem(categoryId);
    } else {
      updateItem(categoryId, newQuantity);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-neutral-800 text-white p-4 rounded-full shadow-lg hover:bg-neutral-900 transition-all duration-200 flex items-center gap-2 group"
        aria-label="Warenkorb öffnen"
      >
        <ShoppingCart className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 bg-sustainability-600 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]">
      <Card className="shadow-2xl border-2 border-neutral-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Warenkorb ({getTotalItems()})
            </CardTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
              aria-label="Warenkorb schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8 text-neutral-600">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-neutral-400" />
              <p>Ihr Warenkorb ist leer</p>
              <p className="text-sm mt-1">Fügen Sie Produkte hinzu, um eine Anfrage zu stellen</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.categoryId}
                  className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-neutral-900 mb-1">
                      {item.categoryName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.categoryId, e.target.value)}
                        className="w-20 h-8 text-sm"
                        placeholder="0"
                      />
                      {item.unit && (
                        <span className="text-sm text-neutral-600">{item.unit}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.categoryId)}
                    className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                    aria-label={`${item.categoryName} entfernen`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-200 space-y-2">
                <Button
                  onClick={clearCart}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Warenkorb leeren
                </Button>
                <Button asChild className="w-full font-semibold" size="lg">
                  <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                    Anfrage senden
                  </Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

