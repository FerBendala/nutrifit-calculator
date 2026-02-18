import { Container } from '@/components/Container';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada | NutriFit Calculator',
  description: 'La página que buscas no existe. Explora nuestras calculadoras de nutrición y fitness.',
  robots: 'noindex, nofollow',
};

const popularCalculators = [
  { href: '/', title: 'Calorías y Macros', desc: 'Calcula tus necesidades calóricas', emoji: '🔥' },
  { href: '/imc/', title: 'Calculadora IMC', desc: 'Índice de masa corporal', emoji: '📊' },
  { href: '/tdee/', title: 'Calculadora TDEE', desc: 'Gasto energético diario', emoji: '⚡' },
  { href: '/proteina/', title: 'Proteína Diaria', desc: 'Gramos de proteína necesarios', emoji: '🥩' },
  { href: '/grasa-corporal/', title: 'Grasa Corporal', desc: 'Tu porcentaje de grasa exacto', emoji: '📏' },
  { href: '/peso-ideal/', title: 'Peso Ideal', desc: 'Tu rango saludable según 5 fórmulas', emoji: '⚖️' },
];

const categories = [
  { href: '/calculadoras/nutricion/', title: 'Nutrición', emoji: '🍎' },
  { href: '/calculadoras/composicion-corporal/', title: 'Composición Corporal', emoji: '📐' },
  { href: '/calculadoras/fitness/', title: 'Fitness', emoji: '💪' },
  { href: '/calculadoras/salud/', title: 'Salud', emoji: '❤️' },
];

export default function NotFound() {
  return (
    <Container size="xl" className="py-[4.236rem]">
      <div className="max-w-3xl mx-auto text-center space-golden-lg">
        <div className="space-golden-md">
          <p className="text-[8rem] font-bold leading-none text-primary/15 select-none">404</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Página no encontrada
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida. Prueba con alguna de nuestras herramientas.
          </p>
        </div>

        <div className="space-golden-md">
          <h2 className="text-xl font-semibold">Calculadoras populares</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="card-golden flex items-start gap-3 text-left hover:shadow-golden-lg hover:border-primary/30 transition-all"
              >
                <span className="text-2xl mt-0.5">{calc.emoji}</span>
                <div>
                  <p className="font-semibold text-foreground">{calc.title}</p>
                  <p className="text-sm text-muted-foreground">{calc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-golden-sm">
          <h2 className="text-lg font-semibold">Explorar por categoría</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 hover:bg-primary/10 hover:border-primary/40 transition-colors text-sm font-medium"
              >
                <span>{cat.emoji}</span>
                {cat.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg shadow-golden"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </Container>
  );
}
