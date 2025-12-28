/**
 * Types for E-Mail system
 */

export interface LeadEmailData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  productName: string;
  cartItems?: Array<{
    categoryId: string;
    categoryName: string;
    quantity: string;
    unit: string | null;
    articleNumber?: string;
  }>;
  cartSummary?: string;
  referrer?: string;
  timestamp: string;
}

export interface EmailConfig {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}

