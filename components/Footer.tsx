import Link from 'next/link';
import { Logo } from '@/components/Logo';

export function Footer(): JSX.Element {
  return (
    <footer className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#0b1a33] text-white" role="contentinfo">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <Logo variant="dark" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight">August Meyer</span>
                <span className="text-xs md:text-sm text-[#c7d2e0] leading-tight font-medium">GmbH & Co. KG</span>
              </div>
            </div>
            <p className="text-[#c7d2e0] mb-6 max-w-md leading-relaxed text-base md:text-lg">
              Seit 1863: Putzlappen aus recycelten Alttextilien, Putztuchreinigung, 
              Putzpapier und Hygienepapiere für Industrie, Handel und Handwerk.
            </p>
            <div className="text-[#c7d2e0] space-y-1 text-sm md:text-base">
              <p>Seibertstr. 5</p>
              <p>35708 Haiger</p>
              <p>Deutschland</p>
              <p className="pt-2">Tel. 0 27 73 / 50 80</p>
              <p>Fax 0 27 73 / 71 48 5</p>
              <p className="pt-1">
                <a href="mailto:info@august-meyer.de" className="hover:text-[#00ffb3] transition-colors duration-150">
                  info@august-meyer.de
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-white">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#c7d2e0] hover:text-[#00ffb3] transition-colors duration-150 text-sm md:text-base">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/produkte" className="text-text-secondary hover:text-white transition-colors duration-200 text-sm md:text-base">
                  Produkte
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-text-secondary hover:text-white transition-colors duration-200 text-sm md:text-base">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-white">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-text-secondary hover:text-white transition-colors duration-200 text-sm md:text-base">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-text-secondary hover:text-white transition-colors duration-200 text-sm md:text-base">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 mt-8 md:mt-10 pt-6 md:pt-8 text-center">
          <p className="text-[#c7d2e0] text-xs md:text-sm">&copy; {new Date().getFullYear()} August Meyer GmbH & Co. KG. Alle Rechte vorbehalten.</p>
          <div className="mt-4">
            <Link href="/kontakt">
              <button className="inline-flex items-center px-4 py-2 bg-[#00ffb3] hover:bg-[#00ffb3]/90 text-black font-semibold rounded-sm transition-colors duration-150 hover:shadow-[0_0_8px_rgba(0,255,179,0.4)]">
                Jetzt Kontakt aufnehmen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
