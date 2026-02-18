"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface OneRMResult {
  weight: number;
  reps: number;
  results: {
    brzycki: number;
    epley: number;
    lander: number;
    oconner: number;
    lombardi: number;
    average: number;
    recommended: string;
  };
  percentages: {
    [key: string]: number;
  };
  trainingZones: {
    strength: { min: number; max: number; percentage: string; reps: string; };
    power: { min: number; max: number; percentage: string; reps: string; };
    hypertrophy: { min: number; max: number; percentage: string; reps: string; };
    endurance: { min: number; max: number; percentage: string; reps: string; };
  };
}

export function OneRMCalculator() {
  const [formData, setFormData] = useState({
    weight: '',
    reps: '',
    exercise: 'press-banca',
    formula: 'brzycki'
  });

  const [result, setResult] = useState<OneRMResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculate1RM = (weight: number, reps: number) => {
    const brzycki = weight * (36 / (37 - reps));
    const epley = weight * (1 + reps / 30);
    const lander = (100 * weight) / (101.3 - 2.67123 * reps);
    const oconner = weight * (1 + 0.025 * reps);
    const lombardi = weight * Math.pow(reps, 0.10);

    const average = (brzycki + epley + lander + oconner + lombardi) / 5;

    const percentages = {
      '1': 100,
      '2': 97,
      '3': 94,
      '4': 92,
      '5': 89,
      '6': 86,
      '7': 83,
      '8': 81,
      '9': 78,
      '10': 75,
      '12': 70,
      '15': 65,
      '20': 60
    };

    const trainingZones = {
      strength: {
        min: Math.round(average * 0.85),
        max: Math.round(average * 1.0),
        percentage: '85-100%',
        reps: '1-5'
      },
      power: {
        min: Math.round(average * 0.75),
        max: Math.round(average * 0.90),
        percentage: '75-90%',
        reps: '1-6'
      },
      hypertrophy: {
        min: Math.round(average * 0.65),
        max: Math.round(average * 0.85),
        percentage: '65-85%',
        reps: '6-12'
      },
      endurance: {
        min: Math.round(average * 0.50),
        max: Math.round(average * 0.70),
        percentage: '50-70%',
        reps: '12-20+'
      }
    };

    return {
      weight,
      reps,
      results: {
        brzycki: Math.round(brzycki * 10) / 10,
        epley: Math.round(epley * 10) / 10,
        lander: Math.round(lander * 10) / 10,
        oconner: Math.round(oconner * 10) / 10,
        lombardi: Math.round(lombardi * 10) / 10,
        average: Math.round(average * 10) / 10,
        recommended: 'Brzycki'
      },
      percentages: Object.fromEntries(
        Object.entries(percentages).map(([reps, pct]) => [
          reps,
          Math.round((average * pct / 100) * 10) / 10
        ])
      ),
      trainingZones
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, reps } = formData;
    if (!weight || !reps) return;

    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    if (repsNum < 1 || repsNum > 20) return;

    const results = calculate1RM(weightNum, repsNum);
    setResult(results);
  };

  const isFormValid = formData.weight && formData.reps && parseInt(formData.reps) >= 1 && parseInt(formData.reps) <= 20;

  return (
    <>
      <section id="calculator" aria-label="Calculadora de 1RM">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">💪</span>
              Calculadora 1RM (Una Repetición Máxima)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <NumberInput
                  id="weight"
                  label="Peso levantado"
                  value={formData.weight}
                  onChange={handleInputChange('weight')}
                  min={1}
                  max={500}
                  unit="kg"
                  placeholder="100"
                  required
                />

                <NumberInput
                  id="reps"
                  label="Repeticiones realizadas"
                  value={formData.reps}
                  onChange={handleInputChange('reps')}
                  min={1}
                  max={20}
                  unit="reps"
                  placeholder="8"
                  required
                />
              </div>

              <SelectInput
                id="exercise"
                label="Ejercicio realizado"
                value={formData.exercise}
                onChange={handleInputChange('exercise')}
                options={[
                  { value: 'press-banca', label: 'Press de banca' },
                  { value: 'sentadilla', label: 'Sentadilla' },
                  { value: 'peso-muerto', label: 'Peso muerto' },
                  { value: 'press-militar', label: 'Press militar' },
                  { value: 'dominadas', label: 'Dominadas' },
                  { value: 'otro', label: 'Otro ejercicio' }
                ]}
                required
              />

              <SelectInput
                id="formula"
                label="Fórmula preferida (opcional)"
                value={formData.formula}
                onChange={handleInputChange('formula')}
                options={[
                  { value: 'brzycki', label: 'Brzycki (Recomendada)' },
                  { value: 'epley', label: 'Epley' },
                  { value: 'lander', label: 'Lander' },
                  { value: 'promedio', label: 'Promedio de todas' }
                ]}
                required
              />

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                💪 Calcular Mi 1RM
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
                <span className="text-3xl mr-3">🏆</span>
                Tu 1RM (Una Repetición Máxima)
              </h2>
            </header>
            <div className="p-6">
              <div className="text-center space-golden-sm">
                <div className="text-6xl font-bold text-destructive mb-[0.618rem]">
                  {result.results.average}
                </div>
                <div className="text-xl font-bold text-destructive mb-[0.382rem]">
                  kg (Una repetición máxima)
                </div>
                <div className="text-lg text-muted-foreground">
                  Promedio de 5 fórmulas científicas
                </div>
                <div className="text-sm text-muted-foreground mt-[0.618rem]">
                  Basado en {result.weight}kg × {result.reps} repeticiones
                </div>
              </div>
            </div>
          </article>

          <article className="card-golden-lg shadow-golden-lg">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">⚖️</span>
                Comparación de Fórmulas Científicas
              </h2>
            </header>
            <div className="p-6">
              <div className="space-golden-md">
                <section className="card-golden">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-info">
                      Brzycki (Recomendada)
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-info">
                        {result.results.brzycki} kg
                      </div>
                      <div className="text-sm text-success font-medium">
                        ✓ Más precisa
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La más utilizada y precisa. <a href="https://pubmed.ncbi.nlm.nih.gov/8468191/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Estudio original de Brzycki (1993)</a>: Peso × (36 / (37 - Reps))
                  </p>
                </section>

                <section className="card-golden">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-warning">
                      Epley
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-warning">
                        {result.results.epley} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Clásica
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <a href="https://www.nsca.com/education/articles/nsca-coach/determining-1rm/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Fórmula simple y popular</a>. Peso × (1 + Reps / 30)
                  </p>
                </section>

                <section className="card-golden">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-warning">
                      Lander
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-warning">
                        {result.results.lander} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Precisa para powerlifters
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <a href="https://www.nsca.com/education/articles/nsca-coach/strength-testing-predicting-a-1-rm-bench-press/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Desarrollada específicamente para powerlifting</a>. Muy precisa en rangos bajos de repeticiones.
                  </p>
                </section>

                <div className="grid gap-[1rem] md:grid-cols-2">
                  <section className="card-golden">
                    <div className="flex justify-between items-center mb-[0.618rem]">
                      <h3 className="font-bold text-lg text-success">
                        O&apos;Conner
                      </h3>
                      <div className="text-right">
                        <div className="font-bold text-xl text-success">
                          {result.results.oconner} kg
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Conservadora
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      Estimación conservadora: Peso × (1 + 0.025 × Reps)
                    </p>
                  </section>

                  <section className="card-golden">
                    <div className="flex justify-between items-center mb-[0.618rem]">
                      <h3 className="font-bold text-lg text-destructive">
                        Lombardi
                      </h3>
                      <div className="text-right">
                        <div className="font-bold text-xl text-destructive">
                          {result.results.lombardi} kg
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Exponencial
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      Usa función exponencial: Peso × Reps^0.10
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </article>

          <article className="card-golden-lg shadow-golden-lg border-2 border-success/20">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">🎯</span>
                Zonas de Entrenamiento Basadas en tu 1RM
              </h2>
            </header>
            <div className="p-6">
              <div className="space-golden-md">
                <section className="card-golden bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-destructive">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-destructive">
                      🏆 Fuerza Máxima ({result.trainingZones.strength.percentage})
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-destructive">
                        {result.trainingZones.strength.min} - {result.trainingZones.strength.max} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.trainingZones.strength.reps} repeticiones
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-[1.618]">
                    <strong>Objetivo:</strong> Desarrollar fuerza máxima y potencia neural.
                    Descansos largos (3-5 minutos). Técnica perfecta obligatoria.
                  </p>
                </section>

                <section className="card-golden bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-warning">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-warning">
                      ⚡ Potencia ({result.trainingZones.power.percentage})
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-warning">
                        {result.trainingZones.power.min} - {result.trainingZones.power.max} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.trainingZones.power.reps} repeticiones
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-[1.618]">
                    <strong>Objetivo:</strong> Desarrollar potencia y velocidad de ejecución.
                    Movimientos explosivos. Descansos 2-4 minutos.
                  </p>
                </section>

                <section className="card-golden bg-gradient-to-r bg-success-subtle border-l-4 border-success">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-success">
                      💪 Hipertrofia ({result.trainingZones.hypertrophy.percentage})
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-success">
                        {result.trainingZones.hypertrophy.min} - {result.trainingZones.hypertrophy.max} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.trainingZones.hypertrophy.reps} repeticiones
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-[1.618]">
                    <strong>Objetivo:</strong> Máximo crecimiento muscular.
                    Control excéntrico. Descansos 1-3 minutos. Volumen alto.
                  </p>
                </section>

                <section className="card-golden bg-gradient-to-r bg-info-subtle border-l-4 border-info">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-info">
                      🔄 Resistencia Muscular ({result.trainingZones.endurance.percentage})
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-info">
                        {result.trainingZones.endurance.min} - {result.trainingZones.endurance.max} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.trainingZones.endurance.reps} repeticiones
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/90 leading-[1.618]">
                    <strong>Objetivo:</strong> Resistencia muscular y capacidad metabólica.
                    Descansos cortos (30-90 segundos). Alto volumen.
                  </p>
                </section>
              </div>
            </div>
          </article>

          <article className="card-golden-lg shadow-golden-lg">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">📊</span>
                Tabla de Porcentajes para Planificación
              </h2>
            </header>
            <div className="p-6">
              <div className="card-golden bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="grid gap-[0.618rem] text-sm">
                  <div className="font-bold text-center text-muted-foreground border-b border-border/30 pb-[0.382rem]">
                    Repeticiones → Peso a usar
                  </div>
                  {Object.entries(result.percentages).map(([reps, weight]) => (
                    <div key={reps} className="flex justify-between items-center py-[0.382rem] border-b border-border/10">
                      <span className="font-medium">{reps} repetición{reps !== '1' ? 'es' : ''}:</span>
                      <span className="font-bold text-info">{weight} kg</span>
                    </div>
                  ))}
                </div>
                <div className="mt-[1.618rem] text-sm text-foreground/90">
                  <p className="leading-[1.618]">
                    <strong>💡 Consejo:</strong> Usa esta tabla para planificar tus entrenamientos.
                    Para 8 repeticiones, usa {result.percentages['8']} kg (~81% de tu 1RM).
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
}
