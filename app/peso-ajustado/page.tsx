'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { EmbedWidget } from '@/components/EmbedWidget';
import { SocialShare } from '@/components/SocialShare';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { analyzeAdjustedBodyWeight } from '@/lib/formulas';
import { Calculator, Info, Scale, TrendingUp, Users, Activity, AlertTriangle, Pill } from 'lucide-react';
import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { AdSlot } from '@/components/UnifiedAdSlot';

export default function PesoAjustadoPage() {
  const [formData, setFormData] = useState({
    gender: 'male' as 'male' | 'female',
    weight: '90',
    height: '175',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeAdjustedBodyWeight> | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.weight && formData.height;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;

    try {
      const analysis = analyzeAdjustedBodyWeight(
        parseFloat(formData.weight),
        parseFloat(formData.height),
        formData.gender,
        formData.age ? parseInt(formData.age) : undefined
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating adjusted weight:', error);
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="peso-ajustado" />

      <Container size="xl" className="space-golden-lg">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Peso Ajustado Clínico (ABW)', href: '/peso-ajustado' }
          ]}
        />

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculadora Peso Ajustado Clínico (ABW)
            </h1>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">
              Calculadora profesional de Peso Ajustado según fórmula Robinson.
              Herramienta clínica esencial para dosificación de medicamentos, necesidades calóricas y proteicas en obesidad y bajo peso.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                El <strong>Peso Ajustado (ABW - Adjusted Body Weight)</strong> es una herramienta clínica fundamental desarrollada para
                calcular con precisión necesidades nutricionales y dosis de medicamentos en personas con obesidad o bajo peso. Utiliza la fórmula{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/6930408/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  Robinson (1983)
                </a>{' '}
                para el peso ideal y ajusta según composición corporal. Estudios en{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4163889/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  farmacología clínica
                </a>{' '}
                demuestran su superioridad para dosificación precisa.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A diferencia del peso ideal o actual, el peso ajustado considera que el exceso de grasa corporal también tiene demandas metabólicas,
                pero menores que la masa magra. Es el estándar en hospitales para cálculos críticos.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Peso Ajustado">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Calculadora de Peso Ajustado Clínico
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Calcula tu peso ajustado para uso clínico y nutricional
                </p>
              </CardHeader>
              <CardContent className="space-golden-md">
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-1">Peso Ajustado para Uso Clínico</h3>
                        <p className="text-sm text-blue-700">
                          Calcula peso ideal (Robinson) y peso ajustado (ABW) para cálculos clínicos precisos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="gender"
                      label="Sexo"
                      value={formData.gender}
                      onChange={(value) => handleInputChange('gender', value)}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="age"
                      label="Edad (opcional)"
                      value={formData.age}
                      onChange={(value) => handleInputChange('age', value)}
                      placeholder="30"
                      unit="años"
                      min={15}
                      max={100}
                      step={1}
                    />

                    <NumberInput
                      id="weight"
                      label="Peso actual"
                      value={formData.weight}
                      onChange={(value) => handleInputChange('weight', value)}
                      placeholder="90"
                      unit="kg"
                      min={30}
                      max={250}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="height"
                      label="Altura"
                      value={formData.height}
                      onChange={(value) => handleInputChange('height', value)}
                      placeholder="175"
                      unit="cm"
                      min={120}
                      max={250}
                      step={0.5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular Peso Ajustado
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Resultados */}
          {result && (
            <section className="space-golden-lg border-t pt-8">
              <header className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-orange-600" />
                  Tus Resultados de Peso Ajustado
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-blue-600" />
                      Peso Actual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {result.actualWeight.toFixed(1)} <span className="text-lg">kg</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Tu peso corporal actual</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-green-600" />
                      Peso Ideal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {result.idealWeight.toFixed(1)} <span className="text-lg">kg</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Robinson (1983)</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-orange-600" />
                      Peso Ajustado (ABW)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">
                      {result.adjustedWeight.toFixed(1)} <span className="text-lg">kg</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Para uso clínico</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mb-6 border-l-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-500">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <AlertDescription className="ml-2">
                  <strong>Categoría:</strong> {result.weightCategory} | <strong>Diferencia:</strong> {result.weightDifference > 0 ? '+' : ''}{result.weightDifference.toFixed(1)} kg ({result.percentageOverIdeal > 0 ? '+' : ''}{result.percentageOverIdeal.toFixed(1)}%)
                </AlertDescription>
              </Alert>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Pill className="w-5 h-5 mr-2 text-purple-600" />
                    Guía de Uso Clínico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {result.clinicalUse.useAdjustedWeight ? '✓' : '−'}
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Usar Peso Ajustado</p>
                        <p className="text-sm text-blue-700">{result.clinicalUse.reason}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="w-5 h-5 mr-2 text-green-600" />
                      Necesidades de Proteína
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso actual</p>
                        <p className="font-semibold">{result.proteinNeeds.byActualWeight.min} - {result.proteinNeeds.byActualWeight.max} g/día</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso ideal</p>
                        <p className="font-semibold">{result.proteinNeeds.byIdealWeight.min} - {result.proteinNeeds.byIdealWeight.max} g/día</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border-2 border-green-500">
                        <p className="text-sm text-green-700">Recomendado</p>
                        <p className="font-semibold text-green-900">{result.proteinNeeds.recommended}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                      Necesidades Calóricas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso actual</p>
                        <p className="font-semibold">{result.calorieNeeds.byActualWeight} kcal/día</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso ideal</p>
                        <p className="font-semibold">{result.calorieNeeds.byIdealWeight} kcal/día</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg border-2 border-orange-500">
                        <p className="text-sm text-orange-700">Recomendado</p>
                        <p className="font-semibold text-orange-900">{result.calorieNeeds.recommended}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Comparación IMC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">IMC Actual</p>
                      <p className="text-2xl font-bold text-blue-600">{result.bmiActual.toFixed(1)}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">IMC Ideal</p>
                      <p className="text-2xl font-bold text-green-600">{result.bmiIdeal.toFixed(1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    Recomendaciones Personalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-2 flex-shrink-0">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Pill className="w-5 h-5 mr-2 text-blue-600" />
                      Aplicaciones Clínicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.clinicalApplications.map((app, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                      Notas Importantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.importantNotes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-600 mr-2">⚠</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Espacio para anuncios */}
          <div className="my-12 flex justify-center">
            <AdSlot adSlot="3456789014" adFormat="horizontal" />
          </div>

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Información Completa sobre el Peso Ajustado
              </h2>
            </header>
            
            <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-blue-800 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Fórmulas Científicas del Peso Ajustado
                </h3>
              </header>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Peso Ideal Robinson (1983)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>Hombres: 52 kg + 1.9 kg por pulgada sobre 5 pies</p>
                      <p>Mujeres: 49 kg + 1.7 kg por pulgada sobre 5 pies</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Fórmula más usada en práctica clínica - <a href="https://pubmed.ncbi.nlm.nih.gov/6930408/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">validación original</a>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">2. Peso Ajustado (ABW)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>ABW = Peso Ideal + 0.4 × (Peso Actual - Peso Ideal)</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Factor 0.4 estándar en nutrición clínica - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4163889/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">evidencia farmacológica</a>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">3. Cuándo Usar Cada Peso</h4>
                    <ul className="text-sm text-gray-700 space-y-1 mt-2">
                      <li>• <strong>Peso Actual:</strong> Si estás dentro del 85-120% del peso ideal</li>
                      <li>• <strong>Peso Ideal:</strong> Objetivo terapéutico en bajo peso severo</li>
                      <li>• <strong>Peso Ajustado:</strong> Cálculos clínicos si superas el 120% del peso ideal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-orange-50 border-l-4 border-orange-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-orange-800">
                  Complementa tu evaluación de peso
                </h3>
              </header>
              <div className="p-6">
                <ul className="space-y-3 text-orange-800">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/peso-ideal" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu peso ideal:
                        </a>
                      </strong>{' '}
                      5 fórmulas científicas para determinar tu peso objetivo saludable
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula proteína necesaria:
                        </a>
                      </strong>{' '}
                      Usa tu peso ajustado para necesidades proteicas precisas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/bmr" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu BMR:
                        </a>
                      </strong>{' '}
                      Metabolismo basal según tu peso para calorías precisas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">
                          Evalúa tu IMC:
                        </a>
                      </strong>{' '}
                      Índice de masa corporal para contexto general de salud
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="peso-ajustado" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora Peso Ajustado Clínico ABW - Fórmula Robinson"
            url="https://nutrifit-calculator.com/peso-ajustado"
            description="Calcula tu peso ajustado clínico con fórmula Robinson. Herramienta médica para dosificación precisa y necesidades nutricionales. ¡Totalmente gratis!"
          />
        </main>
      </Container>
    </>
  );
}

