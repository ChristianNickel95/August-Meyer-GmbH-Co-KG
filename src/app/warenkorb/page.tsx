'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import LeadForm from '@/components/LeadForm';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const handleCartSubmit = () => {
    // Nach erfolgreicher Lead-Übermittlung Warenkorb leeren
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Warenkorb</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">Ihr Warenkorb ist leer</p>
            <Link
              href="/produkte"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Zu den Produkten
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Warenkorb Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Ihre Produktanfrage</h2>
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity} {item.unit}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LeadForm mit Datenschutzerklärung */}
            <div className="lg:col-span-1">
              <LeadForm 
                productSlug={items.length > 0 ? items[0].id : undefined}
                categorySlug={items.length > 0 ? items[0].category : undefined}
                onSuccess={handleCartSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 