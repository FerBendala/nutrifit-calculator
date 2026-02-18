"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { calculateProteinNeeds } from '@/lib/formulas';
import { useState } from 'react';

export default function ProteinaCalculator() {
  const [formData, setFormData] = useState({
    weight: '',
    goal: 'active',
    bodyFatPercentage: ''
  });

  const [result, setResult] = useState<{ min: number; max: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, goal } = formData;

    if (!weight) return;

    const bodyFat = formData.bodyFatPercentage ? parseFloat(formData.bodyFatPercentage) : undefined;
    const proteinNeeds = calculateProteinNeeds(
      parseFloat(weight),
      goal as 'sedentary' | 'active' | 'athlete',
      bodyFat
    );

    setResult(proteinNeeds);
  };

  const isFormValid = formData.weight;

  return (
    <>
      <section id="calculator" aria-label="Calculadora de proteína">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">🥩</span>
              Calculadora de Proteína
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
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

                <SelectInput
                  id="goal"
                  label="Objetivo/Actividad"
                  value={formData.goal}
                  onChange={handleInputChange('goal')}
                  options={[
                    { value: 'sedentary', label: 'Sedentario (mínima actividad)' },
                    { value: 'active', label: 'Activo (ejercicio regular)' },
                    { value: 'athlete', label: 'Atleta (entrenamiento intenso)' }
                  ]}
                  required
                />
              </div>

              <NumberInput
                id="bodyFatPercentage"
                label="Porcentaje de grasa corporal (opcional)"
                value={formData.bodyFatPercentage}
                onChange={handleInputChange('bodyFatPercentage')}
                min={5}
                max={50}
                step={0.1}
                unit="%"
                placeholder="15.0"
              />

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                🥩 Calcular necesidades de proteína
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
              Tus Necesidades de Proteína
            </h2>
          </header>
          <div className="p-6">
            <div className="text-center space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="text-center card-golden bg-secondary/50">
                  <div className="text-4xl font-bold text-info mb-[0.618rem]">
                    {formatGrams(result.min)}
                  </div>
                  <div className="text-lg font-semibold text-info mb-[0.382rem]">
                    Mínimo diario
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Para mantener masa muscular
                  </p>
                </article>

                <article className="text-center card-golden bg-primary text-primary-foreground">
                  <div className="text-5xl font-bold mb-[0.618rem]">
                    {formatGrams(result.max)}
                  </div>
                  <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                    Óptimo diario
                  </div>
                  <p className="text-sm opacity-90">
                    Para maximizar resultados
                  </p>
                </article>
              </div>

              <section className="mt-[2.618rem] card-golden bg-gradient-to-r bg-success-subtle border-l-4 border-success">
                <h3 className="font-bold mb-[1.618rem] text-lg flex items-center">
                  <span className="text-2xl mr-3">💡</span>
                  Recomendaciones
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs text-left">
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>Consume entre <strong>{formatGrams(result.min)}</strong> y <strong>{formatGrams(result.max)}</strong> de proteína al día</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Distribuye la ingesta a lo largo del día (20-30g por comida)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Combina fuentes de proteína completas (animales) e incompletas (vegetales)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Ajusta según tu respuesta individual y resultados</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
