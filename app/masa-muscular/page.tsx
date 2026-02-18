import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { MasaMuscularCalculator } from './MasaMuscularCalculator';

export default function MasaMuscularPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="masa-muscular" className="container-golden mb-4 pt-4" />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Masa Muscular – Cuántos Kilos de Músculo Tienes
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu masa muscular total e índice de masa muscular con la fórmula de Lee validada científicamente.
              Descubre cuántos kilogramos de músculo tienes y evalúa tu desarrollo muscular.
              Ideal para seguir tu progreso en el gym.
            </p>
          </header>

          <MasaMuscularCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Masa Muscular?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  La masa muscular es la cantidad total de tejido muscular en tu cuerpo,
                  incluyendo músculos esqueléticos, cardíacos y lisos. Es un componente
                  crucial de la <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">composición corporal</a> y está directamente relacionada con la fuerza, el metabolismo y la salud general.
                  Para calcularla con precisión, necesitas conocer tu <a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">porcentaje de grasa corporal</a>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestra calculadora utiliza la <a href="https://pubmed.ncbi.nlm.nih.gov/10919906/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">ecuación de Lee (2000)</a> para estimar la masa muscular esquelética, que es la más relevante para
                  el rendimiento físico y la salud metabólica.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Beneficios de la Masa Muscular
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Metabolismo acelerado:</strong> Quema más calorías en reposo - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios sobre metabolismo</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Fuerza y resistencia:</strong> Mejora el rendimiento físico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Salud ósea:</strong> Previene osteoporosis y fracturas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Regulación glucosa:</strong> Mejora la sensibilidad a la insulina</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Longevidad:</strong> Asociada con mayor esperanza de vida</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Factores que Afectan la Masa Muscular
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Edad:</strong> Disminuye naturalmente después de los 30 años</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Sexo:</strong> Los hombres tienen mayor masa muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento:</strong> Ejercicio de fuerza regular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Nutrición:</strong> Proteína adecuada y calorías suficientes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Genética:</strong> Factores hereditarios</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Cómo Interpretar los Resultados
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">Índice de Masa Muscular (IMM)</h4>
                    <p className="text-sm text-warning leading-relaxed">
                      El IMM se calcula dividiendo la masa muscular entre la altura al cuadrado (kg/m²).
                      Es una medida estandarizada que permite comparar entre diferentes personas.
                    </p>
                  </article>
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">Categorías de Referencia</h4>
                    <p className="text-sm text-warning leading-relaxed">
                      <strong>Excelente:</strong> Por encima del 90% de la población<br />
                      <strong>Bueno:</strong> Entre el 75-90% de la población<br />
                      <strong>Promedio:</strong> Entre el 25-75% de la población<br />
                      <strong>Bajo:</strong> Por debajo del 25% de la población
                    </p>
                  </article>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Estrategias para Aumentar la Masa Muscular
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-foreground/90 mb-3">Entrenamiento</h4>
                    <ul className="space-y-2 text-sm text-info">
                      <li>• Ejercicios compuestos (sentadillas, peso muerto, press)</li>
                      <li>• 3-4 sesiones por semana</li>
                      <li>• Progresión gradual de cargas</li>
                      <li>• 6-12 repeticiones por serie</li>
                      <li>• Descanso adecuado entre sesiones</li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold text-foreground/90 mb-3">Nutrición</h4>
                    <ul className="space-y-2 text-sm text-info">
                      <li>• 1.6-2.4g de proteína por kg de peso</li>
                      <li>• Calorías suficientes para el crecimiento</li>
                      <li>• Hidratación adecuada</li>
                      <li>• Timing de nutrientes post-entrenamiento</li>
                      <li>• Suplementos si es necesario</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu análisis de composición corporal
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/1rm/" className="text-info hover:underline transition-colors font-medium transition-golden">Planifica entrenamientos de fuerza:</a></strong> Optimiza cargas para máximo desarrollo muscular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/whr/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa distribución de grasa:</a></strong> El WHR complementa el análisis de composición corporal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/vo2max/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu capacidad cardiovascular:</a></strong> La masa muscular mejora la eficiencia del oxígeno</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/sarcopenia/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa riesgo de sarcopenia:</a></strong> Monitorea la pérdida muscular relacionada con la edad</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/ffmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu FFMI avanzado:</a></strong> Evalúa desarrollo muscular independiente de grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula tus necesidades basadas en masa magra</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/bmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Conoce tu metabolismo basal:</a></strong> La masa muscular aumenta el gasto calórico en reposo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus calorías:</a></strong> Ajusta tu alimentación para ganancia muscular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu grasa corporal:</a></strong> Métodos científicos para evaluar composición</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre masa muscular</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuánta masa muscular es normal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    En hombres, la masa muscular representa entre el 36-42% del peso corporal. En mujeres, entre el 29-35%.
                    Estos valores varían según edad, nivel de actividad física y genética.
                    Para una evaluación más detallada de tu desarrollo muscular, consulta nuestra
                    <a href="/ffmi/" className="text-info hover:underline transition-colors">calculadora FFMI</a>.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo se calcula la masa muscular?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La fórmula de Lee et al. (2000) estima la masa muscular esquelética a partir de altura, peso, sexo y etnia.
                    Es la más utilizada en investigación y se correlaciona bien con mediciones por DEXA.
                    Para maximizar tu masa muscular, asegura una
                    <a href="/proteina/" className="text-info hover:underline transition-colors"> ingesta óptima de proteína</a> y
                    planifica tu <a href="/tdee/" className="text-info hover:underline transition-colors">gasto calórico</a> correctamente.
                  </p>
                </article>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="masa-muscular" />

          {/* Widget para embeber - genera backlinks naturales */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora de Masa Muscular - Índice y Composición"
            url="https://nutrifit-calculator.com/masa-muscular/"
            description="Calcula tu masa muscular, índice de masa muscular y obtén recomendaciones para optimizar tu desarrollo muscular. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="masa-muscular" />
        </main>
      </Container>
    </>
  );
}
