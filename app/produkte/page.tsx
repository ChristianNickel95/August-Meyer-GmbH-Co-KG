'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilter } from '@/components/ProductFilter';
import { Button } from '@/components/ui/button';
import { getAllCategories, getAllProducts, getProductsByCategory, Product, Category } from '@/lib/products';
import { AddToCartButton } from '@/components/AddToCartButton';
import { JsonLd } from '@/components/JsonLd';

export default function ProductsPage(): JSX.Element {
  const categories = getAllCategories();
  const allProducts = getAllProducts();
  
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
          name: 'Sortiment - August Meyer GmbH & Co. KG',
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
        title="Unser Sortiment"
        description="Entdecken Sie unser umfangreiches Sortiment an industriellen Lösungen und Produkten"
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Sortiment' }
        ]}
      />

      <Section>
        <Container>
          <ProductFilter
            onFilterChange={setFilteredProducts}
            onPropertyFilterChange={setSelectedProperties}
          />

          <div className="space-y-6">
            {visibleCategories.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const categoryProducts = productsByCategory[category.id] || [];

              return (
                <div
                  key={category.id}
                  className="border-2 border-neutral-200 rounded-lg overflow-hidden bg-white"
                >
                  {/* Kategorie-Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-6 py-4 bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
                        {category.name}
                      </h2>
                      <span className="text-sm text-neutral-600 bg-neutral-200 px-3 py-1 rounded-full">
                        {(() => {
                          // Für Kategorien mit Unterkategorien: Varianten zählen
                          if (category.subcategories && category.subcategories.length > 0) {
                            const totalVariants = category.subcategories.reduce((sum, subcategory) => {
                              const subProducts = productsBySubcategory[category.id]?.[subcategory.id] || [];
                              return sum + subProducts.reduce((productSum, product) => 
                                productSum + (product.variants?.length || 0), 0
                              );
                            }, 0);
                            return `${totalVariants} ${totalVariants === 1 ? 'Variante' : 'Varianten'}`;
                          }
                          // Für Kategorien ohne Unterkategorien: Varianten zählen
                          const totalVariants = categoryProducts.reduce((sum, product) => 
                            sum + (product.variants?.length || 0), 0
                          );
                          return `${totalVariants} ${totalVariants === 1 ? 'Variante' : 'Varianten'}`;
                        })()}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-neutral-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-neutral-600 flex-shrink-0" />
                    )}
                  </button>

                  {/* Kategorie-Inhalt (Produkte oder Unterkategorien) */}
                  {isExpanded && (
                    <div className="p-6">
                      {category.description && (
                        <p className="text-neutral-600 mb-6 text-lg">{category.description}</p>
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
                        <div className="space-y-6">
                          {category.subcategories.map((subcategory) => {
                            const subcategoryProducts = productsBySubcategory[category.id]?.[subcategory.id] || [];
                            // Anzahl der Varianten in dieser Unterkategorie berechnen
                            const variantCount = subcategoryProducts.reduce((sum, product) => sum + (product.variants?.length || 0), 0);
                            
                            return (
                              <div key={subcategory.id} className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-base font-semibold text-neutral-900">
                                    {subcategory.name}
                                  </h3>
                                  <span className="text-xs text-neutral-600 bg-neutral-200 px-2 py-1 rounded-full">
                                    {variantCount} {variantCount === 1 ? 'Variante' : 'Varianten'}
                                  </span>
                                </div>
                                {subcategory.description && (
                                  <p className="text-neutral-600 mb-3 text-xs">{subcategory.description}</p>
                                )}
                                
                                {subcategoryProducts.length > 0 ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {subcategoryProducts.map((product) => (
                                      <ProductCard key={product.id} product={product} />
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-neutral-500 text-center py-4 text-sm">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                              {categoryProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                            </div>
                          ) : (
                            <p className="text-neutral-500 text-center py-8">
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
              <p className="text-neutral-600 text-lg mb-4">
                Keine Produkte gefunden, die den ausgewählten Filtern entsprechen.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilteredProducts(allProducts);
                  setSelectedProperties([]);
                }}
              >
                Filter zurücksetzen
              </Button>
            </div>
          )}

          <div className="text-center mt-16">
            <div className="bg-neutral-50 rounded-lg p-8 max-w-2xl mx-auto border-2 border-neutral-200">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                Individuelle Lösungen gesucht?
              </h3>
              <p className="text-neutral-600 mb-6">
                Wir entwickeln auch maßgeschneiderte Lösungen für Ihre spezifischen Anforderungen. 
                Sprechen Sie mit unseren Experten.
              </p>
              <Button asChild size="lg">
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
