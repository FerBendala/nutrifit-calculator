"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateBMR } from '@/lib/formulas';
import { useLastResult } from '@/lib/useLastResult';
import { useEffect, useState } from 'react';

interface BMRResult {
  mifflinStJeor: number;
  harrisBenedict: number;
  katchMcArdle?: number;
  average: number;
  recommended: string;
  formula: string;
  dailyCalories: {
    sedentary: number;
    light: number;
    moderate: number;
    intense: number;
    veryIntense: number;
  };
}

export default function BMRCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    height: '',
    weight: '',
    bodyFat: '',
    useBodyFat: 'no'
  });

  const [result, setResult] = useState<BMRResult | null>(null);
  const { save, load } = useLastResult<BMRResult>('bmr');
  const [lastSaved, setLastSaved] = useState<{ result: BMRResult; timestamp: number } | null>(null);

  useEffect(() => {
    const previous = load();
    if (previous) setLastSaved(previous);
  }, [load]);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMRFormulas = (age: number, sex: 'male' | 'female', height: number, weight: number, bodyFat?: number) => {
    const mifflinStJeor = calculateBMR({ age, sex, height, weight });

    let harrisBenedict: number;
    if (sex === 'male') {
      harrisBenedict = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      harrisBenedict = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    let katchMcArdle: number | undefined;
    if (bodyFat) {
      const leanBodyMass = weight * (1 - bodyFat / 100);
      katchMcArdle = 370 + (21.6 * leanBodyMass);
    }

    const average = katchMcArdle
      ? (mifflinStJeor + harrisBenedict + katchMcArdle) / 3
      : (mifflinStJeor + harrisBenedict) / 2;

    const dailyCalories = {
      sedentary: Math.round(average * 1.2),
      light: Math.round(average * 1.375),
      moderate: Math.round(average * 1.55),
      intense: Math.round(average * 1.725),
      veryIntense: Math.round(average * 1.9)
    };

    return {
      mifflinStJeor: Math.round(mifflinStJeor),
      harrisBenedict: Math.round(harrisBenedict),
      katchMcArdle: katchMcArdle ? Math.round(katchMcArdle) : undefined,
      average: Math.round(average),
      recommended: 'Mifflin-St Jeor',
      formula: 'La fórmula Mifflin-St Jeor es considerada la más precisa para la población general',
      dailyCalories
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { age, sex, height, weight, bodyFat, useBodyFat } = formData;
    if (!age || !height || !weight) return;

    const bodyFatNumber = useBodyFat === 'yes' && bodyFat ? parseFloat(bodyFat) : undefined;

    const results = calculateBMRFormulas(
      parseInt(age),
      sex as 'male' | 'female',
      parseFloat(height),
      parseFloat(weight),
      bodyFatNumber
    );

    setResult(results);
    save(results);
  };

  const isFormValid = formData.age && formData.height && formData.weight;

  return (
    <>
      {lastSaved && !result && (
        <div className="card-golden bg-muted/30 text-sm text-muted-foreground">
          Tu ultimo resultado: <strong className="text-foreground">BMR {Math.round(lastSaved.result.average)} kcal</strong> ({lastSaved.result.recommended}) - {new Date(lastSaved.timestamp).toLocaleDateString('es-ES')}
        </div>
      )}

      <section id="calculator" aria-label="Calculadora de metabolismo basal">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-3">🔥</span>
              Calculadora de BMR (Metabolismo Basal)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
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
                  id="height"
                  label="Estatura"
                  value={formData.height}
                  onChange={handleInputChange('height')}
                  min={140}
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
              </div>

              <SelectInput
                id="useBodyFat"
                label="¿Conoces tu porcentaje de grasa corporal?"
                value={formData.useBodyFat}
                onChange={handleInputChange('useBodyFat')}
                options={[
                  { value: 'no', label: 'No (recomendado para la mayoría)' },
                  { value: 'yes', label: 'Sí (para mayor precisión)' }
                ]}
                required
              />

              {formData.useBodyFat === 'yes' && (
                <NumberInput
                  id="bodyFat"
                  label="Porcentaje de grasa corporal"
                  value={formData.bodyFat}
                  onChange={handleInputChange('bodyFat')}
                  min={5}
                  max={50}
                  unit="%"
                  placeholder="15"
                />
              )}

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                🔥 Calcular Metabolismo Basal
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="space-golden-md">
          {/* Resultado Principal BMR */}
          <article className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">🔥</span>
                Tu Metabolismo Basal (BMR)
              </h2>
            </header>
            <div className="p-6">
              <div className="text-center space-golden-sm">
                <div className="text-6xl font-bold text-destructive mb-[0.618rem]">
                  {result.average}
                </div>
                <div className="text-xl font-bold text-destructive mb-[0.382rem]">
                  calorías por día (kcal/día)
                </div>
                <div className="text-lg text-muted-foreground">
                  Promedio de <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4535334/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline font-medium transition-colors">fórmulas científicas validadas</a>
                </div>
                <div className="text-sm text-muted-foreground mt-[0.618rem]">
                  Calorías que tu cuerpo necesita en reposo absoluto
                </div>
              </div>
            </div>
          </article>

          {/* Comparación de Fórmulas */}
          <article className="card-golden-lg shadow-golden-lg">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">⚖️</span>
                Comparación de Fórmulas Científicas
              </h2>
            </header>
            <div className="p-6">
              <div className="space-golden-md">
                <section className="card-golden">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-info">
                      Mifflin-St Jeor (Recomendada)
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-info">
                        {result.mifflinStJeor} kcal/día
                      </div>
                      <div className="text-sm text-success font-medium">
                        ✓ Más precisa
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Considerada la ecuación más precisa para la población general. <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline font-medium transition-colors"> Estudio original de Mifflin et al. (1990)</a> validada con error del ±10%.
                  </p>
                </section>

                <section className="card-golden">
                  <div className="flex justify-between items-center mb-[0.618rem]">
                    <h3 className="font-bold text-lg text-warning">
                      Harris-Benedict (Revisada)
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-xl text-warning">
                        {result.harrisBenedict} kcal/día
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Clásica
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <a href="https://pubmed.ncbi.nlm.nih.gov/6865776/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline font-medium transition-colors">Fórmula clásica revisada (Roza & Shizgal, 1984)</a>. Ampliamente utilizada pero menos precisa que Mifflin-St Jeor.
                  </p>
                </section>

                {result.katchMcArdle && (
                  <section className="card-golden">
                    <div className="flex justify-between items-center mb-[0.618rem]">
                      <h3 className="font-bold text-lg text-warning">
                        Katch-McArdle (Composición corporal)
                      </h3>
                      <div className="text-right">
                        <div className="font-bold text-xl text-warning">
                          {result.katchMcArdle} kcal/día
                        </div>
                        <div className="text-sm text-success font-medium">
                          ✓ Más precisa para atletas
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      Basada en masa magra. <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline font-medium transition-colors">Más precisa para atletas</a> con composición corporal conocida.
                    </p>
                  </section>
                )}
              </div>
            </div>
          </article>

          {/* Estimación de Calorías Diarias */}
          <article className="card-golden-lg shadow-golden-lg border-2 border-success/20">
            <header className="p-6 pb-0">
              <h2 className="text-2xl font-semibold flex items-center justify-center">
                <span className="text-3xl mr-3">⚡</span>
                Estimación de Calorías Diarias Totales
              </h2>
            </header>
            <div className="p-6">
              <div className="card-golden bg-success-subtle border-l-4 border-success">
                <div className="space-golden-sm">
                  <p className="text-center text-muted-foreground mb-[1.618rem]">
                    Multiplica tu BMR por tu nivel de actividad para obtener tus calorías diarias totales (TDEE)
                  </p>
                  <div className="grid gap-[0.618rem] text-sm">
                    <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">🪑 Sedentario (sin ejercicio):</span>
                      <span className="font-bold text-muted-foreground">{result.dailyCalories.sedentary} kcal/día</span>
                    </div>
                    <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">🚶 Ligero (1-3 días/semana):</span>
                      <span className="font-bold text-info">{result.dailyCalories.light} kcal/día</span>
                    </div>
                    <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">🏃 Moderado (3-5 días/semana):</span>
                      <span className="font-bold text-success">{result.dailyCalories.moderate} kcal/día</span>
                    </div>
                    <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                      <span className="font-medium">💪 Intenso (6-7 días/semana):</span>
                      <span className="font-bold text-warning">{result.dailyCalories.intense} kcal/día</span>
                    </div>
                    <div className="flex justify-between items-center py-[0.382rem]">
                      <span className="font-medium">🔥 Muy intenso (2x/día, trabajo físico):</span>
                      <span className="font-bold text-destructive">{result.dailyCalories.veryIntense} kcal/día</span>
                    </div>
                  </div>
                </div>
                <div className="mt-[1.618rem] text-sm text-foreground/90">
                  <p className="leading-[1.618]">
                    <strong>💡 Consejo:</strong> Para cálculos más precisos de calorías diarias,
                    usa nuestra <a href="/tdee/" className="text-info hover:underline transition-colors">calculadora TDEE especializada</a>.
                    Luego planifica tus <a href="/" className="text-info hover:underline transition-colors">macronutrientes completos</a>.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
}
