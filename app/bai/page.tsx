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
import { analyzeBAI } from '@/lib/formulas';
import { AlertTriangle, Calculator, Info, Ruler, Scale, Target, Users } from 'lucide-react';
import { useState } from 'react';

const BAI_ADVANTAGES = [
  'No requiere conocer el peso corporal',
  'Útil cuando no hay acceso a báscula',
  'Correlaciona bien con DEXA en ciertos grupos étnicos',
  'Especialmente preciso en mujeres afrodescendientes',
  'Simple de calcular con solo cinta métrica',
];

const BAI_LIMITATIONS = [
  'Menor precisión en hombres que en mujeres',
  'Puede sobreestimar grasa en atletas musculosos',
  'Varía según grupo étnico y edad',
  'No distingue entre grasa visceral y subcutánea',
  'Menos validado que métodos tradicionales como IMC',
];

export default function BAIPage() {
  const [hipCircumference, setHipCircumference] = useState<string>('95');
  const [height, setHeight] = useState<string>('170');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [result, setResult] = useState<ReturnType<typeof analyzeBAI> | null>(null);

  const calculateBAI = () => {
    if (!hipCircumference || !height) {
      return;
    }

    const hipCirc = parseFloat(hipCircumference);
    const heightVal = parseFloat(height);

    if (hipCirc <= 0 || heightVal <= 0) {
      return;
    }

    const analysis = analyzeBAI(hipCirc, heightVal, gender);
    setResult(analysis);
  };

  return (
    <>
      <CalculatorBreadcrumbs calculatorKey="bai" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora BAI (Grasa Corporal Sin Báscula)
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu grasa corporal sin necesidad de báscula usando el BAI (Índice de Adiposidad Corporal).
              Solo necesitas tu altura y circunferencia de cadera.
              Especialmente precisa para mujeres. Alternativa práctica al IMC.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>BAI (Body Adiposity Index)</strong> es una métrica innovadora desarrollada por{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/21304477/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">
                  Bergman et al. (2011)
                </a>{' '}
                que estima el porcentaje de grasa corporal sin necesidad de conocer el peso. Utiliza únicamente la circunferencia
                de la cadera y la altura. Investigaciones en{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3275633/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">
                  poblaciones diversas
                </a>{' '}
                demuestran su alta correlación con métodos de referencia como DEXA.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A diferencia del IMC que requiere peso y puede confundir músculo con grasa, el BAI proporciona una estimación
                directa del porcentaje de adiposidad, siendo particularmente útil cuando no se dispone de báscula o para
                seguimiento de cambios en composición corporal.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de BAI">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-foreground">
                  Calculadora de Índice de Adiposidad Corporal
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Estima tu porcentaje de grasa corporal sin báscula
                </p>
              </CardHeader>
              <CardContent className="space-golden-md">
                <SelectInput
                  id="gender"
                  label="Sexo biológico"
                  value={gender}
                  onChange={(value) => setGender(value as 'male' | 'female')}
                  options={[
                    { value: 'male', label: 'Hombre' },
                    { value: 'female', label: 'Mujer' }
                  ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NumberInput
                    id="hipCircumference"
                    label="Circunferencia de cadera"
                    value={hipCircumference}
                    onChange={setHipCircumference}
                    placeholder="95"
                    unit="cm"
                    min={60}
                    max={200}
                    step={0.5}
                  />

                  <NumberInput
                    id="height"
                    label="Altura"
                    value={height}
                    onChange={setHeight}
                    placeholder="170"
                    unit="cm"
                    min={120}
                    max={250}
                    step={0.5}
                  />
                </div>

                <Button
                  type="button"
                  onClick={calculateBAI}
                  className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calcular BAI
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Resultados */}
          {result && (
            <section className="space-golden-lg border-t pt-8">
              <header className="mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                  <Target className="w-6 h-6 mr-2 text-warning" />
                  Tus Resultados de BAI
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Target className="w-5 h-5 mr-2 text-warning" />
                      BAI (Índice de Adiposidad)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-warning">
                      {result.bai.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-info" />
                      Grasa Corporal Estimada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-info">
                      {result.estimatedBodyFat.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className={`mb-6 border-l-4 ${result.healthRisk === 'Bajo' ? 'bg-success-subtle border-success' :
                result.healthRisk === 'Moderado' ? 'bg-warning-subtle border-warning' :
                  result.healthRisk === 'Alto' ? 'bg-warning-subtle border-warning' :
                    'bg-destructive-subtle border-destructive'
                }`}>
                <AlertTriangle className={`h-5 w-5 ${result.healthRisk === 'Bajo' ? 'text-success' :
                  result.healthRisk === 'Moderado' ? 'text-warning' :
                    result.healthRisk === 'Alto' ? 'text-warning' :
                      'text-destructive'
                  }`} />
                <AlertDescription className="ml-2">
                  <strong>Categoría:</strong> {result.category} | <strong>Riesgo de salud:</strong> {result.healthRisk}
                </AlertDescription>
              </Alert>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Info className="w-5 h-5 mr-2 text-info" />
                    Interpretación Clínica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{result.clinicalInterpretation}</p>
                  <div className="mt-4 p-4 bg-info-subtle rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Implicaciones Metabólicas:</strong> {result.metabolicImplications}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Ruler className="w-5 h-5 mr-2 text-warning" />
                    Recomendaciones Personalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-warning mr-2 flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="w-5 h-5 mr-2 text-success" />
                      Rangos de Referencia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Rango ideal para ti:</strong> {result.idealRange}
                    </p>
                    <p className="text-sm text-muted-foreground">{result.comparison}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                      Riesgo de Salud
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`px-3 py-2 rounded-lg text-sm font-medium ${result.healthRisk === 'Bajo' ? 'bg-success-subtle text-foreground/90' :
                      result.healthRisk === 'Moderado' ? 'bg-warning-subtle text-foreground/90' :
                        result.healthRisk === 'Alto' ? 'bg-warning-subtle text-foreground/90' :
                          'bg-destructive-subtle text-foreground/90'
                      }`}>
                      {result.healthRisk}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Información Completa sobre el BAI
              </h2>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Scale className="w-5 h-5 mr-2" />
                    Ventajas del BAI
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    {(result?.advantages ?? BAI_ADVANTAGES).map((advantage, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Desventajas / Limitaciones del BAI
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    {(result?.limitations ?? BAI_LIMITATIONS).map((limitation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  Cómo Medir la Circunferencia de Cadera Correctamente
                </h3>
              </header>
              <div className="p-6">
                <div className="space-y-4 text-warning">
                  <div className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <div>
                      <p className="font-semibold">Ubicación correcta</p>
                      <p className="text-sm">Mide en el punto más ancho de las caderas/glúteos, generalmente a nivel del hueso púbico</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <div>
                      <p className="font-semibold">Posición del cuerpo</p>
                      <p className="text-sm">Párate erguido con pies juntos y glúteos relajados</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <div>
                      <p className="font-semibold">Uso de la cinta métrica</p>
                      <p className="text-sm">Cinta horizontal paralela al suelo, sin comprimir la piel pero ajustada</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-2">4.</span>
                    <div>
                      <p className="font-semibold">Momento de medición</p>
                      <p className="text-sm">Preferiblemente por la mañana, en ayunas, después de ir al baño</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-warning-subtle rounded-lg">
                    <p className="text-sm">
                      📏 <strong>Consejo profesional:</strong>{' '}
                      <a href="https://www.cdc.gov/healthyweight/assessing/index.html" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">
                        Protocolo CDC
                      </a>{' '}
                      - Realiza 2-3 mediciones y usa el promedio para mayor precisión
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Fórmula Científica del BAI
                </h3>
              </header>
              <div className="p-6">
                <div className="bg-card p-6 rounded-lg mb-4 font-mono text-center border-2 border-info">
                  <div className="text-lg mb-2">BAI = (Circunferencia cadera en cm) / (Altura en m)<sup>1.5</sup> - 18</div>
                  <div className="text-sm text-muted-foreground mt-2">Bergman et al. (2011) - Obesity Journal</div>
                </div>
                <div className="space-y-3 text-sm text-foreground/90">
                  <p>
                    <strong>📊 Origen científico:</strong> Desarrollado en la Universidad de California (USC) analizando más de 1,700 individuos
                    con mediciones DEXA de referencia
                  </p>
                  <p>
                    <strong>🔬 Validación:</strong> Correlación r = 0.85 con porcentaje de grasa corporal por DEXA en mujeres afroamericanas e hispanas
                  </p>
                  <p>
                    <strong>⚕️ Uso clínico:</strong> Especialmente útil en poblaciones sin acceso a básculas o equipamiento sofisticado.
                    Estudios en{' '}
                    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3275633/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">
                      validación multicéntrica
                    </a>{' '}
                    confirman su utilidad clínica
                  </p>
                  <p>
                    <strong>📈 Precisión:</strong> Mayor precisión en mujeres que en hombres; varía según etnia y edad
                  </p>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90">
                  Complementa tu análisis de composición corporal
                </h3>
              </header>
              <div className="p-6">
                <ul className="space-y-3 text-foreground/90">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/fmi/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Calcula tu FMI con peso:
                        </a>
                      </strong>{' '}
                      Índice de masa grasa cuando sí conoces tu peso corporal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/whr/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Evalúa tu WHR:
                        </a>
                      </strong>{' '}
                      Ratio cintura-cadera para evaluar distribución de grasa
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Mide grasa por pliegues:
                        </a>
                      </strong>{' '}
                      Método Jackson-Pollock con calibrador para mayor precisión
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">
                          Calcula tu IMC:
                        </a>
                      </strong>{' '}
                      Índice básico de masa corporal para contexto general
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre BAI</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo estima el BAI la grasa corporal sin báscula?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El BAI (Body Adiposity Index) usa solo la circunferencia de cadera y la altura para estimar
                    el porcentaje de grasa corporal. Fue desarrollado por Bergman et al. (2011) como alternativa al IMC que no requiere peso.
                    Si dispones de báscula, puedes obtener mayor precisión con nuestra
                    <a href="/grasa-corporal/" className="text-info hover:underline transition-colors">calculadora de grasa corporal</a> por pliegues cutáneos.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué tan preciso es el BAI?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El BAI tiene una precisión moderada (±3-5%) y funciona mejor en mujeres que en hombres.
                    Es útil cuando no se dispone de báscula, pero los métodos de pliegues cutáneos o bioimpedancia son más precisos.
                    Para un análisis más completo, combina con el <a href="/fmi/" className="text-info hover:underline transition-colors">índice de masa grasa (FMI)</a> y
                    el <a href="/imc/" className="text-info hover:underline transition-colors">IMC</a>.
                  </p>
                </article>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="bai" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora BAI Médica - Índice de Adiposidad Corporal"
            url="https://nutrifit-calculator.com/bai/"
            description="Calcula tu porcentaje de grasa corporal sin báscula con la fórmula Bergman. Estimación precisa usando solo cadera y altura. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="bai" />
        </main>
      </Container>
    </>
  );
}

