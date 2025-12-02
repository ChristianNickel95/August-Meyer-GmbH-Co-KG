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
    <Card className="h-full flex flex-col bg-white border-2 border-neutral-200 hover:border-neutral-400 hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-[3/2] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center overflow-hidden">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-200/60 group-hover:bg-neutral-300/80 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <span className="text-neutral-700 font-semibold text-2xl md:text-3xl">{product.name.charAt(0)}</span>
        </div>
      </div>
      
      <CardHeader className="flex-1 p-4 space-y-2">
        <CardTitle className="text-lg md:text-xl font-semibold text-neutral-900 leading-tight tracking-tight line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="text-sm md:text-base text-neutral-600 leading-relaxed line-clamp-2 font-light">
          {product.shortDescription}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between p-4 pt-0">
        <div className="space-y-2">
          <AddProductToCartButton 
            product={product}
            defaultQuantity={(() => {
              // Bestimme defaultQuantity basierend auf Kategorie
              if (product.category === 'putzlappen') return '360';
              if (product.category === 'putzwolle') return '250';
              if (product.category === 'vliestuecher') return '300';
              if (product.category === 'putzpapier' || product.category === 'hygienepapiere') return '12';
              return '';
            })()}
            unit={(() => {
              // Bestimme unit basierend auf Kategorie
              if (product.category === 'putzlappen' || product.category === 'putzwolle' || product.category === 'vliestuecher') return 'kg';
              if (product.subcategory === 'putzpapierrollen') return 'Rollen';
              if (product.subcategory === 'putztuch-einzelblatt' || product.category === 'hygienepapiere') return 'Kartons';
              return null;
            })()}
          />
          
          <Button asChild variant="outline" size="sm" className="w-full font-semibold border-2 text-sm">
            <Link href={`/produkte/${product.category}/${product.slug}`}>
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
