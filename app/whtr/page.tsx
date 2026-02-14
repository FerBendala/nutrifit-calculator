import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SocialShare } from '@/components/SocialShare';
import { generateMetadata } from '@/lib/seo';
import { WHtRCalculator } from './WHtRCalculator';

export const metadata = generateMetadata('whtr');

export default function WHtRPage() {

  return (
    <>
      <SchemaMarkup />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de WHtR Médica
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calculadora profesional de WHtR (Ratio Cintura-Altura) para evaluación de riesgo cardiometabólico.
              Mejor predictor que el IMC para diabetes, síndrome metabólico y enfermedad cardiovascular.
              Utilizada por médicos, nutricionistas y profesionales de la salud.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de WHtR">
            <WHtRCalculator />
          </section>

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué WHtR es mejor que el IMC?
              </h2>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-green-50 dark:bg-green-950/30 border-l-4 border-green-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Ventajas del WHtR
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-green-800 dark:text-green-200">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Detecta grasa visceral:</strong> Identifica la grasa más peligrosa para la salud</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Mejor predictor:</strong> Más preciso para riesgo cardiovascular que el IMC</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Universal:</strong> Mismo rango de interpretación para todas las edades y etnias</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Simplicidad clínica:</strong> Solo requiere 2 medidas básicas</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    Rangos de interpretación
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>&lt; 0.40:</strong> Peso muy bajo - evaluar desnutrición</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>0.40-0.50:</strong> Saludable - distribución óptima</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>0.50-0.60:</strong> Riesgo aumentado - monitoreo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>&gt; 0.60:</strong> Riesgo alto - intervención necesaria</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Evidencia Científica del WHtR
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Estudios clínicos clave</h4>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>• <strong>Ashwell & Hsieh (2005):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Estudio fundacional</a> - WHtR superior al IMC</li>
                      <li>• <strong>Meta-análisis (2012):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">58 estudios</a> - Mejor predictor cardiometabólico</li>
                      <li>• <strong>OMS (2008):</strong> <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Recomendación oficial</a> - Uso clínico del WHtR</li>
                      <li>• <strong>Diabetes Prevention:</strong> <a href="https://care.diabetesjournals.org/content/30/11/2917" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Predicción diabetes</a> tipo 2</li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Aplicaciones clínicas</h4>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>• <strong>Síndrome metabólico:</strong> Detección temprana y seguimiento</li>
                      <li>• <strong>Riesgo cardiovascular:</strong> Evaluación más precisa que IMC</li>
                      <li>• <strong>Diabetes tipo 2:</strong> Predicción y prevención</li>
                      <li>• <strong>Hipertensión:</strong> Correlación con presión arterial</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  Limitaciones y consideraciones importantes
                </h3>
              </header>
              <div className="p-6">
                <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>No diferencia tipos de grasa:</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Grasa visceral vs subcutánea</a> requiere medición específica</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Técnica de medición:</strong> <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Consistencia crucial</a> para resultados confiables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Complementar con otras métricas:</strong> Usar junto con <a href="/imc/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">IMC</a> y <a href="/grasa-corporal/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">composición corporal</a></span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Variaciones individuales:</strong> Genética y distribución corporal influyen en interpretación</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="card-golden-lg bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                  Preguntas Frecuentes
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">¿Es más preciso que el IMC?</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                      Sí, múltiples estudios muestran que el WHtR es mejor predictor de riesgo cardiometabólico,
                      especialmente para detectar <a href="/grasa-corporal/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">grasa abdominal peligrosa</a>.
                    </p>
                  </article>
                  <article>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">¿Cuándo debo medirme?</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                      Mejor en ayunas, por la mañana, después de ir al baño y antes de desayunar.
                      La <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">consistencia</a> es clave.
                    </p>
                  </article>
                  <article>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">¿Sirve para todas las edades?</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                      Sí, desde los 5 años hasta adultos mayores. Los rangos de interpretación son
                      universales, a diferencia del <a href="/imc/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">IMC que varía por edad</a>.
                    </p>
                  </article>
                  <article>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">¿Qué hacer si mi WHtR es alto?</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                      Consulta un profesional de salud, enfócate en reducir grasa abdominal con
                      <a href="/tdee/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">déficit calórico</a> y ejercicio cardiovascular.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="card-golden-lg bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 flex items-center">
                  <span className="text-2xl mr-3">🔗</span>
                  Complementa tu evaluación de WHtR
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong><a href="/imc/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula tu IMC:</a></strong> Combina ambas métricas para evaluación completa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong><a href="/whr/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Evalúa tu WHR:</a></strong> Ratio cintura-cadera para análisis complementario de distribución grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong><a href="/grasa-corporal/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Mide tu grasa corporal:</a></strong> Conoce el porcentaje total de grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong><a href="/composicion/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Evalúa composición corporal:</a></strong> Análisis completo de masa magra vs grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong><a href="/peso-ideal/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Encuentra tu peso ideal:</a></strong> Define objetivos realistas de peso</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong><a href="/tdee/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Planifica tu déficit calórico:</a></strong> Si necesitas reducir grasa abdominal</span>
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="/whtr" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora WHtR Médica Profesional - Ratio Cintura-Altura"
            url="https://nutrifit-calculator.com/whtr"
            description="Evalúa tu riesgo cardiometabólico con la calculadora WHtR más precisa. Mejor predictor que el IMC para diabetes y síndrome metabólico. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="whtr" />
        </main>
      </Container>
    </>
  );
}
