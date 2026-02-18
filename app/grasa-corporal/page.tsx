import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SocialShare } from '@/components/SocialShare';
import { GrasaCorporalCalculator } from './GrasaCorporalCalculator';

export default function GrasaCorporalPage() {
  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="grasa-corporal" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Grasa Corporal – Tu % Exacto con Pliegues Cutáneos
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu porcentaje de grasa corporal con métodos científicos utilizados por profesionales.
              Usa pliegues cutáneos (Jackson-Pollock y Durnin-Womersley) para obtener resultados precisos.
            </p>
          </header>

          <GrasaCorporalCalculator />

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la grasa corporal? Métodos de medición por pliegues cutáneos
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La grasa corporal es el porcentaje de tu peso total que corresponde a tejido adiposo.
                A diferencia del <a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">IMC</a>,
                la medición de grasa corporal distingue entre masa muscular y grasa, proporcionando
                una evaluación más precisa de tu composición corporal.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Métodos de medición
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-info mr-2 min-w-[80px]">3 sitios:</span>
                    <span>Jackson-Pollock - Tríceps, suprailiaco, muslo/pectoral - <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudio original</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-success mr-2 min-w-[80px]">4 sitios:</span>
                    <span>Durnin-Womersley - Tríceps, bíceps, subescapular, suprailiaco - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC524030/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">método validado</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-warning mr-2 min-w-[80px]">7 sitios:</span>
                    <span>Jackson-Pollock - 7 puntos corporales para máxima precisión</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="font-bold text-warning mr-2 min-w-[80px]">Precisión:</span>
                    <span>±3-5% con medición correcta de pliegues</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  Tipos de grasa corporal
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Grasa esencial:</strong> Necesaria para funciones vitales (3-5% hombres, 8-12% mujeres) - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2903966/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">función esencial</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Grasa de almacenamiento:</strong> Reserva energética en tejido subcutáneo - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">metabolismo energético</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Grasa visceral:</strong> Alrededor de órganos (más peligrosa para la salud)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Grasa intramuscular:</strong> Dentro del tejido muscular</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📏</span>
                Cómo medir pliegues cutáneos correctamente
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">🛠️</span>
                    Herramientas necesarias:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>Calibrador de pliegues:</strong> Precisión de 0.1mm</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span><strong>Marcador corporal:</strong> Para localizar puntos exactos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Cinta métrica:</strong> Para verificar ubicaciones</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Ayuda de otra persona:</strong> Para mediciones precisas</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">📍</span>
                    Ubicaciones de medición:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>Tríceps:</strong> Punto medio entre hombro y codo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span><strong>Suprailiaco:</strong> Diagonal sobre cresta ilíaca</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Muslo:</strong> Punto medio entre cadera y rodilla</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Subescapular:</strong> Debajo del omóplato</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💪</span>
                Importancia de la grasa corporal para la salud
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">✅</span>
                    Beneficios de niveles óptimos:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span>Mejor sensibilidad a la insulina - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2913766/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios sobre insulina</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Reducción del riesgo cardiovascular - <a href="https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">AHA</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mejor función hormonal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mayor movilidad y flexibilidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mejor rendimiento deportivo</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    Riesgos de niveles inadecuados:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>Muy baja: Problemas hormonales, inmunitarios</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Muy alta: Diabetes, hipertensión, apnea</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Distribución abdominal: Mayor riesgo metabólico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Inflamación crónica de bajo grado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Problemas articulares y de movilidad</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
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
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>Déficit calórico moderado (300-500 kcal/día)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Entrenamiento de fuerza para preservar músculo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Cardio de intensidad moderada-alta</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span>Consumo adecuado de <a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">proteína</a> (2g/kg)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Sueño de calidad (7-9 horas)</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Para aumentar masa muscular:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span>Superávit calórico controlado (200-400 kcal/día)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Entrenamiento de fuerza progresivo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Proteína distribuida a lo largo del día</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Descanso adecuado entre entrenamientos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Monitoreo regular de composición corporal</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Limitaciones y consideraciones importantes
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Precisión del medidor:</strong> Requiere práctica y calibrador de calidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Hidratación:</strong> La deshidratación puede afectar las mediciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Variabilidad diaria:</strong> Medir siempre a la misma hora y condiciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Edad y sexo:</strong> Las fórmulas son específicas para cada grupo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>No distingue grasa visceral:</strong> Solo mide grasa subcutánea</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong>Consistencia:</strong> Usar siempre el mismo método y medidor</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre grasa corporal</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre IMC y grasa corporal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El <a href="/imc/" className="text-info hover:underline transition-colors font-medium">IMC</a> solo considera peso y altura,
                    mientras que la grasa corporal distingue entre músculo y grasa. Un atleta puede tener IMC alto pero
                    grasa corporal baja, mientras que alguien con poco músculo puede tener IMC normal pero grasa corporal alta.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo medir mi grasa corporal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para seguimiento de cambios, mide cada 2-4 semanas. La grasa corporal cambia más lentamente que el peso.
                    Es más importante la tendencia a largo plazo que las mediciones individuales. Siempre mide en las mismas
                    condiciones (hora, hidratación, etc.).
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo medir mi grasa corporal en casa?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, con un calibrador de pliegues de calidad y práctica. Sin embargo, es más preciso que otra persona
                    tome las mediciones. Para máxima precisión, considera una evaluación profesional con DEXA o BodPod,
                    especialmente si necesitas datos muy exactos.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu análisis de composición corporal
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus calorías diarias:</a></strong> Ajusta tu alimentación según tu composición corporal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whr/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa distribución de grasa:</a></strong> El WHR identifica grasa visceral peligrosa complementando el análisis de composición</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/fmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu FMI avanzado:</a></strong> Índice preciso de masa grasa para evaluación metabólica completa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/bai/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula BAI sin báscula:</a></strong> Estima grasa corporal con solo cadera y altura según Bergman</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula tus necesidades basadas en masa magra</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Conoce tu TDEE:</a></strong> Ajusta tu gasto calórico según tu composición</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Método Navy:</a></strong> Compara con mediciones de circunferencias</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/grasa-corporal" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Grasa Corporal Gratis"
              url="https://nutrifit-calculator.com/grasa-corporal/"
              description="Calcula tu porcentaje de grasa corporal con métodos científicos de pliegues cutáneos. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="grasa-corporal" />
          </article>
        </main>
      </Container>
    </>
  );
}
