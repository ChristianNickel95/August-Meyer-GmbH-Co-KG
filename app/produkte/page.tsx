'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilter } from '@/components/ProductFilter';
import { Button } from '@/components/ui/button';
import { getAllCategories, getAllProducts, getProductsByCategory, Product, Category } from '@/lib/products';
import { AddToCartButton } from '@/components/AddToCartButton';
import { JsonLd } from '@/components/JsonLd';

export default function ProductsPage(): JSX.Element {
  const categories = getAllCategories();
  const allProducts = getAllProducts();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleCategory = (categoryId: string): void => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Beim Laden prüfen, ob eine Kategorie aus der URL geöffnet werden soll
  useEffect(() => {
    const categoryParam = searchParams.get('kategorie');
    const sucheParam = searchParams.get('suche');
    
    if (categoryParam) {
      // Kategorie-ID aus Slug finden
      const category = categories.find(cat => cat.slug === categoryParam || cat.id === categoryParam);
      if (category) {
        setExpandedCategories(new Set([category.id]));
        // Scroll zur Kategorie nach kurzer Verzögerung (erhöht für zuverlässigeres Scrollen)
        setTimeout(() => {
          const element = document.getElementById(`category-${category.id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
    
    // Suchparameter aus URL lesen
    if (sucheParam) {
      setSearchQuery(sucheParam);
    }
  }, [searchParams, categories]);

  // Event-Listener für Suche aus Navbar
  useEffect(() => {
    const handleSearch = (event: CustomEvent<string>): void => {
      setSearchQuery(event.detail);
    };

    window.addEventListener('search', handleSearch as EventListener);
    return () => {
      window.removeEventListener('search', handleSearch as EventListener);
    };
  }, []);

  // Produkte nach Suchbegriff und Use-Case-Filter kombinieren (mit semantischer Suche)
  useEffect(() => {
    let filtered = allProducts;

    // Wenn Suche leer ist, alle Produkte anzeigen (ggf. mit Use-Case-Filter)
    if (!searchQuery.trim()) {
      // Nur nach Use-Cases filtern, wenn welche ausgewählt sind
      if (selectedProperties.length > 0) {
        filtered = filtered.filter((product) => {
          return product.useCases?.some((uc) => selectedProperties.includes(uc));
        });
      }
      setFilteredProducts(filtered);
      window.dispatchEvent(new CustomEvent('searchResults', { detail: filtered.length }));
      return;
    }

    // Zuerst nach Use-Cases filtern
    if (selectedProperties.length > 0) {
      filtered = filtered.filter((product) => {
        return product.useCases?.some((uc) => selectedProperties.includes(uc));
      });
    }

    // Dann semantische Suche (oder Fallback auf normale Suche)
    // Dynamischer Import für semantische Suche (nur wenn benötigt)
    import('@/lib/semanticSearch')
      .then(({ searchProducts }) => {
        return searchProducts(searchQuery, filtered, selectedProperties);
      })
      .then((results) => {
        setFilteredProducts(results);
        // Ergebnisanzahl an SearchResultsBadge senden
        window.dispatchEvent(new CustomEvent('searchResults', { detail: results.length }));
      })
      .catch((error) => {
        console.warn('Semantische Suche nicht verfügbar, verwende Textsuche:', error);
        // Fallback auf normale Textsuche
        const query = searchQuery.toLowerCase().trim();
        const textFiltered = filtered.filter((product) => {
          const nameMatch = product.name.toLowerCase().includes(query);
          const descriptionMatch = product.description?.toLowerCase().includes(query) || 
                                  product.shortDescription?.toLowerCase().includes(query);
          const categoryMatch = product.categoryName?.toLowerCase().includes(query) ||
                               product.subcategoryName?.toLowerCase().includes(query);
          const articleMatch = product.articleNumber?.toLowerCase().includes(query);
          
          return nameMatch || descriptionMatch || categoryMatch || articleMatch;
        });
        setFilteredProducts(textFiltered);
        // Ergebnisanzahl an SearchResultsBadge senden
        window.dispatchEvent(new CustomEvent('searchResults', { detail: textFiltered.length }));
      });
  }, [searchQuery, allProducts, selectedProperties]);

  const handleCategoryCardClick = (categoryId: string, categorySlug: string): void => {
    // Kategorie aufklappen
    setExpandedCategories(new Set([categoryId]));
    // Scroll zur Kategorie
    setTimeout(() => {
      const element = document.getElementById(`category-${categoryId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Produkte nach Kategorien und Unterkategorien gruppieren
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    
    filteredProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });

    return grouped;
  }, [filteredProducts]);

  // Produkte nach Unterkategorien gruppieren
  const productsBySubcategory = useMemo(() => {
    const grouped: Record<string, Record<string, Product[]>> = {};
    
    filteredProducts.forEach((product) => {
      if (product.subcategory) {
        if (!grouped[product.category]) {
          grouped[product.category] = {};
        }
        if (!grouped[product.category][product.subcategory]) {
          grouped[product.category][product.subcategory] = [];
        }
        grouped[product.category][product.subcategory].push(product);
      }
    });

    return grouped;
  }, [filteredProducts]);

  // Produktanzahl pro Kategorie aktualisieren
  const categoriesWithCounts = useMemo(() => {
    return categories.map((category) => {
      // Für Kategorien mit Unterkategorien: Summe aller Varianten in allen Unterkategorien
      if (category.subcategories && category.subcategories.length > 0) {
        const totalVariantCount = category.subcategories.reduce((sum, subcategory) => {
          const subcategoryProducts = productsBySubcategory[category.id]?.[subcategory.id] || [];
          const variantCount = subcategoryProducts.reduce((productSum, product) => 
            productSum + (product.variants?.length || 0), 0
          );
          return sum + variantCount;
        }, 0);
        return {
          ...category,
          productCount: totalVariantCount,
        };
      }
      // Für Kategorien ohne Unterkategorien: Summe aller Varianten der direkten Produkte
      const directProducts = productsByCategory[category.id] || [];
      const directVariantCount = directProducts.reduce((sum, product) => 
        sum + (product.variants?.length || 0), 0
      );
      return {
        ...category,
        productCount: directVariantCount,
};
    });
  }, [categories, productsByCategory, productsBySubcategory]);

  // Kategorien mit Produkten filtern, wenn Filter aktiv ist
  const visibleCategories = useMemo(() => {
    if (selectedProperties.length === 0 && !searchQuery.trim()) {
      return categoriesWithCounts;
    }
    return categoriesWithCounts.filter((category) => {
      // Für Kategorien mit Unterkategorien: prüfe, ob mindestens eine Unterkategorie Produkte hat
      if (category.subcategories && category.subcategories.length > 0) {
        return category.subcategories.some((subcategory) => {
          return productsBySubcategory[category.id]?.[subcategory.id]?.length > 0;
        });
      }
      // Für Kategorien ohne Unterkategorien: prüfe direkte Produkte
      return productsByCategory[category.id] && productsByCategory[category.id].length > 0;
    });
  }, [categoriesWithCounts, productsByCategory, productsBySubcategory, selectedProperties, searchQuery]);

  // Automatisch relevante Kategorien aufklappen, wenn gefiltert wird
  useEffect(() => {
    // Nur aufklappen, wenn Filter oder Suche aktiv ist
    if (selectedProperties.length > 0 || searchQuery.trim()) {
      const relevantCategoryIds = new Set<string>();
      
      // Finde alle Kategorien, die gefilterte Produkte enthalten
      Object.keys(productsByCategory).forEach((categoryId) => {
        if (productsByCategory[categoryId] && productsByCategory[categoryId].length > 0) {
          relevantCategoryIds.add(categoryId);
        }
      });
      
      // Finde alle Kategorien mit relevanten Unterkategorien
      Object.keys(productsBySubcategory).forEach((categoryId) => {
        const subcategories = productsBySubcategory[categoryId];
        if (subcategories && Object.keys(subcategories).some(subId => subcategories[subId]?.length > 0)) {
          relevantCategoryIds.add(categoryId);
        }
      });
      
      // Klappe relevante Kategorien auf
      if (relevantCategoryIds.size > 0) {
        setExpandedCategories((prev) => {
          const newSet = new Set(prev);
          relevantCategoryIds.forEach(id => newSet.add(id));
          return newSet;
        });
      }
    } else {
      // Wenn keine Filter aktiv sind, alle Kategorien schließen
      setExpandedCategories(new Set());
    }
  }, [filteredProducts, productsByCategory, productsBySubcategory, selectedProperties, searchQuery]);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Produkte - August Meyer GmbH & Co. KG',
          description: 'Industrielle Lösungen und Produkte',
          url: 'https://www.august-meyer.de/produkte',
          numberOfItems: categories.length,
          itemListElement: categories.map((category, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: category.name,
              description: category.description,
              url: `https://www.august-meyer.de/produkte/${category.slug}`
            }
          }))
        }}
      />

      <main className="min-h-screen w-full bg-background text-foreground">
        <section className="w-full bg-gradient-to-br from-muted via-background to-muted dark:from-[#0D1C2E] dark:via-[#122536] dark:to-[#1B2B3C]">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          {/* Einleitung */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Unsere Produkte
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              August Meyer ist ein traditionsreiches Familienunternehmen, das sich auf den Vertrieb von hochwertigen Industrieputzlappen und Reinigungstextilien spezialisiert hat. Als zuverlässiger Partner beliefern wir Kunden in ganz Deutschland mit einem umfassenden Produktsortiment an Reinigungsprodukten.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
              Unser Erfolg basiert auf drei wichtigen Säulen: der sorgfältigen Auswahl unserer Lieferanten, der Qualität unserer Produkte und unserem zuverlässigen Lieferservice. Wir arbeiten eng mit ausgewählten Herstellern zusammen, um Ihnen stets die beste Qualität zu fairen Preisen anbieten zu können.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
              Als mittelständisches Unternehmen legen wir besonderen Wert auf persönlichen Service und individuelle Beratung. Unser erfahrenes Team steht Ihnen bei allen Fragen zur Verfügung und entwickelt gemeinsam mit Ihnen maßgeschneiderte Lösungen für Ihre Reinigungsanforderungen.
            </p>
          </div>

          {/* Lagerbild */}
          <div className="mt-10 md:mt-12 rounded-[2px] dark:rounded-sm overflow-hidden border border-border">
            <div className="relative w-full h-64 md:h-80 lg:h-96">
              <img
                src="/images/Gebäude und Sonstiges/Lagerhalle_Herosection_Produkte.png"
                alt="Lagerhalle mit Produkten - August Meyer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1a33]/20 to-[#0b1a33]/40" />
            </div>
          </div>
                  
          {/* Kategorie-Karten */}
          <div className="mt-10 md:mt-12 grid gap-4 grid-auto-fit-categories items-stretch">
            {/* Kategorien-Mapping für die 9 Kategorien - nur relevante anzeigen wenn gefiltert */}
            {(() => {
              const categoryCards = [
                { id: 'putzlappen', slug: 'industrieputzlappen', name: 'Industrieputzlappen', description: 'Hochwertige Putzlappen aus recycelten Alttextilien, speziell für die industrielle Reinigung entwickelt.' },
                { id: 'vliestuecher', slug: 'vliestuecher', name: 'Vliestücher', description: 'Saugfähige Vliestücher aus textilen Fasermaterialien für anspruchsvolle Reinigungsaufgaben.' },
                { id: 'putzwolle', slug: 'putzwolle', name: 'Putzwolle', description: 'Hochwertige Putzwolle für die Reinigung empfindlicher Oberflächen und technischer Anlagen.' },
                { id: 'putzpapierrollen', slug: 'putzpapierrollen', name: 'Putzpapierrollen', description: 'Verschiedene Sorten von Putzpapierrollen für jeden Einsatzbereich.' },
                { id: 'putzpapier-karton', slug: 'putzpapier-im-karton', name: 'Putzpapier im Karton', description: 'Putzpapier in Einzelblattform, verpackt in Kartons für den praktischen Einsatz.' },
                { id: 'falthandtuecher-handtuchrollen', slug: 'falthandtuecher-handtuchrollen', name: 'Falthandtücher und Handtuchrollen', description: 'Falthandtücher und Handtuchrollen für sanitäre Einrichtungen und Spendersysteme.' },
                { id: 'toilettenpapier-kuechenrollen', slug: 'toilettenpapier-kuechenrollen', name: 'Toilettenpapier und Küchenrollen', description: 'Toilettenpapier und Küchenrollen für Industrie und Gewerbe.' },
                { id: 'putztuchreinigung', slug: 'maschinenputztuecher-reinigung', name: 'Maschinenputztücher', description: 'Mehrwegsystem Putztuchreinigung - professionelle Wäscherei- und Reinigungsservices.' },
                { id: 'sonstiges', slug: 'sonstiges', name: 'Sonstiges', description: 'Weitere Produkte für Industrie und Gewerbe wie Küchenrollen, Müllsäcke und mehr.' }
              ];
              
              // Wenn gefiltert, nur relevante Kategorien anzeigen
              if (selectedProperties.length > 0 || searchQuery.trim()) {
                return categoryCards.filter(cat => {
                  const category = categories.find(c => c.id === cat.id);
                  return visibleCategories.some(vc => vc.id === cat.id);
                });
              }
              return categoryCards;
            })().map((cat) => {
              const category = categories.find(c => c.id === cat.id || c.slug === cat.slug);
              return (
                <div
                  key={cat.id}
                  className="flex flex-col h-full bg-card border border-border hover:border-primary transition-all duration-150 cursor-pointer rounded-[2px] dark:rounded-sm px-4 py-3"
                  onClick={() => {
                    const targetCategory = categories.find(c => c.id === cat.id || c.slug === cat.slug.split('/')[0]);
                    if (targetCategory) {
                      handleCategoryCardClick(targetCategory.id, targetCategory.slug);
                    }
                  }}
                >
                  {/* Titel */}
                  <h3 className="text-base sm:text-lg font-semibold text-card-foreground leading-tight tracking-tight mb-1">
                    {cat.name}
                  </h3>
                  
                  {/* Kurzbeschreibung */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {cat.description}
                  </p>
                </div>
              );
            })}
                </div>
                
          {/* Filterbereich "Nach Anwendung filtern" */}
          <section className="mt-10 md:mt-12 rounded-[2px] dark:rounded-sm border border-border bg-card px-4 md:px-6 py-5 md:py-6 dark:border-[#2A3F55] dark:bg-[#101A27]">
            <div>
              <h3 className="text-base font-semibold text-card-foreground mb-1 dark:text-white">
                Nach Anwendung filtern
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Finden Sie das passende Produkt für Ihre Anforderungen.
                    </p>
                  </div>
            <div className="mt-4">
              <ProductFilter
                onFilterChange={setFilteredProducts}
                onPropertyFilterChange={setSelectedProperties}
              />
            </div>
          </section>

          {/* Accordion / Produkt-Liste */}
          <div className="mt-8 space-y-4">
            {visibleCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const categoryProducts = productsByCategory[category.id] || [];

              return (
                <div
                  key={category.id}
                  id={`category-${category.id}`}
                  className="rounded-sm overflow-hidden"
                >
                  {/* Kategorie-Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full items-center justify-between rounded-[2px] dark:rounded-sm bg-card px-4 py-2.5 md:py-3 border border-border hover:border-primary transition-colors dark:bg-[#0D1C2E] dark:border-[#1F2F40] dark:hover:border-[#2A3F55]"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg md:text-xl font-semibold text-card-foreground dark:text-white">
                        {category.name}
                      </h3>
                      <div className="ml-3 flex items-center gap-2 flex-wrap">
                        <span className="rounded-[2px] dark:rounded-sm bg-muted px-3 py-1 text-xs md:text-sm text-muted-foreground font-medium dark:bg-white/5 dark:text-gray-200">
                          {(() => {
                            // Für Kategorien mit Unterkategorien: Varianten zählen
                            if (category.subcategories && category.subcategories.length > 0) {
                              const totalVariants = category.subcategories.reduce((sum, subcategory) => {
                                const subProducts = productsBySubcategory[category.id]?.[subcategory.id] || [];
                                return sum + subProducts.reduce((productSum, product) => 
                                  productSum + (product.variants?.length || 0), 0
                                );
                              }, 0);
                              return `${totalVariants} ${totalVariants === 1 ? 'Artikel' : 'Artikel'}`;
                            }
                            // Für Kategorien ohne Unterkategorien: Varianten zählen
                            const totalVariants = categoryProducts.reduce((sum, product) => 
                              sum + (product.variants?.length || 0), 0
                            );
                            return `${totalVariants} ${totalVariants === 1 ? 'Artikel' : 'Artikel'}`;
                          })()}
                        </span>
                        <span className="text-[10px] md:text-xs text-muted-foreground italic dark:text-gray-400">
                          + weitere auf Anfrage
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform dark:text-gray-400" />
                    )}
                  </button>

                  {/* Kategorie-Inhalt (Produkte oder Unterkategorien) */}
                  {isExpanded && (
                    <div className="mt-3 rounded-[2px] dark:rounded-sm border border-border bg-muted px-4 md:px-6 py-4 md:py-5 dark:border-[#2A3F55] dark:bg-[#101A27]">
                      {category.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 dark:text-text-secondary">{category.description}</p>
                      )}
                      

                      {/* Kategorien mit Unterkategorien */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="space-y-6">
                          {category.subcategories.map((subcategory) => {
                            const subcategoryProducts = productsBySubcategory[category.id]?.[subcategory.id] || [];
                            // Anzahl der Varianten in dieser Unterkategorie berechnen
                            const variantCount = subcategoryProducts.reduce((sum, product) => sum + (product.variants?.length || 0), 0);
                            
                            return (
                              <div key={subcategory.id} className="border border-border rounded-[2px] dark:rounded-sm p-4 sm:p-5 bg-card dark:border-[#2A3F55] dark:bg-[#182537]">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-base sm:text-lg font-semibold text-card-foreground dark:text-white">
                                    {subcategory.name}
                                  </h3>
                                  <span className="text-xs sm:text-sm text-muted-foreground bg-primary/20 border border-primary/30 px-2 py-0.5 rounded-[2px] dark:rounded-sm dark:text-text-secondary dark:bg-[#2F6BA8]/20 dark:border-[#2F6BA8]/30">
                                    {variantCount} {variantCount === 1 ? 'Artikel' : 'Artikel'}
                                  </span>
                                </div>
                                {subcategory.description && (
                                  <p className="text-muted-foreground mb-2 text-xs line-clamp-1 dark:text-text-secondary">{subcategory.description}</p>
                                )}
                                
                                {subcategoryProducts.length > 0 ? (
                                  <div className="mt-4 grid gap-4 md:gap-5 lg:gap-6 grid-auto-fit">
                                    {subcategoryProducts.map((product) => (
                                      <ProductCard key={product.id} product={product} />
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-400 text-center py-2 text-xs">
                                    Keine Produkte in dieser Unterkategorie gefunden.
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Kategorien ohne Unterkategorien - direkte Produktanzeige */}
                      {(!category.subcategories || category.subcategories.length === 0) && (
                        <>
                          {categoryProducts.length > 0 ? (
                            <div className="mt-4 grid gap-4 md:gap-5 lg:gap-6 grid-auto-fit">
                              {categoryProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
            ))}
          </div>
                          ) : (
                            <p className="text-gray-400 text-center py-2 text-xs">
                              Keine Produkte in dieser Kategorie gefunden.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
                  
          {visibleCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-base mb-4 dark:text-text-secondary">
                Keine Produkte gefunden, die den ausgewählten Filtern entsprechen.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilteredProducts(allProducts);
                  setSelectedProperties([]);
                  setSearchQuery('');
                }}
              >
                Filter zurücksetzen
              </Button>
            </div>
          )}

          <div className="text-center mt-10 md:mt-12">
            <div className="bg-[#101A27] rounded-sm p-6 sm:p-8 max-w-3xl mx-auto border border-[#2A3F55]">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Individuelle Beratung
              </h3>
              <p className="text-sm md:text-base text-text-secondary mb-4 leading-relaxed">
                Unser erfahrenes Team berät Sie gerne bei der Auswahl der richtigen Produkte für Ihre spezifischen Anforderungen. Kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <Button asChild size="lg" variant="sustainability" className="font-semibold">
                <Link href="/kontakt">Beratung anfordern</Link>
              </Button>
            </div>
          </div>
          </div>
        </section>
      </main>
    </>
  );
}
