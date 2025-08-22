"use client";

import { ConditionalAdSlot } from '@/components/ConditionalAdSlot';
import { Container } from '@/components/Container';
import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMilliliters } from '@/lib/format';
import { calculateWaterNeeds } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function AguaPage() {
  const [formData, setFormData] = useState({
    weight: '',
    activityLevel: 'moderate'
  });

  const [result, setResult] = useState<{ min: number; max: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, activityLevel } = formData;

    if (!weight) return;

    const waterNeeds = calculateWaterNeeds(
      parseFloat(weight),
      activityLevel as 'low' | 'moderate' | 'high'
    );

    setResult(waterNeeds);
  };

  const isFormValid = formData.weight;
  const jsonLd = generateJsonLd('agua');

  const getGlassesCount = (ml: number) => Math.round(ml / 250); // Assuming 250ml per glass

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
              Calculadora de Agua Diaria
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula cuánta agua debes beber al día según tu peso y nivel de actividad
              para mantener una hidratación óptima.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Hidratación</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
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

                  <SelectInput
                    id="activityLevel"
                    label="Nivel de actividad/clima"
                    value={formData.activityLevel}
                    onChange={handleInputChange('activityLevel')}
                    options={[
                      { value: 'low', label: 'Baja (sedentario, clima templado)' },
                      { value: 'moderate', label: 'Moderada (ejercicio regular)' },
                      { value: 'high', label: 'Alta (ejercicio intenso/calor)' }
                    ]}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full md:w-auto"
                >
                  Calcular necesidades de agua
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Tus Necesidades de Hidratación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-6 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {formatMilliliters(result.min)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Mínimo diario
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ≈ {getGlassesCount(result.min)} vasos
                      </div>
                    </div>

                    <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                      <div className="text-2xl font-bold">
                        {formatMilliliters(result.max)}
                      </div>
                      <div className="text-sm opacity-90 mt-1">
                        Óptimo diario
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        ≈ {getGlassesCount(result.max)} vasos
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                    <h4 className="font-semibold mb-2">💧 Consejos de hidratación</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Bebe agua de forma constante a lo largo del día</li>
                      <li>• Aumenta la ingesta durante ejercicio intenso o clima caluroso</li>
                      <li>• Incluye también líquidos de frutas, verduras y otras bebidas</li>
                      <li>• El color de la orina es un buen indicador de hidratación</li>
                      <li>• Ajusta según tu sed y condiciones individuales</li>
                    </ul>
                  </div>
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
              Importancia de la hidratación adecuada
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">💪 Funciones vitales</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Regulación de temperatura corporal</li>
                  <li>• Transporte de nutrientes y oxígeno</li>
                  <li>• Eliminación de desechos metabólicos</li>
                  <li>• Lubricación de articulaciones</li>
                  <li>• Mantenimiento de la presión arterial</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">⚠️ Signos de deshidratación</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sed, boca seca</li>
                  <li>• Orina oscura o escasa</li>
                  <li>• Fatiga, mareos</li>
                  <li>• Dolor de cabeza</li>
                  <li>• Piel seca o poco elástica</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                🎯 Factores que aumentan las necesidades
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ejercicio físico intenso (+500-750ml por hora)</li>
                <li>• Clima caluroso o seco</li>
                <li>• Altitudes elevadas</li>
                <li>• Fiebre o enfermedades</li>
                <li>• Embarazo y lactancia</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}