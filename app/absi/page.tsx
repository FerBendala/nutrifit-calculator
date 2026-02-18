import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { ABSICalculator } from './ABSICalculator';

export default function ABSIPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="absi" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora ABSI – Índice de Forma Corporal y Riesgo de Mortalidad
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora de ABSI (A Body Shape Index) según fórmula Krakauer & Krakauer (2012).
              Predice riesgo de mortalidad mejor que el IMC al incorporar distribución de grasa abdominal. Herramienta epidemiológica validada.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>ABSI (A Body Shape Index)</strong> es un índice desarrollado por Krakauer & Krakauer en 2012
                que predice mortalidad mejor que el IMC solo. A diferencia del IMC, el ABSI incorpora la circunferencia
                de cintura, proporcionando información sobre la distribución de grasa abdominal, un factor crítico en
                el riesgo cardiovascular y metabólico.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                El ABSI combina IMC, circunferencia de cintura y altura en una fórmula que identifica individuos con
                mayor riesgo de mortalidad, incluso cuando el IMC está en rango normal. Es especialmente útil para
                detectar riesgo cardiovascular y metabólico que el IMC solo podría pasar por alto.
              </p>
            </div>
          </section>

          <ABSICalculator />

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué el ABSI predice mortalidad mejor que el IMC?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El A Body Shape Index (ABSI) fue desarrollado por Nir Krakauer y Jesse Krakauer en 2012 para superar
                las limitaciones del IMC. Mientras que el IMC solo considera peso y altura, el ABSI incorpora la
                circunferencia de cintura, proporcionando información crítica sobre la distribución de grasa abdominal.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Ventajas del ABSI sobre el IMC
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Predicción de mortalidad:</strong> Mejor que IMC según <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3401091/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios de Krakauer et al.</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Distribución de grasa:</strong> Identifica riesgo incluso con IMC normal</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Riesgo cardiovascular:</strong> Más sensible a grasa abdominal (visceral)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Independiente de IMC:</strong> Puede detectar riesgo en personas con IMC normal</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Validación científica:</strong> Validado en múltiples poblaciones y estudios</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Z-score estandarizado:</strong> Permite comparación con población de referencia</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del Z-Score
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-success">Z-score &lt; -1.0 (Muy Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo de mortalidad muy bajo, percentil &lt;16%</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-info">Z-score -1.0 a -0.5 (Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo bajo, percentil 16-31%</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">Z-score -0.5 a 0.5 (Moderado):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo promedio, percentil 31-69%</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">Z-score 0.5 a 1.0 (Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo elevado, percentil 69-84%</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-destructive">Z-score &gt; 1.0 (Muy Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo muy elevado, percentil &gt;84%</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-destructive-subtle card-golden-lg border-l-4 border-destructive mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">❤️</span>
                ABSI y Riesgo Cardiovascular
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Asociaciones clínicas:</h4>
                  <ul className="text-sm text-foreground/90 space-y-1">
                    <li>• <strong>Enfermedad cardiovascular:</strong> ABSI elevado predice eventos cardíacos</li>
                    <li>• <strong>Diabetes tipo 2:</strong> Mayor riesgo con ABSI alto</li>
                    <li>• <strong>Síndrome metabólico:</strong> ABSI correlaciona con componentes del síndrome</li>
                    <li>• <strong>Hipertensión:</strong> Mayor prevalencia con ABSI elevado</li>
                    <li>• <strong>Mortalidad por todas las causas:</strong> Predicción independiente del IMC</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Mecanismos biológicos:</h4>
                  <ul className="text-sm text-foreground/90 space-y-1">
                    <li>• <strong>Grasa visceral:</strong> ABSI refleja acumulación de grasa abdominal profunda</li>
                    <li>• <strong>Inflamación:</strong> La grasa visceral produce citoquinas proinflamatorias</li>
                    <li>• <strong>Resistencia a insulina:</strong> Mayor grasa abdominal aumenta resistencia</li>
                    <li>• <strong>Disfunción endotelial:</strong> Contribuye a aterosclerosis</li>
                    <li>• <strong>Alteraciones metabólicas:</strong> Afecta lípidos y glucosa</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmula Científica del ABSI
              </h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Fórmula ABSI (Krakauer & Krakauer, 2012):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>ABSI = WC / (BMI^(2/3) × height^(1/2))</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde:
                    <br />• WC = Circunferencia de cintura (en metros)
                    <br />• BMI = Índice de masa corporal (kg/m²)
                    <br />• height = Altura (en metros)
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Z-Score (Estandarización):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>Z-score = (ABSI - μ) / σ</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde μ es la media poblacional y σ es la desviación estándar, ajustados por género y edad.
                    El z-score permite comparar el ABSI individual con la población de referencia.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre ABSI</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿El ABSI reemplaza al IMC?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <strong>No.</strong> El ABSI complementa al IMC. Mientras que el IMC es útil para evaluar peso corporal general,
                    el ABSI proporciona información adicional sobre distribución de grasa y riesgo de mortalidad. Ambos índices
                    juntos ofrecen una evaluación más completa. Consulta también nuestra <a href="/imc/" className="text-info hover:underline transition-colors">calculadora de IMC</a>.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi ABSI?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Reducir la circunferencia de cintura es clave. Esto se logra mediante: (1) Ejercicio cardiovascular regular
                    (150+ min/semana), (2) Entrenamiento de fuerza para preservar músculo, (3) Déficit calórico moderado
                    (300-500 kcal/día), (4) Dieta rica en fibra y proteína, (5) Reducción de grasa abdominal específicamente.
                    Consulta nuestra <a href="/tdee/" className="text-info hover:underline transition-colors">calculadora de TDEE</a> para planificar tu déficit.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué diferencia hay entre ABSI y WHtR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Ambos incorporan circunferencia de cintura, pero el ABSI también considera el IMC, proporcionando una
                    medida más compleja que predice mortalidad. El <a href="/whtr/" className="text-info hover:underline transition-colors">WHtR</a> es más simple (cintura/altura)
                    y evalúa riesgo cardiometabólico. El ABSI está específicamente diseñado para predecir mortalidad.
                    Ambos son útiles y complementarios.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Calculadoras relacionadas para evaluación completa
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de IMC:</a></strong> Complementa el ABSI con evaluación de peso corporal general</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whtr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de WHtR:</a></strong> Ratio cintura-altura para evaluación de riesgo cardiometabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de WHR:</a></strong> Ratio cintura-cadera para análisis de distribución de grasa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">Grasa Corporal:</a></strong> Porcentaje de grasa corporal para evaluación completa</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/absi" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora ABSI - A Body Shape Index | Predicción de Mortalidad"
              url="https://nutrifit-calculator.com/absi/"
              description="Calculadora profesional de ABSI según fórmula Krakauer. Predice riesgo de mortalidad mejor que el IMC solo."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="absi" />
          </article>
        </main>
      </Container>
    </>
  );
}
