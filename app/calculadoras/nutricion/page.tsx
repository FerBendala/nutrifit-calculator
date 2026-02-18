import { Container } from '@/components/Container';
import { getCalculatorsByCategory } from '@/lib/calculators';
import Link from 'next/link';

export default function NutricionCategoryPage() {
  const calculators = getCalculatorsByCategory('nutrition');

  return (
    <Container size="xl" className="py-[4.236rem]">
      <main className="max-w-5xl mx-auto space-golden-lg">
        <header className="text-center space-golden-md">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
            Calculadoras de Nutrición
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
            Calcula tus necesidades nutricionales con fórmulas científicas validadas.
            Calorías, macronutrientes, proteína, hidratación y más.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.key}
                href={calc.href}
                className="group flex items-start gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {calc.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="space-golden-lg">
          <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
            ¿Por qué calcular tus necesidades nutricionales?
          </h2>
          <div className="grid gap-[1.618rem] md:grid-cols-2">
            <article className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Datos precisos para tus objetivos
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Ya sea perder grasa, ganar músculo o mantener tu peso, nuestras calculadoras te proporcionan
                datos personalizados basados en fórmulas científicas como Mifflin-St Jeor, Harris-Benedict
                y Katch-McArdle.
              </p>
            </article>
            <article className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Fórmulas validadas científicamente
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Cada calculadora cubre un aspecto específico: desde el gasto energético total diario
                (TDEE) hasta la distribución óptima de proteína, fibra dietética y límites de azúcar
                según la OMS. Resultados personalizados según tu perfil.
              </p>
            </article>
          </div>
        </section>
      </main>
    </Container>
  );
}
