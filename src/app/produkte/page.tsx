'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { FaDownload } from 'react-icons/fa';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: string;
  unit: string;
  artnr: string;
  groupDescription?: string;
  packaging?: string;
}

// Icon-Komponenten für Eigenschaften
const icons = {
  cotton: (
    <span title="100% Baumwolle" className="inline-block w-8 h-8 text-green-700 align-middle text-2xl">🌱</span>
  ),
  absorbent: (
    <span title="Sehr saugfähig" className="inline-block w-8 h-8 text-blue-500 align-middle text-2xl">💧</span>
  ),
  oil: (
    <span title="Ideal für Fett & Öl" className="inline-block w-8 h-8 text-yellow-600 align-middle text-2xl">🛢️</span>
  ),
  lintfree: (
    <span title="Fusselfrei" className="inline-block w-8 h-8 text-gray-400 align-middle text-2xl">🧽</span>
  ),
  polish: (
    <span title="Polierfähig" className="inline-block w-8 h-8 text-green-600 align-middle text-2xl">✨</span>
  ),
};

// Mapping von Eigenschaften zu Icons pro Produkt
const productFeaturesIcons: { [key: string]: (keyof typeof icons)[] } = {
  'trikot-bunt': ['cotton', 'absorbent', 'oil'],
  'trikot-weiss': ['cotton', 'absorbent', 'oil'],
  'kattun-hellbunt': ['cotton', 'lintfree'],
  'kattun-weiss': ['cotton', 'lintfree'],
  'bettwaesche-bunt': ['cotton', 'lintfree', 'absorbent'],
  'biberbettwaesche-bunt': ['cotton', 'absorbent', 'polish'],
  'bettwaesche-weiss': ['cotton', 'lintfree', 'absorbent'],
  'frottee': ['cotton', 'absorbent'],
  'bunt-standard': ['absorbent'],
  'sonstige': [],
};

// Eigenschaften-Filter Optionen
const filterOptions = [
  { key: 'cotton', label: '100% Baumwolle', icon: icons.cotton },
  { key: 'absorbent', label: 'Sehr saugfähig', icon: icons.absorbent },
  { key: 'oil', label: 'Ideal für Fett & Öl', icon: icons.oil },
  { key: 'lintfree', label: 'Fusselfrei', icon: icons.lintfree },
  { key: 'polish', label: 'Polierfähig', icon: icons.polish },
];

export default function Products() {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Putzlappen Gruppe mit Einleitung und Verpackung
  const putzlappenGroupDescription = `Unsere manuell gefertigten Putzlappen bestehen aus nicht mehr tragfähigen Alttextilien, die per Hand auf speziellen Putzlappenschneidemaschinen in handliche Stücke (ca. 45 x 45 cm) gefertigt werden.\nDer hohe Baumwollanteil der Putzlappen garantiert enorme Saugfähigkeit und effiziente Reinigung.\nKnöpfe, Reißverschlüsse und andere nicht zugehörige Teile werden entfernt, um ein schonendes Reinigen zu ermöglichen. Obige Bearbeitungskriterien entsprechen der DIN 61650.`;
  const putzlappenPackaging = `Standardmäßig verpacken wir die Putzlappen in folgende Einheiten: 10 kg oder 25 kg Pressballen. Nach Wunsch sind auch andere Größen möglich. Palettengröße 300 kg = 30 Ballen à 10 kg oder 12 Ballen à 25 kg.`;

  const products = [
    {
      id: 'putzlappen',
      category: 'Putzlappen',
      groupDescription: putzlappenGroupDescription,
      packaging: putzlappenPackaging,
      items: [
        {
          id: 'trikot-bunt',
          name: 'Trikotputzlappen bunt',
          artnr: '2222',
          description: 'Bearbeitet nach DIN 61650. Meistbestellter Putzlappen aus reiner Baumwolle in T-Shirt, Sweatshirt und Unterhemdenqualität, sehr saugfähiges Material. Sehr gut geeignet für die Aufnahme von Fett und Öl.',
          features: [
            'Material: 100% Baumwolle (T-Shirt, Sweatshirt, Unterhemden)',
            'Sehr saugfähig',
            'Ideal für Fett und Öl'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'trikot-weiss',
          name: 'Trikotputzlappen weiß',
          artnr: '2292',
          description: 'Bearbeitet nach DIN 61650. Hergestellt aus sehr saugfähigen Baumwollstoffen wie T-Shirt und Unterhemdenmaterial. Sehr gut geeignet für die Aufnahme von Fett und Öl.',
          features: [
            'Material: 100% Baumwolle (weiß)',
            'Sehr saugfähig',
            'Ideal für Fett und Öl',
            'Ihre gewünschte Menge in Kilogramm bitte in das untenstehende Feld eingeben.'
          ],
          image: '/products/Industrieputzlappen-Trikot-weiss.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'kattun-hellbunt',
          name: 'Kattunputzlappen hellbunt',
          artnr: '2102',
          description: 'Putzlappen nach DIN 61650 aus dünner, leichter Baumwollware, wie Hemden-, Blusen-, und Schürzenstoffe. Sehr gut geeignet für leichte Putzarbeiten bei fusselfreiem Einsatz.',
          features: [
            'Material: dünne, leichte Baumwolle',
            'Fusselfrei',
            'Für leichte Putzarbeiten'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'kattun-weiss',
          name: 'Kattunputzlappen weiß',
          artnr: '2190',
          description: 'Weiße Kattunputzlappen nach DIN 61650, hergestellt aus leichten Baumwollstoffen wie Hemden-, Blusen-, und Schürzenmaterial. Sehr gut geeignet für leichte Putzarbeiten bei fusselfreiem Einsatz.',
          features: [
            'Material: leichte Baumwolle (weiß)',
            'Fusselfrei',
            'Für leichte Putzarbeiten',
            'Ihre gewünschte Menge in Kilogramm bitte in das untenstehende Feld eingeben.'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'bettwaesche-bunt',
          name: 'Putzlappen aus Bettwäsche bunt',
          artnr: '2153',
          description: 'Bunte Putzlappen aus Bettwäsche nach DIN 61650. Hergestellt aus reinen Baumwollstoffen wie Bettlaken, Bezüge usw. Wenn ein nahtloses, fusselfreies und zugleich saugfähiges Material gewünscht wird, empfehlen wir diesen Putzlappen.',
          features: [
            'Material: Baumwoll-Bettwäsche (bunt)',
            'Nahtlos, fusselfrei, saugfähig',
            'Empfohlen für anspruchsvolle Reinigung',
            'Ihre gewünschte Menge in Kilogramm bitte in das untenstehende Feld eingeben.'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'biberbettwaesche-bunt',
          name: 'Putzlappen aus Biberbettwäsche bunt',
          artnr: '2150',
          description: 'Bunte Putzlappen aus Biberbettwäsche hergestellt nach DIN 61650. Das Material ist nahtfrei, sehr weich, gut saugfähig und eignet sich hervorragend für Polierarbeiten.',
          features: [
            'Material: Biberbettwäsche (bunt)',
            'Nahtfrei, sehr weich, saugfähig',
            'Ideal für Polierarbeiten',
            'Ihre gewünschte Menge in Kilogramm bitte in das untenstehende Feld eingeben.'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'bettwaesche-weiss',
          name: 'Putzlappen aus Bettwäsche weiß',
          artnr: '2180',
          description: 'Weiße Putzlappen aus Bettwäsche nach DIN 61650. Hergestellt aus reinen Baumwollstoffen wie Bettlaken, Bezüge usw. Das Material ist sehr saugfähig, fusselarm und nahtfrei.',
          features: [
            'Material: Baumwoll-Bettwäsche (weiß)',
            'Sehr saugfähig, fusselarm, nahtfrei',
            'Empfohlen für anspruchsvolle Reinigung',
            'Ihre gewünschte Menge in Kilogramm bitte in das untenstehende Feld eingeben.'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'frottee',
          name: 'Putzlappen aus Frottee',
          artnr: '2300',
          description: 'Putzlappen aus Frottee nach DIN 61650. Hergestellt aus Handtüchern, Badelaken und Bademänteln. Dieses Material hat das höchste Saugvermögen im Bereich textiler Putzlappen. Wir sind auch in der Lage z.B. ausschließlich Frotteehandtücher zu sortieren, welche mittig 1x durchgeschnitten sind.',
          features: [
            'Material: Frottee (Handtücher, Badelaken, Bademäntel)',
            'Höchstes Saugvermögen',
            'Auch als geschnittene Frotteehandtücher erhältlich',
            'Ihre gewünschte Menge in Kilogramm bitte in das untenstehende Feld eingeben.'
          ],
          image: '/products/Industrieputzlappen-Frottee-bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'bunt-standard',
          name: 'Bunte Putzlappen Standard',
          artnr: '2000',
          description: 'Bunte Putzlappen Standard nach DIN 61650. (preisgünstigste Sorte) Unser Standard Putzlappen besteht aus mittleren bis groben Textilien wie Jeans, Cord und anderen mittelschweren Stoffen. Ein geringer Anteil synthetischer Fasern ist ebenfalls enthalten. Dieser Putzlappen eignet sich eher für grobe Putzarbeiten.',
          features: [
            'Material: Jeans, Cord, mittelschwere Stoffe',
            'Geringer Anteil synthetischer Fasern',
            'Für grobe Putzarbeiten',
            'Ihre gewünschte Menge in Kilogramm bitte in das untenstehende Feld eingeben.'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
        {
          id: 'sonstige',
          name: 'Sonstige Sorten',
          artnr: '',
          description: 'Wir haben noch eine Vielzahl anderer Sorten im Programm wie z.B.: neue bunte und weiße, als auch rohweiße Baumwoll Trikotputzlappen aus neuen Konfektionsabfällen (T-Shirt Produktion). Außerdem stellen wir Putzlappen aus textilem Handtuchmaterial her, desweiteren Cord und Blauleinen. Verschiedene andere Sorten auf Anfrage.',
          features: [
            'Neue bunte und weiße Sorten',
            'Rohweiße Baumwoll Trikotputzlappen aus neuen Konfektionsabfällen',
            'Handtuchmaterial, Cord, Blauleinen',
            'Verschiedene andere Sorten auf Anfrage'
          ],
          image: '/products/Kattun_Putzlappen_Bunt.jpg',
          unit: 'kg',
          category: 'Putzlappen',
        },
      ]
    },
    {
      id: '2',
      category: 'Putztuchreinigung',
      items: [
        {
          id: '2-1',
          name: 'Putztuchleasing',
          description: 'Mehrwegsystem Putztuchreinigung - eine saubere und umweltfreundliche Lösung.',
          features: [
            'Keine Lagerkosten',
            'Keine Abfallkosten',
            'Keine Transportkosten',
            '100% Baumwolle',
            '40 x 40 cm Größe'
          ],
          image: '/products/putztuch-leasing.jpg',
          unit: 'Service',
          artnr: '',
          category: 'Putztuchreinigung'
        },
        {
          id: '2-2',
          name: 'Putztuchreinigung in Lohnarbeit',
          description: 'Professionelle Reinigung Ihrer Putztücher in Lohnarbeit.',
          features: [
            'Abrechnung nach Stückzahl',
            'Eigentum an Putztüchern',
            'Flexible Reinigungsintervalle',
            '100% Baumwolle',
            '40 x 40 cm Größe'
          ],
          image: '/products/putztuch-reinigung.jpg',
          unit: 'Service',
          artnr: '',
          category: 'Putztuchreinigung'
        }
      ]
    },
    {
      id: '3',
      category: 'Putzwolle',
      items: [
        {
          id: '3-1',
          name: 'Putzwolle bunt',
          artnr: '',
          description: 'Hochwertige Putzwolle in bunten Farben.',
          features: ['Stark scheuernd', 'Für hartnäckige Verschmutzungen', 'Langlebig'],
          image: '/products/putzwolle-bunt.jpg',
          unit: 'kg',
          category: 'Putzwolle'
        },
        {
          id: '3-2',
          name: 'Putzwolle hellbunt',
          description: 'Putzwolle in hellen, bunten Farben.',
          features: ['Mittlere Scheuerwirkung', 'Für normale Verschmutzungen', 'Gute Saugfähigkeit'],
          image: '/products/putzwolle-hellbunt.jpg',
          unit: 'kg',
          artnr: '',
          category: 'Putzwolle'
        },
        {
          id: '3-3',
          name: 'Putzwolle weiß',
          artnr: '',
          description: 'Reine weiße Putzwolle für sensible Bereiche.',
          features: ['Sanfte Scheuerwirkung', 'Für sensible Oberflächen', 'Farbneutral'],
          image: '/products/putzwolle-weiss.jpg',
          unit: 'kg',
          category: 'Putzwolle'
        }
      ]
    },
    {
      id: '4',
      category: 'Vliestücher',
      items: [
        {
          id: '4-1',
          name: 'Vliestücher bunt',
          artnr: '',
          description: 'Hochwertige Vliestücher in bunten Farben.',
          features: ['Sehr saugfähig', 'Lintfrei', 'Für technische Anlagen'],
          image: '/products/vliestuecher-bunt.jpg',
          unit: 'Packung',
          category: 'Vliestücher'
        },
        {
          id: '4-2',
          name: 'Vliestücher hellbunt',
          artnr: '',
          description: 'Vliestücher in hellen, bunten Farben.',
          features: ['Saugfähig', 'Lintfrei', 'Für allgemeine Reinigung'],
          image: '/products/vliestuecher-hellbunt.jpg',
          unit: 'Packung',
          category: 'Vliestücher'
        },
        {
          id: '4-3',
          name: 'Vliestücher weiß',
          artnr: '',
          description: 'Weiße Vliestücher für sensible Bereiche.',
          features: ['Hoch saugfähig', 'Lintfrei', 'Für sensible Oberflächen'],
          image: '/products/vliestuecher-weiss.jpg',
          unit: 'Packung',
          category: 'Vliestücher'
        }
      ]
    },
    {
      id: '5',
      category: 'Hygienepapiere',
      items: [
        {
          id: '5-1',
          name: 'Papierhandtücher',
          artnr: '',
          description: 'Hygienische Papierhandtücher für Handtuchspender.',
          features: ['Hoch saugfähig', 'Reißfest', 'In verschiedenen Größen'],
          image: '/products/papierhandtuecher.jpg',
          unit: 'Packung',
          category: 'Hygienepapiere'
        },
        {
          id: '5-2',
          name: 'Handtuchrollen',
          artnr: '',
          description: 'Handtuchrollen für Handtuchspender.',
          features: ['Hygienisch', 'Saugfähig', 'Für Spendersysteme'],
          image: '/products/handtuchrollen.jpg',
          unit: 'Rolle',
          category: 'Hygienepapiere'
        },
        {
          id: '5-3',
          name: 'Toilettenpapier Kleinrolle',
          artnr: '',
          description: 'Standard Toilettenpapier in Kleinrollen.',
          features: ['Weich', 'Reißfest', 'Für Standardhalter'],
          image: '/products/toilettenpapier-klein.jpg',
          unit: 'Packung',
          category: 'Hygienepapiere'
        },
        {
          id: '5-4',
          name: 'Toilettenpapier Maxirolle',
          artnr: '',
          description: 'Große Toilettenpapierrollen für hohen Verbrauch.',
          features: ['Extra lang', 'Reißfest', 'Für Maxi-Halter'],
          image: '/products/toilettenpapier-maxi.jpg',
          unit: 'Packung',
          category: 'Hygienepapiere'
        },
        {
          id: '5-5',
          name: 'Spendersysteme',
          artnr: '',
          description: 'Verschiedene Spendersysteme für Papierhandtücher und Toilettenpapier.',
          features: ['Hygienisch', 'Langlebig', 'Einfach zu befüllen'],
          image: '/products/spendersysteme.jpg',
          unit: 'Stück',
          category: 'Hygienepapiere'
        }
      ]
    },
    {
      id: '6',
      category: 'Sonstiges',
      items: [
        {
          id: '6-1',
          name: 'Müllsäcke',
          artnr: '',
          description: 'Hochwertige Müllsäcke in verschiedenen Größen.',
          features: ['Reißfest', 'In verschiedenen Größen', 'Für Restmüll und Wertstoffe'],
          image: '/products/muellsaecke.jpg',
          unit: 'Packung',
          category: 'Sonstiges'
        },
        {
          id: '6-2',
          name: 'Küchenrollen',
          artnr: '',
          description: 'Saugfähige Küchenrollen für den täglichen Gebrauch.',
          features: ['Hoch saugfähig', 'Reißfest', 'In verschiedenen Größen'],
          image: '/products/kuechenrollen.jpg',
          unit: 'Packung',
          category: 'Sonstiges'
        },
        {
          id: '6-3',
          name: 'Ölsaugtücher',
          artnr: '',
          description: 'Spezielle Tücher zum Aufsaugen von Ölen und Fetten.',
          features: ['Ölabsorbierend', 'Lintfrei', 'Für technische Anlagen'],
          image: '/products/oelsaugtuecher.jpg',
          unit: 'Packung',
          category: 'Sonstiges'
        },
        {
          id: '6-4',
          name: 'Ölkehrspäne',
          artnr: '',
          description: 'Spezielle Späne zum Binden von Ölen und Fetten.',
          features: ['Ölabsorbierend', 'Einfach zu kehren', 'Für große Flächen'],
          image: '/products/oelkehrspaene.jpg',
          unit: 'Sack',
          category: 'Sonstiges'
        },
        {
          id: '6-5',
          name: 'Ölbindemittel',
          artnr: '',
          description: 'Professionelle Ölbindemittel für Industrie und Werkstätten.',
          features: ['Hoch absorbierend', 'Für Öle und Chemikalien', 'Umweltfreundlich'],
          image: '/products/oelbindemittel.jpg',
          unit: 'Packung',
          category: 'Sonstiges'
        },
        {
          id: '6-6',
          name: 'Malerabdeckvlies',
          artnr: '',
          description: 'Schutzvlies für Malerarbeiten und Renovierungen.',
          features: ['Reißfest', 'Wiederverwendbar', 'In verschiedenen Größen'],
          image: '/products/malerabdeckvlies.jpg',
          unit: 'Rolle',
          category: 'Sonstiges'
        },
        {
          id: '6-7',
          name: 'Arbeitsschutzbekleidung',
          artnr: '',
          description: 'Professionelle Arbeitsschutzbekleidung für verschiedene Einsatzbereiche.',
          features: ['Schutzklasse nach EN 340', 'In verschiedenen Größen', 'Für verschiedene Anwendungen'],
          image: '/products/arbeitsschutz.jpg',
          unit: 'Stück',
          category: 'Sonstiges'
        },
        {
          id: '6-8',
          name: 'Handwaschpaste',
          artnr: '',
          description: 'Professionelle Handwaschpaste für stark verschmutzte Hände.',
          features: ['Hautschonend', 'Stark reinigend', 'Mit Pflegewirkung'],
          image: '/products/handwaschpaste.jpg',
          unit: 'Dose',
          category: 'Sonstiges'
        },
        {
          id: '6-9',
          name: 'Seifencreme und Patronen',
          artnr: '',
          description: 'Hygienische Seifencreme und Patronen für Seifenspender.',
          features: ['Hygienisch', 'Hautschonend', 'Für Spendersysteme'],
          image: '/products/seifencreme.jpg',
          unit: 'Packung',
          category: 'Sonstiges'
        },
        {
          id: '6-10',
          name: 'Waschpulver',
          artnr: '',
          description: 'Professionelle Waschpulver für verschiedene Anwendungen.',
          features: ['Wäscheweich', 'Kalkstop', 'Fleckensalz'],
          image: '/products/waschpulver.jpg',
          unit: 'Packung',
          category: 'Sonstiges'
        },
        {
          id: '6-11',
          name: 'Flüssige Reinigungsmittel',
          artnr: '',
          description: 'Verschiedene flüssige Reinigungsmittel für jeden Einsatzbereich.',
          features: [
            'Sanitärreiniger',
            'Bodenreiniger',
            'Scheuermilch',
            'Allzweckreiniger',
            'Glasreiniger',
            'Geschirrreiniger'
          ],
          image: '/products/reinigungsmittel.jpg',
          unit: 'Liter',
          category: 'Sonstiges'
        }
      ]
    }
  ];

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const addToCart = (product: Product, category: string) => {
    const quantity = quantities[product.id] || 1;
    addItem({
      id: product.id,
      name: product.name,
      quantity: quantity,
      unit: product.unit,
      category: category
    });
    alert(`${quantity} ${product.unit} ${product.name} wurden zum Warenkorb hinzugefügt.`);
  };

  // Filterfunktion für Produkteigenschaften
  const filteredProducts = products[0].items.filter((product) => {
    if (activeFilters.length === 0) return true;
    const features = productFeaturesIcons[product.id] || [];
    return activeFilters.every((filter) => features.includes(filter as keyof typeof icons));
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Unsere Produkte</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie unsere hochwertigen Produkte für Ihre industriellen Anforderungen.
          </p>
          <div className="mt-6">
            <a
              href="/downloads/produktdatenblatt.pdf"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              download
            >
              <FaDownload size={20} />
              Produktdatenblatt herunterladen
            </a>
          </div>
        </div>

        {/* Filter-Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setActiveFilters((prev) =>
                prev.includes(option.key)
                  ? prev.filter((f) => f !== option.key)
                  : [...prev, option.key]
              )}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow transition-colors
                ${activeFilters.includes(option.key)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}
              `}
              type="button"
            >
              <span className="w-6 h-6">{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Putzlappen Gruppe */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Putzlappen</h2>
          <p className="text-lg text-gray-700 whitespace-pre-line mb-2">{putzlappenGroupDescription}</p>
          <p className="text-md text-gray-600 mb-6 font-semibold">{putzlappenPackaging}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-visible hover:shadow-md transition-shadow flex flex-col relative"
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Tooltip wieder direkt unter dem Icon, aber nicht abgeschnitten */}
              <div className="absolute top-3 right-3 flex space-x-2 z-10">
                {productFeaturesIcons[product.id]?.map((iconKey) => {
                  const tooltipKey = `${product.id}-${iconKey}`;
                  return (
                    <span
                      key={iconKey}
                      className="relative bg-white/70 rounded-lg p-1 shadow flex items-center justify-center cursor-pointer group"
                      onMouseEnter={() => setActiveTooltip(tooltipKey)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      {icons[iconKey]}
                      {activeTooltip === tooltipKey && (
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-30 w-max pointer-events-none whitespace-nowrap transition-opacity duration-200 opacity-100">
                          {(() => {
                            switch (iconKey) {
                              case 'cotton': return '100% Baumwolle';
                              case 'absorbent': return 'Sehr saugfähig';
                              case 'oil': return 'Ideal für Fett & Öl';
                              case 'lintfree': return 'Fusselfrei';
                              case 'polish': return 'Polierfähig';
                              default: return '';
                            }
                          })()}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-cover opacity-70 rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2 font-medium">Art.-Nr.: {product.artnr || ''}</p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{quantities[product.id] || 1} {product.unit}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(product, 'Putzlappen')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Diesen Artikel anfragen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className="text-3xl font-bold mb-8">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* Placeholder for product image */}
                    <div className="w-full h-48 bg-gray-200" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-600">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{quantities[product.id] || 1} {product.unit}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => addToCart(product, category.category)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        In den Warenkorb
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Individuelle Beratung</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Benötigen Sie eine spezielle Lösung für Ihre Reinigungsanforderungen? Unser Team berät Sie gerne bei der Auswahl der passenden Produkte.
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Beratung anfordern
          </a>
        </div>
      </div>
    </div>
  );
} 