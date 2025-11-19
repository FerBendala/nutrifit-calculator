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
import { analyzeConicityIndex } from '@/lib/formulas';
import { AlertTriangle, Gauge, Heart, Info, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function CIPage() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    waistCircumference: '85',
    gender: 'male' as 'male' | 'female',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeConicityIndex> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.waistCircumference || !formData.age) return;

    try {
      const analysis = analyzeConicityIndex(
        parseFloat(formData.waistCircumference),
        parseFloat(formData.weight),
        parseFloat(formData.height),
        formData.gender,
        parseInt(formData.age)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating CI:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.waistCircumference && formData.age;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Muy Bajo':
        return 'text-green-700 bg-green-50 border-green-400';
      case 'Bajo':
        return 'text-blue-700 bg-blue-50 border-blue-400';
      case 'Moderado':
        return 'text-yellow-700 bg-yellow-50 border-yellow-400';
      case 'Alto':
        return 'text-orange-700 bg-orange-50 border-orange-400';
      case 'Muy Alto':
        return 'text-red-700 bg-red-50 border-red-400';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-400';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="ci" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora CI Médica
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de CI (Conicity Index) según fórmula Valdez (1991).
              Evalúa distribución de grasa abdominal y predice riesgo cardiovascular y metabólico.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                El <strong>CI (Conicity Index)</strong> es un índice desarrollado por Valdez en 1991
                que evalúa la distribución de grasa abdominal comparando la circunferencia de cintura
                con la circunferencia esperada de un cilindro con el mismo peso y altura. A diferencia
                del IMC, el CI proporciona información específica sobre la forma corporal y la distribución
                de grasa, siendo especialmente útil para identificar riesgo cardiovascular y metabólico.
              </p>
              <p className="text-gray-700 leading-relaxed">
                El CI es complementario a otros índices de forma corporal como <a href="/absi" className="text-blue-600 hover:underline">ABSI</a>,
                <a href="/bri" className="text-blue-600 hover:underline">BRI</a>, <a href="/whtr" className="text-blue-600 hover:underline">WHtR</a> y <a href="/whr" className="text-blue-600 hover:underline">WHR</a>.
                Es ampliamente utilizado en estudios epidemiológicos y proporciona una evaluación precisa
                del riesgo de síndrome metabólico, diabetes tipo 2 y enfermedad cardiovascular.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de CI">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  Calculadora de CI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        <strong>Nota:</strong> El CI requiere circunferencia de cintura medida a nivel del ombligo.
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
                    Calcular CI
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
                  Resultados de CI
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* CI Principal */}
                  <div className={`text-center card-golden border-2 rounded-lg p-6 ${getRiskColor(result.riskCategory)}`}>
                    <div className="text-5xl font-bold mb-2">
                      {result.ci.toFixed(3)}
                    </div>
                    <div className="text-xl font-semibold mb-1">
                      CI (Conicity Index)
                    </div>
                    <div className="text-lg font-bold mb-2">
                      Riesgo: {result.riskCategory}
                    </div>
                    <p className="text-sm opacity-90">
                      {result.ciInterpretation}
                    </p>
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
                        <div className="text-lg font-bold text-purple-700 mb-1">
                          {result.metabolicRisk}
                        </div>
                        <p className="text-xs text-purple-600">
                          Basado en distribución de grasa abdominal
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
                        <div className="text-lg font-bold text-red-700 mb-1">
                          {result.cardiovascularRisk}
                        </div>
                        <p className="text-xs text-red-600">
                          Evaluación de riesgo de enfermedad cardiovascular
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Estado de Salud */}
                  <Card className={`border-l-4 ${getRiskColor(result.riskCategory)}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Gauge className="w-5 h-5 mr-2" />
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
                                {metric.value.toFixed(metric.metric === 'CI' ? 3 : metric.metric === 'WHtR' ? 2 : 1)}
                              </div>
                              {metric.metric !== 'CI' && (
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

                  {/* Factores de Riesgo */}
                  {result.riskFactors.length > 0 && (
                    <Card className="bg-red-50 border-l-4 border-red-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-red-900">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Factores de Riesgo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start text-sm text-red-800">
                              <span className="text-red-600 mr-2">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Estrategias de Mejora */}
                  {result.improvementStrategies.length > 0 && (
                    <Card className="bg-green-50 border-l-4 border-green-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-green-900">
                          <TrendingDown className="w-5 h-5 mr-2" />
                          Estrategias para Mejorar tu CI
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.improvementStrategies.map((strategy, index) => (
                            <li key={index} className="flex items-start text-sm text-green-800">
                              <span className="text-green-600 mr-2">•</span>
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
                      <strong>Importante:</strong> El CI es una herramienta de evaluación de riesgo, no un diagnóstico médico.
                      Si tu CI indica riesgo elevado, consulta con un profesional de la salud para evaluación completa
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
                ¿Por qué el CI evalúa distribución de grasa abdominal?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El Conicity Index (CI) fue desarrollado por Valdez en 1991 para evaluar la distribución de grasa abdominal
                comparando la circunferencia de cintura con la circunferencia esperada de un cilindro con el mismo peso y altura.
                Es ampliamente utilizado en estudios epidemiológicos y proporciona una evaluación precisa del riesgo cardiovascular
                y metabólico.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Ventajas del CI
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Distribución de grasa:</strong> Evalúa específicamente la distribución de grasa abdominal según <a href="https://pubmed.ncbi.nlm.nih.gov/2049778/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">Valdez (1991)</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 mr-2">•</span>
                    <span><strong>Riesgo cardiovascular:</strong> Predice enfermedad cardiovascular y síndrome metabólico</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Validación epidemiológica:</strong> Ampliamente utilizado en estudios poblacionales</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Complementario:</strong> Funciona bien junto con <a href="/absi" className="text-blue-600 hover:underline">ABSI</a>, <a href="/bri" className="text-blue-600 hover:underline">BRI</a> y otros índices</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Fácil de calcular:</strong> Solo requiere cintura, peso y altura</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span><strong>Interpretación clara:</strong> CI &gt; 1.25 indica riesgo elevado</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del CI
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-green-700">CI &lt; 1.18 (Muy Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Distribución de grasa muy favorable, riesgo muy bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-blue-700">CI 1.18-1.25 (Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Distribución de grasa saludable, riesgo bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-yellow-700">CI 1.25-1.30 (Moderado):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo moderado, requiere monitoreo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-orange-700">CI 1.30-1.35 (Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo elevado, requiere intervención</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-red-700">CI &gt; 1.35 (Muy Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo muy elevado, requiere atención médica</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-purple-50 card-golden-lg border-l-4 border-purple-400 mb-[2.618rem]">
              <h3 className="font-bold text-purple-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                CI y Síndrome Metabólico
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Componentes del síndrome metabólico:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Obesidad abdominal:</strong> CI evalúa esto directamente</li>
                    <li>• <strong>Hipertensión:</strong> Mayor riesgo con CI elevado</li>
                    <li>• <strong>Glucosa elevada:</strong> Resistencia a insulina asociada</li>
                    <li>• <strong>Triglicéridos altos:</strong> Dislipidemia relacionada</li>
                    <li>• <strong>HDL bajo:</strong> Colesterol bueno reducido</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">CI como predictor:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• CI &gt; 1.25 predice síndrome metabólico con alta sensibilidad</li>
                    <li>• Complementa evaluación de presión arterial y glucosa</li>
                    <li>• Útil para screening poblacional de riesgo metabólico</li>
                    <li>• Puede identificar riesgo antes que aparezcan síntomas</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmula Científica del CI
              </h3>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Fórmula CI (Valdez, 1991):</h4>
                <div className="font-mono text-sm mb-2 bg-gray-50 p-3 rounded">
                  <p>CI = WC / (0.109 × √(weight/height))</p>
                </div>
                <p className="text-sm text-gray-700">
                  Donde:
                  <br />• WC = Circunferencia de cintura (en metros)
                  <br />• weight = Peso (en kg)
                  <br />• height = Altura (en metros)
                  <br />
                  <br />El CI compara la circunferencia de cintura observada con la circunferencia esperada de un cilindro
                  con el mismo peso y altura. Un CI &gt; 1.25 indica que la cintura es mayor de lo esperado, sugiriendo
                  acumulación de grasa abdominal y mayor riesgo cardiovascular.
                </p>
              </div>
            </section>

            <section className="space-y-4 mb-[2.618rem]">
              <h3 className="text-lg font-medium">❓ Preguntas frecuentes sobre CI</h3>
              <div className="space-y-3">
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cuál es la diferencia entre CI y otros índices de forma corporal?</h4>
                  <p className="text-sm text-muted-foreground">
                    El CI evalúa específicamente la distribución de grasa abdominal comparando la cintura con la esperada
                    para un cilindro. El <a href="/absi" className="text-blue-600 hover:underline">ABSI</a> predice mortalidad,
                    el <a href="/bri" className="text-blue-600 hover:underline">BRI</a> predice riesgo metabólico, y el CI
                    evalúa distribución de grasa. Todos son complementarios y pueden usarse juntos para una evaluación más completa.
                  </p>
                </article>
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo puedo mejorar mi CI?</h4>
                  <p className="text-sm text-muted-foreground">
                    Reducir la circunferencia de cintura es clave. Esto se logra mediante: (1) Ejercicio cardiovascular regular
                    (150+ min/semana), (2) Entrenamiento de fuerza 2-3 veces por semana, (3) Déficit calórico moderado
                    (300-500 kcal/día), (4) Dieta rica en fibra y proteína, (5) Reducción de azúcares refinados. Consulta nuestra
                    <a href="/tdee" className="text-blue-600 hover:underline"> calculadora de TDEE</a> para planificar tu déficit.
                  </p>
                </article>
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿El CI reemplaza al IMC?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>No.</strong> El CI complementa al IMC. Mientras que el IMC evalúa peso corporal general,
                    el CI proporciona información sobre distribución de grasa abdominal. Ambos índices juntos ofrecen
                    una evaluación más completa. Consulta también nuestra <a href="/imc" className="text-blue-600 hover:underline">calculadora de IMC</a>.
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
                  <span><strong><a href="/absi" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de ABSI:</a></strong> Complementa el CI con predicción de mortalidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/bri" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de BRI:</a></strong> Complementa el CI con predicción de riesgo metabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/whtr" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de WHtR:</a></strong> Ratio cintura-altura para evaluación de riesgo cardiometabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/whr" className="text-blue-600 hover:underline font-medium transition-golden">Calculadora de WHR:</a></strong> Ratio cintura-cadera para análisis de distribución de grasa</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/ci" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora CI - Conicity Index | Distribución Grasa Abdominal"
              url="https://nutrifit-calculator.com/ci"
              description="Calculadora profesional de CI según fórmula Valdez. Evalúa distribución de grasa abdominal y predice riesgo cardiovascular y metabólico."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="ci" />
          </article>
        </main>
      </Container>
    </>
  );
}

