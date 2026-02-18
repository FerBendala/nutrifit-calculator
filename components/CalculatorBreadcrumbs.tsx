'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CALCULATORS } from '@/lib/calculators';

const CATEGORY_LABELS: Record<string, string> = {
  'nutrition': 'Nutrición',
  'body-composition': 'Composición Corporal',
  'fitness': 'Fitness',
  'health': 'Salud',
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
        { label: categoryLabel },
        { label: calculator.title },
      ]}
    />
  );
}
