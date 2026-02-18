import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { BSACalculator } from './BSACalculator';

export default function BSAPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="bsa" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora BSA – Superficie Corporal con 5 Fórmulas Médicas
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica de BSA (Superficie Corporal) con 5 fórmulas científicas: Du Bois, Mosteller, Haycock, Gehan y Boyd.
              Esencial para dosificación de quimioterapia, cálculo de índice cardíaco y fluidos intravenosos.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>BSA (Body Surface Area - Superficie Corporal)</strong> es una medida fundamental en medicina clínica
                que permite calcular dosis de medicamentos, necesidades de fluidos y parámetros cardíacos con mayor precisión
                que el peso corporal solo. Es especialmente crítico en oncología, cardiología y cuidados intensivos.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A diferencia de usar solo el peso, el BSA normaliza las dosis considerando tanto la altura como el peso,
                resultando en dosificaciones más precisas y seguras, especialmente en extremos de tamaño corporal.
                Representa el estándar de oro para dosificación de quimioterapia y otros fármacos críticos.
              </p>
            </div>
          </section>

          <BSACalculator />

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Importancia del BSA en medicina clínica moderna
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La Superficie Corporal (BSA) es una medida fundamental en medicina que permite dosificaciones más precisas
                y seguras de medicamentos críticos. A diferencia del peso corporal, el BSA considera tanto altura como peso,
                resultando en cálculos más exactos especialmente en extremos de tamaño.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">💊</span>
                  Aplicaciones médicas críticas
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Quimioterapia:</strong> Dosificación estándar por m² según <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4163889/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">protocolos NCCN</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Cardiología:</strong> Cálculo de índice cardíaco, gasto cardíaco y volumen sistólico</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Fluidoterapia:</strong> Mantenimiento diario y resucitación en quemaduras (fórmula Parkland)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Nutrición hospitalaria:</strong> Cálculo de calorías y proteínas en soporte nutricional</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Antibióticos:</strong> Ajuste de dosis en pacientes con IMC extremo según <a href="/peso-ajustado/" className="text-info hover:underline transition-colors">ABW y BSA</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Cuidados intensivos:</strong> Ventilación mecánica, dosis de vasoactivos y monitorización hemodinámica</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📐</span>
                  Fórmulas científicas validadas
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-info">Du Bois (1916) - Estándar de oro:</h4>
                    <p className="text-xs text-muted-foreground mt-1">0.007184 × peso^0.425 × altura^0.725</p>
                    <p className="text-xs text-muted-foreground mt-1">Más precisa y usada en oncología y cardiología</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-success">Mosteller (1987) - Pediátrica:</h4>
                    <p className="text-xs text-muted-foreground mt-1">√((altura × peso) / 3600)</p>
                    <p className="text-xs text-muted-foreground mt-1">Simple y comúnmente usada en pediatría</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">Haycock (1978):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Más precisa para niños y adultos de talla pequeña</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-warning">Gehan & Boyd:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Útiles en extremos de tamaño corporal</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Ventajas del BSA sobre peso corporal solo
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">📊</span>
                    Mayor precisión:
                  </h4>
                  <p className="text-xs text-info">
                    Considera altura y peso, resultando en dosis más exactas especialmente en obesidad o bajo peso
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">💊</span>
                    Seguridad:
                  </h4>
                  <p className="text-xs text-info">
                    Reduce riesgo de sobredosis en pacientes grandes y subdosis en pacientes pequeños
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🏥</span>
                    Estándar clínico:
                  </h4>
                  <p className="text-xs text-info">
                    Requerido en oncología, cardiología y cuidados intensivos para fármacos críticos
                  </p>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                BSA en oncología y quimioterapia
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Fármacos dosificados por BSA:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• <strong>Doxorrubicina:</strong> 60-75 mg/m² cada 21 días</li>
                    <li>• <strong>Cisplatino:</strong> 50-100 mg/m² según protocolo</li>
                    <li>• <strong>Carboplatino:</strong> AUC (área bajo curva) basado en BSA</li>
                    <li>• <strong>Paclitaxel:</strong> 135-175 mg/m² cada 3 semanas</li>
                    <li>• <strong>5-Fluorouracilo:</strong> 400-1000 mg/m² según régimen</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Consideraciones especiales:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• <strong>Obesidad:</strong> Algunos protocolos usan <a href="/peso-ajustado/" className="text-info hover:underline transition-colors">peso ajustado (ABW)</a> o BSA corregido</li>
                    <li>• <strong>Edad avanzada:</strong> Puede requerir reducción de dosis según comorbilidades</li>
                    <li>• <strong>Función renal/hepática:</strong> Ajustes adicionales necesarios</li>
                    <li>• <strong>Consistencia:</strong> Usar siempre la misma fórmula durante todo el tratamiento</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-destructive-subtle card-golden-lg border-l-4 border-destructive mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">❤️</span>
                BSA en cardiología
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Parámetros calculados:</h4>
                  <ul className="text-sm text-foreground/90 space-y-1">
                    <li>• <strong>Índice cardíaco (CI):</strong> Gasto cardíaco / BSA (normal: 2.5-4.0 L/min/m²)</li>
                    <li>• <strong>Volumen sistólico (SV):</strong> Gasto cardíaco / frecuencia cardíaca</li>
                    <li>• <strong>Resistencia vascular sistémica:</strong> Ajustada por BSA para comparación</li>
                    <li>• <strong>Eco cardiografía:</strong> Dimensiones ventriculares normalizadas por BSA</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Aplicaciones clínicas:</h4>
                  <ul className="text-sm text-foreground/90 space-y-1">
                    <li>• Evaluación de función cardíaca en insuficiencia cardíaca</li>
                    <li>• Dosificación de inotrópicos y vasoactivos</li>
                    <li>• Monitorización post-cirugía cardíaca</li>
                    <li>• Interpretación de estudios de imagen cardíaca</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre BSA</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué usar BSA en lugar de peso corporal para dosificar medicamentos?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El BSA normaliza las dosis considerando tanto altura como peso, resultando en dosificaciones más precisas.
                    Es especialmente importante en extremos de tamaño corporal y para fármacos con ventana terapéutica estrecha.
                    Estudios muestran que el BSA reduce la variabilidad interindividual en la farmacocinética.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué fórmula de BSA debo usar en mi práctica clínica?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <strong>Du Bois es el estándar de oro</strong> y debe usarse en la mayoría de casos, especialmente en oncología.
                    Mosteller es ampliamente aceptada en pediatría por su simplicidad. Lo más importante es usar la misma
                    fórmula de forma consistente durante todo el tratamiento del paciente.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo se relaciona el BSA con el peso ajustado (ABW)?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Ambos son herramientas complementarias. El <a href="/peso-ajustado/" className="text-info hover:underline transition-colors">peso ajustado (ABW)</a> corrige
                    el peso actual en obesidad para cálculos metabólicos. El BSA considera altura y peso para dosificación.
                    En algunos protocolos de quimioterapia para obesidad, se combinan ambos para máxima precisión.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Calculadoras relacionadas para uso clínico
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/peso-ajustado/" className="text-info hover:underline transition-colors font-medium transition-golden">Peso Ajustado Clínico (ABW):</a></strong> Complementa el BSA en pacientes con obesidad para dosificación precisa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/egfr/" className="text-info hover:underline transition-colors font-medium transition-golden">eGFR (Filtrado Glomerular):</a></strong> Para ajuste de dosis según función renal (CKD-EPI, Cockcroft-Gault)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Necesidades de Proteína:</a></strong> El BSA se usa también para calcular requerimientos nutricionales hospitalarios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora IMC:</a></strong> Útil para identificar pacientes que requieren ajustes en dosificación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/peso-ideal/" className="text-info hover:underline transition-colors font-medium transition-golden">Peso Ideal:</a></strong> Referencia para evaluar si se requiere ABW o BSA corregido</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/bsa" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora BSA Superficie Corporal - 5 Fórmulas Científicas"
              url="https://nutrifit-calculator.com/bsa/"
              description="Calculadora profesional de BSA con fórmulas Du Bois, Mosteller, Haycock, Gehan y Boyd. Esencial para dosificación de quimioterapia y aplicaciones clínicas."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="bsa" />
          </article>
        </main>
      </Container>
    </>
  );
}
