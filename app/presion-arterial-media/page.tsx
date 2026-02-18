import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Activity, AlertTriangle, CheckCircle, HeartPulse, Info, Stethoscope } from 'lucide-react';
import { PresionArterialCalculator } from './PresionArterialCalculator';

export default function PresionArterialMediaPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="presion-arterial-media" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Presión Arterial Media (MAP) – Evaluación Cardiovascular
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica de presión arterial media (MAP) para evaluación de perfusión de órganos
              y riesgo cardiovascular. Interpretación clínica según guías AHA/ACC. Herramienta para profesionales de la salud.
            </p>
          </header>

          <PresionArterialCalculator />

          {/* Contenido educativo */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Presión Arterial Media (MAP)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La presión arterial media (MAP) es un indicador crítico de la perfusión de órganos vitales.
                Representa la presión promedio en las arterias durante un ciclo cardíaco completo y es esencial
                para mantener el flujo sanguíneo adecuado a órganos como el cerebro, corazón y riñones.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <HeartPulse className="w-5 h-5 mr-3 text-destructive" />
                  Fórmula de Cálculo
                </h3>
                <div className="bg-info-subtle p-4 rounded-lg mb-3">
                  <p className="text-sm font-mono text-foreground mb-2">
                    MAP = DBP + (1/3)(SBP - DBP)
                  </p>
                  <p className="text-sm font-mono text-foreground">
                    MAP = (2 × DBP + SBP) / 3
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Donde <strong>SBP</strong> es la presión sistólica y <strong>DBP</strong> es la presión diastólica.
                  Esta fórmula refleja que la presión diastólica representa aproximadamente 2/3 del ciclo cardíaco,
                  mientras que la presión sistólica representa 1/3.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-success" />
                  Rango Normal
                </h3>
                <div className="space-golden-sm">
                  <div className="bg-success-subtle p-4 rounded-lg">
                    <p className="text-lg font-bold text-success mb-1">70-100 mmHg</p>
                    <p className="text-sm text-success">Rango normal para perfusión adecuada de órganos</p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>&lt;70 mmHg:</strong> Hipotensión - Perfusión comprometida</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span><strong>70-100 mmHg:</strong> Normal - Perfusión óptima</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>&gt;100 mmHg:</strong> Hipertensión - Riesgo cardiovascular</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <Stethoscope className="w-5 h-5 mr-3" />
                Importancia Clínica de la MAP
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <HeartPulse className="w-4 h-4 mr-2" />
                    Perfusión de Órganos
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    La MAP es el principal determinante del flujo sanguíneo a órganos vitales.
                    Un MAP adecuado (70-100 mmHg) asegura que el cerebro, corazón y riñones
                    reciban suficiente oxígeno y nutrientes.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Evaluación de Shock
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    En situaciones de emergencia, un MAP &lt;65 mmHg se considera indicador de shock
                    y requiere intervención inmediata para restaurar la perfusión de órganos.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitoreo Continuo
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    En unidades de cuidados intensivos, la MAP se monitorea continuamente para
                    evaluar la respuesta al tratamiento y prevenir daño orgánico.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Riesgo Cardiovascular
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Un MAP elevado (&gt;100 mmHg) aumenta el riesgo de enfermedad cardiovascular,
                    accidente cerebrovascular y daño a órganos diana a largo plazo.
                  </p>
                </article>
              </div>
            </section>

            <section className="card-golden-lg mb-[2.618rem]">
              <h3 className="text-2xl font-semibold mb-[1.618rem] flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-warning" />
                Categorías de Presión Arterial (AHA/ACC 2017)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold">Categoría</th>
                      <th className="text-left p-3 font-semibold">Sistólica (mmHg)</th>
                      <th className="text-left p-3 font-semibold">Diastólica (mmHg)</th>
                      <th className="text-left p-3 font-semibold">MAP Típico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border bg-success-subtle">
                      <td className="p-3 font-semibold text-success">Normal</td>
                      <td className="p-3">&lt;120</td>
                      <td className="p-3">&lt;80</td>
                      <td className="p-3">70-93</td>
                    </tr>
                    <tr className="border-b border-border bg-warning-subtle">
                      <td className="p-3 font-semibold text-warning">Elevada</td>
                      <td className="p-3">120-129</td>
                      <td className="p-3">&lt;80</td>
                      <td className="p-3">93-97</td>
                    </tr>
                    <tr className="border-b border-border bg-warning-subtle">
                      <td className="p-3 font-semibold text-warning">Hipertensión Estadio 1</td>
                      <td className="p-3">130-139</td>
                      <td className="p-3">80-89</td>
                      <td className="p-3">97-106</td>
                    </tr>
                    <tr className="border-b border-border bg-destructive-subtle">
                      <td className="p-3 font-semibold text-foreground">Hipertensión Estadio 2</td>
                      <td className="p-3">≥140</td>
                      <td className="p-3">≥90</td>
                      <td className="p-3">≥107</td>
                    </tr>
                    <tr className="bg-destructive-subtle">
                      <td className="p-3 font-semibold text-foreground/90">Crisis Hipertensiva</td>
                      <td className="p-3">&gt;180</td>
                      <td className="p-3">&gt;120</td>
                      <td className="p-3">&gt;140</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas Frecuentes (FAQ)</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué es importante la MAP?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La MAP es crucial porque representa la presión promedio que impulsa la sangre a través
                    del sistema circulatorio. Un MAP adecuado asegura que los órganos vitales reciban
                    suficiente flujo sanguíneo y oxígeno.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre MAP y presión arterial normal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La presión arterial normal (SBP/DBP) muestra los valores máximos y mínimos durante
                    el ciclo cardíaco. La MAP calcula el promedio, que es más útil para evaluar la
                    perfusión de órganos y el riesgo cardiovascular a largo plazo.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué significa un MAP bajo?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Un MAP &lt;70 mmHg indica hipotensión y puede comprometer la perfusión de órganos,
                    especialmente el cerebro y los riñones. Puede causar síntomas como mareos, fatiga,
                    confusión y, en casos severos, shock.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi MAP?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para un MAP elevado: dieta baja en sodio (DASH), ejercicio regular, mantener peso
                    saludable, limitar alcohol, gestionar estrés y tomar medicación según prescripción médica.
                    Para un MAP bajo: consultar con médico para identificar la causa subyacente.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/presion-arterial-media" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          <SocialShare
            title="Calculadora de Presión Arterial Media (MAP) - Evaluación Cardiovascular"
            url="https://nutrifit-calculator.com/presion-arterial-media/"
            description="Calcula tu presión arterial media (MAP) para evaluación de perfusión de órganos y riesgo cardiovascular según guías AHA/ACC. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="presion-arterial-media" />
        </main>
      </Container>
    </>
  );
}
