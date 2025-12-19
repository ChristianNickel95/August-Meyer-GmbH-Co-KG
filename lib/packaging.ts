import { Product } from './products';

/**
 * Gibt Verpackungs- und Paletteninformationen für ein Produkt zurück
 * Nur für Putzlappen-Kategorie relevant
 */
export function getPackagingInfo(product: Product): {
  packagingSize: string;
  palletSize: string;
} | null {
  // Nur für Putzlappen-Kategorie
  if (product.category !== 'putzlappen') {
    return null;
  }

  return {
    packagingSize: '10 kg Pressballen in Folie',
    palletSize: '36 x 10 kg = 1 Europalette'
  };
}





