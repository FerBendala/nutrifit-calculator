'use client';

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeBAI } from '@/lib/formulas';
import { AlertTriangle, Calculator, Info, Ruler, Scale, Target, Users } from 'lucide-react';
import { useState } from 'react';

export function BAICalculator() {
  const [hipCircumference, setHipCircumference] = useState<string>('95');
  const [height, setHeight] = useState<string>('170');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [result, setResult] = useState<ReturnType<typeof analyzeBAI> | null>(null);

  const calculateBAI = () => {
    if (!hipCircumference || !height) {
      return;
    }

    const hipCirc = parseFloat(hipCircumference);
    const heightVal = parseFloat(height);

    if (hipCirc <= 0 || heightVal <= 0) {
      return;
    }

    const analysis = analyzeBAI(hipCirc, heightVal, gender);
    setResult(analysis);
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de BAI">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Calculadora de Índice de Adiposidad Corporal
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Estima tu porcentaje de grasa corporal sin báscula
            </p>
          </CardHeader>
          <CardContent className="space-golden-md">
            <SelectInput
              id="gender"
              label="Sexo biológico"
              value={gender}
              onChange={(value) => setGender(value as 'male' | 'female')}
              options={[
                { value: 'male', label: 'Hombre' },
                { value: 'female', label: 'Mujer' }
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NumberInput
                id="hipCircumference"
                label="Circunferencia de cadera"
                value={hipCircumference}
                onChange={setHipCircumference}
                placeholder="95"
                unit="cm"
                min={60}
                max={200}
                step={0.5}
              />

              <NumberInput
                id="height"
                label="Altura"
                value={height}
                onChange={setHeight}
                placeholder="170"
                unit="cm"
                min={120}
                max={250}
                step={0.5}
              />
            </div>

            <Button
              type="button"
              onClick={calculateBAI}
              className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calcular BAI
            </Button>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="space-golden-lg border-t pt-8">
          <header className="mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center">
              <Target className="w-6 h-6 mr-2 text-warning" />
              Tus Resultados de BAI
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="w-5 h-5 mr-2 text-warning" />
                  BAI (Índice de Adiposidad)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">
                  {result.bai.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Scale className="w-5 h-5 mr-2 text-info" />
                  Grasa Corporal Estimada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-info">
                  {result.estimatedBodyFat.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className={`mb-6 border-l-4 ${result.healthRisk === 'Bajo' ? 'bg-success-subtle border-success' :
            result.healthRisk === 'Moderado' ? 'bg-warning-subtle border-warning' :
              result.healthRisk === 'Alto' ? 'bg-warning-subtle border-warning' :
                'bg-destructive-subtle border-destructive'
            }`}>
            <AlertTriangle className={`h-5 w-5 ${result.healthRisk === 'Bajo' ? 'text-success' :
              result.healthRisk === 'Moderado' ? 'text-warning' :
                result.healthRisk === 'Alto' ? 'text-warning' :
                  'text-destructive'
              }`} />
            <AlertDescription className="ml-2">
              <strong>Categoría:</strong> {result.category} | <strong>Riesgo de salud:</strong> {result.healthRisk}
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Info className="w-5 h-5 mr-2 text-info" />
                Interpretación Clínica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{result.clinicalInterpretation}</p>
              <div className="mt-4 p-4 bg-info-subtle rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Implicaciones Metabólicas:</strong> {result.metabolicImplications}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Ruler className="w-5 h-5 mr-2 text-warning" />
                Recomendaciones Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-warning mr-2 flex-shrink-0">•</span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2 text-success" />
                  Rangos de Referencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Rango ideal para ti:</strong> {result.idealRange}
                </p>
                <p className="text-sm text-muted-foreground">{result.comparison}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                  Riesgo de Salud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`px-3 py-2 rounded-lg text-sm font-medium ${result.healthRisk === 'Bajo' ? 'bg-success-subtle text-foreground/90' :
                  result.healthRisk === 'Moderado' ? 'bg-warning-subtle text-foreground/90' :
                    result.healthRisk === 'Alto' ? 'bg-warning-subtle text-foreground/90' :
                      'bg-destructive-subtle text-foreground/90'
                  }`}>
                  {result.healthRisk}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}
