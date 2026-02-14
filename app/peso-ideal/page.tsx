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
import { calculateIdealWeight, type IdealWeightResult } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function PesoIdealPage() {
  const [formData, setFormData] = useState({
    sex: 'male',
    height: '',
    weight: ''
  });

  const [result, setResult] = useState<IdealWeightResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, height, weight } = formData;

    if (!height || !weight) return;

    try {
      const idealWeightResult = calculateIdealWeight(
        parseInt(height),
        parseFloat(weight),
        sex as 'male' | 'female'
      );

      setResult(idealWeightResult);
    } catch (error) {
      console.error('Error calculating ideal weight:', error);
    }
  };

  const isFormValid = formData.height && formData.weight;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'underweight': return 'text-blue-600 dark:text-blue-400';
      case 'normal': return 'text-green-600 dark:text-green-400';
      case 'overweight': return 'text-yellow-600 dark:text-yellow-400';
      case 'obese': return 'text-red-600 dark:text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'underweight': return <Info className="w-5 h-5" />;
      case 'normal': return <CheckCircle className="w-5 h-5" />;
      case 'overweight': return <AlertCircle className="w-5 h-5" />;
      case 'obese': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'underweight': return 'Bajo peso';
      case 'normal': return 'Peso normal';
      case 'overweight': return 'Sobrepeso';
      case 'obese': return 'Obesidad';
      default: return 'Desconocido';
    }
  };

  const jsonLd = generateJsonLd('peso-ideal');

  return (
    <>
      <SchemaMarkup calculatorKey="peso-ideal" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Peso Ideal
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu peso ideal según tu altura con 5 fórmulas científicas diferentes.
              Compara resultados y descubre tu rango de peso saludable con resultados personalizados al instante.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de peso ideal">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center">
                  <span className="text-3xl mr-3">⚖️</span>
                  Calculadora de Peso Ideal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="sex"
                      label="Sexo"
                      value={formData.sex}
                      onChange={handleInputChange('sex')}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                    />
                    <NumberInput
                      id="height"
                      label="Altura"
                      value={formData.height}
                      onChange={handleInputChange('height')}
                      placeholder="170"
                      min={100}
                      max={250}
                      unit="cm"
                      required
                    />
                  </div>

                  <NumberInput
                    id="weight"
                    label="Peso actual"
                    value={formData.weight}
                    onChange={handleInputChange('weight')}
                    placeholder="70.0"
                    min={30}
                    max={300}
                    step={0.1}
                    unit="kg"
                    required
                  />

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Calcular Peso Ideal
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Tu Análisis de Peso Ideal
                </h2>
              </header>
              <div className="p-6">
                <div className="text-center space-golden-md">
                  <div className="space-golden-sm">
                    <div className={`flex items-center justify-center gap-3 mb-3 ${getStatusColor(result.status)}`}>
                      {getStatusIcon(result.status)}
                      <span className="text-3xl font-bold">{getStatusLabel(result.status)}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-[0.618rem]">
                      {result.average} kg
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Peso ideal promedio | IMC actual: {result.currentBmi}
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] mt-[2.618rem]">
                    <article className="card-golden">
                      <h3 className="font-bold mb-[1.618rem] text-lg">📊 Fórmulas Científicas:</h3>
                      <div className="space-golden-xs text-base">
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Robinson (1983):</span>
                          <span className="text-blue-600 dark:text-blue-400 font-bold">{result.robinson} kg</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Miller (1983):</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">{result.miller} kg</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Devine (1974):</span>
                          <span className="text-purple-600 dark:text-purple-400 font-bold">{result.devine} kg</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Hamwi (1964):</span>
                          <span className="text-orange-600 dark:text-orange-400 font-bold">{result.hamwi} kg</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem]">
                          <span className="font-medium">Peterson (2016):</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">{result.peterson} kg</span>
                        </div>
                      </div>
                    </article>

                    <article className="card-golden">
                      <h3 className="font-bold mb-[1.618rem] text-lg">📏 Rangos de Referencia:</h3>
                      <div className="space-golden-xs text-base">
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Rango ideal (±10%):</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">{result.range.min} - {result.range.max} kg</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                          <span className="font-medium">Rango BMI saludable:</span>
                          <span className="text-blue-600 dark:text-blue-400 font-bold">{result.bmiRange.min} - {result.bmiRange.max} kg</span>
                        </div>
                        <div className="flex justify-between py-[0.382rem]">
                          <span className="font-medium">Tu peso actual:</span>
                          <span className="text-muted-foreground font-bold">{formData.weight} kg</span>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div className="mt-[2.618rem] p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el Peso Ideal? Fórmulas científicas reconocidas
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El peso ideal es un concepto que se refiere al peso corporal que se considera óptimo
                para una persona según su altura, edad, sexo y estructura corporal. Aunque no existe
                un peso &quot;perfecto&quot; único, las <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">fórmulas científicas</a> nos ayudan a establecer rangos
                saludables de referencia basados en estudios epidemiológicos.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🧮</span>
                  Fórmulas Utilizadas
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span><strong>Robinson (1983):</strong> Ampliamente utilizada en aplicaciones médicas</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><strong>Miller (1983):</strong> Popular en estudios epidemiológicos</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><strong>Devine (1974):</strong> Utilizada en cálculo de dosis de medicamentos</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong>Hamwi (1964):</strong> Fórmula clásica del ámbito médico estadounidense</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                    <span><strong>Peterson (2016):</strong> La más moderna y considerada más precisa</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Factores que Influyen
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Altura y estructura ósea</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4855948/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Composición corporal</a> (músculo vs grasa)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><a href="https://www.acsm.org/read-research/trending-topics-resource-pages/physical-activity-guidelines" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Nivel de actividad física</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span>Genética y hormonas individuales</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Fórmulas Científicas Detalladas
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <span className="text-lg mr-2">📚</span>
                    Fórmulas Clásicas:
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      <span><strong>Robinson (1983):</strong> <a href="https://pubmed.ncbi.nlm.nih.gov/6865776/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Estudio original</a> - Ampliamente utilizada en aplicaciones médicas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                      <span><strong>Miller (1983):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Estudios epidemiológicos</a> - Coeficientes ligeramente diferentes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                      <span><strong>Devine (1974):</strong> <a href="https://pubmed.ncbi.nlm.nih.gov/4843764/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Referencia médica</a> - Cálculo de dosis de medicamentos</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <span className="text-lg mr-2">⚡</span>
                    Fórmulas Modernas:
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                      <span><strong>Hamwi (1964):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Comparación de fórmulas</a> - Ámbito médico estadounidense</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                      <span><strong>Peterson (2016):</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Estudio de validación</a> - Datos actuales y más precisa</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      <span><strong>Promedio:</strong> Estimación más equilibrada y confiable</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Limitaciones y Consideraciones Importantes
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-yellow-700 dark:text-yellow-300 flex items-center">
                    <span className="text-lg mr-2">🚫</span>
                    Limitaciones:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                      <span>No consideran la composición corporal individual</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                      <span>Pueden no ser apropiadas para atletas o personas muy musculosas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                      <span>No tienen en cuenta condiciones médicas específicas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                      <span>Las fórmulas más antiguas pueden estar desactualizadas</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-yellow-700 dark:text-yellow-300 flex items-center">
                    <span className="text-lg mr-2">💡</span>
                    Recomendaciones:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      <span>Consulta con un <a href="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/healthy-weight/art-20045977" target="_blank" rel="noopener noreferrer" className="text-yellow-700 dark:text-yellow-300 hover:underline font-medium">profesional de la salud</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      <span>Considera múltiples indicadores de salud</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      <span>Evalúa tu <a href="/composicion/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">composición corporal</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                      <span>Establece objetivos realistas y saludables</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="card-golden-lg bg-green-50 dark:bg-green-950/30 border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">❓</span>
                Preguntas Frecuentes sobre el Peso Ideal
              </h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-card/50 mb-[1.618rem]">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300 flex items-center">
                    <span className="text-lg mr-2">🤔</span>
                    ¿Por qué hay diferentes fórmulas de peso ideal?
                  </h4>
                  <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                    Cada fórmula fue desarrollada en diferentes épocas y contextos, con poblaciones
                    de estudio distintas. Algunas se enfocan en aplicaciones médicas, otras en
                    fitness, y cada una tiene sus propias ventajas y limitaciones.
                  </p>
                </article>
                <article className="card-golden bg-card/50 mb-[1.618rem]">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300 flex items-center">
                    <span className="text-lg mr-2">🎯</span>
                    ¿Cuál es la mejor fórmula para mí?
                  </h4>
                  <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                    No existe una fórmula &quot;mejor&quot; universalmente. El promedio de todas las fórmulas
                    suele proporcionar una estimación más equilibrada. Sin embargo, es importante
                    consultar con un profesional de la salud para una evaluación personalizada.
                  </p>
                </article>
                <article className="card-golden bg-card/50 mb-[1.618rem]">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300 flex items-center">
                    <span className="text-lg mr-2">🏥</span>
                    ¿Qué hago si mi peso actual está muy lejos del ideal?
                  </h4>
                  <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                    Si hay una diferencia significativa, es recomendable consultar con un <a href="https://www.cdc.gov/healthyweight/assessing/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">médico</a>,
                    nutricionista o entrenador personal certificado. Ellos pueden ayudarte a
                    desarrollar un plan seguro y efectivo para alcanzar tus objetivos.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300 flex items-center">
                    <span className="text-lg mr-2">⚖️</span>
                    ¿El peso ideal es lo mismo que el peso saludable?
                  </h4>
                  <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                    No exactamente. El peso ideal es una estimación basada en fórmulas matemáticas,
                    mientras que el peso saludable considera factores individuales como composición
                    corporal, salud general, y objetivos personales.
                  </p>
                </article>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="peso-ideal" />

          {/* Sección de navegación mejorada */}
          <section className="bg-orange-50 dark:bg-orange-950/30 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
            <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl">
              Mejora tu evaluación de peso corporal
            </h3>
            <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
              <li className="flex items-start">
                <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span><strong><a href="/peso-ajustado/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula tu Peso Ajustado Clínico:</a></strong> ABW para dosificación de medicamentos y necesidades nutricionales precisas</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span><strong><a href="/imc/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Evalúa tu IMC:</a></strong> Índice de masa corporal para contexto de salud general</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span><strong><a href="/proteina/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula proteína necesaria:</a></strong> Basado en tu peso ideal o ajustado</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span><strong><a href="/bmr/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula tu BMR:</a></strong> Metabolismo basal para planificación calórica precisa</span>
              </li>
            </ul>
          </section>

          {/* Widget para embeber - genera backlinks naturales */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora de Peso Ideal - 5 Fórmulas Científicas"
            url="https://nutrifit-calculator.com/peso-ideal/"
            description="Calcula tu peso ideal con 5 fórmulas científicas reconocidas. Robinson, Miller, Devine, Hamwi y Peterson. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="peso-ideal" />
        </main>
      </Container>
    </>
  );
}