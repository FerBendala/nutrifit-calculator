import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { ComposicionCalculator } from './ComposicionCalculator';

export default function ComposicionPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="composicion" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Composición Corporal – Grasa, Músculo y Más
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu composición corporal completa con el método Navy validado científicamente.
              Obtén tu porcentaje de grasa, masa magra y ratio cintura-cadera usando solo medidas simples.
            </p>
          </header>

          <ComposicionCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu composición corporal y grasa corporal
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La composición corporal es más importante que el peso total. Conocer tu porcentaje de grasa
                y masa magra te permite optimizar tu entrenamiento y nutrición de forma más efectiva.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Método Navy
                </h3>
                <p className="text-muted-foreground leading-[1.618]">
                  Utilizamos el método de la Marina de EE.UU., validado científicamente y utilizado
                  por organizaciones militares. Solo requiere medidas simples con cinta métrica
                  y tiene una precisión del ±3-4% comparado con métodos más costosos.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Importancia de la composición
                </h3>
                <p className="text-muted-foreground leading-[1.618]">
                  Dos personas pueden pesar lo mismo pero tener composiciones muy diferentes.
                  Mayor masa magra significa mayor metabolismo, mejor rendimiento físico y
                  mejor salud metabólica general.
                </p>
              </article>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📋</span>
                Rangos de grasa corporal saludable
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">👨</span>
                    Hombres
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex justify-between">
                      <span>Esencial:</span>
                      <span className="font-medium">2-5%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Atlético:</span>
                      <span className="font-medium">6-13%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fitness:</span>
                      <span className="font-medium">14-17%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Aceptable:</span>
                      <span className="font-medium">18-24%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obesidad:</span>
                      <span className="font-medium">25%+</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-pink-700 flex items-center">
                    <span className="text-lg mr-2">👩</span>
                    Mujeres
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex justify-between">
                      <span>Esencial:</span>
                      <span className="font-medium">10-13%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Atlético:</span>
                      <span className="font-medium">14-20%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fitness:</span>
                      <span className="font-medium">21-24%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Aceptable:</span>
                      <span className="font-medium">25-31%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obesidad:</span>
                      <span className="font-medium">32%+</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Cómo mejorar tu composición corporal
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Para reducir grasa corporal:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Déficit calórico moderado (300-500 kcal/día)</li>
                    <li>• Entrenamiento de fuerza 3-4x/semana</li>
                    <li>• Cardio moderado 2-3x/semana</li>
                    <li>• <a href="/proteina/" className="text-info hover:underline transition-colors font-medium">Proteína alta</a> (2.0-2.4g/kg)</li>
                    <li>• Sueño de calidad (7-9 horas)</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">💪</span>
                    Para ganar masa magra:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Ligero superávit calórico (200-400 kcal/día)</li>
                    <li>• Entrenamiento de fuerza progresivo</li>
                    <li>• <a href="/proteina/" className="text-info hover:underline transition-colors font-medium">Proteína óptima</a> (1.6-2.2g/kg)</li>
                    <li>• Carbohidratos post-entrenamiento</li>
                    <li>• Descanso adecuado entre sesiones</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📏</span>
                Ratio Cintura-Cadera: Indicador de salud
              </h3>
              <p className="text-sm text-foreground mb-[1rem] leading-[1.618]">
                El ratio cintura-cadera es un indicador importante del riesgo cardiovascular y metabólico.
                La grasa abdominal (visceral) es más peligrosa que la grasa en caderas y muslos.
              </p>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info">Hombres</h4>
                  <ul className="text-sm space-golden-xs">
                    <li className="flex justify-between">
                      <span>Bajo riesgo:</span>
                      <span className="text-success font-medium">&lt; 0.90</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Riesgo moderado:</span>
                      <span className="text-warning font-medium">0.90 - 0.95</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Alto riesgo:</span>
                      <span className="text-destructive font-medium">&gt; 0.95</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-pink-700">Mujeres</h4>
                  <ul className="text-sm space-golden-xs">
                    <li className="flex justify-between">
                      <span>Bajo riesgo:</span>
                      <span className="text-success font-medium">&lt; 0.80</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Riesgo moderado:</span>
                      <span className="text-warning font-medium">0.80 - 0.85</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Alto riesgo:</span>
                      <span className="text-destructive font-medium">&gt; 0.85</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Cómo tomar las medidas correctamente
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning">Tips para medición precisa:</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mide en ayunas por la mañana</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Usa cinta métrica flexible pero no elástica</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mantén la cinta firme pero sin apretar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Respira normalmente durante la medición</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Toma 2-3 medidas y promedia</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning">Puntos de medición específicos:</h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Cintura:</strong> Parte más estrecha del torso</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Cuello:</strong> Justo debajo de la nuez de Adán</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Cadera:</strong> Parte más ancha de las caderas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mantén la postura erguida y natural</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es preciso el método Navy comparado con otros métodos?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El método Navy tiene una precisión del ±3-4% comparado con métodos gold standard como DEXA.
                    Es más preciso que bioimpedancia y mucho más accesible que hidrodensitometría.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo medir mi composición corporal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Cada 2-4 semanas es suficiente para ver cambios significativos. Los cambios en composición
                    corporal son graduales, especialmente la ganancia de masa magra.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué mi porcentaje de grasa es diferente a mi <a href="/imc/" className="text-info hover:underline transition-colors">IMC</a>?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El IMC solo considera peso y altura, no distingue entre músculo y grasa. Una persona
                    musculosa puede tener IMC alto pero bajo porcentaje de grasa. La composición corporal
                    es un indicador más preciso de salud y fitness.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Optimiza tu plan nutricional según tu composición
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus macros personalizados:</a></strong> Ajusta proteínas, grasas y carbohidratos según tu composición actual</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/rmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu RMR con Katch-McArdle:</a></strong> Usa tu masa magra para metabolismo basal más preciso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/ffmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu FFMI muscular avanzado:</a></strong> Índice preciso de desarrollo muscular para atletas serios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/fmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu FMI metabólico:</a></strong> Índice avanzado de masa grasa independiente de altura</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Determina tu gasto calórico:</a></strong> La masa magra influye directamente en tu metabolismo basal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula según tu masa magra para preservar músculo durante pérdida de grasa</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/composicion" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/composicion/"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="composicion" />
          </article>
        </main>
      </Container>
    </>
  );
}
