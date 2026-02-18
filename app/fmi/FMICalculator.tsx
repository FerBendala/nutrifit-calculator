"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeFMI, calculateComprehensiveFMI } from '@/lib/formulas';
import { AlertTriangle, Calculator, Info, Scale, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

interface FMIResult {
  method: string;
  fmi?: number;
  bodyFatPercentage?: number;
  fatMass?: number;
  leanBodyMass?: number;
  category: string;
  healthRisk: string;
  metabolicRisk: string;
  cardiovascularRisk: string;
  recommendations: string[];
  comparison: string;
  idealRange: string;
  clinicalInterpretation: string;
  associatedConditions: string[];
}

export function FMICalculator() {
  const [activeTab, setActiveTab] = useState('fat-mass');
  const [formData, setFormData] = useState({
    fatMassGender: 'male',
    fatMassWeight: '',
    fatMassFatMass: '',
    fatMassHeight: '',

    compositionGender: 'male',
    compositionWeight: '',
    compositionBodyFat: '',
    compositionHeight: '',

    advancedGender: 'male',
    advancedAge: '',
    advancedWeight: '',
    advancedBodyFat: '',
    advancedHeight: ''
  });

  const [result, setResult] = useState<FMIResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let analysis: any;
      let method: string;

      switch (activeTab) {
        case 'fat-mass':
          const fatMassGender = formData.fatMassGender as 'male' | 'female';
          const fatMassWeight = parseFloat(formData.fatMassWeight);
          const fatMass = parseFloat(formData.fatMassFatMass);
          const fatMassHeight = parseFloat(formData.fatMassHeight);

          analysis = analyzeFMI(fatMass, fatMassHeight, fatMassGender);
          method = 'Masa Grasa Conocida';
          break;

        case 'composition':
          const compositionGender = formData.compositionGender as 'male' | 'female';
          const compositionWeight = parseFloat(formData.compositionWeight);
          const compositionBodyFat = parseFloat(formData.compositionBodyFat);
          const compositionHeight = parseFloat(formData.compositionHeight);

          const compositionResult = calculateComprehensiveFMI(
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
          const advancedWeight = parseFloat(formData.advancedWeight);
          const advancedBodyFat = parseFloat(formData.advancedBodyFat);
          const advancedHeight = parseFloat(formData.advancedHeight);

          const advancedResult = calculateComprehensiveFMI(
            advancedWeight,
            advancedBodyFat,
            advancedHeight,
            advancedGender,
            advancedAge
          );
          analysis = advancedResult.analysis;
          method = 'Análisis Avanzado con Edad';
          break;

        default:
          throw new Error('Método no válido');
      }

      setResult({
        method,
        fmi: analysis.fmi,
        bodyFatPercentage: analysis.bodyFatPercentage,
        fatMass: analysis.fatMass,
        leanBodyMass: analysis.leanBodyMass,
        category: analysis.category,
        healthRisk: analysis.healthRisk,
        metabolicRisk: analysis.metabolicRisk,
        cardiovascularRisk: analysis.cardiovascularRisk,
        recommendations: analysis.recommendations,
        comparison: analysis.comparison,
        idealRange: analysis.idealRange,
        clinicalInterpretation: analysis.clinicalInterpretation,
        associatedConditions: analysis.associatedConditions
      });

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const isFormValid = () => {
    switch (activeTab) {
      case 'fat-mass':
        return formData.fatMassGender && formData.fatMassWeight && formData.fatMassFatMass && formData.fatMassHeight;
      case 'composition':
        return formData.compositionGender && formData.compositionWeight && formData.compositionBodyFat && formData.compositionHeight;
      case 'advanced':
        return formData.advancedGender && formData.advancedAge && formData.advancedWeight && formData.advancedBodyFat && formData.advancedHeight;
      default:
        return false;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo': return 'text-foreground bg-success-subtle border-success';
      case 'Moderado': return 'text-foreground bg-info-subtle border-info';
      case 'Alto': return 'text-foreground bg-warning-subtle border-warning';
      case 'Muy Alto': return 'text-foreground bg-destructive-subtle border-destructive';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de FMI">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Calculadora de Índice de Masa Grasa
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Elige el método según tus datos disponibles para evaluar tu grasa corporal
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="relative z-10 grid w-full grid-cols-1 md:grid-cols-3 gap-2 mb-6 md:mb-0 h-auto md:h-10">
                <TabsTrigger value="fat-mass">Masa Grasa Conocida</TabsTrigger>
                <TabsTrigger value="composition">Composición Corporal</TabsTrigger>
                <TabsTrigger value="advanced">Análisis Avanzado</TabsTrigger>
              </TabsList>

              <TabsContent value="fat-mass" className="space-golden-sm">
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground/90 mb-1">Masa Grasa Conocida</h3>
                        <p className="text-sm text-info">
                          Método directo para quienes conocen su masa grasa absoluta en kilogramos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="fatMassGender"
                      label="Sexo"
                      value={formData.fatMassGender}
                      onChange={(value) => handleInputChange('fatMassGender', value)}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="fatMassWeight"
                      label="Peso corporal"
                      value={formData.fatMassWeight}
                      onChange={(value) => handleInputChange('fatMassWeight', value)}
                      placeholder="75"
                      unit="kg"
                      min={30}
                      max={200}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="fatMassFatMass"
                      label="Masa grasa"
                      value={formData.fatMassFatMass}
                      onChange={(value) => handleInputChange('fatMassFatMass', value)}
                      placeholder="15"
                      unit="kg"
                      min={3}
                      max={100}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="fatMassHeight"
                      label="Altura"
                      value={formData.fatMassHeight}
                      onChange={(value) => handleInputChange('fatMassHeight', value)}
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
                    Calcular FMI Básico
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
                          Método que calcula masa grasa a partir de peso total y porcentaje de grasa corporal.
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
                    Calcular FMI por Composición
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
                          Método completo que incluye edad para evaluación metabólica más precisa.
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
                      id="advancedWeight"
                      label="Peso corporal"
                      value={formData.advancedWeight}
                      onChange={(value) => handleInputChange('advancedWeight', value)}
                      placeholder="75"
                      unit="kg"
                      min={30}
                      max={200}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="advancedBodyFat"
                      label="Porcentaje de grasa corporal"
                      value={formData.advancedBodyFat}
                      onChange={(value) => handleInputChange('advancedBodyFat', value)}
                      placeholder="15"
                      unit="%"
                      min={3}
                      max={50}
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
              Resultados FMI - {result.method}
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="text-center p-6 bg-info-subtle rounded-lg border-l-4 border-info">
                  <div className="text-3xl font-bold text-info mb-2">
                    {result.fmi?.toFixed(2)}
                  </div>
                  <div className="text-sm font-medium text-foreground/90">FMI</div>
                </article>

                <article className={`text-center p-6 rounded-lg border-l-4 ${getRiskColor(result.healthRisk)}`}>
                  <div className="text-3xl font-bold mb-2">
                    {result.category}
                  </div>
                  <div className="text-sm font-medium">Estado</div>
                </article>

                <article className={`text-center p-6 rounded-lg border-l-4 ${getRiskColor(result.healthRisk)}`}>
                  <div className="text-3xl font-bold mb-2">
                    {result.healthRisk}
                  </div>
                  <div className="text-sm font-medium">Riesgo</div>
                </article>
              </div>

              {result.fatMass && result.leanBodyMass && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article className="card-golden bg-card/50">
                    <header className="p-6 pb-0">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <Scale className="h-5 w-5 mr-2 text-info" />
                        Composición Corporal
                      </h3>
                    </header>
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Masa grasa:</span>
                          <span className="font-semibold">{result.fatMass.toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Masa libre de grasa:</span>
                          <span className="font-semibold">{result.leanBodyMass.toFixed(1)} kg</span>
                        </div>
                        {result.bodyFatPercentage && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Porcentaje de grasa:</span>
                            <span className="font-semibold">{result.bodyFatPercentage.toFixed(1)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>

                  <article className="card-golden bg-card/50">
                    <header className="p-6 pb-0">
                      <h3 className="text-lg font-semibold text-foreground">
                        Rango ideal
                      </h3>
                    </header>
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground leading-[1.618]">
                        {result.idealRange}
                      </p>
                    </div>
                  </article>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-success" />
                      Riesgo Metabólico
                    </h3>
                  </header>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      {result.metabolicRisk}
                    </p>
                  </div>
                </article>

                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <TrendingDown className="h-5 w-5 mr-2 text-destructive" />
                      Riesgo Cardiovascular
                    </h3>
                  </header>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      {result.cardiovascularRisk}
                    </p>
                  </div>
                </article>
              </div>

              {result.associatedConditions && result.associatedConditions.length > 0 && (
                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                      Condiciones Asociadas
                    </h3>
                  </header>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {result.associatedConditions.map((condition, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-warning rounded-full"></span>
                          <span className="text-sm text-muted-foreground">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              )}

              <article className="card-golden-lg bg-info-subtle border-l-4 border-info">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Interpretación Clínica
                  </h3>
                </header>
                <div className="p-6">
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    {result.clinicalInterpretation}
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
