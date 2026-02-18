"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeSodiumLimit } from '@/lib/formulas';
import { AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

export function SodioCalculator() {
  const [result, setResult] = useState<ReturnType<typeof analyzeSodiumLimit> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(analyzeSodiumLimit());
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de sodio">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-amber-600" />
              Límite de Sodio y Sal (OMS)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-warning-subtle rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground/90">
                  <strong>Nota:</strong> La OMS recomienda para todos los adultos limitar el sodio a menos de 2 g al día (equivalente a menos de 5 g de sal). Para personas con hipertensión suele recomendarse un límite más estricto (1,5 g sodio / ~3,75 g sal).
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-golden-md">
              <Button
                type="submit"
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Ver recomendaciones OMS
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-amber-600" />
              Límites de Sodio y Sal
            </h2>
          </header>
          <div className="p-6 space-golden-md">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-gradient-to-br bg-warning-subtle">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-amber-900">Recomendación OMS (población general)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-700">
                    &lt; {result.maxSodiumMg} mg sodio / día
                  </div>
                  <div className="text-lg font-semibold text-amber-600 mt-1">
                    &lt; {result.maxSaltGrams} g de sal / día
                  </div>
                  <p className="text-xs text-amber-600 mt-2">Para adultos sanos</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-warning">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Recomendación estricta (ej. hipertensión)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">
                    &lt; {result.strictSodiumMg} mg sodio / día
                  </div>
                  <div className="text-lg font-semibold text-warning mt-1">
                    &lt; {result.strictSaltGrams} g de sal / día
                  </div>
                  <p className="text-xs text-warning mt-2">Cuando el médico lo indique</p>
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
                <p className="text-sm text-foreground/90">{result.interpretation}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-amber-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-amber-900">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Consejos prácticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-foreground/90">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>{tip}</span>
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
