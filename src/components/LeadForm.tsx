'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface LeadFormProps {
  productSlug?: string;
  categorySlug?: string;
  className?: string;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
  datenschutz: boolean;
  website: string; // Honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  telefon?: string;
  nachricht?: string;
  datenschutz?: string;
  general?: string;
}

export default function LeadForm({ productSlug, categorySlug, className, onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    telefon: '',
    nachricht: '',
    datenschutz: false,
    website: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validieren
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }

    // E-Mail validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }

    // Nachricht validieren
    if (!formData.nachricht.trim()) {
      newErrors.nachricht = 'Nachricht ist erforderlich';
    } else if (formData.nachricht.trim().length < 20) {
      newErrors.nachricht = 'Nachricht muss mindestens 20 Zeichen lang sein';
    }

    // Datenschutz validieren
    if (!formData.datenschutz) {
      newErrors.datenschutz = 'Datenschutzerklärung muss akzeptiert werden';
    }

    // Honeypot validieren
    if (formData.website.trim()) {
      newErrors.general = 'Ungültige Eingabe';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productSlug,
          categorySlug,
          timestamp: new Date().toISOString()
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setIsSubmitted(true);
        // onSuccess-Callback aufrufen, falls vorhanden
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setErrors({ general: result.error || 'Ein Fehler ist aufgetreten' });
      }
    } catch (error) {
      setErrors({ general: 'Netzwerkfehler. Bitte versuchen Sie es erneut.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Fehler beim Tippen entfernen
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Vielen Dank für Ihre Anfrage!
            </h3>
            <p className="text-gray-600">
              Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Angebot anfragen</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot-Feld */}
          <div className="hidden">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="text"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ihr vollständiger Name"
              required
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* E-Mail */}
          <div>
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="ihre.email@beispiel.de"
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Telefon */}
          <div>
            <Label htmlFor="telefon">Telefon</Label>
            <Input
              id="telefon"
              name="telefon"
              type="tel"
              value={formData.telefon}
              onChange={(e) => handleInputChange('telefon', e.target.value)}
              placeholder="+49 123 456789"
            />
          </div>

          {/* Nachricht */}
          <div>
            <Label htmlFor="nachricht">Nachricht *</Label>
            <Textarea
              id="nachricht"
              name="nachricht"
              value={formData.nachricht}
              onChange={(e) => handleInputChange('nachricht', e.target.value)}
              placeholder="Beschreiben Sie Ihre Anforderungen (mindestens 20 Zeichen)"
              rows={4}
              required
            />
            {errors.nachricht && (
              <p className="text-red-600 text-sm mt-1">{errors.nachricht}</p>
            )}
          </div>

          {/* Datenschutz */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="datenschutz"
              name="datenschutz"
              checked={formData.datenschutz}
              onCheckedChange={(checked) => 
                handleInputChange('datenschutz', checked as boolean)
              }
              required
            />
            <div className="space-y-1">
              <Label htmlFor="datenschutz" className="text-sm">
                Ich akzeptiere die Datenschutzerklärung *
              </Label>
              <p className="text-xs text-gray-600">
                Ihre Daten werden nur zur Bearbeitung Ihrer Anfrage verwendet. 
                Weitere Informationen finden Sie in unserer{' '}
                <a href="/datenschutz" className="text-blue-600 hover:underline">
                  Datenschutzerklärung
                </a>.
              </p>
            </div>
          </div>
          {errors.datenschutz && (
            <p className="text-red-600 text-sm">{errors.datenschutz}</p>
          )}

          {/* Allgemeine Fehler */}
          {errors.general && (
            <p className="text-red-600 text-sm">{errors.general}</p>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Anfrage senden'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
