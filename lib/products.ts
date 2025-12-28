import categoriesData from '@/content/categories.json';
import productsData from '@/content/products.json';

export interface ProductVariant {
  id: string;
  name: string;
  articleNumber: string;
  description?: string;
  specifications?: {
    [key: string]: string;
  };
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  subcategory?: string;
  subcategoryName?: string;
  description: string;
  shortDescription: string;
  benefits?: string[];
  variants: ProductVariant[];
  image: string;
  slug: string;
  articleNumber?: string;
  properties?: string[];
  useCases?: string[];
  downloads?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  defaultValue?: string | null;
  unit?: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  productCount: number;
  defaultValue?: string | null;
  unit?: string | null;
  subcategories?: Subcategory[];
}

export function getAllCategories(): Category[] {
  const categories = categoriesData as Category[];
  const products = getAllProducts();
  
  // Produktanzahl pro Kategorie berechnen
  return categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.category === category.id).length,
  }));
}

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductsByCategory(categorySlug: string, subcategorySlug?: string): Product[] {
  let products = getAllProducts().filter(product => product.category === categorySlug);
  if (subcategorySlug) {
    products = products.filter(product => product.subcategory === subcategorySlug);
  }
  return products;
}

export function getSubcategoriesByCategory(categorySlug: string): Subcategory[] {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories || [];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(product => product.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find(category => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return getAllCategories().find(category => category.id === id);
}

export function getCategorySlugById(id: string): string {
  const category = getCategoryById(id);
  return category?.slug || id;
}

export function getFeaturedProducts(count: number = 3): Product[] {
  return getAllProducts().slice(0, count);
}
