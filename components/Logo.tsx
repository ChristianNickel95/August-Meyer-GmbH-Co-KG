'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps): JSX.Element {
  // CSS-Filter für dickere Linien und Farbanpassung
  // contrast() erhöht die Linienstärke visuell
  // Für light: neutral-700/800 (dunkel auf hellem Hintergrund) - RGB(51, 65, 85)
  // Für dark: weiß (auf dunklem Hintergrund)
  
  // Light: Konvertiert zu neutral-700 (51, 65, 85) mit erhöhtem Kontrast für dickere Linien
  const lightFilter = 'brightness(0) saturate(100%) invert(20%) sepia(8%) saturate(1200%) hue-rotate(180deg) brightness(0.85) contrast(1.4)';
  
  // Dark: Weiß mit leicht erhöhtem Kontrast
  const darkFilter = 'brightness(0) invert(1) contrast(1.1)';
  
  return (
    <div className={`relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 ${className}`}>
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

