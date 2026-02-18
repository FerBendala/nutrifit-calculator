'use client';

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeLBM } from '@/lib/formulas';
import { AlertTriangle, Info, ActivitySquare, TrendingUp, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function MasaMagraCalculator() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    bodyFatPercentage: '15',
    gender: 'male' as 'male' | 'female',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeLBM> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.bodyFatPercentage || !formData.age) return;

    try {
      const analysis = analyzeLBM(
        parseFloat(formData.weight),
        parseFloat(formData.height),
        parseFloat(formData.bodyFatPercentage),
        formData.gender,
        parseInt(formData.age)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating LBM:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.bodyFatPercentage && formData.age;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Muy Bajo':
        return 'text-foreground bg-destructive-subtle border-destructive';
      case 'Bajo':
        return 'text-foreground bg-warning-subtle border-warning';
      case 'Normal':
        return 'text-foreground bg-success-subtle border-success';
      case 'Alto':
        return 'text-foreground bg-info-subtle border-info';
      case 'Muy Alto':
        return 'text-foreground bg-warning-subtle border-warning';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de Masa Magra">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              Calculadora de Masa Magra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="bg-info-subtle rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Para calcular la masa magra necesitas conocer tu porcentaje de grasa corporal.
                    Puedes usar nuestra <a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium">calculadora de grasa corporal</a> o
                    <a href="/composicion/" className="text-info hover:underline transition-colors font-medium"> calculadora de composición corporal</a> para obtenerlo.
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
                  id="bodyFatPercentage"
                  label="Porcentaje de Grasa Corporal"
                  value={formData.bodyFatPercentage}
                  onChange={handleInputChange('bodyFatPercentage')}
                  min={5}
                  max={50}
                  step={0.1}
                  unit="%"
                  placeholder="15.0"
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
                Calcular Masa Magra
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
              Resultados de Masa Magra
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              <div className={`text-center card-golden border-2 rounded-lg p-6 ${getCategoryColor(result.category)}`}>
                <div className="text-5xl font-bold mb-2">
                  {result.lbmAverage.toFixed(1)} kg
                </div>
                <div className="text-xl font-semibold mb-1">
                  Masa Magra (LBM) Promedio
                </div>
                <div className="text-lg font-bold mb-2">
                  {result.lbmPercentage.toFixed(1)}% del peso corporal
                </div>
                <div className="text-lg font-bold mb-2">
                  Categoría: {result.category}
                </div>
                <p className="text-sm opacity-90">
                  {result.lbmInterpretation}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-accent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <ActivitySquare className="w-4 h-4 mr-2" />
                      Fórmula Standard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-warning mb-1">
                      {result.lbmStandard.toFixed(1)} kg
                    </div>
                    <p className="text-xs text-warning">
                      LBM = Peso - Masa Grasa
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-info-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <ActivitySquare className="w-4 h-4 mr-2" />
                      Fórmula Boer (1984)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-info mb-1">
                      {result.lbmBoer.toFixed(1)} kg
                    </div>
                    <p className="text-xs text-info">
                      Ajustada para atletas
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br bg-success-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <ActivitySquare className="w-4 h-4 mr-2" />
                      Fórmula James (1976)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-success mb-1">
                      {result.lbmJames.toFixed(1)} kg
                    </div>
                    <p className="text-xs text-success">
                      Ajustada para población general
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br bg-warning-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <ActivitySquare className="w-4 h-4 mr-2" />
                      Fórmula Hume (1966)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-warning mb-1">
                      {result.lbmHume.toFixed(1)} kg
                    </div>
                    <p className="text-xs text-warning">
                      Basada en género y altura
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className={`border-l-4 ${getCategoryColor(result.category)}`}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <ActivitySquare className="w-5 h-5 mr-2" />
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
                            {metric.value.toFixed(metric.metric === 'Porcentaje Grasa Corporal' ? 1 : 1)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.metric === 'Masa Magra (LBM)' || metric.metric === 'Masa Grasa' ? 'kg' : metric.metric === 'Porcentaje Grasa Corporal' ? '%' : 'kg/m²'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {result.benefits.length > 0 && (
                <Card className="bg-success-subtle border-l-4 border-success">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Beneficios de Mantener/Aumentar Masa Magra
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-foreground/90">
                          <span className="text-success mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.improvementStrategies.length > 0 && (
                <Card className="bg-info-subtle border-l-4 border-info">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Estrategias para Aumentar Masa Magra
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.improvementStrategies.map((strategy, index) => (
                        <li key={index} className="flex items-start text-sm text-foreground/90">
                          <span className="text-info mr-2">•</span>
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
                  <strong>Importante:</strong> La masa magra incluye músculos, huesos, órganos, agua y otros tejidos no grasos.
                  Para una medición precisa, se recomienda usar técnicas de imagen (DEXA, bioimpedancia avanzada).
                  Si tu masa magra está muy baja, consulta con un profesional de la salud para descartar sarcopenia.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
