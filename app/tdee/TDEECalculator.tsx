"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCalories } from '@/lib/format';
import { ACTIVITY_LEVELS, calculateBMR, calculateTDEE, UserData } from '@/lib/formulas';
import { useLastResult } from '@/lib/useLastResult';
import { useEffect, useState } from 'react';

export default function TDEECalculator() {
  const [formData, setFormData] = useState({
    sex: 'male',
    age: '',
    height: '',
    weight: '',
    activityLevel: ''
  });

  const [result, setResult] = useState<{ bmr: number; tdee: number; } | null>(null);
  const { save, load } = useLastResult<{ bmr: number; tdee: number }>('tdee');
  const [lastSaved, setLastSaved] = useState<{ result: { bmr: number; tdee: number }; timestamp: number } | null>(null);

  useEffect(() => {
    const previous = load();
    if (previous) setLastSaved(previous);
  }, [load]);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { age, height, weight, activityLevel } = formData;

    if (!age || !height || !weight || !activityLevel) return;

    const userData: UserData = {
      sex: formData.sex as 'male' | 'female',
      age: parseInt(age),
      height: parseInt(height),
      weight: parseFloat(weight)
    };

    const bmr = calculateBMR(userData);
    const tdee = calculateTDEE(bmr, parseFloat(activityLevel));

    const tdeeResult = { bmr, tdee };
    setResult(tdeeResult);
    save(tdeeResult);
  };

  const isFormValid = formData.age && formData.height && formData.weight && formData.activityLevel;

  return (
    <>
      {lastSaved && !result && (
        <div className="card-golden bg-muted/30 text-sm text-muted-foreground">
          Tu ultimo resultado: <strong className="text-foreground">TDEE {Math.round(lastSaved.result.tdee)} kcal</strong> (BMR: {Math.round(lastSaved.result.bmr)} kcal) - {new Date(lastSaved.timestamp).toLocaleDateString('es-ES')}
        </div>
      )}

      <section id="calculator" aria-label="Calculadora TDEE">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">⚡</span>
              Calculadora TDEE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <SelectInput
                  id="sex"
                  label="Sexo biológico"
                  value={formData.sex}
                  onChange={handleInputChange('sex')}
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
                  min={15}
                  max={100}
                  unit="años"
                  placeholder="25"
                  required
                />

                <NumberInput
                  id="height"
                  label="Altura"
                  value={formData.height}
                  onChange={handleInputChange('height')}
                  min={130}
                  max={250}
                  unit="cm"
                  placeholder="170"
                  required
                />

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
              </div>

              <SelectInput
                id="activityLevel"
                label="Nivel de actividad física"
                value={formData.activityLevel}
                onChange={handleInputChange('activityLevel')}
                options={ACTIVITY_LEVELS.map(level => ({
                  value: level.value,
                  label: level.label
                }))}
                placeholder="Selecciona tu nivel de actividad"
                required
              />

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                ⚡ Calcular TDEE
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <span className="text-3xl mr-3">🎯</span>
              Tus Resultados
            </h2>
          </header>
          <div className="p-6">
            <div className="grid gap-[1.618rem] md:grid-cols-2">
              <article className="text-center card-golden bg-secondary/50">
                <div className="text-4xl font-bold text-info mb-[0.618rem]">
                  {formatCalories(Math.round(result.bmr))}
                </div>
                <div className="text-lg font-semibold text-info mb-[0.382rem]">
                  BMR (Metabolismo Basal)
                </div>
                <p className="text-sm text-muted-foreground">
                  Calorías que quemas en reposo
                </p>
              </article>

              <article className="text-center card-golden bg-primary text-primary-foreground">
                <div className="text-5xl font-bold mb-[0.618rem]">
                  {formatCalories(Math.round(result.tdee))}
                </div>
                <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                  TDEE (Gasto Total Diario)
                </div>
                <p className="text-sm opacity-90">
                  Calorías totales que quemas al día
                </p>
              </article>
            </div>

            <section className="mt-[2.618rem] card-golden bg-gradient-to-r bg-success-subtle border-l-4 border-success">
              <h3 className="font-bold mb-[1.618rem] text-lg flex items-center">
                <span className="text-2xl mr-3">💡</span>
                ¿Qué significan estos números?
              </h3>
              <ul className="text-sm text-muted-foreground space-golden-xs">
                <li className="flex items-start">
                  <span className="text-info mr-2">•</span>
                  <span><strong>BMR:</strong> Calorías necesarias para funciones vitales (respirar, circular sangre, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">•</span>
                  <span><strong>TDEE:</strong> BMR + calorías de actividad física y termogénesis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>Para mantener tu peso, consume aproximadamente tu TDEE en calorías</span>
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  <span>Para perder peso, consume menos de tu TDEE (déficit calórico)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span>Para ganar peso, consume más de tu TDEE (superávit calórico)</span>
                </li>
              </ul>
            </section>
          </div>
        </section>
      )}
    </>
  );
}
