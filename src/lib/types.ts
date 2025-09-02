export interface Variant {
  name: string;
  sku?: string;
  ve?: string;
  masse?: string;
  einheit?: string;
}

export interface Product {
  slug: string;
  title: string;
  category: string;
  shortIntro: string;
  features?: string[];
  usage?: string[];
  materials?: string[];
  variants?: Variant[];
  downloads?: { title: string; href: string }[];
  images?: string[];
  seo?: { title?: string; description?: string };
}

export interface Category {
  slug: string;
  title: string;
  intro?: string;
  heroImage?: string;
}

export interface LeadFormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productInterest?: string;
}
