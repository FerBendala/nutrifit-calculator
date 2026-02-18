"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeBMD, estimateBMD } from '@/lib/formulas';
import { AlertTriangle, Bone, CheckCircle, Info, Shield, TrendingDown } from 'lucide-react';
import { useState } from 'react';

export function DensidadOseaCalculator() {
  const [activeTab, setActiveTab] = useState('bmd');
  const [formData, setFormData] = useState({
    bmd: '',
    tScore: '',
    zScore: '',
    site: 'lumbar' as 'lumbar' | 'femoral' | 'forearm' | 'total',
    age: '',
    gender: 'female' as 'male' | 'female',
    
    estAge: '',
    estGender: 'female' as 'male' | 'female',
    estWeight: '',
    estHeight: ''
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeBMD> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let analysis: ReturnType<typeof analyzeBMD>;

      if (activeTab === 'bmd') {
        const bmd = formData.bmd ? parseFloat(formData.bmd) : undefined;
        const tScore = formData.tScore ? parseFloat(formData.tScore) : undefined;
        const zScore = formData.zScore ? parseFloat(formData.zScore) : undefined;
        const age = formData.age ? parseInt(formData.age) : undefined;

        analysis = analyzeBMD(
          bmd,
          tScore,
          zScore,
          formData.site,
          age,
          formData.gender
        );
      } else {
        const estimatedBMD = estimateBMD(
          parseInt(formData.estAge),
          formData.estGender,
          parseFloat(formData.estWeight),
          parseFloat(formData.estHeight)
        );
        
        analysis = analyzeBMD(
          estimatedBMD,
          undefined,
          undefined,
          'lumbar',
          parseInt(formData.estAge),
          formData.estGender
        );
      }

      setResult(analysis);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const isFormValid = () => {
    if (activeTab === 'bmd') {
      return (formData.bmd || formData.tScore) && formData.site;
    } else {
      return formData.estAge && formData.estGender && formData.estWeight && formData.estHeight;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Normal': return 'bg-success-subtle border-success text-foreground';
      case 'Osteopenia': return 'bg-warning-subtle border-warning text-foreground';
      case 'Osteoporosis': return 'bg-warning-subtle border-warning text-foreground';
      case 'Severe Osteoporosis': return 'bg-destructive-subtle border-destructive text-foreground';
      default: return 'bg-muted border-border text-foreground';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Bajo': return 'bg-success-subtle text-foreground/90';
      case 'Moderado': return 'bg-warning-subtle text-foreground/90';
      case 'Alto': return 'bg-warning-subtle text-foreground/90';
      case 'Muy Alto': return 'bg-destructive-subtle text-foreground/90';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <>
      {/* Formulario de cálculo */}
      <section id="calculator" aria-label="Calculadora de Densidad Ósea">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <Bone className="w-6 h-6 mr-3 text-warning" />
              Calculadora de Densidad Ósea
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="bmd">BMD / T-Score</TabsTrigger>
                <TabsTrigger value="estimate">Estimación</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-golden-md">
                <TabsContent value="bmd" className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> Ingresa tu BMD (g/cm²) o T-Score de tu DXA scan. 
                        Si tienes ambos, ingresa ambos para mayor precisión. El T-Score es el 
                        valor más importante para el diagnóstico según criterios WHO.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="bmd"
                      label="BMD (Densidad Mineral Ósea)"
                      value={formData.bmd}
                      onChange={handleInputChange('bmd')}
                      min={0.5}
                      max={1.5}
                      step={0.01}
                      unit="g/cm²"
                      placeholder="1.0"
                    />

                    <NumberInput
                      id="tScore"
                      label="T-Score"
                      value={formData.tScore}
                      onChange={handleInputChange('tScore')}
                      min={-4.0}
                      max={2.0}
                      step={0.1}
                      placeholder="-1.5"
                    />

                    <NumberInput
                      id="zScore"
                      label="Z-Score (opcional)"
                      value={formData.zScore}
                      onChange={handleInputChange('zScore')}
                      min={-4.0}
                      max={2.0}
                      step={0.1}
                      placeholder="-1.0"
                    />

                    <SelectInput
                      id="site"
                      label="Sitio de Medición"
                      value={formData.site}
                      onChange={handleInputChange('site')}
                      options={[
                        { value: 'lumbar', label: 'Columna Lumbar' },
                        { value: 'femoral', label: 'Cuello Femoral' },
                        { value: 'forearm', label: 'Antebrazo' },
                        { value: 'total', label: 'Total' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="age"
                      label="Edad (opcional)"
                      value={formData.age}
                      onChange={handleInputChange('age')}
                      min={18}
                      max={120}
                      step={1}
                      unit="años"
                      placeholder="50"
                    />

                    <SelectInput
                      id="gender"
                      label="Género"
                      value={formData.gender}
                      onChange={handleInputChange('gender')}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="estimate" className="space-golden-md">
                  <div className="bg-warning-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> Esta es una estimación aproximada basada en edad, 
                        género, peso y altura. Para un diagnóstico preciso, se requiere un DXA scan. 
                        Esta estimación no reemplaza una evaluación médica profesional.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="estAge"
                      label="Edad"
                      value={formData.estAge}
                      onChange={handleInputChange('estAge')}
                      min={18}
                      max={120}
                      step={1}
                      unit="años"
                      placeholder="50"
                      required
                    />

                    <SelectInput
                      id="estGender"
                      label="Género"
                      value={formData.estGender}
                      onChange={handleInputChange('estGender')}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="estWeight"
                      label="Peso"
                      value={formData.estWeight}
                      onChange={handleInputChange('estWeight')}
                      min={30}
                      max={200}
                      step={0.1}
                      unit="kg"
                      placeholder="70"
                      required
                    />

                    <NumberInput
                      id="estHeight"
                      label="Altura"
                      value={formData.estHeight}
                      onChange={handleInputChange('estHeight')}
                      min={100}
                      max={250}
                      step={1}
                      unit="cm"
                      placeholder="170"
                      required
                    />
                  </div>
                </TabsContent>

                <Button
                  type="submit"
                  disabled={!isFormValid()}
                  className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                >
                  <Bone className="w-5 h-5 mr-2" />
                  {activeTab === 'bmd' ? 'Calcular Densidad Ósea' : 'Estimar Densidad Ósea'}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <Bone className="w-6 h-6 mr-3 text-warning" />
              Resultados de Densidad Ósea
            </h2>
          </header>
          <div className="p-6 space-golden-md">
            {/* Categoría Principal */}
            <Card className={`bg-gradient-to-br ${getCategoryColor(result.category)} border-l-4`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-semibold flex items-center`}>
                  <Bone className="w-4 h-4 mr-2" />
                  Categoría de Densidad Ósea
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold mb-2`}>
                  {result.category}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {result.status}
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.interpretation}
                </p>
              </CardContent>
            </Card>

            {/* Valores de BMD */}
            <div className="grid gap-4 md:grid-cols-3">
              {result.bmd !== undefined && (
                <Card className="bg-info-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">
                      BMD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-info">
                      {result.bmd} g/cm²
                    </div>
                    <p className="text-xs text-info mt-1">
                      Densidad Mineral Ósea
                    </p>
                  </CardContent>
                </Card>
              )}

              {result.tScore !== undefined && (
                <Card className="bg-accent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">
                      T-Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {result.tScore}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Comparado con adulto joven
                    </p>
                  </CardContent>
                </Card>
              )}

              {result.zScore !== undefined && (
                <Card className="bg-gradient-to-br bg-success-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">
                      Z-Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">
                      {result.zScore}
                    </div>
                    <p className="text-xs text-success mt-1">
                      Comparado con edad similar
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Riesgo de Fractura */}
            <Card className={`bg-gradient-to-br ${result.fractureRisk.level === 'Bajo' ? 'bg-success-subtle border-success' :
              result.fractureRisk.level === 'Moderado' ? 'bg-warning-subtle border-warning' :
                result.fractureRisk.level === 'Alto' ? 'bg-warning-subtle border-warning' :
                  'from-red-50 to-red-100 border-destructive'
              } border-l-4`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-semibold flex items-center ${result.fractureRisk.level === 'Bajo' ? 'text-foreground' :
                  result.fractureRisk.level === 'Moderado' ? 'text-foreground' :
                    result.fractureRisk.level === 'Alto' ? 'text-foreground' :
                      'text-foreground'
                  }`}>
                  <Shield className="w-4 h-4 mr-2" />
                  Riesgo de Fractura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-lg font-bold mb-1 ${result.fractureRisk.level === 'Bajo' ? 'text-success' :
                  result.fractureRisk.level === 'Moderado' ? 'text-warning' :
                    result.fractureRisk.level === 'Alto' ? 'text-warning' :
                      'text-destructive'
                  }`}>
                  {result.fractureRisk.level}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {result.fractureRisk.description}
                </p>
                <div className={`text-xs font-semibold inline-block px-2 py-1 rounded ${getRiskColor(result.fractureRisk.level)}`}>
                  Riesgo: {result.fractureRisk.riskPercentage}
                </div>
              </CardContent>
            </Card>

            {/* Recomendaciones */}
            <Card className="bg-gradient-to-br bg-info-subtle border-l-4 border-info">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-info mr-2">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Estrategias de Prevención */}
            <Card className="bg-gradient-to-br bg-success-subtle border-l-4 border-success">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Estrategias de Prevención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {result.preventionStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-success mr-2">•</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Monitoreo */}
            <Card className="bg-accent border-l-4 border-warning">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  Frecuencia de Monitoreo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground mb-2">
                  {result.monitoring.frequency}
                </div>
                <ul className="space-y-1">
                  {result.monitoring.actions.map((action, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-muted-foreground mr-2">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Factores de Riesgo */}
            {result.riskFactors.length > 0 && (
              <Card className="bg-destructive-subtle border-l-4 border-destructive">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Factores de Riesgo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {result.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-destructive mr-2">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Interpretación Clínica */}
            <Card className="bg-gradient-to-br bg-muted border-l-4 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  Interpretación Clínica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {result.clinicalSignificance}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.clinicalInterpretation}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}
