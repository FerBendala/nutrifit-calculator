import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Activity, Info, TrendingUp } from 'lucide-react';
import { VO2MaxCalculator } from './VO2MaxCalculator';

export default function VO2MaxPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="vo2max" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora VO2 Max – Mide Tu Capacidad Cardiovascular
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu VO2 Max con 4 métodos científicos (Test de Cooper, Rockport, Astrand, Step Test).
              Evalúa tu capacidad cardiovascular y nivel de fitness.
              Descubre si tu condición aeróbica es excelente, buena o necesita mejorar.
            </p>
          </header>

          <VO2MaxCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el VO2 Max?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El <strong>VO2 Max</strong> (consumo máximo de oxígeno) es la cantidad máxima de oxígeno que tu cuerpo puede utilizar durante el ejercicio intenso.
                  Es el indicador más preciso de tu <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">capacidad cardiovascular</a> y resistencia aeróbica.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Se expresa en mililitros de oxígeno por kilogramo de peso corporal por minuto (ml/kg/min).
                  Un VO2 Max más alto indica mejor condición física y menor riesgo de enfermedades cardiovasculares.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Beneficios de un VO2 Max Alto
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Mejor resistencia:</strong> Mayor capacidad para ejercicio prolongado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Salud cardíaca:</strong> Menor riesgo de enfermedades cardiovasculares</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Recuperación rápida:</strong> El corazón se recupera más rápido del esfuerzo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Longevidad:</strong> Asociado con mayor esperanza de vida</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Rendimiento deportivo:</strong> Mejora en deportes de resistencia</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Cómo Mejorar tu VO2 Max
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento HIIT:</strong> Intervalos de alta intensidad mejoran el VO2 Max</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento continuo:</strong> Carrera o ciclismo a ritmo moderado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento de tempo:</strong> Ritmo constante durante 20-30 minutos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento de fuerza:</strong> Mejora la economía de movimiento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Descanso adecuado:</strong> El sueño es crucial para la adaptación</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Zonas de Entrenamiento
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-info-subtle rounded-lg">
                    <div className="text-lg font-bold text-info">Zona 1</div>
                    <div className="text-xs text-info">50-60% FCM</div>
                    <div className="text-xs text-muted-foreground">Recuperación</div>
                  </div>
                  <div className="text-center p-3 bg-success-subtle rounded-lg">
                    <div className="text-lg font-bold text-success">Zona 2</div>
                    <div className="text-xs text-success">60-70% FCM</div>
                    <div className="text-xs text-muted-foreground">Resistencia</div>
                  </div>
                  <div className="text-center p-3 bg-warning-subtle rounded-lg">
                    <div className="text-lg font-bold text-warning">Zona 3</div>
                    <div className="text-xs text-warning">70-80% FCM</div>
                    <div className="text-xs text-muted-foreground">Tempo</div>
                  </div>
                  <div className="text-center p-3 bg-warning-subtle rounded-lg">
                    <div className="text-lg font-bold text-warning">Zona 4</div>
                    <div className="text-xs text-warning">80-90% FCM</div>
                    <div className="text-xs text-muted-foreground">Umbral</div>
                  </div>
                  <div className="text-center p-3 bg-destructive-subtle rounded-lg">
                    <div className="text-lg font-bold text-destructive">Zona 5</div>
                    <div className="text-xs text-destructive">90-100% FCM</div>
                    <div className="text-xs text-muted-foreground">VO2 Max</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación cardiovascular
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/ritmo-cardiaco/" className="text-info hover:underline transition-colors font-medium transition-golden">Zonas de entrenamiento:</a></strong> Calcula tus zonas cardíacas específicas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/1rm/" className="text-info hover:underline transition-colors font-medium transition-golden">Fuerza máxima:</a></strong> Combina cardio con entrenamiento de fuerza</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Masa muscular:</a></strong> La masa magra mejora la eficiencia cardiovascular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Gasto calórico:</a></strong> Ajusta tu nutrición para entrenamientos intensos</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre VO2 Max</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es el VO2 max y por qué importa?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El VO2 max es la cantidad máxima de oxígeno que tu cuerpo puede utilizar durante el ejercicio.
                    Es el mejor indicador de fitness cardiovascular y se asocia con menor riesgo de mortalidad por cualquier causa.
                    Puedes complementar esta evaluación con nuestra <a href="/ritmo-cardiaco/" className="text-info hover:underline transition-colors">calculadora de frecuencia cardíaca</a> para
                    conocer tus zonas de entrenamiento óptimas.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi VO2 max?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El entrenamiento interválico de alta intensidad (HIIT) es el método más efectivo para mejorar el VO2 max.
                    También el ejercicio continuo de intensidad moderada-alta (75-85% FCmax) 3-5 veces por semana.
                    Combinar cardio con <a href="/1rm/" className="text-info hover:underline transition-colors">entrenamiento de fuerza</a> y
                    una <a href="/proteina/" className="text-info hover:underline transition-colors">ingesta adecuada de proteína</a> optimiza los resultados.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="vo2max" />

          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          <SocialShare
            title="Calculadora VO2 Max - Capacidad Cardiovascular"
            url="https://nutrifit-calculator.com/vo2max/"
            description="Calcula tu VO2 Max con 4 métodos científicos. Evalúa tu capacidad cardiovascular y obtén zonas de entrenamiento personalizadas. ¡Totalmente gratis!"
          />

          <CalculatorNavigation currentCalculator="vo2max" />
        </main>
      </Container>
    </>
  );
}
