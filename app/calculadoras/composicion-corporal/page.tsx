import { Container } from '@/components/Container';
import { getCalculatorsByCategory } from '@/lib/calculators';
import Link from 'next/link';

export default function ComposicionCorporalCategoryPage() {
  const calculators = getCalculatorsByCategory('body-composition');

  return (
    <Container size="xl" className="py-[4.236rem]">
      <main className="max-w-5xl mx-auto space-golden-lg">
        <header className="text-center space-golden-md">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
            Calculadoras de Composición Corporal
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
            Analiza tu composición corporal con métodos científicos.
            IMC, grasa corporal, peso ideal, masa magra y más indicadores clave.
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
            ¿Qué es la composición corporal?
          </h2>
          <div className="grid gap-[1.618rem] md:grid-cols-2">
            <article className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">⚖️</span>
                Más allá del peso
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                La composición corporal describe cómo se distribuye tu peso entre grasa, músculo,
                huesos, agua y órganos. Dos personas con el mismo peso pueden tener composiciones
                muy diferentes, y es esta distribución la que realmente determina tu salud y apariencia física.
              </p>
            </article>
            <article className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Métodos científicos validados
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Utilizamos el método Navy, fórmulas de Boer, James, Hume, Bergman y estándares
                de la OMS. Desde el clásico IMC hasta indicadores avanzados como FFMI, FMI, BAI
                y ratios cintura-altura y cintura-cadera.
              </p>
            </article>
          </div>
        </section>
      </main>
    </Container>
  );
}
