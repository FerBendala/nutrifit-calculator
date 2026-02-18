import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { Bone, CheckCircle, Info, Shield, TrendingDown, AlertTriangle } from 'lucide-react';
import { DensidadOseaCalculator } from './DensidadOseaCalculator';

export default function DensidadOseaPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="densidad-osea" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Densidad Ósea (BMD) – T-Score y Osteoporosis
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica de densidad mineral ósea (BMD) para evaluación de osteoporosis según criterios WHO.
              Calcula T-Score y Z-Score. Evalúa riesgo de fracturas. Para profesionales de la salud.
            </p>
          </header>

          <DensidadOseaCalculator />

          {/* Contenido educativo */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Densidad Ósea (BMD)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La densidad mineral ósea (BMD) es una medida de la cantidad de mineral óseo por unidad 
                de área. Se utiliza para diagnosticar osteoporosis y evaluar el riesgo de fracturas. 
                El T-Score compara tu densidad ósea con la de un adulto joven saludable, mientras que 
                el Z-Score compara con personas de tu misma edad.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Bone className="w-5 h-5 mr-3 text-warning" />
                  Criterios WHO
                </h3>
                <div className="space-golden-sm">
                  <div className="bg-success-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-success mb-1">Normal:</p>
                    <p className="text-sm text-success">T-Score ≥ -1.0</p>
                  </div>
                  <div className="bg-warning-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-warning mb-1">Osteopenia:</p>
                    <p className="text-sm text-warning">T-Score entre -1.0 y -2.5</p>
                  </div>
                  <div className="bg-warning-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-warning mb-1">Osteoporosis:</p>
                    <p className="text-sm text-warning">T-Score ≤ -2.5</p>
                  </div>
                  <div className="bg-destructive-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-foreground mb-1">Osteoporosis Severa:</p>
                    <p className="text-sm text-foreground/90">T-Score ≤ -2.5 + fractura</p>
                  </div>
                </div>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Importancia Clínica
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Diagnóstico de osteoporosis según criterios WHO</li>
                  <li>Evaluación del riesgo de fracturas</li>
                  <li>Monitoreo de la efectividad del tratamiento</li>
                  <li>Detección temprana de pérdida ósea</li>
                  <li>Guía para decisiones de tratamiento médico</li>
                </ul>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <Shield className="w-5 h-5 mr-3" />
                Prevención de Osteoporosis
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Nutrición
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Asegurar ingesta adecuada de calcio (1000-1500 mg/día) y vitamina D (800-1000 UI/día). 
                    Los lácteos, vegetales de hoja verde y pescado con espinas son excelentes fuentes de calcio.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Ejercicio
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ejercicio con carga de peso (caminar, correr, entrenamiento de fuerza) ayuda a 
                    mantener y mejorar la densidad ósea. También son importantes los ejercicios de 
                    equilibrio para prevenir caídas.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Factores de Riesgo
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Evitar el tabaco, limitar el consumo de alcohol, mantener un peso saludable y 
                    evitar dietas extremas. Algunos medicamentos pueden afectar la densidad ósea.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Detección Temprana
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Las mujeres post-menopáusicas y hombres mayores de 70 años deben considerar 
                    realizarse un DXA scan. La detección temprana permite intervención antes de 
                    que ocurran fracturas.
                  </p>
                </article>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre densidad ósea</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué es el T-Score de densidad ósea?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El T-Score compara tu densidad ósea con la de un adulto joven sano.
                    Según la OMS: mayor a -1 es normal, entre -1 y -2.5 es osteopenia (pérdida moderada), y menor a -2.5 es osteoporosis.
                    La pérdida ósea suele ir acompañada de pérdida muscular; evalúa tu riesgo con nuestra
                    <a href="/sarcopenia/" className="text-info hover:underline transition-colors">calculadora de sarcopenia</a>.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Quién debe hacerse una densitometría ósea?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Se recomienda para mujeres mayores de 65 años, hombres mayores de 70, y personas con factores de riesgo
                    como menopausia precoz, uso prolongado de corticoides, fracturas previas o antecedentes familiares de osteoporosis.
                    El ejercicio de fuerza y una buena nutrición son clave; revisa tu
                    <a href="/edad-metabolica/" className="text-info hover:underline transition-colors"> edad metabólica</a> para
                    evaluar tu estado general de salud.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/densidad-osea" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Densidad Ósea (BMD) - Evaluación de Osteoporosis"
            url="https://nutrifit-calculator.com/densidad-osea/"
            description="Calcula tu densidad mineral ósea (BMD) y evalúa tu riesgo de osteoporosis según criterios WHO. Calcula T-Score y Z-Score. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="densidad-osea" />
        </main>
      </Container>
    </>
  );
}
