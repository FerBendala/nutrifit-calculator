"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeFFMI, calculateFFMI, calculateFFMIFromComposition, calculateNormalizedFFMI } from '@/lib/formulas';
import { Calculator, Dumbbell, Info, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { useState } from 'react';

interface FFMIResult {
  method: string;
  ffmi?: number;
  normalizedFFMI?: number;
  leanBodyMass?: number;
  category: string;
  muscleDevelopment: string;
  athleticPotential: string;
  geneticLimit: number;
  recommendations: string[];
  comparison: string;
  healthImplications: string;
  trainingFocus: string;
}

export function FFMICalculator() {
  const [activeTab, setActiveTab] = useState('lean-mass');
  const [formData, setFormData] = useState({
    leanMassGender: 'male',
    leanMassLBM: '',
    leanMassHeight: '',
    compositionGender: 'male',
    compositionWeight: '',
    compositionBodyFat: '',
    compositionHeight: '',
    advancedGender: 'male',
    advancedAge: '',
    advancedLBM: '',
    advancedHeight: ''
  });

  const [result, setResult] = useState<FFMIResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let analysis: any;
      let method: string;

      switch (activeTab) {
        case 'lean-mass':
          const leanMassGender = formData.leanMassGender as 'male' | 'female';
          const leanMassLBM = parseFloat(formData.leanMassLBM);
          const leanMassHeight = parseFloat(formData.leanMassHeight);

          const ffmi = calculateFFMI(leanMassLBM, leanMassHeight);
          const normalizedFFMI = calculateNormalizedFFMI(ffmi, leanMassHeight);
          analysis = analyzeFFMI(leanMassLBM, leanMassHeight, leanMassGender);
          method = 'Masa Libre de Grasa Conocida';
          break;

        case 'composition':
          const compositionGender = formData.compositionGender as 'male' | 'female';
          const compositionWeight = parseFloat(formData.compositionWeight);
          const compositionBodyFat = parseFloat(formData.compositionBodyFat);
          const compositionHeight = parseFloat(formData.compositionHeight);

          const compositionResult = calculateFFMIFromComposition(
            compositionWeight,
            compositionBodyFat,
            compositionHeight,
            compositionGender
          );
          analysis = compositionResult.analysis;
          method = 'Composición Corporal Completa';
          break;

        case 'advanced':
          const advancedGender = formData.advancedGender as 'male' | 'female';
          const advancedAge = parseInt(formData.advancedAge);
          const advancedLBM = parseFloat(formData.advancedLBM);
          const advancedHeight = parseFloat(formData.advancedHeight);

          analysis = analyzeFFMI(advancedLBM, advancedHeight, advancedGender, advancedAge);
          method = 'Análisis Avanzado con Edad';
          break;

        default:
          throw new Error('Método no válido');
      }

      setResult({
        method,
        ffmi: analysis.ffmi,
        normalizedFFMI: analysis.normalizedFFMI,
        leanBodyMass: analysis.leanBodyMass,
        category: analysis.category,
        muscleDevelopment: analysis.muscleDevelopment,
        athleticPotential: analysis.athleticPotential,
        geneticLimit: analysis.geneticLimit,
        recommendations: analysis.recommendations,
        comparison: analysis.comparison,
        healthImplications: analysis.healthImplications,
        trainingFocus: analysis.trainingFocus
      });

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const isFormValid = () => {
    switch (activeTab) {
      case 'lean-mass':
        return formData.leanMassGender && formData.leanMassLBM && formData.leanMassHeight;
      case 'composition':
        return formData.compositionGender && formData.compositionWeight && formData.compositionBodyFat && formData.compositionHeight;
      case 'advanced':
        return formData.advancedGender && formData.advancedAge && formData.advancedLBM && formData.advancedHeight;
      default:
        return false;
    }
  };

  const getCategoryColor = (category: string) => {
    if (category.includes('Excelente')) return 'text-foreground bg-success-subtle border-success';
    if (category.includes('Muy bueno')) return 'text-foreground bg-info-subtle border-info';
    if (category.includes('Bueno')) return 'text-muted-foreground bg-warning-subtle border-warning';
    if (category.includes('Promedio')) return 'text-foreground bg-warning-subtle border-warning';
    return 'text-foreground bg-destructive-subtle border-destructive';
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de FFMI">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Calculadora de FFMI
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Elige el método según tus datos disponibles para evaluar tu desarrollo muscular
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="relative z-10 grid w-full grid-cols-1 md:grid-cols-3 gap-2 mb-6 md:mb-0 h-auto md:h-10">
                <TabsTrigger value="lean-mass">Masa Libre Conocida</TabsTrigger>
                <TabsTrigger value="composition">Composición Corporal</TabsTrigger>
                <TabsTrigger value="advanced">Análisis Avanzado</TabsTrigger>
              </TabsList>

              <TabsContent value="lean-mass" className="space-golden-sm">
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground/90 mb-1">Masa Libre de Grasa Conocida</h3>
                        <p className="text-sm text-info">
                          Método directo para quienes conocen su masa libre de grasa (sin grasa corporal).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="leanMassGender"
                      label="Sexo"
                      value={formData.leanMassGender}
                      onChange={(value) => handleInputChange('leanMassGender', value)}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="leanMassLBM"
                      label="Masa libre de grasa"
                      value={formData.leanMassLBM}
                      onChange={(value) => handleInputChange('leanMassLBM', value)}
                      placeholder="65"
                      unit="kg"
                      min={30}
                      max={150}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="leanMassHeight"
                      label="Altura"
                      value={formData.leanMassHeight}
                      onChange={(value) => handleInputChange('leanMassHeight', value)}
                      placeholder="170"
                      unit="cm"
                      min={120}
                      max={220}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular FFMI Básico
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="composition" className="space-golden-sm">
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-success-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground/90 mb-1">Composición Corporal Completa</h3>
                        <p className="text-sm text-success">
                          Método que calcula masa libre de grasa a partir de peso total y porcentaje de grasa.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="compositionGender"
                      label="Sexo"
                      value={formData.compositionGender}
                      onChange={(value) => handleInputChange('compositionGender', value)}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="compositionWeight"
                      label="Peso corporal"
                      value={formData.compositionWeight}
                      onChange={(value) => handleInputChange('compositionWeight', value)}
                      placeholder="75"
                      unit="kg"
                      min={30}
                      max={200}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="compositionBodyFat"
                      label="Porcentaje de grasa corporal"
                      value={formData.compositionBodyFat}
                      onChange={(value) => handleInputChange('compositionBodyFat', value)}
                      placeholder="15"
                      unit="%"
                      min={3}
                      max={50}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="compositionHeight"
                      label="Altura"
                      value={formData.compositionHeight}
                      onChange={(value) => handleInputChange('compositionHeight', value)}
                      placeholder="170"
                      unit="cm"
                      min={120}
                      max={220}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular FFMI por Composición
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="advanced" className="space-golden-sm">
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-warning-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Análisis Avanzado con Edad</h3>
                        <p className="text-sm text-warning">
                          Método completo que incluye edad para estimar límites genéticos y potencial muscular.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="advancedGender"
                      label="Sexo"
                      value={formData.advancedGender}
                      onChange={(value) => handleInputChange('advancedGender', value)}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="advancedAge"
                      label="Edad"
                      value={formData.advancedAge}
                      onChange={(value) => handleInputChange('advancedAge', value)}
                      placeholder="25"
                      unit="años"
                      min={16}
                      max={80}
                      required
                    />

                    <NumberInput
                      id="advancedLBM"
                      label="Masa libre de grasa"
                      value={formData.advancedLBM}
                      onChange={(value) => handleInputChange('advancedLBM', value)}
                      placeholder="65"
                      unit="kg"
                      min={30}
                      max={150}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="advancedHeight"
                      label="Altura"
                      value={formData.advancedHeight}
                      onChange={(value) => handleInputChange('advancedHeight', value)}
                      placeholder="170"
                      unit="cm"
                      min={120}
                      max={220}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular Análisis Avanzado
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-bold text-center text-foreground">
              Resultados FFMI - {result.method}
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="text-center p-6 bg-info-subtle rounded-lg border-l-4 border-info">
                  <div className="text-3xl font-bold text-info mb-2">
                    {result.ffmi?.toFixed(2)}
                  </div>
                  <div className="text-sm font-medium text-foreground/90">FFMI</div>
                </article>

                <article className="text-center p-6 bg-success-subtle rounded-lg border-l-4 border-success">
                  <div className="text-3xl font-bold text-success mb-2">
                    {result.normalizedFFMI?.toFixed(2)}
                  </div>
                  <div className="text-sm font-medium text-foreground/90">FFMI Normalizado</div>
                </article>

                <article className={`text-center p-6 rounded-lg border-l-4 ${getCategoryColor(result.category)}`}>
                  <div className="text-3xl font-bold mb-2">
                    <Dumbbell className="h-8 w-8 mx-auto" />
                  </div>
                  <div className="text-sm font-medium">{result.category}</div>
                </article>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Target className="h-5 w-5 mr-2 text-info" />
                      Límite Genético Estimado
                    </h3>
                  </header>
                  <div className="p-6">
                    <div className="text-2xl font-bold text-info mb-2">
                      {result.geneticLimit.toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      Tu potencial máximo estimado basado en genética y edad
                    </p>
                  </div>
                </article>

                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      Progreso Actual
                    </h3>
                  </header>
                  <div className="p-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Actual:</span>
                        <span className="text-sm font-medium">{result.normalizedFFMI?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Límite:</span>
                        <span className="text-sm font-medium">{result.geneticLimit.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-info h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, (result.normalizedFFMI! / result.geneticLimit) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-success" />
                      Desarrollo Muscular
                    </h3>
                  </header>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-[1.618] mb-4">
                      <strong>{result.muscleDevelopment}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      {result.athleticPotential}
                    </p>
                  </div>
                </article>

                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-warning" />
                      Enfoque de Entrenamiento
                    </h3>
                  </header>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      {result.trainingFocus}
                    </p>
                  </div>
                </article>
              </div>

              <article className="card-golden-lg bg-info-subtle border-l-4 border-info">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Implicaciones para la Salud
                  </h3>
                </header>
                <div className="p-6">
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    {result.healthImplications}
                  </p>
                  <p className="text-sm text-info leading-relaxed">
                    {result.comparison}
                  </p>
                </div>
              </article>

              <article className="card-golden bg-card/50">
                <header className="p-6 pb-0">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Users className="h-5 w-5 mr-2 text-warning" />
                    Recomendaciones Personalizadas
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-1 flex-shrink-0"></span>
                        <span className="text-sm text-muted-foreground leading-[1.618]">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
