'use client';

import { Logo } from '@/components/Logo';

export function LogoPanel(): JSX.Element {
  return (
    <div className="relative z-50 flex justify-center -mt-8 mb-6 md:mb-8" style={{ marginTop: '-16px' }}>
      <div className="bg-[#0D1C2E] border border-[#1F3A52] rounded-xl shadow-xl px-4 md:px-6 py-3 md:py-4 w-72 md:w-80 lg:w-88 h-20 md:h-24 lg:h-28 flex items-center justify-center">
        <Logo variant="dark" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
      </div>
    </div>
  );
}

