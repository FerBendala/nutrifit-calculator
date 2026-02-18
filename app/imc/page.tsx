import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SocialShare } from '@/components/SocialShare';
import { IMCCalculator } from './IMCCalculator';

export default function IMCPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="imc" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de IMC – Descubre tu Categoría de Peso (Normal, Sobrepeso u Obesidad)
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu IMC (Índice de Masa Corporal) al instante. Descubre si tu peso es normal,
              bajo peso, sobrepeso u obesidad según los estándares de la OMS.
            </p>
          </header>

          <IMCCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el IMC? Calculadora de peso corporal
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso con tu altura
                para determinar si tu peso está dentro de un rango saludable. Se calcula dividiendo
                tu peso en kilogramos entre tu altura en metros al cuadrado (kg/m²). Los rangos estándar
                están establecidos por la <a href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Organización Mundial de la Salud (OMS)</a>.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📏</span>
                  Fórmula del IMC
                </h3>
                <div className="card-golden bg-primary/5">
                  <p className="font-mono text-center text-xl font-bold text-primary">IMC = peso (kg) ÷ altura² (m)</p>
                  <p className="text-sm text-muted-foreground mt-[0.618rem] text-center">
                    Ejemplo: 70kg ÷ (1.75m)² = 22.9
                  </p>
                </div>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Interpretación de resultados
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex justify-between">
                    <span>Bajo peso:</span>
                    <span className="text-info font-medium">&lt; 18.5</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Peso normal:</span>
                    <span className="text-success font-medium">18.5 - 24.9</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sobrepeso:</span>
                    <span className="text-warning font-medium">25.0 - 29.9</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Obesidad:</span>
                    <span className="text-destructive font-medium">≥ 30.0</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-success-subtle border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💪</span>
                ¿Cómo mejorar tu IMC de forma saludable?
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Para reducir el IMC:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Crea un déficit calórico moderado (300-500 kcal/día)</li>
                    <li>• Aumenta la actividad física gradualmente</li>
                    <li>• Prioriza alimentos nutritivos y saciantes</li>
                    <li>• Mantén una <a href="/agua/" className="text-info hover:underline transition-colors font-medium transition-golden">hidratación adecuada</a></li>
                    <li>• Consume suficiente <a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">proteína</a> para preservar músculo</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Para aumentar el IMC:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li>• Crea un superávit calórico controlado</li>
                    <li>• Incluye entrenamiento de fuerza</li>
                    <li>• Come frecuentemente (5-6 comidas)</li>
                    <li>• Prioriza alimentos densos en calorías</li>
                    <li>• Consulta con un profesional de la salud</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🏥</span>
                Riesgos asociados según el IMC
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    IMC elevado (≥25):
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><a href="https://www.cdc.gov/diabetes/basics/type2.html" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Diabetes tipo 2</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><a href="https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Enfermedades cardiovasculares</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><a href="https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/symptoms-causes/syc-20373410" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Hipertensión arterial</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><a href="https://www.mayoclinic.org/diseases-conditions/sleep-apnea/symptoms-causes/syc-20377631" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Apnea del sueño</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><a href="https://www.arthritis.org/health-wellness/about-arthritis/understanding-arthritis/obesity-and-arthritis" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Problemas articulares</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><a href="https://www.cancer.gov/about-cancer/causes-prevention/risk/obesity/obesity-fact-sheet" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Ciertos tipos de cáncer</a></span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    IMC bajo (&lt;18.5):
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><a href="https://www.who.int/news-room/fact-sheets/detail/malnutrition" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Desnutrición</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2913766/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Sistema inmune debilitado</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><a href="https://www.bones.nih.gov/health-info/bone/osteoporosis/conditions-behaviors/bone-health-and-osteoporosis" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Osteoporosis</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><a href="https://www.mayoclinic.org/diseases-conditions/anemia/symptoms-causes/syc-20351360" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Anemia</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3253632/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Problemas de fertilidad</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2903966/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Retraso en cicatrización</a></span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📊</span>
                Limitaciones del cálculo de IMC
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>No distingue entre masa muscular y grasa:</strong> Los atletas pueden tener IMC alto pero ser muy saludables</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>No considera la distribución de grasa:</strong> La grasa abdominal es más riesgosa que la de caderas/muslos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Variaciones por edad:</strong> Los rangos pueden ser diferentes en adultos mayores</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Diferencias étnicas:</strong> Algunos grupos tienen riesgos diferentes con el mismo IMC</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Es una herramienta de screening:</strong> No reemplaza una evaluación médica completa. Para más información, consulta el <a href="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">NHLBI BMI Calculator</a></span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre el IMC</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es el IMC preciso para todas las personas?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    No, el IMC es una estimación general. No es preciso para atletas, personas muy musculosas,
                    embarazadas, adultos mayores o niños. Para una evaluación completa, considera también
                    el porcentaje de grasa corporal y consulta con un profesional.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo calcular mi IMC?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Es suficiente calcularlo cada 1-3 meses si estás trabajando en cambios de peso.
                    Para monitoreo general de salud, una vez al año es adecuado. Úsalo junto con nuestra
                    <a href="/" className="text-info hover:underline transition-colors"> calculadora de calorías</a> para un enfoque integral.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué hago si mi IMC está fuera del rango normal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Primero, consulta con un profesional de la salud para una evaluación completa.
                    Si necesitas cambios, hazlos gradualmente: usa nuestra <a href="/tdee/" className="text-info hover:underline transition-colors">calculadora TDEE</a> para conocer tus necesidades calóricas y planifica cambios sostenibles.
                  </p>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu evaluación de peso
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/peso-ajustado/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu Peso Ajustado Clínico:</a></strong> ABW para dosificación y necesidades nutricionales según tu IMC</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus calorías diarias:</a></strong> Determina cuántas calorías necesitas según tu IMC y objetivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whr/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu distribución de grasa:</a></strong> El WHR complementa el IMC evaluando riesgo cardiovascular</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/fmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu FMI metabólico:</a></strong> Índice avanzado de masa grasa para evaluación precisa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/bai/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula BAI sin peso:</a></strong> Estima grasa corporal con solo cadera y altura según Bergman</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu gasto calórico total:</a></strong> Conoce tu TDEE para planificar mejor tu alimentación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/agua/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu hidratación:</a></strong> Calcula tu necesidad de agua según tu peso actual</span>
                </li>
              </ul>
            </section>

            <RelatedCalculators currentPage="/imc" />

            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            <SocialShare
              title="Calculadora de IMC – Descubre tu Categoría de Peso"
              url="https://nutrifit-calculator.com/imc/"
              description="Calcula tu IMC al instante. Descubre si tu peso es normal, bajo peso, sobrepeso u obesidad según la OMS."
            />

            <CalculatorNavigation currentCalculator="imc" />
          </article>
        </main>
      </Container>
    </>
  );
}
