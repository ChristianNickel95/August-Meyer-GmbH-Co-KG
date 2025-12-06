'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

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
  }, [searchParams, categories]);

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
    if (selectedProperties.length === 0) {
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
  }, [categoriesWithCounts, productsByCategory, productsBySubcategory, selectedProperties]);

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
      <Section className="bg-neutral-50 py-6 md:py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {/* Kategorien-Mapping für die 9 Kategorien */}
            {[
              { id: 'putzlappen', slug: 'putzlappen', name: 'Industrieputzlappen', description: 'Hochwertige Putzlappen aus recycelten Alttextilien, speziell für die industrielle Reinigung entwickelt.' },
              { id: 'vliestuecher', slug: 'vliestuecher', name: 'Vliestücher', description: 'Saugfähige Vliestücher aus textilen Fasermaterialien für anspruchsvolle Reinigungsaufgaben.' },
              { id: 'putzwolle', slug: 'putzwolle', name: 'Putzwolle', description: 'Hochwertige Putzwolle für die Reinigung empfindlicher Oberflächen und technischer Anlagen.' },
              { id: 'putzpapierrollen', slug: 'putzpapier/putzpapierrollen', name: 'Putzpapierrollen', description: 'Verschiedene Sorten von Putzpapierrollen für jeden Einsatzbereich.' },
              { id: 'putztuch-einzelblatt', slug: 'putzpapier/putztuch-im-einzelblatt', name: 'Putzpapier im Karton', description: 'Putzpapier in Einzelblattform, verpackt in Kartons für den praktischen Einsatz.' },
              { id: 'falthandtuecher-handtuchrollen', slug: 'hygienepapiere', name: 'Falthandtücher und Handtuchrollen', description: 'Falthandtücher und Handtuchrollen für sanitäre Einrichtungen und Spendersysteme.' },
              { id: 'toilettenpapier-kuechenrollen', slug: 'hygienepapiere', name: 'Toilettenpapier und Küchenrollen', description: 'Toilettenpapier und Küchenrollen für Industrie und Gewerbe.' },
              { id: 'putztuchreinigung', slug: 'putztuchreinigung', name: 'Maschinenputztücher', description: 'Mehrwegsystem Putztuchreinigung - professionelle Wäscherei- und Reinigungsservices.' },
              { id: 'sonstiges', slug: 'sonstiges', name: 'Sonstiges', description: 'Weitere Produkte für Industrie und Gewerbe wie Küchenrollen, Müllsäcke und mehr.' }
            ].map((cat) => {
              const category = categories.find(c => c.id === cat.id || c.slug === cat.slug);
              return (
                <Card
                  key={cat.id}
                  className="border-2 border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    const targetCategory = categories.find(c => c.id === cat.id || c.slug === cat.slug.split('/')[0]);
                    if (targetCategory) {
                      handleCategoryCardClick(targetCategory.id, targetCategory.slug);
                    }
                  }}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base md:text-lg font-semibold">{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
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

          <div className="space-y-4">
            {visibleCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const categoryProducts = productsByCategory[category.id] || [];

              return (
                <div
                  key={category.id}
                  id={`category-${category.id}`}
                  className="border-2 border-neutral-200 rounded-lg overflow-hidden bg-white"
                >
                  {/* Kategorie-Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg md:text-xl font-semibold text-neutral-900">
                        {category.name}
                      </h2>
                      <span className="text-xs md:text-sm text-neutral-600 bg-neutral-200 px-2 py-1 rounded-full">
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
                      <ChevronUp className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                    )}
                  </button>

                  {/* Kategorie-Inhalt (Produkte oder Unterkategorien) */}
                  {isExpanded && (
                    <div className="p-4">
                      {category.description && (
                        <p className="text-neutral-600 mb-4 text-sm md:text-base">{category.description}</p>
                      )}
                      
                      {/* Spezialfall: Putztuchreinigung - keine Produkte, aber Anfrage-Möglichkeit */}
                      {category.id === 'putztuchreinigung' && (
                        <div className="bg-neutral-50 border-2 border-neutral-200 rounded-lg p-8 text-center">
                          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                            Putztuchreinigung im Mehrwegsystem
                          </h3>
                          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                            Profitieren Sie von unserem professionellen Reinigungsservice für Putztücher. 
                            Wir übernehmen die Reinigung, Aufbereitung und Lieferung Ihrer Putztücher im umweltfreundlichen Mehrwegsystem.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <AddToCartButton
                              categoryId={category.id}
                              categoryName={category.name}
                              defaultQuantity=""
                              unit={null}
                            />
                            <Button asChild variant="outline" className="font-semibold border-2">
                              <Link href="/kontakt">Mehr Informationen</Link>
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Kategorien mit Unterkategorien */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="space-y-4">
                          {category.subcategories.map((subcategory) => {
                            const subcategoryProducts = productsBySubcategory[category.id]?.[subcategory.id] || [];
                            // Anzahl der Varianten in dieser Unterkategorie berechnen
                            const variantCount = subcategoryProducts.reduce((sum, product) => sum + (product.variants?.length || 0), 0);
                            
                            return (
                              <div key={subcategory.id} className="border border-neutral-200 rounded-lg p-3 bg-neutral-50">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-sm md:text-base font-semibold text-neutral-900">
                                    {subcategory.name}
                                  </h3>
                                  <span className="text-xs text-neutral-600 bg-neutral-200 px-2 py-1 rounded-full">
                                    {variantCount} {variantCount === 1 ? 'Artikel' : 'Artikel'}
                                  </span>
                                </div>
                                {subcategory.description && (
                                  <p className="text-neutral-600 mb-2 text-xs">{subcategory.description}</p>
                                )}
                                
                                {subcategoryProducts.length > 0 ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {subcategoryProducts.map((product) => (
                                      <ProductCard key={product.id} product={product} />
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-neutral-500 text-center py-3 text-sm">
                                    Keine Produkte in dieser Unterkategorie gefunden.
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Kategorien ohne Unterkategorien - direkte Produktanzeige */}
                      {(!category.subcategories || category.subcategories.length === 0) && category.id !== 'putztuchreinigung' && (
                        <>
                          {categoryProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                              {categoryProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                            </div>
                          ) : (
                            <p className="text-neutral-500 text-center py-4 text-sm">
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
