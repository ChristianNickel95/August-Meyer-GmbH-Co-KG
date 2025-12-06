'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps): JSX.Element {
  // CSS-Filter für dickere Linien und Farbanpassung zu Himmelblau
  // contrast() erhöht die Linienstärke visuell
  // Für light: Himmelblau (sky-500/600) - RGB etwa (14, 165, 233) oder (2, 132, 199)
  // Für dark: Helles Himmelblau (auf dunklem Hintergrund)
  
  // Light: Konvertiert zu Himmelblau mit deutlich erhöhtem Kontrast für dickere, sichtbarere Linien
  // contrast(1.8) macht die Linien deutlich dicker und das Gründungsjahr besser lesbar
  const lightFilter = 'brightness(0) saturate(100%) invert(55%) sepia(95%) saturate(2000%) hue-rotate(180deg) brightness(0.9) contrast(1.8)';
  
  // Dark: Helles Himmelblau für dunklen Hintergrund mit erhöhtem Kontrast
  const darkFilter = 'brightness(0) saturate(100%) invert(70%) sepia(95%) saturate(2000%) hue-rotate(180deg) brightness(1.1) contrast(1.5)';
  
  return (
    <div className={`relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 ${className}`}>
      <Image
        src="/logo.svg"
        alt="August Meyer Logo"
        fill
        className="object-contain"
        style={{
          filter: variant === 'light' ? lightFilter : darkFilter,
        }}
        priority
      />
    </div>
  );
}

