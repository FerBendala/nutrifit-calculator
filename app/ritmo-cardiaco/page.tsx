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
import { calculateFatBurningZone, calculateHeartRateZones, calculateMaxHeartRate } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

interface HeartRateResult {
  maxHR: number;
  formula: string;
  accuracy: string;
  zones: {
    zone1: { min: number; max: number; name: string; description: string; color: string; };
    zone2: { min: number; max: number; name: string; description: string; color: string; };
    zone3: { min: number; max: number; name: string; description: string; color: string; };
    zone4: { min: number; max: number; name: string; description: string; color: string; };
    zone5: { min: number; max: number; name: string; description: string; color: string; };
  };
  fatBurning: {
    min: number;
    max: number;
    optimal: number;
    percentage: string;
  };
}

export default function RitmoCardiacoPage() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    formula: 'tanaka'
  });

  const [result, setResult] = useState<HeartRateResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { age, sex, formula } = formData;
    if (!age) return;

    const maxHRData = calculateMaxHeartRate(
      parseInt(age),
      formula as 'tanaka' | 'haskell' | 'gulati',
      sex as 'male' | 'female'
    );

    const zones = calculateHeartRateZones(maxHRData.maxHR);
    const fatBurning = calculateFatBurningZone(maxHRData.maxHR);

    setResult({
      maxHR: maxHRData.maxHR,
      formula: maxHRData.formula,
      accuracy: maxHRData.accuracy,
      zones,
      fatBurning
    });
  };

  const isFormValid = formData.age;
  const jsonLd = generateJsonLd('ritmo-cardiaco');

  return (
    <>
      <SchemaMarkup calculatorKey="ritmo-cardiaco" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Frecuencia Cardíaca
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento personalizadas.
              Descubre tus zonas de quema de grasa, cardio y anaeróbica según tu edad.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de ritmo cardíaco">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center">
                  <span className="text-3xl mr-3">❤️</span>
                  Calculadora de Ritmo Cardíaco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="age"
                      label="Edad"
                      value={formData.age}
                      onChange={handleInputChange('age')}
                      min={15}
                      max={100}
                      unit="años"
                      placeholder="25"
                      required
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
                      required
                    />
                  </div>

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
                    required
                  />

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    ❤️ Calcular Zonas de Entrenamiento
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="space-golden-md">
              {/* Frecuencia Cardíaca Máxima */}
              <article className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
                <header className="p-6 pb-0">
                  <h2 className="text-2xl font-semibold flex items-center justify-center">
                    <span className="text-3xl mr-3">💓</span>
                    Tu Frecuencia Cardíaca Máxima
                  </h2>
                </header>
                <div className="p-6">
                  <div className="text-center space-golden-sm">
                    <div className="text-6xl font-bold text-red-600 dark:text-red-400 mb-[0.618rem]">
                      {result.maxHR}
                    </div>
                    <div className="text-xl font-bold text-red-700 dark:text-red-300 mb-[0.382rem]">
                      pulsaciones por minuto (ppm)
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {result.formula}
                    </div>
                    <div className="text-sm text-muted-foreground mt-[0.618rem]">
                      {result.accuracy}
                    </div>
                  </div>
                </div>
              </article>

              {/* Zona de Quema de Grasa */}
              <article className="card-golden-lg shadow-golden-lg border-2 border-orange-400/20">
                <header className="p-6 pb-0">
                  <h2 className="text-2xl font-semibold flex items-center justify-center">
                    <span className="text-3xl mr-3">🔥</span>
                    Zona Óptima de Quema de Grasa
                  </h2>
                </header>
                <div className="p-6">
                  <div className="card-golden bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400">
                    <div className="text-center space-golden-sm">
                      <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-[0.618rem]">
                        {result.fatBurning.min} - {result.fatBurning.max} ppm
                      </div>
                      <div className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-[0.382rem]">
                        Zona 2 - Base Aeróbica ({result.fatBurning.percentage} FC máx)
                      </div>
                      <div className="text-sm text-orange-800 dark:text-orange-200">
                        <strong>Óptimo para quemar grasa:</strong> {result.fatBurning.optimal} ppm
                      </div>
                    </div>
                    <div className="mt-[1.618rem] text-sm text-orange-800 dark:text-orange-200">
                      <p className="leading-[1.618]">
                        <strong>💡 Consejo:</strong> Mantén tu ritmo cardíaco en esta zona durante
                        30-60 minutos para maximizar la quema de grasa. Es ideal para ejercicio
                        aeróbico sostenido como caminar rápido, trotar suave o ciclismo moderado.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Zonas de Entrenamiento */}
              <article className="card-golden-lg shadow-golden-lg">
                <header className="p-6 pb-0">
                  <h2 className="text-2xl font-semibold flex items-center justify-center">
                    <span className="text-3xl mr-3">🎯</span>
                    Zonas de Entrenamiento Cardiovascular
                  </h2>
                </header>
                <div className="p-6">
                  <div className="space-golden-md">
                    {Object.entries(result.zones).map(([key, zone]) => {
                      const percentage = Math.round((zone.min / result.maxHR) * 100);
                      const percentageMax = Math.round((zone.max / result.maxHR) * 100);

                      return (
                        <section key={key} className="card-golden">
                          <div className="flex justify-between items-center mb-[0.618rem]">
                            <h3 className={`font-bold text-lg ${zone.color}`}>
                              {zone.name}
                            </h3>
                            <div className="text-right">
                              <div className={`font-bold text-xl ${zone.color}`}>
                                {zone.min} - {zone.max} ppm
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {percentage}% - {percentageMax}% FC máx
                              </div>
                            </div>
                          </div>

                          {/* Visual bar */}
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-[0.618rem]">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ease-out ${key === 'zone1' ? 'bg-muted0' :
                                key === 'zone2' ? 'bg-blue-50 dark:bg-blue-950/300' :
                                  key === 'zone3' ? 'bg-green-50 dark:bg-green-950/300' :
                                    key === 'zone4' ? 'bg-yellow-50 dark:bg-yellow-950/300' : 'bg-red-50 dark:bg-red-950/300'
                                }`}
                              style={{ width: `${percentageMax}%` }}
                            ></div>
                          </div>

                          <p className="text-sm text-muted-foreground leading-[1.618]">
                            {zone.description}
                          </p>
                        </section>
                      );
                    })}
                  </div>
                </div>
              </article>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Entendiendo tu ritmo cardíaco y zonas de entrenamiento
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El entrenamiento por zonas de frecuencia cardíaca te permite optimizar cada sesión
                según tu objetivo específico: quemar grasa, mejorar resistencia o aumentar potencia.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Fórmulas científicas
                </h3>
                <p className="text-muted-foreground leading-[1.618] mb-[1rem]">
                  Utilizamos fórmulas validadas científicamente para calcular tu frecuencia cardíaca máxima:
                </p>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span><strong>Tanaka:</strong> 208 - (0.7 × edad) - Más precisa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-600 mr-2">•</span>
                    <span><strong>Gulati:</strong> 206 - (0.88 × edad) - Para mujeres</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-muted-foreground mr-2">•</span>
                    <span><strong>Clásica:</strong> 220 - edad - Ampliamente conocida</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Beneficios del entrenamiento por zonas
                </h3>
                <ul className="text-sm space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span>Optimización de cada sesión de entrenamiento</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span>Máxima eficiencia en la quema de grasa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span>Mejora progresiva del rendimiento cardiovascular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span>Prevención del sobreentrenamiento</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="card-golden-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔥</span>
                Guía detallada de zonas de entrenamiento
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-muted-foreground flex items-center">
                    <span className="text-lg mr-2">⚪</span>
                    Zona 1 - Recuperación (50-60%)
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li>• Duración: 20-60 minutos</li>
                    <li>• Ideal para: Calentamiento y enfriamiento</li>
                    <li>• Sensación: Muy fácil, puedes conversar</li>
                    <li>• Beneficio: Recuperación activa</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <span className="text-lg mr-2">🔵</span>
                    Zona 2 - Base Aeróbica (60-70%)
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li>• Duración: 30-90 minutos</li>
                    <li>• Ideal para: <strong>Quemar grasa</strong></li>
                    <li>• Sensación: Cómodo, respiración controlada</li>
                    <li>• Beneficio: Mejora la eficiencia metabólica</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300 flex items-center">
                    <span className="text-lg mr-2">🟢</span>
                    Zona 3 - Aeróbica (70-80%)
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li>• Duración: 20-60 minutos</li>
                    <li>• Ideal para: Resistencia cardiovascular</li>
                    <li>• Sensación: Moderado, respiración profunda</li>
                    <li>• Beneficio: Mejora la capacidad aeróbica</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-yellow-700 dark:text-yellow-300 flex items-center">
                    <span className="text-lg mr-2">🟡</span>
                    Zona 4 - Umbral (80-90%)
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-golden-xs">
                    <li>• Duración: 10-40 minutos</li>
                    <li>• Ideal para: Mejorar velocidad y potencia</li>
                    <li>• Sensación: Difícil, respiración agitada</li>
                    <li>• Beneficio: Aumenta el umbral anaeróbico</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-orange-50 dark:bg-orange-950/30 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔥</span>
                Maximizando la quema de grasa
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-orange-700 dark:text-orange-300">🎯 Zona óptima</h4>
                  <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
                    <li>• <strong>60-70% FC máxima</strong> - Zona 2</li>
                    <li>• El cuerpo usa principalmente grasa como combustible</li>
                    <li>• Puedes mantener esta intensidad por tiempo prolongado</li>
                    <li>• Ideal para personas que buscan perder peso</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-orange-700 dark:text-orange-300">⏱️ Duración recomendada</h4>
                  <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
                    <li>• <strong>Mínimo:</strong> 30 minutos para activar lipolisis</li>
                    <li>• <strong>Óptimo:</strong> 45-60 minutos para máxima quema</li>
                    <li>• <strong>Frecuencia:</strong> 3-5 veces por semana</li>
                    <li>• Combina con <a href="/proteina/" className="text-blue-600 dark:text-blue-400 hover:underline">dieta alta en proteína</a></li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-green-50 dark:bg-green-950/30 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📱</span>
                Cómo monitorear tu ritmo cardíaco
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300">📊 Métodos de medición</h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-golden-xs">
                    <li>• <strong>Pulsómetro de pecho:</strong> Más preciso</li>
                    <li>• <strong>Smartwatch/fitness tracker:</strong> Conveniente</li>
                    <li>• <strong>Medición manual:</strong> Pulso en muñeca o cuello</li>
                    <li>• <strong>Máquinas de gimnasio:</strong> Sensores integrados</li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300">💡 Consejos prácticos</h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-golden-xs">
                    <li>• Mide en reposo para establecer línea base</li>
                    <li>• Ajusta según cómo te sientes (RPE)</li>
                    <li>• Considera factores externos (calor, estrés)</li>
                    <li>• Mantente <a href="/agua/" className="text-blue-600 dark:text-blue-400 hover:underline">bien hidratado</a></li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Consideraciones importantes
              </h3>
              <ul className="text-sm text-yellow-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Los cálculos son estimaciones:</strong> La FC máxima real puede variar ±10-15 ppm</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Factores que afectan FC:</strong> Medicamentos, cafeína, estrés, temperatura</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Consulta médica:</strong> Si tienes problemas cardíacos o tomas medicación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                  <span><strong>Escucha tu cuerpo:</strong> Las sensaciones son tan importantes como los números</span>
                </li>
              </ul>
            </section>

            <section className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué fórmula debo usar para calcular mi FC máxima?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La fórmula de Tanaka es generalmente la más precisa para la población general.
                    Las mujeres pueden usar la fórmula de Gulati para mayor precisión específica por género.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo quemar grasa entrenando en zonas más altas?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, pero en zonas altas quemas más carbohidratos que grasa. La Zona 2 (60-70%)
                    es óptima para maximizar el uso de grasa como combustible.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cómo se relaciona con mi <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">plan nutricional</a>?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El entrenamiento cardiovascular debe complementar tu plan nutricional. Si buscas
                    perder grasa, combina Zona 2 con un déficit calórico moderado calculado con nuestras herramientas.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-orange-50 dark:bg-orange-950/30 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Optimiza tu plan de entrenamiento completo
              </h3>
              <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calcula tus calorías diarias:</a></strong> Ajusta tu nutrición según tu gasto calórico en cada zona</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/composicion/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Mide tu composición corporal:</a></strong> Evalúa los resultados de tu entrenamiento cardiovascular</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/vo2max/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Evalúa tu capacidad cardiovascular:</a></strong> Mide tu VO2 Max con tests científicos validados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/agua/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Mantén hidratación óptima:</a></strong> Fundamental para el rendimiento cardiovascular</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/ritmo-cardiaco" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/ritmo-cardiaco"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="ritmo-cardiaco" />
          </article>
        </main>
      </Container>
    </>
  );
}
