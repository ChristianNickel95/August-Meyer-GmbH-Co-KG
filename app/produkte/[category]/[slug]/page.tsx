import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VariantTable } from '@/components/VariantTable';
import { LeadForm } from '@/components/LeadForm';
import { AddProductToCartButton } from '@/components/AddProductToCartButton';
import { getProductBySlug, getCategoryBySlug } from '@/lib/products';
import { JsonLd } from '@/components/JsonLd';

interface ProductPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Produkt nicht gefunden',
    };
  }

  return {
    title: `${product.name} - August Meyer GmbH & Co. KG`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} - August Meyer GmbH & Co. KG`,
      description: product.shortDescription,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps): JSX.Element {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(params.category);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: product.categoryName,
          url: `https://www.august-meyer.de/produkte/${product.category}/${product.slug}`,
          brand: {
            '@type': 'Brand',
            name: 'August Meyer'
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'August Meyer GmbH & Co. KG'
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'August Meyer GmbH & Co. KG'
            }
          }
        }}
      />

      <PageHeader
        title={product.name}
        description={product.shortDescription}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Sortiment', href: '/produkte' },
          { label: category?.name || product.categoryName, href: `/produkte/${product.category}` },
          { label: product.name }
        ]}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Image */}
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl">
                  {product.name.charAt(0)}
                </div>
              </div>

              {/* Product Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Produktbeschreibung</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Product Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Vorteile & Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Product Variants */}
              <Card>
                <CardHeader>
                  <CardTitle>Verfügbare Varianten</CardTitle>
                  <CardDescription>
                    Alle verfügbaren Varianten dieses Produkts. Die Varianten unterscheiden sich in Farbe, Materialqualität oder spezifischen Eigenschaften.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {product.variants.map((variant, index) => {
                      // Prüfe, ob dies die aktuelle Variante ist (basierend auf articleNumber)
                      const isCurrentVariant = product.articleNumber === variant.articleNumber;
                      
                      return (
                        <div
                          key={variant.id}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            isCurrentVariant
                              ? 'border-neutral-800 bg-neutral-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className={`font-semibold ${isCurrentVariant ? 'text-neutral-900' : 'text-neutral-700'}`}>
                                  {variant.name}
                                </h4>
                                {isCurrentVariant && (
                                  <span className="px-2 py-0.5 text-xs font-semibold bg-neutral-800 text-white rounded">
                                    Aktuell
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-neutral-600 mb-2">
                                Art.-Nr.: <span className="font-mono">{variant.articleNumber}</span>
                              </p>
                              {variant.description && (
                                <p className="text-sm text-neutral-600">{variant.description}</p>
                              )}
                            </div>
                            <div className="ml-4">
                              <AddProductToCartButton
                                product={product}
                                defaultQuantity={(() => {
                                  if (product.category === 'putzlappen') return '360';
                                  if (product.category === 'putzwolle') return '250';
                                  if (product.category === 'vliestuecher') return '300';
                                  if (product.category === 'putzpapier' || product.category === 'hygienepapiere') return '12';
                                  return '';
                                })()}
                                unit={(() => {
                                  if (product.category === 'putzlappen' || product.category === 'putzwolle' || product.category === 'vliestuecher') return 'kg';
                                  if (product.subcategory === 'putzpapierrollen') return 'Rollen';
                                  if (product.subcategory === 'putztuch-einzelblatt' || product.category === 'hygienepapiere') return 'Kartons';
                                  return null;
                                })()}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {product.variants.length > 1 && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <p className="text-sm text-neutral-600">
                        <strong>Hinweis:</strong> Die Varianten unterscheiden sich je nach Produkt in Farbe (bunt, weiß, pastell), Materialqualität oder spezifischen Eigenschaften (z.B. fusselfrei, höchste Saugfähigkeit). Wählen Sie die passende Variante für Ihre Anforderungen aus.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Downloads */}
              {product.downloads && product.downloads.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Downloads</CardTitle>
                    <CardDescription>
                      Technische Unterlagen und Dokumentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {product.downloads.map((download, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="font-medium">{download.name}</span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={download.url} download>
                              Herunterladen
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar with Sticky CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Zum Warenkorb hinzufügen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AddProductToCartButton
                      product={product}
                      defaultQuantity={(() => {
                        if (product.category === 'putzlappen') return '360';
                        if (product.category === 'putzwolle') return '250';
                        if (product.category === 'vliestuecher') return '300';
                        if (product.category === 'putzpapier' || product.category === 'hygienepapiere') return '12';
                        return '';
                      })()}
                      unit={(() => {
                        if (product.category === 'putzlappen' || product.category === 'putzwolle' || product.category === 'vliestuecher') return 'kg';
                        if (product.subcategory === 'putzpapierrollen') return 'Rollen';
                        if (product.subcategory === 'putztuch-einzelblatt' || product.category === 'hygienepapiere') return 'Kartons';
                        return null;
                      })()}
                    />
                  </CardContent>
                </Card>
                <LeadForm productName={product.name} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
