import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { GrasaVisceralCalculator } from './GrasaVisceralCalculator';

export default function GrasaVisceralPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="grasa-visceral" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Grasa Visceral – Riesgo Según Tu Grasa Interna
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu nivel de grasa visceral (la grasa que rodea tus órganos internos) con 2 fórmulas científicas validadas.
              Evalúa tu riesgo metabólico y cardiovascular. Descubre si tu grasa visceral está en niveles saludables.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                La <strong>grasa visceral (VAT - Visceral Adipose Tissue)</strong> es el tejido adiposo que rodea
                los órganos internos del abdomen (hígado, páncreas, intestinos). A diferencia de la grasa subcutánea,
                la grasa visceral es metabólicamente activa y se asocia con mayor riesgo de síndrome metabólico,
                diabetes tipo 2, enfermedad cardiovascular y esteatosis hepática (hígado graso).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Esta calculadora utiliza dos fórmulas científicas validadas: <strong>Lee et al. (2008)</strong> y
                <strong> Ryo et al. (2005)</strong> para estimar el área de grasa visceral. Es complementaria a otras
                calculadoras de distribución de grasa como <a href="/ci/" className="text-info hover:underline transition-colors">CI</a>,
                <a href="/bri/" className="text-info hover:underline transition-colors">BRI</a>, <a href="/absi/" className="text-info hover:underline transition-colors">ABSI</a> y
                <a href="/whtr/" className="text-info hover:underline transition-colors">WHtR</a>.
              </p>
            </div>
          </section>

          <GrasaVisceralCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué la grasa visceral es peligrosa?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La grasa visceral es el tejido adiposo que rodea los órganos internos del abdomen. A diferencia de la
                grasa subcutánea (debajo de la piel), la grasa visceral es metabólicamente activa y produce sustancias
                que pueden aumentar el riesgo de enfermedades crónicas.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Diferencias: Grasa Visceral vs Subcutánea
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Grasa visceral:</strong> Rodea órganos internos, metabólicamente activa, más peligrosa</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Grasa subcutánea:</strong> Debajo de la piel, menos activa metabólicamente, menos peligrosa</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Producción de citoquinas:</strong> La grasa visceral produce sustancias inflamatorias</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Resistencia a insulina:</strong> Mayor asociación con resistencia a la insulina</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Riesgo cardiovascular:</strong> Mayor asociación con enfermedad cardiovascular</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Hígado graso:</strong> Puede contribuir a esteatosis hepática</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del VAT
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-success">VAT &lt; 100 cm² (Muy Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Grasa visceral en rango óptimo, riesgo muy bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-info">VAT 100-130 cm² (Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Grasa visceral en rango saludable, riesgo bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">VAT 130-160 cm² (Moderado):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo moderado, requiere monitoreo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">VAT 160-200 cm² (Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo elevado, requiere intervención</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-destructive">VAT &gt; 200 cm² (Muy Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo muy elevado, requiere atención médica</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                Grasa Visceral y Enfermedades
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Enfermedades asociadas:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• <strong>Síndrome metabólico:</strong> Mayor riesgo con VAT elevado</li>
                    <li>• <strong>Diabetes tipo 2:</strong> Resistencia a insulina asociada</li>
                    <li>• <strong>Enfermedad cardiovascular:</strong> Mayor riesgo de infarto y accidente cerebrovascular</li>
                    <li>• <strong>Hipertensión arterial:</strong> Asociación con presión arterial elevada</li>
                    <li>• <strong>Esteatosis hepática:</strong> Hígado graso no alcohólico</li>
                    <li>• <strong>Dislipidemia:</strong> Colesterol y triglicéridos elevados</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Mecanismos de acción:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Producción de citoquinas inflamatorias (TNF-α, IL-6)</li>
                    <li>• Liberación de ácidos grasos libres al hígado</li>
                    <li>• Resistencia a la insulina y disfunción metabólica</li>
                    <li>• Alteración del perfil lipídico</li>
                    <li>• Aumento de presión arterial</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmulas Científicas Utilizadas
              </h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Fórmula Lee et al. (2008):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>VAT = -266.4 + (0.67 × edad) + (0.68 × IMC) + (11.4 × género) - (0.08 × IMC × edad)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde género: 0 para mujer, 1 para hombre. Esta fórmula utiliza IMC, edad y género para estimar
                    el área de grasa visceral en cm². Validada en poblaciones asiáticas y occidentales.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Fórmula Ryo et al. (2005):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>VAT = 0.0001 × (WC² × IMC × edad × factor_género)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde WC es circunferencia de cintura en cm, factor_género: 1.0 para hombre, 0.9 para mujer.
                    Esta fórmula incorpora la circunferencia de cintura, proporcionando una estimación más precisa
                    basada en medidas abdominales.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre grasa visceral</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo reducir mi grasa visceral?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Reducir la grasa visceral requiere: (1) Ejercicio cardiovascular regular (150+ min/semana),
                    (2) Entrenamiento de fuerza 2-3 veces por semana, (3) Déficit calórico moderado (300-500 kcal/día),
                    (4) Dieta rica en fibra y proteína, (5) Reducción de azúcares refinados y alcohol. Consulta nuestra
                    <a href="/tdee/" className="text-info hover:underline transition-colors"> calculadora de TDEE</a> para planificar tu déficit.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿La grasa visceral es más peligrosa que la grasa subcutánea?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <strong>Sí.</strong> La grasa visceral es metabólicamente activa y produce sustancias inflamatorias
                    que aumentan el riesgo de enfermedades. La grasa subcutánea es menos activa y menos asociada con
                    complicaciones metabólicas. Por eso es importante evaluar la distribución de grasa, no solo la cantidad total.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo se mide la grasa visceral con precisión?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Las técnicas más precisas son: (1) <strong>CT scan</strong> o <strong>MRI</strong> - medición directa,
                    (2) <strong>DEXA</strong> - estimación de composición corporal, (3) <strong>Bioimpedancia avanzada</strong> - estimación indirecta.
                    Las fórmulas utilizadas en esta calculadora proporcionan una estimación útil basada en medidas antropométricas,
                    pero para diagnóstico médico se recomienda usar técnicas de imagen.
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
                  <span><strong><a href="/ci/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de CI:</a></strong> Complementa el VAT con evaluación de distribución de grasa abdominal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/bri/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de BRI:</a></strong> Complementa el VAT con predicción de riesgo metabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whtr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de WHtR:</a></strong> Ratio cintura-altura para evaluación de riesgo cardiometabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de Grasa Corporal:</a></strong> Porcentaje total de grasa corporal</span>
                </li>
              </ul>
            </section>

            <RelatedCalculators currentPage="/grasa-visceral" />

            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            <SocialShare
              title="Calculadora Grasa Visceral - VAT | Tejido Adiposo Visceral"
              url="https://nutrifit-calculator.com/grasa-visceral/"
              description="Calculadora profesional de grasa visceral con 2 fórmulas científicas. Estima tejido adiposo visceral y predice riesgo metabólico y cardiovascular."
            />

            <CalculatorNavigation currentCalculator="grasa-visceral" />
          </article>
        </main>
      </Container>
    </>
  );
}
