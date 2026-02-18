import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { PesoIdealCalculator } from './PesoIdealCalculator';

export default function PesoIdealPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="peso-ideal" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Peso Ideal – Tu Rango Saludable Según 5 Fórmulas
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu peso ideal según tu altura con 5 fórmulas científicas diferentes.
              Compara resultados y descubre tu rango de peso saludable con resultados personalizados al instante.
            </p>
          </header>

          <PesoIdealCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el Peso Ideal? Fórmulas científicas reconocidas
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El peso ideal es un concepto que se refiere al peso corporal que se considera óptimo
                para una persona según su altura, edad, sexo y estructura corporal. Aunque no existe
                un peso &quot;perfecto&quot; único, las <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">fórmulas científicas</a> nos ayudan a establecer rangos
                saludables de referencia basados en estudios epidemiológicos.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🧮</span>
                  Fórmulas Utilizadas
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Robinson (1983):</strong> Ampliamente utilizada en aplicaciones médicas</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Miller (1983):</strong> Popular en estudios epidemiológicos</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Devine (1974):</strong> Utilizada en cálculo de dosis de medicamentos</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Hamwi (1964):</strong> Fórmula clásica del ámbito médico estadounidense</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Peterson (2016):</strong> La más moderna y considerada más precisa</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Factores que Influyen
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span>Altura y estructura ósea</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4855948/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Composición corporal</a> (músculo vs grasa)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><a href="https://www.acsm.org/read-research/trending-topics-resource-pages/physical-activity-guidelines" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Nivel de actividad física</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span>Genética y hormonas individuales</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Fórmulas Científicas Detalladas
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">📚</span>
                    Fórmulas Clásicas:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>Robinson (1983):</strong> <a href="https://pubmed.ncbi.nlm.nih.gov/6865776/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Estudio original</a> - Ampliamente utilizada en aplicaciones médicas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span><strong>Miller (1983):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Estudios epidemiológicos</a> - Coeficientes ligeramente diferentes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Devine (1974):</strong> <a href="https://pubmed.ncbi.nlm.nih.gov/4843764/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Referencia médica</a> - Cálculo de dosis de medicamentos</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">⚡</span>
                    Fórmulas Modernas:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Hamwi (1964):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Comparación de fórmulas</a> - Ámbito médico estadounidense</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>Peterson (2016):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Estudio de validación</a> - Datos actuales y más precisa</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      <span><strong>Promedio:</strong> Estimación más equilibrada y confiable</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Limitaciones y Consideraciones Importantes
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🚫</span>
                    Limitaciones:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>No consideran la composición corporal individual</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Pueden no ser apropiadas para atletas o personas muy musculosas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>No tienen en cuenta condiciones médicas específicas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Las fórmulas más antiguas pueden estar desactualizadas</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">💡</span>
                    Recomendaciones:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Consulta con un <a href="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/healthy-weight/art-20045977" target="_blank" rel="noopener noreferrer" className="text-warning hover:underline font-medium">profesional de la salud</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Considera múltiples indicadores de salud</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Evalúa tu <a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">composición corporal</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Establece objetivos realistas y saludables</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas Frecuentes sobre el Peso Ideal</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué hay diferentes fórmulas de peso ideal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Cada fórmula fue desarrollada en diferentes épocas y contextos, con poblaciones
                    de estudio distintas. Algunas se enfocan en aplicaciones médicas, otras en
                    fitness, y cada una tiene sus propias ventajas y limitaciones.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la mejor fórmula para mí?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    No existe una fórmula &quot;mejor&quot; universalmente. El promedio de todas las fórmulas
                    suele proporcionar una estimación más equilibrada. Sin embargo, es importante
                    consultar con un profesional de la salud para una evaluación personalizada.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué hago si mi peso actual está muy lejos del ideal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Si hay una diferencia significativa, es recomendable consultar con un <a href="https://www.cdc.gov/healthyweight/assessing/index.html" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">médico</a>,
                    nutricionista o entrenador personal certificado. Ellos pueden ayudarte a
                    desarrollar un plan seguro y efectivo para alcanzar tus objetivos.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿El peso ideal es lo mismo que el peso saludable?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    No exactamente. El peso ideal es una estimación basada en fórmulas matemáticas,
                    mientras que el peso saludable considera factores individuales como composición
                    corporal, salud general, y objetivos personales.
                  </p>
                </article>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="peso-ideal" />

          {/* Sección de navegación mejorada */}
          <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
            <h3 className="font-bold text-foreground mb-[1.618rem] text-xl">
              Mejora tu evaluación de peso corporal
            </h3>
            <ul className="text-sm text-foreground/90 space-golden-xs">
              <li className="flex items-start">
                <span className="text-warning mr-2">•</span>
                <span><strong><a href="/peso-ajustado/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu Peso Ajustado Clínico:</a></strong> ABW para dosificación de medicamentos y necesidades nutricionales precisas</span>
              </li>
              <li className="flex items-start">
                <span className="text-warning mr-2">•</span>
                <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu IMC:</a></strong> Índice de masa corporal para contexto de salud general</span>
              </li>
              <li className="flex items-start">
                <span className="text-warning mr-2">•</span>
                <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula proteína necesaria:</a></strong> Basado en tu peso ideal o ajustado</span>
              </li>
              <li className="flex items-start">
                <span className="text-warning mr-2">•</span>
                <span><strong><a href="/bmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu BMR:</a></strong> Metabolismo basal para planificación calórica precisa</span>
              </li>
            </ul>
          </section>

          {/* Widget para embeber - genera backlinks naturales */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora de Peso Ideal - 5 Fórmulas Científicas"
            url="https://nutrifit-calculator.com/peso-ideal/"
            description="Calcula tu peso ideal con 5 fórmulas científicas reconocidas. Robinson, Miller, Devine, Hamwi y Peterson. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="peso-ideal" />
        </main>
      </Container>
    </>
  );
}
