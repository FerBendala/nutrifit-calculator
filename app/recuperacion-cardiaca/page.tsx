"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeHRR } from '@/lib/formulas';
import { Activity, AlertTriangle, CheckCircle, Clock, Heart, Info, TrendingDown } from 'lucide-react';
import { useState } from 'react';

export default function RecuperacionCardiacaPage() {
  const [formData, setFormData] = useState({
    peakHR: '',
    hr1min: '',
    hr2min: '',
    age: '',
    gender: 'male' as 'male' | 'female',
    measureTime: 'both' as '1min' | '2min' | 'both'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeHRR> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.peakHR) return;

    try {
      const hr1min = formData.hr1min ? parseFloat(formData.hr1min) : undefined;
      const hr2min = formData.hr2min ? parseFloat(formData.hr2min) : undefined;
      const age = formData.age ? parseInt(formData.age) : undefined;

      const analysis = analyzeHRR(
        parseFloat(formData.peakHR),
        hr1min,
        hr2min,
        age,
        formData.gender
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating HRR:', error);
    }
  };

  const isFormValid = formData.peakHR && 
    (formData.hr1min || formData.hr2min) &&
    (!formData.hr1min || parseFloat(formData.peakHR) > parseFloat(formData.hr1min)) &&
    (!formData.hr2min || parseFloat(formData.peakHR) > parseFloat(formData.hr2min));

  return (
    <>
      <SchemaMarkup calculatorKey="recuperacion-cardiaca" />
      <CalculatorBreadcrumbs calculatorKey="recuperacion-cardiaca" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Recuperación Cardíaca: Tu Condición Cardiovascular
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu recuperación cardíaca (HRR) para evaluar tu condición cardiovascular.
              Mide qué tan rápido bajan tus pulsaciones después del ejercicio. Un indicador clave de fitness y salud del corazón.
            </p>
          </header>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Recuperación Cardíaca">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 mr-3 text-destructive" />
                  Calculadora de Recuperación Cardíaca
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> La recuperación cardíaca (HRR) mide cuánto baja tu frecuencia cardíaca
                        después de detener el ejercicio. Mide tu frecuencia cardíaca inmediatamente después del ejercicio
                        (pico) y luego a 1 minuto y/o 2 minutos después de detener el ejercicio. Proporciona al menos
                        una medida post-ejercicio (1 min o 2 min) para calcular la recuperación.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="peakHR"
                      label="Frecuencia Cardíaca Pico (durante ejercicio)"
                      value={formData.peakHR}
                      onChange={handleInputChange('peakHR')}
                      min={100}
                      max={220}
                      step={1}
                      unit="bpm"
                      placeholder="180"
                      required
                    />

                    <SelectInput
                      id="measureTime"
                      label="¿Qué medidas tienes?"
                      value={formData.measureTime}
                      onChange={handleInputChange('measureTime')}
                      options={[
                        { value: 'both', label: '1 minuto y 2 minutos' },
                        { value: '1min', label: 'Solo 1 minuto' },
                        { value: '2min', label: 'Solo 2 minutos' }
                      ]}
                      required
                    />

                    {(formData.measureTime === 'both' || formData.measureTime === '1min') && (
                      <NumberInput
                        id="hr1min"
                        label="Frecuencia Cardíaca a 1 minuto"
                        value={formData.hr1min}
                        onChange={handleInputChange('hr1min')}
                        min={40}
                        max={200}
                        step={1}
                        unit="bpm"
                        placeholder="150"
                        required={formData.measureTime === '1min' || formData.measureTime === 'both'}
                      />
                    )}

                    {(formData.measureTime === 'both' || formData.measureTime === '2min') && (
                      <NumberInput
                        id="hr2min"
                        label="Frecuencia Cardíaca a 2 minutos"
                        value={formData.hr2min}
                        onChange={handleInputChange('hr2min')}
                        min={40}
                        max={200}
                        step={1}
                        unit="bpm"
                        placeholder="130"
                        required={formData.measureTime === '2min' || formData.measureTime === 'both'}
                      />
                    )}

                    <NumberInput
                      id="age"
                      label="Edad (opcional)"
                      value={formData.age}
                      onChange={handleInputChange('age')}
                      min={18}
                      max={120}
                      step={1}
                      unit="años"
                      placeholder="30"
                    />

                    <SelectInput
                      id="gender"
                      label="Género (opcional)"
                      value={formData.gender}
                      onChange={handleInputChange('gender')}
                      options={[
                        { value: 'male', label: 'Hombre' },
                        { value: 'female', label: 'Mujer' }
                      ]}
                    />
                  </div>

                  {formData.peakHR && formData.hr1min && 
                   parseFloat(formData.peakHR) <= parseFloat(formData.hr1min) && (
                    <div className="bg-destructive-subtle border border-destructive rounded-lg p-3">
                      <p className="text-sm text-foreground/90">
                        <AlertTriangle className="w-4 h-4 inline mr-2" />
                        La frecuencia cardíaca pico debe ser mayor que la frecuencia cardíaca post-ejercicio.
                      </p>
                    </div>
                  )}

                  {formData.peakHR && formData.hr2min && 
                   parseFloat(formData.peakHR) <= parseFloat(formData.hr2min) && (
                    <div className="bg-destructive-subtle border border-destructive rounded-lg p-3">
                      <p className="text-sm text-foreground/90">
                        <AlertTriangle className="w-4 h-4 inline mr-2" />
                        La frecuencia cardíaca pico debe ser mayor que la frecuencia cardíaca post-ejercicio.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <TrendingDown className="w-5 h-5 mr-2" />
                    Calcular Recuperación Cardíaca
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 mr-3 text-destructive" />
                  Resultados de Recuperación Cardíaca
                </h2>
              </header>
              <div className="p-6 space-golden-md">
                {/* HRR Principal */}
                <Card className={`bg-gradient-to-br ${result.category1min === 'Excelente' || result.category2min === 'Excelente' ? 'bg-success-subtle border-success' :
                  result.category1min === 'Buena' || result.category2min === 'Buena' ? 'bg-info-subtle border-info' :
                    result.category1min === 'Normal' || result.category2min === 'Normal' ? 'bg-warning-subtle border-warning' :
                      result.category1min === 'Pobre' || result.category2min === 'Pobre' ? 'bg-warning-subtle border-warning' :
                        'from-red-50 to-red-100 border-destructive'
                  } border-l-4`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.category1min === 'Excelente' || result.category2min === 'Excelente' ? 'text-foreground' :
                      result.category1min === 'Buena' || result.category2min === 'Buena' ? 'text-foreground' :
                        result.category1min === 'Normal' || result.category2min === 'Normal' ? 'text-foreground' :
                          result.category1min === 'Pobre' || result.category2min === 'Pobre' ? 'text-foreground' :
                            'text-foreground'
                      }`}>
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Recuperación Cardíaca
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold mb-2 ${result.category1min === 'Excelente' || result.category2min === 'Excelente' ? 'text-success' :
                      result.category1min === 'Buena' || result.category2min === 'Buena' ? 'text-info' :
                        result.category1min === 'Normal' || result.category2min === 'Normal' ? 'text-warning' :
                          result.category1min === 'Pobre' || result.category2min === 'Pobre' ? 'text-warning' :
                            'text-destructive'
                      }`}>
                      {result.hrr1min !== undefined && `${result.hrr1min} bpm`}
                      {result.hrr1min !== undefined && result.hrr2min !== undefined && ' / '}
                      {result.hrr2min !== undefined && `${result.hrr2min} bpm`}
                    </div>
                    <div className={`text-lg font-semibold mb-1 ${result.category1min === 'Excelente' || result.category2min === 'Excelente' ? 'text-foreground/90' :
                      result.category1min === 'Buena' || result.category2min === 'Buena' ? 'text-foreground/90' :
                        result.category1min === 'Normal' || result.category2min === 'Normal' ? 'text-foreground/90' :
                          result.category1min === 'Pobre' || result.category2min === 'Pobre' ? 'text-foreground/90' :
                            'text-foreground/90'
                      }`}>
                      {result.status}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.interpretation}
                    </p>
                  </CardContent>
                </Card>

                {/* Detalles de HRR */}
                <div className="grid gap-4 md:grid-cols-2">
                  {result.hrr1min !== undefined && (
                    <Card className="bg-info-subtle">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          HRR a 1 Minuto
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-info mb-1">
                          {result.hrr1min} bpm
                        </div>
                        {result.hrr1minPercentage !== undefined && (
                          <p className="text-xs text-info mb-2">
                            {result.hrr1minPercentage}% de recuperación
                          </p>
                        )}
                        <div className={`text-sm font-semibold ${result.category1min === 'Excelente' ? 'text-success' :
                          result.category1min === 'Buena' ? 'text-info' :
                            result.category1min === 'Normal' ? 'text-warning' :
                              result.category1min === 'Pobre' ? 'text-warning' :
                                'text-destructive'
                          }`}>
                          {result.category1min}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {result.hrr2min !== undefined && (
                    <Card className="bg-accent">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          HRR a 2 Minutos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-warning mb-1">
                          {result.hrr2min} bpm
                        </div>
                        {result.hrr2minPercentage !== undefined && (
                          <p className="text-xs text-warning mb-2">
                            {result.hrr2minPercentage}% de recuperación
                          </p>
                        )}
                        <div className={`text-sm font-semibold ${result.category2min === 'Excelente' ? 'text-success' :
                          result.category2min === 'Buena' ? 'text-info' :
                            result.category2min === 'Normal' ? 'text-warning' :
                              result.category2min === 'Pobre' ? 'text-warning' :
                                'text-destructive'
                          }`}>
                          {result.category2min}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Frecuencia Cardíaca Pico */}
                <Card className="bg-destructive-subtle">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Heart className="w-4 h-4 mr-2" />
                      Frecuencia Cardíaca Pico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive mb-1">
                      {result.peakHR} bpm
                    </div>
                    <p className="text-xs text-destructive">
                      Frecuencia cardíaca máxima durante el ejercicio
                    </p>
                  </CardContent>
                </Card>

                {/* Condición Cardiovascular */}
                <Card className={`bg-gradient-to-br ${result.cardiovascularFitness.risk === 'Bajo' ? 'bg-success-subtle border-success' :
                  result.cardiovascularFitness.risk === 'Moderado' ? 'bg-warning-subtle border-warning' :
                    'from-red-50 to-red-100 border-destructive'
                  } border-l-4`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.cardiovascularFitness.risk === 'Bajo' ? 'text-foreground' :
                      result.cardiovascularFitness.risk === 'Moderado' ? 'text-foreground' :
                        'text-foreground'
                      }`}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Condición Cardiovascular
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-lg font-bold mb-1 ${result.cardiovascularFitness.risk === 'Bajo' ? 'text-success' :
                      result.cardiovascularFitness.risk === 'Moderado' ? 'text-warning' :
                        'text-destructive'
                      }`}>
                      {result.cardiovascularFitness.level}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.cardiovascularFitness.description}
                    </p>
                    <div className={`text-xs font-semibold inline-block px-2 py-1 rounded ${result.cardiovascularFitness.risk === 'Bajo' ? 'bg-success-subtle text-foreground/90' :
                      result.cardiovascularFitness.risk === 'Moderado' ? 'bg-warning-subtle text-foreground/90' :
                        'bg-destructive-subtle text-foreground/90'
                      }`}>
                      Riesgo: {result.cardiovascularFitness.risk}
                    </div>
                  </CardContent>
                </Card>

                {/* Recomendaciones */}
                <Card className="bg-gradient-to-br bg-info-subtle border-l-4 border-info">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Info className="w-4 h-4 mr-2" />
                      Recomendaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-info mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Estrategias de Mejora */}
                <Card className="bg-gradient-to-br bg-success-subtle border-l-4 border-success">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Activity className="w-4 h-4 mr-2" />
                      Estrategias de Mejora
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {result.improvementStrategies.map((strategy, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-success mr-2">•</span>
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Monitoreo */}
                <Card className="bg-accent border-l-4 border-warning">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      Frecuencia de Monitoreo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-warning mb-2">
                      {result.monitoring.frequency}
                    </div>
                    <ul className="space-y-1">
                      {result.monitoring.actions.map((action, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-warning mr-2">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Factores de Riesgo */}
                {result.riskFactors.length > 0 && (
                  <Card className="bg-destructive-subtle border-l-4 border-destructive">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Factores de Riesgo Asociados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {result.riskFactors.map((risk, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <span className="text-destructive mr-2">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Interpretación Clínica */}
                <Card className="bg-gradient-to-br bg-muted border-l-4 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Info className="w-4 h-4 mr-2" />
                      Interpretación Clínica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.clinicalSignificance}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {result.clinicalInterpretation}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Contenido educativo */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Recuperación Cardíaca (HRR)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La recuperación cardíaca (HRR) es una medida importante de la condición cardiovascular que evalúa
                qué tan rápido se recupera tu frecuencia cardíaca después de detener el ejercicio. Es un indicador
                clave de la función del sistema nervioso autónomo y la salud cardiovascular general.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <TrendingDown className="w-5 h-5 mr-3 text-destructive" />
                  Cómo Medir la HRR
                </h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Realiza ejercicio hasta alcanzar tu frecuencia cardíaca máxima o cerca del máximo</li>
                  <li>Detén el ejercicio inmediatamente y mide tu frecuencia cardíaca (pico)</li>
                  <li>Mide tu frecuencia cardíaca nuevamente a 1 minuto después de detener el ejercicio</li>
                  <li>Opcionalmente, mide también a 2 minutos después de detener el ejercicio</li>
                  <li>Calcula la diferencia: HRR = Frecuencia cardíaca pico - Frecuencia cardíaca post-ejercicio</li>
                </ol>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-success" />
                  Valores Normales
                </h3>
                <div className="space-golden-sm">
                  <div className="bg-success-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-success mb-1">HRR a 1 minuto:</p>
                    <ul className="text-sm text-success space-y-1">
                      <li>• Excelente: ≥18 bpm</li>
                      <li>• Buena: 15-17 bpm</li>
                      <li>• Normal: 12-14 bpm</li>
                      <li>• Pobre: 8-11 bpm</li>
                      <li>• Muy Pobre: &lt;8 bpm</li>
                    </ul>
                  </div>
                  <div className="bg-info-subtle p-4 rounded-lg">
                    <p className="text-sm font-semibold text-info mb-1">HRR a 2 minutos:</p>
                    <ul className="text-sm text-info space-y-1">
                      <li>• Excelente: ≥30 bpm</li>
                      <li>• Buena: 25-29 bpm</li>
                      <li>• Normal: 22-24 bpm</li>
                      <li>• Pobre: 15-21 bpm</li>
                      <li>• Muy Pobre: &lt;15 bpm</li>
                    </ul>
                  </div>
                </div>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <Heart className="w-5 h-5 mr-3" />
                Importancia Clínica de la HRR
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Indicador de Condición Cardiovascular
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Una recuperación cardíaca rápida indica buena condición cardiovascular y función autonómica saludable.
                    Las personas con mejor condición física tienen HRR más altas.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Predicción de Riesgo Cardiovascular
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Una HRR baja (&lt;12 bpm a 1 min) se asocia con mayor riesgo de mortalidad cardiovascular
                    y puede indicar disfunción autonómica o enfermedad cardiovascular subyacente.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitoreo de Progreso
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    La HRR puede mejorar con el entrenamiento regular. Monitorear la HRR a lo largo del tiempo
                    puede ayudar a evaluar la efectividad de un programa de ejercicio.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Función Autonómica
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    La HRR refleja la función del sistema nervioso autónomo, específicamente la actividad
                    parasimpática que ayuda a reducir la frecuencia cardíaca después del ejercicio.
                  </p>
                </article>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas Frecuentes (FAQ)</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué es importante la HRR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La HRR es un indicador importante de la condición cardiovascular y la función autonómica.
                    Una recuperación rápida indica buena salud cardiovascular, mientras que una recuperación
                    lenta puede indicar problemas cardiovasculares o disfunción autonómica.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo puedo mejorar mi HRR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Puedes mejorar tu HRR con ejercicio cardiovascular regular, especialmente entrenamiento
                    de intervalos de alta intensidad (HIIT). También ayuda mantener un peso saludable,
                    gestionar el estrés, dormir bien y evitar el tabaco.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué significa una HRR baja?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Una HRR baja puede indicar condición cardiovascular subóptima, disfunción autonómica
                    o riesgo cardiovascular aumentado. Si tu HRR es consistentemente baja, se recomienda
                    consultar con un médico para evaluación cardiovascular.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuándo debo medir la HRR?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Mide la HRR después de ejercicio de intensidad moderada a alta, cuando hayas alcanzado
                    al menos el 80% de tu frecuencia cardíaca máxima estimada. Evita medirla después de
                    ejercicio muy ligero, ya que la recuperación será muy rápida y no será informativa.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/recuperacion-cardiaca" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Recuperación Cardíaca (HRR) - Evaluación Cardiovascular"
            url="https://nutrifit-calculator.com/recuperacion-cardiaca/"
            description="Calcula tu recuperación cardíaca (HRR) para evaluar condición cardiovascular y función autonómica. Mide la velocidad de recuperación del corazón después del ejercicio. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="recuperacion-cardiaca" />
        </main>
      </Container>
    </>
  );
}

