import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getCategoryBySlug, getCategoryById, getCategorySlugById, getAllProducts } from '@/lib/products';
import { JsonLd } from '@/components/JsonLd';
import { ProductDetailClient } from './ProductDetailClient';

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
  // Kategorie auch über ID finden, falls der Slug nicht passt
  const categoryById = getCategoryById(product.category);
  const categoryToUse = category || categoryById;
  const allProducts = getAllProducts();
  
  // Alle Varianten aus derselben Unterkategorie finden (inklusive aktuelles Produkt)
  const variants = allProducts.filter(p => {
    if (product.subcategory && p.subcategory) {
      return p.subcategory === product.subcategory && p.category === product.category;
    }
    // Falls keine subcategory vorhanden, alle Produkte aus derselben category nehmen
    return p.category === product.category;
  });
  
  // Den richtigen Slug für die Kategorieseite verwenden
  const categorySlug = categoryToUse?.slug || product.category;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: product.categoryName,
          url: `https://www.august-meyer.de/produkte/${getCategorySlugById(product.category)}/${product.slug}`,
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

      <main className="min-h-screen w-full bg-gradient-to-br from-[#050B12] via-[#0B1724] to-[#111827] text-gray-100">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Startseite</Link>
            <span>/</span>
            <Link href="/produkte" className="hover:text-white transition-colors">Produkte</Link>
            <span>/</span>
            <Link href={`/produkte/${categorySlug}`} className="hover:text-white transition-colors">
              {categoryToUse?.name || product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>

          {/* Client-Komponente für interaktive Funktionalität */}
          <ProductDetailClient 
            product={product}
            categoryName={category?.name || product.categoryName}
            variants={variants}
          />
        </div>
      </main>
    </>
  );
}
