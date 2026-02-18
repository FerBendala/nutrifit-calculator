import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { CICalculator } from './CICalculator';

export default function CIPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="ci" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora CI – Índice de Conicidad y Grasa Abdominal
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora de CI (Conicity Index) según fórmula Valdez (1991).
              Evalúa distribución de grasa abdominal y predice riesgo cardiovascular y metabólico. Herramienta epidemiológica validada.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>CI (Conicity Index)</strong> es un índice desarrollado por Valdez en 1991
                que evalúa la distribución de grasa abdominal comparando la circunferencia de cintura
                con la circunferencia esperada de un cilindro con el mismo peso y altura. A diferencia
                del IMC, el CI proporciona información específica sobre la forma corporal y la distribución
                de grasa, siendo especialmente útil para identificar riesgo cardiovascular y metabólico.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                El CI es complementario a otros índices de forma corporal como <a href="/absi/" className="text-info hover:underline transition-colors">ABSI</a>,
                <a href="/bri/" className="text-info hover:underline transition-colors">BRI</a>, <a href="/whtr/" className="text-info hover:underline transition-colors">WHtR</a> y <a href="/whr/" className="text-info hover:underline transition-colors">WHR</a>.
                Es ampliamente utilizado en estudios epidemiológicos y proporciona una evaluación precisa
                del riesgo de síndrome metabólico, diabetes tipo 2 y enfermedad cardiovascular.
              </p>
            </div>
          </section>

          <CICalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué el CI evalúa distribución de grasa abdominal?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El Conicity Index (CI) fue desarrollado por Valdez en 1991 para evaluar la distribución de grasa abdominal
                comparando la circunferencia de cintura con la circunferencia esperada de un cilindro con el mismo peso y altura.
                Es ampliamente utilizado en estudios epidemiológicos y proporciona una evaluación precisa del riesgo cardiovascular
                y metabólico.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Ventajas del CI
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Distribución de grasa:</strong> Evalúa específicamente la distribución de grasa abdominal según <a href="https://pubmed.ncbi.nlm.nih.gov/2049778/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Valdez (1991)</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Riesgo cardiovascular:</strong> Predice enfermedad cardiovascular y síndrome metabólico</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Validación epidemiológica:</strong> Ampliamente utilizado en estudios poblacionales</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Complementario:</strong> Funciona bien junto con <a href="/absi/" className="text-info hover:underline transition-colors">ABSI</a>, <a href="/bri/" className="text-info hover:underline transition-colors">BRI</a> y otros índices</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Fácil de calcular:</strong> Solo requiere cintura, peso y altura</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Interpretación clara:</strong> CI &gt; 1.25 indica riesgo elevado</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del CI
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-success">CI &lt; 1.18 (Muy Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Distribución de grasa muy favorable, riesgo muy bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-info">CI 1.18-1.25 (Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Distribución de grasa saludable, riesgo bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">CI 1.25-1.30 (Moderado):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo moderado, requiere monitoreo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">CI 1.30-1.35 (Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo elevado, requiere intervención</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-destructive">CI &gt; 1.35 (Muy Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo muy elevado, requiere atención médica</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                CI y Síndrome Metabólico
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Componentes del síndrome metabólico:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• <strong>Obesidad abdominal:</strong> CI evalúa esto directamente</li>
                    <li>• <strong>Hipertensión:</strong> Mayor riesgo con CI elevado</li>
                    <li>• <strong>Glucosa elevada:</strong> Resistencia a insulina asociada</li>
                    <li>• <strong>Triglicéridos altos:</strong> Dislipidemia relacionada</li>
                    <li>• <strong>HDL bajo:</strong> Colesterol bueno reducido</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">CI como predictor:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• CI &gt; 1.25 predice síndrome metabólico con alta sensibilidad</li>
                    <li>• Complementa evaluación de presión arterial y glucosa</li>
                    <li>• Útil para screening poblacional de riesgo metabólico</li>
                    <li>• Puede identificar riesgo antes que aparezcan síntomas</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmula Científica del CI
              </h3>
              <div className="bg-card p-4 rounded-lg border-2 border-info">
                <h4 className="font-semibold text-foreground mb-2">Fórmula CI (Valdez, 1991):</h4>
                <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                  <p>CI = WC / (0.109 × √(weight/height))</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Donde:
                  <br />• WC = Circunferencia de cintura (en metros)
                  <br />• weight = Peso (en kg)
                  <br />• height = Altura (en metros)
                  <br />
                  <br />El CI compara la circunferencia de cintura observada con la circunferencia esperada de un cilindro
                  con el mismo peso y altura. Un CI &gt; 1.25 indica que la cintura es mayor de lo esperado, sugiriendo
                  acumulación de grasa abdominal y mayor riesgo cardiovascular.
                </p>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre CI</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre CI y otros índices de forma corporal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El CI evalúa específicamente la distribución de grasa abdominal comparando la cintura con la esperada
                    para un cilindro. El <a href="/absi/" className="text-info hover:underline transition-colors">ABSI</a> predice mortalidad,
                    el <a href="/bri/" className="text-info hover:underline transition-colors">BRI</a> predice riesgo metabólico, y el CI
                    evalúa distribución de grasa. Todos son complementarios y pueden usarse juntos para una evaluación más completa.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi CI?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Reducir la circunferencia de cintura es clave. Esto se logra mediante: (1) Ejercicio cardiovascular regular
                    (150+ min/semana), (2) Entrenamiento de fuerza 2-3 veces por semana, (3) Déficit calórico moderado
                    (300-500 kcal/día), (4) Dieta rica en fibra y proteína, (5) Reducción de azúcares refinados. Consulta nuestra
                    <a href="/tdee/" className="text-info hover:underline transition-colors"> calculadora de TDEE</a> para planificar tu déficit.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿El CI reemplaza al IMC?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <strong>No.</strong> El CI complementa al IMC. Mientras que el IMC evalúa peso corporal general,
                    el CI proporciona información sobre distribución de grasa abdominal. Ambos índices juntos ofrecen
                    una evaluación más completa. Consulta también nuestra <a href="/imc/" className="text-info hover:underline transition-colors">calculadora de IMC</a>.
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
                  <span><strong><a href="/absi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de ABSI:</a></strong> Complementa el CI con predicción de mortalidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/bri/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de BRI:</a></strong> Complementa el CI con predicción de riesgo metabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whtr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de WHtR:</a></strong> Ratio cintura-altura para evaluación de riesgo cardiometabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de WHR:</a></strong> Ratio cintura-cadera para análisis de distribución de grasa</span>
                </li>
              </ul>
            </section>

            <RelatedCalculators currentPage="/ci" />

            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            <SocialShare
              title="Calculadora CI - Conicity Index | Distribución Grasa Abdominal"
              url="https://nutrifit-calculator.com/ci/"
              description="Calculadora profesional de CI según fórmula Valdez. Evalúa distribución de grasa abdominal y predice riesgo cardiovascular y metabólico."
            />

            <CalculatorNavigation currentCalculator="ci" />
          </article>
        </main>
      </Container>
    </>
  );
}
