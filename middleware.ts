import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Wenn wir auf der Root-Seite sind, zeige die Sprachauswahl
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Prüfe, ob der Pfad mit /de oder /en beginnt
  if (!pathname.startsWith('/de') && !pathname.startsWith('/en')) {
    const acceptLang = request.headers.get('accept-language') || '';
    const lang = acceptLang.startsWith('en') ? 'en' : 'de';
    // Leite auf die Sprachroute weiter, inkl. ursprünglichem Pfad
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url));
  }
  return NextResponse.next();
} 