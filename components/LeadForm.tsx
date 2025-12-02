'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from './CartContext';

interface LeadFormProps {
  productName?: string;
  className?: string;
}

export function LeadForm({ productName, className }: LeadFormProps): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { items, clearCart } = useCart();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    
    // Build cart items summary
    const cartSummary = items.length > 0
      ? items.map(item => `${item.categoryName}: ${item.quantity}${item.unit ? ` ${item.unit}` : ''}`).join('\n')
      : '';

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      productName: productName || (items.length > 0 ? 'Warenkorb-Anfrage' : 'Allgemeine Anfrage'),
      cartItems: items,
      cartSummary: cartSummary,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        (event.target as HTMLFormElement).reset();
        clearCart();
      } else {
        throw new Error('Fehler beim Senden der Anfrage');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="pt-6 text-center">
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Vielen Dank für Ihre Anfrage!</h3>
          <p className="text-gray-600 mb-4">
            Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Neue Anfrage
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Angebot anfragen</CardTitle>
        <CardDescription>
          {productName 
            ? `Füllen Sie das Formular aus, um ein Angebot für ${productName} zu erhalten.`
            : 'Füllen Sie das Formular aus, um ein Angebot zu erhalten.'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ihr vollständiger Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ihre.email@beispiel.de"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Unternehmen
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Ihr Unternehmen"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Ihre Telefonnummer"
              />
            </div>
          </div>
          
          {items.length > 0 && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-neutral-900 mb-2">Ihre Anfrage enthält:</h4>
              <ul className="space-y-1 text-sm text-neutral-600">
                {items.map((item) => (
                  <li key={item.categoryId}>
                    {item.categoryName}: {item.quantity}{item.unit ? ` ${item.unit}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Nachricht {items.length === 0 && '*'}
            </label>
            <textarea
              id="message"
              name="message"
              required={items.length === 0}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={items.length > 0 ? "Zusätzliche Informationen (optional)..." : "Beschreiben Sie Ihre Anforderungen..."}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
