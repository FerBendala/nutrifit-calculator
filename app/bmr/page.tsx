"use client";

import dynamic from 'next/dynamic';
import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { NumberInput } from '@/components/NumberInput';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateBMR } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

// Lazy load componentes no críticos
const EmbedWidget = dynamic(() => import('@/components/EmbedWidget').then(mod => ({ default: mod.EmbedWidget })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" />,
});

const RelatedCalculators = dynamic(() => import('@/components/RelatedCalculators').then(mod => ({ default: mod.RelatedCalculators })), {
  loading: () => <div className="h-48 animate-pulse bg-gradient-to-r from-blue-50 to-green-50 rounded-lg" />,
});

const SocialShare = dynamic(() => import('@/components/SocialShare').then(mod => ({ default: mod.SocialShare })), {
  loading: () => <div className="h-24 animate-pulse bg-gray-100 rounded-lg" />,
});

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

export default function BMRPage() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    height: '',
    weight: '',
    bodyFat: '',
    useBodyFat: 'no'
  });

  const [result, setResult] = useState<BMRResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMRFormulas = (age: number, sex: 'male' | 'female', height: number, weight: number, bodyFat?: number) => {
    // Mifflin-St Jeor (más precisa)
    const mifflinStJeor = calculateBMR({ age, sex, height, weight });

    // Harris-Benedict revisada (1984)
    let harrisBenedict: number;
    if (sex === 'male') {
      harrisBenedict = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      harrisBenedict = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Katch-McArdle (si se proporciona grasa corporal)
    let katchMcArdle: number | undefined;
    if (bodyFat) {
      const leanBodyMass = weight * (1 - bodyFat / 100);
      katchMcArdle = 370 + (21.6 * leanBodyMass);
    }

    // Promedio (sin Katch-McArdle si no hay grasa corporal)
    const average = katchMcArdle
      ? (mifflinStJeor + harrisBenedict + katchMcArdle) / 3
      : (mifflinStJeor + harrisBenedict) / 2;

    // Niveles de actividad (para referencia)
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
  };

  const isFormValid = formData.age && formData.height && formData.weight;
  const jsonLd = generateJsonLd('bmr');

  return (
    <>
      <SchemaMarkup calculatorKey="bmr" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Metabolismo Basal (BMR)
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu metabolismo basal (BMR): las calorías que quemas en reposo absoluto.
              Usa 3 fórmulas científicas para descubrir cuánta energía necesita tu cuerpo para funcionar.
            </p>
          </header>

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
                    <div className="text-6xl font-bold text-red-600 dark:text-red-400 mb-[0.618rem]">
                      {result.average}
                    </div>
                    <div className="text-xl font-bold text-red-700 dark:text-red-300 mb-[0.382rem]">
                      calorías por día (kcal/día)
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Promedio de <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4535334/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">fórmulas científicas validadas</a>
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
                        <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                          Mifflin-St Jeor (Recomendada)
                        </h3>
                        <div className="text-right">
                          <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
                            {result.mifflinStJeor} kcal/día
                          </div>
                          <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                            ✓ Más precisa
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-[1.618]">
                        Considerada la ecuación más precisa para la población general. <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium"> Estudio original de Mifflin et al. (1990)</a> validada con error del ±10%.
                      </p>
                    </section>

                    <section className="card-golden">
                      <div className="flex justify-between items-center mb-[0.618rem]">
                        <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400">
                          Harris-Benedict (Revisada)
                        </h3>
                        <div className="text-right">
                          <div className="font-bold text-xl text-orange-600 dark:text-orange-400">
                            {result.harrisBenedict} kcal/día
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Clásica
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-[1.618]">
                        <a href="https://pubmed.ncbi.nlm.nih.gov/6865776/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Fórmula clásica revisada (Roza & Shizgal, 1984)</a>. Ampliamente utilizada pero menos precisa que Mifflin-St Jeor.
                      </p>
                    </section>

                    {result.katchMcArdle && (
                      <section className="card-golden">
                        <div className="flex justify-between items-center mb-[0.618rem]">
                          <h3 className="font-bold text-lg text-purple-600 dark:text-purple-400">
                            Katch-McArdle (Composición corporal)
                          </h3>
                          <div className="text-right">
                            <div className="font-bold text-xl text-purple-600 dark:text-purple-400">
                              {result.katchMcArdle} kcal/día
                            </div>
                            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                              ✓ Más precisa para atletas
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-[1.618]">
                          Basada en masa magra. <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Más precisa para atletas</a> con composición corporal conocida.
                        </p>
                      </section>
                    )}
                  </div>
                </div>
              </article>

              {/* Estimación de Calorías Diarias */}
              <article className="card-golden-lg shadow-golden-lg border-2 border-green-400/20">
                <header className="p-6 pb-0">
                  <h2 className="text-2xl font-semibold flex items-center justify-center">
                    <span className="text-3xl mr-3">⚡</span>
                    Estimación de Calorías Diarias Totales
                  </h2>
                </header>
                <div className="p-6">
                  <div className="card-golden bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400">
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
                          <span className="font-bold text-blue-600 dark:text-blue-400">{result.dailyCalories.light} kcal/día</span>
                        </div>
                        <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">🏃 Moderado (3-5 días/semana):</span>
                          <span className="font-bold text-green-600 dark:text-green-400">{result.dailyCalories.moderate} kcal/día</span>
                        </div>
                        <div className="flex justify-between items-center py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">💪 Intenso (6-7 días/semana):</span>
                          <span className="font-bold text-orange-600 dark:text-orange-400">{result.dailyCalories.intense} kcal/día</span>
                        </div>
                        <div className="flex justify-between items-center py-[0.382rem]">
                          <span className="font-medium">🔥 Muy intenso (2x/día, trabajo físico):</span>
                          <span className="font-bold text-red-600 dark:text-red-400">{result.dailyCalories.veryIntense} kcal/día</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[1.618rem] text-sm text-green-800 dark:text-green-200">
                      <p className="leading-[1.618]">
                        <strong>💡 Consejo:</strong> Para cálculos más precisos de calorías diarias,
                        usa nuestra <a href="/tdee/" className="text-blue-600 dark:text-blue-400 hover:underline">calculadora TDEE especializada</a>.
                        Luego planifica tus <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">macronutrientes completos</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu metabolismo basal (BMR)
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El BMR representa las calorías que tu cuerpo necesita en reposo absoluto para mantener
                funciones vitales como respiración, circulación y reparación celular.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🧬</span>
                  ¿Qué es el BMR?
                </h3>
                <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                  El BMR (Basal Metabolic Rate) es la cantidad mínima de energía que tu cuerpo necesita para mantener funciones vitales en reposo completo.
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><strong>60-70%</strong> de tu gasto calórico diario total</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span><strong>Funciones básicas:</strong> respiración, circulación, reparación celular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><strong>Medición:</strong> en ayunas, reposo, 12 horas sin comida</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  Factores que afectan tu BMR
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><strong>Masa muscular:</strong> Más músculo = mayor BMR</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong>Edad:</strong> Disminuye 2-3% cada década después de los 30</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">•</span>
                    <span><strong>Sexo:</strong> Los hombres tienen ~15% más BMR</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span><strong>Genética:</strong> Variación del ±15% entre individuos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><strong>Hormonas:</strong> Tiroides, cortisol, testosterona</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Comparación científica de fórmulas BMR
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <span className="text-lg mr-2">🥇</span>
                    Mifflin-St Jeor (1990)
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li>• <strong>Precisión:</strong> ±10% (la mejor)</li>
                    <li>• <strong>Población:</strong> General</li>
                    <li>• <strong>Validación:</strong> Múltiples estudios</li>
                    <li>• <strong>Uso:</strong> Recomendada por ADA</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-orange-700 dark:text-orange-300 flex items-center">
                    <span className="text-lg mr-2">🥈</span>
                    Harris-Benedict (1984)
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li>• <strong>Precisión:</strong> ±15%</li>
                    <li>• <strong>Población:</strong> General</li>
                    <li>• <strong>Validación:</strong> Clásica, ampliamente usada</li>
                    <li>• <strong>Limitación:</strong> Sobrestima en obesos</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-purple-700 dark:text-purple-300 flex items-center">
                    <span className="text-lg mr-2">🏆</span>
                    Katch-McArdle
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li>• <strong>Precisión:</strong> ±5% (atletas)</li>
                    <li>• <strong>Población:</strong> Atletas/conocen % grasa</li>
                    <li>• <strong>Validación:</strong> Basada en masa magra</li>
                    <li>• <strong>Ventaja:</strong> Más precisa con composición corporal</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-green-50 dark:bg-green-950/30 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Aplicaciones prácticas del BMR
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300">🎯 Para profesionales de la salud</h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-golden-xs">
                    <li>• Calcular necesidades calóricas basales</li>
                    <li>• Evaluar tasa metabólica en pacientes</li>
                    <li>• Detectar problemas metabólicos</li>
                    <li>• Monitorear efectos de tratamientos</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300">🏃 Para atletas y fitness</h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-golden-xs">
                    <li>• Base para calcular <a href="/tdee/" className="text-blue-600 dark:text-blue-400 hover:underline">TDEE total</a></li>
                    <li>• Planificar dietas de corte o volumen</li>
                    <li>• Optimizar <a href="/composicion/" className="text-blue-600 dark:text-blue-400 hover:underline">composición corporal</a></li>
                    <li>• Combinar con entrenamiento de <a href="/1rm/" className="text-blue-600 dark:text-blue-400 hover:underline">fuerza máxima</a></li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Limitaciones y consideraciones importantes
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Son estimaciones:</strong> La <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4535334/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">variación individual</a> puede ser del ±15-20%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Condiciones médicas:</strong> <a href="https://www.thyroid.org/thyroid-function-tests/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Hipotiroidismo</a>, diabetes pueden alterar el BMR</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Medicamentos:</strong> Algunos fármacos afectan el metabolismo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Dietas extremas:</strong> Pueden reducir el BMR hasta un 20%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Consulta profesional:</strong> Para casos específicos, consulta con un nutricionista</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre BMR</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre BMR y TDEE?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El BMR es tu metabolismo en reposo absoluto. El <a href="/tdee/" className="text-blue-600 dark:text-blue-400 hover:underline">TDEE</a> incluye
                    el BMR más las calorías quemadas por actividad física y digestión. El TDEE es lo que necesitas para mantener tu peso.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo aumentar mi BMR naturalmente?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, principalmente aumentando la <a href="/masa-muscular/" className="text-blue-600 dark:text-blue-400 hover:underline">masa muscular</a>.
                    El músculo quema más calorías en reposo que la grasa. El <a href="/1rm/" className="text-blue-600 dark:text-blue-400 hover:underline">entrenamiento de fuerza</a> es clave.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Es normal que mi BMR sea diferente al calculado?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, es completamente normal. Las fórmulas son estimaciones poblacionales. Tu BMR real puede variar
                    ±15-20% debido a genética, masa muscular, condiciones médicas y otros factores individuales.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-orange-50 dark:bg-orange-950/30 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Completa tu evaluación metabólica
              </h3>
              <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/peso-ajustado/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula tu Peso Ajustado:</a></strong> ABW para calorías y metabolismo más precisos en obesidad o bajo peso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/rmr/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula tu RMR práctico:</a></strong> Tasa metabólica en reposo sin condiciones estrictas de laboratorio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula tu TDEE completo:</a></strong> Añade actividad física a tu BMR para calorías diarias totales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Planifica tus macros:</a></strong> Distribuye tus calorías en proteínas, grasas y carbohidratos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/composicion/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Evalúa tu composición corporal:</a></strong> Para usar la fórmula Katch-McArdle más precisa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/masa-muscular/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Desarrolla masa muscular:</a></strong> Aumenta tu BMR con entrenamiento de fuerza</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/1rm/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Planifica entrenamientos de fuerza:</a></strong> Optimiza tu entrenamiento para maximizar el metabolismo</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/bmr" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora BMR Médica Profesional - Metabolismo Basal"
              url="https://nutrifit-calculator.com/bmr/"
              description="Calculadora científica de metabolismo basal con 3 fórmulas validadas. Precisión médica para profesionales de la salud. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="bmr" />
          </article>
        </main>
      </Container>
    </>
  );
}
