"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams, formatPercentage } from '@/lib/format';
import { calculateBodyComposition, calculateBodyFatNavy, calculateWaistHipRatio } from '@/lib/formulas';
import { useState } from 'react';

interface BodyCompositionResult {
  bodyFat: number;
  category: string;
  leanMass: number;
  fatMass: number;
  waistHipRatio: number;
  waistHipCategory: string;
  waistHipRiskLevel: string;
}

export function ComposicionCalculator() {
  const [formData, setFormData] = useState({
    sex: 'male',
    height: '',
    weight: '',
    waist: '',
    neck: '',
    hip: ''
  });

  const [result, setResult] = useState<BodyCompositionResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, height, weight, waist, neck, hip } = formData;

    if (!height || !weight || !waist || !neck) return;
    if (sex === 'female' && !hip) return;

    try {
      const bodyFatResult = calculateBodyFatNavy(
        sex as 'male' | 'female',
        parseInt(height),
        parseFloat(waist),
        parseFloat(neck),
        sex === 'female' ? parseFloat(hip) : undefined
      );

      const composition = calculateBodyComposition(
        parseFloat(weight),
        bodyFatResult.bodyFat
      );

      let waistHipData = { ratio: 0, category: '', riskLevel: '' };
      if (hip) {
        waistHipData = calculateWaistHipRatio(
          parseFloat(waist),
          parseFloat(hip),
          sex as 'male' | 'female'
        );
      }

      setResult({
        bodyFat: bodyFatResult.bodyFat,
        category: bodyFatResult.category,
        leanMass: composition.leanMass,
        fatMass: composition.fatMass,
        waistHipRatio: waistHipData.ratio,
        waistHipCategory: waistHipData.category,
        waistHipRiskLevel: waistHipData.riskLevel
      });
    } catch (error) {
      console.error('Error calculating body composition:', error);
    }
  };

  const isFormValid = formData.height && formData.weight && formData.waist && formData.neck &&
    (formData.sex === 'male' || formData.hip);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Esencial': return 'text-info';
      case 'Atlético': return 'text-success';
      case 'Fitness': return 'text-emerald-600';
      case 'Aceptable': return 'text-warning';
      case 'Obesidad': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo riesgo': return 'text-success';
      case 'Riesgo moderado': return 'text-warning';
      case 'Alto riesgo': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de composición corporal">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              Calculadora de Composición Corporal
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

                <NumberInput
                  id="waist"
                  label="Circunferencia de cintura"
                  value={formData.waist}
                  onChange={handleInputChange('waist')}
                  min={50}
                  max={200}
                  step={0.1}
                  unit="cm"
                  placeholder="80.0"
                  required
                />

                <NumberInput
                  id="neck"
                  label="Circunferencia del cuello"
                  value={formData.neck}
                  onChange={handleInputChange('neck')}
                  min={25}
                  max={60}
                  step={0.1}
                  unit="cm"
                  placeholder="35.0"
                  required
                />

                {formData.sex === 'female' && (
                  <NumberInput
                    id="hip"
                    label="Circunferencia de cadera"
                    value={formData.hip}
                    onChange={handleInputChange('hip')}
                    min={60}
                    max={200}
                    step={0.1}
                    unit="cm"
                    placeholder="95.0"
                    required
                  />
                )}
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                🎯 Calcular Composición
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="space-golden-md">
          {/* Main Results */}
          <Card className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">📊</span>
                Tus Resultados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                {/* Body Fat Percentage */}
                <article className="text-center card-golden bg-primary text-primary-foreground">
                  <div className="text-5xl font-bold mb-[0.618rem]">
                    {formatPercentage(result.bodyFat)}
                  </div>
                  <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                    Grasa Corporal
                  </div>
                  <div className={`text-lg font-semibold ${getCategoryColor(result.category)} bg-white px-2 py-1 rounded`}>
                    {result.category}
                  </div>
                </article>

                {/* Body Composition Breakdown */}
                <div className="space-golden-sm">
                  <article className="text-center card-golden bg-secondary/50 mb-[1rem]">
                    <div className="text-3xl font-bold text-success mb-[0.382rem]">
                      {formatGrams(result.leanMass, 1)}
                    </div>
                    <div className="text-sm font-semibold text-success">
                      Masa Magra (músculo, huesos, órganos)
                    </div>
                  </article>

                  <article className="text-center card-golden bg-secondary/50">
                    <div className="text-3xl font-bold text-destructive mb-[0.382rem]">
                      {formatGrams(result.fatMass, 1)}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      Masa Grasa
                    </div>
                  </article>
                </div>
              </div>

              {/* Visual Bar Chart */}
              <section className="mt-[2.618rem] space-golden-sm">
                <h4 className="font-bold mb-[1rem] text-lg text-center">
                  Distribución de Masa Corporal
                </h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Masa Magra</span>
                      <span>{formatGrams(result.leanMass, 1)} ({formatPercentage(100 - result.bodyFat)})</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-success-subtle0 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${100 - result.bodyFat}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Masa Grasa</span>
                      <span>{formatGrams(result.fatMass, 1)} ({formatPercentage(result.bodyFat)})</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-destructive-subtle0 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${result.bodyFat}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Waist-Hip Ratio (if available) */}
              {result.waistHipRatio > 0 && (
                <section className="mt-[2.618rem] card-golden bg-gradient-to-r bg-info-subtle border-l-4 border-warning">
                  <h4 className="font-bold mb-[1.618rem] text-lg flex items-center">
                    <span className="text-2xl mr-3">📏</span>
                    Ratio Cintura-Cadera
                  </h4>
                  <div className="grid gap-[1rem] md:grid-cols-2">
                    <article className="text-center">
                      <div className="text-3xl font-bold text-warning mb-[0.382rem]">
                        {result.waistHipRatio.toFixed(2)}
                      </div>
                      <div className="text-sm font-semibold text-warning">
                        Ratio C/C
                      </div>
                    </article>
                    <article className="text-center">
                      <div className={`text-lg font-bold ${getRiskColor(result.waistHipRiskLevel)}`}>
                        {result.waistHipRiskLevel}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Riesgo cardiovascular
                      </div>
                    </article>
                  </div>
                </section>
              )}
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
}
