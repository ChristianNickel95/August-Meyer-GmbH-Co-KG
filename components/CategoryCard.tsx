'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/lib/products';

interface CategoryCardProps {
  category: Category & { defaultValue?: string | null; unit?: string | null };
}

export function CategoryCard({ category }: CategoryCardProps): JSX.Element {
  const router = useRouter();

  const handleClick = (): void => {
    // Navigiere direkt zur Kategorie-Seite
    router.push(`/produkte/${category.slug}`);
  };

  return (
    <div onClick={handleClick} className="block h-full cursor-pointer">
      <Card className="h-full flex flex-col bg-[#13294b] border border-white/8 hover:border-[#00ffb3] transition-all duration-150 group">
        {/* Bild-Bereich (oben) */}
        <div className="aspect-[3/2] bg-gradient-to-br from-[#13294b] via-[#0e1f3d] to-[#13294b] flex items-center justify-center overflow-hidden">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00ffb3]/10 border border-[#00ffb3]/20 flex items-center justify-center">
            <span className="text-[#00ffb3] font-semibold text-2xl md:text-3xl">{category.name.charAt(0)}</span>
          </div>
        </div>
        
        {/* Content-Bereich */}
        <div className="flex-1 flex flex-col p-5 md:p-6">
          {/* Titel (weiß, dominant) */}
          <CardTitle className="text-lg md:text-xl font-semibold text-white leading-tight tracking-tight mb-2">
            {category.name}
          </CardTitle>
          
          {/* Kurzbeschreibung (sekundär) */}
          <CardDescription className="text-sm md:text-base text-[#c7d2e0] leading-relaxed line-clamp-3 flex-1 mb-4">
            {category.description}
          </CardDescription>
          
          {/* CTA / Pfeil (unten rechts) */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/8">
            <p className="text-xs text-[#c7d2e0]">
              <span className="text-white font-medium">{category.productCount} Produkte</span> verfügbar
            </p>
            <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#00ffb3] group-hover:translate-x-1 transition-all duration-150" />
          </div>
        </div>
      </Card>
    </div>
  );
}

