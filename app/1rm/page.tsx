import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { OneRMCalculator } from './OneRMCalculator';

export default function OneRMPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="1rm" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora 1RM – Tu Peso Máximo en Press Banca, Sentadilla y Más
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu 1RM (una repetición máxima) con 5 fórmulas científicas validadas.
              Descubre cuánto peso máximo puedes levantar y planifica tu entrenamiento de fuerza de forma precisa.
            </p>
          </header>

          <OneRMCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu 1RM y cómo usarlo en el entrenamiento
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El 1RM es la base científica para periodizar el entrenamiento y progresar sistemáticamente
                en fuerza, potencia e hipertrofia muscular.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🧬</span>
                  ¿Qué es el 1RM?
                </h3>
                <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                  El 1RM (One Repetition Maximum) es el peso máximo que puedes levantar en una sola repetición con técnica correcta.
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Estándar oro:</strong> Medida más precisa de fuerza máxima</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Base científica:</strong> Para periodización de entrenamiento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Seguridad:</strong> Calculado, no necesitas probarlo directamente</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  Aplicaciones prácticas
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Periodización:</strong> Planificar ciclos de entrenamiento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Progresión:</strong> Aumentar cargas sistemáticamente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Competición:</strong> Estrategia para powerlifting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Evaluación:</strong> Medir progreso y adaptaciones</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Precisión de las fórmulas científicas
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">🥇</span>
                    Más precisas (1-5 reps)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Brzycki:</strong> <a href="https://pubmed.ncbi.nlm.nih.gov/8468191/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">±2-3% error</a></li>
                    <li>• <strong>Lander:</strong> ±2-4% error</li>
                    <li>• <strong>Uso:</strong> <a href="https://www.powerlifting.sport/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Powerlifting</a>, fuerza máxima</li>
                    <li>• <strong>Población:</strong> <a href="https://www.acsm.org/read-research/trending-topics-resource-pages/resistance-training" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Atletas experimentados</a></li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🥈</span>
                    Buena precisión (5-15 reps)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Epley:</strong> ±3-6% error</li>
                    <li>• <strong>O&apos;Conner:</strong> ±4-7% error</li>
                    <li>• <strong>Uso:</strong> Fitness general, hipertrofia</li>
                    <li>• <strong>Población:</strong> Intermedios y principiantes</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Cómo usar tu 1RM en el entrenamiento
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success">🎯 Planificación semanal</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Lunes:</strong> Fuerza 85-95% × 1-3 reps</li>
                    <li>• <strong>Miércoles:</strong> Hipertrofia 70-80% × 8-12 reps</li>
                    <li>• <strong>Viernes:</strong> Potencia 75-85% × 3-6 reps explosivas</li>
                    <li>• Ajusta según <a href="/masa-muscular/" className="text-info hover:underline transition-colors">tu nivel muscular</a></li>
                    <li>• Calcula <a href="/bmr/" className="text-info hover:underline transition-colors">calorías basales</a> para recuperación</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success">📈 Progresión mensual</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Semana 1-2:</strong> 80-85% del 1RM</li>
                    <li>• <strong>Semana 3-4:</strong> 85-90% del 1RM</li>
                    <li>• <strong>Semana 5:</strong> Deload 70-75%</li>
                    <li>• <strong>Semana 6:</strong> Test nuevo 1RM</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Limitaciones y seguridad
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Precisión limitada:</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Más de 15 repeticiones</a> pierde exactitud</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Experiencia necesaria:</strong> Requiere <a href="https://www.nsca.com/education/articles/nsca-coach/strength-testing-predicting-a-1-rm-bench-press/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">técnica perfecta</a> en el ejercicio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Fatiga influye:</strong> Calcula en condiciones de buena recuperación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>No probar directamente:</strong> Usa las estimaciones, es más seguro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Supervisión:</strong> <a href="https://www.acsm.org/read-research/trending-topics-resource-pages/resistance-training" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Especialmente importante</a> para principiantes</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre 1RM</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo recalcular mi 1RM?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Cada 4-6 semanas para principiantes, cada 8-12 semanas para intermedios,
                    y cada 12-16 semanas para avanzados. Depende de tu progresión actual.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es seguro entrenar al 90-100% del 1RM?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Solo para <a href="https://www.nsca.com/education/articles/nsca-coach/periodization-for-optimizing-strength-and-hypertrophy/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">atletas muy experimentados</a> y con supervisión. Para la mayoría,
                    entrenar al 85-90% es más seguro y igual de efectivo.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué nutrición necesito para maximizar mi fuerza?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <a href="/proteina/" className="text-info hover:underline transition-colors">Proteína adecuada</a> (1.8-2.2g/kg),
                    carbohidratos para energía, y <a href="/tdee/" className="text-info hover:underline transition-colors">calorías suficientes</a>
                    basadas en tu <a href="/bmr/" className="text-info hover:underline transition-colors">metabolismo basal</a>.
                  </p>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Optimiza tu entrenamiento de fuerza completo
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu masa muscular:</a></strong> Base fundamental para desarrollar fuerza máxima</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/ffmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu FFMI muscular:</a></strong> Evalúa desarrollo muscular independiente de grasa para atletas avanzados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu proteína:</a></strong> Nutrición específica para ganar fuerza y músculo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/bmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Conoce tu metabolismo basal:</a></strong> Base para calcular necesidades energéticas totales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu gasto calórico:</a></strong> Incluye el costo energético del entrenamiento intenso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Planifica tus macros:</a></strong> Distribución óptima para rendimiento y recuperación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Monitorea tu progreso:</a></strong> Evalúa cambios en composición corporal</span>
                </li>
              </ul>
            </section>

            <RelatedCalculators currentPage="/1rm" />

            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            <SocialShare
              title="Calculadora 1RM Científica Profesional - Una Repetición Máxima"
              url="https://nutrifit-calculator.com/1rm/"
              description="Calculadora profesional de 1RM con 5 fórmulas científicas validadas. Planifica entrenamientos de fuerza con precisión. ¡Totalmente gratis!"
            />

            <CalculatorNavigation currentCalculator="1rm" />
          </article>
        </main>
      </Container>
    </>
  );
}
