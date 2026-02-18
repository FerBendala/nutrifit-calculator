"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMilliliters } from '@/lib/format';
import { calculateWaterNeeds } from '@/lib/formulas';
import { useState } from 'react';

export default function AguaCalculator() {
  const [formData, setFormData] = useState({
    weight: '',
    activityLevel: 'moderate'
  });

  const [result, setResult] = useState<{ min: number; max: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, activityLevel } = formData;

    if (!weight) return;

    const waterNeeds = calculateWaterNeeds(
      parseFloat(weight),
      activityLevel as 'low' | 'moderate' | 'high'
    );

    setResult(waterNeeds);
  };

  const isFormValid = formData.weight;

  const getGlassesCount = (ml: number) => Math.round(ml / 250);

  return (
    <>
      <section id="calculator" aria-label="Calculadora de hidratación">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">💧</span>
              Calculadora de Hidratación
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
                  id="activityLevel"
                  label="Nivel de actividad/clima"
                  value={formData.activityLevel}
                  onChange={handleInputChange('activityLevel')}
                  options={[
                    { value: 'low', label: 'Baja (sedentario, clima templado)' },
                    { value: 'moderate', label: 'Moderada (ejercicio regular)' },
                    { value: 'high', label: 'Alta (ejercicio intenso/calor)' }
                  ]}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                💧 Calcular necesidades de agua
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
              Tus Necesidades de Hidratación
            </h2>
          </header>
          <div className="p-6">
            <div className="text-center space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="text-center card-golden bg-secondary/50">
                  <div className="text-4xl font-bold text-info mb-[0.618rem]">
                    {formatMilliliters(result.min)}
                  </div>
                  <div className="text-lg font-semibold text-info mb-[0.382rem]">
                    Mínimo diario
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ≈ {getGlassesCount(result.min)} vasos de 250ml
                  </p>
                </article>

                <article className="text-center card-golden bg-primary text-primary-foreground">
                  <div className="text-5xl font-bold mb-[0.618rem]">
                    {formatMilliliters(result.max)}
                  </div>
                  <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                    Óptimo diario
                  </div>
                  <p className="text-sm opacity-90">
                    ≈ {getGlassesCount(result.max)} vasos de 250ml
                  </p>
                </article>
              </div>

              <section className="mt-[2.618rem] card-golden bg-gradient-to-r bg-info-subtle border-l-4 border-info">
                <h3 className="font-bold mb-[1.618rem] text-lg flex items-center">
                  <span className="text-2xl mr-3">💧</span>
                  Consejos de hidratación
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs text-left">
                  <li className="flex items-start">
                    <span className="text-info mr-2">•</span>
                    <span>Bebe agua de forma constante a lo largo del día</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span>Aumenta la ingesta durante ejercicio intenso o clima caluroso</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">•</span>
                    <span>Incluye también líquidos de frutas, verduras y otras bebidas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>El color de la orina es un buen indicador de hidratación</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>Ajusta según tu sed y condiciones individuales</span>
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
