"use client";

import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
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

      <Container className="py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Calculadora de Agua Diaria - Hidratación
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula cuánta agua debes beber al día según tu peso y nivel de actividad
              para mantener una hidratación óptima.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Hidratación</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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
                  className="w-full md:w-auto"
                >
                  Calcular necesidades de agua
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Tus Necesidades de Hidratación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-6 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {formatMilliliters(result.min)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Mínimo diario
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ≈ {getGlassesCount(result.min)} vasos
                      </div>
                    </div>

                    <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                      <div className="text-2xl font-bold">
                        {formatMilliliters(result.max)}
                      </div>
                      <div className="text-sm opacity-90 mt-1">
                        Óptimo diario
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        ≈ {getGlassesCount(result.max)} vasos
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                    <h4 className="font-semibold mb-2">💧 Consejos de hidratación</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Bebe agua de forma constante a lo largo del día</li>
                      <li>• Aumenta la ingesta durante ejercicio intenso o clima caluroso</li>
                      <li>• Incluye también líquidos de frutas, verduras y otras bebidas</li>
                      <li>• El color de la orina es un buen indicador de hidratación</li>
                      <li>• Ajusta según tu sed y condiciones individuales</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AdSlot después del contenido principal */}
          <ConditionalAdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
            requireInteraction={true}
            requireElement="[class*='result']"
          />

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-4">
              Importancia de la hidratación adecuada
            </h2>

            <p className="text-muted-foreground mb-6">
              El agua constituye aproximadamente el 60% del peso corporal en adultos y es esencial
              para prácticamente todas las funciones fisiológicas. Una hidratación adecuada es
              fundamental para el rendimiento físico, cognitivo y la salud general.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
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

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-green-900 mb-4">
                🎯 Recomendaciones de hidratación según actividad
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold mb-2">Sedentario:</h4>
                  <p className="text-sm text-green-800 mb-2"><strong>30-35ml/kg peso</strong></p>
                  <p className="text-xs text-green-700">Según las <a href="https://www.efsa.europa.eu/en/efsajournal/pub/1459" target="_blank" rel="noopener noreferrer" className="underline">recomendaciones EFSA</a></p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Ejercicio moderado:</h4>
                  <p className="text-sm text-green-800 mb-2"><strong>+500-750ml/hora</strong></p>
                  <p className="text-xs text-green-700">Durante y después del ejercicio</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Ejercicio intenso:</h4>
                  <p className="text-sm text-green-800 mb-2"><strong>+750-1000ml/hora</strong></p>
                  <p className="text-xs text-green-700">Especialmente en clima caluroso</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-4">
                🌡️ Factores que aumentan las necesidades de agua
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Ambientales:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Calor extremo:</strong> Aumenta pérdida por sudor</li>
                    <li>• <strong>Altitud elevada:</strong> &gt;2500m aumenta respiración</li>
                    <li>• <strong>Aire seco:</strong> Calefacción/aire acondicionado</li>
                    <li>• <strong>Exposición solar:</strong> Incrementa temperatura corporal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Fisiológicos:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Fiebre:</strong> +200ml por cada grado &gt;37°C</li>
                    <li>• <strong>Embarazo:</strong> +300ml/día en 2º y 3er trimestre</li>
                    <li>• <strong>Lactancia:</strong> +600-700ml/día</li>
                    <li>• <strong>Edad avanzada:</strong> Menor sensación de sed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-purple-900 mb-4">
                🥤 Fuentes de hidratación
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

            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-yellow-900 mb-4">
                🏃‍♂️ Hidratación y rendimiento deportivo
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

            <div className="bg-red-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-red-900 mb-4">
                ⚠️ Cuándo consultar con un profesional
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

            {/* Calculadoras relacionadas */}
            <div className="bg-gray-50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-medium mb-4">🧮 Calculadoras relacionadas</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <a href="/" className="p-4 bg-white rounded-lg border hover:border-primary transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Calorías y Macros</h4>
                  <p className="text-xs text-muted-foreground">Calculadora completa</p>
                </a>
                <a href="/tdee" className="p-4 bg-white rounded-lg border hover:border-primary transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Calculadora TDEE</h4>
                  <p className="text-xs text-muted-foreground">Gasto calórico diario</p>
                </a>
                <a href="/imc" className="p-4 bg-white rounded-lg border hover:border-primary transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Calculadora IMC</h4>
                  <p className="text-xs text-muted-foreground">Índice de masa corporal</p>
                </a>
                <a href="/proteina" className="p-4 bg-white rounded-lg border hover:border-primary transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Proteína Diaria</h4>
                  <p className="text-xs text-muted-foreground">Necesidades de proteína</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}