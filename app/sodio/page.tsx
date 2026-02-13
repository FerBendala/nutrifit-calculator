"use client";

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeSodiumLimit } from '@/lib/formulas';
import { AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

export default function SodioPage() {
  const [result, setResult] = useState<ReturnType<typeof analyzeSodiumLimit> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(analyzeSodiumLimit());
  };

  return (
    <>
      <SchemaMarkup calculatorKey="sodio" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <Breadcrumbs items={[{ label: 'Sodio / Sal (Límite OMS)' }]} className="mb-6" />

          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Límite de Sodio y Sal
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Límite de sodio y sal según OMS: menos de 2 g de sodio (5 g de sal) al día. Incluye recomendación estricta para hipertensión.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de sodio">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-amber-600" />
                  Límite de Sodio y Sal (OMS)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
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
                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
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
                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-orange-900">Recomendación estricta (ej. hipertensión)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-700">
                        &lt; {result.strictSodiumMg} mg sodio / día
                      </div>
                      <div className="text-lg font-semibold text-orange-600 mt-1">
                        &lt; {result.strictSaltGrams} g de sal / día
                      </div>
                      <p className="text-xs text-orange-600 mt-2">Cuando el médico lo indique</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-blue-900">
                      <Info className="w-4 h-4 mr-2" />
                      Interpretación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{result.interpretation}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-4 border-amber-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-amber-900">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Consejos prácticos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
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

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué limitar el sodio?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                Un exceso de sodio se asocia con mayor riesgo de hipertensión y enfermedad cardiovascular. La OMS recomienda menos de 2 g de sodio al día (5 g de sal); la sal de mesa es cloruro sódico y aproximadamente el 40% es sodio.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-3 text-amber-600" />
                  Recomendaciones OMS
                </h3>
                <div className="space-golden-sm text-sm text-muted-foreground">
                  <p><strong>Población general:</strong> menos de 2 g de sodio al día (menos de 5 g de sal).</p>
                  <p><strong>Hipertensión o indicación médica:</strong> a menudo se recomienda 1,5 g de sodio (unos 3,75 g de sal).</p>
                  <p>En el etiquetado el sodio puede aparecer en mg; 2 g = 2000 mg.</p>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-blue-600" />
                  Dónde suele haber más sodio
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs list-disc list-inside">
                  <li>Pan, bollería y cereales de desayuno</li>
                  <li>Embutidos, conservas y salazones</li>
                  <li>Quesos, salsas y platos preparados</li>
                  <li>Snacks, frutos secos salados y sal de mesa</li>
                </ul>
              </article>
            </section>

            <section className="prose prose-sm max-w-none">
              <h3 className="text-xl font-semibold mb-4">Preguntas frecuentes</h3>
              <h4 className="font-semibold text-base">¿Sal y sodio es lo mismo?</h4>
              <p className="text-muted-foreground">No. La sal (cloruro sódico) contiene aproximadamente un 40% de sodio. Por tanto, 5 g de sal equivalen a unos 2 g de sodio. En las etiquetas suele figurar el sodio en mg.</p>
              <h4 className="font-semibold text-base mt-4">¿Qué es "alto en sodio" en el etiquetado?</h4>
              <p className="text-muted-foreground">En la UE, un alimento es "alto en sal" si tiene más de 1,5 g de sal por 100 g (equivalente a 0,6 g de sodio por 100 g). Comparar por 100 g ayuda a elegir productos con menos sodio.</p>
              <h4 className="font-semibold text-base mt-4">¿Necesito algo de sodio?</h4>
              <p className="text-muted-foreground">Sí. El sodio es un electrolito necesario, pero en la dieta actual la mayoría de personas supera el límite recomendado. Reducir el exceso es el objetivo, no eliminar el sodio por completo.</p>
            </section>
          </article>

          <RelatedCalculators currentPage="/sodio" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Límite de Sodio y Sal - Recomendaciones OMS"
            url="https://nutrifit-calculator.com/sodio"
            description="Límite de sodio y sal según OMS: menos de 2 g sodio (5 g sal). Incluye recomendación estricta para hipertensión."
          />
          <CalculatorNavigation currentCalculator="sodio" />
        </main>
      </Container>
    </>
  );
}
