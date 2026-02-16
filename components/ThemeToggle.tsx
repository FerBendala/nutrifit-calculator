'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
        <Sun className="h-4 w-4" />
        <span className="sr-only">Cambiar tema</span>
      </Button>
    );
  }

  // Usar el tema resuelto (efectivo) para la UI
  const effectiveTheme = resolvedTheme ?? 'light';

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={() => setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')}
      aria-label={effectiveTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {effectiveTheme === 'dark' ? (
        <Sun className="h-4 w-4 transition-transform" />
      ) : (
        <Moon className="h-4 w-4 transition-transform" />
      )}
      <span className="sr-only">
        {effectiveTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      </span>
    </Button>
  );
}
