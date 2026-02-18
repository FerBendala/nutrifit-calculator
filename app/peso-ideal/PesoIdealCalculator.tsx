"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateIdealWeight, type IdealWeightResult } from '@/lib/formulas';
import { AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function PesoIdealCalculator() {
  const [formData, setFormData] = useState({
    sex: 'male',
    height: '',
    weight: ''
  });

  const [result, setResult] = useState<IdealWeightResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, height, weight } = formData;

    if (!height || !weight) return;

    try {
      const idealWeightResult = calculateIdealWeight(
        parseInt(height),
        parseFloat(weight),
        sex as 'male' | 'female'
      );

      setResult(idealWeightResult);
    } catch (error) {
      console.error('Error calculating ideal weight:', error);
    }
  };

  const isFormValid = formData.height && formData.weight;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'underweight': return 'text-info';
      case 'normal': return 'text-success';
      case 'overweight': return 'text-warning';
      case 'obese': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'underweight': return <Info className="w-5 h-5" />;
      case 'normal': return <CheckCircle className="w-5 h-5" />;
      case 'overweight': return <AlertCircle className="w-5 h-5" />;
      case 'obese': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'underweight': return 'Bajo peso';
      case 'normal': return 'Peso normal';
      case 'overweight': return 'Sobrepeso';
      case 'obese': return 'Obesidad';
      default: return 'Desconocido';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de peso ideal">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">⚖️</span>
              Calculadora de Peso Ideal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <SelectInput
                  id="sex"
                  label="Sexo"
                  value={formData.sex}
                  onChange={handleInputChange('sex')}
                  options={[
                    { value: 'male', label: 'Hombre' },
                    { value: 'female', label: 'Mujer' }
                  ]}
                />
                <NumberInput
                  id="height"
                  label="Altura"
                  value={formData.height}
                  onChange={handleInputChange('height')}
                  placeholder="170"
                  min={100}
                  max={250}
                  unit="cm"
                  required
                />
              </div>

              <NumberInput
                id="weight"
                label="Peso actual"
                value={formData.weight}
                onChange={handleInputChange('weight')}
                placeholder="70.0"
                min={30}
                max={300}
                step={0.1}
                unit="kg"
                required
              />

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Calcular Peso Ideal
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
              Tu Análisis de Peso Ideal
            </h2>
          </header>
          <div className="p-6">
            <div className="text-center space-golden-md">
              <div className="space-golden-sm">
                <div className={`flex items-center justify-center gap-3 mb-3 ${getStatusColor(result.status)}`}>
                  {getStatusIcon(result.status)}
                  <span className="text-3xl font-bold">{getStatusLabel(result.status)}</span>
                </div>
                <div className="text-2xl font-bold text-primary mb-[0.618rem]">
                  {result.average} kg
                </div>
                <div className="text-lg text-muted-foreground">
                  Peso ideal promedio | IMC actual: {result.currentBmi}
                </div>
              </div>

              <div className="grid gap-[1.618rem] mt-[2.618rem]">
                <article className="card-golden">
                  <h3 className="font-bold mb-[1.618rem] text-lg">📊 Fórmulas Científicas:</h3>
                  <div className="space-golden-xs text-base">
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Robinson (1983):</span>
                      <span className="text-info font-bold">{result.robinson} kg</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Miller (1983):</span>
                      <span className="text-success font-bold">{result.miller} kg</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Devine (1974):</span>
                      <span className="text-warning font-bold">{result.devine} kg</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Hamwi (1964):</span>
                      <span className="text-warning font-bold">{result.hamwi} kg</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem]">
                      <span className="font-medium">Peterson (2016):</span>
                      <span className="text-destructive font-bold">{result.peterson} kg</span>
                    </div>
                  </div>
                </article>

                <article className="card-golden">
                  <h3 className="font-bold mb-[1.618rem] text-lg">📏 Rangos de Referencia:</h3>
                  <div className="space-golden-xs text-base">
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Rango ideal (±10%):</span>
                      <span className="text-success font-bold">{result.range.min} - {result.range.max} kg</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Rango BMI saludable:</span>
                      <span className="text-info font-bold">{result.bmiRange.min} - {result.bmiRange.max} kg</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem]">
                      <span className="font-medium">Tu peso actual:</span>
                      <span className="text-muted-foreground font-bold">{formData.weight} kg</span>
                    </div>
                  </div>
                </article>
              </div>

              <div className="mt-[2.618rem] p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground leading-relaxed">{result.recommendation}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
