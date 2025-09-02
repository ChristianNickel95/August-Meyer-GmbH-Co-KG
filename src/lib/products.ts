import { Product, Category } from './types';
import categoriesData from '../../content/categories.json';
import productsData from '../../content/products.json';

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getProducts().filter(product => product.category === categorySlug);
}

export function getProduct(category: string, slug: string): Product | undefined {
  return getProducts().find(product => 
    product.category === category && product.slug === slug
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find(category => category.slug === slug);
}
