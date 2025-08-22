"use client";

import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { NumberInput } from '@/components/NumberInput';
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

      <Container className="py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Calculadora de IMC
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula tu Índice de Masa Corporal (IMC) y conoce tu categoría de peso
              según los estándares de la Organización Mundial de la Salud.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de IMC</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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
                  className="w-full md:w-auto"
                >
                  Calcular IMC
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Tu Resultado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">
                      {result.bmi}
                    </div>
                    <div className={`text-xl font-semibold ${getCategoryColor(result.category)}`}>
                      {result.category}
                    </div>
                  </div>

                  <div className="grid gap-4 mt-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Rangos de IMC (OMS):</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Bajo peso:</span>
                          <span className="text-blue-600">&lt; 18.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peso normal:</span>
                          <span className="text-green-600">18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sobrepeso:</span>
                          <span className="text-yellow-600">25.0 - 29.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Obesidad:</span>
                          <span className="text-red-600">≥ 30.0</span>
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

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-4">
              ¿Qué es el Índice de Masa Corporal (IMC)?
            </h2>

            <p className="text-muted-foreground mb-4">
              El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso con tu altura
              para determinar si tu peso está dentro de un rango saludable. Se calcula dividiendo
              tu peso en kilogramos entre tu altura en metros al cuadrado (kg/m²).
            </p>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">📏 Fórmula del IMC</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-mono text-center text-lg">IMC = peso (kg) ÷ altura² (m)</p>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Ejemplo: 70kg ÷ (1.75m)² = 22.9
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">🎯 Interpretación de resultados</h3>
                <ul className="text-sm space-y-2">
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

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-green-900 mb-4">
                💪 ¿Cómo mejorar tu IMC de forma saludable?
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Para reducir el IMC:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Crea un déficit calórico moderado (300-500 kcal/día)</li>
                    <li>• Aumenta la actividad física gradualmente</li>
                    <li>• Prioriza alimentos nutritivos y saciantes</li>
                    <li>• Mantén una <a href="/agua" className="text-blue-600 hover:underline">hidratación adecuada</a></li>
                    <li>• Consume suficiente <a href="/proteina" className="text-blue-600 hover:underline">proteína</a> para preservar músculo</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Para aumentar el IMC:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Crea un superávit calórico controlado</li>
                    <li>• Incluye entrenamiento de fuerza</li>
                    <li>• Come frecuentemente (5-6 comidas)</li>
                    <li>• Prioriza alimentos densos en calorías</li>
                    <li>• Consulta con un profesional de la salud</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-4">
                🏥 Riesgos asociados según el IMC
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2 text-red-700">IMC elevado (≥25):</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Diabetes tipo 2</li>
                    <li>• Enfermedades cardiovasculares</li>
                    <li>• Hipertensión arterial</li>
                    <li>• Apnea del sueño</li>
                    <li>• Problemas articulares</li>
                    <li>• Ciertos tipos de cáncer</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-blue-700">IMC bajo (&lt;18.5):</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Desnutrición</li>
                    <li>• Sistema inmune debilitado</li>
                    <li>• Osteoporosis</li>
                    <li>• Anemia</li>
                    <li>• Problemas de fertilidad</li>
                    <li>• Retraso en cicatrización</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-yellow-900 mb-2">
                📊 Limitaciones del cálculo de IMC
              </h3>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li>• <strong>No distingue entre masa muscular y grasa:</strong> Los atletas pueden tener IMC alto pero ser muy saludables</li>
                <li>• <strong>No considera la distribución de grasa:</strong> La grasa abdominal es más riesgosa que la de caderas/muslos</li>
                <li>• <strong>Variaciones por edad:</strong> Los rangos pueden ser diferentes en adultos mayores</li>
                <li>• <strong>Diferencias étnicas:</strong> Algunos grupos tienen riesgos diferentes con el mismo IMC</li>
                <li>• <strong>Es una herramienta de screening:</strong> No reemplaza una evaluación médica completa</li>
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
                <a href="/proteina" className="p-4 bg-white rounded-lg border hover:border-primary transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Proteína Diaria</h4>
                  <p className="text-xs text-muted-foreground">Necesidades de proteína</p>
                </a>
                <a href="/agua" className="p-4 bg-white rounded-lg border hover:border-primary transition-colors">
                  <h4 className="font-semibold text-sm mb-1">Hidratación</h4>
                  <p className="text-xs text-muted-foreground">Agua diaria necesaria</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}