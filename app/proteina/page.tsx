"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdSlot } from '@/components/UnifiedAdSlot';
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

      <Container size="xl" className="py-[4.236rem]">
        <div className="max-w-5xl mx-auto space-golden-lg">
          <div className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Proteína Diaria
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tus necesidades diarias de proteína según tu peso, objetivo
              y nivel de actividad física basado en evidencia científica.
            </p>
          </div>

          <Card className="card-golden-lg shadow-golden-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <span className="text-3xl mr-3">🥩</span>
                Calculadora de Proteína
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
                  className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                >
                  🥩 Calcular necesidades de proteína
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Tus Necesidades de Proteína
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-golden-md">
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <div className="text-center card-golden bg-secondary/50">
                      <div className="text-4xl font-bold text-blue-600 mb-[0.618rem]">
                        {formatGrams(result.min)}
                      </div>
                      <div className="text-lg font-semibold text-blue-700 mb-[0.382rem]">
                        Mínimo diario
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Para mantener masa muscular
                      </p>
                    </div>

                    <div className="text-center card-golden bg-primary text-primary-foreground">
                      <div className="text-5xl font-bold mb-[0.618rem]">
                        {formatGrams(result.max)}
                      </div>
                      <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                        Óptimo diario
                      </div>
                      <p className="text-sm opacity-90">
                        Para maximizar resultados
                      </p>
                    </div>
                  </div>

                  <div className="mt-[2.618rem] card-golden bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400">
                    <h4 className="font-bold mb-[1.618rem] text-lg flex items-center">
                      <span className="text-2xl mr-3">💡</span>
                      Recomendaciones
                    </h4>
                    <ul className="text-sm text-muted-foreground space-golden-xs text-left">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Consume entre <strong>{formatGrams(result.min)}</strong> y <strong>{formatGrams(result.max)}</strong> de proteína al día</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Distribuye la ingesta a lo largo del día (20-30g por comida)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Combina fuentes de proteína completas (animales) e incompletas (vegetales)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Ajusta según tu respuesta individual y resultados</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AdSlot después del contenido principal */}
          <AdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
            requireMinContent={true}
            minWords={100}
            lazyLoad={true}
          />

          <div className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
              ¿Por qué es importante la proteína para ganar músculo y mantener peso?
            </h2>

            <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
              La proteína es un macronutriente esencial que forma la base estructural de nuestro cuerpo.
              A diferencia de las grasas y carbohidratos, nuestro cuerpo no puede almacenar proteínas,
              por lo que necesitamos un suministro constante a través de la alimentación.
            </p>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <div className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🏗️</span>
                  Funciones principales
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Construcción y reparación muscular:</strong> Especialmente importante tras el ejercicio - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios sobre síntesis proteica</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 mr-2">•</span>
                    <span><strong>Producción de enzimas y hormonas:</strong> Insulina, hormona del crecimiento, etc. - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2903966/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">función hormonal</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Mantenimiento del sistema inmune:</strong> Anticuerpos y células defensivas - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2913766/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">inmunidad y proteína</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Transporte de nutrientes:</strong> Hemoglobina transporta oxígeno</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Control del apetito y saciedad:</strong> Mayor efecto térmico que otros macros</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span><strong>Mantenimiento del pH sanguíneo:</strong> Función buffer del organismo</span>
                  </li>
                </ul>
              </div>

              <div className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🥩</span>
                  Fuentes de proteína completa
                </h3>
                <div className="space-golden-sm">
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

            <div className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Recomendaciones según la ciencia
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">😴</span>
                    Sedentarios:
                  </h4>
                  <p className="text-lg font-bold text-yellow-800 mb-[0.382rem]">0.8-1.0g/kg peso</p>
                  <p className="text-xs text-blue-700">Mínimo para mantener masa muscular según la <a href="https://www.who.int/publications/i/item/9789241549028" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">OMS</a></p>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">🏃</span>
                    Activos:
                  </h4>
                  <p className="text-lg font-bold text-blue-800 mb-[0.382rem]">1.2-1.6g/kg peso</p>
                  <p className="text-xs text-blue-700">Para personas con actividad física regular</p>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">💪</span>
                    Atletas/Fuerza:
                  </h4>
                  <p className="text-lg font-bold text-blue-800 mb-[0.382rem]">1.6-2.4g/kg peso</p>
                  <p className="text-xs text-blue-700">Según <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios de síntesis proteica</a></p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Timing y distribución óptima
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">⏰</span>
                    Distribución diaria:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>20-40g por comida:</strong> Optimiza síntesis proteica muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>3-4 comidas al día:</strong> Mantiene balance nitrogenado positivo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Antes de dormir:</strong> Caseína o proteína de digestión lenta</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span><strong>Post-entreno:</strong> 20-25g dentro de 2 horas</span>
                    </li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-orange-700 flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Factores que aumentan necesidades:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span><strong>Edad avanzada:</strong> Resistencia anabólica</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span><strong>Déficit calórico:</strong> Para preservar masa muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Entrenamiento intenso:</strong> Mayor síntesis y degradación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Recuperación de lesiones:</strong> Reparación tisular</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Señales de deficiencia proteica
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">🚨</span>
                    Síntomas tempranos:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Pérdida de masa muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Mayor tiempo de recuperación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Fatiga constante</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Antojos de alimentos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Cabello y uñas débiles</span>
                    </li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">⚡</span>
                    Consecuencias a largo plazo:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Sarcopenia (pérdida muscular)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Sistema inmune debilitado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Problemas de cicatrización</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Metabolismo más lento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Mayor riesgo de fracturas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💊</span>
                ¿Necesito suplementos de proteína?
              </h3>
              <div className="space-golden-sm">
                <p className="text-sm text-yellow-800 mb-[1.618rem] font-medium">
                  <strong>La mayoría de personas pueden cubrir sus necesidades con alimentos.</strong>
                  Los suplementos son útiles en situaciones específicas:
                </p>
                <div className="grid gap-[1.618rem] md:grid-cols-2">
                  <div className="card-golden bg-white/50">
                    <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                      <span className="text-lg mr-2">✅</span>
                      Cuándo considerar suplementos:
                    </h4>
                    <ul className="text-sm text-yellow-800 space-golden-xs">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Atletas con necesidades muy altas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Dietas veganas estrictas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Personas mayores con poco apetito</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Conveniencia post-entreno</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-golden bg-white/50">
                    <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                      <span className="text-lg mr-2">🥤</span>
                      Tipos de proteína en polvo:
                    </h4>
                    <ul className="text-sm text-yellow-800 space-golden-xs">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Whey:</strong> Rápida absorción, post-entreno</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span><strong>Caseína:</strong> Lenta absorción, antes de dormir</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Vegetal:</strong> Guisante, arroz, cáñamo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span><strong>Mixtas:</strong> Combinan diferentes fuentes</span>
                      </li>
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
                    La &quot;ventana anabólica&quot; es más amplia de lo que se pensaba. Lo importante es
                    el total diario de proteína. Si entrenas en ayunas o hace muchas horas que no comes,
                    sí es beneficioso tomar proteína pronto después del ejercicio.
                  </p>
                </div>
              </div>
            </div>

            {/* Enlaces contextuales */}
            <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu cálculo de proteína
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tus calorías totales:</a></strong> Integra tu proteína en un plan nutricional completo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Conoce tu gasto calórico:</a></strong> Determina cuántas calorías necesitas según tu actividad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/agua" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu hidratación:</a></strong> La hidratación afecta la síntesis proteica</span>
                </li>
              </ul>
            </div>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/proteina" />

            {/* Widget para embeber - genera backlinks naturales */}
            <div className="flex justify-center">
              <EmbedWidget />
            </div>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/proteina"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="proteina" />
          </div>
        </div>
      </Container>
    </>
  );
}