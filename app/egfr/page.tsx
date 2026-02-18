import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Gauge, Info } from 'lucide-react';
import { EGFRCalculator } from './EGFRCalculator';

export default function EGFRPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="egfr" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora eGFR – Filtrado Glomerular y Función Renal
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica de filtrado glomerular estimado (eGFR) con fórmulas CKD-EPI, MDRD y Cockcroft-Gault.
              Estadificación de enfermedad renal crónica (ERC) y ajuste de dosis de medicamentos. Para profesionales de la salud.
            </p>
          </header>

          <EGFRCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el eGFR (Filtrado Glomerular Estimado)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El eGFR estima la tasa de filtración glomerular, es decir, la capacidad de los riñones para filtrar la sangre.
                Se calcula a partir de la creatinina sérica, edad, sexo y, en algunas ecuaciones, raza. Se utiliza para detectar
                y estadificar la enfermedad renal crónica (ERC), ajustar dosis de medicamentos y planificar seguimiento.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Gauge className="w-5 h-5 mr-3 text-teal-600" />
                  Estadios ERC (KDIGO)
                </h3>
                <div className="space-golden-sm text-sm">
                  <div className="bg-success-subtle p-3 rounded-lg"><strong>G1:</strong> ≥90 — Normal o alto</div>
                  <div className="bg-success-subtle p-3 rounded-lg"><strong>G2:</strong> 60-89 — Leve</div>
                  <div className="bg-warning-subtle p-3 rounded-lg"><strong>G3a:</strong> 45-59 — Leve-moderado</div>
                  <div className="bg-warning-subtle p-3 rounded-lg"><strong>G3b:</strong> 30-44 — Moderado-severo</div>
                  <div className="bg-destructive-subtle p-3 rounded-lg"><strong>G4:</strong> 15-29 — Severo</div>
                  <div className="bg-destructive-subtle p-3 rounded-lg"><strong>G5:</strong> &lt;15 — Enfermedad renal terminal</div>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Fórmulas utilizadas
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong>CKD-EPI (2009):</strong> Recomendada en guías; más precisa en GFR normales o altos.</li>
                  <li><strong>MDRD-4:</strong> Ecuación de 4 variables; referencia histórica.</li>
                  <li><strong>Cockcroft-Gault:</strong> Clearance de creatinina (mL/min), útil para ajuste de dosis de fármacos.</li>
                </ul>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <Info className="w-5 h-5 mr-3" />
                Limitaciones y uso clínico
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                El eGFR es una estimación, no una medida directa del GFR. Puede ser menos preciso en extremos de edad, masa muscular muy alta o baja, embarazo, y en algunas etnias. La ecuación CKD-EPI 2009 incluye un coeficiente racial; la ecuación CKD-EPI 2021 (sin raza) está siendo adoptada en muchas guías. Los resultados deben interpretarse siempre en contexto clínico y con un profesional de la salud. No sustituye la valoración médica ni el seguimiento por nefrología cuando está indicado.
              </p>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿En qué unidades debe estar la creatinina?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Esta calculadora usa creatinina en mg/dL (unidades habituales en España e Hispanoamérica). Si tu analítica está en µmol/L, divide el valor entre 88.4 para obtener mg/dL.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué aparece el factor raza?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Las ecuaciones CKD-EPI y MDRD 2009 incluyen un coeficiente para personas de origen afroamericano/raza negra porque en los estudios de validación se observaron diferencias en la relación creatinina-GFR. La ecuación CKD-EPI 2021, recomendada por NKF/ASN, ya no incluye raza.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Para qué sirve el Cockcroft-Gault?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">El clearance de creatinina (Cockcroft-Gault) se usa sobre todo para ajustar la dosis de medicamentos que se eliminan por el riñón. No está estandarizado a superficie corporal (1.73 m²) como el eGFR.</p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/egfr" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Filtrado Glomerular (eGFR) - Función Renal"
            url="https://nutrifit-calculator.com/egfr/"
            description="Calcula tu eGFR con CKD-EPI y MDRD. Estadificación de enfermedad renal crónica y Cockcroft-Gault para ajuste de dosis."
          />
          <CalculatorNavigation currentCalculator="egfr" />
        </main>
      </Container>
    </>
  );
}
