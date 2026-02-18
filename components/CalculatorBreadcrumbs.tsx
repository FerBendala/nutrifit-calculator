'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CALCULATORS } from '@/lib/calculators';

const CATEGORY_LABELS: Record<string, string> = {
  'nutrition': 'Nutrición',
  'body-composition': 'Composición Corporal',
  'fitness': 'Fitness',
  'health': 'Salud',
};

const CATEGORY_URLS: Record<string, string> = {
  'nutrition': '/calculadoras/nutricion/',
  'body-composition': '/calculadoras/composicion-corporal/',
  'fitness': '/calculadoras/fitness/',
  'health': '/calculadoras/salud/',
};

interface CalculatorBreadcrumbsProps {
  calculatorKey: string;
  className?: string;
}

export function CalculatorBreadcrumbs({ calculatorKey, className }: CalculatorBreadcrumbsProps) {
  const calculator = CALCULATORS.find(c => c.key === calculatorKey);
  if (!calculator || calculatorKey === 'home') return null;

  const categoryLabel = CATEGORY_LABELS[calculator.category] || calculator.category;

  return (
    <Breadcrumbs
      className={className}
      items={[
        { label: categoryLabel, href: CATEGORY_URLS[calculator.category] },
        { label: calculator.title },
      ]}
    />
  );
}
