"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { calculateBodyComposition, calculateBodyFat4Site, calculateBodyFatSkinfolds } from '@/lib/formulas';
import { useState } from 'react';

export function GrasaCorporalCalculator() {
  const [formData, setFormData] = useState({
    sex: 'male',
    age: '',
    weight: '',
    method: '3site',
    triceps: '',
    suprailiac: '',
    thigh: '',
    chest: '',
    biceps: '',
    subscapular: '',
    midaxillary: '',
    abdomen: ''
  });

  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
    leanMass: number;
    fatMass: number;
    method: string;
  } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, age, weight, method } = formData;

    if (!age || !weight) return;

    let bodyFatResult;

    try {
      if (method === '3site') {
        const { triceps, suprailiac, thigh } = formData;
        if (!triceps || !suprailiac || !thigh) return;

        bodyFatResult = calculateBodyFatSkinfolds(
          sex as 'male' | 'female',
          parseInt(age),
          parseFloat(triceps),
          parseFloat(suprailiac),
          parseFloat(thigh)
        );
      } else if (method === '4site') {
        const { triceps, biceps, subscapular, suprailiac } = formData;
        if (!triceps || !biceps || !subscapular || !suprailiac) return;

        bodyFatResult = calculateBodyFat4Site(
          sex as 'male' | 'female',
          parseInt(age),
          parseFloat(triceps),
          parseFloat(biceps),
          parseFloat(subscapular),
          parseFloat(suprailiac)
        );
      } else {
        const { chest, midaxillary, triceps, subscapular, abdomen, suprailiac, thigh } = formData;
        if (!chest || !midaxillary || !triceps || !subscapular || !abdomen || !suprailiac || !thigh) return;

        const { calculateBodyFat7Site } = require('@/lib/formulas');
        bodyFatResult = calculateBodyFat7Site(
          sex as 'male' | 'female',
          parseInt(age),
          parseFloat(chest),
          parseFloat(midaxillary),
          parseFloat(triceps),
          parseFloat(subscapular),
          parseFloat(abdomen),
          parseFloat(suprailiac),
          parseFloat(thigh)
        );
      }

      const composition = calculateBodyComposition(parseFloat(weight), bodyFatResult.bodyFat);

      setResult({
        ...bodyFatResult,
        leanMass: composition.leanMass,
        fatMass: composition.fatMass
      });
    } catch (error) {
      console.error('Error calculating body fat:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Esencial': return 'text-destructive';
      case 'Atlético': return 'text-success';
      case 'Fitness': return 'text-info';
      case 'Aceptable': return 'text-warning';
      case 'Obesidad': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const isFormValid = () => {
    const { age, weight, method } = formData;
    if (!age || !weight) return false;

    if (method === '3site') {
      return formData.triceps && formData.suprailiac && formData.thigh;
    } else if (method === '4site') {
      return formData.triceps && formData.biceps && formData.subscapular && formData.suprailiac;
    } else {
      return formData.chest && formData.midaxillary && formData.triceps &&
        formData.subscapular && formData.abdomen && formData.suprailiac && formData.thigh;
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de grasa corporal">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">📏</span>
              Calculadora de Grasa Corporal
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
                  min={16}
                  max={80}
                  unit="años"
                  placeholder="25"
                  required
                />

                <NumberInput
                  id="weight"
                  label="Peso"
                  value={formData.weight}
                  onChange={handleInputChange('weight')}
                  min={40}
                  max={200}
                  step={0.1}
                  unit="kg"
                  placeholder="70.0"
                  required
                />

                <SelectInput
                  id="method"
                  label="Método de medición"
                  value={formData.method}
                  onChange={handleInputChange('method')}
                  options={[
                    { value: '3site', label: '3 sitios (Jackson-Pollock)' },
                    { value: '4site', label: '4 sitios (Durnin-Womersley)' },
                    { value: '7site', label: '7 sitios (Jackson-Pollock)' }
                  ]}
                  required
                />
              </div>

              {/* 3-site measurements */}
              {formData.method === '3site' && (
                <div className="space-golden-md">
                  <h3 className="text-lg font-semibold mb-[1.618rem]">Mediciones de pliegues cutáneos (3 sitios)</h3>
                  <div className="grid gap-[1.618rem] md:grid-cols-3">
                    <NumberInput
                      id="triceps"
                      label="Tríceps"
                      value={formData.triceps}
                      onChange={handleInputChange('triceps')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="12.5"
                      required
                    />
                    <NumberInput
                      id="suprailiac"
                      label="Suprailiaco"
                      value={formData.suprailiac}
                      onChange={handleInputChange('suprailiac')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="15.0"
                      required
                    />
                    <NumberInput
                      id="thigh"
                      label={formData.sex === 'male' ? 'Pectoral' : 'Muslo'}
                      value={formData.thigh}
                      onChange={handleInputChange('thigh')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="18.0"
                      required
                    />
                  </div>
                </div>
              )}

              {/* 4-site measurements */}
              {formData.method === '4site' && (
                <div className="space-golden-md">
                  <h3 className="text-lg font-semibold mb-[1.618rem]">Mediciones de pliegues cutáneos (4 sitios)</h3>
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="triceps"
                      label="Tríceps"
                      value={formData.triceps}
                      onChange={handleInputChange('triceps')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="12.5"
                      required
                    />
                    <NumberInput
                      id="biceps"
                      label="Bíceps"
                      value={formData.biceps}
                      onChange={handleInputChange('biceps')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="8.0"
                      required
                    />
                    <NumberInput
                      id="subscapular"
                      label="Subescapular"
                      value={formData.subscapular}
                      onChange={handleInputChange('subscapular')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="15.0"
                      required
                    />
                    <NumberInput
                      id="suprailiac"
                      label="Suprailiaco"
                      value={formData.suprailiac}
                      onChange={handleInputChange('suprailiac')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="15.0"
                      required
                    />
                  </div>
                </div>
              )}

              {/* 7-site measurements */}
              {formData.method === '7site' && (
                <div className="space-golden-md">
                  <h3 className="text-lg font-semibold mb-[1.618rem]">Mediciones de pliegues cutáneos (7 sitios)</h3>
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="chest"
                      label="Pectoral"
                      value={formData.chest}
                      onChange={handleInputChange('chest')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="12.0"
                      required
                    />
                    <NumberInput
                      id="midaxillary"
                      label="Axilar medio"
                      value={formData.midaxillary}
                      onChange={handleInputChange('midaxillary')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="10.0"
                      required
                    />
                    <NumberInput
                      id="triceps"
                      label="Tríceps"
                      value={formData.triceps}
                      onChange={handleInputChange('triceps')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="12.5"
                      required
                    />
                    <NumberInput
                      id="subscapular"
                      label="Subescapular"
                      value={formData.subscapular}
                      onChange={handleInputChange('subscapular')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="15.0"
                      required
                    />
                    <NumberInput
                      id="abdomen"
                      label="Abdominal"
                      value={formData.abdomen}
                      onChange={handleInputChange('abdomen')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="20.0"
                      required
                    />
                    <NumberInput
                      id="suprailiac"
                      label="Suprailiaco"
                      value={formData.suprailiac}
                      onChange={handleInputChange('suprailiac')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="15.0"
                      required
                    />
                    <NumberInput
                      id="thigh"
                      label="Muslo"
                      value={formData.thigh}
                      onChange={handleInputChange('thigh')}
                      min={1}
                      max={50}
                      step={0.1}
                      unit="mm"
                      placeholder="18.0"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={!isFormValid()}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                📏 Calcular grasa corporal
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
              Tu Composición Corporal
            </h2>
          </header>
          <div className="p-6">
            <div className="text-center space-golden-md">
              <div className="space-golden-sm">
                <div className="text-6xl font-bold text-primary mb-[0.618rem]">
                  {result.bodyFat}%
                </div>
                <div className={`text-2xl font-bold ${getCategoryColor(result.category)}`}>
                  {result.category}
                </div>
                <div className="text-sm text-muted-foreground mt-[0.618rem]">
                  Método: {result.method}
                </div>
              </div>

              <div className="grid gap-[1.618rem] md:grid-cols-2 mt-[2.618rem]">
                <article className="text-center card-golden bg-secondary/50">
                  <div className="text-4xl font-bold text-info mb-[0.618rem]">
                    {formatGrams(result.leanMass, 1)}
                  </div>
                  <div className="text-lg font-semibold text-info mb-[0.382rem]">
                    Masa Magra
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Músculo, huesos, órganos
                  </p>
                </article>

                <article className="text-center card-golden bg-primary text-primary-foreground">
                  <div className="text-4xl font-bold mb-[0.618rem]">
                    {formatGrams(result.fatMass, 1)}
                  </div>
                  <div className="text-lg font-semibold opacity-95 mb-[0.382rem]">
                    Masa Grasa
                  </div>
                  <p className="text-sm opacity-90">
                    Grasa corporal total
                  </p>
                </article>
              </div>

              <section className="mt-[2.618rem] card-golden bg-gradient-to-r bg-success-subtle border-l-4 border-success">
                <h4 className="font-bold mb-[1.618rem] text-lg flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Rangos de grasa corporal
                </h4>
                <div className="grid gap-[1.618rem] md:grid-cols-2">
                  <article>
                    <h5 className="font-semibold mb-[0.618rem] text-info">Hombres:</h5>
                    <div className="space-golden-xs text-sm">
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Esencial:</span>
                        <span className="text-destructive font-bold">&lt; 6%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Atlético:</span>
                        <span className="text-success font-bold">6-14%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Fitness:</span>
                        <span className="text-info font-bold">14-18%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Aceptable:</span>
                        <span className="text-warning font-bold">18-25%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem]">
                        <span className="font-medium">Obesidad:</span>
                        <span className="text-destructive font-bold">&gt; 25%</span>
                      </div>
                    </div>
                  </article>
                  <article>
                    <h5 className="font-semibold mb-[0.618rem] text-pink-700">Mujeres:</h5>
                    <div className="space-golden-xs text-sm">
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Esencial:</span>
                        <span className="text-destructive font-bold">&lt; 14%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Atlético:</span>
                        <span className="text-success font-bold">14-21%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Fitness:</span>
                        <span className="text-info font-bold">21-25%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                        <span className="font-medium">Aceptable:</span>
                        <span className="text-warning font-bold">25-32%</span>
                      </div>
                      <div className="flex justify-between py-[0.382rem]">
                        <span className="font-medium">Obesidad:</span>
                        <span className="text-destructive font-bold">&gt; 32%</span>
                      </div>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
