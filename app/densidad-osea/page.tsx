"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeBMD, estimateBMD } from '@/lib/formulas';
import { AlertTriangle, Bone, CheckCircle, Info, Shield, TrendingDown } from 'lucide-react';
import { useState } from 'react';

export default function DensidadOseaPage() {
  const [activeTab, setActiveTab] = useState('bmd');
  const [formData, setFormData] = useState({
    // BMD directo
    bmd: '',
    tScore: '',
    zScore: '',
    site: 'lumbar' as 'lumbar' | 'femoral' | 'forearm' | 'total',
    age: '',
    gender: 'female' as 'male' | 'female',
    
    // Estimación
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
        // Estimación
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
      case 'Normal': return 'from-green-50 to-green-100 border-green-400 text-green-900';
      case 'Osteopenia': return 'from-yellow-50 to-yellow-100 border-yellow-400 text-yellow-900';
      case 'Osteoporosis': return 'from-orange-50 to-orange-100 border-orange-400 text-orange-900';
      case 'Severe Osteoporosis': return 'from-red-50 to-red-100 border-red-400 text-red-900';
      default: return 'from-gray-50 to-gray-100 border-gray-400 text-foreground';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Bajo': return 'bg-green-200 text-green-800 dark:text-green-200';
      case 'Moderado': return 'bg-yellow-200 text-yellow-800 dark:text-yellow-200';
      case 'Alto': return 'bg-orange-200 text-orange-800 dark:text-orange-200';
      case 'Muy Alto': return 'bg-red-200 text-red-800 dark:text-red-200';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="densidad-osea" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Densidad Ósea Médica
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica profesional de densidad mineral ósea para evaluación de osteoporosis
              según criterios WHO. Calcula T-Score y Z-Score para evaluar riesgo de fracturas.
            </p>
          </header>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Densidad Ósea">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <Bone className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
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
                      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
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
                      <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
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
                  <Bone className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
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
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                          BMD
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          {result.bmd} g/cm²
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Densidad Mineral Ósea
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {result.tScore !== undefined && (
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold text-purple-900">
                          T-Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-700">
                          {result.tScore}
                        </div>
                        <p className="text-xs text-purple-600 mt-1">
                          Comparado con adulto joven
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {result.zScore !== undefined && (
                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold text-green-900">
                          Z-Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                          {result.zScore}
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Comparado con edad similar
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Riesgo de Fractura */}
                <Card className={`bg-gradient-to-br ${result.fractureRisk.level === 'Bajo' ? 'from-green-50 to-green-100 border-green-400' :
                  result.fractureRisk.level === 'Moderado' ? 'from-yellow-50 to-yellow-100 border-yellow-400' :
                    result.fractureRisk.level === 'Alto' ? 'from-orange-50 to-orange-100 border-orange-400' :
                      'from-red-50 to-red-100 border-red-400'
                  } border-l-4`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.fractureRisk.level === 'Bajo' ? 'text-green-900' :
                      result.fractureRisk.level === 'Moderado' ? 'text-yellow-900' :
                        result.fractureRisk.level === 'Alto' ? 'text-orange-900' :
                          'text-red-900'
                      }`}>
                      <Shield className="w-4 h-4 mr-2" />
                      Riesgo de Fractura
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-lg font-bold mb-1 ${result.fractureRisk.level === 'Bajo' ? 'text-green-700 dark:text-green-300' :
                      result.fractureRisk.level === 'Moderado' ? 'text-yellow-700 dark:text-yellow-300' :
                        result.fractureRisk.level === 'Alto' ? 'text-orange-700 dark:text-orange-300' :
                          'text-red-700 dark:text-red-300'
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
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-blue-900 dark:text-blue-100">
                      <Info className="w-4 h-4 mr-2" />
                      Recomendaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Estrategias de Prevención */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-green-900">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Estrategias de Prevención
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {result.preventionStrategies.map((strategy, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Monitoreo */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                      <Info className="w-4 h-4 mr-2" />
                      Frecuencia de Monitoreo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-purple-700 mb-2">
                      {result.monitoring.frequency}
                    </div>
                    <ul className="space-y-1">
                      {result.monitoring.actions.map((action, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-purple-600 mr-2">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Factores de Riesgo */}
                {result.riskFactors.length > 0 && (
                  <Card className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-red-900">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Factores de Riesgo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {result.riskFactors.map((risk, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Interpretación Clínica */}
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-gray-400">
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

          {/* Contenido educativo */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Densidad Ósea (BMD)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La densidad mineral ósea (BMD) es una medida de la cantidad de mineral óseo por unidad 
                de área. Se utiliza para diagnosticar osteoporosis y evaluar el riesgo de fracturas. 
                El T-Score compara tu densidad ósea con la de un adulto joven saludable, mientras que 
                el Z-Score compara con personas de tu misma edad.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Bone className="w-5 h-5 mr-3 text-orange-600 dark:text-orange-400" />
                  Criterios WHO
                </h3>
                <div className="space-golden-sm">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">Normal:</p>
                    <p className="text-sm text-green-600 dark:text-green-400">T-Score ≥ -1.0</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-1">Osteopenia:</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">T-Score entre -1.0 y -2.5</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-1">Osteoporosis:</p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">T-Score ≤ -2.5</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">Osteoporosis Severa:</p>
                    <p className="text-sm text-red-600 dark:text-red-400">T-Score ≤ -2.5 + fractura</p>
                  </div>
                </div>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                  Importancia Clínica
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Diagnóstico de osteoporosis según criterios WHO</li>
                  <li>Evaluación del riesgo de fracturas</li>
                  <li>Monitoreo de la efectividad del tratamiento</li>
                  <li>Detección temprana de pérdida ósea</li>
                  <li>Guía para decisiones de tratamiento médico</li>
                </ul>
              </article>
            </section>

            <section className="bg-blue-50 dark:bg-blue-950/30 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <Shield className="w-5 h-5 mr-3" />
                Prevención de Osteoporosis
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Nutrición
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Asegurar ingesta adecuada de calcio (1000-1500 mg/día) y vitamina D (800-1000 UI/día). 
                    Los lácteos, vegetales de hoja verde y pescado con espinas son excelentes fuentes de calcio.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Ejercicio
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Ejercicio con carga de peso (caminar, correr, entrenamiento de fuerza) ayuda a 
                    mantener y mejorar la densidad ósea. También son importantes los ejercicios de 
                    equilibrio para prevenir caídas.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Factores de Riesgo
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Evitar el tabaco, limitar el consumo de alcohol, mantener un peso saludable y 
                    evitar dietas extremas. Algunos medicamentos pueden afectar la densidad ósea.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Detección Temprana
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Las mujeres post-menopáusicas y hombres mayores de 70 años deben considerar 
                    realizarse un DXA scan. La detección temprana permite intervención antes de 
                    que ocurran fracturas.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/densidad-osea" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Densidad Ósea (BMD) - Evaluación de Osteoporosis"
            url="https://nutrifit-calculator.com/densidad-osea"
            description="Calcula tu densidad mineral ósea (BMD) y evalúa tu riesgo de osteoporosis según criterios WHO. Calcula T-Score y Z-Score. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="densidad-osea" />
        </main>
      </Container>
    </>
  );
}
