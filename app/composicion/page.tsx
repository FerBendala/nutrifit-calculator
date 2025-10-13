"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams, formatPercentage } from '@/lib/format';
import { calculateBodyComposition, calculateBodyFatNavy, calculateWaistHipRatio } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

interface BodyCompositionResult {
  bodyFat: number;
  category: string;
  leanMass: number;
  fatMass: number;
  waistHipRatio: number;
  waistHipCategory: string;
  waistHipRiskLevel: string;
}

export default function ComposicionPage() {
  const [formData, setFormData] = useState({
    sex: 'male',
    height: '',
    weight: '',
    waist: '',
    neck: '',
    hip: ''
  });

  const [result, setResult] = useState<BodyCompositionResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, height, weight, waist, neck, hip } = formData;

    if (!height || !weight || !waist || !neck) return;
    if (sex === 'female' && !hip) return;

    try {
      // Calculate body fat using Navy method
      const bodyFatResult = calculateBodyFatNavy(
        sex as 'male' | 'female',
        parseInt(height),
        parseFloat(waist),
        parseFloat(neck),
        sex === 'female' ? parseFloat(hip) : undefined
      );

      // Calculate body composition
      const composition = calculateBodyComposition(
        parseFloat(weight),
        bodyFatResult.bodyFat
      );

      // Calculate waist-to-hip ratio (if hip is provided)
      let waistHipData = { ratio: 0, category: '', riskLevel: '' };
      if (hip) {
        waistHipData = calculateWaistHipRatio(
          parseFloat(waist),
          parseFloat(hip),
          sex as 'male' | 'female'
        );
      }

      setResult({
        bodyFat: bodyFatResult.bodyFat,
        category: bodyFatResult.category,
        leanMass: composition.leanMass,
        fatMass: composition.fatMass,
        waistHipRatio: waistHipData.ratio,
        waistHipCategory: waistHipData.category,
        waistHipRiskLevel: waistHipData.riskLevel
      });
    } catch (error) {
      console.error('Error calculating body composition:', error);
    }
  };

  const isFormValid = formData.height && formData.weight && formData.waist && formData.neck &&
    (formData.sex === 'male' || formData.hip);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Esencial': return 'text-blue-600';
      case 'Atlético': return 'text-green-600';
      case 'Fitness': return 'text-emerald-600';
      case 'Aceptable': return 'text-yellow-600';
      case 'Obesidad': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo riesgo': return 'text-green-600';
      case 'Riesgo moderado': return 'text-yellow-600';
      case 'Alto riesgo': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const jsonLd = generateJsonLd('composicion');

  return (
    <>
      <SchemaMarkup calculatorKey="composicion" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Composición Corporal Médica
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de composición corporal con método Navy validado científicamente.
              Porcentaje de grasa, masa magra y ratio cintura-cadera precisos para nutricionistas.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de composición corporal">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Calculadora de Composición Corporal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="sex"
                      label="Sexo biológico"
                      value={formData.sex}
                      onChange={handleInputChange('sex')}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="height"
                      label="Altura"
                      value={formData.height}
                      onChange={handleInputChange('height')}
                      min={130}
                      max={250}
                      unit="cm"
                      placeholder="170"
                      required
                    />

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

                    <NumberInput
                      id="waist"
                      label="Circunferencia de cintura"
                      value={formData.waist}
                      onChange={handleInputChange('waist')}
                      min={50}
                      max={200}
                      step={0.1}
                      unit="cm"
                      placeholder="80.0"
                      required
                    />

                    <NumberInput
                      id="neck"
                      label="Circunferencia del cuello"
                      value={formData.neck}
                      onChange={handleInputChange('neck')}
                      min={25}
                      max={60}
                      step={0.1}
                      unit="cm"
                      placeholder="35.0"
                      required
                    />

                    {formData.sex === 'female' && (
                      <NumberInput
                        id="hip"
                        label="Circunferencia de cadera"
                        value={formData.hip}
                        onChange={handleInputChange('hip')}
                        min={60}
                        max={200}
                        step={0.1}
                        unit="cm"
                        placeholder="95.0"
                        required
                      />
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    🎯 Calcular Composición
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="space-golden-md">
              {/* Main Results */}
              <Card className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                    <span className="text-3xl mr-3">📊</span>
                    Tus Resultados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    {/* Body Fat Percentage */}
                    <article className="text-center card-golden bg-primary text-primary-foreground">
                      <div className="text-5xl font-bold mb-[0.618rem]">
                        {formatPercentage(result.bodyFat)}
                      </div>
                      <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                        Grasa Corporal
                      </div>
                      <div className={`text-lg font-semibold ${getCategoryColor(result.category)} bg-white px-2 py-1 rounded`}>
                        {result.category}
                      </div>
                    </article>

                    {/* Body Composition Breakdown */}
                    <div className="space-golden-sm">
                      <article className="text-center card-golden bg-secondary/50 mb-[1rem]">
                        <div className="text-3xl font-bold text-green-600 mb-[0.382rem]">
                          {formatGrams(result.leanMass, 1)}
                        </div>
                        <div className="text-sm font-semibold text-green-700">
                          Masa Magra (músculo, huesos, órganos)
                        </div>
                      </article>

                      <article className="text-center card-golden bg-secondary/50">
                        <div className="text-3xl font-bold text-red-600 mb-[0.382rem]">
                          {formatGrams(result.fatMass, 1)}
                        </div>
                        <div className="text-sm font-semibold text-red-700">
                          Masa Grasa
                        </div>
                      </article>
                    </div>
                  </div>

                  {/* Visual Bar Chart */}
                  <section className="mt-[2.618rem] space-golden-sm">
                    <h4 className="font-bold mb-[1rem] text-lg text-center">
                      Distribución de Masa Corporal
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Masa Magra</span>
                          <span>{formatGrams(result.leanMass, 1)} ({formatPercentage(100 - result.bodyFat)})</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${100 - result.bodyFat}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Masa Grasa</span>
                          <span>{formatGrams(result.fatMass, 1)} ({formatPercentage(result.bodyFat)})</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${result.bodyFat}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Waist-Hip Ratio (if available) */}
                  {result.waistHipRatio > 0 && (
                    <section className="mt-[2.618rem] card-golden bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400">
                      <h4 className="font-bold mb-[1.618rem] text-lg flex items-center">
                        <span className="text-2xl mr-3">📏</span>
                        Ratio Cintura-Cadera
                      </h4>
                      <div className="grid gap-[1rem] md:grid-cols-2">
                        <article className="text-center">
                          <div className="text-3xl font-bold text-purple-600 mb-[0.382rem]">
                            {result.waistHipRatio.toFixed(2)}
                          </div>
                          <div className="text-sm font-semibold text-purple-700">
                            Ratio C/C
                          </div>
                        </article>
                        <article className="text-center">
                          <div className={`text-lg font-bold ${getRiskColor(result.waistHipRiskLevel)}`}>
                            {result.waistHipRiskLevel}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Riesgo cardiovascular
                          </div>
                        </article>
                      </div>
                    </section>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu composición corporal y grasa corporal
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La composición corporal es más importante que el peso total. Conocer tu porcentaje de grasa
                y masa magra te permite optimizar tu entrenamiento y nutrición de forma más efectiva.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Método Navy
                </h3>
                <p className="text-muted-foreground leading-[1.618]">
                  Utilizamos el método de la Marina de EE.UU., validado científicamente y utilizado
                  por organizaciones militares. Solo requiere medidas simples con cinta métrica
                  y tiene una precisión del ±3-4% comparado con métodos más costosos.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Importancia de la composición
                </h3>
                <p className="text-muted-foreground leading-[1.618]">
                  Dos personas pueden pesar lo mismo pero tener composiciones muy diferentes.
                  Mayor masa magra significa mayor metabolismo, mejor rendimiento físico y
                  mejor salud metabólica general.
                </p>
              </article>
            </section>

            <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📋</span>
                Rangos de grasa corporal saludable
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">👨</span>
                    Hombres
                  </h4>
                  <ul className="text-sm text-blue-800 space-golden-xs">
                    <li className="flex justify-between">
                      <span>Esencial:</span>
                      <span className="font-medium">2-5%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Atlético:</span>
                      <span className="font-medium">6-13%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fitness:</span>
                      <span className="font-medium">14-17%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Aceptable:</span>
                      <span className="font-medium">18-24%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obesidad:</span>
                      <span className="font-medium">25%+</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-pink-700 flex items-center">
                    <span className="text-lg mr-2">👩</span>
                    Mujeres
                  </h4>
                  <ul className="text-sm text-blue-800 space-golden-xs">
                    <li className="flex justify-between">
                      <span>Esencial:</span>
                      <span className="font-medium">10-13%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Atlético:</span>
                      <span className="font-medium">14-20%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fitness:</span>
                      <span className="font-medium">21-24%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Aceptable:</span>
                      <span className="font-medium">25-31%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obesidad:</span>
                      <span className="font-medium">32%+</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-green-50 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Cómo mejorar tu composición corporal
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Para reducir grasa corporal:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li>• Déficit calórico moderado (300-500 kcal/día)</li>
                    <li>• Entrenamiento de fuerza 3-4x/semana</li>
                    <li>• Cardio moderado 2-3x/semana</li>
                    <li>• <a href="/proteina" className="text-blue-600 hover:underline font-medium">Proteína alta</a> (2.0-2.4g/kg)</li>
                    <li>• Sueño de calidad (7-9 horas)</li>
                  </ul>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">💪</span>
                    Para ganar masa magra:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li>• Ligero superávit calórico (200-400 kcal/día)</li>
                    <li>• Entrenamiento de fuerza progresivo</li>
                    <li>• <a href="/proteina" className="text-blue-600 hover:underline font-medium">Proteína óptima</a> (1.6-2.2g/kg)</li>
                    <li>• Carbohidratos post-entrenamiento</li>
                    <li>• Descanso adecuado entre sesiones</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="card-golden-lg bg-purple-50 border-l-4 border-purple-400 mb-[2.618rem]">
              <h3 className="font-bold text-purple-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📏</span>
                Ratio Cintura-Cadera: Indicador de salud
              </h3>
              <p className="text-sm text-purple-800 mb-[1rem] leading-[1.618]">
                El ratio cintura-cadera es un indicador importante del riesgo cardiovascular y metabólico.
                La grasa abdominal (visceral) es más peligrosa que la grasa en caderas y muslos.
              </p>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700">Hombres</h4>
                  <ul className="text-sm space-golden-xs">
                    <li className="flex justify-between">
                      <span>Bajo riesgo:</span>
                      <span className="text-green-600 font-medium">&lt; 0.90</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Riesgo moderado:</span>
                      <span className="text-yellow-600 font-medium">0.90 - 0.95</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Alto riesgo:</span>
                      <span className="text-red-600 font-medium">&gt; 0.95</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-pink-700">Mujeres</h4>
                  <ul className="text-sm space-golden-xs">
                    <li className="flex justify-between">
                      <span>Bajo riesgo:</span>
                      <span className="text-green-600 font-medium">&lt; 0.80</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Riesgo moderado:</span>
                      <span className="text-yellow-600 font-medium">0.80 - 0.85</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Alto riesgo:</span>
                      <span className="text-red-600 font-medium">&gt; 0.85</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Cómo tomar las medidas correctamente
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-yellow-700">Tips para medición precisa:</h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Mide en ayunas por la mañana</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Usa cinta métrica flexible pero no elástica</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Mantén la cinta firme pero sin apretar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Respira normalmente durante la medición</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Toma 2-3 medidas y promedia</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-yellow-700">Puntos de medición específicos:</h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span><strong>Cintura:</strong> Parte más estrecha del torso</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span><strong>Cuello:</strong> Justo debajo de la nuez de Adán</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span><strong>Cadera:</strong> Parte más ancha de las caderas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Mantén la postura erguida y natural</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es preciso el método Navy comparado con otros métodos?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El método Navy tiene una precisión del ±3-4% comparado con métodos gold standard como DEXA.
                    Es más preciso que bioimpedancia y mucho más accesible que hidrodensitometría.
                  </p>
                </article>
                <article className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo medir mi composición corporal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Cada 2-4 semanas es suficiente para ver cambios significativos. Los cambios en composición
                    corporal son graduales, especialmente la ganancia de masa magra.
                  </p>
                </article>
                <article className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué mi porcentaje de grasa es diferente a mi <a href="/imc" className="text-blue-600 hover:underline">IMC</a>?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El IMC solo considera peso y altura, no distingue entre músculo y grasa. Una persona
                    musculosa puede tener IMC alto pero bajo porcentaje de grasa. La composición corporal
                    es un indicador más preciso de salud y fitness.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Optimiza tu plan nutricional según tu composición
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tus macros personalizados:</a></strong> Ajusta proteínas, grasas y carbohidratos según tu composición actual</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/ffmi" className="text-blue-600 hover:underline font-medium transition-golden">Evalúa tu FFMI muscular avanzado:</a></strong> Índice preciso de desarrollo muscular para atletas serios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Determina tu gasto calórico:</a></strong> La masa magra influye directamente en tu metabolismo basal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula según tu masa magra para preservar músculo durante pérdida de grasa</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/composicion" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/composicion"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="composicion" />
          </article>
        </main>
      </Container>
    </>
  );
}
