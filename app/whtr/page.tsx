import { Container } from '@/components/Container';
import { SocialShare } from '@/components/SocialShare';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { generateMetadata } from '@/lib/seo';
import { WHtRCalculator } from './WHtRCalculator';
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = generateMetadata('whtr');

export default function WHtRPage() {

  return (
    <>
      <SchemaMarkup />
      <Container>
        <main className="max-w-4xl mx-auto space-golden">
          <header className="text-center space-golden-sm">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full mb-[1rem]">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Evaluación Cardiometabólica</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-[1rem] leading-[1.2]">
              Calculadora <span className="text-blue-600">WHtR</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-[1.618] max-w-3xl mx-auto">
              Evalúa tu <strong>riesgo cardiometabólico</strong> con el ratio cintura-altura, 
              mejor predictor que el IMC para diabetes, síndrome metabólico y enfermedad cardiovascular.
            </p>
          </header>

          {/* Calculadora interactiva */}
          <WHtRCalculator />

          {/* Información educativa */}
          <section className="space-golden-md">
            <h2 className="text-3xl font-bold text-center mb-[2rem]">
              ¿Por qué WHtR es mejor que el IMC?
            </h2>

            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <Card className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Ventajas del WHtR
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Detecta grasa visceral:</strong> Identifica la grasa más peligrosa para la salud</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 mr-2">•</span>
                    <span><strong>Mejor predictor:</strong> Más preciso para riesgo cardiovascular que el IMC</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Universal:</strong> Mismo rango de interpretación para todas las edades y etnias</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Simplicidad clínica:</strong> Solo requiere 2 medidas básicas</span>
                  </li>
                </ul>
              </Card>

              <Card className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Rangos de interpretación
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 mr-2 font-bold">&lt; 0.40:</span>
                    <span>Peso muy bajo - evaluar desnutrición</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 mr-2 font-bold">0.40-0.50:</span>
                    <span>Saludable - distribución óptima</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-yellow-600 mr-2 font-bold">0.50-0.60:</span>
                    <span>Riesgo aumentado - monitoreo</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-red-600 mr-2 font-bold">&gt; 0.60:</span>
                    <span>Riesgo alto - intervención necesaria</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Evidencia científica */}
          <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-[2.618rem]">
            <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">🔬</span>
              Evidencia Científica del WHtR
            </h3>
            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <article className="card-golden bg-white/50">
                <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                  <span className="text-lg mr-2">🏥</span>
                  Estudios clínicos clave:
                </h4>
                <ul className="text-sm text-blue-800 space-golden-xs">
                  <li>• <strong>Ashwell & Hsieh (2005):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Estudio fundacional</a> - WHtR superior al IMC</li>
                  <li>• <strong>Meta-análisis (2012):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">58 estudios</a> - Mejor predictor cardiometabólico</li>
                  <li>• <strong>OMS (2008):</strong> <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Recomendación oficial</a> - Uso clínico del WHtR</li>
                  <li>• <strong>Diabetes Prevention:</strong> <a href="https://care.diabetesjournals.org/content/30/11/2917" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Predicción diabetes</a> tipo 2</li>
                </ul>
              </article>
              <article className="card-golden bg-white/50">
                <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                  <span className="text-lg mr-2">📈</span>
                  Aplicaciones clínicas:
                </h4>
                <ul className="text-sm text-green-800 space-golden-xs">
                  <li>• <strong>Síndrome metabólico:</strong> Detección temprana y seguimiento</li>
                  <li>• <strong>Riesgo cardiovascular:</strong> Evaluación más precisa que IMC</li>
                  <li>• <strong>Diabetes tipo 2:</strong> Predicción y prevención</li>
                  <li>• <strong>Hipertensión:</strong> Correlación con presión arterial</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Limitaciones y consideraciones */}
          <section className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
            <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              Limitaciones y consideraciones importantes
            </h3>
            <ul className="text-sm text-yellow-800 space-golden-xs">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>No diferencia tipos de grasa:</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Grasa visceral vs subcutánea</a> requiere medición específica</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Técnica de medición:</strong> <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Consistencia crucial</a> para resultados confiables</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Complementar con otras métricas:</strong> Usar junto con <a href="/imc" className="text-blue-600 hover:underline font-medium">IMC</a> y <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium">composición corporal</a></span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Variaciones individuales:</strong> Genética y distribución corporal influyen en interpretación</span>
              </li>
            </ul>
          </section>

          {/* Preguntas frecuentes */}
          <section className="space-golden-md">
            <h3 className="text-2xl font-bold text-center mb-[1.618rem]">Preguntas Frecuentes</h3>
            <div className="grid gap-[1rem] md:grid-cols-2">
              <article className="card-golden bg-gray-50">
                <h4 className="font-semibold mb-[0.618rem]">¿Es más preciso que el IMC?</h4>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Sí, múltiples estudios muestran que el WHtR es mejor predictor de riesgo cardiometabólico, 
                  especialmente para detectar <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium">grasa abdominal peligrosa</a>.
                </p>
              </article>
              <article className="card-golden bg-gray-50">
                <h4 className="font-semibold mb-[0.618rem]">¿Cuándo debo medirme?</h4>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Mejor en ayunas, por la mañana, después de ir al baño y antes de desayunar. 
                  La <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">consistencia</a> es clave.
                </p>
              </article>
              <article className="card-golden bg-gray-50">
                <h4 className="font-semibold mb-[0.618rem]">¿Sirve para todas las edades?</h4>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Sí, desde los 5 años hasta adultos mayores. Los rangos de interpretación son 
                  universales, a diferencia del <a href="/imc" className="text-blue-600 hover:underline font-medium">IMC que varía por edad</a>.
                </p>
              </article>
              <article className="card-golden bg-gray-50">
                <h4 className="font-semibold mb-[0.618rem]">¿Qué hacer si mi WHtR es alto?</h4>
                <p className="text-sm text-muted-foreground leading-[1.618]">
                  Consulta un profesional de salud, enfócate en reducir grasa abdominal con 
                  <a href="/tdee" className="text-blue-600 hover:underline font-medium">déficit calórico</a> y ejercicio cardiovascular.
                </p>
              </article>
            </div>
          </section>

          {/* Enlaces contextuales */}
          <section className="card-golden-lg bg-orange-50 border-l-4 border-orange-400 mb-[2.618rem]">
            <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
              <span className="text-2xl mr-3">🔗</span>
              Complementa tu evaluación de WHtR
            </h3>
            <ul className="text-sm text-orange-800 space-golden-xs">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong><a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tu IMC:</a></strong> Combina ambas métricas para evaluación completa</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong><a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium transition-golden">Mide tu grasa corporal:</a></strong> Conoce el porcentaje total de grasa</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong><a href="/composicion" className="text-blue-600 hover:underline font-medium transition-golden">Evalúa composición corporal:</a></strong> Análisis completo de masa magra vs grasa</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong><a href="/peso-ideal" className="text-blue-600 hover:underline font-medium transition-golden">Encuentra tu peso ideal:</a></strong> Define objetivos realistas de peso</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Planifica tu déficit calórico:</a></strong> Si necesitas reducir grasa abdominal</span>
              </li>
            </ul>
          </section>

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
