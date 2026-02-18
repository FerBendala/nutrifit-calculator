'use client';

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeMetabolicAge } from '@/lib/formulas';
import { AlertTriangle, Clock, Info, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

export function EdadMetabolicaCalculator() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    age: '30',
    gender: 'male' as 'male' | 'female',
    bodyFatPercentage: '',
    useBodyFat: 'no' as 'yes' | 'no'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeMetabolicAge> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.age) return;

    try {
      const bodyFatPercentage = formData.useBodyFat === 'yes' && formData.bodyFatPercentage
        ? parseFloat(formData.bodyFatPercentage)
        : undefined;

      const analysis = analyzeMetabolicAge(
        parseFloat(formData.weight),
        parseFloat(formData.height),
        parseInt(formData.age),
        formData.gender,
        bodyFatPercentage
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating metabolic age:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.age && 
    (formData.useBodyFat === 'no' || (formData.useBodyFat === 'yes' && formData.bodyFatPercentage));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mucho Más Joven':
        return 'text-foreground bg-success-subtle border-success';
      case 'Más Joven':
        return 'text-foreground bg-info-subtle border-info';
      case 'Similar':
        return 'text-muted-foreground bg-muted border-border';
      case 'Más Viejo':
        return 'text-foreground bg-warning-subtle border-warning';
      case 'Mucho Más Viejo':
        return 'text-foreground bg-destructive-subtle border-destructive';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de Edad Metabólica">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              Calculadora de Edad Metabólica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="bg-info-subtle rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> La edad metabólica se calcula comparando tu BMR con el promedio esperado
                    para personas de tu edad. Si conoces tu porcentaje de grasa corporal, puedes proporcionarlo para
                    un cálculo más preciso usando la fórmula Katch-McArdle. Si no lo conoces, puedes usar nuestra
                    <a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium"> calculadora de grasa corporal</a>.
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

                <div className="md:col-span-2">
                  <SelectInput
                    id="useBodyFat"
                    label="¿Conoces tu porcentaje de grasa corporal?"
                    value={formData.useBodyFat}
                    onChange={handleInputChange('useBodyFat')}
                    options={[
                      { value: 'no', label: 'No (usar fórmula estándar)' },
                      { value: 'yes', label: 'Sí (cálculo más preciso)' }
                    ]}
                    required
                  />
                </div>

                {formData.useBodyFat === 'yes' && (
                  <div className="md:col-span-2">
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
                      required={formData.useBodyFat === 'yes'}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Si no conoces tu porcentaje de grasa corporal, puedes usar nuestra{' '}
                      <a href="/grasa-corporal/" className="text-info hover:underline transition-colors">calculadora de grasa corporal</a> o{' '}
                      <a href="/composicion/" className="text-info hover:underline transition-colors">calculadora de composición corporal</a>.
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                Calcular Edad Metabólica
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20 mt-8">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <span className="text-3xl mr-3">⏰</span>
              Resultados de Edad Metabólica
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              <div className={`text-center card-golden border-2 rounded-lg p-6 ${getCategoryColor(result.category)}`}>
                <div className="text-5xl font-bold mb-2">
                  {result.metabolicAge} años
                </div>
                <div className="text-xl font-semibold mb-1">
                  Edad Metabólica
                </div>
                <div className="text-lg font-bold mb-2">
                  {result.ageDifference > 0 ? '+' : ''}{result.ageDifference} años vs. edad cronológica
                </div>
                <div className="text-lg font-bold mb-2">
                  Categoría: {result.category}
                </div>
                <p className="text-sm opacity-90">
                  {result.interpretation}
                </p>
              </div>

              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                    <Info className="w-4 h-4 mr-2" />
                    Fórmula Utilizada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-indigo-700 mb-1">
                    {result.formulaUsed}
                  </div>
                  <p className="text-xs text-indigo-600">
                    {result.formulaUsed === 'Katch-McArdle' 
                      ? 'Cálculo más preciso usando masa magra' 
                      : 'Fórmula estándar. Para mayor precisión, proporciona tu porcentaje de grasa corporal.'}
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-accent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      Edad Cronológica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-warning mb-1">
                      {result.chronologicalAge} años
                    </div>
                    <p className="text-xs text-warning">
                      Tu edad real
                    </p>
                  </CardContent>
                </Card>

                <Card className={`bg-gradient-to-br ${result.ageDifference < 0 ? 'bg-success-subtle' : result.ageDifference > 0 ? 'from-red-50 to-red-100' : 'bg-muted'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.ageDifference < 0 ? 'text-foreground' : result.ageDifference > 0 ? 'text-foreground' : 'text-foreground'}`}>
                      <Zap className="w-4 h-4 mr-2" />
                      Edad Metabólica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-lg font-bold mb-1 ${result.ageDifference < 0 ? 'text-success' : result.ageDifference > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {result.metabolicAge} años
                    </div>
                    <p className={`text-xs ${result.ageDifference < 0 ? 'text-success' : result.ageDifference > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {result.ageDifference < 0 ? 'Más joven' : result.ageDifference > 0 ? 'Más viejo' : 'Similar'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className={`border-l-4 ${getCategoryColor(result.category)}`}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Estado Metabólico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base font-medium mb-2">{result.metabolicStatus}</p>
                  <p className="text-sm text-muted-foreground">{result.clinicalInterpretation}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Comparación de Métricas
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
                            {metric.value.toFixed(metric.metric.includes('BMR') ? 0 : 0)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.metric.includes('BMR') ? 'kcal/día' : metric.metric.includes('Edad') ? 'años' : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-warning-subtle border-l-4 border-warning">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                    <Info className="w-5 h-5 mr-2" />
                    Factores que Afectan tu Edad Metabólica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-card rounded-lg border">
                      <div className="font-semibold text-sm text-foreground mb-1">Masa Muscular:</div>
                      <p className="text-xs text-warning">{result.factors.muscleMass}</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border">
                      <div className="font-semibold text-sm text-foreground mb-1">Nivel de Actividad:</div>
                      <p className="text-xs text-warning">{result.factors.activityLevel}</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border">
                      <div className="font-semibold text-sm text-foreground mb-1">Nutrición:</div>
                      <p className="text-xs text-warning">{result.factors.nutrition}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="font-semibold text-sm text-foreground mb-1">Sueño:</div>
                      <p className="text-xs text-warning">{result.factors.sleep}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.improvementStrategies.length > 0 && (
                <Card className="bg-info-subtle border-l-4 border-info">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Estrategias para Mejorar tu Edad Metabólica
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
                  <strong>Importante:</strong> La edad metabólica es una estimación basada en tu BMR calculado.
                  Factores como genética, condiciones médicas, medicamentos y otros pueden afectar tu metabolismo.
                  Si tu edad metabólica es significativamente mayor que tu edad cronológica, considera consultar
                  con un profesional de la salud.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
