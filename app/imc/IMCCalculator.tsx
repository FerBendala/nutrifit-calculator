"use client";

import { NumberInput } from '@/components/NumberInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateBMI } from '@/lib/formulas';
import { useLastResult } from '@/lib/useLastResult';
import { useEffect, useState } from 'react';

export function IMCCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string; } | null>(null);
  const { save, load } = useLastResult<{ bmi: number; category: string }>('imc');
  const [lastSaved, setLastSaved] = useState<{ result: { bmi: number; category: string }; timestamp: number } | null>(null);

  useEffect(() => {
    const previous = load();
    if (previous) setLastSaved(previous);
  }, [load]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight) return;
    const bmiResult = calculateBMI(parseFloat(weight), parseInt(height));
    setResult(bmiResult);
    save(bmiResult);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Bajo peso': return 'text-info';
      case 'Peso normal': return 'text-success';
      case 'Sobrepeso': return 'text-warning';
      case 'Obesidad': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const isFormValid = height && weight;

  return (
    <>
      {lastSaved && !result && (
        <div className="card-golden bg-muted/30 text-sm text-muted-foreground leading-[1.618]">
          Tu ultimo resultado: <strong className="text-foreground">IMC {lastSaved.result.bmi.toFixed(1)}</strong> ({lastSaved.result.category}) - {new Date(lastSaved.timestamp).toLocaleDateString('es-ES')}
        </div>
      )}

      <section id="calculator" aria-label="Calculadora de IMC">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">📊</span>
              Calculadora de IMC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <NumberInput
                  id="height"
                  label="Altura"
                  value={height}
                  onChange={setHeight}
                  min={130}
                  max={250}
                  unit="cm"
                  placeholder="170"
                  required
                />
                <NumberInput
                  id="weight"
                  label="Peso"
                  value={weight}
                  onChange={setWeight}
                  min={30}
                  max={300}
                  step={0.1}
                  unit="kg"
                  placeholder="70.0"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                📊 Calcular IMC
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
              Tu Resultado
            </h2>
          </header>
          <div className="p-6">
            <div className="text-center space-golden-md">
              <div className="space-golden-sm">
                <div className="text-6xl font-bold text-primary mb-[0.618rem]">
                  {result.bmi}
                </div>
                <div className={`text-2xl font-bold ${getCategoryColor(result.category)}`}>
                  {result.category}
                </div>
              </div>
              <div className="grid gap-[1.618rem] mt-[2.618rem]">
                <article className="card-golden">
                  <h4 className="font-bold mb-[1.618rem] text-lg">📏 Rangos de IMC (OMS):</h4>
                  <div className="space-golden-xs text-base">
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Bajo peso:</span>
                      <span className="text-info font-bold">&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Peso normal:</span>
                      <span className="text-success font-bold">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">Sobrepeso:</span>
                      <span className="text-warning font-bold">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between py-[0.382rem]">
                      <span className="font-medium">Obesidad:</span>
                      <span className="text-destructive font-bold">≥ 30.0</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
