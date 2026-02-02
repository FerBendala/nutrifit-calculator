'use client';

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeABSI } from '@/lib/formulas';
import { AlertTriangle, Heart, Info, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function ABSIPage() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    waistCircumference: '85',
    gender: 'male' as 'male' | 'female',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeABSI> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.waistCircumference || !formData.age) return;

    try {
      const analysis = analyzeABSI(
        parseFloat(formData.waistCircumference),
        parseFloat(formData.weight),
        parseFloat(formData.height),
        formData.gender,
        parseInt(formData.age)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating ABSI:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.waistCircumference && formData.age;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Muy Bajo':
        return 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 border-green-400';
      case 'Bajo':
        return 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 border-blue-400';
      case 'Moderado':
        return 'text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-400';
      case 'Alto':
        return 'text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30 border-orange-400';
      case 'Muy Alto':
        return 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/30 border-red-400';
      default:
        return 'text-muted-foreground bg-muted border-gray-400';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="absi" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de ABSI Médica
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de ABSI (A Body Shape Index) según fórmula Krakauer & Krakauer (2012).
              Predice riesgo de mortalidad mejor que el IMC solo al incorporar distribución de grasa abdominal.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>ABSI (A Body Shape Index)</strong> es un índice desarrollado por Krakauer & Krakauer en 2012
                que predice mortalidad mejor que el IMC solo. A diferencia del IMC, el ABSI incorpora la circunferencia
                de cintura, proporcionando información sobre la distribución de grasa abdominal, un factor crítico en
                el riesgo cardiovascular y metabólico.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                El ABSI combina IMC, circunferencia de cintura y altura en una fórmula que identifica individuos con
                mayor riesgo de mortalidad, incluso cuando el IMC está en rango normal. Es especialmente útil para
                detectar riesgo cardiovascular y metabólico que el IMC solo podría pasar por alto.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de ABSI">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  Calculadora de ABSI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> El ABSI requiere circunferencia de cintura medida a nivel del ombligo.
                        Mide en centímetros, con el abdomen relajado, después de exhalar normalmente.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
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

                    <NumberInput
                      id="height"
                      label="Altura"
                      value={formData.height}
                      onChange={handleInputChange('height')}
                      min={100}
                      max={250}
                      step={0.1}
                      unit="cm"
                      placeholder="175.0"
                      required
                    />

                    <NumberInput
                      id="waistCircumference"
                      label="Circunferencia de Cintura"
                      value={formData.waistCircumference}
                      onChange={handleInputChange('waistCircumference')}
                      min={50}
                      max={200}
                      step={0.1}
                      unit="cm"
                      placeholder="85.0"
                      required
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

                    <NumberInput
                      id="age"
                      label="Edad"
                      value={formData.age}
                      onChange={handleInputChange('age')}
                      min={18}
                      max={120}
                      step={1}
                      unit="años"
                      placeholder="30"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    Calcular ABSI
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20 mt-8">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">📊</span>
                  Resultados de ABSI
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* ABSI Principal */}
                  <div className={`text-center card-golden border-2 rounded-lg p-6 ${getRiskColor(result.mortalityRisk)}`}>
                    <div className="text-5xl font-bold mb-2">
                      {result.absi.toFixed(4)}
                    </div>
                    <div className="text-xl font-semibold mb-1">
                      ABSI (A Body Shape Index)
                    </div>
                    <div className="text-lg font-bold mb-2">
                      Riesgo de Mortalidad: {result.mortalityRisk}
                    </div>
                    <p className="text-sm opacity-90">
                      Z-score: {result.absiZScore.toFixed(2)} | Percentil: {result.percentile}%
                    </p>
                  </div>

                  {/* Información de Riesgo */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-blue-900 dark:text-blue-100">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Z-Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                          {result.absiZScore.toFixed(2)}
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          {result.absiZScore < 0 ? 'Por debajo del promedio' : result.absiZScore < 0.5 ? 'Promedio' : 'Por encima del promedio'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                          <Info className="w-4 h-4 mr-2" />
                          Percentil
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">
                          {result.percentile}%
                        </div>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          {result.percentile < 25 ? 'Bajo riesgo' : result.percentile < 75 ? 'Riesgo moderado' : 'Alto riesgo'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-red-900">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Riesgo Relativo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-red-700 dark:text-red-300 mb-1">
                          {result.relativeRisk.toFixed(1)}x
                        </div>
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Comparado con promedio poblacional
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Estado de Salud */}
                  <Card className={`border-l-4 ${getRiskColor(result.mortalityRisk)}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Heart className="w-5 h-5 mr-2" />
                        Estado de Salud
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base font-medium mb-2">{result.healthStatus}</p>
                      <p className="text-sm text-muted-foreground">{result.clinicalInterpretation}</p>
                    </CardContent>
                  </Card>

                  {/* Comparación con otras métricas */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Comparación con Otras Métricas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2">
                        {result.comparison.map((metric, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <div>
                              <div className="font-semibold text-sm text-foreground">{metric.metric}</div>
                              <div className="text-xs text-muted-foreground">{metric.status}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-blue-700 dark:text-blue-300">
                                {metric.value.toFixed(metric.metric === 'ABSI' ? 4 : metric.metric === 'WHtR' ? 2 : 1)}
                              </div>
                              {metric.metric !== 'ABSI' && (
                                <div className="text-xs text-gray-500">
                                  {metric.metric === 'IMC' ? 'kg/m²' : metric.metric === 'WHtR' ? 'ratio' : 'cm'}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Factores de Riesgo de Mortalidad */}
                  {result.mortalityRiskFactors.length > 0 && (
                    <Card className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-red-900">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Factores de Riesgo de Mortalidad
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.mortalityRiskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start text-sm text-red-800 dark:text-red-200">
                              <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Estrategias de Mejora */}
                  {result.improvementStrategies.length > 0 && (
                    <Card className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-green-900">
                          <TrendingDown className="w-5 h-5 mr-2" />
                          Estrategias para Mejorar tu ABSI
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.improvementStrategies.map((strategy, index) => (
                            <li key={index} className="flex items-start text-sm text-green-800 dark:text-green-200">
                              <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                              <span>{strategy}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recomendaciones */}
                  <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-400">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center text-yellow-900">
                        <Info className="w-5 h-5 mr-2" />
                        Recomendaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-sm text-yellow-800 dark:text-yellow-200">
                            <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Importante:</strong> El ABSI es una herramienta de evaluación de riesgo, no un diagnóstico médico.
                      Si tu ABSI indica riesgo elevado, consulta con un profesional de la salud para evaluación completa
                      y plan de acción personalizado.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </section>
          )}

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué el ABSI predice mortalidad mejor que el IMC?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El A Body Shape Index (ABSI) fue desarrollado por Nir Krakauer y Jesse Krakauer en 2012 para superar
                las limitaciones del IMC. Mientras que el IMC solo considera peso y altura, el ABSI incorpora la
                circunferencia de cintura, proporcionando información crítica sobre la distribución de grasa abdominal.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Ventajas del ABSI sobre el IMC
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span><strong>Predicción de mortalidad:</strong> Mejor que IMC según <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3401091/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">estudios de Krakauer et al.</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><strong>Distribución de grasa:</strong> Identifica riesgo incluso con IMC normal</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><strong>Riesgo cardiovascular:</strong> Más sensible a grasa abdominal (visceral)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><strong>Independiente de IMC:</strong> Puede detectar riesgo en personas con IMC normal</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong>Validación científica:</strong> Validado en múltiples poblaciones y estudios</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                    <span><strong>Z-score estandarizado:</strong> Permite comparación con población de referencia</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del Z-Score
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-green-700 dark:text-green-300">Z-score &lt; -1.0 (Muy Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo de mortalidad muy bajo, percentil &lt;16%</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-300">Z-score -1.0 a -0.5 (Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo bajo, percentil 16-31%</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-yellow-700 dark:text-yellow-300">Z-score -0.5 a 0.5 (Moderado):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo promedio, percentil 31-69%</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-orange-700 dark:text-orange-300">Z-score 0.5 a 1.0 (Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo elevado, percentil 69-84%</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-red-700 dark:text-red-300">Z-score &gt; 1.0 (Muy Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo muy elevado, percentil &gt;84%</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-red-50 dark:bg-red-950/30 card-golden-lg border-l-4 border-red-400 mb-[2.618rem]">
              <h3 className="font-bold text-red-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">❤️</span>
                ABSI y Riesgo Cardiovascular
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Asociaciones clínicas:</h4>
                  <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                    <li>• <strong>Enfermedad cardiovascular:</strong> ABSI elevado predice eventos cardíacos</li>
                    <li>• <strong>Diabetes tipo 2:</strong> Mayor riesgo con ABSI alto</li>
                    <li>• <strong>Síndrome metabólico:</strong> ABSI correlaciona con componentes del síndrome</li>
                    <li>• <strong>Hipertensión:</strong> Mayor prevalencia con ABSI elevado</li>
                    <li>• <strong>Mortalidad por todas las causas:</strong> Predicción independiente del IMC</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Mecanismos biológicos:</h4>
                  <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                    <li>• <strong>Grasa visceral:</strong> ABSI refleja acumulación de grasa abdominal profunda</li>
                    <li>• <strong>Inflamación:</strong> La grasa visceral produce citoquinas proinflamatorias</li>
                    <li>• <strong>Resistencia a insulina:</strong> Mayor grasa abdominal aumenta resistencia</li>
                    <li>• <strong>Disfunción endotelial:</strong> Contribuye a aterosclerosis</li>
                    <li>• <strong>Alteraciones metabólicas:</strong> Afecta lípidos y glucosa</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-blue-50 dark:bg-blue-950/30 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmula Científica del ABSI
              </h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Fórmula ABSI (Krakauer & Krakauer, 2012):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>ABSI = WC / (BMI^(2/3) × height^(1/2))</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde:
                    <br />• WC = Circunferencia de cintura (en metros)
                    <br />• BMI = Índice de masa corporal (kg/m²)
                    <br />• height = Altura (en metros)
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Z-Score (Estandarización):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>Z-score = (ABSI - μ) / σ</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde μ es la media poblacional y σ es la desviación estándar, ajustados por género y edad.
                    El z-score permite comparar el ABSI individual con la población de referencia.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4 mb-[2.618rem]">
              <h3 className="text-xl font-semibold mb-4">❓ Preguntas frecuentes sobre ABSI</h3>
              <div className="space-y-3">
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿El ABSI reemplaza al IMC?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>No.</strong> El ABSI complementa al IMC. Mientras que el IMC es útil para evaluar peso corporal general,
                    el ABSI proporciona información adicional sobre distribución de grasa y riesgo de mortalidad. Ambos índices
                    juntos ofrecen una evaluación más completa. Consulta también nuestra <a href="/imc" className="text-blue-600 dark:text-blue-400 hover:underline">calculadora de IMC</a>.
                  </p>
                </article>
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo puedo mejorar mi ABSI?</h4>
                  <p className="text-sm text-muted-foreground">
                    Reducir la circunferencia de cintura es clave. Esto se logra mediante: (1) Ejercicio cardiovascular regular
                    (150+ min/semana), (2) Entrenamiento de fuerza para preservar músculo, (3) Déficit calórico moderado
                    (300-500 kcal/día), (4) Dieta rica en fibra y proteína, (5) Reducción de grasa abdominal específicamente.
                    Consulta nuestra <a href="/tdee" className="text-blue-600 dark:text-blue-400 hover:underline">calculadora de TDEE</a> para planificar tu déficit.
                  </p>
                </article>
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Qué diferencia hay entre ABSI y WHtR?</h4>
                  <p className="text-sm text-muted-foreground">
                    Ambos incorporan circunferencia de cintura, pero el ABSI también considera el IMC, proporcionando una
                    medida más compleja que predice mortalidad. El <a href="/whtr" className="text-blue-600 dark:text-blue-400 hover:underline">WHtR</a> es más simple (cintura/altura)
                    y evalúa riesgo cardiometabólico. El ABSI está específicamente diseñado para predecir mortalidad.
                    Ambos son útiles y complementarios.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-orange-50 dark:bg-orange-950/30 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Calculadoras relacionadas para evaluación completa
              </h3>
              <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/imc" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora de IMC:</a></strong> Complementa el ABSI con evaluación de peso corporal general</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/whtr" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora de WHtR:</a></strong> Ratio cintura-altura para evaluación de riesgo cardiometabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/whr" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora de WHR:</a></strong> Ratio cintura-cadera para análisis de distribución de grasa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/grasa-corporal" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Grasa Corporal:</a></strong> Porcentaje de grasa corporal para evaluación completa</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/absi" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora ABSI - A Body Shape Index | Predicción de Mortalidad"
              url="https://nutrifit-calculator.com/absi"
              description="Calculadora profesional de ABSI según fórmula Krakauer. Predice riesgo de mortalidad mejor que el IMC solo."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="absi" />
          </article>
        </main>
      </Container>
    </>
  );
}

