'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilter } from '@/components/ProductFilter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        // Scroll zur Kategorie nach kurzer Verzögerung
        setTimeout(() => {
          const element = document.getElementById(`category-${category.id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
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

    // Zuerst nach Use-Cases filtern
    if (selectedProperties.length > 0) {
      filtered = filtered.filter((product) => {
        return product.useCases?.some((uc) => selectedProperties.includes(uc));
      });
    }

    // Dann semantische Suche (oder Fallback auf normale Suche)
    if (searchQuery.trim()) {
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
    } else {
      setFilteredProducts(filtered);
    }
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

      <PageHeader
        title="Unsere Produkte"
        description={`August Meyer ist ein traditionsreiches Familienunternehmen, das sich auf den Vertrieb von hochwertigen Industrieputzlappen und Reinigungstextilien spezialisiert hat. Als zuverlässiger Partner beliefern wir Kunden in ganz Deutschland mit einem umfassenden Produktsortiment an Reinigungsprodukten.

Unser Erfolg basiert auf drei wichtigen Säulen: der sorgfältigen Auswahl unserer Lieferanten, der Qualität unserer Produkte und unserem zuverlässigen Lieferservice. Wir arbeiten eng mit ausgewählten Herstellern zusammen, um Ihnen stets die beste Qualität zu fairen Preisen anbieten zu können.

Als mittelständisches Unternehmen legen wir besonderen Wert auf persönlichen Service und individuelle Beratung. Unser erfahrenes Team steht Ihnen bei allen Fragen zur Verfügung und entwickelt gemeinsam mit Ihnen maßgeschneiderte Lösungen für Ihre Reinigungsanforderungen.`}
        fullWidth={true}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Produkte' }
        ]}
      />

      {/* Produktkategorien-Übersicht - Kompakt */}
      <Section className="bg-neutral-50 py-4 md:py-6">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
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
                <Card
                  key={cat.id}
                  className="border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col"
                  onClick={() => {
                    const targetCategory = categories.find(c => c.id === cat.id || c.slug === cat.slug.split('/')[0]);
                    if (targetCategory) {
                      handleCategoryCardClick(targetCategory.id, targetCategory.slug);
                    }
                  }}
                >
                  <CardHeader className="p-2.5 md:p-3">
                    <CardTitle className="text-sm md:text-base font-semibold">{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2.5 md:p-3 pt-0 flex-1">
                    <p className="text-xs md:text-sm text-neutral-600 leading-snug">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <ProductFilter
            onFilterChange={setFilteredProducts}
            onPropertyFilterChange={setSelectedProperties}
          />

          <div className="space-y-2.5">
            {visibleCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const categoryProducts = productsByCategory[category.id] || [];

              return (
                <div
                  key={category.id}
                  id={`category-${category.id}`}
                  className="border border-neutral-200 rounded-lg overflow-hidden bg-white"
                >
                  {/* Kategorie-Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-3 py-2 bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      <h2 className="text-base md:text-lg font-semibold text-neutral-900">
                        {category.name}
                      </h2>
                      <span className="text-xs text-neutral-600 bg-neutral-200 px-1.5 py-0.5 rounded-full">
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
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                    )}
                  </button>

                  {/* Kategorie-Inhalt (Produkte oder Unterkategorien) */}
                  {isExpanded && (
                    <div className="p-3">
                      {category.description && (
                        <p className="text-neutral-600 mb-3 text-xs md:text-sm">{category.description}</p>
                      )}
                      

                      {/* Kategorien mit Unterkategorien */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="space-y-2.5">
                          {category.subcategories.map((subcategory) => {
                            const subcategoryProducts = productsBySubcategory[category.id]?.[subcategory.id] || [];
                            // Anzahl der Varianten in dieser Unterkategorie berechnen
                            const variantCount = subcategoryProducts.reduce((sum, product) => sum + (product.variants?.length || 0), 0);
                            
                            return (
                              <div key={subcategory.id} className="border border-neutral-200 rounded-lg p-2 bg-neutral-50">
                                <div className="flex items-center justify-between mb-1.5">
                                  <h3 className="text-xs md:text-sm font-semibold text-neutral-900">
                                    {subcategory.name}
                                  </h3>
                                  <span className="text-xs text-neutral-600 bg-neutral-200 px-1.5 py-0.5 rounded-full">
                                    {variantCount} {variantCount === 1 ? 'Artikel' : 'Artikel'}
                                  </span>
                                </div>
                                {subcategory.description && (
                                  <p className="text-neutral-600 mb-1.5 text-xs line-clamp-1">{subcategory.description}</p>
                                )}
                                
                                {subcategoryProducts.length > 0 ? (
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
                                    {subcategoryProducts.map((product) => (
                                      <ProductCard key={product.id} product={product} />
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-neutral-500 text-center py-2 text-xs">
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
                              {categoryProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                            </div>
                          ) : (
                            <p className="text-neutral-500 text-center py-2 text-xs">
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
            <div className="text-center py-8">
              <p className="text-neutral-600 text-base mb-4">
                Keine Produkte gefunden, die den ausgewählten Filtern entsprechen.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilteredProducts(allProducts);
                  setSelectedProperties([]);
                }}
              >
                Filter zurücksetzen
              </Button>
            </div>
          )}

          <div className="text-center mt-8 md:mt-10">
            <div className="bg-neutral-50 rounded-lg p-6 max-w-3xl mx-auto border-2 border-neutral-200">
              <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3">
                Individuelle Beratung
              </h3>
              <p className="text-sm md:text-base text-neutral-600 mb-4 leading-relaxed">
                Unser erfahrenes Team berät Sie gerne bei der Auswahl der richtigen Produkte für Ihre spezifischen Anforderungen. Kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <Button asChild size="lg" variant="default" className="font-semibold">
                <Link href="/kontakt">Beratung anfordern</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
