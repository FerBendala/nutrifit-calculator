"use client";

import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCalories } from '@/lib/format';
import { ACTIVITY_LEVELS, calculateBMR, calculateTDEE, UserData } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function TDEEPage() {
  const [formData, setFormData] = useState({
    sex: 'male',
    age: '',
    height: '',
    weight: '',
    activityLevel: ''
  });

  const [result, setResult] = useState<{ bmr: number; tdee: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { age, height, weight, activityLevel } = formData;

    if (!age || !height || !weight || !activityLevel) return;

    const userData: UserData = {
      sex: formData.sex as 'male' | 'female',
      age: parseInt(age),
      height: parseInt(height),
      weight: parseFloat(weight)
    };

    const bmr = calculateBMR(userData);
    const tdee = calculateTDEE(bmr, parseFloat(activityLevel));

    setResult({ bmr, tdee });
  };

  const isFormValid = formData.age && formData.height && formData.weight && formData.activityLevel;
  const jsonLd = generateJsonLd('tdee');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Calculadora TDEE
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula tu TDEE (Total Daily Energy Expenditure) - el total de calorías
              que quemas en un día incluyendo tu actividad física.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora TDEE</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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
                    min={15}
                    max={100}
                    unit="años"
                    placeholder="25"
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
                </div>

                <SelectInput
                  id="activityLevel"
                  label="Nivel de actividad física"
                  value={formData.activityLevel}
                  onChange={handleInputChange('activityLevel')}
                  options={ACTIVITY_LEVELS.map(level => ({
                    value: level.value,
                    label: level.label
                  }))}
                  placeholder="Selecciona tu nivel de actividad"
                  required
                />

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full md:w-auto"
                >
                  Calcular TDEE
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Tus Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-6 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {formatCalories(Math.round(result.bmr))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      BMR (Metabolismo Basal)
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Calorías que quemas en reposo
                    </p>
                  </div>

                  <div className="text-center p-6 bg-primary text-primary-foreground rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCalories(Math.round(result.tdee))}
                    </div>
                    <div className="text-sm opacity-90 mt-1">
                      TDEE (Gasto Total Diario)
                    </div>
                    <p className="text-xs opacity-80 mt-2">
                      Calorías totales que quemas al día
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Qué significan estos números?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>BMR:</strong> Calorías necesarias para funciones vitales (respirar, circular sangre, etc.)</li>
                    <li>• <strong>TDEE:</strong> BMR + calorías de actividad física y termogénesis</li>
                    <li>• Para mantener tu peso, consume aproximadamente tu TDEE en calorías</li>
                    <li>• Para perder peso, consume menos de tu TDEE (déficit calórico)</li>
                    <li>• Para ganar peso, consume más de tu TDEE (superávit calórico)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AdSlot después del contenido principal */}
          <ConditionalAdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
            requireInteraction={true}
            requireElement="[class*='result']"
          />

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-4">
              Entendiendo tu TDEE
            </h2>

            <p className="text-muted-foreground mb-4">
              El TDEE (Total Daily Energy Expenditure) representa la cantidad total de energía
              que tu cuerpo gasta en un día completo. Se compone de varios factores:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">🔥 Componentes del TDEE</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>BMR (60-70%):</strong> Metabolismo basal</li>
                  <li>• <strong>TEF (8-15%):</strong> Termogénesis de alimentos</li>
                  <li>• <strong>EAT (15-30%):</strong> Actividad física planificada</li>
                  <li>• <strong>NEAT (15-30%):</strong> Actividades no ejercicio</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">📊 Factores que influyen</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Edad, sexo, altura y peso</li>
                  <li>• Composición corporal (músculo vs grasa)</li>
                  <li>• Nivel de actividad física</li>
                  <li>• Genética y hormonas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}