import { Container } from '@/components/Container';
import { getCalculatorsByCategory } from '@/lib/calculators';
import Link from 'next/link';

export default function SaludCategoryPage() {
  const calculators = getCalculatorsByCategory('health');

  return (
    <Container size="xl" className="py-[4.236rem]">
      <main className="max-w-5xl mx-auto space-golden-lg">
        <header className="text-center space-golden-md">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
            Calculadoras de Salud y Riesgo Médico
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
            Evalúa indicadores clave de salud con fórmulas médicas validadas.
            Riesgo cardiovascular, función renal, densidad ósea y más.
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
            ¿Por qué monitorizar tu salud con datos?
          </h2>
          <div className="grid gap-[1.618rem] md:grid-cols-2">
            <article className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                Prevención basada en evidencia
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Indicadores como el ABSI, BRI y CI predicen riesgo cardiovascular y metabólico
                de forma más precisa que el IMC aislado. La grasa visceral, la densidad ósea y la
                función renal son marcadores que alertan sobre problemas antes de que aparezcan síntomas.
              </p>
            </article>
            <article className="card-golden space-golden-sm">
              <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                <span className="text-2xl mr-3">🏥</span>
                Estándares médicos internacionales
              </h3>
              <p className="text-sm text-muted-foreground leading-[1.618]">
                Basadas en criterios de la OMS, guías AHA/ACC, estándares EWGSOP2 y fórmulas como
                CKD-EPI, Krakauer y Thomas. Son herramientas informativas pensadas para complementar,
                nunca sustituir, la evaluación de un profesional de la salud.
              </p>
            </article>
          </div>
        </section>
      </main>
    </Container>
  );
}
