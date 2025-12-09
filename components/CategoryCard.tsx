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
    <Card className="h-full flex flex-col bg-[#1B2B3C] border border-[#2A3F55] hover:border-[#2F6BA8] hover:shadow-lg transition-all duration-300 rounded-xl">
      <div className="aspect-[4/3] bg-gradient-to-br from-[#1B2B3C] via-[#2A3F55] to-[#1B2B3C] flex items-center justify-center overflow-hidden rounded-t-xl">
        <div className="w-24 h-24 md:w-28 md:h-28 bg-[#2F6BA8]/20 border border-[#2F6BA8]/30 rounded-full flex items-center justify-center">
          <span className="text-[#2F6BA8] font-semibold text-3xl md:text-4xl">{category.name.charAt(0)}</span>
        </div>
      </div>
      
      <CardHeader className="flex-1 p-6 space-y-3">
        <CardTitle className="text-xl md:text-2xl font-semibold text-white leading-tight tracking-tight">
          {category.name}
        </CardTitle>
        <CardDescription className="text-base text-neutral-300 leading-relaxed">
          {category.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between p-6 pt-0 space-y-4">
        <div className="mb-2">
          <p className="text-sm text-neutral-300">
            <strong className="text-white">{category.productCount} Produkte</strong> verfügbar
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
          
          <Button variant="outline" asChild className="w-full font-semibold border-2 border-[#2F6BA8] text-[#E6EDF3] hover:bg-[#2F6BA8]/20">
            <Link href={`/produkte/${category.slug}`}>
              Details anzeigen
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

