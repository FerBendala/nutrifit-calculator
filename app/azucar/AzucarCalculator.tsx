"use client";

import { NumberInput } from '@/components/NumberInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { analyzeSugarLimit } from '@/lib/formulas';
import { Circle, Info } from 'lucide-react';
import { useState } from 'react';

export function AzucarCalculator() {
  const [formData, setFormData] = useState({ dailyCalories: '' });
  const [result, setResult] = useState<ReturnType<typeof analyzeSugarLimit> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const calories = parseInt(formData.dailyCalories);
      setResult(analyzeSugarLimit(calories));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al calcular');
    }
  };

  const isFormValid = formData.dailyCalories && parseInt(formData.dailyCalories) > 0;

  return (
    <>
      <section id="calculator" aria-label="Calculadora de azúcar">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <Circle className="w-6 h-6 mr-3 text-amber-600" />
              Límite de Azúcares Libres (OMS)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-warning-subtle rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> Introduce tu ingesta calórica diaria estimada (o la que quieras como referencia). La OMS recomienda limitar los azúcares libres a menos del 10% de la energía; menos del 5% aporta beneficios adicionales (caries, peso).
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-golden-md">
              <NumberInput
                id="dailyCalories"
                label="Calorías diarias"
                value={formData.dailyCalories}
                onChange={handleInputChange('dailyCalories')}
                min={800}
                max={5000}
                step={50}
                unit="kcal"
                placeholder="2000"
                required
              />

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                <Circle className="w-5 h-5 mr-2" />
                Calcular límite de azúcar
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <Circle className="w-6 h-6 mr-3 text-amber-600" />
              Tu Límite de Azúcares Libres
            </h2>
          </header>
          <div className="p-6 space-golden-md">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-gradient-to-br bg-warning-subtle">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-amber-900">Recomendación OMS (&lt;10%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-700">
                    Máximo {formatGrams(result.maxGrams10Percent)}/día
                  </div>
                  <p className="text-xs text-amber-600 mt-1">Menos del 10% de la energía</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-warning">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Beneficio adicional (&lt;5%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">
                    Máximo {formatGrams(result.maxGrams5Percent)}/día
                  </div>
                  <p className="text-xs text-warning mt-1">Menos del 5% de la energía</p>
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
                <p className="text-sm text-muted-foreground">{result.interpretation}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-amber-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-amber-900">
                  <Circle className="w-4 h-4 mr-2" />
                  Consejos prácticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br bg-muted border-l-4 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  ¿Qué son los azúcares libres?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.freeSugarsDefinition.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-muted-foreground mr-2">•</span>
                      <span>{item}</span>
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
