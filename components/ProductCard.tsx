import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { AddProductToCartButton } from './AddProductToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-[#151F2C] border border-[#2A3F55] shadow-sm overflow-hidden hover:border-[#2F6BA8] hover:shadow-md transition-shadow transition-colors">
      {/* Oberer Bereich: Platzhalterbild + Text */}
      <div className="flex flex-col">
        {/* Bild / Icon-Bereich */}
        <div className="h-32 md:h-36 w-full bg-gradient-to-b from-[#1E2C3C] to-[#101A27] flex items-center justify-center relative overflow-hidden">
          {product.image ? (
            <Image 
              src={product.image} 
              alt={product.name}
              width={200}
              height={144}
              className="w-full h-full object-contain p-4"
              unoptimized={product.image.toLowerCase().includes('.svg')}
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2F6BA8]/20 border border-[#2F6BA8]/30 rounded-full flex items-center justify-center">
              <span className="text-[#2F6BA8] font-semibold text-lg sm:text-xl">{product.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Textbereich */}
        <div className="flex flex-col px-4 md:px-5 pt-4 pb-3">
          <div className="min-h-[3.5rem] md:min-h-[3.75rem] flex items-start">
            <h4 className="text-base md:text-lg font-semibold text-white leading-snug line-clamp-2">
              {product.name}
            </h4>
          </div>
          <p className="mt-2 text-sm text-gray-300 min-h-[3rem]">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Unterer Bereich: Buttons immer bündig unten */}
      <div className="mt-auto pt-4 flex flex-col gap-2 px-4 md:px-5 pb-4">
        <AddProductToCartButton 
          product={product}
          defaultQuantity={(() => {
            // Bestimme defaultQuantity basierend auf Kategorie
            if (product.category === 'putzlappen') return '360';
            if (product.category === 'putzwolle') return '250';
            if (product.category === 'vliestuecher') return '300';
            if (product.category === 'putzpapierrollen' || product.category === 'putzpapier-karton' || 
                product.category === 'falthandtuecher-handtuchrollen' || product.category === 'toilettenpapier-kuechenrollen') return '12';
            // Für Services (putztuchreinigung) und sonstiges: keine defaultValue
            if (product.category === 'putztuchreinigung' || product.category === 'sonstiges') return '';
            return '';
          })()}
          unit={(() => {
            // Bestimme unit basierend auf Kategorie
            if (product.category === 'putzlappen' || product.category === 'putzwolle' || product.category === 'vliestuecher') return 'kg';
            if (product.category === 'putzpapierrollen') return 'Rollen';
            if (product.category === 'putzpapier-karton' || product.category === 'falthandtuecher-handtuchrollen' || 
                product.category === 'toilettenpapier-kuechenrollen') return 'Kartons';
            // Für Services: keine unit
            if (product.category === 'putztuchreinigung') return null;
            return null;
          })()}
        />
        
        <Button asChild variant="outline" size="sm" className="w-full justify-center border-[#2A3F55] text-gray-100 hover:bg-[#1D2A3A]">
          <Link href={`/produkte/${product.category}/${product.slug}`}>
            Details anzeigen
          </Link>
        </Button>
      </div>
    </article>
  );
}
