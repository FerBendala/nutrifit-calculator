import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { RMRCalculator } from './RMRCalculator';

export default function RMRPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="rmr" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora RMR – Tasa Metabólica en Reposo
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu RMR (Tasa Metabólica en Reposo) con 3 fórmulas científicas.
              Descubre cuántas calorías quemas en reposo considerando actividades diarias ligeras. Más práctico que el BMR.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>RMR (Resting Metabolic Rate)</strong> mide las calorías que quemas en reposo completo, similar al BMR
                pero bajo condiciones menos estrictas. Desarrollado con fórmulas{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">
                  Mifflin-St Jeor (1990)
                </a>,{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/6741850/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">
                  Harris-Benedict revisada (1984)
                </a>{' '}
                y Katch-McArdle. Estudios recientes en{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8308339/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">
                  poblaciones diversas
                </a>{' '}
                confirman su precisión para planificación nutricional.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A diferencia del BMR que requiere ayuno de 12 horas y ambiente controlado, el RMR es más práctico para mediciones
                diarias y ajustes nutricionales. Representa el 60-75% de tu gasto energético total.
              </p>
            </div>
          </section>

          <RMRCalculator />

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Información Completa sobre el RMR
              </h2>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    Ventajas del RMR
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Más práctico que BMR:</strong> No requiere ayuno de 12 horas ni laboratorio - <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">validación científica</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>3 fórmulas validadas:</strong> Comparación automática para mayor precisión</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Base para planificación:</strong> Calcula necesidades calóricas totales según actividad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Seguimiento metabólico:</strong> Detecta cambios en metabolismo con el tiempo</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    RMR vs BMR: Diferencias Clave
                  </h3>
                </header>
                <div className="p-6">
                  <div className="space-y-3 text-sm text-foreground/90">
                    <div className="p-3 bg-warning-subtle rounded-lg">
                      <p className="font-semibold mb-1">🔬 BMR (Basal Metabolic Rate)</p>
                      <p>Medición en laboratorio, ayuno 12h, temperatura controlada, máxima precisión científica</p>
                    </div>
                    <div className="p-3 bg-warning-subtle rounded-lg">
                      <p className="font-semibold mb-1">💪 RMR (Resting Metabolic Rate)</p>
                      <p>Condiciones menos estrictas, más práctico, usualmente 5-10% mayor que BMR</p>
                    </div>
                    <div className="p-3 bg-warning-subtle rounded-lg">
                      <p className="font-semibold mb-1">📊 Diferencia Típica</p>
                      <p>RMR suele ser 50-100 kcal mayor que BMR debido a condiciones menos restrictivas</p>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  Fórmulas Científicas del RMR
                </h3>
              </header>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg border-2 border-info">
                    <h4 className="font-semibold text-foreground mb-2">1. Mifflin-St Jeor (1990)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>Hombres: 10×peso + 6.25×altura - 5×edad + 5</p>
                      <p>Mujeres: 10×peso + 6.25×altura - 5×edad - 161</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Considerada la más precisa para población general moderna</p>
                  </div>

                  <div className="bg-card p-4 rounded-lg border-2 border-info">
                    <h4 className="font-semibold text-foreground mb-2">2. Harris-Benedict Revisada (1984)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>Hombres: 88.362 + (13.397×peso) + (4.799×altura) - (5.677×edad)</p>
                      <p>Mujeres: 447.593 + (9.247×peso) + (3.098×altura) - (4.330×edad)</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Fórmula clásica actualizada por Roza & Shizgal</p>
                  </div>

                  <div className="bg-card p-4 rounded-lg border-2 border-info">
                    <h4 className="font-semibold text-foreground mb-2">3. Katch-McArdle (1996)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>RMR = 370 + (21.6 × masa magra en kg)</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Máxima precisión cuando conoces tu composición corporal - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8308339/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">evidencia clínica</a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90">
                  Complementa tu evaluación metabólica
                </h3>
              </header>
              <div className="p-6">
                <ul className="space-y-3 text-foreground/90">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/bmr/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Calcula tu BMR preciso:
                        </a>
                      </strong>{' '}
                      Metabolismo basal con 3 fórmulas científicas en condiciones basales
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Calcula tu TDEE completo:
                        </a>
                      </strong>{' '}
                      Gasto energético total diario incluyendo toda tu actividad
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Mide tu composición corporal:
                        </a>
                      </strong>{' '}
                      Masa magra y grasa para usar Katch-McArdle con máxima precisión
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Ajusta tu proteína diaria:
                        </a>
                      </strong>{' '}
                      Necesidades específicas según tu RMR y objetivos
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre RMR</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿En qué se diferencia el RMR del BMR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El RMR (Resting Metabolic Rate) incluye el gasto de actividades ligeras como estar sentado,
                    mientras que el <a href="/bmr/" className="text-info hover:underline transition-colors">BMR</a> (Basal Metabolic Rate)
                    mide el gasto en reposo absoluto. El RMR es típicamente 10-20% mayor que el BMR y más práctico para planificar dietas.
                    Usa tu RMR como base para calcular tu <a href="/tdee/" className="text-info hover:underline transition-colors">gasto calórico total (TDEE)</a>.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué fórmula debo usar para calcular mi RMR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La fórmula Mifflin-St Jeor es la más precisa para la mayoría de personas.
                    Si conoces tu porcentaje de <a href="/grasa-corporal/" className="text-info hover:underline transition-colors">grasa corporal</a>,
                    la fórmula Katch-McArdle puede ser más precisa al basarse en tu masa magra real.
                  </p>
                </article>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="rmr" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora RMR Médica - Tasa Metabólica en Reposo"
            url="https://nutrifit-calculator.com/rmr/"
            description="Calcula tu RMR con 3 fórmulas científicas validadas. Gasto energético en reposo más práctico que BMR. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="rmr" />
        </main>
      </Container>
    </>
  );
}
