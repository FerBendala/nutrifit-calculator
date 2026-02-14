'use client';

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SocialShare } from '@/components/SocialShare';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeBSA } from '@/lib/formulas';
import { Activity, AlertTriangle, Calculator, Heart, Info, Pill, Stethoscope } from 'lucide-react';
import { useState } from 'react';

export default function BSAPage() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeBSA> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height) return;

    try {
      const analysis = analyzeBSA(
        parseFloat(formData.weight),
        parseFloat(formData.height)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating BSA:', error);
    }
  };

  const isFormValid = formData.weight && formData.height;

  return (
    <>
      <SchemaMarkup calculatorKey="bsa" />

      <Container size="xl" className="py-[4.236rem]">

        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora BSA (Superficie Corporal)
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica de BSA (Superficie Corporal) con 5 fórmulas científicas: Du Bois, Mosteller, Haycock, Gehan y Boyd.
              Esencial para dosificación de quimioterapia, cálculo de índice cardíaco y fluidos intravenosos.
            </p>
          </header>

          <section className="card-golden-lg bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 mb-8">
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                El <strong>BSA (Body Surface Area - Superficie Corporal)</strong> es una medida fundamental en medicina clínica
                que permite calcular dosis de medicamentos, necesidades de fluidos y parámetros cardíacos con mayor precisión
                que el peso corporal solo. Es especialmente crítico en oncología, cardiología y cuidados intensivos.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A diferencia de usar solo el peso, el BSA normaliza las dosis considerando tanto la altura como el peso,
                resultando en dosificaciones más precisas y seguras, especialmente en extremos de tamaño corporal.
                Representa el estándar de oro para dosificación de quimioterapia y otros fármacos críticos.
              </p>
            </div>
          </section>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de BSA">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🏥</span>
                  Calculadora de Superficie Corporal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> El BSA se calcula automáticamente con 5 fórmulas científicas diferentes.
                        La fórmula Du Bois es considerada el estándar de oro en medicina clínica desde 1916.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="weight"
                      label="Peso"
                      value={formData.weight}
                      onChange={handleInputChange('weight')}
                      min={20}
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
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    🏥 Calcular BSA
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
                  Resultados de Superficie Corporal
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* BSA Principal */}
                  <div className="text-center card-golden bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-6">
                    <div className="text-5xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                      {result.average.toFixed(3)} m²
                    </div>
                    <div className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-1">
                      Superficie Corporal Promedio
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Promedio de 5 fórmulas científicas (Du Bois, Mosteller, Haycock, Gehan, Boyd)
                    </p>
                  </div>

                  {/* Todas las fórmulas */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Resultados por Fórmula
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {result.comparison.map((formula, index) => (
                        <Card key={index} className={formula.formula === 'Du Bois' ? 'border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30/50' : ''}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center justify-between">
                              <span>{formula.formula}</span>
                              {formula.formula === 'Du Bois' && (
                                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Estándar</span>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-foreground mb-1">
                              {formula.value.toFixed(3)} m²
                            </div>
                            {formula.difference !== 0 && (
                              <div className={`text-xs ${formula.difference > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {formula.difference > 0 ? '+' : ''}{formula.difference.toFixed(2)}% vs Du Bois
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Aplicaciones Clínicas */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Quimioterapia */}
                    <Card className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-purple-900">
                          <Pill className="w-5 h-5 mr-2" />
                          Dosificación Quimioterapia
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Dosis estándar:</span>
                          <span className="font-bold text-purple-700 dark:text-purple-300">{result.clinicalApplications.chemotherapy.doseArea} mg/m²</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Dosis calculada:</span>
                          <span className="font-bold text-lg text-purple-800 dark:text-purple-200">{result.clinicalApplications.chemotherapy.exampleDose} mg</span>
                        </div>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                          Ejemplo: Doxorrubicina estándar 60-75 mg/m²
                        </p>
                      </CardContent>
                    </Card>

                    {/* Índice Cardiaco */}
                    <Card className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-red-900">
                          <Heart className="w-5 h-5 mr-2" />
                          Parámetros Cardíacos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Gasto cardíaco:</span>
                          <span className="font-bold text-red-700 dark:text-red-300">{result.clinicalApplications.cardiacIndex.cardiacOutput} L/min</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Volumen sistólico:</span>
                          <span className="font-bold text-lg text-red-800 dark:text-red-200">{result.clinicalApplications.cardiacIndex.strokeVolume} mL</span>
                        </div>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                          Asumiendo índice cardíaco normal (5 L/min/m²)
                        </p>
                      </CardContent>
                    </Card>

                    {/* Fluidos */}
                    <Card className="bg-cyan-50 border-l-4 border-cyan-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-cyan-900">
                          <Activity className="w-5 h-5 mr-2" />
                          Fluidoterapia
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Mantenimiento diario:</span>
                          <span className="font-bold text-cyan-700">{result.clinicalApplications.fluidResuscitation.maintenanceFluids} mL/día</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Resucitación quemaduras (20%):</span>
                          <span className="font-bold text-lg text-cyan-800">{result.clinicalApplications.fluidResuscitation.burnResuscitation} mL/24h</span>
                        </div>
                        <p className="text-xs text-cyan-600 mt-2">
                          Parkland: 4 mL/kg/% superficie quemada
                        </p>
                      </CardContent>
                    </Card>

                    {/* Nutrición */}
                    <Card className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-400">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center text-green-900">
                          <Stethoscope className="w-5 h-5 mr-2" />
                          Soporte Nutricional
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Calorías totales:</span>
                          <span className="font-bold text-green-700 dark:text-green-300">{result.clinicalApplications.nutritionalSupport.totalCalories} kcal/día</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Proteína:</span>
                          <span className="font-bold text-lg text-green-800 dark:text-green-200">{result.clinicalApplications.nutritionalSupport.proteinNeeds} g/día</span>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                          1000-1200 kcal/m² o 25-30 kcal/kg
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Ejemplos de Dosificación */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Pill className="w-5 h-5 mr-2" />
                        Ejemplos de Dosificación por BSA
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {result.clinicalApplications.drugDosage.examples.map((drug, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <div>
                              <div className="font-semibold text-sm text-foreground">{drug.drug}</div>
                              <div className="text-xs text-muted-foreground">{drug.dosePerBSA}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-blue-700 dark:text-blue-300">{drug.calculatedDose}</div>
                              <div className="text-xs text-gray-500">{drug.unit}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          <strong>Importante:</strong> Estas dosis son ejemplos educativos. Siempre consulta con el equipo médico
                          y revisa los protocolos hospitalarios antes de administrar cualquier medicamento.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  {/* Recomendaciones */}
                  <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-400">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center text-yellow-900">
                        <Info className="w-5 h-5 mr-2" />
                        Recomendaciones Clínicas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start text-sm text-yellow-800 dark:text-yellow-200">
                            <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* Información adicional */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                Importancia del BSA en medicina clínica moderna
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La Superficie Corporal (BSA) es una medida fundamental en medicina que permite dosificaciones más precisas
                y seguras de medicamentos críticos. A diferencia del peso corporal, el BSA considera tanto altura como peso,
                resultando en cálculos más exactos especialmente en extremos de tamaño.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">💊</span>
                  Aplicaciones médicas críticas
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    <span><strong>Quimioterapia:</strong> Dosificación estándar por m² según <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4163889/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">protocolos NCCN</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <span><strong>Cardiología:</strong> Cálculo de índice cardíaco, gasto cardíaco y volumen sistólico</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    <span><strong>Fluidoterapia:</strong> Mantenimiento diario y resucitación en quemaduras (fórmula Parkland)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Nutrición hospitalaria:</strong> Cálculo de calorías y proteínas en soporte nutricional</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    <span><strong>Antibióticos:</strong> Ajuste de dosis en pacientes con IMC extremo según <a href="/peso-ajustado/" className="text-blue-600 dark:text-blue-400 hover:underline">ABW y BSA</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-yellow-600 dark:text-yellow-400 mr-2">•</span>
                    <span><strong>Cuidados intensivos:</strong> Ventilación mecánica, dosis de vasoactivos y monitorización hemodinámica</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📐</span>
                  Fórmulas científicas validadas
                </h3>
                <div className="space-golden-sm">
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-300">Du Bois (1916) - Estándar de oro:</h4>
                    <p className="text-xs text-muted-foreground mt-1">0.007184 × peso^0.425 × altura^0.725</p>
                    <p className="text-xs text-muted-foreground mt-1">Más precisa y usada en oncología y cardiología</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-green-700 dark:text-green-300">Mosteller (1987) - Pediátrica:</h4>
                    <p className="text-xs text-muted-foreground mt-1">√((altura × peso) / 3600)</p>
                    <p className="text-xs text-muted-foreground mt-1">Simple y comúnmente usada en pediatría</p>
                  </section>
                  <section className="py-[0.382rem] border-b border-border/30">
                    <h4 className="font-semibold text-sm text-purple-700 dark:text-purple-300">Haycock (1978):</h4>
                    <p className="text-xs text-muted-foreground mt-1">Más precisa para niños y adultos de talla pequeña</p>
                  </section>
                  <section className="py-[0.382rem]">
                    <h4 className="font-semibold text-sm text-orange-700 dark:text-orange-300">Gehan & Boyd:</h4>
                    <p className="text-xs text-muted-foreground mt-1">Útiles en extremos de tamaño corporal</p>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-blue-50 dark:bg-blue-950/30 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Ventajas del BSA sobre peso corporal solo
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <span className="text-lg mr-2">📊</span>
                    Mayor precisión:
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Considera altura y peso, resultando en dosis más exactas especialmente en obesidad o bajo peso
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 dark:text-green-300 flex items-center">
                    <span className="text-lg mr-2">💊</span>
                    Seguridad:
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Reduce riesgo de sobredosis en pacientes grandes y subdosis en pacientes pequeños
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-purple-700 dark:text-purple-300 flex items-center">
                    <span className="text-lg mr-2">🏥</span>
                    Estándar clínico:
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Requerido en oncología, cardiología y cuidados intensivos para fármacos críticos
                  </p>
                </article>
              </div>
            </section>

            <section className="bg-purple-50 dark:bg-purple-950/30 card-golden-lg border-l-4 border-purple-400 mb-[2.618rem]">
              <h3 className="font-bold text-purple-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🧬</span>
                BSA en oncología y quimioterapia
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Fármacos dosificados por BSA:</h4>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• <strong>Doxorrubicina:</strong> 60-75 mg/m² cada 21 días</li>
                    <li>• <strong>Cisplatino:</strong> 50-100 mg/m² según protocolo</li>
                    <li>• <strong>Carboplatino:</strong> AUC (área bajo curva) basado en BSA</li>
                    <li>• <strong>Paclitaxel:</strong> 135-175 mg/m² cada 3 semanas</li>
                    <li>• <strong>5-Fluorouracilo:</strong> 400-1000 mg/m² según régimen</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Consideraciones especiales:</h4>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• <strong>Obesidad:</strong> Algunos protocolos usan <a href="/peso-ajustado/" className="text-blue-600 dark:text-blue-400 hover:underline">peso ajustado (ABW)</a> o BSA corregido</li>
                    <li>• <strong>Edad avanzada:</strong> Puede requerir reducción de dosis según comorbilidades</li>
                    <li>• <strong>Función renal/hepática:</strong> Ajustes adicionales necesarios</li>
                    <li>• <strong>Consistencia:</strong> Usar siempre la misma fórmula durante todo el tratamiento</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-red-50 dark:bg-red-950/30 card-golden-lg border-l-4 border-red-400 mb-[2.618rem]">
              <h3 className="font-bold text-red-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">❤️</span>
                BSA en cardiología
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <article>
                  <h4 className="font-semibold mb-2">Parámetros calculados:</h4>
                  <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                    <li>• <strong>Índice cardíaco (CI):</strong> Gasto cardíaco / BSA (normal: 2.5-4.0 L/min/m²)</li>
                    <li>• <strong>Volumen sistólico (SV):</strong> Gasto cardíaco / frecuencia cardíaca</li>
                    <li>• <strong>Resistencia vascular sistémica:</strong> Ajustada por BSA para comparación</li>
                    <li>• <strong>Eco cardiografía:</strong> Dimensiones ventriculares normalizadas por BSA</li>
                  </ul>
                </article>
                <article>
                  <h4 className="font-semibold mb-2">Aplicaciones clínicas:</h4>
                  <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                    <li>• Evaluación de función cardíaca en insuficiencia cardíaca</li>
                    <li>• Dosificación de inotrópicos y vasoactivos</li>
                    <li>• Monitorización post-cirugía cardíaca</li>
                    <li>• Interpretación de estudios de imagen cardíaca</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="space-y-4 mb-[2.618rem]">
              <h3 className="text-xl font-semibold mb-4">❓ Preguntas frecuentes sobre BSA</h3>
              <div className="space-y-3">
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Por qué usar BSA en lugar de peso corporal para dosificar medicamentos?</h4>
                  <p className="text-sm text-muted-foreground">
                    El BSA normaliza las dosis considerando tanto altura como peso, resultando en dosificaciones más precisas.
                    Es especialmente importante en extremos de tamaño corporal y para fármacos con ventana terapéutica estrecha.
                    Estudios muestran que el BSA reduce la variabilidad interindividual en la farmacocinética.
                  </p>
                </article>
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Qué fórmula de BSA debo usar en mi práctica clínica?</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Du Bois es el estándar de oro</strong> y debe usarse en la mayoría de casos, especialmente en oncología.
                    Mosteller es ampliamente aceptada en pediatría por su simplicidad. Lo más importante es usar la misma
                    fórmula de forma consistente durante todo el tratamiento del paciente.
                  </p>
                </article>
                <article className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">¿Cómo se relaciona el BSA con el peso ajustado (ABW)?</h4>
                  <p className="text-sm text-muted-foreground">
                    Ambos son herramientas complementarias. El <a href="/peso-ajustado/" className="text-blue-600 dark:text-blue-400 hover:underline">peso ajustado (ABW)</a> corrige
                    el peso actual en obesidad para cálculos metabólicos. El BSA considera altura y peso para dosificación.
                    En algunos protocolos de quimioterapia para obesidad, se combinan ambos para máxima precisión.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-orange-50 dark:bg-orange-950/30 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Calculadoras relacionadas para uso clínico
              </h3>
              <ul className="text-sm text-orange-800 dark:text-orange-200 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/peso-ajustado/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Peso Ajustado Clínico (ABW):</a></strong> Complementa el BSA en pacientes con obesidad para dosificación precisa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/egfr/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">eGFR (Filtrado Glomerular):</a></strong> Para ajuste de dosis según función renal (CKD-EPI, Cockcroft-Gault)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/proteina/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Necesidades de Proteína:</a></strong> El BSA se usa también para calcular requerimientos nutricionales hospitalarios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/imc/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Calculadora IMC:</a></strong> Útil para identificar pacientes que requieren ajustes en dosificación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                  <span><strong><a href="/peso-ideal/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-golden">Peso Ideal:</a></strong> Referencia para evaluar si se requiere ABW o BSA corregido</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/bsa" />

            {/* Widget para embeber */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora BSA Superficie Corporal - 5 Fórmulas Científicas"
              url="https://nutrifit-calculator.com/bsa"
              description="Calculadora profesional de BSA con fórmulas Du Bois, Mosteller, Haycock, Gehan y Boyd. Esencial para dosificación de quimioterapia y aplicaciones clínicas."
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="bsa" />
          </article>
        </main>
      </Container>
    </>
  );
}

