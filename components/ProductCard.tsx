import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { AddProductToCartButton } from './AddProductToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <Card className="h-full flex flex-col bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center overflow-hidden">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-neutral-200/60 group-hover:bg-neutral-300/80 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <span className="text-neutral-700 font-semibold text-xl md:text-2xl">{product.name.charAt(0)}</span>
        </div>
      </div>
      
      <CardHeader className="p-2.5 md:p-3 space-y-1">
        <CardTitle className="text-sm md:text-base font-semibold text-neutral-900 leading-tight tracking-tight line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="text-xs md:text-sm text-neutral-600 leading-snug line-clamp-2 font-light">
          {product.shortDescription}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-2.5 md:p-3 pt-0">
        <div className="mt-auto space-y-1.5">
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
          
          <Button asChild variant="outline" size="sm" className="w-full font-semibold border text-xs md:text-sm py-1.5 h-auto">
            <Link href={`/produkte/${product.category}/${product.slug}`}>
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
