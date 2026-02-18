"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { analyzeFiberNeeds } from '@/lib/formulas';
import { Info, Leaf } from 'lucide-react';
import { useState } from 'react';

export default function FibraPage() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'female' as 'male' | 'female',
    dailyCalories: ''
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeFiberNeeds> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const age = parseInt(formData.age);
      const calories = formData.dailyCalories ? parseInt(formData.dailyCalories) : undefined;
      const analysis = analyzeFiberNeeds(age, formData.sex, calories);
      setResult(analysis);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al calcular');
    }
  };

  const isFormValid = formData.age;

  return (
    <>
      <SchemaMarkup calculatorKey="fibra" />
      <CalculatorBreadcrumbs calculatorKey="fibra" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Fibra Diaria
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula cuánta fibra dietética necesitas al día según tu edad, sexo y calorías.
              Recomendaciones IOM/FDA (14 g por 1000 kcal). Mejora tu salud digestiva con la cantidad correcta de fibra.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de fibra">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <Leaf className="w-6 h-6 mr-3 text-success" />
                  Calculadora de Fibra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-success-subtle rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Nota:</strong> La ingesta calórica es opcional. Si la introduces, obtendrás además la recomendación por calorías (14 g de fibra por cada 1000 kcal).
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="age"
                      label="Edad"
                      value={formData.age}
                      onChange={handleInputChange('age')}
                      min={9}
                      max={120}
                      step={1}
                      unit="años"
                      placeholder="35"
                      required
                    />
                    <SelectInput
                      id="sex"
                      label="Género"
                      value={formData.sex}
                      onChange={handleInputChange('sex')}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />
                    <NumberInput
                      id="dailyCalories"
                      label="Calorías diarias (opcional)"
                      value={formData.dailyCalories}
                      onChange={handleInputChange('dailyCalories')}
                      min={800}
                      max={5000}
                      step={50}
                      unit="kcal"
                      placeholder="2000"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    Calcular necesidades de fibra
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <Leaf className="w-6 h-6 mr-3 text-success" />
                  Tus Necesidades de Fibra
                </h2>
              </header>
              <div className="p-6 space-golden-md">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-gradient-to-br bg-success-subtle">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-foreground">Por edad y sexo (IOM/FDA)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-success">
                        {formatGrams(result.byAgeSex)}
                      </div>
                      <p className="text-xs text-success mt-1">Ingesta adecuada diaria</p>
                    </CardContent>
                  </Card>
                  {result.byCalories !== undefined && (
                    <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold text-emerald-900">Por calorías (14 g/1000 kcal)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-emerald-700">
                          {formatGrams(result.byCalories)}
                        </div>
                        <p className="text-xs text-emerald-600 mt-1">Según tu ingesta calórica</p>
                      </CardContent>
                    </Card>
                  )}
                  <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-l-4 border-teal-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-teal-900">Objetivo diario</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-teal-700">
                        {formatGrams(result.recommendedMin)} – {formatGrams(result.recommendedMax)}
                      </div>
                      <p className="text-xs text-teal-600 mt-1">Rango recomendado</p>
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

                <Card className="bg-gradient-to-br bg-success-subtle border-l-4 border-success">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Leaf className="w-4 h-4 mr-2" />
                      Consejos prácticos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-success mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br bg-warning-subtle border-l-4 border-amber-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-amber-900">
                      <Leaf className="w-4 h-4 mr-2" />
                      Fuentes de fibra
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.foodSources.map((source, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-amber-600 mr-2">•</span>
                          <span>{source}</span>
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
                ¿Por qué es importante la fibra?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La fibra dietética favorece el tránsito intestinal, ayuda a controlar el azúcar y el colesterol en sangre,
                y contribuye a la saciedad. Las guías IOM/FDA establecen ingestas adecuadas por edad y sexo, y una referencia
                de 14 g de fibra por cada 1000 kcal consumidas.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Leaf className="w-5 h-5 mr-3 text-success" />
                  Recomendaciones IOM/FDA
                </h3>
                <div className="space-golden-sm text-sm text-muted-foreground">
                  <p><strong>Adultos 19-50 años:</strong> Mujeres 25 g/día, Hombres 38 g/día.</p>
                  <p><strong>Adultos 51+ años:</strong> Mujeres 21 g/día, Hombres 30 g/día.</p>
                  <p><strong>Por calorías:</strong> 14 g de fibra por cada 1000 kcal (referencia IOM).</p>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-info" />
                  Tipos de fibra
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs list-disc list-inside">
                  <li><strong>Fibra soluble:</strong> avena, manzana, legumbres; ayuda a colesterol y glucemia.</li>
                  <li><strong>Fibra insoluble:</strong> cereales integrales, verduras; favorece el tránsito intestinal.</li>
                </ul>
              </article>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo tomar más fibra de la recomendada?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">Un exceso brusco puede causar molestias digestivas. Aumenta la fibra de forma gradual y bebe suficiente agua.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿La fibra tiene calorías?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">La fibra aporta menos energía que los carbohidratos digeribles (aprox. 2 kcal/g en lugar de 4). Muchas tablas de calorías ya lo tienen en cuenta.</p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuento la fibra en los carbohidratos?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">En etiquetado (UE) los “hidratos de carbono” suelen incluir la fibra. Para “carbohidratos netos” se resta la fibra. Esta calculadora se centra en la fibra total recomendada, no en los net carbs.</p>
                </article>
              </div>
            </section>
          </article>

          <section className="bg-warning-subtle card-golden border-l-4 border-warning mb-6">
            <h3 className="font-bold text-foreground mb-3 text-lg">Otras calculadoras de nutrición</h3>
            <ul className="text-sm text-foreground/90 space-y-2">
              <li>
                <strong><a href="/azucar/" className="text-info hover:underline transition-colors font-medium transition-golden">Límite de azúcar (OMS):</a></strong> Máximo de azúcares libres según calorías (&lt;10% y &lt;5%)
              </li>
              <li>
                <strong><a href="/sodio/" className="text-info hover:underline transition-colors font-medium transition-golden">Sodio/Sal (OMS):</a></strong> Límite de sodio y sal, incl. recomendación para HTA
              </li>
              <li>
                <strong><a href="/alcohol/" className="text-info hover:underline transition-colors font-medium transition-golden">Alcohol:</a></strong> Unidades estándar, calorías y límite de bajo riesgo
              </li>
              <li>
                <strong><a href="/proteina/" className="text-info hover:underline transition-colors font-medium transition-golden">Proteína diaria:</a></strong> Necesidades según objetivo y actividad
              </li>
              <li>
                <strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">TDEE:</a></strong> Gasto calórico total diario
              </li>
            </ul>
          </section>

          <RelatedCalculators currentPage="/fibra" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Fibra Diaria - Necesidades IOM/FDA"
            url="https://nutrifit-calculator.com/fibra/"
            description="Calcula tus necesidades de fibra según edad, sexo y calorías. Recomendaciones IOM/FDA y consejos prácticos."
          />
          <CalculatorNavigation currentCalculator="fibra" />
        </main>
      </Container>
    </>
  );
}
