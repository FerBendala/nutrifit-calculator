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
import { analyzeLBM } from '@/lib/formulas';
import { AlertTriangle, Info, ActivitySquare, TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function MasaMagraPage() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    bodyFatPercentage: '15',
    gender: 'male' as 'male' | 'female',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeLBM> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.bodyFatPercentage || !formData.age) return;

    try {
      const analysis = analyzeLBM(
        parseFloat(formData.weight),
        parseFloat(formData.height),
        parseFloat(formData.bodyFatPercentage),
        formData.gender,
        parseInt(formData.age)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating LBM:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.bodyFatPercentage && formData.age;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Muy Bajo':
        return 'text-red-700 bg-red-50 border-red-400';
      case 'Bajo':
        return 'text-orange-700 bg-orange-50 border-orange-400';
      case 'Normal':
        return 'text-green-700 bg-green-50 border-green-400';
      case 'Alto':
        return 'text-blue-700 bg-blue-50 border-blue-400';
      case 'Muy Alto':
        return 'text-purple-700 bg-purple-50 border-purple-400';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-400';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="masa-magra" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora Masa Magra Médica
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de masa magra (LBM) con 4 fórmulas científicas validadas.
              Evalúa composición corporal incluyendo músculos, huesos, órganos y agua.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                La <strong>masa magra (LBM - Lean Body Mass)</strong> es el peso total del cuerpo menos la grasa corporal.
                Incluye músculos, huesos, órganos, agua y otros tejidos no grasos. Mantener o aumentar la masa magra es
                crucial para la salud metabólica, función física y prevención de sarcopenia (pérdida muscular relacionada con la edad).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Esta calculadora utiliza cuatro fórmulas científicas validadas: <strong>Standard</strong>, <strong>Boer (1984)</strong>,
                <strong> James (1976)</strong> y <strong>Hume (1966)</strong> para calcular la masa magra. Es complementaria a otras
                calculadoras de composición corporal como <a href="/masa-muscular" className="text-blue-600 hover:underline">Masa Muscular</a>,
                <a href="/grasa-corporal" className="text-blue-600 hover:underline"> Grasa Corporal</a>, <a href="/composicion" className="text-blue-600 hover:underline">Composición Corporal</a> y
                <a href="/ffmi" className="text-blue-600 hover:underline"> FFMI</a>.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Masa Magra">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  Calculadora de Masa Magra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        <strong>Nota:</strong> Para calcular la masa magra necesitas conocer tu porcentaje de grasa corporal.
                        Puedes usar nuestra <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium">calculadora de grasa corporal</a> o
                        <a href="/composicion" className="text-blue-600 hover:underline font-medium"> calculadora de composición corporal</a> para obtenerlo.
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
                      id="bodyFatPercentage"
                      label="Porcentaje de Grasa Corporal"
                      value={formData.bodyFatPercentage}
                      onChange={handleInputChange('bodyFatPercentage')}
                      min={5}
                      max={50}
                      step={0.1}
                      unit="%"
                      placeholder="15.0"
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
                    Calcular Masa Magra
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
                  Resultados de Masa Magra
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* LBM Principal */}
                  <div className={`text-center card-golden border-2 rounded-lg p-6 ${getCategoryColor(result.category)}`}>
                    <div className="text-5xl font-bold mb-2">
                      {result.lbmAverage.toFixed(1)} kg
                    </div>
                    <div className="text-xl font-semibold mb-1">
                      Masa Magra (LBM) Promedio
                    </div>
                    <div className="text-lg font-bold mb-2">
                      {result.lbmPercentage.toFixed(1)}% del peso corporal
                    </div>
                    <div className="text-lg font-bold mb-2">
                      Categoría: {result.category}
                    </div>
                    <p className="text-sm opacity-90">
                      {result.lbmInterpretation}
                    </p>
                  </div>

                  {/* Fórmulas utilizadas */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                          <ActivitySquare className="w-4 h-4 mr-2" />
                          Fórmula Standard
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-purple-700 mb-1">
                          {result.lbmStandard.toFixed(1)} kg
                        </div>
                        <p className="text-xs text-purple-600">
                          LBM = Peso - Masa Grasa
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-blue-900">
                          <ActivitySquare className="w-4 h-4 mr-2" />
                          Fórmula Boer (1984)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-blue-700 mb-1">
                          {result.lbmBoer.toFixed(1)} kg
                        </div>
                        <p className="text-xs text-blue-600">
                          Ajustada para atletas
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-green-900">
                          <ActivitySquare className="w-4 h-4 mr-2" />
                          Fórmula James (1976)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-green-700 mb-1">
                          {result.lbmJames.toFixed(1)} kg
                        </div>
                        <p className="text-xs text-green-600">
                          Ajustada para población general
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-orange-900">
                          <ActivitySquare className="w-4 h-4 mr-2" />
                          Fórmula Hume (1966)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-orange-700 mb-1">
                          {result.lbmHume.toFixed(1)} kg
                        </div>
                        <p className="text-xs text-orange-600">
                          Basada en género y altura
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Estado de Salud */}
                  <Card className={`border-l-4 ${getCategoryColor(result.category)}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <ActivitySquare className="w-5 h-5 mr-2" />
                        Estado de Salud
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base font-medium mb-2">{result.healthStatus}</p>
                      <p className="text-sm text-gray-700">{result.clinicalInterpretation}</p>
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
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-semibold text-sm text-gray-900">{metric.metric}</div>
                              <div className="text-xs text-gray-600">{metric.status}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-blue-700">
                                {metric.value.toFixed(metric.metric === 'Porcentaje Grasa Corporal' ? 1 : 1)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {metric.metric === 'Masa Magra (LBM)' || metric.metric === 'Masa Grasa' ? 'kg' : metric.metric === 'Porcentaje Grasa Corporal' ? '%' : 'kg/m²'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Beneficios */}
                  {result.benefits.length > 0 && (
                    <Card className="bg-green-50 border-l-4 border-green-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-green-900">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Beneficios de Mantener/Aumentar Masa Magra
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start text-sm text-green-800">
                              <span className="text-green-600 mr-2">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Estrategias de Mejora */}
                  {result.improvementStrategies.length > 0 && (
                    <Card className="bg-blue-50 border-l-4 border-blue-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-blue-900">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Estrategias para Aumentar Masa Magra
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.improvementStrategies.map((strategy, index) => (
                            <li key={index} className="flex items-start text-sm text-blue-800">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{strategy}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recomendaciones */}
                  <Card className="bg-yellow-50 border-l-4 border-yellow-400">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center text-yellow-900">
                        <Info className="w-5 h-5 mr-2" />
                        Recomendaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-sm text-yellow-800">
                            <span className="text-yellow-600 mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Importante:</strong> La masa magra incluye músculos, huesos, órganos, agua y otros tejidos no grasos.
                      Para una medición precisa, se recomienda usar técnicas de imagen (DEXA, bioimpedancia avanzada).
                      Si tu masa magra está muy baja, consulta con un profesional de la salud para descartar sarcopenia.
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
                ¿Qué es la masa magra y por qué es importante?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La masa magra (LBM) es el peso total del cuerpo menos la grasa corporal. Incluye todos los tejidos
                no grasos: músculos, huesos, órganos, agua y otros componentes. Mantener o aumentar la masa magra es
                crucial para la salud metabólica, función física y prevención de sarcopenia.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">💪</span>
                  Componentes de la Masa Magra
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Músculos esqueléticos:</strong> Tejido muscular que permite movimiento</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 mr-2">•</span>
                    <span><strong>Huesos:</strong> Estructura ósea y densidad mineral</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Órganos internos:</strong> Hígado, riñones, corazón, etc.</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Agua corporal:</strong> Agua intracelular y extracelular</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Tejidos conectivos:</strong> Tendones, ligamentos, fascia</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span><strong>Otros componentes:</strong> Glucógeno, minerales, etc.</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del LBM
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-red-700">LBM &lt; 70% (Hombres) / &lt; 60% (Mujeres) - Muy Bajo:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo de sarcopenia, pérdida funcional</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-orange-700">LBM 70-75% (H) / 60-65% (M) - Bajo:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Requiere atención para prevenir pérdida muscular</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-green-700">LBM 75-85% (H) / 65-75% (M) - Normal:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Rango saludable, mantener hábitos</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-blue-700">LBM 85-90% (H) / 75-80% (M) - Alto:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Excelente composición corporal</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-purple-700">LBM &gt; 90% (H) / &gt; 80% (M) - Muy Alto:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Nivel atlético, muy entrenado</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-purple-50 card-golden-lg border-l-4 border-purple-400 mb-[2.618rem]">
              <h3 className="font-bold text-purple-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                Beneficios de Mantener/Aumentar Masa Magra
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Beneficios Metabólicos:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Mayor tasa metabólica en reposo (quema más calorías)</li>
                    <li>• Mejor control glucémico y sensibilidad a la insulina</li>
                    <li>• Mejor perfil lipídico (colesterol, triglicéridos)</li>
                    <li>• Menor riesgo de síndrome metabólico</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Beneficios Funcionales:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Mayor fuerza y resistencia física</li>
                    <li>• Mejor función física y movilidad</li>
                    <li>• Menor riesgo de caídas y fracturas</li>
                    <li>• Mejor calidad de vida en edad avanzada</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmulas Científicas Utilizadas
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Fórmula Standard:</h4>
                  <div className="font-mono text-sm mb-2 bg-gray-50 p-3 rounded">
                    <p>LBM = Peso Total - Masa Grasa</p>
                    <p>Masa Grasa = Peso × (% Grasa Corporal / 100)</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Método directo que resta la masa grasa del peso total. Es la base para otros métodos.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Fórmula Boer (1984):</h4>
                  <div className="font-mono text-sm mb-2 bg-gray-50 p-3 rounded">
                    <p>LBM = (Peso - Masa Grasa) × 1.02</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Ajuste del 2% para atletas, que tienden a tener mayor masa magra. Validada en poblaciones atléticas.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Fórmula James (1976):</h4>
                  <div className="font-mono text-sm mb-2 bg-gray-50 p-3 rounded">
                    <p>LBM = (Peso - Masa Grasa) × 0.98</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Ajuste del -2% para población general, considerando variaciones en composición corporal.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Fórmula Hume (1966):</h4>
                  <div className="font-mono text-sm mb-2 bg-gray-50 p-3 rounded">
                    <p>Hombres: LBM = (0.32810 × Peso) + (0.33929 × Altura) - 29.5336</p>
                    <p>Mujeres: LBM = (0.29569 × Peso) + (0.41813 × Altura) - 43.2933</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Fórmula basada en género y altura, sin requerir porcentaje de grasa corporal. Útil cuando no se conoce la grasa corporal.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4 mb-[2.618rem]">
              <h3 className="text-lg font-medium">❓ Preguntas frecuentes sobre masa magra</h3>
              <div className="space-y-3">
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo puedo aumentar mi masa magra?</h4>
                  <p className="text-sm text-muted-foreground">
                    Para aumentar masa magra: (1) Entrenamiento de fuerza 3-4 veces por semana con progresión,
                    (2) Consumo adecuado de proteína (1.6-2.2g por kg de peso), (3) Ligero superávit calórico (200-300 kcal/día),
                    (4) Descanso adecuado (7-9 horas de sueño), (5) Hidratación suficiente. Consulta nuestra
                    <a href="/proteina" className="text-blue-600 hover:underline"> calculadora de proteína</a> para tus necesidades.
                  </p>
                </article>
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cuál es la diferencia entre masa magra y masa muscular?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Masa magra (LBM)</strong> incluye músculos, huesos, órganos, agua y otros tejidos no grasos.
                    <strong> Masa muscular</strong> es solo el tejido muscular esquelético. La masa magra es más amplia e incluye
                    la masa muscular como componente principal. Ambas son importantes para la salud y función física.
                  </p>
                </article>
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Por qué es importante la masa magra para la salud?</h4>
                  <p className="text-sm text-muted-foreground">
                    La masa magra es crucial porque: (1) Aumenta la tasa metabólica en reposo (quema más calorías),
                    (2) Mejora la función física y movilidad, (3) Previene sarcopenia relacionada con la edad,
                    (4) Mejora la salud ósea, (5) Mejora el control glucémico y sensibilidad a la insulina,
                    (6) Reduce el riesgo de caídas y fracturas en edad avanzada.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Calculadoras relacionadas para evaluación completa
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/masa-muscular" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de Masa Muscular:</a></strong> Complementa el LBM con evaluación específica de músculo esquelético</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de Grasa Corporal:</a></strong> Necesaria para calcular LBM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/composicion" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de Composición Corporal:</a></strong> Evaluación completa de grasa y masa magra</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/ffmi" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de FFMI:</a></strong> Índice de masa libre de grasa independiente de altura</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/masa-magra" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora Masa Magra - LBM | Lean Body Mass | 4 Fórmulas Científicas"
              url="https://nutrifit-calculator.com/masa-magra"
              description="Calculadora profesional de masa magra con 4 fórmulas científicas. Evalúa composición corporal incluyendo músculos, huesos, órganos y agua."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="masa-magra" />
          </article>
        </main>
      </Container>
    </>
  );
}

