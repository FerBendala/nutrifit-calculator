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
import { analyzeAdjustedBodyWeight } from '@/lib/formulas';
import { Activity, AlertTriangle, Calculator, Info, Pill, Scale, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function PesoAjustadoPage() {
  const [formData, setFormData] = useState({
    gender: 'male' as 'male' | 'female',
    weight: '90',
    height: '175',
    age: '30'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeAdjustedBodyWeight> | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.weight && formData.height;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      const analysis = analyzeAdjustedBodyWeight(
        parseFloat(formData.weight),
        parseFloat(formData.height),
        formData.gender,
        formData.age ? parseInt(formData.age) : undefined
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating adjusted weight:', error);
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="peso-ajustado" />

      <Container size="xl" className="py-[4.236rem]">

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora Peso Ajustado Clínico ABW
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de Peso Ajustado (ABW) según fórmula Robinson.
              Herramienta clínica esencial para dosificación de medicamentos y necesidades nutricionales.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                El <strong>Peso Ajustado (ABW - Adjusted Body Weight)</strong> es una herramienta clínica fundamental desarrollada para
                calcular con precisión necesidades nutricionales y dosis de medicamentos en personas con obesidad o bajo peso. Utiliza la fórmula{' '}
                <a href="https://pubmed.ncbi.nlm.nih.gov/6930408/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  Robinson (1983)
                </a>{' '}
                para el peso ideal y ajusta según composición corporal. Estudios en{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4163889/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">
                  farmacología clínica
                </a>{' '}
                demuestran su superioridad para dosificación precisa.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A diferencia del peso ideal o actual, el peso ajustado considera que el exceso de grasa corporal también tiene demandas metabólicas,
                pero menores que la masa magra. Es el estándar en hospitales para cálculos críticos.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Peso Ajustado">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">⚖️</span>
                  Calculadora de Peso Ajustado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-golden-md">
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-1">Peso Ajustado para Uso Clínico</h3>
                        <p className="text-sm text-blue-700">
                          Calcula peso ideal (Robinson) y peso ajustado (ABW) para cálculos clínicos precisos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <SelectInput
                      id="gender"
                      label="Sexo"
                      value={formData.gender}
                      onChange={(value) => handleInputChange('gender', value)}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                      required
                    />

                    <NumberInput
                      id="age"
                      label="Edad (opcional)"
                      value={formData.age}
                      onChange={(value) => handleInputChange('age', value)}
                      placeholder="30"
                      unit="años"
                      min={15}
                      max={100}
                      step={1}
                    />

                    <NumberInput
                      id="weight"
                      label="Peso actual"
                      value={formData.weight}
                      onChange={(value) => handleInputChange('weight', value)}
                      placeholder="90"
                      unit="kg"
                      min={30}
                      max={250}
                      step={0.1}
                      required
                    />

                    <NumberInput
                      id="height"
                      label="Altura"
                      value={formData.height}
                      onChange={(value) => handleInputChange('height', value)}
                      placeholder="175"
                      unit="cm"
                      min={120}
                      max={250}
                      step={0.5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular Peso Ajustado
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Resultados */}
          {result && (
            <section className="space-golden-lg border-t pt-8">
              <header className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-orange-600" />
                  Tus Resultados de Peso Ajustado
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-blue-600" />
                      Peso Actual
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {result.actualWeight.toFixed(1)} <span className="text-lg">kg</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Tu peso corporal actual</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-green-600" />
                      Peso Ideal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {result.idealWeight.toFixed(1)} <span className="text-lg">kg</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Robinson (1983)</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Scale className="w-5 h-5 mr-2 text-orange-600" />
                      Peso Ajustado (ABW)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">
                      {result.adjustedWeight.toFixed(1)} <span className="text-lg">kg</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Para uso clínico</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mb-6 border-l-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-500">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <AlertDescription className="ml-2">
                  <strong>Categoría:</strong> {result.weightCategory} | <strong>Diferencia:</strong> {result.weightDifference > 0 ? '+' : ''}{result.weightDifference.toFixed(1)} kg ({result.percentageOverIdeal > 0 ? '+' : ''}{result.percentageOverIdeal.toFixed(1)}%)
                </AlertDescription>
              </Alert>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Pill className="w-5 h-5 mr-2 text-purple-600" />
                    Guía de Uso Clínico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {result.clinicalUse.useAdjustedWeight ? '✓' : '−'}
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Usar Peso Ajustado</p>
                        <p className="text-sm text-blue-700">{result.clinicalUse.reason}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="w-5 h-5 mr-2 text-green-600" />
                      Necesidades de Proteína
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso actual</p>
                        <p className="font-semibold">{result.proteinNeeds.byActualWeight.min} - {result.proteinNeeds.byActualWeight.max} g/día</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso ideal</p>
                        <p className="font-semibold">{result.proteinNeeds.byIdealWeight.min} - {result.proteinNeeds.byIdealWeight.max} g/día</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border-2 border-green-500">
                        <p className="text-sm text-green-700">Recomendado</p>
                        <p className="font-semibold text-green-900">{result.proteinNeeds.recommended}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                      Necesidades Calóricas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso actual</p>
                        <p className="font-semibold">{result.calorieNeeds.byActualWeight} kcal/día</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Por peso ideal</p>
                        <p className="font-semibold">{result.calorieNeeds.byIdealWeight} kcal/día</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg border-2 border-orange-500">
                        <p className="text-sm text-orange-700">Recomendado</p>
                        <p className="font-semibold text-orange-900">{result.calorieNeeds.recommended}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Comparación IMC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">IMC Actual</p>
                      <p className="text-2xl font-bold text-blue-600">{result.bmiActual.toFixed(1)}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">IMC Ideal</p>
                      <p className="text-2xl font-bold text-green-600">{result.bmiIdeal.toFixed(1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
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
                      <Pill className="w-5 h-5 mr-2 text-blue-600" />
                      Aplicaciones Clínicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.clinicalApplications.map((app, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                      Notas Importantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {result.importantNotes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-600 mr-2">⚠</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Importancia del Peso Ajustado en medicina clínica
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El Peso Ajustado (ABW) es una herramienta fundamental en práctica clínica hospitalaria y ambulatoria.
                Permite calcular con precisión dosis de medicamentos, necesidades nutricionales y requerimientos metabólicos
                en personas con obesidad o bajo peso, evitando errores de dosificación potencialmente graves.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🏥</span>
                  Aplicaciones médicas del ABW
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Dosificación de fármacos:</strong> Antibióticos, quimioterapia y anestésicos según <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4163889/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">guías farmacológicas</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 mr-2">•</span>
                    <span><strong>Nutrición hospitalaria:</strong> Cálculo preciso de calorías y proteínas en soporte nutricional</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Líquidos intravenosos:</strong> Ajuste de volumen en pacientes críticos</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Enfermedad renal:</strong> Prescripción de proteínas según <a href="/proteina" className="text-blue-600 hover:underline">necesidades ajustadas</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Cirugía bariátrica:</strong> Evaluación pre y post-operatoria</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span><strong>Cuidados intensivos:</strong> Manejo nutricional y farmacológico preciso</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  Por qué no usar solo peso actual
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-orange-700">En obesidad:</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Sobrestima dosis de fármacos hidrofílicos</li>
                      <li>• Calcula calorías excesivas para pérdida de peso</li>
                      <li>• Aumenta riesgo de toxicidad medicamentosa</li>
                    </ul>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-blue-700">En bajo peso:</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Subestima necesidades nutricionales</li>
                      <li>• Dificulta recuperación ponderal</li>
                      <li>• No refleja necesidades para peso objetivo</li>
                    </ul>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-green-700">Con ABW:</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Dosificación precisa y segura</li>
                      <li>• Necesidades calóricas realistas</li>
                      <li>• Menor riesgo de efectos adversos</li>
                    </ul>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💊</span>
                Medicamentos que requieren ABW para dosificación
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">💉</span>
                    Antibióticos:
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Aminoglucósidos (gentamicina)</li>
                    <li>• Vancomicina</li>
                    <li>• Colistina</li>
                  </ul>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-purple-700 flex items-center">
                    <span className="text-lg mr-2">🧬</span>
                    Quimioterapia:
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Carboplatino</li>
                    <li>• Doxorrubicina liposomal</li>
                    <li>• Ciclofosfamida</li>
                  </ul>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">⚕️</span>
                    Otros críticos:
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Anestésicos (propofol)</li>
                    <li>• Anticoagulantes (enoxaparina)</li>
                    <li>• Inmunosupresores</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-green-50 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📊</span>
                Categorías de peso según ABW
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Peso normal (85-120% PI):</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Usa peso actual</strong> para todos los cálculos</li>
                    <li>• No necesitas peso ajustado</li>
                    <li>• Mantén hábitos saludables actuales</li>
                    <li>• Monitoriza cada 2-4 semanas</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Sobrepeso (120-140% PI):</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Usa ABW</strong> para medicamentos y nutrición</li>
                    <li>• Considera reducción gradual 5-10% en 6 meses</li>
                    <li>• Combina déficit calórico con ejercicio</li>
                    <li>• Preserva masa muscular con <a href="/proteina" className="text-blue-600 hover:underline">proteína adecuada</a></li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Obesidad (&gt;140% PI):</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>SIEMPRE usa ABW</strong> en cálculos clínicos</li>
                    <li>• Consulta médico y nutricionista</li>
                    <li>• Objetivo: 0.5-1 kg/semana de pérdida</li>
                    <li>• Prioriza entrenamiento de fuerza</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Bajo peso (&lt;85% PI):</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Usa peso actual</strong> para necesidades</li>
                    <li>• Peso ideal como objetivo terapéutico</li>
                    <li>• Superávit 300-500 kcal/día</li>
                    <li>• Evaluación médica si &lt;80% PI</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Factores de ajuste especiales
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Factor 0.25 (en lugar de 0.4):</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• <strong>IMC &gt; 40</strong> (obesidad mórbida)</li>
                    <li>• Reduce sobreestimación en obesidad extrema</li>
                    <li>• Especialmente para fármacos hidrofílicos</li>
                    <li>• Recomendación de algunos protocolos hospitalarios</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Condiciones que modifican el cálculo:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• <strong>Edema o ascitis:</strong> Resta el peso del líquido acumulado</li>
                    <li>• <strong>Amputaciones:</strong> Ajusta por porcentaje de peso perdido</li>
                    <li>• <strong>Embarazo:</strong> Consulta tablas específicas de peso gestacional</li>
                    <li>• <strong>Edad pediátrica:</strong> Usa percentiles de crecimiento, no ABW</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="space-y-4 mb-[2.618rem]">
              <h3 className="text-lg font-medium">❓ Preguntas frecuentes sobre Peso Ajustado</h3>
              <div className="space-y-3">
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿El peso ajustado es mi peso ideal?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>No.</strong> El peso ajustado NO es un objetivo de peso saludable. Es una herramienta
                    clínica para calcular dosis de medicamentos y necesidades nutricionales con mayor precisión en
                    personas con obesidad o bajo peso. Tu peso ideal se calcula con la <a href="/peso-ideal" className="text-blue-600 hover:underline">calculadora de peso ideal</a>.
                  </p>
                </article>
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Por qué el factor 0.4 en la fórmula?</h4>
                  <p className="text-sm text-muted-foreground">
                    El factor 0.4 (40%) representa que el tejido adiposo tiene aproximadamente el 40% de la demanda
                    metabólica de la masa magra. Aunque la grasa tiene menor vascularización y metabolismo que el
                    músculo, sigue requiriendo nutrientes y afectando la farmacocinética de medicamentos.
                  </p>
                </article>
                <article className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cuándo debo recalcular mi ABW?</h4>
                  <p className="text-sm text-muted-foreground">
                    Recalcula tu peso ajustado cada vez que tu peso actual cambie ±5 kg, o al menos cada 3 meses
                    si estás en proceso de pérdida/ganancia de peso. En hospitalizaciones, se recalcula semanalmente
                    o tras cambios significativos en el estado nutricional o hidratación.
                  </p>
                </article>
              </div>
            </section>

            <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-blue-800 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Fórmulas Científicas del Peso Ajustado
                </h3>
              </header>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Peso Ideal Robinson (1983)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>Hombres: 52 kg + 1.9 kg por pulgada sobre 5 pies</p>
                      <p>Mujeres: 49 kg + 1.7 kg por pulgada sobre 5 pies</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Fórmula más usada en práctica clínica - <a href="https://pubmed.ncbi.nlm.nih.gov/6930408/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">validación original</a>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">2. Peso Ajustado (ABW)</h4>
                    <div className="font-mono text-sm mb-2">
                      <p>ABW = Peso Ideal + 0.4 × (Peso Actual - Peso Ideal)</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Factor 0.4 estándar en nutrición clínica - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4163889/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">evidencia farmacológica</a>
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">3. Cuándo Usar Cada Peso</h4>
                    <ul className="text-sm text-gray-700 space-y-1 mt-2">
                      <li>• <strong>Peso Actual:</strong> Si estás dentro del 85-120% del peso ideal</li>
                      <li>• <strong>Peso Ideal:</strong> Objetivo terapéutico en bajo peso severo</li>
                      <li>• <strong>Peso Ajustado:</strong> Cálculos clínicos si superas el 120% del peso ideal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="card-golden-lg bg-orange-50 border-l-4 border-orange-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-orange-800">
                  Complementa tu evaluación de peso
                </h3>
              </header>
              <div className="p-6">
                <ul className="space-y-3 text-orange-800">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/peso-ideal" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu peso ideal:
                        </a>
                      </strong>{' '}
                      5 fórmulas científicas para determinar tu peso objetivo saludable
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula proteína necesaria:
                        </a>
                      </strong>{' '}
                      Usa tu peso ajustado para necesidades proteicas precisas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/bmr" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu BMR:
                        </a>
                      </strong>{' '}
                      Metabolismo basal según tu peso para calorías precisas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/bsa" className="text-blue-600 hover:underline font-medium transition-golden">
                          Calcula tu BSA:
                        </a>
                      </strong>{' '}
                      Superficie corporal para dosificación de medicamentos y quimioterapia
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">
                          Evalúa tu IMC:
                        </a>
                      </strong>{' '}
                      Índice de masa corporal para contexto general de salud
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>
                      <strong>
                        <a href="/egfr" className="text-blue-600 hover:underline font-medium transition-golden">
                          eGFR (Filtrado Glomerular):
                        </a>
                      </strong>{' '}
                      Estimación de función renal para ajuste de dosis según CKD-EPI y Cockcroft-Gault
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="peso-ajustado" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora Peso Ajustado Clínico ABW - Fórmula Robinson"
            url="https://nutrifit-calculator.com/peso-ajustado"
            description="Calcula tu peso ajustado clínico con fórmula Robinson. Herramienta médica para dosificación precisa y necesidades nutricionales. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="peso-ajustado" />
        </main>
      </Container>
    </>
  );
}

