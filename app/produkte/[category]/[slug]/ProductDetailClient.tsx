'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AddProductToCartButton } from '@/components/AddProductToCartButton';
import { LeadForm } from '@/components/LeadForm';
import { Product } from '@/lib/products';
import { useCart } from '@/components/CartContext';
import { clsx } from 'clsx';

interface ProductDetailClientProps {
  product: Product;
  categoryName: string;
  variants: Product[];
}

export function ProductDetailClient({ product, categoryName, variants }: ProductDetailClientProps): JSX.Element {
  const [selectedVariant, setSelectedVariant] = useState<Product>(product);
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false);
  const { items } = useCart();

  const handleSelectVariant = (variantProduct: Product): void => {
    setSelectedVariant(variantProduct);
    // Scroll to top of form section for better UX (Desktop oder Mobile)
    const formElement = document.getElementById('anfrage-formular') || document.getElementById('anfrage-formular-mobile');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Gemeinsame Funktion zum Öffnen des Mengen-Dialogs für eine Variante
  const openQuantityDialogForVariant = (variant: Product): void => {
    handleSelectVariant(variant);
    setIsQuantityDialogOpen(true);
  };

  // Menge und Einheit für die Anzeige ermitteln
  const getQuantityAndUnit = useMemo(() => {
    // Prüfe, ob das Produkt bereits im Warenkorb ist
    // Konsistent mit AddProductToCartButton: Wenn Varianten vorhanden, verwende erste Variante
    const cartItem = items.find(item => {
      const firstVariant = selectedVariant.variants && selectedVariant.variants.length > 0 
        ? selectedVariant.variants[0] 
        : null;
      const itemId = firstVariant 
        ? `${selectedVariant.id}-${firstVariant.id}` 
        : selectedVariant.id;
      return item.categoryId === itemId;
    });

    if (cartItem) {
      return {
        quantity: cartItem.quantity || '0',
        unit: cartItem.unit || 'kg'
      };
    }

    // Fallback: Default-Quantity und Unit basierend auf Kategorie
    const defaultQuantity = (() => {
      if (selectedVariant.category === 'putzlappen') return '360';
      if (selectedVariant.category === 'putzwolle') return '250';
      if (selectedVariant.category === 'vliestuecher') return '300';
      if (selectedVariant.category === 'putzpapierrollen' || selectedVariant.category === 'putzpapier-karton' ||
          selectedVariant.category === 'falthandtuecher-handtuchrollen' || selectedVariant.category === 'toilettenpapier-kuechenrollen') return '12';
      if (selectedVariant.category === 'putztuchreinigung' || selectedVariant.category === 'sonstiges') return '';
      return '';
    })();

    const unit = (() => {
      if (selectedVariant.category === 'putzlappen' || selectedVariant.category === 'putzwolle' || selectedVariant.category === 'vliestuecher') return 'kg';
      if (selectedVariant.category === 'putzpapierrollen') return 'Rollen';
      if (selectedVariant.category === 'putzpapier-karton' || selectedVariant.category === 'falthandtuecher-handtuchrollen' ||
          selectedVariant.category === 'toilettenpapier-kuechenrollen') return 'Kartons';
      if (selectedVariant.category === 'putztuchreinigung') return null;
      return 'kg'; // Default fallback
    })();

    return {
      quantity: defaultQuantity || '0',
      unit: unit || 'kg'
    };
  }, [selectedVariant, items]);

  return (
    <>
      {/* Produkt-Titel (full-width, außerhalb des Grids) */}
      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
        {selectedVariant.name}
      </h1>

      {/* Zweispaltiges Grid: Links Produktinhalt, Rechts Angebot-Box */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
        {/* Linke Spalte: Produkt-Content */}
        <div className="space-y-6 lg:space-y-8">
          {/* 1. Produktbild / Platzhalter */}
          <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 flex items-center justify-center h-64 md:h-80 relative overflow-hidden">
            {selectedVariant.image ? (
              <Image 
                src={selectedVariant.image} 
                alt={selectedVariant.name}
                width={400}
                height={320}
                className="w-full h-full object-contain"
                unoptimized={selectedVariant.image.toLowerCase().includes('.svg')}
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#2F6BA8]/20 border border-[#2F6BA8]/30 rounded-full flex items-center justify-center">
                <span className="text-[#2F6BA8] font-semibold text-4xl md:text-5xl">{selectedVariant.name.charAt(0)}</span>
              </div>
            )}
          </div>

          {/* Angebot-Box auf Mobile (nach dem Bild) */}
          <div className="lg:hidden">
            <div id="anfrage-formular-mobile" className="flex h-full flex-col rounded-2xl bg-[#0b1521] border border-[#1f2937] p-6 shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Angebot anfragen</h2>
              <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
                Füllen Sie das Formular aus, um ein Angebot für dieses Produkt zu erhalten.
              </p>
              
              {/* Anzeige des ausgewählten Produkts mit Menge */}
              <div className="mb-4 p-3 rounded-lg bg-[#0D1C2E] border border-[#1f2937]">
                <p className="text-sm text-gray-200">
                  Ihre Anfrage enthält:{' '}
                  <span className="font-medium text-white">
                    {selectedVariant.name}
                  </span>
                  {' – '}
                  <span className="font-medium text-white">
                    {getQuantityAndUnit.quantity} {getQuantityAndUnit.unit}
                  </span>
                  {selectedVariant.articleNumber && (
                    <> (Art.-Nr. {selectedVariant.articleNumber})</>
                  )}
                </p>
              </div>

              <AddProductToCartButton
                product={selectedVariant}
                defaultQuantity={(() => {
                  if (selectedVariant.category === 'putzlappen') return '360';
                  if (selectedVariant.category === 'putzwolle') return '250';
                  if (selectedVariant.category === 'vliestuecher') return '300';
                  if (selectedVariant.category === 'putzpapierrollen' || selectedVariant.category === 'putzpapier-karton' ||
                      selectedVariant.category === 'falthandtuecher-handtuchrollen' || selectedVariant.category === 'toilettenpapier-kuechenrollen') return '12';
                  if (selectedVariant.category === 'putztuchreinigung' || selectedVariant.category === 'sonstiges') return '';
                  return '';
                })()}
                unit={(() => {
                  if (selectedVariant.category === 'putzlappen' || selectedVariant.category === 'putzwolle' || selectedVariant.category === 'vliestuecher') return 'kg';
                  if (selectedVariant.category === 'putzpapierrollen') return 'Rollen';
                  if (selectedVariant.category === 'putzpapier-karton' || selectedVariant.category === 'falthandtuecher-handtuchrollen' ||
                      selectedVariant.category === 'toilettenpapier-kuechenrollen') return 'Kartons';
                  if (selectedVariant.category === 'putztuchreinigung') return null;
                  return null;
                })()}
                open={isQuantityDialogOpen}
                onOpenChange={setIsQuantityDialogOpen}
                onTriggerClick={() => openQuantityDialogForVariant(selectedVariant)}
              />
              <div className="mt-4">
                <LeadForm productName={selectedVariant.name} />
              </div>
            </div>
          </div>

          {/* 2. Produktbeschreibung-Card */}
          <section className="rounded-2xl bg-[#0b1521] border border-[#1f2937] p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Produktbeschreibung</h2>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              {selectedVariant.description}
            </p>
          </section>

          {/* 3. Vorteile & Features-Card */}
          {selectedVariant.benefits && selectedVariant.benefits.length > 0 && (
            <section className="rounded-2xl bg-[#0b1521] border border-[#1f2937] p-6">
              <h2 className="text-xl font-semibold text-white mb-3">Vorteile & Features</h2>
              <div className="mt-3 space-y-2 text-sm md:text-base text-gray-300">
                {selectedVariant.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#36a768] flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. Verfügbare Artikel-Card */}
          <section className="rounded-2xl bg-[#0b1521] border border-[#1f2937] p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Verfügbare Artikel</h2>
            <p className="text-sm text-gray-400 mb-4">
              Alle verfügbaren Artikel dieser Produktunterkategorie. Wählen Sie den Artikel aus, den Sie anfragen möchten.
            </p>
            <div className="mt-4 grid gap-4 grid-cols-1">
              {variants.map((variantProduct) => {
                const isActive = variantProduct.id === selectedVariant.id;
                
                // Prüfen, ob das Produkt bereits im Warenkorb ist
                // Die categoryId im Warenkorb hat das Format: `${product.id}-${variant.id}` oder `${product.id}`
                // Prüfe alle möglichen Varianten-IDs, da der Benutzer im Dialog eine andere Variante auswählen könnte
                const isInCart = (() => {
                  // Prüfe direkt ob die Produkt-ID im Warenkorb ist
                  if (items.some(item => item.categoryId === variantProduct.id)) {
                    return true;
                  }
                  // Prüfe ob eine der Varianten im Warenkorb ist
                  if (variantProduct.variants && variantProduct.variants.length > 0) {
                    return variantProduct.variants.some(variant => 
                      items.some(item => item.categoryId === `${variantProduct.id}-${variant.id}`)
                    );
                  }
                  return false;
                })();
                
                // Default-Quantity und Unit für Anzeige
                const defaultQuantity = (() => {
                  if (variantProduct.category === 'putzlappen') return '360';
                  if (variantProduct.category === 'putzwolle') return '250';
                  if (variantProduct.category === 'vliestuecher') return '300';
                  if (variantProduct.category === 'putzpapierrollen' || variantProduct.category === 'putzpapier-karton' ||
                      variantProduct.category === 'falthandtuecher-handtuchrollen' || variantProduct.category === 'toilettenpapier-kuechenrollen') return '12';
                  return '';
                })();

                const unit = (() => {
                  if (variantProduct.category === 'putzlappen' || variantProduct.category === 'putzwolle' || variantProduct.category === 'vliestuecher') return 'kg';
                  if (variantProduct.category === 'putzpapierrollen') return 'Rollen';
                  if (variantProduct.category === 'putzpapier-karton' || variantProduct.category === 'falthandtuecher-handtuchrollen' ||
                      variantProduct.category === 'toilettenpapier-kuechenrollen') return 'Kartons';
                  return 'kg';
                })();
                
                // Karte mit separatem Link-Bereich und Button-Bereich
                return (
                  <div
                    key={variantProduct.id}
                    className={clsx(
                      'group flex h-full flex-col justify-between rounded-xl border bg-[#111827] px-4 py-3 text-left transition-all duration-200 shadow-sm shadow-black/40',
                      isActive
                        ? 'border-[#60A5FA] ring-1 ring-[#60A5FA]/60'
                        : 'border-[#1F2937] hover:border-[#60A5FA]/70 hover:bg-[#111827]/90'
                    )}
                  >
                    {/* Klickbarer Bereich für Navigation */}
                    <Link
                      href={`/produkte/${variantProduct.category}/${variantProduct.slug}`}
                      className="flex flex-col gap-2 flex-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                          {variantProduct.name}
                        </h4>
                        {isActive && (
                          <span className="rounded-full bg-[#60A5FA]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#60A5FA] flex-shrink-0">
                            Aktuell
                          </span>
                        )}
                      </div>
                      {variantProduct.shortDescription && (
                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                          {variantProduct.shortDescription}
                        </p>
                      )}
                      {variantProduct.articleNumber && (
                        <p className="mt-1 text-[11px] text-gray-400">
                          Art.-Nr.: {variantProduct.articleNumber}
                        </p>
                      )}
                    </Link>
                    {/* Separater Button-Bereich (nicht klickbar für Navigation) */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      {defaultQuantity && (
                        <span className="text-[11px] text-gray-400">
                          Standardmenge: {defaultQuantity} {unit}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => openQuantityDialogForVariant(variantProduct)}
                        className={clsx(
                          "w-full rounded-full text-xs font-medium py-1.5 px-3 transition whitespace-nowrap",
                          isInCart
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                            : "bg-slate-700 hover:bg-slate-600 text-slate-50"
                        )}
                      >
                        {isInCart ? 'Menge ändern' : 'Anfragen'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Downloads */}
          {selectedVariant.downloads && selectedVariant.downloads.length > 0 && (
            <section className="rounded-2xl bg-[#0b1521] border border-[#1f2937] p-6">
              <h2 className="text-xl font-semibold text-white mb-3">Downloads</h2>
              <p className="text-sm md:text-base text-gray-400 mb-4">
                Technische Unterlagen und Dokumentation
              </p>
              <div className="space-y-3">
                {selectedVariant.downloads.map((download, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-[#1f2937] bg-[#0D1C2E]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#2F6BA8]/20 border border-[#2F6BA8]/30 rounded flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-[#2F6BA8]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium text-white">{download.name}</span>
                    </div>
                    <a
                      href={download.url}
                      download
                      className="px-4 py-2 text-sm font-medium text-white bg-[#2F6BA8] hover:bg-[#2F6BA8]/80 rounded-lg transition-colors"
                    >
                      Herunterladen
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Rechte Spalte: Angebot anfragen (Sticky) - nur auf Desktop sichtbar */}
        <aside className="hidden lg:block lg:sticky lg:top-28">
          <div id="anfrage-formular" className="flex h-full flex-col rounded-2xl bg-[#0b1521] border border-[#1f2937] p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Angebot anfragen</h2>
            <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
              Füllen Sie das Formular aus, um ein Angebot für dieses Produkt zu erhalten.
            </p>
            
            {/* Anzeige des ausgewählten Produkts mit Menge */}
            <div className="mb-4 p-3 rounded-lg bg-[#0D1C2E] border border-[#1f2937]">
              <p className="text-sm text-gray-200">
                Ihre Anfrage enthält:{' '}
                <span className="font-medium text-white">
                  {selectedVariant.name}
                </span>
                {' – '}
                <span className="font-medium text-white">
                  {getQuantityAndUnit.quantity} {getQuantityAndUnit.unit}
                </span>
                {selectedVariant.articleNumber && (
                  <> (Art.-Nr. {selectedVariant.articleNumber})</>
                )}
              </p>
            </div>

            <AddProductToCartButton
              product={selectedVariant}
              defaultQuantity={(() => {
                if (selectedVariant.category === 'putzlappen') return '360';
                if (selectedVariant.category === 'putzwolle') return '250';
                if (selectedVariant.category === 'vliestuecher') return '300';
                if (selectedVariant.category === 'putzpapierrollen' || selectedVariant.category === 'putzpapier-karton' ||
                    selectedVariant.category === 'falthandtuecher-handtuchrollen' || selectedVariant.category === 'toilettenpapier-kuechenrollen') return '12';
                if (selectedVariant.category === 'putztuchreinigung' || selectedVariant.category === 'sonstiges') return '';
                return '';
              })()}
              unit={(() => {
                if (selectedVariant.category === 'putzlappen' || selectedVariant.category === 'putzwolle' || selectedVariant.category === 'vliestuecher') return 'kg';
                if (selectedVariant.category === 'putzpapierrollen') return 'Rollen';
                if (selectedVariant.category === 'putzpapier-karton' || selectedVariant.category === 'falthandtuecher-handtuchrollen' ||
                    selectedVariant.category === 'toilettenpapier-kuechenrollen') return 'Kartons';
                if (selectedVariant.category === 'putztuchreinigung') return null;
                return null;
              })()}
              open={isQuantityDialogOpen}
              onOpenChange={setIsQuantityDialogOpen}
            />
            <div className="mt-4">
              <LeadForm productName={selectedVariant.name} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

