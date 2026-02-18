import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { AlertTriangle, Info, Ruler, Scale } from 'lucide-react';
import { WHRCalculator } from './WHRCalculator';

export default function WHRPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="whr" className="container-golden mb-4 pt-4" />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora WHR – Ratio Cintura-Cadera y Riesgo Cardiovascular
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu WHR (Ratio Cintura-Cadera) según estándares de la OMS para evaluar tu distribución de grasa corporal.
              Descubre si tu forma corporal es androide (manzana) o ginoide (pera) y evalúa tu riesgo cardiovascular.
            </p>
          </header>

          <WHRCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el Ratio Cintura-Cadera (WHR)?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El <strong>Ratio Cintura-Cadera (WHR)</strong> es una medida antropométrica que evalúa la distribución de la grasa corporal
                  comparando la circunferencia de la cintura con la de las caderas. Es un indicador clave de <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">riesgo cardiovascular</a> y síndrome metabólico según estándares de la OMS. Estudios epidemiológicos como el <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Framingham Heart Study</a> validan su precisión predictiva superior al IMC.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A diferencia del IMC, el WHR identifica la <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">grasa visceral peligrosa</a> que se acumula alrededor de los órganos internos, principal factor de riesgo para enfermedades cardíacas. Estudios como el <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Framingham Heart Study</a> demuestran su superioridad predictiva sobre el IMC tradicional.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Scale className="w-5 h-5 mr-2" />
                    Ventajas del WHR sobre el IMC
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Detecta grasa visceral:</strong> Identifica la grasa más peligrosa para la salud</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Independiente de altura:</strong> Más preciso que IMC para personas altas/bajas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Predice riesgo cardiovascular:</strong> Mejor predictor que IMC según estudios OMS - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">evidencia Framingham</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Sensible a cambios:</strong> Detecta mejoras en distribución de grasa</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Estándar médico:</strong> Utilizado por cardiólogos y endocrinólogos</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Clasificación de Formas Corporales
                  </h3>
                </header>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-info-subtle rounded-full flex items-center justify-center">
                        <span className="text-info text-sm">🍐</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground/90">Tipo Ginoide (Pera)</div>
                        <div className="text-sm text-info">WHR bajo - Grasa en caderas y muslos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-warning-subtle rounded-full flex items-center justify-center">
                        <span className="text-warning text-sm">⭕</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground/90">Tipo Intermedio</div>
                        <div className="text-sm text-warning">WHR moderado - Distribución equilibrada</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-destructive-subtle rounded-full flex items-center justify-center">
                        <span className="text-destructive text-sm">🍎</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground/90">Tipo Androide (Manzana)</div>
                        <div className="text-sm text-foreground/90">WHR alto - Grasa abdominal central</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  Cómo Medir Correctamente
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">Medición de Cintura</h4>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Punto más estrecho del torso (generalmente ombligo)</li>
                      <li>• En ayunas, después de exhalar normalmente</li>
                      <li>• Cinta métrica horizontal alrededor del cuerpo</li>
                      <li>• No comprimir la piel excesivamente</li>
                      <li>• <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Protocolo OMS oficial</a></li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">Medición de Cadera</h4>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Punto más ancho de las caderas/glúteos</li>
                      <li>• Cinta métrica horizontal alrededor del cuerpo</li>
                      <li>• Incluir la parte más prominente de los glúteos</li>
                      <li>• Mantener postura erguida durante la medición</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación de WHR
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/whtr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu WHtR:</a></strong> Ratio cintura-altura para riesgo cardiometabólico</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu IMC:</a></strong> Combina métricas antropométricas para evaluación completa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/bai/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula BAI sin peso:</a></strong> Estima grasa corporal con solo cadera y altura según Bergman</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">Mide tu grasa corporal:</a></strong> Conoce el porcentaje total de grasa para contexto</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Análisis de composición:</a></strong> Evaluación completa de masa magra vs grasa</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre WHR</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es el WHR y qué mide?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El WHR (Waist-to-Hip Ratio) es la relación entre la circunferencia de tu cintura y tu cadera.
                    Según la OMS, valores superiores a 0.90 en hombres y 0.85 en mujeres indican obesidad abdominal y mayor riesgo cardiovascular.
                    Complementa este análisis con el <a href="/whtr/" className="text-info hover:underline transition-colors">ratio cintura-altura (WHtR)</a> para
                    una evaluación más completa de tu distribución de grasa.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es mejor el WHR que el IMC para evaluar riesgo?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, el WHR detecta mejor el riesgo cardiovascular que el IMC porque mide la distribución de grasa.
                    Una persona con <a href="/imc/" className="text-info hover:underline transition-colors">IMC</a> normal puede tener WHR alto (grasa abdominal) y viceversa.
                    Para un análisis integral, combina WHR con <a href="/grasa-corporal/" className="text-info hover:underline transition-colors">porcentaje de grasa corporal</a> y
                    <a href="/composicion/" className="text-info hover:underline transition-colors"> composición corporal</a>.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="whr" />

          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          <SocialShare
            title="Calculadora WHR Médica - Ratio Cintura-Cadera OMS"
            url="https://nutrifit-calculator.com/whr/"
            description="Calcula tu Ratio Cintura-Cadera según estándares OMS. Evalúa distribución de grasa, riesgo cardiovascular y obtén recomendaciones médicas profesionales. ¡Totalmente gratis!"
          />

          <CalculatorNavigation currentCalculator="whr" />
        </main>
      </Container>
    </>
  );
}
