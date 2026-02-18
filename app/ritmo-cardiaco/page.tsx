import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { RitmoCardiacoCalculator } from './RitmoCardiacoCalculator';

export default function RitmoCardiacoPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="ritmo-cardiaco" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Frecuencia Cardíaca – Zonas de Entrenamiento
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento personalizadas.
              Descubre tus zonas de quema de grasa, cardio y anaeróbica según tu edad.
            </p>
          </header>

          <RitmoCardiacoCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu ritmo cardíaco y zonas de entrenamiento
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El entrenamiento por zonas de frecuencia cardíaca te permite optimizar cada sesión
                según tu objetivo específico: quemar grasa, mejorar resistencia o aumentar potencia.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Fórmulas científicas
                </h3>
                <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                  Utilizamos fórmulas validadas científicamente para calcular tu frecuencia cardíaca máxima:
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Tanaka:</strong> 208 - (0.7 × edad) - Más precisa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Gulati:</strong> 206 - (0.88 × edad) - Para mujeres</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-muted-foreground mr-2">•</span>
                    <span><strong>Clásica:</strong> 220 - edad - Ampliamente conocida</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Beneficios del entrenamiento por zonas
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>Optimización de cada sesión de entrenamiento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Máxima eficiencia en la quema de grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Mejora progresiva del rendimiento cardiovascular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Prevención del sobreentrenamiento</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔥</span>
                Guía detallada de zonas de entrenamiento
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-muted-foreground flex items-center">
                    <span className="text-lg mr-2">⚪</span>
                    Zona 1 - Recuperación (50-60%)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Duración: 20-60 minutos</li>
                    <li>• Ideal para: Calentamiento y enfriamiento</li>
                    <li>• Sensación: Muy fácil, puedes conversar</li>
                    <li>• Beneficio: Recuperación activa</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">🔵</span>
                    Zona 2 - Base Aeróbica (60-70%)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Duración: 30-90 minutos</li>
                    <li>• Ideal para: <strong>Quemar grasa</strong></li>
                    <li>• Sensación: Cómodo, respiración controlada</li>
                    <li>• Beneficio: Mejora la eficiencia metabólica</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">🟢</span>
                    Zona 3 - Aeróbica (70-80%)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Duración: 20-60 minutos</li>
                    <li>• Ideal para: Resistencia cardiovascular</li>
                    <li>• Sensación: Moderado, respiración profunda</li>
                    <li>• Beneficio: Mejora la capacidad aeróbica</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🟡</span>
                    Zona 4 - Umbral (80-90%)
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Duración: 10-40 minutos</li>
                    <li>• Ideal para: Mejorar velocidad y potencia</li>
                    <li>• Sensación: Difícil, respiración agitada</li>
                    <li>• Beneficio: Aumenta el umbral anaeróbico</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔥</span>
                Maximizando la quema de grasa
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning">🎯 Zona óptima</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>60-70% FC máxima</strong> - Zona 2</li>
                    <li>• El cuerpo usa principalmente grasa como combustible</li>
                    <li>• Puedes mantener esta intensidad por tiempo prolongado</li>
                    <li>• Ideal para personas que buscan perder peso</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning">⏱️ Duración recomendada</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Mínimo:</strong> 30 minutos para activar lipolisis</li>
                    <li>• <strong>Óptimo:</strong> 45-60 minutos para máxima quema</li>
                    <li>• <strong>Frecuencia:</strong> 3-5 veces por semana</li>
                    <li>• Combina con <a href="/proteina/" className="text-info hover:underline transition-colors">dieta alta en proteína</a></li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📱</span>
                Cómo monitorear tu ritmo cardíaco
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success">📊 Métodos de medición</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• <strong>Pulsómetro de pecho:</strong> Más preciso</li>
                    <li>• <strong>Smartwatch/fitness tracker:</strong> Conveniente</li>
                    <li>• <strong>Medición manual:</strong> Pulso en muñeca o cuello</li>
                    <li>• <strong>Máquinas de gimnasio:</strong> Sensores integrados</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success">💡 Consejos prácticos</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Mide en reposo para establecer línea base</li>
                    <li>• Ajusta según cómo te sientes (RPE)</li>
                    <li>• Considera factores externos (calor, estrés)</li>
                    <li>• Mantente <a href="/agua/" className="text-info hover:underline transition-colors">bien hidratado</a></li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Consideraciones importantes
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Los cálculos son estimaciones:</strong> La FC máxima real puede variar ±10-15 ppm</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Factores que afectan FC:</strong> Medicamentos, cafeína, estrés, temperatura</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Consulta médica:</strong> Si tienes problemas cardíacos o tomas medicación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Escucha tu cuerpo:</strong> Las sensaciones son tan importantes como los números</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué fórmula debo usar para calcular mi FC máxima?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La fórmula de Tanaka es generalmente la más precisa para la población general.
                    Las mujeres pueden usar la fórmula de Gulati para mayor precisión específica por género.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo quemar grasa entrenando en zonas más altas?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, pero en zonas altas quemas más carbohidratos que grasa. La Zona 2 (60-70%)
                    es óptima para maximizar el uso de grasa como combustible.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo se relaciona con mi <a href="/" className="text-info hover:underline transition-colors">plan nutricional</a>?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El entrenamiento cardiovascular debe complementar tu plan nutricional. Si buscas
                    perder grasa, combina Zona 2 con un déficit calórico moderado calculado con nuestras herramientas.
                  </p>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Optimiza tu plan de entrenamiento completo
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus calorías diarias:</a></strong> Ajusta tu nutrición según tu gasto calórico en cada zona</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Mide tu composición corporal:</a></strong> Evalúa los resultados de tu entrenamiento cardiovascular</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/vo2max/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu capacidad cardiovascular:</a></strong> Mide tu VO2 Max con tests científicos validados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/agua/" className="text-info hover:underline transition-colors font-medium transition-golden">Mantén hidratación óptima:</a></strong> Fundamental para el rendimiento cardiovascular</span>
                </li>
              </ul>
            </section>

            <RelatedCalculators currentPage="/ritmo-cardiaco" />

            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/ritmo-cardiaco/"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            <CalculatorNavigation currentCalculator="ritmo-cardiaco" />
          </article>
        </main>
      </Container>
    </>
  );
}
