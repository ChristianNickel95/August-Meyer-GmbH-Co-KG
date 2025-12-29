'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Setze initiales Theme sofort
    const root = document.documentElement;
    root.classList.add('dark');
    
    setMounted(true);
    // Lade Theme aus localStorage oder verwende System-Präferenz
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Standard: Dark Mode
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) {
      // Setze initiales Theme auf html-Element, bevor mounted ist
      const root = document.documentElement;
      root.classList.add('dark'); // Default
      return;
    }
    
    const root = document.documentElement;
    // Entferne beide Klassen zuerst
    root.classList.remove('dark', 'light');
    // Füge die aktuelle Theme-Klasse hinzu
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Immer den Provider rendern, auch wenn noch nicht mounted
  // Das verhindert den "useTheme must be used within a ThemeProvider" Fehler
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback für den Fall, dass der Provider noch nicht initialisiert ist
    return {
      theme: 'dark' as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}

