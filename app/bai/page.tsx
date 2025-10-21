'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdSlot } from '@/components/UnifiedAdSlot';
import { analyzeBAI } from '@/lib/formulas';
import { AlertTriangle, Calculator, Info, Ruler, Scale, Target, Users } from 'lucide-react';
import { useState } from 'react';

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
      <SchemaMarkup calculatorKey="bai" />

      <Container size="xl" className="space-golden-lg">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'BAI (Índice Adiposidad Corporal)', href: '/bai' }
          ]}
        />

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculadora BAI Médica (Índice Adiposidad Corporal)
            </h1>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">
              Calculadora profesional del Índice de Adiposidad Corporal según fórmula Bergman.
              Estima grasa corporal <strong>sin báscula</strong> usando solo circunferencia de cadera y altura.
              Especialmente precisa en mujeres según estudios clínicos.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                El <strong>BAI (Body Adiposity Index)</strong> es una métrica innovadora desarrollada por{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/21304477/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  Bergman et al. (2011)
                </a>{' '}
                que estima el porcentaje de grasa corporal sin necesidad de conocer el peso. Utiliza únicamente la circunferencia
                de la cadera y la altura. Investigaciones en{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3275633/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  poblaciones diversas
                </a>{' '}
                demuestran su alta correlación con métodos de referencia como DEXA.
              </p>
              <p className="text-gray-700 leading-relaxed">
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
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
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
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-600" />
                  Tus Resultados de BAI
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Target className="w-5 h-5 mr-2 text-orange-600" />
                      BAI (Índice de Adiposidad)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">
                      {result.bai.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-blue-600" />
                      Grasa Corporal Estimada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {result.estimatedBodyFat.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className={`mb-6 border-l-4 ${result.healthRisk === 'Bajo' ? 'bg-green-50 border-green-500' :
                result.healthRisk === 'Moderado' ? 'bg-yellow-50 border-yellow-500' :
                  result.healthRisk === 'Alto' ? 'bg-orange-50 border-orange-500' :
                    'bg-red-50 border-red-500'
                }`}>
                <AlertTriangle className={`h-5 w-5 ${result.healthRisk === 'Bajo' ? 'text-green-600' :
                  result.healthRisk === 'Moderado' ? 'text-yellow-600' :
                    result.healthRisk === 'Alto' ? 'text-orange-600' :
                      'text-red-600'
                  }`} />
                <AlertDescription className="ml-2">
                  <strong>Categoría:</strong> {result.category} | <strong>Riesgo de salud:</strong> {result.healthRisk}
                </AlertDescription>
              </Alert>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Interpretación Clínica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{result.clinicalInterpretation}</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Implicaciones Metabólicas:</strong> {result.metabolicImplications}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Ruler className="w-5 h-5 mr-2 text-purple-600" />
                    Recomendaciones Personalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-2 flex-shrink-0">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      Rangos de Referencia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Rango ideal para ti:</strong> {result.idealRange}
                    </p>
                    <p className="text-sm text-gray-600">{result.comparison}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                      Riesgo de Salud
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`px-3 py-2 rounded-lg text-sm font-medium ${result.healthRisk === 'Bajo' ? 'bg-green-100 text-green-800' :
                      result.healthRisk === 'Moderado' ? 'bg-yellow-100 text-yellow-800' :
                        result.healthRisk === 'Alto' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {result.healthRisk}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Espacio para anuncios */}
          <div className="my-12 flex justify-center">
            <AdSlot adSlot="3456789012" adFormat="horizontal" />
          </div>

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Información Completa sobre el BAI
              </h2>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-green-50 border-l-4 border-green-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-green-800 flex items-center">
                    <Scale className="w-5 h-5 mr-2" />
                    Ventajas del BAI
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-green-800">
                    {result?.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-yellow-50 border-l-4 border-yellow-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-yellow-800 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Limitaciones del BAI
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-yellow-800">
                    {result?.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-purple-50 border-l-4 border-purple-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-purple-800 flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  Cómo Medir la Circunferencia de Cadera Correctamente
                </h3>
              </header>
              <div className="p-6">
                <div className="space-y-4 text-purple-700">
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
                  <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                    <p className="text-sm">
                      📏 <strong>Consejo profesional:</strong>{' '}
                      <a href="https://www.cdc.gov/healthyweight/assessing/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        Protocolo CDC
                      </a>{' '}
                      - Realiza 2-3 mediciones y usa el promedio para mayor precisión
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-blue-800 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Fórmula Científica del BAI
                </h3>
              </header>
              <div className="p-6">
                <div className="bg-white p-6 rounded-lg mb-4 font-mono text-center border-2 border-blue-200">
                  <div className="text-lg mb-2">BAI = (Circunferencia cadera en cm) / (Altura en m)<sup>1.5</sup> - 18</div>
                  <div className="text-sm text-gray-600 mt-2">Bergman et al. (2011) - Obesity Journal</div>
                </div>
                <div className="space-y-3 text-sm text-blue-800">
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
                    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3275633/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
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

            <section className="card-golden-lg bg-orange-50 border-l-4 border-orange-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-orange-800">
                  Complementa tu análisis de composición corporal
                </h3>
              </header>
              <div className="p-6">
                <ul className="space-y-3 text-orange-800">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/fmi" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu FMI con peso:
                        </a>
                      </strong>{' '}
                      Índice de masa grasa cuando sí conoces tu peso corporal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/whr" className="text-blue-600 hover:underline font-medium transition-golden">
                          Evalúa tu WHR:
                        </a>
                      </strong>{' '}
                      Ratio cintura-cadera para evaluar distribución de grasa
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium transition-golden">
                          Mide grasa por pliegues:
                        </a>
                      </strong>{' '}
                      Método Jackson-Pollock con calibrador para mayor precisión
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu IMC:
                        </a>
                      </strong>{' '}
                      Índice básico de masa corporal para contexto general
                    </span>
                  </li>
                </ul>
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
            url="https://nutrifit-calculator.com/bai"
            description="Calcula tu porcentaje de grasa corporal sin báscula con la fórmula Bergman. Estimación precisa usando solo cadera y altura. ¡Totalmente gratis!"
          />
        </main>
      </Container>
    </>
  );
}

