'use client';

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeABSI } from '@/lib/formulas';
import { AlertTriangle, Heart, Info, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function ABSICalculator() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    waistCircumference: '85',
    gender: 'male' as 'male' | 'female',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeABSI> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.waistCircumference || !formData.age) return;

    try {
      const analysis = analyzeABSI(
        parseFloat(formData.waistCircumference),
        parseFloat(formData.weight),
        parseFloat(formData.height),
        formData.gender,
        parseInt(formData.age)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating ABSI:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.waistCircumference && formData.age;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Muy Bajo':
        return 'text-foreground bg-success-subtle border-success';
      case 'Bajo':
        return 'text-foreground bg-info-subtle border-info';
      case 'Moderado':
        return 'text-foreground bg-warning-subtle border-warning';
      case 'Alto':
        return 'text-foreground bg-warning-subtle border-warning';
      case 'Muy Alto':
        return 'text-foreground bg-destructive-subtle border-destructive';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de ABSI">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              Calculadora de ABSI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="bg-info-subtle rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> El ABSI requiere circunferencia de cintura medida a nivel del ombligo.
                    Mide en centímetros, con el abdomen relajado, después de exhalar normalmente.
                  </p>
                </div>
              </div>

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

                <NumberInput
                  id="height"
                  label="Altura"
                  value={formData.height}
                  onChange={handleInputChange('height')}
                  min={100}
                  max={250}
                  step={0.1}
                  unit="cm"
                  placeholder="175.0"
                  required
                />

                <NumberInput
                  id="waistCircumference"
                  label="Circunferencia de Cintura"
                  value={formData.waistCircumference}
                  onChange={handleInputChange('waistCircumference')}
                  min={50}
                  max={200}
                  step={0.1}
                  unit="cm"
                  placeholder="85.0"
                  required
                />

                <SelectInput
                  id="gender"
                  label="Género"
                  value={formData.gender}
                  onChange={handleInputChange('gender')}
                  options={[
                    { value: 'male', label: 'Hombre' },
                    { value: 'female', label: 'Mujer' }
                  ]}
                  required
                />

                <NumberInput
                  id="age"
                  label="Edad"
                  value={formData.age}
                  onChange={handleInputChange('age')}
                  min={18}
                  max={120}
                  step={1}
                  unit="años"
                  placeholder="30"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                Calcular ABSI
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20 mt-8">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <span className="text-3xl mr-3">📊</span>
              Resultados de ABSI
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              <div className={`text-center card-golden border-2 rounded-lg p-6 ${getRiskColor(result.mortalityRisk)}`}>
                <div className="text-5xl font-bold mb-2">
                  {result.absi.toFixed(4)}
                </div>
                <div className="text-xl font-semibold mb-1">
                  ABSI (A Body Shape Index)
                </div>
                <div className="text-lg font-bold mb-2">
                  Riesgo de Mortalidad: {result.mortalityRisk}
                </div>
                <p className="text-sm opacity-90">
                  Z-score: {result.absiZScore.toFixed(2)} | Percentil: {result.percentile}%
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-info-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Z-Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-info mb-1">
                      {result.absiZScore.toFixed(2)}
                    </div>
                    <p className="text-xs text-info">
                      {result.absiZScore < 0 ? 'Por debajo del promedio' : result.absiZScore < 0.5 ? 'Promedio' : 'Por encima del promedio'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-accent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Info className="w-4 h-4 mr-2" />
                      Percentil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-warning mb-1">
                      {result.percentile}%
                    </div>
                    <p className="text-xs text-warning">
                      {result.percentile < 25 ? 'Bajo riesgo' : result.percentile < 75 ? 'Riesgo moderado' : 'Alto riesgo'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-destructive-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Riesgo Relativo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-destructive mb-1">
                      {result.relativeRisk.toFixed(1)}x
                    </div>
                    <p className="text-xs text-destructive">
                      Comparado con promedio poblacional
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className={`border-l-4 ${getRiskColor(result.mortalityRisk)}`}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Estado de Salud
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base font-medium mb-2">{result.healthStatus}</p>
                  <p className="text-sm text-muted-foreground">{result.clinicalInterpretation}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Comparación con Otras Métricas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {result.comparison.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-semibold text-sm text-foreground">{metric.metric}</div>
                          <div className="text-xs text-muted-foreground">{metric.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-info">
                            {metric.value.toFixed(metric.metric === 'ABSI' ? 4 : metric.metric === 'WHtR' ? 2 : 1)}
                          </div>
                          {metric.metric !== 'ABSI' && (
                            <div className="text-xs text-muted-foreground">
                              {metric.metric === 'IMC' ? 'kg/m²' : metric.metric === 'WHtR' ? 'ratio' : 'cm'}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {result.mortalityRiskFactors.length > 0 && (
                <Card className="bg-destructive-subtle border-l-4 border-destructive">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Factores de Riesgo de Mortalidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.mortalityRiskFactors.map((factor, index) => (
                        <li key={index} className="flex items-start text-sm text-foreground/90">
                          <span className="text-destructive mr-2">•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.improvementStrategies.length > 0 && (
                <Card className="bg-success-subtle border-l-4 border-success">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <TrendingDown className="w-5 h-5 mr-2" />
                      Estrategias para Mejorar tu ABSI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.improvementStrategies.map((strategy, index) => (
                        <li key={index} className="flex items-start text-sm text-foreground/90">
                          <span className="text-success mr-2">•</span>
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-warning-subtle border-l-4 border-warning">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                    <Info className="w-5 h-5 mr-2" />
                    Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm text-foreground/90">
                        <span className="text-warning mr-2">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>Importante:</strong> El ABSI es una herramienta de evaluación de riesgo, no un diagnóstico médico.
                  Si tu ABSI indica riesgo elevado, consulta con un profesional de la salud para evaluación completa
                  y plan de acción personalizado.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
