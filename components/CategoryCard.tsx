'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from './AddToCartButton';
import { Category } from '@/lib/products';

interface CategoryCardProps {
  category: Category & { defaultValue?: string | null; unit?: string | null };
}

export function CategoryCard({ category }: CategoryCardProps): JSX.Element {
  return (
    <Card className="h-full flex flex-col bg-white border-2 border-neutral-200 hover:border-neutral-400 hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center overflow-hidden">
        <div className="w-24 h-24 md:w-28 md:h-28 bg-neutral-200/60 rounded-full flex items-center justify-center">
          <span className="text-neutral-700 font-semibold text-3xl md:text-4xl">{category.name.charAt(0)}</span>
        </div>
      </div>
      
      <CardHeader className="flex-1 p-8 space-y-4">
        <CardTitle className="text-2xl md:text-3xl font-semibold text-neutral-900 leading-tight tracking-tight">
          {category.name}
        </CardTitle>
        <CardDescription className="text-lg md:text-xl text-neutral-600 leading-relaxed line-clamp-3">
          {category.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between p-8 pt-0 space-y-4">
        <div className="mb-4">
          <p className="text-sm text-neutral-600">
            <strong className="text-neutral-900">{category.productCount} Produkte</strong> verfügbar
          </p>
        </div>
        
        <div className="space-y-3">
          {category.defaultValue && (
            <AddToCartButton
              categoryId={category.id}
              categoryName={category.name}
              defaultQuantity={category.defaultValue}
              unit={category.unit || null}
            />
          )}
          
          <Button variant="outline" asChild className="w-full font-semibold border-2">
            <Link href={`/produkte/${category.slug}`}>
              Details anzeigen
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

