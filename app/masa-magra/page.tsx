import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { MasaMagraCalculator } from './MasaMagraCalculator';

export default function MasaMagraPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="masa-magra" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Masa Magra (LBM) – Músculos, Huesos y Más
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu masa magra (LBM) total con 4 métodos científicos.
              Descubre cuánto pesas sin contar la grasa: músculo, huesos, órganos y agua. Útil para atletas y seguimiento de composición corporal.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                La <strong>masa magra (LBM - Lean Body Mass)</strong> es el peso total del cuerpo menos la grasa corporal.
                Incluye músculos, huesos, órganos, agua y otros tejidos no grasos. Mantener o aumentar la masa magra es
                crucial para la salud metabólica, función física y prevención de sarcopenia (pérdida muscular relacionada con la edad).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Esta calculadora utiliza el método <strong>Standard</strong> (LBM = Peso - Masa Grasa) y tres variantes científicas:
                <strong> Boer (1984)</strong> ajustada para atletas, <strong>James (1976)</strong> ajustada para población general,
                y <strong>Hume (1966)</strong> fórmula independiente basada en género y altura. Es complementaria a otras
                calculadoras de composición corporal como <a href="/masa-muscular/" className="text-info hover:underline transition-colors">Masa Muscular</a>,
                <a href="/grasa-corporal/" className="text-info hover:underline transition-colors"> Grasa Corporal</a>, <a href="/composicion/" className="text-info hover:underline transition-colors">Composición Corporal</a> y
                <a href="/ffmi/" className="text-info hover:underline transition-colors"> FFMI</a>.
              </p>
            </div>
          </section>

          <MasaMagraCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la masa magra y por qué es importante?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La masa magra (LBM) es el peso total del cuerpo menos la grasa corporal. Incluye todos los tejidos
                no grasos: músculos, huesos, órganos, agua y otros componentes. Mantener o aumentar la masa magra es
                crucial para la salud metabólica, función física y prevención de sarcopenia.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">💪</span>
                  Componentes de la Masa Magra
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Músculos esqueléticos:</strong> Tejido muscular que permite movimiento</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Huesos:</strong> Estructura ósea y densidad mineral</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Órganos internos:</strong> Hígado, riñones, corazón, etc.</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Agua corporal:</strong> Agua intracelular y extracelular</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Tejidos conectivos:</strong> Tendones, ligamentos, fascia</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Otros componentes:</strong> Glucógeno, minerales, etc.</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del LBM
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-destructive">LBM &lt; 70% (Hombres) / &lt; 60% (Mujeres) - Muy Bajo:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo de sarcopenia, pérdida funcional</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">LBM 70-75% (H) / 60-65% (M) - Bajo:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Requiere atención para prevenir pérdida muscular</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-success">LBM 75-85% (H) / 65-75% (M) - Normal:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Rango saludable, mantener hábitos</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-info">LBM 85-90% (H) / 75-80% (M) - Alto:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Excelente composición corporal</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-warning">LBM &gt; 90% (H) / &gt; 80% (M) - Muy Alto:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Nivel atlético, muy entrenado</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                Beneficios de Mantener/Aumentar Masa Magra
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Beneficios Metabólicos:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Mayor tasa metabólica en reposo (quema más calorías)</li>
                    <li>• Mejor control glucémico y sensibilidad a la insulina</li>
                    <li>• Mejor perfil lipídico (colesterol, triglicéridos)</li>
                    <li>• Menor riesgo de síndrome metabólico</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Beneficios Funcionales:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Mayor fuerza y resistencia física</li>
                    <li>• Mejor función física y movilidad</li>
                    <li>• Menor riesgo de caídas y fracturas</li>
                    <li>• Mejor calidad de vida en edad avanzada</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Métodos de Cálculo Utilizados
              </h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Método Standard (Base):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>LBM = Peso Total - Masa Grasa</p>
                    <p>Masa Grasa = Peso × (% Grasa Corporal / 100)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Método directo que resta la masa grasa del peso total. Es la base para los ajustes de Boer y James.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Ajuste Boer (1984) - Para Atletas:</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>LBM = (Peso - Masa Grasa) × 1.02</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ajuste del +2% sobre el método Standard para atletas, que tienden a tener mayor masa magra. Validada en poblaciones atléticas.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Ajuste James (1976) - Población General:</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>LBM = (Peso - Masa Grasa) × 0.98</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ajuste del -2% sobre el método Standard para población general, considerando variaciones en composición corporal.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Fórmula Hume (1966) - Independiente:</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>Hombres: LBM = (0.32810 × Peso) + (0.33929 × Altura) - 29.5336</p>
                    <p>Mujeres: LBM = (0.29569 × Peso) + (0.41813 × Altura) - 43.2933</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Fórmula completamente independiente basada en género y altura, sin requerir porcentaje de grasa corporal. Útil cuando no se conoce la grasa corporal.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre masa magra</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo aumentar mi masa magra?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para aumentar masa magra: (1) Entrenamiento de fuerza 3-4 veces por semana con progresión,
                    (2) Consumo adecuado de proteína (1.6-2.2g por kg de peso), (3) Ligero superávit calórico (200-300 kcal/día),
                    (4) Descanso adecuado (7-9 horas de sueño), (5) Hidratación suficiente. Consulta nuestra
                    <a href="/proteina/" className="text-info hover:underline transition-colors"> calculadora de proteína</a> para tus necesidades.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre masa magra y masa muscular?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <strong>Masa magra (LBM)</strong> incluye músculos, huesos, órganos, agua y otros tejidos no grasos.
                    <strong> Masa muscular</strong> es solo el tejido muscular esquelético. La masa magra es más amplia e incluye
                    la masa muscular como componente principal. Ambas son importantes para la salud y función física.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué es importante la masa magra para la salud?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La masa magra es crucial porque: (1) Aumenta la tasa metabólica en reposo (quema más calorías),
                    (2) Mejora la función física y movilidad, (3) Previene sarcopenia relacionada con la edad,
                    (4) Mejora la salud ósea, (5) Mejora el control glucémico y sensibilidad a la insulina,
                    (6) Reduce el riesgo de caídas y fracturas en edad avanzada.
                  </p>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Calculadoras relacionadas para evaluación completa
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de Masa Muscular:</a></strong> Complementa el LBM con evaluación específica de músculo esquelético</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de Grasa Corporal:</a></strong> Necesaria para calcular LBM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de Composición Corporal:</a></strong> Evaluación completa de grasa y masa magra</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/ffmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de FFMI:</a></strong> Índice de masa libre de grasa independiente de altura</span>
                </li>
              </ul>
            </section>

            <RelatedCalculators currentPage="/masa-magra" />

            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            <SocialShare
              title="Calculadora Masa Magra - LBM | Lean Body Mass | 4 Fórmulas Científicas"
              url="https://nutrifit-calculator.com/masa-magra/"
              description="Calculadora profesional de masa magra con 4 fórmulas científicas. Evalúa composición corporal incluyendo músculos, huesos, órganos y agua."
            />

            <CalculatorNavigation currentCalculator="masa-magra" />
          </article>
        </main>
      </Container>
    </>
  );
}
