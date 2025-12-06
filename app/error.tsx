'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ein Fehler ist aufgetreten</h1>
          <p className="text-gray-600 mb-8">
            Es tut uns leid, aber es ist ein unerwarteter Fehler aufgetreten. 
            Bitte versuchen Sie es erneut oder kehren Sie zur Startseite zurück.
          </p>
          
          <div className="space-y-4">
            <Button onClick={reset} size="lg" className="w-full">
              Erneut versuchen
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/produkte">Zu den Produkten</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Zur Startseite</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
