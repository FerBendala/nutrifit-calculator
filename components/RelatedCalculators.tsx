'use client';

import { getRelatedCalculators } from '@/lib/calculators';
import { trackCalculatorView } from '@/components/RecentlyViewed';
import Link from 'next/link';
import { useEffect } from 'react';

interface RelatedCalculatorsProps {
  currentPage?: string;
  className?: string;
  maxResults?: number;
}

export function RelatedCalculators({
  currentPage,
  className = '',
  maxResults = 4
}: RelatedCalculatorsProps) {
  useEffect(() => {
    if (currentPage) {
      trackCalculatorView(currentPage);
    }
  }, [currentPage]);

  const relatedCalculators = getRelatedCalculators(currentPage || '', maxResults);

  return (
    <div className={`bg-gradient-to-r bg-muted dark:from-blue-950/30 dark:to-green-950/30 p-6 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        🧮 Calculadoras relacionadas
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {relatedCalculators.map((calculator) => {
          const Icon = calculator.icon;
          return (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="group p-4 bg-card rounded-lg border border-border hover:border-info hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 text-info group-hover:scale-110 mt-0.5 flex-shrink-0 transition-transform" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm group-hover:text-info transition-colors">
                    {calculator.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {calculator.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        💡 Usa nuestras calculadoras en conjunto para un plan nutricional completo
      </p>
    </div>
  );
}
