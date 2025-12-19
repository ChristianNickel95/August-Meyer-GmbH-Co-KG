'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HeroSearch(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produkte?suche=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/produkte');
    }
  };

  return (
    <div className="bg-[#13294b] border border-white/8 p-6 md:p-8 rounded-sm">
      <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
        Produkte suchen
      </h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask or search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 md:h-14 pl-4 pr-12 text-base bg-[#0b1a33] border-white/8 text-white placeholder:text-[#c7d2e0] focus:border-[#00ffb3] focus:ring-2 focus:ring-[#00ffb3]"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#c7d2e0]" />
        </div>
        <Button 
          type="submit" 
          variant="sustainability" 
          className="w-full h-12 md:h-14 text-base font-semibold"
        >
          Produkte entdecken
        </Button>
      </form>
    </div>
  );
}

