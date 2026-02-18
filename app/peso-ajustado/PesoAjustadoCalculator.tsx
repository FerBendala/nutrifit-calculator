'use client';

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeAdjustedBodyWeight } from '@/lib/formulas';
import { Activity, AlertTriangle, Calculator, Info, Pill, Scale, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function PesoAjustadoCalculator() {
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
      <section id="calculator" aria-label="Calculadora de Peso Ajustado">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <span className="text-3xl mr-3">⚖️</span>
              Calculadora de Peso Ajustado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-golden-md">
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="bg-info-subtle rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground/90 mb-1">Peso Ajustado para Uso Clínico</h3>
                    <p className="text-sm text-info">
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

      {result && (
        <section className="space-golden-lg border-t pt-8">
          <header className="mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <Scale className="w-6 h-6 mr-2 text-warning" />
              Tus Resultados de Peso Ajustado
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Scale className="w-5 h-5 mr-2 text-info" />
                  Peso Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-info">
                  {result.actualWeight.toFixed(1)} <span className="text-lg">kg</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Tu peso corporal actual</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Scale className="w-5 h-5 mr-2 text-success" />
                  Peso Ideal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">
                  {result.idealWeight.toFixed(1)} <span className="text-lg">kg</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Robinson (1983)</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-warning">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Scale className="w-5 h-5 mr-2 text-warning" />
                  Peso Ajustado (ABW)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">
                  {result.adjustedWeight.toFixed(1)} <span className="text-lg">kg</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Para uso clínico</p>
              </CardContent>
            </Card>
          </div>

          <Alert className="mb-6 border-l-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-warning">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <AlertDescription className="ml-2">
              <strong>Categoría:</strong> {result.weightCategory} | <strong>Diferencia:</strong> {result.weightDifference > 0 ? '+' : ''}{result.weightDifference.toFixed(1)} kg ({result.percentageOverIdeal > 0 ? '+' : ''}{result.percentageOverIdeal.toFixed(1)}%)
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Pill className="w-5 h-5 mr-2 text-warning" />
                Guía de Uso Clínico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-info-subtle rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-info text-info-foreground rounded-full flex items-center justify-center font-bold">
                    {result.clinicalUse.useAdjustedWeight ? '✓' : '−'}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Usar Peso Ajustado</p>
                    <p className="text-sm text-info">{result.clinicalUse.reason}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2 text-success" />
                  Necesidades de Proteína
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Por peso actual</p>
                    <p className="font-semibold">{result.proteinNeeds.byActualWeight.min} - {result.proteinNeeds.byActualWeight.max} g/día</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Por peso ideal</p>
                    <p className="font-semibold">{result.proteinNeeds.byIdealWeight.min} - {result.proteinNeeds.byIdealWeight.max} g/día</p>
                  </div>
                  <div className="p-3 bg-success-subtle rounded-lg border-2 border-success">
                    <p className="text-sm text-success">Recomendado</p>
                    <p className="font-semibold text-foreground">{result.proteinNeeds.recommended}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 mr-2 text-warning" />
                  Necesidades Calóricas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Por peso actual</p>
                    <p className="font-semibold">{result.calorieNeeds.byActualWeight} kcal/día</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Por peso ideal</p>
                    <p className="font-semibold">{result.calorieNeeds.byIdealWeight} kcal/día</p>
                  </div>
                  <div className="p-3 bg-warning-subtle rounded-lg border-2 border-warning">
                    <p className="text-sm text-warning">Recomendado</p>
                    <p className="font-semibold text-foreground">{result.calorieNeeds.recommended}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Info className="w-5 h-5 mr-2 text-info" />
                Comparación IMC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-info-subtle rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">IMC Actual</p>
                  <p className="text-2xl font-bold text-info">{result.bmiActual.toFixed(1)}</p>
                </div>
                <div className="text-center p-4 bg-success-subtle rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">IMC Ideal</p>
                  <p className="text-2xl font-bold text-success">{result.bmiIdeal.toFixed(1)}</p>
                </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Pill className="w-5 h-5 mr-2 text-info" />
                  Aplicaciones Clínicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {result.clinicalApplications.map((app, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                  Notas Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {result.importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-warning mr-2">⚠</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}
