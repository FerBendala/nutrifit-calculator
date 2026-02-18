"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { analyzeFiberNeeds } from '@/lib/formulas';
import { Info, Leaf } from 'lucide-react';
import { useState } from 'react';

export function FibraCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'female' as 'male' | 'female',
    dailyCalories: ''
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeFiberNeeds> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const age = parseInt(formData.age);
      const calories = formData.dailyCalories ? parseInt(formData.dailyCalories) : undefined;
      const analysis = analyzeFiberNeeds(age, formData.sex, calories);
      setResult(analysis);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al calcular');
    }
  };

  const isFormValid = formData.age;

  return (
    <>
      <section id="calculator" aria-label="Calculadora de fibra">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <Leaf className="w-6 h-6 mr-3 text-success" />
              Calculadora de Fibra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-success-subtle rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> La ingesta calórica es opcional. Si la introduces, obtendrás además la recomendación por calorías (14 g de fibra por cada 1000 kcal).
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <NumberInput
                  id="age"
                  label="Edad"
                  value={formData.age}
                  onChange={handleInputChange('age')}
                  min={9}
                  max={120}
                  step={1}
                  unit="años"
                  placeholder="35"
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
                <NumberInput
                  id="dailyCalories"
                  label="Calorías diarias (opcional)"
                  value={formData.dailyCalories}
                  onChange={handleInputChange('dailyCalories')}
                  min={800}
                  max={5000}
                  step={50}
                  unit="kcal"
                  placeholder="2000"
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Calcular necesidades de fibra
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <Leaf className="w-6 h-6 mr-3 text-success" />
              Tus Necesidades de Fibra
            </h2>
          </header>
          <div className="p-6 space-golden-md">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br bg-success-subtle">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Por edad y sexo (IOM/FDA)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">
                    {formatGrams(result.byAgeSex)}
                  </div>
                  <p className="text-xs text-success mt-1">Ingesta adecuada diaria</p>
                </CardContent>
              </Card>
              {result.byCalories !== undefined && (
                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-emerald-900">Por calorías (14 g/1000 kcal)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-700">
                      {formatGrams(result.byCalories)}
                    </div>
                    <p className="text-xs text-emerald-600 mt-1">Según tu ingesta calórica</p>
                  </CardContent>
                </Card>
              )}
              <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-l-4 border-teal-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-teal-900">Objetivo diario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal-700">
                    {formatGrams(result.recommendedMin)} – {formatGrams(result.recommendedMax)}
                  </div>
                  <p className="text-xs text-teal-600 mt-1">Rango recomendado</p>
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

            <Card className="bg-gradient-to-br bg-success-subtle border-l-4 border-success">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Leaf className="w-4 h-4 mr-2" />
                  Consejos prácticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-success mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-amber-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-amber-900">
                  <Leaf className="w-4 h-4 mr-2" />
                  Fuentes de fibra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.foodSources.map((source, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>{source}</span>
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
