import { Activity, Calculator, Droplet, Dumbbell, Flame, Heart, Ruler, Scale, Target, Trophy, Zap } from 'lucide-react';

export interface CalculatorConfig {
  key: string;
  title: string;
  href: string;
  description: string;
  icon: any;
  priority: 'high' | 'medium' | 'low';
  category: 'nutrition' | 'body-composition' | 'fitness' | 'health';
  relatedCalculators: string[];
}

// Configuración centralizada de todas las calculadoras
export const CALCULATORS: CalculatorConfig[] = [
  {
    key: 'home',
    title: 'Calorías y Macros',
    href: '/',
    description: 'Calculadora principal con distribución de macronutrientes personalizada',
    icon: Calculator,
    priority: 'high',
    category: 'nutrition',
    relatedCalculators: ['bmr', 'tdee', 'imc', 'proteina']
  },
  {
    key: 'imc',
    title: 'Calculadora IMC',
    href: '/imc',
    description: 'Índice de masa corporal y categorías de peso saludable',
    icon: Scale,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['home', 'peso-ideal', 'grasa-corporal', 'composicion']
  },
  {
    key: 'tdee',
    title: 'Calculadora TDEE',
    href: '/tdee',
    description: 'Gasto energético total diario según tu actividad física',
    icon: Activity,
    priority: 'high',
    category: 'nutrition',
    relatedCalculators: ['bmr', 'home', 'proteina', 'ritmo-cardiaco', 'vo2max']
  },
  {
    key: 'proteina',
    title: 'Proteína Diaria',
    href: '/proteina',
    description: 'Necesidades específicas de proteína según tu objetivo',
    icon: Zap,
    priority: 'medium',
    category: 'nutrition',
    relatedCalculators: ['home', 'tdee', 'masa-muscular', 'agua']
  },
  {
    key: 'agua',
    title: 'Hidratación Diaria',
    href: '/agua',
    description: 'Cantidad de agua recomendada según tu peso y actividad',
    icon: Droplet,
    priority: 'medium',
    category: 'health',
    relatedCalculators: ['home', 'proteina', 'tdee', 'composicion']
  },
  {
    key: 'composicion',
    title: 'Composición Corporal',
    href: '/composicion',
    description: 'Porcentaje de grasa corporal y masa magra según medidas',
    icon: Target,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['imc', 'grasa-corporal', 'masa-muscular', 'peso-ideal']
  },
  {
    key: 'ritmo-cardiaco',
    title: 'Ritmo Cardíaco',
    href: '/ritmo-cardiaco',
    description: 'Zonas de entrenamiento cardiovascular y quema de grasa',
    icon: Heart,
    priority: 'high',
    category: 'fitness',
    relatedCalculators: ['1rm', 'masa-muscular', 'tdee', 'grasa-corporal', 'vo2max']
  },
  {
    key: 'grasa-corporal',
    title: 'Grasa Corporal',
    href: '/grasa-corporal',
    description: 'Porcentaje de grasa corporal por pliegues cutáneos',
    icon: Ruler,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['composicion', 'imc', 'peso-ideal', 'whtr']
  },
  {
    key: 'peso-ideal',
    title: 'Peso Ideal',
    href: '/peso-ideal',
    description: 'Peso ideal con 5 fórmulas científicas reconocidas',
    icon: Scale,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['imc', 'grasa-corporal', 'masa-muscular', 'whtr']
  },
  {
    key: 'masa-muscular',
    title: 'Masa Muscular',
    href: '/masa-muscular',
    description: 'Masa muscular e índice de masa muscular',
    icon: Dumbbell,
    priority: 'high',
    category: 'fitness',
    relatedCalculators: ['1rm', 'proteina', 'composicion', 'peso-ideal', 'vo2max']
  },
  {
    key: 'bmr',
    title: 'BMR (Metabolismo Basal)',
    href: '/bmr',
    description: 'Metabolismo basal con 3 fórmulas científicas validadas',
    icon: Flame,
    priority: 'high',
    category: 'nutrition',
    relatedCalculators: ['tdee', 'home', 'composicion', 'masa-muscular']
  },
  {
    key: '1rm',
    title: '1RM (Una Repetición Máxima)',
    href: '/1rm',
    description: 'Calculadora de fuerza máxima con 5 fórmulas científicas',
    icon: Trophy,
    priority: 'high',
    category: 'fitness',
    relatedCalculators: ['masa-muscular', 'proteina', 'composicion', 'ritmo-cardiaco', 'vo2max']
  },
  {
    key: 'whtr',
    title: 'WHtR (Ratio Cintura-Altura)',
    href: '/whtr',
    description: 'Evaluación de riesgo cardiometabólico por distribución de grasa abdominal',
    icon: Target,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['imc', 'grasa-corporal', 'composicion', 'peso-ideal']
  },
  {
    key: 'vo2max',
    title: 'VO2 Max (Capacidad Cardiovascular)',
    href: '/vo2max',
    description: 'Evaluación de la capacidad cardiovascular con 4 métodos científicos',
    icon: Activity,
    priority: 'high',
    category: 'fitness',
    relatedCalculators: ['ritmo-cardiaco', '1rm', 'masa-muscular', 'tdee']
  },
  {
    key: 'sarcopenia',
    title: 'Índice de Sarcopenia',
    href: '/sarcopenia',
    description: 'Evaluación médica de pérdida muscular relacionada con la edad',
    icon: Dumbbell,
    priority: 'high',
    category: 'health',
    relatedCalculators: ['masa-muscular', 'proteina', 'composicion', 'vo2max']
  },
  {
    key: 'whr',
    title: 'Ratio Cintura-Cadera (WHR)',
    href: '/whr',
    description: 'Evaluación médica de distribución de grasa y riesgo cardiovascular',
    icon: Ruler,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['whtr', 'imc', 'grasa-corporal', 'composicion']
  },
  {
    key: 'ffmi',
    title: 'FFMI (Índice Masa Libre de Grasa)',
    href: '/ffmi',
    description: 'Evaluación del desarrollo muscular independiente de la grasa corporal',
    icon: Dumbbell,
    priority: 'high',
    category: 'fitness',
    relatedCalculators: ['masa-muscular', 'proteina', 'composicion', '1rm']
  },
  {
    key: 'fmi',
    title: 'FMI (Índice Masa Grasa)',
    href: '/fmi',
    description: 'Evaluación médica de la grasa corporal independiente de la altura',
    icon: Scale,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['grasa-corporal', 'composicion', 'ffmi', 'imc']
  },
  {
    key: 'bai',
    title: 'BAI (Índice Adiposidad Corporal)',
    href: '/bai',
    description: 'Estimación de grasa corporal sin báscula usando solo cadera y altura',
    icon: Target,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['fmi', 'grasa-corporal', 'whr', 'imc']
  },
  {
    key: 'rmr',
    title: 'RMR (Tasa Metabólica en Reposo)',
    href: '/rmr',
    description: 'Gasto energético en reposo con 3 fórmulas científicas validadas',
    icon: Flame,
    priority: 'high',
    category: 'nutrition',
    relatedCalculators: ['bmr', 'tdee', 'home', 'composicion']
  },
  {
    key: 'peso-ajustado',
    title: 'Peso Ajustado Clínico (ABW)',
    href: '/peso-ajustado',
    description: 'Peso ajustado para cálculos clínicos, medicamentos y nutrición',
    icon: Scale,
    priority: 'high',
    category: 'body-composition',
    relatedCalculators: ['peso-ideal', 'imc', 'proteina', 'bmr']
  }
];

// Función para obtener calculadoras relacionadas automáticamente
export function getRelatedCalculators(currentPage: string, maxResults: number = 4): CalculatorConfig[] {
  const currentCalculator = CALCULATORS.find(calc => calc.href === currentPage);

  if (!currentCalculator) {
    // Si no se encuentra la calculadora actual, devolver las de mayor prioridad
    return CALCULATORS
      .filter(calc => calc.href !== currentPage)
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority] - priorityOrder[a.priority]);
      })
      .slice(0, maxResults);
  }

  // Obtener calculadoras relacionadas por configuración explícita
  const relatedByConfig = CALCULATORS.filter(calc =>
    currentCalculator.relatedCalculators.includes(calc.key) &&
    calc.href !== currentPage
  );

  // Si no hay suficientes calculadoras relacionadas, completar con calculadoras de la misma categoría
  if (relatedByConfig.length < maxResults) {
    const sameCategory = CALCULATORS.filter(calc =>
      calc.category === currentCalculator.category &&
      calc.href !== currentPage &&
      !relatedByConfig.some(related => related.key === calc.key)
    );

    relatedByConfig.push(...sameCategory);
  }

  // Si aún no hay suficientes, completar con calculadoras de alta prioridad
  if (relatedByConfig.length < maxResults) {
    const highPriority = CALCULATORS.filter(calc =>
      calc.priority === 'high' &&
      calc.href !== currentPage &&
      !relatedByConfig.some(related => related.key === calc.key)
    );

    relatedByConfig.push(...highPriority);
  }

  // Ordenar por prioridad y devolver solo el máximo solicitado
  return relatedByConfig
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority] - priorityOrder[a.priority]);
    })
    .slice(0, maxResults);
}

// Función para obtener calculadoras por categoría
export function getCalculatorsByCategory(category: CalculatorConfig['category']): CalculatorConfig[] {
  return CALCULATORS.filter(calc => calc.category === category);
}

// Función para obtener calculadoras por prioridad
export function getCalculatorsByPriority(priority: CalculatorConfig['priority']): CalculatorConfig[] {
  return CALCULATORS.filter(calc => calc.priority === priority);
}

// Función para obtener todas las calculadoras ordenadas por prioridad
export function getAllCalculatorsSorted(): CalculatorConfig[] {
  return [...CALCULATORS].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return (priorityOrder[b.priority] - priorityOrder[a.priority]);
  });
}

// Función para generar navegación automáticamente (para ContextualLinks)
export function generateNavigation(currentCalculator: string) {
  const currentIndex = CALCULATORS.findIndex(calc => calc.key === currentCalculator);

  if (currentIndex === -1) return null;

  const prevIndex = currentIndex === 0 ? CALCULATORS.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === CALCULATORS.length - 1 ? 0 : currentIndex + 1;

  return {
    prev: CALCULATORS[prevIndex],
    next: CALCULATORS[nextIndex]
  };
}
