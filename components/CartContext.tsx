'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  categoryId: string;
  categoryName: string;
  quantity: string;
  unit: string | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (categoryId: string) => void;
  updateItem: (categoryId: string, quantity: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('august-meyer-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('august-meyer-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem): void => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.categoryId === item.categoryId);
      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prevItems];
        updated[existingIndex] = item;
        return updated;
      }
      // Add new item
      return [...prevItems, item];
    });
  };

  const removeItem = (categoryId: string): void => {
    setItems((prevItems) => prevItems.filter((item) => item.categoryId !== categoryId));
  };

  const updateItem = (categoryId: string, quantity: string): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.categoryId === categoryId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = (): void => {
    setItems([]);
    localStorage.removeItem('august-meyer-cart');
  };

  const getTotalItems = (): number => {
    return items.length;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

