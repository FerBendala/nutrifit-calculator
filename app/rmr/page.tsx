'use client';

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeRMR } from '@/lib/formulas';
import { Activity, AlertTriangle, Calculator, Flame, Info, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export default function RMRPage() {
  const [formData, setFormData] = useState({
    basicGender: 'male' as 'male' | 'female',
    basicWeight: '75',
    basicHeight: '175',
    basicAge: '30',
    advancedGender: 'male' as 'male' | 'female',
    advancedWeight: '75',
    advancedHeight: '175',
    advancedAge: '30',
    bodyFat: '15'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeRMR> | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = (tab: 'basic' | 'advanced') => {
    if (tab === 'basic') {
      return formData.basicWeight && formData.basicHeight && formData.basicAge;
    }
    return formData.advancedWeight && formData.advancedHeight && formData.advancedAge && formData.bodyFat;
  };

  const handleSubmit = (e: React.FormEvent, tab: 'basic' | 'advanced') => {
    e.preventDefault();

    if (!isFormValid(tab)) return;

    try {
      if (tab === 'basic') {
        const analysis = analyzeRMR(
          parseFloat(formData.basicWeight),
          parseFloat(formData.basicHeight),
          parseInt(formData.basicAge),
          formData.basicGender
        );
        setResult(analysis);
      } else {
        const analysis = analyzeRMR(
          parseFloat(formData.advancedWeight),
          parseFloat(formData.advancedHeight),
          parseInt(formData.advancedAge),
          formData.advancedGender,
          parseFloat(formData.bodyFat)
        );
        setResult(analysis);
      }
    } catch (error) {
      console.error('Error calculating RMR:', error);
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="rmr" />

      <Container size="xl" className="py-[4.236rem]">

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora RMR Médica
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de RMR (Resting Metabolic Rate) con 3 fórmulas científicas validadas.
              Gasto energético en reposo más práctico que BMR para planificación nutricional diaria.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                El <strong>RMR (Resting Metabolic Rate)</strong> mide las calorías que quemas en reposo completo, similar al BMR
                pero bajo condiciones menos estrictas. Desarrollado con fórmulas{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  Mifflin-St Jeor (1990)
                </a>,{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/6741850/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  Harris-Benedict revisada (1984)
                </a>{' '}
                y Katch-McArdle. Estudios recientes en{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8308339/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  poblaciones diversas
                </a>{' '}
                confirman su precisión para planificación nutricional.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A diferencia del BMR que requiere ayuno de 12 horas y ambiente controlado, el RMR es más práctico para mediciones
                diarias y ajustes nutricionales. Representa el 60-75% de tu gasto energético total.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de RMR">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🔥</span>
                  Calculadora de RMR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-golden-md">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-[1.618rem]">
                    <TabsTrigger value="basic">Cálculo Básico</TabsTrigger>
                    <TabsTrigger value="advanced">Con Composición Corporal</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-golden-sm">
                    <form onSubmit={(e) => handleSubmit(e, 'basic')} className="space-golden-md">
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-blue-800 mb-1">Método Básico (Mifflin-St Jeor + Harris-Benedict)</h3>
                            <p className="text-sm text-blue-700">
                              Usa solo peso, altura, edad y sexo. Precisión estándar para la mayoría de personas.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="basicGender"
                          label="Sexo"
                          value={formData.basicGender}
                          onChange={(value) => handleInputChange('basicGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="basicAge"
                          label="Edad"
                          value={formData.basicAge}
                          onChange={(value) => handleInputChange('basicAge', value)}
                          placeholder="30"
                          unit="años"
                          min={15}
                          max={100}
                          step={1}
                          required
                        />

                        <NumberInput
                          id="basicWeight"
                          label="Peso corporal"
                          value={formData.basicWeight}
                          onChange={(value) => handleInputChange('basicWeight', value)}
                          placeholder="75"
                          unit="kg"
                          min={30}
                          max={250}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="basicHeight"
                          label="Altura"
                          value={formData.basicHeight}
                          onChange={(value) => handleInputChange('basicHeight', value)}
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
                        disabled={!isFormValid('basic')}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular RMR Básico
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-golden-sm">
                    <form onSubmit={(e) => handleSubmit(e, 'advanced')} className="space-golden-md">
                      <div className="bg-green-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-green-800 mb-1">Método Avanzado (+ Katch-McArdle)</h3>
                            <p className="text-sm text-green-700">
                              Incluye composición corporal para máxima precisión basada en masa magra.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="advancedGender"
                          label="Sexo"
                          value={formData.advancedGender}
                          onChange={(value) => handleInputChange('advancedGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="advancedAge"
                          label="Edad"
                          value={formData.advancedAge}
                          onChange={(value) => handleInputChange('advancedAge', value)}
                          placeholder="30"
                          unit="años"
                          min={15}
                          max={100}
                          step={1}
                          required
                        />

                        <NumberInput
                          id="advancedWeight"
                          label="Peso corporal"
                          value={formData.advancedWeight}
                          onChange={(value) => handleInputChange('advancedWeight', value)}
                          placeholder="75"
                          unit="kg"
                          min={30}
                          max={250}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="advancedHeight"
                          label="Altura"
                          value={formData.advancedHeight}
                          onChange={(value) => handleInputChange('advancedHeight', value)}
                          placeholder="175"
                          unit="cm"
                          min={120}
                          max={250}
                          step={0.5}
                          required
                        />

                        <NumberInput
                          id="bodyFat"
                          label="Porcentaje de grasa corporal"
                          value={formData.bodyFat}
                          onChange={(value) => handleInputChange('bodyFat', value)}
                          placeholder="15"
                          unit="%"
                          min={3}
                          max={50}
                          step={0.1}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid('advanced')}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular RMR Avanzado
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Resultados */}
          {result && (
            <section className="space-golden-lg border-t pt-8">
              <header className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Flame className="w-6 h-6 mr-2 text-orange-600" />
                  Tus Resultados de RMR
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Flame className="w-5 h-5 mr-2 text-orange-600" />
                      Mifflin-St Jeor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">
                      {result.mifflin} <span className="text-lg">kcal/día</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Fórmula más precisa (±10%)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Flame className="w-5 h-5 mr-2 text-blue-600" />
                      Harris-Benedict
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {result.harris} <span className="text-lg">kcal/día</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Fórmula clásica revisada</p>
                  </CardContent>
                </Card>

                {result.katch && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Flame className="w-5 h-5 mr-2 text-green-600" />
                        Katch-McArdle
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        {result.katch} <span className="text-lg">kcal/día</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Basado en masa magra</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Alert className="mb-6 border-l-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-500">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <AlertDescription className="ml-2">
                  <strong>Tu RMR Promedio:</strong> {result.average} kcal/día - Este es tu gasto energético en reposo completo
                </AlertDescription>
              </Alert>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    Necesidades Calóricas Diarias por Nivel de Actividad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">Sedentario</p>
                        <p className="text-sm text-gray-600">Poco o ningún ejercicio</p>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{result.dailyCalorieNeeds.sedentary} kcal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-blue-900">Ligera actividad</p>
                        <p className="text-sm text-blue-700">Ejercicio 1-3 días/semana</p>
                      </div>
                      <span className="text-xl font-bold text-blue-900">{result.dailyCalorieNeeds.light} kcal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-green-900">Moderada actividad</p>
                        <p className="text-sm text-green-700">Ejercicio 3-5 días/semana</p>
                      </div>
                      <span className="text-xl font-bold text-green-900">{result.dailyCalorieNeeds.moderate} kcal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-orange-900">Alta actividad</p>
                        <p className="text-sm text-orange-700">Ejercicio 6-7 días/semana</p>
                      </div>
                      <span className="text-xl font-bold text-orange-900">{result.dailyCalorieNeeds.active} kcal</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-red-900">Muy alta actividad</p>
                        <p className="text-sm text-red-700">Ejercicio intenso + trabajo físico</p>
                      </div>
                      <span className="text-xl font-bold text-red-900">{result.dailyCalorieNeeds.veryActive} kcal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Análisis Metabólico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contexto Metabólico</h4>
                    <p className="text-gray-700">{result.metabolicContext}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Comparación por Edad</h4>
                    <p className="text-gray-700">{result.comparisonByAge}</p>
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    Factores que Afectan tu RMR
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-900 mb-1">💪 Impacto de la Masa Muscular</p>
                    <p className="text-sm text-blue-700">{result.factors.muscleImpact}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-semibold text-purple-900 mb-1">⏰ Efecto de la Edad</p>
                    <p className="text-sm text-purple-700">{result.factors.ageImpact}</p>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <p className="font-semibold text-pink-900 mb-1">⚥ Diferencias de Género</p>
                    <p className="text-sm text-pink-700">{result.factors.genderImpact}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Información Completa sobre el RMR
              </h2>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-green-50 border-l-4 border-green-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-green-800 flex items-center">
                    <Flame className="w-5 h-5 mr-2" />
                    Ventajas del RMR
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Más práctico que BMR:</strong> No requiere ayuno de 12 horas ni laboratorio - <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">validación científica</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>3 fórmulas validadas:</strong> Comparación automática para mayor precisión</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Base para planificación:</strong> Calcula necesidades calóricas totales según actividad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Seguimiento metabólico:</strong> Detecta cambios en metabolismo con el tiempo</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-yellow-50 border-l-4 border-yellow-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-yellow-800 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    RMR vs BMR: Diferencias Clave
                  </h3>
                </header>
                <div className="p-6">
                  <div className="space-y-3 text-sm text-yellow-800">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <p className="font-semibold mb-1">🔬 BMR (Basal Metabolic Rate)</p>
                      <p>Medición en laboratorio, ayuno 12h, temperatura controlada, máxima precisión científica</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <p className="font-semibold mb-1">💪 RMR (Resting Metabolic Rate)</p>
                      <p>Condiciones menos estrictas, más práctico, usualmente 5-10% mayor que BMR</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <p className="font-semibold mb-1">📊 Diferencia Típica</p>
                      <p>RMR suele ser 50-100 kcal mayor que BMR debido a condiciones menos restrictivas</p>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-blue-800 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Fórmulas Científicas del RMR
                </h3>
              </header>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Mifflin-St Jeor (1990)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>Hombres: 10×peso + 6.25×altura - 5×edad + 5</p>
                      <p>Mujeres: 10×peso + 6.25×altura - 5×edad - 161</p>
                    </div>
                    <p className="text-sm text-gray-700">Considerada la más precisa para población general moderna</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">2. Harris-Benedict Revisada (1984)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>Hombres: 88.362 + (13.397×peso) + (4.799×altura) - (5.677×edad)</p>
                      <p>Mujeres: 447.593 + (9.247×peso) + (3.098×altura) - (4.330×edad)</p>
                    </div>
                    <p className="text-sm text-gray-700">Fórmula clásica actualizada por Roza & Shizgal</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">3. Katch-McArdle (1996)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>RMR = 370 + (21.6 × masa magra en kg)</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Máxima precisión cuando conoces tu composición corporal - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8308339/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">evidencia clínica</a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-orange-50 border-l-4 border-orange-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-orange-800">
                  Complementa tu evaluación metabólica
                </h3>
              </header>
              <div className="p-6">
                <ul className="space-y-3 text-orange-800">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/bmr" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu BMR preciso:
                        </a>
                      </strong>{' '}
                      Metabolismo basal con 3 fórmulas científicas en condiciones basales
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu TDEE completo:
                        </a>
                      </strong>{' '}
                      Gasto energético total diario incluyendo toda tu actividad
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/composicion" className="text-blue-600 hover:underline font-medium transition-golden">
                          Mide tu composición corporal:
                        </a>
                      </strong>{' '}
                      Masa magra y grasa para usar Katch-McArdle con máxima precisión
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">
                          Ajusta tu proteína diaria:
                        </a>
                      </strong>{' '}
                      Necesidades específicas según tu RMR y objetivos
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="rmr" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora RMR Médica - Tasa Metabólica en Reposo"
            url="https://nutrifit-calculator.com/rmr"
            description="Calcula tu RMR con 3 fórmulas científicas validadas. Gasto energético en reposo más práctico que BMR. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="rmr" />
        </main>
      </Container>
    </>
  );
}

