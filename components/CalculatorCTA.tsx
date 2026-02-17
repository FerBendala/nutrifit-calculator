import { Calculator } from 'lucide-react';
import Link from 'next/link';

interface CalculatorCTAProps {
  categories?: string[];
  tags?: string[];
}

interface CTAData {
  href: string;
  title: string;
  description: string;
}

const CATEGORY_TO_CTA: Record<string, CTAData> = {
  'Nutrición': { href: '/', title: 'Calculadora de Calorias y Macros', description: 'Calcula tus necesidades calorias y macronutrientes personalizados' },
  'Macronutrientes': { href: '/', title: 'Calculadora de Calorias y Macros', description: 'Calcula tus necesidades calorias y macronutrientes personalizados' },
  'Proteínas': { href: '/proteina/', title: 'Calculadora de Proteina', description: 'Descubre cuantos gramos de proteina necesitas segun tu objetivo' },
  'Composición corporal': { href: '/grasa-corporal/', title: 'Calculadora de Grasa Corporal', description: 'Mide tu porcentaje de grasa corporal con metodos cientificos' },
  'Salud metabólica': { href: '/imc/', title: 'Calculadora de IMC', description: 'Evalua tu indice de masa corporal segun estandares de la OMS' },
  'Evaluación física': { href: '/composicion/', title: 'Calculadora de Composicion Corporal', description: 'Analiza tu composicion corporal completa con el metodo Navy' },
  'Fuerza': { href: '/1rm/', title: 'Calculadora 1RM', description: 'Calcula tu repeticion maxima con 5 formulas cientificas' },
  'Entrenamiento': { href: '/tdee/', title: 'Calculadora TDEE', description: 'Descubre tu gasto calorico total diario segun tu actividad' },
  'Cardio': { href: '/ritmo-cardiaco/', title: 'Calculadora de Ritmo Cardiaco', description: 'Calcula tus zonas de entrenamiento cardiovascular' },
  'Hidratación': { href: '/agua/', title: 'Calculadora de Agua Diaria', description: 'Conoce cuantos litros de agua necesitas al dia' },
  'Rendimiento': { href: '/vo2max/', title: 'Calculadora VO2 Max', description: 'Mide tu capacidad cardiovascular con tests cientificos' },
  'Salud ósea': { href: '/densidad-osea/', title: 'Calculadora de Densidad Osea', description: 'Evalua tu densidad mineral osea y riesgo de osteoporosis' },
  'Rehabilitación': { href: '/sarcopenia/', title: 'Calculadora de Sarcopenia', description: 'Evalua la perdida muscular relacionada con la edad' },
  'Suplementación': { href: '/proteina/', title: 'Calculadora de Proteina', description: 'Descubre cuantos gramos de proteina necesitas segun tu objetivo' },
  'Salud cardiovascular': { href: '/presion-arterial-media/', title: 'Calculadora de Presion Arterial Media', description: 'Evaluacion cardiovascular con interpretacion clinica' },
  'Recuperación': { href: '/recuperacion-cardiaca/', title: 'Calculadora de Recuperacion Cardiaca', description: 'Evalua tu condicion cardiovascular post-ejercicio' },
  'Sueño': { href: '/tdee/', title: 'Calculadora TDEE', description: 'Descubre tu gasto calorico total diario segun tu actividad' },
};

function getBestCTA(categories: string[], tags: string[]): CTAData {
  for (const cat of categories) {
    if (CATEGORY_TO_CTA[cat]) return CATEGORY_TO_CTA[cat];
  }
  for (const tag of tags) {
    if (CATEGORY_TO_CTA[tag]) return CATEGORY_TO_CTA[tag];
  }
  return { href: '/', title: 'Calculadora de Calorias y Macros', description: 'Calcula tus necesidades calorias y macronutrientes personalizados' };
}

export function CalculatorCTA({ categories = [], tags = [] }: CalculatorCTAProps) {
  const cta = getBestCTA(categories, tags);

  return (
    <div className="my-8 p-6 rounded-xl border-2 border-info/30 bg-info-subtle">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-info" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Pon en practica lo aprendido</h3>
          <p className="text-sm text-muted-foreground mb-3">{cta.description}</p>
          <Link
            href={cta.href}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-info text-white font-medium text-sm hover:bg-info/90 transition-colors"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Usar {cta.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
