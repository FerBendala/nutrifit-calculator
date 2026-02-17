'use client';

import { CALCULATORS } from '@/lib/calculators';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'nutrifit-recently-viewed';
const MAX_RECENT = 5;

interface RecentItem {
  key: string;
  timestamp: number;
}

export function trackCalculatorView(calculatorKey: string) {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const recent: RecentItem[] = stored ? JSON.parse(stored) : [];

    const filtered = recent.filter((item) => item.key !== calculatorKey);
    filtered.unshift({ key: calculatorKey, timestamp: Date.now() });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(filtered.slice(0, MAX_RECENT))
    );
  } catch {
    // localStorage no disponible
  }
}

export function RecentlyViewed({ currentPage }: { currentPage?: string }) {
  const [recentCalcs, setRecentCalcs] = useState<
    Array<{ key: string; title: string; href: string; timestamp: number }>
  >([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const recent: RecentItem[] = JSON.parse(stored);
      const mapped = recent
        .filter((item) => item.key !== currentPage)
        .map((item) => {
          const calc = CALCULATORS.find((c) => c.key === item.key);
          if (!calc) return null;
          return {
            key: calc.key,
            title: calc.title,
            href: calc.href,
            timestamp: item.timestamp,
          };
        })
        .filter(Boolean) as Array<{
        key: string;
        title: string;
        href: string;
        timestamp: number;
      }>;

      setRecentCalcs(mapped);
    } catch {
      // localStorage no disponible
    }
  }, [currentPage]);

  if (recentCalcs.length === 0) return null;

  return (
    <section className="card-golden bg-muted/30">
      <h3 className="font-semibold text-base mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
        Visitadas recientemente
      </h3>
      <div className="flex flex-wrap gap-2">
        {recentCalcs.map((calc) => (
          <Link
            key={calc.key}
            href={calc.href}
            className="text-sm px-3 py-1.5 rounded-full bg-background border hover:bg-info-subtle hover:border-info transition-colors"
          >
            {calc.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
