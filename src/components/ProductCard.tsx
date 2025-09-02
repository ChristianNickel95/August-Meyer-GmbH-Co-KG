'use client';

import { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images?.[0] || '/images/placeholder-product.jpg';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={firstImage}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {product.shortIntro}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {product.features?.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {product.variants?.length || 0} Variante{(product.variants?.length || 0) !== 1 ? 'n' : ''}
            </span>
            <Button asChild size="sm">
              <Link href={`/produkte/${product.category}/${product.slug}`}>
                Details ansehen
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
