'use client';

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeRMR } from '@/lib/formulas';
import { Activity, Calculator, Flame, Info, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export function RMRCalculator() {
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
              <TabsList className="relative z-10 grid w-full grid-cols-1 sm:grid-cols-2 gap-2 mb-6 sm:mb-[1.618rem] h-auto sm:h-10">
                <TabsTrigger value="basic">Cálculo Básico</TabsTrigger>
                <TabsTrigger value="advanced">Con Composición Corporal</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-golden-sm">
                <form onSubmit={(e) => handleSubmit(e, 'basic')} className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground/90 mb-1">Método Básico (Mifflin-St Jeor + Harris-Benedict)</h3>
                        <p className="text-sm text-info">
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
                  <div className="bg-success-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground/90 mb-1">Método Avanzado (+ Katch-McArdle)</h3>
                        <p className="text-sm text-success">
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

      {result && (
        <section className="space-golden-lg border-t pt-8">
          <header className="mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <Flame className="w-6 h-6 mr-2 text-warning" />
              Tus Resultados de RMR
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Flame className="w-5 h-5 mr-2 text-warning" />
                  Mifflin-St Jeor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">
                  {result.mifflin} <span className="text-lg">kcal/día</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Fórmula más precisa (±10%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Flame className="w-5 h-5 mr-2 text-info" />
                  Harris-Benedict
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-info">
                  {result.harris} <span className="text-lg">kcal/día</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Fórmula clásica revisada</p>
              </CardContent>
            </Card>

            {result.katch && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Flame className="w-5 h-5 mr-2 text-success" />
                    Katch-McArdle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">
                    {result.katch} <span className="text-lg">kcal/día</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Basado en masa magra</p>
                </CardContent>
              </Card>
            )}
          </div>

          <Alert className="mb-6 border-l-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-warning">
            <TrendingUp className="h-5 w-5 text-warning" />
            <AlertDescription className="ml-2">
              <strong>Tu RMR Promedio:</strong> {result.average} kcal/día - Este es tu gasto energético en reposo completo
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Activity className="w-5 h-5 mr-2 text-warning" />
                Necesidades Calóricas Diarias por Nivel de Actividad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Sedentario</p>
                    <p className="text-sm text-muted-foreground">Poco o ningún ejercicio</p>
                  </div>
                  <span className="text-xl font-bold text-foreground">{result.dailyCalorieNeeds.sedentary} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-info-subtle rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Ligera actividad</p>
                    <p className="text-sm text-info">Ejercicio 1-3 días/semana</p>
                  </div>
                  <span className="text-xl font-bold text-foreground">{result.dailyCalorieNeeds.light} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-success-subtle rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Moderada actividad</p>
                    <p className="text-sm text-success">Ejercicio 3-5 días/semana</p>
                  </div>
                  <span className="text-xl font-bold text-foreground">{result.dailyCalorieNeeds.moderate} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-warning-subtle rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Alta actividad</p>
                    <p className="text-sm text-warning">Ejercicio 6-7 días/semana</p>
                  </div>
                  <span className="text-xl font-bold text-foreground">{result.dailyCalorieNeeds.active} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-destructive-subtle rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Muy alta actividad</p>
                    <p className="text-sm text-foreground/90">Ejercicio intenso + trabajo físico</p>
                  </div>
                  <span className="text-xl font-bold text-foreground">{result.dailyCalorieNeeds.veryActive} kcal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Info className="w-5 h-5 mr-2 text-info" />
                Análisis Metabólico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Contexto Metabólico</h4>
                <p className="text-muted-foreground">{result.metabolicContext}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Comparación por Edad</h4>
                <p className="text-muted-foreground">{result.comparisonByAge}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-warning" />
                Recomendaciones Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-warning mr-2 flex-shrink-0">•</span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-success" />
                Factores que Afectan tu RMR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-info-subtle rounded-lg">
                <p className="font-semibold text-foreground mb-1">💪 Impacto de la Masa Muscular</p>
                <p className="text-sm text-info">{result.factors.muscleImpact}</p>
              </div>
              <div className="p-3 bg-warning-subtle rounded-lg">
                <p className="font-semibold text-foreground mb-1">⏰ Efecto de la Edad</p>
                <p className="text-sm text-warning">{result.factors.ageImpact}</p>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg">
                <p className="font-semibold text-pink-900 mb-1">⚥ Diferencias de Género</p>
                <p className="text-sm text-pink-700">{result.factors.genderImpact}</p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
}
