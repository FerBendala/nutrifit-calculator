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
import { analyzeVAT } from '@/lib/formulas';
import { AlertTriangle, Heart, Info, Layers, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function GrasaVisceralPage() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    waistCircumference: '85',
    gender: 'male' as 'male' | 'female',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeVAT> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.waistCircumference || !formData.age) return;

    try {
      const analysis = analyzeVAT(
        parseFloat(formData.waistCircumference),
        parseFloat(formData.weight),
        parseFloat(formData.height),
        formData.gender,
        parseInt(formData.age)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating VAT:', error);
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
      <SchemaMarkup calculatorKey="grasa-visceral" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Grasa Visceral
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu nivel de grasa visceral (la grasa que rodea tus órganos internos) con 2 fórmulas científicas validadas.
              Evalúa tu riesgo metabólico y cardiovascular. Descubre si tu grasa visceral está en niveles saludables.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                La <strong>grasa visceral (VAT - Visceral Adipose Tissue)</strong> es el tejido adiposo que rodea
                los órganos internos del abdomen (hígado, páncreas, intestinos). A diferencia de la grasa subcutánea,
                la grasa visceral es metabólicamente activa y se asocia con mayor riesgo de síndrome metabólico,
                diabetes tipo 2, enfermedad cardiovascular y esteatosis hepática (hígado graso).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Esta calculadora utiliza dos fórmulas científicas validadas: <strong>Lee et al. (2008)</strong> y
                <strong> Ryo et al. (2005)</strong> para estimar el área de grasa visceral. Es complementaria a otras
                calculadoras de distribución de grasa como <a href="/ci/" className="text-blue-600 dark:text-blue-400 hover:underline">CI</a>,
                <a href="/bri/" className="text-blue-600 dark:text-blue-400 hover:underline">BRI</a>, <a href="/absi/" className="text-blue-600 dark:text-blue-400 hover:underline">ABSI</a> y
                <a href="/whtr/" className="text-blue-600 dark:text-blue-400 hover:underline">WHtR</a>.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Grasa Visceral">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  Calculadora de Grasa Visceral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> La grasa visceral se estima usando medidas antropométricas. Para una
                        medición precisa, se recomienda usar técnicas de imagen (DEXA, CT scan, MRI), pero estas fórmulas
                        proporcionan una estimación útil basada en estudios científicos.
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
                    Calcular Grasa Visceral
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
                  Resultados de Grasa Visceral
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* VAT Principal */}
                  <div className={`text-center card-golden border-2 rounded-lg p-6 ${getRiskColor(result.riskCategory)}`}>
                    <div className="text-5xl font-bold mb-2">
                      {result.vatAverage.toFixed(1)} cm²
                    </div>
                    <div className="text-xl font-semibold mb-1">
                      Grasa Visceral (VAT) Promedio
                    </div>
                    <div className="text-lg font-bold mb-2">
                      Riesgo: {result.riskCategory}
                    </div>
                    <p className="text-sm opacity-90">
                      {result.vatInterpretation}
                    </p>
                  </div>

                  {/* Fórmulas utilizadas */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                          <Layers className="w-4 h-4 mr-2" />
                          Fórmula Lee et al. (2008)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-1">
                          {result.vatLee.toFixed(1)} cm²
                        </div>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          Basada en IMC, edad y género
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-blue-900 dark:text-blue-100">
                          <Layers className="w-4 h-4 mr-2" />
                          Fórmula Ryo et al. (2005)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">
                          {result.vatRyo.toFixed(1)} cm²
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Basada en circunferencia de cintura, IMC, edad y género
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Información de Riesgo */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Riesgo Metabólico
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-1">
                          {result.metabolicRisk}
                        </div>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          Basado en cantidad de grasa visceral
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-red-900">
                          <Heart className="w-4 h-4 mr-2" />
                          Riesgo Cardiovascular
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-red-700 dark:text-red-300 mb-1">
                          {result.cardiovascularRisk}
                        </div>
                        <p className="text-xs text-red-600 dark:text-red-400">
                          Evaluación de riesgo de enfermedad cardiovascular
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Estado de Salud */}
                  <Card className={`border-l-4 ${getRiskColor(result.riskCategory)}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Layers className="w-5 h-5 mr-2" />
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
                                {metric.value.toFixed(metric.metric === 'Grasa Visceral (VAT)' ? 1 : metric.metric === 'WHtR' ? 2 : 1)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {metric.metric === 'Grasa Visceral (VAT)' ? 'cm²' : metric.metric === 'IMC' ? 'kg/m²' : metric.metric === 'WHtR' ? 'ratio' : 'cm'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Factores de Riesgo */}
                  {result.riskFactors.length > 0 && (
                    <Card className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-red-900">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Factores de Riesgo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.riskFactors.map((factor, index) => (
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
                          Estrategias para Reducir Grasa Visceral
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
                      <strong>Importante:</strong> Esta calculadora estima la grasa visceral usando fórmulas antropométricas.
                      Para una medición precisa, se recomienda usar técnicas de imagen (DEXA, CT scan, MRI). Si tu grasa
                      visceral estimada indica riesgo elevado, consulta con un profesional de la salud para evaluación completa.
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
                ¿Por qué la grasa visceral es peligrosa?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La grasa visceral es el tejido adiposo que rodea los órganos internos del abdomen. A diferencia de la
                grasa subcutánea (debajo de la piel), la grasa visceral es metabólicamente activa y produce sustancias
                que pueden aumentar el riesgo de enfermedades crónicas.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Diferencias: Grasa Visceral vs Subcutánea
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span><strong>Grasa visceral:</strong> Rodea órganos internos, metabólicamente activa, más peligrosa</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><strong>Grasa subcutánea:</strong> Debajo de la piel, menos activa metabólicamente, menos peligrosa</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><strong>Producción de citoquinas:</strong> La grasa visceral produce sustancias inflamatorias</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><strong>Resistencia a insulina:</strong> Mayor asociación con resistencia a la insulina</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong>Riesgo cardiovascular:</strong> Mayor asociación con enfermedad cardiovascular</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                    <span><strong>Hígado graso:</strong> Puede contribuir a esteatosis hepática</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del VAT
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-green-700 dark:text-green-300">VAT &lt; 100 cm² (Muy Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Grasa visceral en rango óptimo, riesgo muy bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-300">VAT 100-130 cm² (Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Grasa visceral en rango saludable, riesgo bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-yellow-700 dark:text-yellow-300">VAT 130-160 cm² (Moderado):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo moderado, requiere monitoreo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-orange-700 dark:text-orange-300">VAT 160-200 cm² (Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo elevado, requiere intervención</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-red-700 dark:text-red-300">VAT &gt; 200 cm² (Muy Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo muy elevado, requiere atención médica</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-purple-50 dark:bg-purple-950/30 card-golden-lg border-l-4 border-purple-400 mb-[2.618rem]">
              <h3 className="font-bold text-purple-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                Grasa Visceral y Enfermedades
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Enfermedades asociadas:</h4>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• <strong>Síndrome metabólico:</strong> Mayor riesgo con VAT elevado</li>
                    <li>• <strong>Diabetes tipo 2:</strong> Resistencia a insulina asociada</li>
                    <li>• <strong>Enfermedad cardiovascular:</strong> Mayor riesgo de infarto y accidente cerebrovascular</li>
                    <li>• <strong>Hipertensión arterial:</strong> Asociación con presión arterial elevada</li>
                    <li>• <strong>Esteatosis hepática:</strong> Hígado graso no alcohólico</li>
                    <li>• <strong>Dislipidemia:</strong> Colesterol y triglicéridos elevados</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Mecanismos de acción:</h4>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• Producción de citoquinas inflamatorias (TNF-α, IL-6)</li>
                    <li>• Liberación de ácidos grasos libres al hígado</li>
                    <li>• Resistencia a la insulina y disfunción metabólica</li>
                    <li>• Alteración del perfil lipídico</li>
                    <li>• Aumento de presión arterial</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-blue-50 dark:bg-blue-950/30 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmulas Científicas Utilizadas
              </h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Fórmula Lee et al. (2008):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>VAT = -266.4 + (0.67 × edad) + (0.68 × IMC) + (11.4 × género) - (0.08 × IMC × edad)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde género: 0 para mujer, 1 para hombre. Esta fórmula utiliza IMC, edad y género para estimar
                    el área de grasa visceral en cm². Validada en poblaciones asiáticas y occidentales.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Fórmula Ryo et al. (2005):</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>VAT = 0.0001 × (WC² × IMC × edad × factor_género)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Donde WC es circunferencia de cintura en cm, factor_género: 1.0 para hombre, 0.9 para mujer.
                    Esta fórmula incorpora la circunferencia de cintura, proporcionando una estimación más precisa
                    basada en medidas abdominales.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4 mb-[2.618rem]">
              <h3 className="text-xl font-semibold mb-4">❓ Preguntas frecuentes sobre grasa visceral</h3>
              <div className="space-y-3">
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo puedo reducir mi grasa visceral?</h4>
                  <p className="text-sm text-muted-foreground">
                    Reducir la grasa visceral requiere: (1) Ejercicio cardiovascular regular (150+ min/semana),
                    (2) Entrenamiento de fuerza 2-3 veces por semana, (3) Déficit calórico moderado (300-500 kcal/día),
                    (4) Dieta rica en fibra y proteína, (5) Reducción de azúcares refinados y alcohol. Consulta nuestra
                    <a href="/tdee/" className="text-blue-600 dark:text-blue-400 hover:underline"> calculadora de TDEE</a> para planificar tu déficit.
                  </p>
                </article>
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿La grasa visceral es más peligrosa que la grasa subcutánea?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Sí.</strong> La grasa visceral es metabólicamente activa y produce sustancias inflamatorias
                    que aumentan el riesgo de enfermedades. La grasa subcutánea es menos activa y menos asociada con
                    complicaciones metabólicas. Por eso es importante evaluar la distribución de grasa, no solo la cantidad total.
                  </p>
                </article>
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo se mide la grasa visceral con precisión?</h4>
                  <p className="text-sm text-muted-foreground">
                    Las técnicas más precisas son: (1) <strong>CT scan</strong> o <strong>MRI</strong> - medición directa,
                    (2) <strong>DEXA</strong> - estimación de composición corporal, (3) <strong>Bioimpedancia avanzada</strong> - estimación indirecta.
                    Las fórmulas utilizadas en esta calculadora proporcionan una estimación útil basada en medidas antropométricas,
                    pero para diagnóstico médico se recomienda usar técnicas de imagen.
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
                  <span><strong><a href="/ci/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora de CI:</a></strong> Complementa el VAT con evaluación de distribución de grasa abdominal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/bri/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora de BRI:</a></strong> Complementa el VAT con predicción de riesgo metabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/whtr/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora de WHtR:</a></strong> Ratio cintura-altura para evaluación de riesgo cardiometabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/grasa-corporal/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora de Grasa Corporal:</a></strong> Porcentaje total de grasa corporal</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/grasa-visceral" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora Grasa Visceral - VAT | Tejido Adiposo Visceral"
              url="https://nutrifit-calculator.com/grasa-visceral/"
              description="Calculadora profesional de grasa visceral con 2 fórmulas científicas. Estima tejido adiposo visceral y predice riesgo metabólico y cardiovascular."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="grasa-visceral" />
          </article>
        </main>
      </Container>
    </>
  );
}

