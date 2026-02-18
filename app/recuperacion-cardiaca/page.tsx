import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Activity, AlertTriangle, CheckCircle, Heart, Info, TrendingDown } from 'lucide-react';
import { RecuperacionCardiacaCalculator } from './RecuperacionCardiacaCalculator';

export default function RecuperacionCardiacaPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="recuperacion-cardiaca" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Recuperación Cardíaca – Tu Condición Cardiovascular
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu recuperación cardíaca (HRR) para evaluar tu condición cardiovascular.
              Mide qué tan rápido bajan tus pulsaciones después del ejercicio. Un indicador clave de fitness y salud del corazón.
            </p>
          </header>

          <RecuperacionCardiacaCalculator />

          {/* Contenido educativo */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Recuperación Cardíaca (HRR)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La recuperación cardíaca (HRR) es una medida importante de la condición cardiovascular que evalúa
                qué tan rápido se recupera tu frecuencia cardíaca después de detener el ejercicio. Es un indicador
                clave de la función del sistema nervioso autónomo y la salud cardiovascular general.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <TrendingDown className="w-5 h-5 mr-3 text-destructive" />
                  Cómo Medir la HRR
                </h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Realiza ejercicio hasta alcanzar tu frecuencia cardíaca máxima o cerca del máximo</li>
                  <li>Detén el ejercicio inmediatamente y mide tu frecuencia cardíaca (pico)</li>
                  <li>Mide tu frecuencia cardíaca nuevamente a 1 minuto después de detener el ejercicio</li>
                  <li>Opcionalmente, mide también a 2 minutos después de detener el ejercicio</li>
                  <li>Calcula la diferencia: HRR = Frecuencia cardíaca pico - Frecuencia cardíaca post-ejercicio</li>
                </ol>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-success" />
                  Valores Normales
                </h3>
                <div className="space-golden-sm">
                  <div className="bg-success-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-success mb-1">HRR a 1 minuto:</p>
                    <ul className="text-sm text-success space-y-1">
                      <li>• Excelente: ≥18 bpm</li>
                      <li>• Buena: 15-17 bpm</li>
                      <li>• Normal: 12-14 bpm</li>
                      <li>• Pobre: 8-11 bpm</li>
                      <li>• Muy Pobre: &lt;8 bpm</li>
                    </ul>
                  </div>
                  <div className="bg-info-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-info mb-1">HRR a 2 minutos:</p>
                    <ul className="text-sm text-info space-y-1">
                      <li>• Excelente: ≥30 bpm</li>
                      <li>• Buena: 25-29 bpm</li>
                      <li>• Normal: 22-24 bpm</li>
                      <li>• Pobre: 15-21 bpm</li>
                      <li>• Muy Pobre: &lt;15 bpm</li>
                    </ul>
                  </div>
                </div>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <Heart className="w-5 h-5 mr-3" />
                Importancia Clínica de la HRR
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Indicador de Condición Cardiovascular
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Una recuperación cardíaca rápida indica buena condición cardiovascular y función autonómica saludable.
                    Las personas con mejor condición física tienen HRR más altas.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Predicción de Riesgo Cardiovascular
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Una HRR baja (&lt;12 bpm a 1 min) se asocia con mayor riesgo de mortalidad cardiovascular
                    y puede indicar disfunción autonómica o enfermedad cardiovascular subyacente.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitoreo de Progreso
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    La HRR puede mejorar con el entrenamiento regular. Monitorear la HRR a lo largo del tiempo
                    puede ayudar a evaluar la efectividad de un programa de ejercicio.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Función Autonómica
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    La HRR refleja la función del sistema nervioso autónomo, específicamente la actividad
                    parasimpática que ayuda a reducir la frecuencia cardíaca después del ejercicio.
                  </p>
                </article>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas Frecuentes (FAQ)</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué es importante la HRR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La HRR es un indicador importante de la condición cardiovascular y la función autonómica.
                    Una recuperación rápida indica buena salud cardiovascular, mientras que una recuperación
                    lenta puede indicar problemas cardiovasculares o disfunción autonómica.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi HRR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Puedes mejorar tu HRR con ejercicio cardiovascular regular, especialmente entrenamiento
                    de intervalos de alta intensidad (HIIT). También ayuda mantener un peso saludable,
                    gestionar el estrés, dormir bien y evitar el tabaco.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué significa una HRR baja?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Una HRR baja puede indicar condición cardiovascular subóptima, disfunción autonómica
                    o riesgo cardiovascular aumentado. Si tu HRR es consistentemente baja, se recomienda
                    consultar con un médico para evaluación cardiovascular.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuándo debo medir la HRR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Mide la HRR después de ejercicio de intensidad moderada a alta, cuando hayas alcanzado
                    al menos el 80% de tu frecuencia cardíaca máxima estimada. Evita medirla después de
                    ejercicio muy ligero, ya que la recuperación será muy rápida y no será informativa.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/recuperacion-cardiaca" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Recuperación Cardíaca (HRR) - Evaluación Cardiovascular"
            url="https://nutrifit-calculator.com/recuperacion-cardiaca/"
            description="Calcula tu recuperación cardíaca (HRR) para evaluar condición cardiovascular y función autonómica. Mide la velocidad de recuperación del corazón después del ejercicio. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="recuperacion-cardiaca" />
        </main>
      </Container>
    </>
  );
}
