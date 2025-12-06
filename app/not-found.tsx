import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';

export default function NotFound(): JSX.Element {
  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Seite nicht gefunden</h2>
          <p className="text-gray-600 mb-8">
            Die gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>
          
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
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
