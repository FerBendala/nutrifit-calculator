"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateFatBurningZone, calculateHeartRateZones, calculateMaxHeartRate } from '@/lib/formulas';
import { useState } from 'react';

interface HeartRateResult {
  maxHR: number;
  formula: string;
  accuracy: string;
  zones: {
    zone1: { min: number; max: number; name: string; description: string; color: string; };
    zone2: { min: number; max: number; name: string; description: string; color: string; };
    zone3: { min: number; max: number; name: string; description: string; color: string; };
    zone4: { min: number; max: number; name: string; description: string; color: string; };
    zone5: { min: number; max: number; name: string; description: string; color: string; };
  };
  fatBurning: {
    min: number;
    max: number;
    optimal: number;
    percentage: string;
  };
}

export function RitmoCardiacoCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    formula: 'tanaka'
  });

  const [result, setResult] = useState<HeartRateResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { age, sex, formula } = formData;
    if (!age) return;

    const maxHRData = calculateMaxHeartRate(
      parseInt(age),
      formula as 'tanaka' | 'haskell' | 'gulati',
      sex as 'male' | 'female'
    );

    const zones = calculateHeartRateZones(maxHRData.maxHR);
    const fatBurning = calculateFatBurningZone(maxHRData.maxHR);

    setResult({
      maxHR: maxHRData.maxHR,
      formula: maxHRData.formula,
      accuracy: maxHRData.accuracy,
      zones,
      fatBurning
    });
  };

  const isFormValid = formData.age;

  return (
    <>
      <section id="calculator" aria-label="Calculadora de ritmo cardíaco">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">❤️</span>
              Calculadora de Ritmo Cardíaco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
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
              </div>

              <SelectInput
                id="formula"
                label="Fórmula de cálculo"
                value={formData.formula}
                onChange={handleInputChange('formula')}
                options={[
                  { value: 'tanaka', label: 'Fórmula de Tanaka (Recomendada)' },
                  { value: 'gulati', label: 'Fórmula de Gulati (Específica para mujeres)' },
                  { value: 'haskell', label: 'Fórmula clásica (220 - edad)' }
                ]}
                required
              />

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                ❤️ Calcular Zonas de Entrenamiento
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="space-golden-md">
          <article className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">💓</span>
                Tu Frecuencia Cardíaca Máxima
              </h2>
            </header>
            <div className="p-6">
              <div className="text-center space-golden-sm">
                <div className="text-6xl font-bold text-destructive mb-[0.618rem]">
                  {result.maxHR}
                </div>
                <div className="text-xl font-bold text-destructive mb-[0.382rem]">
                  pulsaciones por minuto (ppm)
                </div>
                <div className="text-lg text-muted-foreground">
                  {result.formula}
                </div>
                <div className="text-sm text-muted-foreground mt-[0.618rem]">
                  {result.accuracy}
                </div>
              </div>
            </div>
          </article>

          <article className="card-golden-lg shadow-golden-lg border-2 border-warning/20">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">🔥</span>
                Zona Óptima de Quema de Grasa
              </h2>
            </header>
            <div className="p-6">
              <div className="card-golden bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-warning">
                <div className="text-center space-golden-sm">
                  <div className="text-4xl font-bold text-warning mb-[0.618rem]">
                    {result.fatBurning.min} - {result.fatBurning.max} ppm
                  </div>
                  <div className="text-lg font-semibold text-warning mb-[0.382rem]">
                    Zona 2 - Base Aeróbica ({result.fatBurning.percentage} FC máx)
                  </div>
                  <div className="text-sm text-foreground/90">
                    <strong>Óptimo para quemar grasa:</strong> {result.fatBurning.optimal} ppm
                  </div>
                </div>
                <div className="mt-[1.618rem] text-sm text-foreground/90">
                  <p className="leading-[1.618]">
                    <strong>💡 Consejo:</strong> Mantén tu ritmo cardíaco en esta zona durante
                    30-60 minutos para maximizar la quema de grasa. Es ideal para ejercicio
                    aeróbico sostenido como caminar rápido, trotar suave o ciclismo moderado.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="card-golden-lg shadow-golden-lg">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">🎯</span>
                Zonas de Entrenamiento Cardiovascular
              </h2>
            </header>
            <div className="p-6">
              <div className="space-golden-md">
                {Object.entries(result.zones).map(([key, zone]) => {
                  const percentage = Math.round((zone.min / result.maxHR) * 100);
                  const percentageMax = Math.round((zone.max / result.maxHR) * 100);

                  return (
                    <section key={key} className="card-golden">
                      <div className="flex justify-between items-center mb-[0.618rem]">
                        <h3 className={`font-bold text-lg ${zone.color}`}>
                          {zone.name}
                        </h3>
                        <div className="text-right">
                          <div className={`font-bold text-xl ${zone.color}`}>
                            {zone.min} - {zone.max} ppm
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {percentage}% - {percentageMax}% FC máx
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-muted rounded-full h-3 mb-[0.618rem]">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ease-out ${key === 'zone1' ? 'bg-muted0' :
                            key === 'zone2' ? 'bg-info-subtle0' :
                              key === 'zone3' ? 'bg-success-subtle0' :
                                key === 'zone4' ? 'bg-warning-subtle0' : 'bg-destructive-subtle0'
                            }`}
                          style={{ width: `${percentageMax}%` }}
                        ></div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-[1.618]">
                        {zone.description}
                      </p>
                    </section>
                  );
                })}
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
}
