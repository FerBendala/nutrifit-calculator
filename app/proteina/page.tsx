"use client";

import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { calculateProteinNeeds } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function ProteinaPage() {
  const [formData, setFormData] = useState({
    weight: '',
    goal: 'active',
    bodyFatPercentage: ''
  });

  const [result, setResult] = useState<{ min: number; max: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, goal } = formData;

    if (!weight) return;

    const bodyFat = formData.bodyFatPercentage ? parseFloat(formData.bodyFatPercentage) : undefined;
    const proteinNeeds = calculateProteinNeeds(
      parseFloat(weight),
      goal as 'sedentary' | 'active' | 'athlete',
      bodyFat
    );

    setResult(proteinNeeds);
  };

  const isFormValid = formData.weight;
  const jsonLd = generateJsonLd('proteina');

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
              Calculadora de Proteína Diaria
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula tus necesidades diarias de proteína según tu peso, objetivo
              y nivel de actividad física basado en evidencia científica.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Proteína</CardTitle>
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
                    id="goal"
                    label="Objetivo/Actividad"
                    value={formData.goal}
                    onChange={handleInputChange('goal')}
                    options={[
                      { value: 'sedentary', label: 'Sedentario (mínima actividad)' },
                      { value: 'active', label: 'Activo (ejercicio regular)' },
                      { value: 'athlete', label: 'Atleta (entrenamiento intenso)' }
                    ]}
                    required
                  />
                </div>

                <NumberInput
                  id="bodyFatPercentage"
                  label="Porcentaje de grasa corporal (opcional)"
                  value={formData.bodyFatPercentage}
                  onChange={handleInputChange('bodyFatPercentage')}
                  min={5}
                  max={50}
                  step={0.1}
                  unit="%"
                  placeholder="15.0"
                />

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full md:w-auto"
                >
                  Calcular necesidades de proteína
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Tus Necesidades de Proteína</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-6 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {formatGrams(result.min)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Mínimo diario
                      </div>
                    </div>

                    <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                      <div className="text-2xl font-bold">
                        {formatGrams(result.max)}
                      </div>
                      <div className="text-sm opacity-90 mt-1">
                        Óptimo diario
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                    <h4 className="font-semibold mb-2">💡 Recomendaciones</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consume entre {formatGrams(result.min)} y {formatGrams(result.max)} de proteína al día</li>
                      <li>• Distribuye la ingesta a lo largo del día (20-30g por comida)</li>
                      <li>• Combina fuentes de proteína completas (animales) e incompletas (vegetales)</li>
                      <li>• Ajusta según tu respuesta individual y resultados</li>
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
              ¿Por qué es importante la proteína?
            </h2>

            <p className="text-muted-foreground mb-6">
              La proteína es un macronutriente esencial que forma la base estructural de nuestro cuerpo.
              A diferencia de las grasas y carbohidratos, nuestro cuerpo no puede almacenar proteínas,
              por lo que necesitamos un suministro constante a través de la alimentación.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">🏗️ Funciones principales</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Construcción y reparación muscular:</strong> Especialmente importante tras el ejercicio</li>
                  <li>• <strong>Producción de enzimas y hormonas:</strong> Insulina, hormona del crecimiento, etc.</li>
                  <li>• <strong>Mantenimiento del sistema inmune:</strong> Anticuerpos y células defensivas</li>
                  <li>• <strong>Transporte de nutrientes:</strong> Hemoglobina transporta oxígeno</li>
                  <li>• <strong>Control del apetito y saciedad:</strong> Mayor efecto térmico que otros macros</li>
                  <li>• <strong>Mantenimiento del pH sanguíneo:</strong> Función buffer del organismo</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">🥩 Fuentes de proteína completa</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Proteínas animales (completas):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• <strong>Carnes:</strong> Pollo (23g/100g), ternera (26g/100g), cerdo (25g/100g)</li>
                      <li>• <strong>Pescados:</strong> Salmón (25g/100g), atún (30g/100g), merluza (18g/100g)</li>
                      <li>• <strong>Huevos:</strong> 6g por huevo grande, proteína de alta calidad</li>
                      <li>• <strong>Lácteos:</strong> Leche (3.4g/100ml), yogur griego (10g/100g), queso (25g/100g)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Proteínas vegetales:</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• <strong>Legumbres:</strong> Lentejas (9g/100g), garbanzos (8g/100g)</li>
                      <li>• <strong>Frutos secos:</strong> Almendras (21g/100g), cacahuetes (26g/100g)</li>
                      <li>• <strong>Cereales:</strong> Quinoa (4.4g/100g), avena (17g/100g)</li>
                      <li>• <strong>Combinar:</strong> Arroz + legumbres = proteína completa</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-4">
                🔬 Recomendaciones según la ciencia
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold mb-2">Sedentarios:</h4>
                  <p className="text-sm text-blue-800 mb-2"><strong>0.8-1.0g/kg peso</strong></p>
                  <p className="text-xs text-blue-700">Mínimo para mantener masa muscular según la <a href="https://www.who.int/publications/i/item/9789241549028" target="_blank" rel="noopener noreferrer" className="underline">OMS</a></p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Activos:</h4>
                  <p className="text-sm text-blue-800 mb-2"><strong>1.2-1.6g/kg peso</strong></p>
                  <p className="text-xs text-blue-700">Para personas con actividad física regular</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Atletas/Fuerza:</h4>
                  <p className="text-sm text-blue-800 mb-2"><strong>1.6-2.4g/kg peso</strong></p>
                  <p className="text-xs text-blue-700">Según <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" target="_blank" rel="noopener noreferrer" className="underline">estudios de síntesis proteica</a></p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-green-900 mb-4">
                🎯 Timing y distribución óptima
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Distribución diaria:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <strong>20-40g por comida:</strong> Optimiza síntesis proteica muscular</li>
                    <li>• <strong>3-4 comidas al día:</strong> Mantiene balance nitrogenado positivo</li>
                    <li>• <strong>Antes de dormir:</strong> Caseína o proteína de digestión lenta</li>
                    <li>• <strong>Post-entreno:</strong> 20-25g dentro de 2 horas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Factores que aumentan necesidades:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <strong>Edad avanzada:</strong> Resistencia anabólica</li>
                    <li>• <strong>Déficit calórico:</strong> Para preservar masa muscular</li>
                    <li>• <strong>Entrenamiento intenso:</strong> Mayor síntesis y degradación</li>
                    <li>• <strong>Recuperación de lesiones:</strong> Reparación tisular</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-yellow-900 mb-4">
                ⚠️ Señales de deficiencia proteica
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Síntomas tempranos:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Pérdida de masa muscular</li>
                    <li>• Mayor tiempo de recuperación</li>
                    <li>• Fatiga constante</li>
                    <li>• Antojos de alimentos</li>
                    <li>• Cabello y uñas débiles</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Consecuencias a largo plazo:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Sarcopenia (pérdida muscular)</li>
                    <li>• Sistema inmune debilitado</li>
                    <li>• Problemas de cicatrización</li>
                    <li>• Metabolismo más lento</li>
                    <li>• Mayor riesgo de fracturas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-purple-900 mb-4">
                💊 ¿Necesito suplementos de proteína?
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-purple-800">
                  <strong>La mayoría de personas pueden cubrir sus necesidades con alimentos.</strong>
                  Los suplementos son útiles en situaciones específicas:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Cuándo considerar suplementos:</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Atletas con necesidades muy altas</li>
                      <li>• Dietas veganas estrictas</li>
                      <li>• Personas mayores con poco apetito</li>
                      <li>• Conveniencia post-entreno</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tipos de proteína en polvo:</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• <strong>Whey:</strong> Rápida absorción, post-entreno</li>
                      <li>• <strong>Caseína:</strong> Lenta absorción, antes de dormir</li>
                      <li>• <strong>Vegetal:</strong> Guisante, arroz, cáñamo</li>
                      <li>• <strong>Mixtas:</strong> Combinan diferentes fuentes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">❓ Preguntas frecuentes sobre proteína</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Puedo consumir demasiada proteína?</h4>
                  <p className="text-sm text-muted-foreground">
                    Para personas sanas, consumir hasta 2.5g/kg de peso corporal es seguro.
                    Cantidades muy altas (&gt;3g/kg) pueden sobrecargar riñones en personas con problemas renales.
                    Usa nuestra calculadora para encontrar tu rango óptimo.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿La proteína vegetal es igual de efectiva?</h4>
                  <p className="text-sm text-muted-foreground">
                    Las proteínas vegetales pueden ser igual de efectivas si se combinan correctamente
                    para obtener todos los aminoácidos esenciales. Combina legumbres con cereales,
                    o usa quinoa, que ya es una proteína completa.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Debo tomar proteína inmediatamente después del entreno?</h4>
                  <p className="text-sm text-muted-foreground">
                    La "ventana anabólica" es más amplia de lo que se pensaba. Lo importante es
                    el total diario de proteína. Si entrenas en ayunas o hace muchas horas que no comes,
                    sí es beneficioso tomar proteína pronto después del ejercicio.
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