import Link from 'next/link';
import { Logo } from '@/components/Logo';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-neutral-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 lg:gap-20">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Logo variant="dark" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white leading-tight">August Meyer</span>
                <span className="text-xs text-neutral-400 leading-tight">GmbH & Co. KG</span>
              </div>
            </div>
            <p className="text-neutral-300 mb-6 max-w-md leading-relaxed text-base md:text-lg">
              Seit 1863: Putzlappen aus recycelten Alttextilien, Putztuchreinigung, 
              Putzpapier und Hygienepapiere für Industrie, Handel und Handwerk.
            </p>
            <div className="text-neutral-300 space-y-1 text-sm md:text-base">
              <p>Seibertstr. 5</p>
              <p>35708 Haiger</p>
              <p>Deutschland</p>
              <p className="pt-2">Tel. 0 27 73 / 50 80</p>
              <p>Fax 0 27 73 / 71 48 5</p>
              <p className="pt-1">
                <a href="mailto:info@august-meyer.de" className="hover:text-white transition-colors">
                  info@august-meyer.de
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-white">Schnellzugriff</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-neutral-300 hover:text-white transition-colors duration-200 text-base md:text-lg">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="text-neutral-300 hover:text-white transition-colors duration-200 text-base md:text-lg">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="/produkte" className="text-neutral-300 hover:text-white transition-colors duration-200 text-base md:text-lg">
                  Sortiment
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-neutral-300 hover:text-white transition-colors duration-200 text-base md:text-lg">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-white">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/impressum" className="text-neutral-300 hover:text-white transition-colors duration-200 text-base md:text-lg">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-neutral-300 hover:text-white transition-colors duration-200 text-base md:text-lg">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 md:mt-16 pt-8 md:pt-10 text-center">
          <p className="text-neutral-400 text-sm md:text-base">&copy; {new Date().getFullYear()} August Meyer GmbH & Co. KG. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
