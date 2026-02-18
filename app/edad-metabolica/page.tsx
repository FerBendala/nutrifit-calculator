'use client';

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeMetabolicAge } from '@/lib/formulas';
import { AlertTriangle, Clock, Info, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

export default function EdadMetabolicaPage() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175',
    age: '30',
    gender: 'male' as 'male' | 'female',
    bodyFatPercentage: '',
    useBodyFat: 'no' as 'yes' | 'no'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeMetabolicAge> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height || !formData.age) return;

    try {
      const bodyFatPercentage = formData.useBodyFat === 'yes' && formData.bodyFatPercentage
        ? parseFloat(formData.bodyFatPercentage)
        : undefined;

      const analysis = analyzeMetabolicAge(
        parseFloat(formData.weight),
        parseFloat(formData.height),
        parseInt(formData.age),
        formData.gender,
        bodyFatPercentage
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating metabolic age:', error);
    }
  };

  const isFormValid = formData.weight && formData.height && formData.age && 
    (formData.useBodyFat === 'no' || (formData.useBodyFat === 'yes' && formData.bodyFatPercentage));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mucho Más Joven':
        return 'text-foreground bg-success-subtle border-success';
      case 'Más Joven':
        return 'text-foreground bg-info-subtle border-info';
      case 'Similar':
        return 'text-muted-foreground bg-muted border-border';
      case 'Más Viejo':
        return 'text-foreground bg-warning-subtle border-warning';
      case 'Mucho Más Viejo':
        return 'text-foreground bg-destructive-subtle border-destructive';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="edad-metabolica" />
      <CalculatorBreadcrumbs calculatorKey="edad-metabolica" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Edad Metabólica: ¿Tu Cuerpo es Joven o Viejo?
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Descubre tu edad metabólica comparando tu metabolismo con el promedio de tu edad.
              Averigua si tu cuerpo funciona como alguien más joven o más viejo de lo que eres.
            </p>
          </header>

          <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                La <strong>edad metabólica</strong> es una medida que compara tu metabolismo basal (BMR) con el promedio
                esperado de personas de tu edad cronológica. Si tu edad metabólica es menor que tu edad cronológica,
                significa que tu metabolismo es más eficiente (más "joven"). Si es mayor, indica que tu metabolismo es
                menos eficiente (más "viejo").
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Esta calculadora utiliza la fórmula <strong>Mifflin-St Jeor</strong> para calcular tu BMR y lo compara
                con el promedio esperado. Es complementaria a otras calculadoras metabólicas como <a href="/bmr/" className="text-info hover:underline transition-colors">BMR</a>,
                <a href="/rmr/" className="text-info hover:underline transition-colors"> RMR</a>, <a href="/tdee/" className="text-info hover:underline transition-colors">TDEE</a> y
                <a href="/masa-muscular/" className="text-info hover:underline transition-colors"> Masa Muscular</a>.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Edad Metabólica">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  Calculadora de Edad Metabólica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> La edad metabólica se calcula comparando tu BMR con el promedio esperado
                        para personas de tu edad. Si conoces tu porcentaje de grasa corporal, puedes proporcionarlo para
                        un cálculo más preciso usando la fórmula Katch-McArdle. Si no lo conoces, puedes usar nuestra
                        <a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium"> calculadora de grasa corporal</a>.
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

                    <div className="md:col-span-2">
                      <SelectInput
                        id="useBodyFat"
                        label="¿Conoces tu porcentaje de grasa corporal?"
                        value={formData.useBodyFat}
                        onChange={handleInputChange('useBodyFat')}
                        options={[
                          { value: 'no', label: 'No (usar fórmula estándar)' },
                          { value: 'yes', label: 'Sí (cálculo más preciso)' }
                        ]}
                        required
                      />
                    </div>

                    {formData.useBodyFat === 'yes' && (
                      <div className="md:col-span-2">
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
                          required={formData.useBodyFat === 'yes'}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Si no conoces tu porcentaje de grasa corporal, puedes usar nuestra{' '}
                          <a href="/grasa-corporal/" className="text-info hover:underline transition-colors">calculadora de grasa corporal</a> o{' '}
                          <a href="/composicion/" className="text-info hover:underline transition-colors">calculadora de composición corporal</a>.
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    Calcular Edad Metabólica
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20 mt-8">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">⏰</span>
                  Resultados de Edad Metabólica
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* Edad Metabólica Principal */}
                  <div className={`text-center card-golden border-2 rounded-lg p-6 ${getCategoryColor(result.category)}`}>
                    <div className="text-5xl font-bold mb-2">
                      {result.metabolicAge} años
                    </div>
                    <div className="text-xl font-semibold mb-1">
                      Edad Metabólica
                    </div>
                    <div className="text-lg font-bold mb-2">
                      {result.ageDifference > 0 ? '+' : ''}{result.ageDifference} años vs. edad cronológica
                    </div>
                    <div className="text-lg font-bold mb-2">
                      Categoría: {result.category}
                    </div>
                    <p className="text-sm opacity-90">
                      {result.interpretation}
                    </p>
                  </div>

                  {/* Fórmula utilizada */}
                  <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                        <Info className="w-4 h-4 mr-2" />
                        Fórmula Utilizada
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-indigo-700 mb-1">
                        {result.formulaUsed}
                      </div>
                      <p className="text-xs text-indigo-600">
                        {result.formulaUsed === 'Katch-McArdle' 
                          ? 'Cálculo más preciso usando masa magra' 
                          : 'Fórmula estándar. Para mayor precisión, proporciona tu porcentaje de grasa corporal.'}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Comparación de Edades */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-accent">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          Edad Cronológica
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-warning mb-1">
                          {result.chronologicalAge} años
                        </div>
                        <p className="text-xs text-warning">
                          Tu edad real
                        </p>
                      </CardContent>
                    </Card>

                    <Card className={`bg-gradient-to-br ${result.ageDifference < 0 ? 'bg-success-subtle' : result.ageDifference > 0 ? 'from-red-50 to-red-100' : 'bg-muted'}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className={`text-sm font-semibold flex items-center ${result.ageDifference < 0 ? 'text-foreground' : result.ageDifference > 0 ? 'text-foreground' : 'text-foreground'}`}>
                          <Zap className="w-4 h-4 mr-2" />
                          Edad Metabólica
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className={`text-lg font-bold mb-1 ${result.ageDifference < 0 ? 'text-success' : result.ageDifference > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {result.metabolicAge} años
                        </div>
                        <p className={`text-xs ${result.ageDifference < 0 ? 'text-success' : result.ageDifference > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {result.ageDifference < 0 ? 'Más joven' : result.ageDifference > 0 ? 'Más viejo' : 'Similar'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Estado Metabólico */}
                  <Card className={`border-l-4 ${getCategoryColor(result.category)}`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Estado Metabólico
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base font-medium mb-2">{result.metabolicStatus}</p>
                      <p className="text-sm text-muted-foreground">{result.clinicalInterpretation}</p>
                    </CardContent>
                  </Card>

                  {/* Comparación con otras métricas */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Comparación de Métricas
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
                                {metric.value.toFixed(metric.metric.includes('BMR') ? 0 : 0)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {metric.metric.includes('BMR') ? 'kcal/día' : metric.metric.includes('Edad') ? 'años' : ''}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Factores que Afectan la Edad Metabólica */}
                  <Card className="bg-warning-subtle border-l-4 border-warning">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                        <Info className="w-5 h-5 mr-2" />
                        Factores que Afectan tu Edad Metabólica
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-card rounded-lg border">
                          <div className="font-semibold text-sm text-foreground mb-1">Masa Muscular:</div>
                          <p className="text-xs text-warning">{result.factors.muscleMass}</p>
                        </div>
                        <div className="p-3 bg-card rounded-lg border">
                          <div className="font-semibold text-sm text-foreground mb-1">Nivel de Actividad:</div>
                          <p className="text-xs text-warning">{result.factors.activityLevel}</p>
                        </div>
                        <div className="p-3 bg-card rounded-lg border">
                          <div className="font-semibold text-sm text-foreground mb-1">Nutrición:</div>
                          <p className="text-xs text-warning">{result.factors.nutrition}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <div className="font-semibold text-sm text-foreground mb-1">Sueño:</div>
                          <p className="text-xs text-warning">{result.factors.sleep}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Estrategias de Mejora */}
                  {result.improvementStrategies.length > 0 && (
                    <Card className="bg-info-subtle border-l-4 border-info">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Estrategias para Mejorar tu Edad Metabólica
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.improvementStrategies.map((strategy, index) => (
                            <li key={index} className="flex items-start text-sm text-foreground/90">
                              <span className="text-info mr-2">•</span>
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
                      <strong>Importante:</strong> La edad metabólica es una estimación basada en tu BMR calculado.
                      Factores como genética, condiciones médicas, medicamentos y otros pueden afectar tu metabolismo.
                      Si tu edad metabólica es significativamente mayor que tu edad cronológica, considera consultar
                      con un profesional de la salud.
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
                ¿Qué es la edad metabólica y por qué es importante?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La edad metabólica compara tu metabolismo basal (BMR) con el promedio de personas de tu edad cronológica.
                Un metabolismo más joven indica mayor eficiencia metabólica, mientras que uno más viejo puede indicar
                factores que afectan el metabolismo.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Interpretación de la Edad Metabólica
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-success">Edad Metabólica &lt; Edad Cronológica (Más Joven):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Indica metabolismo eficiente, típico de personas con buena masa muscular y actividad física regular</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-muted-foreground">Edad Metabólica ≈ Edad Cronológica (Similar):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Metabolismo normal y esperado para tu edad</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-destructive">Edad Metabólica &gt; Edad Cronológica (Más Viejo):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Puede indicar pérdida de masa muscular, sedentarismo o factores que afectan el metabolismo</p>
                  </section>
                </div>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">💪</span>
                  Factores que Afectan la Edad Metabólica
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Masa muscular:</strong> Mayor masa muscular = metabolismo más joven</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Actividad física:</strong> Ejercicio regular mantiene metabolismo activo</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Nutrición:</strong> Proteína adecuada y evitar restricciones extremas</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Sueño:</strong> Calidad y cantidad de sueño afectan hormonas metabólicas</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Genética:</strong> Algunas personas tienen metabolismo naturalmente más eficiente</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Condiciones médicas:</strong> Algunas condiciones pueden afectar el metabolismo</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📐</span>
                Cómo se Calcula la Edad Metabólica
              </h3>
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border-2 border-info">
                  <h4 className="font-semibold text-foreground mb-2">Método de Cálculo:</h4>
                  <div className="font-mono text-sm mb-2 bg-muted p-3 rounded">
                    <p>1. Se calcula tu BMR usando la fórmula Mifflin-St Jeor</p>
                    <p>2. Se compara tu BMR con el BMR esperado a diferentes edades</p>
                    <p>3. Se encuentra la edad donde el BMR esperado coincide con tu BMR real</p>
                    <p>4. Esta edad es tu "edad metabólica"</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    La edad metabólica indica qué edad tiene tu metabolismo comparado con el promedio de personas
                    de tu edad cronológica. Un metabolismo más joven (edad metabólica menor) indica mayor eficiencia.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre edad metabólica</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi edad metabólica?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para mejorar tu edad metabólica: (1) Aumenta masa muscular con entrenamiento de fuerza 3-4 veces por semana,
                    (2) Aumenta actividad física diaria, (3) Consume suficiente proteína (1.6-2.2g por kg de peso),
                    (4) Mejora calidad y cantidad de sueño (7-9 horas), (5) Evita dietas muy restrictivas. Consulta nuestra
                    <a href="/masa-muscular/" className="text-info hover:underline transition-colors"> calculadora de masa muscular</a> y
                    <a href="/proteina/" className="text-info hover:underline transition-colors"> calculadora de proteína</a> para más información.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué significa tener una edad metabólica más joven?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Una edad metabólica más joven que tu edad cronológica indica que tu metabolismo es más eficiente.
                    Esto típicamente significa que tienes buena masa muscular, actividad física regular y hábitos saludables.
                    Un metabolismo más joven puede ayudar a mantener un peso saludable y reducir el riesgo de enfermedades metabólicas.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿La edad metabólica puede cambiar?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    <strong>Sí.</strong> La edad metabólica puede cambiar con el tiempo. Aumentar masa muscular, mejorar actividad física,
                    optimizar nutrición y sueño pueden hacer que tu edad metabólica sea más joven. Por el contrario, pérdida de masa muscular,
                    sedentarismo y malos hábitos pueden hacer que sea más vieja. Monitorea tu edad metabólica periódicamente para ver cambios.
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
                  <span><strong><a href="/bmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de BMR:</a></strong> Metabolismo basal necesario para calcular edad metabólica</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/rmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de RMR:</a></strong> Tasa metabólica en reposo complementaria</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de Masa Muscular:</a></strong> Aumentar masa muscular mejora edad metabólica</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Calculadora de TDEE:</a></strong> Gasto calórico total diario</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/edad-metabolica" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora Edad Metabólica - Metabolic Age | Eficiencia Metabolismo | BMR"
              url="https://nutrifit-calculator.com/edad-metabolica/"
              description="Calculadora profesional de edad metabólica que compara tu metabolismo con el promedio de personas de tu edad. Descubre si tu metabolismo es más joven o más viejo."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="edad-metabolica" />
          </article>
        </main>
      </Container>
    </>
  );
}

