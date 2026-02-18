'use client';

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeBRI } from '@/lib/formulas';
import { AlertTriangle, Circle, Heart, Info, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function BRIPage() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    waistCircumference: '85',
    gender: 'male' as 'male' | 'female',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeBRI> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.waistCircumference || !formData.age) return;

    try {
      const analysis = analyzeBRI(
        parseFloat(formData.waistCircumference),
        parseFloat(formData.weight),
        parseFloat(formData.height),
        formData.gender,
        parseInt(formData.age)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating BRI:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.waistCircumference && formData.age;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Muy Bajo':
        return 'text-foreground bg-success-subtle border-success';
      case 'Bajo':
        return 'text-foreground bg-info-subtle border-info';
      case 'Moderado':
        return 'text-foreground bg-warning-subtle border-warning';
      case 'Alto':
        return 'text-foreground bg-warning-subtle border-warning';
      case 'Muy Alto':
        return 'text-foreground bg-destructive-subtle border-destructive';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="bri" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora BRI (Índice de Redondez Corporal)
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora de BRI (Body Roundness Index) según fórmula Thomas et al. (2013).
              Predice riesgo metabólico y cardiovascular basándose en la forma corporal. Evaluación de síndrome metabólico y diabetes tipo 2.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>BRI (Body Roundness Index)</strong> es un índice desarrollado por Thomas et al. en 2013
                que predice riesgo metabólico y cardiovascular basándose en la forma corporal. A diferencia del IMC,
                el BRI incorpora la circunferencia de cintura para estimar la "redondez" del cuerpo, proporcionando
                información sobre la distribución de grasa abdominal y el riesgo de síndrome metabólico.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                El BRI es complementario al <a href="/absi/" className="text-info hover:underline transition-colors">ABSI</a> y otros
                índices de forma corporal. Mientras que el ABSI predice mortalidad, el BRI se enfoca específicamente
                en riesgo metabólico y cardiovascular, siendo especialmente útil para identificar individuos con riesgo
                de síndrome metabólico, diabetes tipo 2 y enfermedad cardiovascular.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de BRI">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  Calculadora de BRI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> El BRI requiere circunferencia de cintura medida a nivel del ombligo.
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
                    Calcular BRI
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
                  Resultados de BRI
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* BRI Principal */}
                  <div className={`text-center card-golden border-2 rounded-lg p-6 ${getRiskColor(result.riskCategory)}`}>
                    <div className="text-5xl font-bold mb-2">
                      {result.bri.toFixed(2)}
                    </div>
                    <div className="text-xl font-semibold mb-1">
                      BRI (Body Roundness Index)
                    </div>
                    <div className="text-lg font-bold mb-2">
                      Riesgo: {result.riskCategory}
                    </div>
                    <p className="text-sm opacity-90">
                      {result.briInterpretation}
                    </p>
                  </div>

                  {/* Información de Riesgo */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-accent">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Riesgo Metabólico
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-warning mb-1">
                          {result.metabolicRisk}
                        </div>
                        <p className="text-xs text-warning">
                          Basado en forma corporal y distribución de grasa
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-destructive-subtle">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                          <Heart className="w-4 h-4 mr-2" />
                          Riesgo Cardiovascular
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-destructive mb-1">
                          {result.cardiovascularRisk}
                        </div>
                        <p className="text-xs text-destructive">
                          Evaluación de riesgo de enfermedad cardiovascular
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Estado de Salud */}
                  <Card className={`border-l-4 ${getRiskColor(result.riskCategory)}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Circle className="w-5 h-5 mr-2" />
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
                              <div className="font-bold text-lg text-info">
                                {metric.value.toFixed(metric.metric === 'BRI' ? 2 : metric.metric === 'WHtR' ? 2 : 1)}
                              </div>
                              {metric.metric !== 'BRI' && (
                                <div className="text-xs text-muted-foreground">
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
                    <Card className="bg-destructive-subtle border-l-4 border-destructive">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Factores de Riesgo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start text-sm text-foreground/90">
                              <span className="text-destructive mr-2">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Estrategias de Mejora */}
                  {result.improvementStrategies.length > 0 && (
                    <Card className="bg-success-subtle border-l-4 border-success">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                          <TrendingDown className="w-5 h-5 mr-2" />
                          Estrategias para Mejorar tu BRI
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.improvementStrategies.map((strategy, index) => (
                            <li key={index} className="flex items-start text-sm text-foreground/90">
                              <span className="text-success mr-2">•</span>
                              <span>{strategy}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recomendaciones */}
                  <Card className="bg-warning-subtle border-l-4 border-warning">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                        <Info className="w-5 h-5 mr-2" />
                        Recomendaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-sm text-foreground/90">
                            <span className="text-warning mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Importante:</strong> El BRI es una herramienta de evaluación de riesgo, no un diagnóstico médico.
                      Si tu BRI indica riesgo elevado, consulta con un profesional de la salud para evaluación completa
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
                ¿Por qué el BRI predice riesgo metabólico y cardiovascular?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El Body Roundness Index (BRI) fue desarrollado por Thomas et al. en 2013 para evaluar la forma corporal
                y predecir riesgo metabólico. A diferencia del IMC, el BRI incorpora la circunferencia de cintura para
                estimar la "redondez" del cuerpo, proporcionando información sobre la distribución de grasa abdominal.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Ventajas del BRI
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Riesgo metabólico:</strong> Predice síndrome metabólico según <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3696911/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios de Thomas et al.</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Riesgo cardiovascular:</strong> Asociado con enfermedad cardiovascular y diabetes</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Forma corporal:</strong> Evalúa la "redondez" del cuerpo basándose en geometría</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Complementario:</strong> Funciona bien junto con <a href="/absi/" className="text-info hover:underline transition-colors">ABSI</a> y otros índices</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Validación científica:</strong> Validado en múltiples poblaciones y estudios</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Fácil de calcular:</strong> Solo requiere cintura y altura</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación del BRI
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-success">BRI &lt; 3 (Muy Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo metabólico y cardiovascular muy bajo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-info">BRI 3-5 (Bajo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo bajo, forma corporal saludable</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">BRI 5-8 (Moderado):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo moderado, requiere monitoreo</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-warning">BRI 8-12 (Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo elevado, requiere intervención</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-destructive">BRI &gt; 12 (Muy Alto):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Riesgo muy elevado, requiere atención médica</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                BRI y Síndrome Metabólico
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Componentes del síndrome metabólico:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• <strong>Obesidad abdominal:</strong> BRI evalúa esto directamente</li>
                    <li>• <strong>Hipertensión:</strong> Mayor riesgo con BRI elevado</li>
                    <li>• <strong>Glucosa elevada:</strong> Resistencia a insulina asociada</li>
                    <li>• <strong>Triglicéridos altos:</strong> Dislipidemia relacionada</li>
                    <li>• <strong>HDL bajo:</strong> Colesterol bueno reducido</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">BRI como predictor:</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• BRI &gt; 8 predice síndrome metabólico con alta sensibilidad</li>
                    <li>• Complementa evaluación de presión arterial y glucosa</li>
                    <li>• Útil para screening poblacional de riesgo metabólico</li>
                    <li>• Puede identificar riesgo antes que aparezcan síntomas</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Fórmula Científica del BRI
              </h3>
              <div className="bg-card p-4 rounded-lg border-2 border-info">
                <h4 className="font-semibold text-foreground mb-2">Fórmula BRI (Thomas et al., 2013):</h4>
                <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                  <p>BRI = 364.2 - 365.5 × √(1 - (WC/(2π))² / (0.5 × height)²)</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Donde:
                  <br />• WC = Circunferencia de cintura (en metros)
                  <br />• height = Altura (en metros)
                  <br />• π = Pi (3.14159...)
                  <br />
                  <br />El BRI estima la "redondez" del cuerpo basándose en la relación entre la circunferencia de cintura
                  y la altura, proporcionando una medida de la forma corporal que predice riesgo metabólico.
                </p>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre BRI</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre BRI y ABSI?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Ambos evalúan la forma corporal, pero tienen enfoques diferentes. El <a href="/absi/" className="text-info hover:underline transition-colors">ABSI</a> predice
                    mortalidad por todas las causas y se enfoca en riesgo de muerte. El BRI predice específicamente riesgo
                    metabólico y cardiovascular, siendo más útil para identificar síndrome metabólico y diabetes. Ambos son
                    complementarios y pueden usarse juntos para una evaluación más completa.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi BRI?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Reducir la circunferencia de cintura es clave. Esto se logra mediante: (1) Ejercicio cardiovascular regular
                    (150+ min/semana), (2) Entrenamiento de fuerza 2-3 veces por semana, (3) Déficit calórico moderado
                    (300-500 kcal/día), (4) Dieta rica en fibra y proteína, (5) Reducción de azúcares refinados y carbohidratos
                    procesados. Consulta nuestra <a href="/tdee/" className="text-info hover:underline transition-colors">calculadora de TDEE</a> para planificar tu déficit.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿El BRI reemplaza al IMC?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <strong>No.</strong> El BRI complementa al IMC. Mientras que el IMC evalúa peso corporal general,
                    el BRI proporciona información sobre distribución de grasa y riesgo metabólico. Ambos índices juntos
                    ofrecen una evaluación más completa. Consulta también nuestra <a href="/imc/" className="text-info hover:underline transition-colors">calculadora de IMC</a>.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Calculadoras relacionadas para evaluación completa
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/absi/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de ABSI:</a></strong> Complementa el BRI con predicción de mortalidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de IMC:</a></strong> Complementa el BRI con evaluación de peso corporal general</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whtr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de WHtR:</a></strong> Ratio cintura-altura para evaluación de riesgo cardiometabólico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/whr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de WHR:</a></strong> Ratio cintura-cadera para análisis de distribución de grasa</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/bri" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora BRI - Body Roundness Index | Riesgo Metabólico"
              url="https://nutrifit-calculator.com/bri/"
              description="Calculadora profesional de BRI según fórmula Thomas. Predice riesgo metabólico y cardiovascular basándose en la forma corporal."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="bri" />
          </article>
        </main>
      </Container>
    </>
  );
}

