"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SelectInput } from '@/components/SelectInput';
import { SimpleAdSlot } from '@/components/SimpleAdSlot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMilliliters } from '@/lib/format';
import { calculateWaterNeeds } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function AguaPage() {
  const [formData, setFormData] = useState({
    weight: '',
    activityLevel: 'moderate'
  });

  const [result, setResult] = useState<{ min: number; max: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, activityLevel } = formData;

    if (!weight) return;

    const waterNeeds = calculateWaterNeeds(
      parseFloat(weight),
      activityLevel as 'low' | 'moderate' | 'high'
    );

    setResult(waterNeeds);
  };

  const isFormValid = formData.weight;
  const jsonLd = generateJsonLd('agua');

  const getGlassesCount = (ml: number) => Math.round(ml / 250); // Assuming 250ml per glass

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size="xl" className="py-[4.236rem]">
        <div className="max-w-5xl mx-auto space-golden-lg">
          <div className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Agua Diaria - Hidratación
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula cuánta agua debes beber al día según tu peso y nivel de actividad
              para mantener una hidratación óptima.
            </p>
          </div>

          <Card className="card-golden-lg shadow-golden-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <span className="text-3xl mr-3">💧</span>
                Calculadora de Hidratación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-golden-md">
                <div className="grid gap-[1.618rem] md:grid-cols-2">
                  <NumberInput
                    id="weight"
                    label="Peso"
                    value={formData.weight}
                    onChange={handleInputChange('weight')}
                    min={30}
                    max={300}
                    step={0.1}
                    unit="kg"
                    placeholder="70.0"
                    required
                  />

                  <SelectInput
                    id="activityLevel"
                    label="Nivel de actividad/clima"
                    value={formData.activityLevel}
                    onChange={handleInputChange('activityLevel')}
                    options={[
                      { value: 'low', label: 'Baja (sedentario, clima templado)' },
                      { value: 'moderate', label: 'Moderada (ejercicio regular)' },
                      { value: 'high', label: 'Alta (ejercicio intenso/calor)' }
                    ]}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                >
                  💧 Calcular necesidades de agua
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Tus Necesidades de Hidratación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-golden-md">
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <div className="text-center card-golden bg-secondary/50">
                      <div className="text-4xl font-bold text-blue-600 mb-[0.618rem]">
                        {formatMilliliters(result.min)}
                      </div>
                      <div className="text-lg font-semibold text-blue-700 mb-[0.382rem]">
                        Mínimo diario
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ≈ {getGlassesCount(result.min)} vasos de 250ml
                      </p>
                    </div>

                    <div className="text-center card-golden bg-primary text-primary-foreground">
                      <div className="text-5xl font-bold mb-[0.618rem]">
                        {formatMilliliters(result.max)}
                      </div>
                      <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                        Óptimo diario
                      </div>
                      <p className="text-sm opacity-90">
                        ≈ {getGlassesCount(result.max)} vasos de 250ml
                      </p>
                    </div>
                  </div>

                  <div className="mt-[2.618rem] card-golden bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400">
                    <h4 className="font-bold mb-[1.618rem] text-lg flex items-center">
                      <span className="text-2xl mr-3">💧</span>
                      Consejos de hidratación
                    </h4>
                    <ul className="text-sm text-muted-foreground space-golden-xs text-left">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Bebe agua de forma constante a lo largo del día</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Aumenta la ingesta durante ejercicio intenso o clima caluroso</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Incluye también líquidos de frutas, verduras y otras bebidas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        <span>El color de la orina es un buen indicador de hidratación</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Ajusta según tu sed y condiciones individuales</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AdSlot después del contenido principal */}
          <SimpleAdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
          />

          <div className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
              Importancia del agua diaria según peso corporal y ejercicio
            </h2>

            <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
              El agua constituye aproximadamente el 60% del peso corporal en adultos y es esencial
              para prácticamente todas las funciones fisiológicas. Una hidratación adecuada es
              fundamental para el rendimiento físico, cognitivo y la salud general.
            </p>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">💪 Funciones vitales del agua</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Regulación térmica:</strong> Sudoración y vasodilatación para controlar temperatura</li>
                  <li>• <strong>Transporte de nutrientes:</strong> El plasma sanguíneo es 90% agua</li>
                  <li>• <strong>Eliminación de toxinas:</strong> Riñones filtran 180L de sangre al día</li>
                  <li>• <strong>Lubricación articular:</strong> El líquido sinovial protege las articulaciones</li>
                  <li>• <strong>Digestión:</strong> Saliva, jugos gástricos y bilis contienen agua</li>
                  <li>• <strong>Estructura celular:</strong> Mantiene la forma y función de las células</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">⚠️ Niveles de deshidratación</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-yellow-700">Leve (1-2% peso corporal):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Sed, boca seca</li>
                      <li>• Reducción del rendimiento físico</li>
                      <li>• Orina más concentrada (amarilla)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-orange-700">Moderada (3-5% peso corporal):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Fatiga, mareos, dolor de cabeza</li>
                      <li>• Reducción cognitiva significativa</li>
                      <li>• Piel menos elástica</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-red-700">Severa (&gt;5% peso corporal):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Náuseas, vómitos</li>
                      <li>• Confusión, irritabilidad</li>
                      <li>• Riesgo de golpe de calor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Recomendaciones de hidratación según actividad
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">😴</span>
                    Sedentario:
                  </h4>
                  <p className="text-lg font-bold text-yellow-800 mb-[0.382rem]">30-35ml/kg peso</p>
                  <p className="text-xs text-blue-700">Según las <a href="https://www.efsa.europa.eu/en/efsajournal/pub/1459" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">recomendaciones EFSA</a></p>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">🏃</span>
                    Ejercicio moderado:
                  </h4>
                  <p className="text-lg font-bold text-blue-800 mb-[0.382rem]">+500-750ml/hora</p>
                  <p className="text-xs text-blue-700">Durante y después del ejercicio</p>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">💪</span>
                    Ejercicio intenso:
                  </h4>
                  <p className="text-lg font-bold text-blue-800 mb-[0.382rem]">+750-1000ml/hora</p>
                  <p className="text-xs text-blue-700">Especialmente en clima caluroso</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🌡️</span>
                Factores que aumentan las necesidades de agua
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-orange-700 flex items-center">
                    <span className="text-lg mr-2">🌍</span>
                    Ambientales:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span><strong>Calor extremo:</strong> Aumenta pérdida por sudor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Altitud elevada:</strong> &gt;2500m aumenta respiración</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span><strong>Aire seco:</strong> Calefacción/aire acondicionado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span><strong>Exposición solar:</strong> Incrementa temperatura corporal</span>
                    </li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-purple-700 flex items-center">
                    <span className="text-lg mr-2">🧬</span>
                    Fisiológicos:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span><strong>Fiebre:</strong> +200ml por cada grado &gt;37°C</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      <span><strong>Embarazo:</strong> +300ml/día en 2º y 3er trimestre</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Lactancia:</strong> +600-700ml/día</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Edad avanzada:</strong> Menor sensación de sed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🥤</span>
                Fuentes de hidratación
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Líquidos (80% del total):</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Agua pura:</strong> La mejor opción, sin calorías</li>
                    <li>• <strong>Infusiones:</strong> Té, café (moderado), tisanas</li>
                    <li>• <strong>Leche:</strong> Aporta también <a href="/proteina" className="text-blue-600 hover:underline">proteína</a> y calcio</li>
                    <li>• <strong>Zumos naturales:</strong> Con moderación por azúcares</li>
                    <li>• <strong>Caldos:</strong> Aportan electrolitos adicionales</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Alimentos (20% del total):</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Frutas:</strong> Sandía (92%), naranja (87%), manzana (86%)</li>
                    <li>• <strong>Verduras:</strong> Pepino (95%), lechuga (95%), tomate (94%)</li>
                    <li>• <strong>Lácteos:</strong> Yogur (85%), leche (87%)</li>
                    <li>• <strong>Sopas:</strong> Variable según preparación</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🏃‍♂️</span>
                Hidratación y rendimiento deportivo
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-yellow-800">
                  <strong>Una deshidratación del 2% ya reduce el rendimiento físico y cognitivo.</strong>
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="font-semibold mb-2">Antes del ejercicio:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• 400-600ml, 2-3h antes</li>
                      <li>• 200-300ml, 10-15min antes</li>
                      <li>• Verifica color orina (amarillo claro)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Durante el ejercicio:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• 150-250ml cada 15-20min</li>
                      <li>• Bebidas isotónicas si &gt;1h</li>
                      <li>• Temperatura fresca (15-22°C)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Después del ejercicio:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• 150% del peso perdido</li>
                      <li>• Incluir sodio si sudoración intensa</li>
                      <li>• Monitorear peso corporal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Cuándo consultar con un profesional
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Síntomas de alarma:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Mareos severos o desmayos</li>
                    <li>• Confusión o irritabilidad extrema</li>
                    <li>• Vómitos persistentes</li>
                    <li>• Orina muy oscura o ausente</li>
                    <li>• Piel que no recupera forma al pellizcar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Condiciones especiales:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Problemas renales o cardíacos</li>
                    <li>• Diabetes no controlada</li>
                    <li>• Medicamentos diuréticos</li>
                    <li>• Embarazo con complicaciones</li>
                    <li>• Adultos mayores con múltiples patologías</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">❓ Preguntas frecuentes sobre hidratación</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Puedo beber demasiada agua?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sí, la hiponatremia (intoxicación por agua) puede ocurrir al beber cantidades excesivas
                    muy rápidamente. Los riñones pueden procesar máximo 0.8-1L por hora. Sigue las
                    recomendaciones de nuestra calculadora y bebe gradualmente.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿El café y té cuentan para la hidratación?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sí, aunque tengan efectos diuréticos leves, estudios muestran que contribuyen
                    positivamente a la hidratación. El efecto diurético se reduce con el consumo habitual.
                    Modera la cafeína a menos de 400mg/día.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo sé si estoy bien hidratado?</h4>
                  <p className="text-sm text-muted-foreground">
                    El mejor indicador es el color de la orina: amarillo claro indica buena hidratación.
                    También puedes pesarte antes y después del ejercicio: cada kg perdido equivale
                    aproximadamente a 1L de líquido que debes reponer.
                  </p>
                </div>
              </div>
            </div>

            {/* Enlaces contextuales */}
            <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu hidratación con otras herramientas
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tus calorías diarias:</a></strong> La hidratación afecta el metabolismo y la saciedad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu proteína:</a></strong> La síntesis proteica requiere hidratación adecuada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Conoce tu TDEE:</a></strong> Mayor gasto calórico requiere más hidratación</span>
                </li>
              </ul>
            </div>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/agua" />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="agua" />
          </div>
        </div>
      </Container>
    </>
  );
}