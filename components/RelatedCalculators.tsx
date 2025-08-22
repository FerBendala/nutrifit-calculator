'use client';

import { Activity, Calculator, Droplet, Scale, Zap } from 'lucide-react';
import Link from 'next/link';

interface RelatedCalculator {
  title: string;
  href: string;
  description: string;
  icon: any;
  priority?: 'high' | 'medium' | 'low';
}

interface RelatedCalculatorsProps {
  currentPage?: string;
  className?: string;
}

const calculators: RelatedCalculator[] = [
  {
    title: 'Calorías y Macros',
    href: '/',
    description: 'Calculadora principal con distribución de macronutrientes personalizada',
    icon: Calculator,
    priority: 'high'
  },
  {
    title: 'Calculadora TDEE',
    href: '/tdee',
    description: 'Gasto energético total diario según tu actividad física',
    icon: Activity,
    priority: 'high'
  },
  {
    title: 'Calculadora IMC',
    href: '/imc',
    description: 'Índice de masa corporal y categorías de peso saludable',
    icon: Scale,
    priority: 'high'
  },
  {
    title: 'Proteína Diaria',
    href: '/proteina',
    description: 'Necesidades específicas de proteína según tu objetivo',
    icon: Zap,
    priority: 'medium'
  },
  {
    title: 'Hidratación Diaria',
    href: '/agua',
    description: 'Cantidad de agua recomendada según tu peso y actividad',
    icon: Droplet,
    priority: 'medium'
  }
];

export function RelatedCalculators({ currentPage, className = '' }: RelatedCalculatorsProps) {
  // Filtrar calculadora actual y ordenar por prioridad
  const filteredCalculators = calculators
    .filter(calc => calc.href !== currentPage)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority || 'low'] - priorityOrder[a.priority || 'low']);
    });

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        🧮 Calculadoras relacionadas
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredCalculators.map((calculator) => {
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
