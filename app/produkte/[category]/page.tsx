import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { ProductCard } from '@/components/ProductCard';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/products';
import { JsonLd } from '@/components/JsonLd';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Kategorie nicht gefunden',
    };
  }

  return {
    title: `${category.name} - August Meyer GmbH & Co. KG`,
    description: category.description,
    openGraph: {
      title: `${category.name} - August Meyer GmbH & Co. KG`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps): JSX.Element {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(params.category);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${category.name} - August Meyer GmbH & Co. KG`,
          description: category.description,
          url: `https://www.august-meyer.de/produkte/${category.slug}`,
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: product.name,
              description: product.shortDescription,
              url: `https://www.august-meyer.de/produkte/${product.category}/${product.slug}`
            }
          }))
        }}
      />

      <PageHeader
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { label: 'Startseite', href: '/' },
          { label: 'Produkte', href: '/produkte' },
          { label: category.name }
        ]}
      />

      <Section>
        <Container>
          {products.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  {products.length} Produkt{products.length !== 1 ? 'e' : ''} in der Kategorie "{category.name}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Keine Produkte gefunden
                </h3>
                <p className="text-gray-600 mb-4">
                  In dieser Kategorie sind derzeit keine Produkte verfügbar.
                </p>
                <a
                  href="/produkte"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Zurück zur Produktübersicht
                </a>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
