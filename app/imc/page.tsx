"use client";

import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateBMI } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function IMCPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string; } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!height || !weight) return;

    const bmiResult = calculateBMI(parseFloat(weight), parseInt(height));
    setResult(bmiResult);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Bajo peso': return 'text-blue-600';
      case 'Peso normal': return 'text-green-600';
      case 'Sobrepeso': return 'text-yellow-600';
      case 'Obesidad': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const isFormValid = height && weight;
  const jsonLd = generateJsonLd('imc');

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
              Calculadora de IMC
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu Índice de Masa Corporal (IMC) y conoce tu categoría de peso
              según los estándares de la Organización Mundial de la Salud.
            </p>
          </div>

          <Card className="card-golden-lg shadow-golden-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <span className="text-3xl mr-3">📊</span>
                Calculadora de IMC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-golden-md">
                <div className="grid gap-[1.618rem] md:grid-cols-2">
                  <NumberInput
                    id="height"
                    label="Altura"
                    value={height}
                    onChange={setHeight}
                    min={130}
                    max={250}
                    unit="cm"
                    placeholder="170"
                    required
                  />

                  <NumberInput
                    id="weight"
                    label="Peso"
                    value={weight}
                    onChange={setWeight}
                    min={30}
                    max={300}
                    step={0.1}
                    unit="kg"
                    placeholder="70.0"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                >
                  📊 Calcular IMC
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Tu Resultado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-golden-md">
                  <div className="space-golden-sm">
                    <div className="text-6xl font-bold text-primary mb-[0.618rem]">
                      {result.bmi}
                    </div>
                    <div className={`text-2xl font-bold ${getCategoryColor(result.category)}`}>
                      {result.category}
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] mt-[2.618rem]">
                    <div className="card-golden">
                      <h4 className="font-bold mb-[1.618rem] text-lg">📏 Rangos de IMC (OMS):</h4>
                      <div className="space-golden-xs text-base">
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Bajo peso:</span>
                          <span className="text-blue-600 font-bold">&lt; 18.5</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Peso normal:</span>
                          <span className="text-green-600 font-bold">18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Sobrepeso:</span>
                          <span className="text-yellow-600 font-bold">25.0 - 29.9</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem]">
                          <span className="font-medium">Obesidad:</span>
                          <span className="text-red-600 font-bold">≥ 30.0</span>
                        </div>
                      </div>
                    </div>
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

          <div className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
              ¿Qué es el IMC? Calculadora de peso corporal
            </h2>

            <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
              El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso con tu altura
              para determinar si tu peso está dentro de un rango saludable. Se calcula dividiendo
              tu peso en kilogramos entre tu altura en metros al cuadrado (kg/m²).
            </p>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <div className="card-golden space-golden-sm">
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
              </div>

              <div className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Interpretación de resultados
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex justify-between">
                    <span>Bajo peso:</span>
                    <span className="text-blue-600 font-medium">&lt; 18.5</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Peso normal:</span>
                    <span className="text-green-600 font-medium">18.5 - 24.9</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sobrepeso:</span>
                    <span className="text-yellow-600 font-medium">25.0 - 29.9</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Obesidad:</span>
                    <span className="text-red-600 font-medium">≥ 30.0</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-golden-lg bg-green-50 border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💪</span>
                ¿Cómo mejorar tu IMC de forma saludable?
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Para reducir el IMC:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li>• Crea un déficit calórico moderado (300-500 kcal/día)</li>
                    <li>• Aumenta la actividad física gradualmente</li>
                    <li>• Prioriza alimentos nutritivos y saciantes</li>
                    <li>• Mantén una <a href="/agua" className="text-blue-600 hover:underline font-medium transition-golden">hidratación adecuada</a></li>
                    <li>• Consume suficiente <a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">proteína</a> para preservar músculo</li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Para aumentar el IMC:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li>• Crea un superávit calórico controlado</li>
                    <li>• Incluye entrenamiento de fuerza</li>
                    <li>• Come frecuentemente (5-6 comidas)</li>
                    <li>• Prioriza alimentos densos en calorías</li>
                    <li>• Consulta con un profesional de la salud</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🏥</span>
                Riesgos asociados según el IMC
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    IMC elevado (≥25):
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Diabetes tipo 2</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Enfermedades cardiovasculares</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Hipertensión arterial</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Apnea del sueño</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Problemas articulares</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Ciertos tipos de cáncer</span>
                    </li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    IMC bajo (&lt;18.5):
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Desnutrición</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Sistema inmune debilitado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Osteoporosis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Anemia</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Problemas de fertilidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Retraso en cicatrización</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📊</span>
                Limitaciones del cálculo de IMC
              </h3>
              <ul className="text-sm text-yellow-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>No distingue entre masa muscular y grasa:</strong> Los atletas pueden tener IMC alto pero ser muy saludables</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>No considera la distribución de grasa:</strong> La grasa abdominal es más riesgosa que la de caderas/muslos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Variaciones por edad:</strong> Los rangos pueden ser diferentes en adultos mayores</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Diferencias étnicas:</strong> Algunos grupos tienen riesgos diferentes con el mismo IMC</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Es una herramienta de screening:</strong> No reemplaza una evaluación médica completa</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">❓ Preguntas frecuentes sobre el IMC</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Es el IMC preciso para todas las personas?</h4>
                  <p className="text-sm text-muted-foreground">
                    No, el IMC es una estimación general. No es preciso para atletas, personas muy musculosas,
                    embarazadas, adultos mayores o niños. Para una evaluación completa, considera también
                    el porcentaje de grasa corporal y consulta con un profesional.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Con qué frecuencia debo calcular mi IMC?</h4>
                  <p className="text-sm text-muted-foreground">
                    Es suficiente calcularlo cada 1-3 meses si estás trabajando en cambios de peso.
                    Para monitoreo general de salud, una vez al año es adecuado. Úsalo junto con nuestra
                    <a href="/" className="text-blue-600 hover:underline"> calculadora de calorías</a> para un enfoque integral.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Qué hago si mi IMC está fuera del rango normal?</h4>
                  <p className="text-sm text-muted-foreground">
                    Primero, consulta con un profesional de la salud para una evaluación completa.
                    Si necesitas cambios, hazlos gradualmente: usa nuestra <a href="/tdee" className="text-blue-600 hover:underline">calculadora TDEE</a>
                    para conocer tus necesidades calóricas y planifica cambios sostenibles.
                  </p>
                </div>
              </div>
            </div>


            {/* Enlaces contextuales */}
            <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu evaluación de peso
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tus calorías diarias:</a></strong> Determina cuántas calorías necesitas según tu IMC y objetivo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Evalúa tu gasto calórico total:</a></strong> Conoce tu TDEE para planificar mejor tu alimentación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/agua" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu hidratación:</a></strong> Calcula tu necesidad de agua según tu peso actual</span>
                </li>
              </ul>
            </div>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/imc" />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="imc" />
          </div>
        </div>
      </Container>
    </>
  );
}