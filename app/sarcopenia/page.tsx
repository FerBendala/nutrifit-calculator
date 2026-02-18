import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { AlertCircle, Heart, Info, Users } from 'lucide-react';
import { SarcopeniaCalculator } from './SarcopeniaCalculator';

export default function SarcopeniaPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="sarcopenia" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Sarcopenia – Evalúa Pérdida Muscular por Edad
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calculadora médica del Índice de Sarcopenia con fórmulas Baumgartner, ASMM y SMMI según estándares EWGSOP2.
              Evalúa pérdida muscular relacionada con la edad y riesgo de fragilidad.
              Para profesionales de la salud y geriatría.
            </p>
          </header>

          <SarcopeniaCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Sarcopenia?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  La <strong>sarcopenia</strong> es la pérdida progresiva y generalizada de masa muscular esquelética
                  que ocurre con el <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2804956/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">envejecimiento</a>.
                  Afecta la movilidad, el equilibrio y aumenta el riesgo de caídas y fracturas.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Según la <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3377163/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">EWGSOP2</a>,
                  se diagnostica cuando hay baja masa muscular más baja fuerza o rendimiento físico reducido.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-destructive-subtle border-l-4 border-destructive">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Factores de Riesgo de Sarcopenia
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Edad avanzada:</strong> Mayor riesgo después de los 50 años</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Sedentarismo:</strong> Falta de actividad física regular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Desnutrición:</strong> Déficit de proteínas y calorías</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Enfermedades crónicas:</strong> Diabetes, cáncer, EPOC</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Inflamación crónica:</strong> Procesos inflamatorios persistentes</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Beneficios de la Prevención
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Mejor movilidad:</strong> Mantiene independencia funcional</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Menor riesgo de caídas:</strong> Mejora el equilibrio y estabilidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Calidad de vida:</strong> Mantiene actividades diarias autónomas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Longevidad saludable:</strong> Reduce dependencia y fragilidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Ahorro sanitario:</strong> Menos hospitalizaciones y cuidados</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Estadísticas de Sarcopenia
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-card/50 rounded-lg">
                    <div className="text-2xl font-bold text-warning mb-2">10-20%</div>
                    <div className="text-sm text-foreground">Prevalencia en adultos &gt; 50 años</div>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg">
                    <div className="text-2xl font-bold text-warning mb-2">50%</div>
                    <div className="text-sm text-foreground">Prevalencia en adultos &gt; 80 años</div>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg">
                    <div className="text-2xl font-bold text-warning mb-2">3x</div>
                    <div className="text-sm text-foreground">Mayor riesgo de mortalidad</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación de sarcopenia
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu masa muscular:</a></strong> Evalúa la cantidad total de músculo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu ingesta proteica:</a></strong> Fundamental para mantener la masa muscular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa composición corporal:</a></strong> Relación entre músculo y grasa corporal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/vo2max/" className="text-info hover:underline transition-colors font-medium transition-golden">Mide tu capacidad cardiovascular:</a></strong> El ejercicio aeróbico ayuda a prevenir la sarcopenia</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre sarcopenia</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es la sarcopenia?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La sarcopenia es la pérdida progresiva de masa muscular, fuerza y función física asociada al envejecimiento.
                    Según los criterios EWGSOP2, se diagnostica combinando baja fuerza de agarre, baja masa muscular y bajo rendimiento físico.
                    Puedes evaluar tu masa muscular actual con nuestra <a href="/masa-muscular/" className="text-info hover:underline transition-colors">calculadora de masa muscular</a>.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿A qué edad comienza la sarcopenia?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La pérdida muscular comienza a los 30 años (1-2% anual) y se acelera después de los 60.
                    El sedentarismo, la dieta pobre en proteínas y enfermedades crónicas aceleran el proceso.
                    El ejercicio de fuerza es la intervención más efectiva. Asegura una
                    <a href="/proteina/" className="text-info hover:underline transition-colors"> ingesta adecuada de proteína</a> y
                    monitoriza tu <a href="/densidad-osea/" className="text-info hover:underline transition-colors">densidad ósea</a>,
                    ya que ambas pérdidas suelen ir de la mano.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="sarcopenia" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora Índice de Sarcopenia - Evaluación Médica"
            url="https://nutrifit-calculator.com/sarcopenia/"
            description="Calcula tu Índice de Sarcopenia con fórmulas médicas profesionales. Evalúa pérdida muscular relacionada con la edad y obtén recomendaciones preventivas. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="sarcopenia" />
        </main>
      </Container>
    </>
  );
}
