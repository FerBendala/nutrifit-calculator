import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SocialShare } from '@/components/SocialShare';
import AguaCalculator from './AguaCalculator';

export default function AguaPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="agua" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Agua – Litros Exactos que Debes Beber al Día
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula cuánta agua debes beber al día según tu peso, actividad física y condiciones ambientales.
              Mantente bien hidratado con recomendaciones personalizadas basadas en estudios científicos.
            </p>
          </header>

          <AguaCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Importancia del agua diaria según peso corporal y ejercicio
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El agua constituye aproximadamente el 60% del peso corporal en adultos y es esencial
                para prácticamente todas las funciones fisiológicas. Una hidratación adecuada es
                fundamental para el rendimiento físico, cognitivo y la salud general.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">💪</span>
                  Funciones vitales del agua
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Regulación térmica:</strong> Sudoración y vasodilatación para controlar temperatura - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2903966/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios sobre termorregulación</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Transporte de nutrientes:</strong> El plasma sanguíneo es 90% agua - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC524030/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">función del plasma</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-muted-foreground mr-2">•</span>
                    <span><strong>Eliminación de toxinas:</strong> Riñones filtran 180L de sangre al día - <a href="https://www.kidney.org/atoz/content/kidneys-work" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">función renal</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Lubricación articular:</strong> El líquido sinovial protege las articulaciones</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Digestión:</strong> Saliva, jugos gástricos y bilis contienen agua</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Estructura celular:</strong> Mantiene la forma y función de las células</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  Niveles de deshidratación
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">Leve (1-2% peso corporal):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Sed, boca seca</li>
                      <li>• Reducción del rendimiento físico</li>
                      <li>• Orina más concentrada (amarilla)</li>
                    </ul>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">Moderada (3-5% peso corporal):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Fatiga, mareos, dolor de cabeza</li>
                      <li>• Reducción cognitiva significativa</li>
                      <li>• Piel menos elástica</li>
                    </ul>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-destructive">Severa (&gt;5% peso corporal):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Náuseas, vómitos</li>
                      <li>• Confusión, irritabilidad</li>
                      <li>• Riesgo de golpe de calor</li>
                    </ul>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Recomendaciones de hidratación según actividad
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">😴</span>
                    Sedentario:
                  </h4>
                  <p className="text-lg font-bold text-foreground/90 mb-[0.382rem]">30-35ml/kg peso</p>
                  <p className="text-xs text-info">Según las <a href="https://www.efsa.europa.eu/en/efsajournal/pub/1459" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">recomendaciones EFSA</a></p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">🏃</span>
                    Ejercicio moderado:
                  </h4>
                  <p className="text-lg font-bold text-foreground/90 mb-[0.382rem]">+500-750ml/hora</p>
                  <p className="text-xs text-info">Durante y después del ejercicio</p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">💪</span>
                    Ejercicio intenso:
                  </h4>
                  <p className="text-lg font-bold text-foreground/90 mb-[0.382rem]">+750-1000ml/hora</p>
                  <p className="text-xs text-info">Especialmente en clima caluroso</p>
                </article>
              </div>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🌡️</span>
                Factores que aumentan las necesidades de agua
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🌍</span>
                    Ambientales:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>Calor extremo:</strong> Aumenta pérdida por sudor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>Altitud elevada:</strong> &gt;2500m aumenta respiración</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Aire seco:</strong> Calefacción/aire acondicionado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Exposición solar:</strong> Incrementa temperatura corporal</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">🧬</span>
                    Fisiológicos:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>Fiebre:</strong> +200ml por cada grado &gt;37°C</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>Embarazo:</strong> +300ml/día en 2º y 3er trimestre</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      <span><strong>Lactancia:</strong> +600-700ml/día</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>Edad avanzada:</strong> Menor sensación de sed</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🥤</span>
                Fuentes de hidratación
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Líquidos (80% del total):</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• <strong>Agua pura:</strong> La mejor opción, sin calorías</li>
                    <li>• <strong>Infusiones:</strong> Té, café (moderado), tisanas</li>
                    <li>• <strong>Leche:</strong> Aporta también <a href="/proteina/" className="text-info hover:underline transition-colors">proteína</a> y calcio</li>
                    <li>• <strong>Zumos naturales:</strong> Con moderación por azúcares</li>
                    <li>• <strong>Caldos:</strong> Aportan electrolitos adicionales</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Alimentos (20% del total):</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• <strong>Frutas:</strong> Sandía (92%), naranja (87%), manzana (86%)</li>
                    <li>• <strong>Verduras:</strong> Pepino (95%), lechuga (95%), tomate (94%)</li>
                    <li>• <strong>Lácteos:</strong> Yogur (85%), leche (87%)</li>
                    <li>• <strong>Sopas:</strong> Variable según preparación</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🏃‍♂️</span>
                Hidratación y rendimiento deportivo
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-foreground/90">
                  <strong>Una deshidratación del 2% ya reduce el rendimiento físico y cognitivo.</strong> Según <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios sobre deshidratación y rendimiento</a>.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <article>
                    <h4 className="font-semibold mb-2">Antes del ejercicio:</h4>
                    <ul className="text-sm text-foreground/90 space-y-1">
                      <li>• 400-600ml, 2-3h antes</li>
                      <li>• 200-300ml, 10-15min antes</li>
                      <li>• Verifica color orina (amarillo claro)</li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold mb-2">Durante el ejercicio:</h4>
                    <ul className="text-sm text-foreground/90 space-y-1">
                      <li>• 150-250ml cada 15-20min</li>
                      <li>• Bebidas isotónicas si &gt;1h</li>
                      <li>• Temperatura fresca (15-22°C)</li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold mb-2">Después del ejercicio:</h4>
                    <ul className="text-sm text-foreground/90 space-y-1">
                      <li>• 150% del peso perdido</li>
                      <li>• Incluir sodio si sudoración intensa</li>
                      <li>• Monitorear peso corporal</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Cuándo consultar con un profesional
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Síntomas de alarma:</h4>
                  <ul className="text-sm text-foreground/90 space-y-1">
                    <li>• Mareos severos o desmayos</li>
                    <li>• Confusión o irritabilidad extrema</li>
                    <li>• Vómitos persistentes</li>
                    <li>• Orina muy oscura o ausente</li>
                    <li>• Piel que no recupera forma al pellizcar</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Condiciones especiales:</h4>
                  <ul className="text-sm text-foreground/90 space-y-1">
                    <li>• Problemas renales o cardíacos</li>
                    <li>• Diabetes no controlada</li>
                    <li>• Medicamentos diuréticos</li>
                    <li>• Embarazo con complicaciones</li>
                    <li>• Adultos mayores con múltiples patologías</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre hidratación</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo beber demasiada agua?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, la hiponatremia (intoxicación por agua) puede ocurrir al beber cantidades excesivas
                    muy rápidamente. Los riñones pueden procesar máximo 0.8-1L por hora. Sigue las
                    recomendaciones de nuestra calculadora y bebe gradualmente.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿El café y té cuentan para la hidratación?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, aunque tengan efectos diuréticos leves, estudios muestran que contribuyen
                    positivamente a la hidratación. El efecto diurético se reduce con el consumo habitual.
                    Modera la cafeína a menos de 400mg/día.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo sé si estoy bien hidratado?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El mejor indicador es el color de la orina: amarillo claro indica buena hidratación.
                    También puedes pesarte antes y después del ejercicio: cada kg perdido equivale
                    aproximadamente a 1L de líquido que debes reponer.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu hidratación con otras herramientas
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus calorías diarias:</a></strong> La hidratación afecta el metabolismo y la saciedad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu proteína:</a></strong> La síntesis proteica requiere hidratación adecuada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Conoce tu TDEE:</a></strong> Mayor gasto calórico requiere más hidratación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/fibra/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu fibra diaria:</a></strong> Necesidades de fibra según IOM/FDA para dieta equilibrada</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/agua" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/agua/"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="agua" />
          </article>
        </main>
      </Container>
    </>
  );
}
