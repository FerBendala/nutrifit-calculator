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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeVO2Max, calculateVO2MaxAstrand, calculateVO2MaxCooper, calculateVO2MaxRockport, calculateVO2MaxStepTest } from '@/lib/formulas';
import { Activity, Calculator, Heart, Info, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

interface VO2MaxResult {
  method: string;
  vo2max: number;
  category: string;
  fitnessLevel: string;
  healthStatus: string;
  recommendations: string[];
  comparison: string;
  trainingZones: {
    zone1: string;
    zone2: string;
    zone3: string;
    zone4: string;
    zone5: string;
  };
}

export default function VO2MaxPage() {
  const [activeTab, setActiveTab] = useState('cooper');
  const [formData, setFormData] = useState({
    // Cooper test
    cooperDistance: '',
    cooperWeight: '',

    // Rockport test
    rockportGender: 'male',
    rockportWeight: '',
    rockportAge: '',
    rockportTime: '',
    rockportHeartRate: '',

    // Astrand test
    astrandWorkRate: '',
    astrandWeight: '',
    astrandHeartRate: '',

    // Step test
    stepTestDuration: '',
    stepTestPulse1: '',
    stepTestPulse2: '',
    stepTestPulse3: '',
    stepTestWeight: '',
    stepTestAge: ''
  });

  const [result, setResult] = useState<VO2MaxResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let vo2max: number;
      let method: string;

      switch (activeTab) {
        case 'cooper':
          const distance = parseFloat(formData.cooperDistance);
          const weight = parseFloat(formData.cooperWeight);
          vo2max = calculateVO2MaxCooper(distance, weight);
          method = 'Test de Cooper (12 minutos)';
          break;

        case 'rockport':
          const rockportAge = parseInt(formData.rockportAge);
          const rockportWeight = parseFloat(formData.rockportWeight);
          const rockportTime = parseFloat(formData.rockportTime);
          const rockportHR = parseInt(formData.rockportHeartRate);
          vo2max = calculateVO2MaxRockport(
            formData.rockportGender as 'male' | 'female',
            rockportWeight,
            rockportAge,
            rockportTime,
            rockportHR
          );
          method = 'Test de Rockport (caminata)';
          break;

        case 'astrand':
          const workRate = parseFloat(formData.astrandWorkRate);
          const astrandWeight = parseFloat(formData.astrandWeight);
          const astrandHR = parseInt(formData.astrandHeartRate);
          vo2max = calculateVO2MaxAstrand(workRate, astrandWeight, astrandHR);
          method = 'Test de Astrand (bicicleta)';
          break;

        case 'step':
          const stepAge = parseInt(formData.stepTestAge);
          const stepWeight = parseFloat(formData.stepTestWeight);
          const stepDuration = parseInt(formData.stepTestDuration);
          const stepPulse1 = parseInt(formData.stepTestPulse1);
          const stepPulse2 = parseInt(formData.stepTestPulse2);
          const stepPulse3 = parseInt(formData.stepTestPulse3);
          vo2max = calculateVO2MaxStepTest(
            stepDuration,
            stepPulse1,
            stepPulse2,
            stepPulse3,
            stepWeight,
            stepAge
          );
          method = 'Test de Harvard (step)';
          break;

        default:
          throw new Error('Método no válido');
      }

      const analysis = analyzeVO2Max(
        vo2max,
        parseInt(formData.rockportAge || formData.stepTestAge || '30'),
        formData.rockportGender as 'male' | 'female' || 'male'
      );

      setResult({
        method,
        vo2max: analysis.vo2max,
        category: analysis.category,
        fitnessLevel: analysis.fitnessLevel,
        healthStatus: analysis.healthStatus,
        recommendations: analysis.recommendations,
        comparison: analysis.comparison,
        trainingZones: analysis.trainingZones
      });

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const isFormValid = () => {
    switch (activeTab) {
      case 'cooper':
        return formData.cooperDistance && formData.cooperWeight;
      case 'rockport':
        return formData.rockportGender && formData.rockportWeight && formData.rockportAge && formData.rockportTime && formData.rockportHeartRate;
      case 'astrand':
        return formData.astrandWorkRate && formData.astrandWeight && formData.astrandHeartRate;
      case 'step':
        return formData.stepTestDuration && formData.stepTestPulse1 && formData.stepTestPulse2 && formData.stepTestPulse3 && formData.stepTestWeight && formData.stepTestAge;
      default:
        return false;
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="vo2max" />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora VO2 Max
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu VO2 Max con 4 métodos científicos (Test de Cooper, Rockport, Astrand, Step Test).
              Evalúa tu capacidad cardiovascular y nivel de fitness.
              Descubre si tu condición aeróbica es excelente, buena o necesita mejorar.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de VO2 Max">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-foreground">
                  Calculadora de VO2 Max
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Elige el método de cálculo según tu disponibilidad de equipo y preferencias
                </p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="relative z-10 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 sm:mb-6 lg:mb-0 h-auto sm:h-auto lg:h-10">
                    <TabsTrigger value="cooper">Test de Cooper</TabsTrigger>
                    <TabsTrigger value="rockport">Test de Rockport</TabsTrigger>
                    <TabsTrigger value="astrand">Test de Astrand</TabsTrigger>
                    <TabsTrigger value="step">Test de Harvard</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cooper" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-info-subtle rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-info mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-foreground/90 mb-1">Test de Cooper (12 minutos)</h3>
                            <p className="text-sm text-info">
                              Corre o camina la mayor distancia posible en 12 minutos. Mide la distancia en metros.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <NumberInput
                          id="cooperDistance"
                          label="Distancia recorrida"
                          value={formData.cooperDistance}
                          onChange={(value) => handleInputChange('cooperDistance', value)}
                          placeholder="2400"
                          unit="metros"
                          min={100}
                          max={5000}
                          step={10}
                          required
                        />

                        <NumberInput
                          id="cooperWeight"
                          label="Peso corporal"
                          value={formData.cooperWeight}
                          onChange={(value) => handleInputChange('cooperWeight', value)}
                          placeholder="70"
                          unit="kg"
                          min={30}
                          max={200}
                          step={0.1}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular VO2 Max (Cooper)
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="rockport" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-success-subtle rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-success mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-foreground/90 mb-1">Test de Rockport (caminata)</h3>
                            <p className="text-sm text-success">
                              Camina 1 milla (1609m) lo más rápido posible. Registra el tiempo y el ritmo cardíaco al finalizar.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="rockportGender"
                          label="Sexo"
                          value={formData.rockportGender}
                          onChange={(value) => handleInputChange('rockportGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="rockportAge"
                          label="Edad"
                          value={formData.rockportAge}
                          onChange={(value) => handleInputChange('rockportAge', value)}
                          placeholder="30"
                          unit="años"
                          min={16}
                          max={80}
                          required
                        />

                        <NumberInput
                          id="rockportWeight"
                          label="Peso corporal"
                          value={formData.rockportWeight}
                          onChange={(value) => handleInputChange('rockportWeight', value)}
                          placeholder="70"
                          unit="kg"
                          min={30}
                          max={200}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="rockportTime"
                          label="Tiempo para 1 milla"
                          value={formData.rockportTime}
                          onChange={(value) => handleInputChange('rockportTime', value)}
                          placeholder="15"
                          unit="minutos"
                          min={8}
                          max={30}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="rockportHeartRate"
                          label="Ritmo cardíaco final"
                          value={formData.rockportHeartRate}
                          onChange={(value) => handleInputChange('rockportHeartRate', value)}
                          placeholder="140"
                          unit="bpm"
                          min={60}
                          max={200}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular VO2 Max (Rockport)
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="astrand" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-warning-subtle rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-warning mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">Test de Astrand (bicicleta)</h3>
                            <p className="text-sm text-warning">
                              Usa un cicloergómetro. Mantén un ritmo cardíaco estable durante 6 minutos.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <NumberInput
                          id="astrandWorkRate"
                          label="Potencia de trabajo"
                          value={formData.astrandWorkRate}
                          onChange={(value) => handleInputChange('astrandWorkRate', value)}
                          placeholder="150"
                          unit="watts"
                          min={50}
                          max={300}
                          step={5}
                          required
                        />

                        <NumberInput
                          id="astrandWeight"
                          label="Peso corporal"
                          value={formData.astrandWeight}
                          onChange={(value) => handleInputChange('astrandWeight', value)}
                          placeholder="70"
                          unit="kg"
                          min={30}
                          max={200}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="astrandHeartRate"
                          label="Ritmo cardíaco promedio"
                          value={formData.astrandHeartRate}
                          onChange={(value) => handleInputChange('astrandHeartRate', value)}
                          placeholder="140"
                          unit="bpm"
                          min={60}
                          max={200}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular VO2 Max (Astrand)
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="step" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-warning-subtle rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-warning mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-foreground/90 mb-1">Test de Harvard (step)</h3>
                            <p className="text-sm text-warning">
                              Sube y baja de un escalón de 30cm durante 5 minutos. Mide el pulso en los 3 primeros minutos de recuperación.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <NumberInput
                          id="stepTestAge"
                          label="Edad"
                          value={formData.stepTestAge}
                          onChange={(value) => handleInputChange('stepTestAge', value)}
                          placeholder="30"
                          unit="años"
                          min={16}
                          max={80}
                          required
                        />

                        <NumberInput
                          id="stepTestWeight"
                          label="Peso corporal"
                          value={formData.stepTestWeight}
                          onChange={(value) => handleInputChange('stepTestWeight', value)}
                          placeholder="70"
                          unit="kg"
                          min={30}
                          max={200}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="stepTestDuration"
                          label="Duración del test"
                          value={formData.stepTestDuration}
                          onChange={(value) => handleInputChange('stepTestDuration', value)}
                          placeholder="300"
                          unit="segundos"
                          min={60}
                          max={600}
                          required
                        />

                        <NumberInput
                          id="stepTestPulse1"
                          label="Pulso 1er minuto"
                          value={formData.stepTestPulse1}
                          onChange={(value) => handleInputChange('stepTestPulse1', value)}
                          placeholder="120"
                          unit="bpm"
                          min={60}
                          max={200}
                          required
                        />

                        <NumberInput
                          id="stepTestPulse2"
                          label="Pulso 2do minuto"
                          value={formData.stepTestPulse2}
                          onChange={(value) => handleInputChange('stepTestPulse2', value)}
                          placeholder="100"
                          unit="bpm"
                          min={60}
                          max={200}
                          required
                        />

                        <NumberInput
                          id="stepTestPulse3"
                          label="Pulso 3er minuto"
                          value={formData.stepTestPulse3}
                          onChange={(value) => handleInputChange('stepTestPulse3', value)}
                          placeholder="90"
                          unit="bpm"
                          min={60}
                          max={200}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular VO2 Max (Step Test)
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-bold text-center text-foreground">
                  Resultados VO2 Max - {result.method}
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* Main Results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <article className="text-center p-6 bg-info-subtle rounded-lg border-l-4 border-info">
                      <div className="text-3xl font-bold text-info mb-2">
                        {result.vo2max} ml/kg/min
                      </div>
                      <div className="text-sm font-medium text-foreground/90">VO2 Max</div>
                    </article>

                    <article className={`text-center p-6 rounded-lg border-l-4 ${getCategoryColor(result.category)}`}>
                      <div className="text-3xl font-bold mb-2">
                        {result.category}
                      </div>
                      <div className="text-sm font-medium">Categoría</div>
                    </article>

                    <article className={`text-center p-6 rounded-lg border-l-4 ${getCategoryColor(result.category)}`}>
                      <div className="text-3xl font-bold mb-2">
                        <Heart className="h-8 w-8 mx-auto" />
                      </div>
                      <div className="text-sm font-medium">{result.fitnessLevel}</div>
                    </article>
                  </div>

                  {/* Training Zones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="card-golden bg-card/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-foreground flex items-center">
                          <Zap className="h-5 w-5 mr-2 text-info" />
                          Zonas de Entrenamiento
                        </h3>
                      </header>
                      <div className="p-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-info">Zona 1:</span>
                            <span className="text-sm text-muted-foreground">{result.trainingZones.zone1}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-success">Zona 2:</span>
                            <span className="text-sm text-muted-foreground">{result.trainingZones.zone2}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-warning">Zona 3:</span>
                            <span className="text-sm text-muted-foreground">{result.trainingZones.zone3}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-warning">Zona 4:</span>
                            <span className="text-sm text-muted-foreground">{result.trainingZones.zone4}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-destructive">Zona 5:</span>
                            <span className="text-sm text-muted-foreground">{result.trainingZones.zone5}</span>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article className="card-golden bg-card/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-foreground">
                          Recomendaciones
                        </h3>
                      </header>
                      <div className="p-6">
                        <div className="space-y-3">
                          {result.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-info rounded-full mt-2 mr-1 flex-shrink-0"></span>
                              <span className="text-sm text-muted-foreground leading-[1.618]">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>

                  {/* Health Status */}
                  <article className="card-golden-lg bg-info-subtle border-l-4 border-info">
                    <header className="p-6 pb-0">
                      <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                        <Heart className="w-5 h-5 mr-2" />
                        Estado de Salud Cardiovascular
                      </h3>
                    </header>
                    <div className="p-6">
                      <p className="text-foreground/90 leading-relaxed mb-4">
                        <strong>{result.healthStatus}</strong>
                      </p>
                      <p className="text-sm text-info leading-relaxed">
                        {result.comparison}
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el VO2 Max?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El <strong>VO2 Max</strong> (consumo máximo de oxígeno) es la cantidad máxima de oxígeno que tu cuerpo puede utilizar durante el ejercicio intenso.
                  Es el indicador más preciso de tu <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">capacidad cardiovascular</a> y resistencia aeróbica.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Se expresa en mililitros de oxígeno por kilogramo de peso corporal por minuto (ml/kg/min).
                  Un VO2 Max más alto indica mejor condición física y menor riesgo de enfermedades cardiovasculares.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Beneficios de un VO2 Max Alto
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Mejor resistencia:</strong> Mayor capacidad para ejercicio prolongado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Salud cardíaca:</strong> Menor riesgo de enfermedades cardiovasculares</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Recuperación rápida:</strong> El corazón se recupera más rápido del esfuerzo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Longevidad:</strong> Asociado con mayor esperanza de vida</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Rendimiento deportivo:</strong> Mejora en deportes de resistencia</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Cómo Mejorar tu VO2 Max
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento HIIT:</strong> Intervalos de alta intensidad mejoran el VO2 Max</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento continuo:</strong> Carrera o ciclismo a ritmo moderado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento de tempo:</strong> Ritmo constante durante 20-30 minutos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Entrenamiento de fuerza:</strong> Mejora la economía de movimiento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Descanso adecuado:</strong> El sueño es crucial para la adaptación</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Zonas de Entrenamiento
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-info-subtle rounded-lg">
                    <div className="text-lg font-bold text-info">Zona 1</div>
                    <div className="text-xs text-info">50-60% FCM</div>
                    <div className="text-xs text-muted-foreground">Recuperación</div>
                  </div>
                  <div className="text-center p-3 bg-success-subtle rounded-lg">
                    <div className="text-lg font-bold text-success">Zona 2</div>
                    <div className="text-xs text-success">60-70% FCM</div>
                    <div className="text-xs text-muted-foreground">Resistencia</div>
                  </div>
                  <div className="text-center p-3 bg-warning-subtle rounded-lg">
                    <div className="text-lg font-bold text-warning">Zona 3</div>
                    <div className="text-xs text-warning">70-80% FCM</div>
                    <div className="text-xs text-muted-foreground">Tempo</div>
                  </div>
                  <div className="text-center p-3 bg-warning-subtle rounded-lg">
                    <div className="text-lg font-bold text-warning">Zona 4</div>
                    <div className="text-xs text-warning">80-90% FCM</div>
                    <div className="text-xs text-muted-foreground">Umbral</div>
                  </div>
                  <div className="text-center p-3 bg-destructive-subtle rounded-lg">
                    <div className="text-lg font-bold text-destructive">Zona 5</div>
                    <div className="text-xs text-destructive">90-100% FCM</div>
                    <div className="text-xs text-muted-foreground">VO2 Max</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación cardiovascular
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/ritmo-cardiaco/" className="text-info hover:underline transition-colors font-medium transition-golden">Zonas de entrenamiento:</a></strong> Calcula tus zonas cardíacas específicas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/1rm/" className="text-info hover:underline transition-colors font-medium transition-golden">Fuerza máxima:</a></strong> Combina cardio con entrenamiento de fuerza</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/masa-muscular/" className="text-info hover:underline transition-colors font-medium transition-golden">Masa muscular:</a></strong> La masa magra mejora la eficiencia cardiovascular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Gasto calórico:</a></strong> Ajusta tu nutrición para entrenamientos intensos</span>
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="vo2max" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora VO2 Max - Capacidad Cardiovascular"
            url="https://nutrifit-calculator.com/vo2max/"
            description="Calcula tu VO2 Max con 4 métodos científicos. Evalúa tu capacidad cardiovascular y obtén zonas de entrenamiento personalizadas. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="vo2max" />
        </main>
      </Container>
    </>
  );

  function getCategoryColor(category: string) {
    switch (category) {
      case 'Excelente': return 'text-foreground bg-success-subtle border-success';
      case 'Bueno': return 'text-foreground bg-info-subtle border-info';
      case 'Promedio': return 'text-foreground bg-warning-subtle border-warning';
      case 'Bajo': return 'text-foreground bg-destructive-subtle border-destructive';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  }
}
