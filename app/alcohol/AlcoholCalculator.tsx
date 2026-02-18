"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { analyzeAlcoholConsumption } from '@/lib/formulas';
import { Info, Target } from 'lucide-react';
import { useState } from 'react';

export function AlcoholCalculator() {
  const [formData, setFormData] = useState({
    unitsPerWeek: '',
    sex: 'male' as 'male' | 'female'
  });
  const [result, setResult] = useState<ReturnType<typeof analyzeAlcoholConsumption> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const units = parseFloat(formData.unitsPerWeek);
      setResult(analyzeAlcoholConsumption(units, formData.sex));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al calcular');
    }
  };

  const isFormValid = formData.unitsPerWeek !== '' && parseFloat(formData.unitsPerWeek) >= 0;

  return (
    <>
      <section id="calculator" aria-label="Calculadora de alcohol">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <Target className="w-6 h-6 mr-3 text-muted-foreground" />
              Unidades y Límite de Bajo Riesgo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 mb-6 border border-border">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground dark:text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground dark:text-foreground/90">
                  <strong className="text-foreground dark:text-foreground">Unidad estándar:</strong> 1 unidad = 10 g de alcohol (ej. 1 caña, 1 copa de vino, 1 copa de destilado). Introduce cuántas unidades consumes por semana de media.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <NumberInput
                  id="unitsPerWeek"
                  label="Unidades estándar por semana"
                  value={formData.unitsPerWeek}
                  onChange={handleInputChange('unitsPerWeek')}
                  min={0}
                  max={100}
                  step={0.5}
                  placeholder="7"
                  required
                />
                <SelectInput
                  id="sex"
                  label="Género"
                  value={formData.sex}
                  onChange={handleInputChange('sex')}
                  options={[
                    { value: 'male', label: 'Hombre' },
                    { value: 'female', label: 'Mujer' }
                  ]}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                <Target className="w-5 h-5 mr-2" />
                Calcular
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <Target className="w-6 h-6 mr-3 text-muted-foreground" />
              Resultados
            </h2>
          </header>
          <div className="p-6 space-golden-md">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br bg-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Unidades/semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{result.unitsPerWeek}</div>
                  <p className="text-xs text-muted-foreground mt-1">Unidades estándar</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br bg-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Alcohol</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{formatGrams(result.alcoholGrams)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Por semana</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br bg-warning-subtle">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-amber-900">Calorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-700">{result.caloriesFromAlcohol} kcal</div>
                  <p className="text-xs text-amber-600 mt-1">Por semana (solo alcohol)</p>
                </CardContent>
              </Card>
              <Card className={`bg-gradient-to-br border-l-4 ${result.withinLimit ? 'bg-success-subtle border-success' : 'bg-warning-subtle border-warning'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-sm font-semibold ${result.withinLimit ? 'text-foreground' : 'text-foreground'}`}>Límite bajo riesgo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${result.withinLimit ? 'text-success' : 'text-warning'}`}>
                    ≤{result.limitPerWeek} U/semana
                  </div>
                  <p className={`text-xs mt-1 ${result.withinLimit ? 'text-success' : 'text-warning'}`}>
                    {result.withinLimit ? 'Dentro del límite' : 'Por encima del límite'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br bg-info-subtle border-l-4 border-info">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  Interpretación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/90">{result.interpretation}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br bg-muted border-l-4 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Target className="w-4 h-4 mr-2" />
                  Consejos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-foreground/90">
                      <span className="text-muted-foreground mr-2">•</span>
                      <span>{tip}</span>
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
