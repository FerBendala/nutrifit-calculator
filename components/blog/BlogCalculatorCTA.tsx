import { CALCULATORS } from '@/lib/calculators';
import Link from 'next/link';

const CATEGORY_EMOJI: Record<string, string> = {
  nutrition: '🍎',
  'body-composition': '📊',
  fitness: '💪',
  health: '❤️',
};

const TAG_TO_CALCULATORS: Record<string, string[]> = {
  'proteína': ['proteina', 'masa-muscular', 'tdee'],
  'proteína diaria': ['proteina', 'tdee', 'bmr'],
  'masa muscular': ['masa-muscular', 'ffmi', 'proteina'],
  'sarcopenia': ['sarcopenia', 'masa-muscular', 'proteina'],
  'imc': ['imc', 'peso-ideal', 'grasa-corporal'],
  'grasa corporal': ['grasa-corporal', 'composicion', 'fmi'],
  'calorías': ['home', 'tdee', 'bmr'],
  'macros': ['home', 'tdee', 'proteina'],
  'déficit calórico': ['tdee', 'bmr', 'home'],
  'peso ideal': ['peso-ideal', 'imc', 'composicion'],
  'hidratación': ['agua', 'tdee'],
  'frecuencia cardíaca': ['ritmo-cardiaco', 'vo2max', 'recuperacion-cardiaca'],
  'fuerza': ['1rm', 'masa-muscular', 'ffmi'],
  'composición corporal': ['composicion', 'grasa-corporal', 'masa-muscular'],
  'metabolismo': ['bmr', 'rmr', 'edad-metabolica', 'tdee'],
  'fibra': ['fibra', 'home'],
  'azúcar': ['azucar', 'home'],
  'sodio': ['sodio', 'presion-arterial-media'],
  'alcohol': ['alcohol', 'home'],
  'grasa visceral': ['grasa-visceral', 'composicion', 'whr'],
  'cintura': ['whr', 'whtr', 'composicion'],
  'densidad ósea': ['densidad-osea', 'composicion'],
  'presión arterial': ['presion-arterial-media', 'ritmo-cardiaco'],
  'vo2 max': ['vo2max', 'ritmo-cardiaco', '1rm'],
  'entrenamiento': ['1rm', 'vo2max', 'ritmo-cardiaco', 'tdee'],
  'nutrición': ['home', 'tdee', 'proteina', 'bmr'],
  'rendimiento': ['vo2max', '1rm', 'ritmo-cardiaco'],
  'perder peso': ['tdee', 'home', 'bmr', 'imc'],
  'ganar músculo': ['proteina', 'masa-muscular', 'tdee', '1rm'],
};

function getCalculatorsForPost(tags: string[], categories: string[]): typeof CALCULATORS {
  const scored = new Map<string, number>();
  const allTerms = [...tags, ...categories].map(t => t.toLowerCase());

  for (const term of allTerms) {
    for (const [keyword, calcKeys] of Object.entries(TAG_TO_CALCULATORS)) {
      if (term.includes(keyword) || keyword.includes(term)) {
        calcKeys.forEach((key, i) => {
          scored.set(key, (scored.get(key) || 0) + (calcKeys.length - i));
        });
      }
    }
  }

  if (scored.size === 0) {
    return CALCULATORS.filter(c =>
      ['home', 'imc', 'tdee', 'proteina'].includes(c.key)
    ).slice(0, 3);
  }

  const sorted = [...scored.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);

  return sorted
    .map(key => CALCULATORS.find(c => c.key === key))
    .filter(Boolean) as typeof CALCULATORS;
}

interface BlogCalculatorCTAProps {
  tags: string[];
  categories: string[];
}

export function BlogCalculatorCTA({ tags, categories }: BlogCalculatorCTAProps) {
  const calculators = getCalculatorsForPost(tags, categories);

  if (calculators.length === 0) return null;

  return (
    <section className="bg-muted/50 border border-border rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        🧮 Calculadoras relacionadas con este artículo
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.key}
            href={calc.href}
            className="flex items-center gap-2 p-3 bg-background rounded-md border border-border hover:border-primary/50 transition-colors group"
          >
            <span className="text-xl">{CATEGORY_EMOJI[calc.category] || '🧮'}</span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {calc.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
