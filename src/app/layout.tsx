import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ClientLayout from './ClientLayout';
import FloatingContactButton from '@/components/FloatingContactButton';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "August Meyer - Ihr Partner für Qualität und Service",
  description: "August Meyer - Ihr zuverlässiger Partner für Qualität und Service in der Region",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <ClientLayout>
          <Navigation />
          <main className="min-h-screen">
        {children}
          </main>
        </ClientLayout>
        <FloatingContactButton />
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Kontakt</h3>
                <p>August Meyer GmbH & Co KG</p>
                <p>Seibertstr. 5</p>
                <p>35708 Haiger</p>
                <p>Tel: 0 27 73 / 50 80</p>
                <p>Email: info@august-meyer.de</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Öffnungszeiten</h3>
                <p>Mo - Fr: 8:00 - 18:00</p>
                <p>Sa: 9:00 - 14:00</p>
                <p>So: Geschlossen</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li><a href="/impressum" className="hover:text-gray-300">Impressum</a></li>
                  <li><a href="/datenschutz" className="hover:text-gray-300">Datenschutz</a></li>
                  <li><a href="/agb" className="hover:text-gray-300">AGB</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p>&copy; {new Date().getFullYear()} August Meyer GmbH. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
