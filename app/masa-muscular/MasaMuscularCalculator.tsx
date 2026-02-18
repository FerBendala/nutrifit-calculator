"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateMuscleMass, type MuscleMassResult } from '@/lib/formulas';
import { Info } from 'lucide-react';
import { useState } from 'react';

export function MasaMuscularCalculator() {
  const [formData, setFormData] = useState({
    sex: 'male' as 'male' | 'female',
    age: '',
    height: '',
    weight: '',
    bodyFatPercentage: ''
  });

  const [result, setResult] = useState<MuscleMassResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, age, height, weight, bodyFatPercentage } = formData;

    if (!age || !height || !weight || !bodyFatPercentage) return;

    const muscleMassResult = calculateMuscleMass(
      sex,
      parseInt(age),
      parseInt(height),
      parseInt(weight),
      parseFloat(bodyFatPercentage)
    );
    setResult(muscleMassResult);
  };

  const isFormValid = () => {
    const { age, height, weight, bodyFatPercentage } = formData;
    return age && height && weight && bodyFatPercentage;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Excelente': return 'text-foreground bg-success-subtle border-success';
      case 'Bueno': return 'text-foreground bg-info-subtle border-info';
      case 'Promedio': return 'text-foreground bg-warning-subtle border-warning';
      case 'Bajo': return 'text-foreground bg-destructive-subtle border-destructive';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de masa muscular">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Calculadora de Masa Muscular
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
                  required
                />

                <NumberInput
                  id="age"
                  label="Edad"
                  value={formData.age}
                  onChange={handleInputChange('age')}
                  min={16}
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
                  min={120}
                  max={220}
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
                  max={200}
                  unit="kg"
                  placeholder="70"
                  required
                />

                <div className="md:col-span-2">
                  <NumberInput
                    id="bodyFatPercentage"
                    label="Porcentaje de Grasa Corporal"
                    value={formData.bodyFatPercentage}
                    onChange={handleInputChange('bodyFatPercentage')}
                    min={3}
                    max={50}
                    unit="%"
                    placeholder="15"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    💡 <strong>¿No conoces tu porcentaje de grasa?</strong> Usa nuestra
                    <a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden ml-1">
                      calculadora de grasa corporal
                    </a> con métodos científicos de pliegues cutáneos para obtenerlo de forma precisa.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid()}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                💪 Calcular masa muscular
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
        <header className="p-6 pb-0">
          <h2 className="text-xl font-semibold text-foreground/90 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            ¿Cómo obtener tu porcentaje de grasa corporal?
          </h2>
        </header>
        <div className="p-6">
          <p className="text-foreground/90 mb-4">
            Para calcular tu masa muscular de forma precisa, necesitas conocer tu porcentaje de grasa corporal.
            Te ofrecemos varias opciones:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="card-golden bg-card/50">
              <h3 className="font-semibold text-warning mb-2 flex items-center">
                <span className="text-lg mr-2">📏</span>
                Método más preciso
              </h3>
              <p className="text-sm text-foreground/90 mb-3">
                Usa nuestra <a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">calculadora de grasa corporal</a> con métodos científicos de pliegues cutáneos (Jackson-Pollock, Durnin-Womersley).
              </p>
              <ul className="text-xs text-warning space-y-1">
                <li>• Precisión de ±3-5%</li>
                <li>• Métodos validados científicamente</li>
                <li>• Solo necesitas un calibrador de pliegues</li>
              </ul>
            </article>
            <article className="card-golden bg-card/50">
              <h3 className="font-semibold text-warning mb-2 flex items-center">
                <span className="text-lg mr-2">📐</span>
                Método alternativo
              </h3>
              <p className="text-sm text-foreground/90 mb-3">
                Usa nuestra <a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">calculadora de composición corporal</a> con el método Navy (circunferencias corporales).
              </p>
              <ul className="text-xs text-warning space-y-1">
                <li>• Precisión de ±3-4%</li>
                <li>• Solo necesitas una cinta métrica</li>
                <li>• Método rápido y fácil</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-bold text-center text-foreground">
              Resultados de Masa Muscular
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              {/* Main Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <article className="text-center p-6 bg-info-subtle rounded-lg border-l-4 border-info">
                  <div className="text-3xl font-bold text-info mb-2">
                    {result.muscleMass} kg
                  </div>
                  <div className="text-sm font-medium text-foreground/90">Masa Muscular</div>
                </article>

                <article className="text-center p-6 bg-success-subtle rounded-lg border-l-4 border-success">
                  <div className="text-3xl font-bold text-success mb-2">
                    {result.muscleMassIndex}
                  </div>
                  <div className="text-sm font-medium text-foreground/90">Índice de Masa Muscular</div>
                </article>

                <article className="text-center p-6 bg-warning-subtle rounded-lg border-l-4 border-warning">
                  <div className="text-3xl font-bold text-warning mb-2">
                    {result.muscleMassPercentage}%
                  </div>
                  <div className="text-sm font-medium text-foreground">% Masa Muscular</div>
                </article>

                <article className={`text-center p-6 rounded-lg border-l-4 ${getCategoryColor(result.muscleMassCategory)}`}>
                  <div className="text-3xl font-bold mb-2">
                    {result.muscleMassCategory}
                  </div>
                  <div className="text-sm font-medium">Categoría</div>
                </article>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      Composición Corporal
                    </h3>
                  </header>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Masa Muscular:</span>
                        <span className="font-semibold">{result.muscleMass} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Masa Libre de Grasa:</span>
                        <span className="font-semibold">{result.fatFreeMass} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Masa Magra:</span>
                        <span className="font-semibold">{result.leanBodyMass} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Masa Esquelética:</span>
                        <span className="font-semibold">{result.skeletalMuscleMass} kg</span>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      Recomendaciones
                    </h3>
                  </header>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-foreground mb-1">Estado Actual:</div>
                        <div className="text-sm text-muted-foreground">{result.recommendations.current}</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">Objetivo Ideal:</div>
                        <div className="text-sm text-muted-foreground">{result.recommendations.ideal}</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">Entrenamiento:</div>
                        <div className="text-sm text-muted-foreground">{result.recommendations.training}</div>
                      </div>
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
