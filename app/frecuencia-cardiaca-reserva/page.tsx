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
import { analyzeHeartRateReserve, calculateMaxHeartRate } from '@/lib/formulas';
import { Activity, AlertTriangle, BarChart3, CheckCircle, Heart, Info } from 'lucide-react';
import { useState } from 'react';

export default function FrecuenciaCardiacaReservaPage() {
  const [formData, setFormData] = useState({
    maxHR: '',
    restingHR: '',
    age: '',
    sex: 'male' as 'male' | 'female',
    formula: 'tanaka' as 'tanaka' | 'haskell' | 'gulati',
    useCalculatedMaxHR: false
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeHeartRateReserve> | null>(null);

  const handleInputChange = (field: string) => (value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let maxHR: number;
      
      if (formData.useCalculatedMaxHR && formData.age) {
        const maxHRData = calculateMaxHeartRate(
          parseInt(formData.age),
          formData.formula,
          formData.sex
        );
        maxHR = maxHRData.maxHR;
      } else if (formData.maxHR) {
        maxHR = parseFloat(formData.maxHR);
      } else {
        return;
      }

      if (!formData.restingHR) {
        return;
      }

      const analysis = analyzeHeartRateReserve(
        maxHR,
        parseFloat(formData.restingHR),
        formData.age ? parseInt(formData.age) : undefined,
        formData.sex
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating HRR:', error);
    }
  };

  const hasMaxHR = formData.useCalculatedMaxHR ? formData.age : formData.maxHR;
  const hasRestingHR = formData.restingHR;
  const isValidComparison = !formData.maxHR || !formData.restingHR || 
    (formData.maxHR && formData.restingHR && parseFloat(formData.maxHR) > parseFloat(formData.restingHR));
  
  const isFormValid = hasMaxHR && hasRestingHR && isValidComparison;

  return (
    <>
      <SchemaMarkup calculatorKey="frecuencia-cardiaca-reserva" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Frecuencia Cardíaca de Reserva (HRR)
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de frecuencia cardíaca de reserva usando método Karvonen.
              Zonas de entrenamiento más precisas que el simple porcentaje de FC máxima.
            </p>
          </header>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Frecuencia Cardíaca de Reserva">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                  Calculadora de Frecuencia Cardíaca de Reserva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-700">
                        <p className="mb-2">
                          <strong>Nota:</strong> La frecuencia cardíaca de reserva (HRR) es la diferencia entre tu frecuencia cardíaca máxima y tu frecuencia cardíaca en reposo. El método Karvonen usa la HRR para calcular zonas de entrenamiento más precisas.
                        </p>
                        <p>
                          <strong>FC en reposo:</strong> Mide tu frecuencia cardíaca en reposo por la mañana antes de levantarte (idealmente durante varios días y toma el promedio).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="useCalculatedMaxHR"
                      checked={formData.useCalculatedMaxHR}
                      onChange={(e) => handleInputChange('useCalculatedMaxHR')(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="useCalculatedMaxHR" className="text-sm text-gray-700">
                      Calcular FC máxima automáticamente (usando edad)
                    </label>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    {formData.useCalculatedMaxHR ? (
                      <>
                        <NumberInput
                          id="age"
                          label="Edad"
                          value={formData.age}
                          onChange={handleInputChange('age')}
                          min={15}
                          max={100}
                          step={1}
                          unit="años"
                          placeholder="30"
                          required={formData.useCalculatedMaxHR}
                        />

                        <SelectInput
                          id="sex"
                          label="Sexo biológico"
                          value={formData.sex}
                          onChange={handleInputChange('sex')}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required={formData.useCalculatedMaxHR}
                        />

                        <SelectInput
                          id="formula"
                          label="Fórmula de cálculo"
                          value={formData.formula}
                          onChange={handleInputChange('formula')}
                          options={[
                            { value: 'tanaka', label: 'Fórmula de Tanaka (Recomendada)' },
                            { value: 'gulati', label: 'Fórmula de Gulati (Específica para mujeres)' },
                            { value: 'haskell', label: 'Fórmula clásica (220 - edad)' }
                          ]}
                          required={formData.useCalculatedMaxHR}
                        />
                      </>
                    ) : (
                      <NumberInput
                        id="maxHR"
                        label="Frecuencia Cardíaca Máxima"
                        value={formData.maxHR}
                        onChange={handleInputChange('maxHR')}
                        min={120}
                        max={220}
                        step={1}
                        unit="bpm"
                        placeholder="190"
                        required={!formData.useCalculatedMaxHR}
                      />
                    )}

                    <NumberInput
                      id="restingHR"
                      label="Frecuencia Cardíaca en Reposo"
                      value={formData.restingHR}
                      onChange={handleInputChange('restingHR')}
                      min={40}
                      max={100}
                      step={1}
                      unit="bpm"
                      placeholder="60"
                      required
                    />
                  </div>

                  {formData.maxHR && formData.restingHR && 
                   parseFloat(formData.maxHR) <= parseFloat(formData.restingHR) && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">
                        <AlertTriangle className="w-4 h-4 inline mr-2" />
                        La frecuencia cardíaca máxima debe ser mayor que la frecuencia cardíaca en reposo.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Calcular HRR y Zonas de Entrenamiento
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                  Resultados de Frecuencia Cardíaca de Reserva
                </h2>
              </header>
              <div className="p-6 space-golden-md">
                {/* HRR Principal */}
                <Card className={`bg-gradient-to-br ${result.hrrPercentage >= 75 ? 'from-green-50 to-green-100 border-green-400' :
                  result.hrrPercentage >= 65 ? 'from-blue-50 to-blue-100 border-blue-400' :
                    result.hrrPercentage >= 55 ? 'from-yellow-50 to-yellow-100 border-yellow-400' :
                      result.hrrPercentage >= 45 ? 'from-orange-50 to-orange-100 border-orange-400' :
                        'from-red-50 to-red-100 border-red-400'
                  } border-l-4`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.hrrPercentage >= 75 ? 'text-green-900' :
                      result.hrrPercentage >= 65 ? 'text-blue-900' :
                        result.hrrPercentage >= 55 ? 'text-yellow-900' :
                          result.hrrPercentage >= 45 ? 'text-orange-900' :
                            'text-red-900'
                      }`}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Frecuencia Cardíaca de Reserva (HRR)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-5xl font-bold mb-2 ${result.hrrPercentage >= 75 ? 'text-green-700' :
                      result.hrrPercentage >= 65 ? 'text-blue-700' :
                        result.hrrPercentage >= 55 ? 'text-yellow-700' :
                          result.hrrPercentage >= 45 ? 'text-orange-700' :
                            'text-red-700'
                      }`}>
                      {result.hrr} bpm
                    </div>
                    <div className={`text-lg font-semibold mb-1 ${result.hrrPercentage >= 75 ? 'text-green-800' :
                      result.hrrPercentage >= 65 ? 'text-blue-800' :
                        result.hrrPercentage >= 55 ? 'text-yellow-800' :
                          result.hrrPercentage >= 45 ? 'text-orange-800' :
                            'text-red-800'
                      }`}>
                      {result.status}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {result.interpretation}
                    </p>
                    <div className="text-xs text-gray-600">
                      {result.hrrPercentage}% de tu frecuencia cardíaca máxima
                    </div>
                  </CardContent>
                </Card>

                {/* Frecuencias Cardíacas */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-gradient-to-br from-red-50 to-red-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-red-900">
                        <Heart className="w-4 h-4 mr-2" />
                        FC Máxima
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-700 mb-1">
                        {result.maxHR} bpm
                      </div>
                      <p className="text-xs text-red-600">
                        Frecuencia cardíaca máxima estimada
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-blue-900">
                        <Heart className="w-4 h-4 mr-2" />
                        FC en Reposo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700 mb-1">
                        {result.restingHR} bpm
                      </div>
                      <p className="text-xs text-blue-600">
                        Frecuencia cardíaca en reposo
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Zonas de Entrenamiento */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                      <Activity className="w-4 h-4 mr-2" />
                      Zonas de Entrenamiento (Método Karvonen)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.values(result.trainingZones.zones).map((zone, index) => (
                        <div key={index} className="bg-white/50 rounded-lg p-3 border-l-4 border-purple-300">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-purple-900">{zone.name}</span>
                            <span className="text-xs text-purple-600">{zone.intensity}</span>
                          </div>
                          <div className="text-2xl font-bold text-purple-700 mb-1">
                            {zone.min} - {zone.max} bpm
                          </div>
                          <p className="text-xs text-gray-600">{zone.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Zona de Quema de Grasa */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-green-900">
                      <Activity className="w-4 h-4 mr-2" />
                      Zona de Quema de Grasa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-700 mb-1">
                      {result.trainingZones.fatBurning.min} - {result.trainingZones.fatBurning.max} bpm
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Óptimo:</strong> {result.trainingZones.fatBurning.optimal} bpm ({result.trainingZones.fatBurning.percentage})
                    </p>
                    <p className="text-xs text-gray-600">
                      Esta zona es ideal para quemar grasa y mejorar la capacidad aeróbica.
                    </p>
                  </CardContent>
                </Card>

                {/* Condición Cardiovascular */}
                <Card className={`bg-gradient-to-br ${result.cardiovascularFitness.level === 'Alta' || result.cardiovascularFitness.level === 'Buena' ? 'from-green-50 to-green-100 border-green-400' :
                  result.cardiovascularFitness.level === 'Moderada' ? 'from-yellow-50 to-yellow-100 border-yellow-400' :
                    'from-red-50 to-red-100 border-red-400'
                  } border-l-4`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.cardiovascularFitness.level === 'Alta' || result.cardiovascularFitness.level === 'Buena' ? 'text-green-900' :
                      result.cardiovascularFitness.level === 'Moderada' ? 'text-yellow-900' :
                        'text-red-900'
                      }`}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Condición Cardiovascular
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-lg font-bold mb-1 ${result.cardiovascularFitness.level === 'Alta' || result.cardiovascularFitness.level === 'Buena' ? 'text-green-700' :
                      result.cardiovascularFitness.level === 'Moderada' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                      {result.cardiovascularFitness.level}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {result.cardiovascularFitness.description}
                    </p>
                    <div className={`text-xs font-semibold inline-block px-2 py-1 rounded ${result.cardiovascularFitness.level === 'Alta' || result.cardiovascularFitness.level === 'Buena' ? 'bg-green-200 text-green-800' :
                      result.cardiovascularFitness.level === 'Moderada' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                      HRR: {result.cardiovascularFitness.hrrRange}
                    </div>
                  </CardContent>
                </Card>

                {/* Recomendaciones */}
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-blue-900">
                      <Info className="w-4 h-4 mr-2" />
                      Recomendaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Guía de Entrenamiento */}
                <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-indigo-900">
                      <Activity className="w-4 h-4 mr-2" />
                      Guía de Entrenamiento por Nivel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-white/50 rounded-lg p-3">
                        <h4 className="font-semibold text-indigo-900 mb-2">Principiantes</h4>
                        <ul className="space-y-1">
                          {result.trainingGuidance.beginners.map((tip, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                              <span className="text-indigo-600 mr-2">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3">
                        <h4 className="font-semibold text-indigo-900 mb-2">Intermedios</h4>
                        <ul className="space-y-1">
                          {result.trainingGuidance.intermediate.map((tip, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                              <span className="text-indigo-600 mr-2">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/50 rounded-lg p-3">
                        <h4 className="font-semibold text-indigo-900 mb-2">Avanzados</h4>
                        <ul className="space-y-1">
                          {result.trainingGuidance.advanced.map((tip, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                              <span className="text-indigo-600 mr-2">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interpretación Clínica */}
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-gray-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-gray-900">
                      <Info className="w-4 h-4 mr-2" />
                      Interpretación Clínica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-2">
                      {result.clinicalSignificance}
                    </p>
                    <p className="text-sm text-gray-700">
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
                ¿Qué es la Frecuencia Cardíaca de Reserva (HRR)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La frecuencia cardíaca de reserva (HRR) es la diferencia entre tu frecuencia cardíaca máxima
                y tu frecuencia cardíaca en reposo. Se utiliza en el método de Karvonen para calcular zonas
                de entrenamiento más precisas que el simple porcentaje de la frecuencia cardíaca máxima.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <BarChart3 className="w-5 h-5 mr-3 text-blue-600" />
                  Fórmula HRR
                </h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-mono bg-gray-100 p-3 rounded">
                    HRR = FC Máxima - FC en Reposo
                  </p>
                  <p>
                    La HRR representa la capacidad de tu corazón para aumentar su frecuencia desde el reposo
                    hasta el máximo durante el ejercicio.
                  </p>
                </div>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Activity className="w-5 h-5 mr-3 text-green-600" />
                  Método Karvonen
                </h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-mono bg-gray-100 p-3 rounded">
                    FC Objetivo = (HRR × Intensidad%) + FC en Reposo
                  </p>
                  <p>
                    El método Karvonen usa la HRR para calcular zonas de entrenamiento más precisas,
                    especialmente útil para personas con FC en reposo alta o baja.
                  </p>
                </div>
              </article>
            </section>

            <section className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <Info className="w-5 h-5 mr-3" />
                Ventajas del Método Karvonen
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mayor Precisión
                  </h4>
                  <p className="text-sm text-gray-700">
                    El método Karvonen es más preciso que usar porcentajes simples de FC máxima porque
                    tiene en cuenta la FC en reposo, lo que hace que las zonas de entrenamiento sean
                    más personalizadas.
                  </p>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Personalización
                  </h4>
                  <p className="text-sm text-gray-700">
                    Las zonas de entrenamiento se ajustan automáticamente según tu FC en reposo,
                    lo que es especialmente útil si tienes una FC en reposo alta o baja.
                  </p>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mejor para Atletas
                  </h4>
                  <p className="text-sm text-gray-700">
                    Los atletas con FC en reposo baja se benefician especialmente del método Karvonen,
                    ya que sus zonas de entrenamiento serán más precisas que con métodos simples.
                  </p>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Evaluación de Condición
                  </h4>
                  <p className="text-sm text-gray-700">
                    La HRR también es un indicador de condición cardiovascular. Una HRR alta indica
                    buena condición cardiovascular y capacidad de adaptación al ejercicio.
                  </p>
                </article>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-cyan-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl">
                Preguntas Frecuentes (FAQ)
              </h3>
              <div className="space-golden-md">
                <article className="card-golden bg-white/50">
                  <h4 className="font-semibold mb-2 text-blue-800">¿Por qué usar HRR en lugar de porcentajes simples?</h4>
                  <p className="text-sm text-gray-700">
                    El método Karvonen (usando HRR) es más preciso porque tiene en cuenta tu frecuencia cardíaca
                    en reposo. Esto hace que las zonas de entrenamiento sean más personalizadas y precisas,
                    especialmente si tienes una FC en reposo alta o baja.
                  </p>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-semibold mb-2 text-blue-800">¿Cómo mido mi FC en reposo?</h4>
                  <p className="text-sm text-gray-700">
                    Mide tu frecuencia cardíaca en reposo por la mañana, antes de levantarte de la cama.
                    Idealmente, hazlo durante varios días y toma el promedio. Una FC en reposo normal
                    está entre 60-100 bpm, aunque los atletas pueden tener valores más bajos (40-60 bpm).
                  </p>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-semibold mb-2 text-blue-800">¿Qué significa una HRR alta o baja?</h4>
                  <p className="text-sm text-gray-700">
                    Una HRR alta (≥75% de FC máxima) indica excelente condición cardiovascular y gran capacidad
                    de adaptación al ejercicio. Una HRR baja (&lt;45% de FC máxima) puede indicar condición
                    cardiovascular subóptima o FC en reposo elevada, y puede requerir evaluación médica.
                  </p>
                </article>
                <article className="card-golden bg-white/50">
                  <h4 className="font-semibold mb-2 text-blue-800">¿Cuál es la diferencia entre HRR y recuperación cardíaca?</h4>
                  <p className="text-sm text-gray-700">
                    La HRR (Heart Rate Reserve) es la diferencia entre FC máxima y FC en reposo, usada para
                    calcular zonas de entrenamiento. La recuperación cardíaca mide cuánto baja tu FC después
                    de detener el ejercicio, evaluando la condición cardiovascular y función autonómica.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/frecuencia-cardiaca-reserva" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Frecuencia Cardíaca de Reserva (HRR) - Método Karvonen"
            url="https://nutrifit-calculator.com/frecuencia-cardiaca-reserva"
            description="Calcula tu frecuencia cardíaca de reserva (HRR) usando el método Karvonen para obtener zonas de entrenamiento precisas. Más exacta que porcentajes simples de FC máxima. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="frecuencia-cardiaca-reserva" />
        </main>
      </Container>
    </>
  );
}
