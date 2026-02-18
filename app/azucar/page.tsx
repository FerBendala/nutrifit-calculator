"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { analyzeSugarLimit } from '@/lib/formulas';
import { Circle, Info } from 'lucide-react';
import { useState } from 'react';

export default function AzucarPage() {
  const [formData, setFormData] = useState({ dailyCalories: '' });
  const [result, setResult] = useState<ReturnType<typeof analyzeSugarLimit> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const calories = parseInt(formData.dailyCalories);
      setResult(analyzeSugarLimit(calories));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al calcular');
    }
  };

  const isFormValid = formData.dailyCalories && parseInt(formData.dailyCalories) > 0;

  return (
    <>
      <SchemaMarkup calculatorKey="azucar" />
      <CalculatorBreadcrumbs calculatorKey="azucar" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Azúcar Diaria: Tu Límite Según la OMS
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu límite máximo de azúcar al día según las recomendaciones de la OMS.
              Descubre cuántos gramos de azúcares libres puedes consumir basándote en tus calorías diarias.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de azúcar">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <Circle className="w-6 h-6 mr-3 text-amber-600" />
                  Límite de Azúcares Libres (OMS)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-warning-subtle rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Nota:</strong> Introduce tu ingesta calórica diaria estimada (o la que quieras como referencia). La OMS recomienda limitar los azúcares libres a menos del 10% de la energía; menos del 5% aporta beneficios adicionales (caries, peso).
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-golden-md">
                  <NumberInput
                    id="dailyCalories"
                    label="Calorías diarias"
                    value={formData.dailyCalories}
                    onChange={handleInputChange('dailyCalories')}
                    min={800}
                    max={5000}
                    step={50}
                    unit="kcal"
                    placeholder="2000"
                    required
                  />

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <Circle className="w-5 h-5 mr-2" />
                    Calcular límite de azúcar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <Circle className="w-6 h-6 mr-3 text-amber-600" />
                  Tu Límite de Azúcares Libres
                </h2>
              </header>
              <div className="p-6 space-golden-md">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-gradient-to-br bg-warning-subtle">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-amber-900">Recomendación OMS (&lt;10%)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-700">
                        Máximo {formatGrams(result.maxGrams10Percent)}/día
                      </div>
                      <p className="text-xs text-amber-600 mt-1">Menos del 10% de la energía</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-warning">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-foreground">Beneficio adicional (&lt;5%)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-warning">
                        Máximo {formatGrams(result.maxGrams5Percent)}/día
                      </div>
                      <p className="text-xs text-warning mt-1">Menos del 5% de la energía</p>
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
                    <p className="text-sm text-muted-foreground">{result.interpretation}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-amber-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-amber-900">
                      <Circle className="w-4 h-4 mr-2" />
                      Consejos prácticos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-amber-600 mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br bg-muted border-l-4 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Info className="w-4 h-4 mr-2" />
                      ¿Qué son los azúcares libres?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.freeSugarsDefinition.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-muted-foreground mr-2">•</span>
                          <span>{item}</span>
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
                ¿Por qué limitar el azúcar?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La OMS recomienda limitar la ingesta de azúcares libres para reducir el riesgo de caries, sobrepeso y enfermedades no transmisibles. Menos del 10% de la energía es la recomendación fuerte; menos del 5% aporta beneficios adicionales.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Circle className="w-5 h-5 mr-3 text-amber-600" />
                  Recomendaciones OMS
                </h3>
                <div className="space-golden-sm text-sm text-muted-foreground">
                  <p><strong>Menos del 10%</strong> de la ingesta energética total: recomendación fuerte para adultos y niños.</p>
                  <p><strong>Menos del 5%</strong> de la ingesta energética total: beneficio adicional (caries, peso).</p>
                  <p>El azúcar aporta unas 4 kcal por gramo; el límite en gramos se obtiene a partir de tus calorías diarias.</p>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Fuentes habituales
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs list-disc list-inside">
                  <li>Refrescos, zumos envasados, bebidas energéticas</li>
                  <li>Bollería, galletas, cereales azucarados</li>
                  <li>Miel, mermeladas, siropes</li>
                  <li>Productos “light” o “sin grasa” (a veces con más azúcar)</li>
                </ul>
              </article>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿La fruta cuenta como azúcar libre?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">No. Los azúcares en fruta y verdura enteras, y en la leche sin azúcar, no se consideran azúcares libres. Sí cuentan los zumos, concentrados y el azúcar añadido.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo saber cuánto azúcar llevo?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Revisa el etiquetado: “Hidratos de carbono – de los cuales azúcares”. Suma el azúcar de lo que comes y bebes a lo largo del día y compáralo con tu límite en gramos.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo usar edulcorantes?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">La OMS se refiere a azúcares libres; los edulcorantes sin calorías no entran en este límite. Usados con moderación pueden ayudar a reducir azúcar, pero la prioridad es reducir el dulzor global de la dieta.</p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/azucar" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Límite de Azúcar Diaria - Recomendaciones OMS"
            url="https://nutrifit-calculator.com/azucar/"
            description="Calcula el límite máximo de azúcares libres según tus calorías. Recomendaciones OMS: menos del 10% y menos del 5%."
          />
          <CalculatorNavigation currentCalculator="azucar" />
        </main>
      </Container>
    </>
  );
}
