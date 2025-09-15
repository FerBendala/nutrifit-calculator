'use client';

import { getRelatedCalculators } from '@/lib/calculators';
import Link from 'next/link';

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
  // Obtener calculadoras relacionadas automáticamente (máximo 4)
  const relatedCalculators = getRelatedCalculators(currentPage || '', maxResults);

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        🧮 Calculadoras relacionadas
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {relatedCalculators.map((calculator) => {
          const Icon = calculator.icon;
          return (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">
                    {calculator.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {calculator.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-gray-600 mt-4 text-center">
        💡 Usa nuestras calculadoras en conjunto para un plan nutricional completo
      </p>
    </div>
  );
}
