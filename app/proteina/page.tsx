"use client";

import { AdSlot } from '@/components/AdSlot';
import { Container } from '@/components/Container';
import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { calculateProteinNeeds } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function ProteinaPage() {
  const [formData, setFormData] = useState({
    weight: '',
    goal: 'active',
    bodyFatPercentage: ''
  });

  const [result, setResult] = useState<{ min: number; max: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, goal } = formData;

    if (!weight) return;

    const bodyFat = formData.bodyFatPercentage ? parseFloat(formData.bodyFatPercentage) : undefined;
    const proteinNeeds = calculateProteinNeeds(
      parseFloat(weight),
      goal as 'sedentary' | 'active' | 'athlete',
      bodyFat
    );

    setResult(proteinNeeds);
  };

  const isFormValid = formData.weight;
  const jsonLd = generateJsonLd('proteina');

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
              Calculadora de Proteína Diaria
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula tus necesidades diarias de proteína según tu peso, objetivo
              y nivel de actividad física basado en evidencia científica.
            </p>
          </div>

          <AdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
          />

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Proteína</CardTitle>
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
                    id="goal"
                    label="Objetivo/Actividad"
                    value={formData.goal}
                    onChange={handleInputChange('goal')}
                    options={[
                      { value: 'sedentary', label: 'Sedentario (mínima actividad)' },
                      { value: 'active', label: 'Activo (ejercicio regular)' },
                      { value: 'athlete', label: 'Atleta (entrenamiento intenso)' }
                    ]}
                    required
                  />
                </div>

                <NumberInput
                  id="bodyFatPercentage"
                  label="Porcentaje de grasa corporal (opcional)"
                  value={formData.bodyFatPercentage}
                  onChange={handleInputChange('bodyFatPercentage')}
                  min={5}
                  max={50}
                  step={0.1}
                  unit="%"
                  placeholder="15.0"
                />

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full md:w-auto"
                >
                  Calcular necesidades de proteína
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Tus Necesidades de Proteína</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-6 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {formatGrams(result.min)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Mínimo diario
                      </div>
                    </div>

                    <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                      <div className="text-2xl font-bold">
                        {formatGrams(result.max)}
                      </div>
                      <div className="text-sm opacity-90 mt-1">
                        Óptimo diario
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg text-left">
                    <h4 className="font-semibold mb-2">💡 Recomendaciones</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consume entre {formatGrams(result.min)} y {formatGrams(result.max)} de proteína al día</li>
                      <li>• Distribuye la ingesta a lo largo del día (20-30g por comida)</li>
                      <li>• Combina fuentes de proteína completas (animales) e incompletas (vegetales)</li>
                      <li>• Ajusta según tu respuesta individual y resultados</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AdSlot comentado hasta tener slots reales */}
          {/* <AdSlot 
            adSlot="8901234567"
            style={{ display: 'block', height: '250px' }}
            className="w-full"
          /> */}

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-4">
              ¿Por qué es importante la proteína?
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">🏗️ Funciones principales</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Construcción y reparación muscular</li>
                  <li>• Producción de enzimas y hormonas</li>
                  <li>• Mantenimiento del sistema inmune</li>
                  <li>• Transporte de nutrientes</li>
                  <li>• Control del apetito y saciedad</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">🥩 Fuentes de proteína</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Animales:</strong> Carnes, pescado, huevos, lácteos</li>
                  <li>• <strong>Vegetales:</strong> Legumbres, frutos secos, quinoa</li>
                  <li>• <strong>Suplementos:</strong> Proteína en polvo (si es necesario)</li>
                  <li>• Combinar fuentes para perfil de aminoácidos completo</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mt-6">
              <h3 className="font-semibold text-green-900 mb-2">
                🎯 Timing y distribución
              </h3>
              <p className="text-sm text-green-800">
                Estudios sugieren que distribuir la proteína en 20-40g por comida optimiza
                la síntesis proteica muscular. El timing post-entreno es menos crítico
                si tu ingesta diaria total es adecuada.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}