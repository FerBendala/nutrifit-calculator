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
import { calculateMuscleMass, type MuscleMassResult } from '@/lib/formulas';
import { AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function MasaMuscularPage() {
  const [formData, setFormData] = useState({
    sex: 'male' as 'male' | 'female',
    age: '',
    height: '',
    weight: '',
    bodyFatPercentage: ''
  });

  const [result, setResult] = useState<MuscleMassResult | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, age, height, weight, bodyFatPercentage } = formData;

    if (!age || !height || !weight || !bodyFatPercentage) return;

    const muscleMassResult = calculateMuscleMass(
      sex,
      parseInt(age),
      parseInt(height),
      parseInt(weight),
      parseFloat(bodyFatPercentage)
    );
    setResult(muscleMassResult);
  };

  const isFormValid = () => {
    const { age, height, weight, bodyFatPercentage } = formData;
    return age && height && weight && bodyFatPercentage;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Excelente': return 'text-green-600 bg-green-50 border-green-400';
      case 'Bueno': return 'text-blue-600 bg-blue-50 border-blue-400';
      case 'Promedio': return 'text-yellow-600 bg-yellow-50 border-yellow-400';
      case 'Bajo': return 'text-red-600 bg-red-50 border-red-400';
      default: return 'text-gray-600 bg-gray-50 border-gray-400';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="masa-muscular" />
      <Container size="xl" className="space-golden-lg">
        {/* Header */}
        <div className="text-center space-golden-lg pt-[2.618rem]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculadora de Masa Muscular Médica
          </h1>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">
            Calculadora profesional de masa muscular con fórmula de Lee (2000) validada científicamente.
            Índice de masa muscular preciso para deportistas y profesionales de la salud.
            Utilizada por nutricionistas deportivos y médicos especialistas.
          </p>
        </div>

        {/* Calculator Form */}
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Calculadora de Masa Muscular
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
                  required
                />

                <NumberInput
                  id="age"
                  label="Edad"
                  value={formData.age}
                  onChange={handleInputChange('age')}
                  min={16}
                  max={100}
                  unit="años"
                  placeholder="25"
                  required
                />

                <NumberInput
                  id="height"
                  label="Altura"
                  value={formData.height}
                  onChange={handleInputChange('height')}
                  min={120}
                  max={220}
                  unit="cm"
                  placeholder="170"
                  required
                />

                <NumberInput
                  id="weight"
                  label="Peso"
                  value={formData.weight}
                  onChange={handleInputChange('weight')}
                  min={30}
                  max={200}
                  unit="kg"
                  placeholder="70"
                  required
                />

                <div className="md:col-span-2">
                  <NumberInput
                    id="bodyFatPercentage"
                    label="Porcentaje de Grasa Corporal"
                    value={formData.bodyFatPercentage}
                    onChange={handleInputChange('bodyFatPercentage')}
                    min={3}
                    max={50}
                    unit="%"
                    placeholder="15"
                    required
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    💡 <strong>¿No conoces tu porcentaje de grasa?</strong> Usa nuestra
                    <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium transition-golden ml-1">
                      calculadora de grasa corporal
                    </a> con métodos científicos de pliegues cutáneos para obtenerlo de forma precisa.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid()}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                💪 Calcular masa muscular
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Information about body fat percentage */}
        <Card className="card-golden-lg bg-orange-50 border-l-4 border-orange-400">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-orange-800 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              ¿Cómo obtener tu porcentaje de grasa corporal?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-golden-sm">
            <p className="text-orange-800 mb-4">
              Para calcular tu masa muscular de forma precisa, necesitas conocer tu porcentaje de grasa corporal.
              Te ofrecemos varias opciones:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card-golden bg-white/50">
                <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                  <span className="text-lg mr-2">📏</span>
                  Método más preciso
                </h4>
                <p className="text-sm text-orange-800 mb-3">
                  Usa nuestra <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium transition-golden">calculadora de grasa corporal</a> con métodos científicos de pliegues cutáneos (Jackson-Pollock, Durnin-Womersley).
                </p>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• Precisión de ±3-5%</li>
                  <li>• Métodos validados científicamente</li>
                  <li>• Solo necesitas un calibrador de pliegues</li>
                </ul>
              </div>
              <div className="card-golden bg-white/50">
                <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                  <span className="text-lg mr-2">📐</span>
                  Método alternativo
                </h4>
                <p className="text-sm text-orange-800 mb-3">
                  Usa nuestra <a href="/composicion" className="text-blue-600 hover:underline font-medium transition-golden">calculadora de composición corporal</a> con el método Navy (circunferencias corporales).
                </p>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• Precisión de ±3-4%</li>
                  <li>• Solo necesitas una cinta métrica</li>
                  <li>• Método rápido y fácil</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="card-golden-lg shadow-golden-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Resultados de Masa Muscular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-golden-lg">
              {/* Main Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {result.muscleMass} kg
                  </div>
                  <div className="text-sm font-medium text-blue-800">Masa Muscular</div>
                </div>

                <div className="text-center p-6 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {result.muscleMassIndex}
                  </div>
                  <div className="text-sm font-medium text-green-800">Índice de Masa Muscular</div>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {result.muscleMassPercentage}%
                  </div>
                  <div className="text-sm font-medium text-purple-800">% Masa Muscular</div>
                </div>

                <div className={`text-center p-6 rounded-lg border-l-4 ${getCategoryColor(result.muscleMassCategory)}`}>
                  <div className="text-3xl font-bold mb-2">
                    {result.muscleMassCategory}
                  </div>
                  <div className="text-sm font-medium">Categoría</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="card-golden bg-white/50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Composición Corporal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-golden-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Masa Muscular:</span>
                        <span className="font-semibold">{result.muscleMass} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Masa Libre de Grasa:</span>
                        <span className="font-semibold">{result.fatFreeMass} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Masa Magra:</span>
                        <span className="font-semibold">{result.leanBodyMass} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Masa Esquelética:</span>
                        <span className="font-semibold">{result.skeletalMuscleMass} kg</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-golden bg-white/50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Recomendaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-golden-sm">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Estado Actual:</div>
                        <div className="text-sm text-gray-600">{result.recommendations.current}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Objetivo Ideal:</div>
                        <div className="text-sm text-gray-600">{result.recommendations.ideal}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">Entrenamiento:</div>
                        <div className="text-sm text-gray-600">{result.recommendations.training}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Educational Content */}
        <div className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            ¿Qué es la Masa Muscular?
          </h2>

          <Card className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
            <CardContent className="pt-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                La masa muscular es la cantidad total de tejido muscular en tu cuerpo,
                incluyendo músculos esqueléticos, cardíacos y lisos. Es un componente
                crucial de la <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841933/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">composición corporal</a> y está directamente relacionada con la fuerza, el metabolismo y la salud general.
                Para calcularla con precisión, necesitas conocer tu <a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium transition-golden">porcentaje de grasa corporal</a>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nuestra calculadora utiliza la <a href="https://pubmed.ncbi.nlm.nih.gov/10919906/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">ecuación de Lee (2000)</a> para estimar la masa muscular esquelética, que es la más relevante para
                el rendimiento físico y la salud metabólica.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-golden-lg bg-green-50 border-l-4 border-green-400">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Beneficios de la Masa Muscular
                </CardTitle>
              </CardHeader>
              <CardContent className="space-golden-sm">
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Metabolismo acelerado:</strong> Quema más calorías en reposo - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios sobre metabolismo</a></span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Fuerza y resistencia:</strong> Mejora el rendimiento físico</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Salud ósea:</strong> Previene osteoporosis y fracturas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Regulación glucosa:</strong> Mejora la sensibilidad a la insulina</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Longevidad:</strong> Asociada con mayor esperanza de vida</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-golden-lg bg-yellow-50 border-l-4 border-yellow-400">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Factores que Afectan la Masa Muscular
                </CardTitle>
              </CardHeader>
              <CardContent className="space-golden-sm">
                <ul className="space-y-2 text-yellow-800">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Edad:</strong> Disminuye naturalmente después de los 30 años</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Sexo:</strong> Los hombres tienen mayor masa muscular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Entrenamiento:</strong> Ejercicio de fuerza regular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Nutrición:</strong> Proteína adecuada y calorías suficientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Genética:</strong> Factores hereditarios</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="card-golden-lg bg-purple-50 border-l-4 border-purple-400 mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-800 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Cómo Interpretar los Resultados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-golden-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Índice de Masa Muscular (IMM)</h4>
                  <p className="text-sm text-purple-700 leading-relaxed">
                    El IMM se calcula dividiendo la masa muscular entre la altura al cuadrado (kg/m²).
                    Es una medida estandarizada que permite comparar entre diferentes personas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">Categorías de Referencia</h4>
                  <p className="text-sm text-purple-700 leading-relaxed">
                    <strong>Excelente:</strong> Por encima del 90% de la población<br />
                    <strong>Bueno:</strong> Entre el 75-90% de la población<br />
                    <strong>Promedio:</strong> Entre el 25-75% de la población<br />
                    <strong>Bajo:</strong> Por debajo del 25% de la población
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Estrategias para Aumentar la Masa Muscular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-golden-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">Entrenamiento</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Ejercicios compuestos (sentadillas, peso muerto, press)</li>
                    <li>• 3-4 sesiones por semana</li>
                    <li>• Progresión gradual de cargas</li>
                    <li>• 6-12 repeticiones por serie</li>
                    <li>• Descanso adecuado entre sesiones</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">Nutrición</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• 1.6-2.4g de proteína por kg de peso</li>
                    <li>• Calorías suficientes para el crecimiento</li>
                    <li>• Hidratación adecuada</li>
                    <li>• Timing de nutrientes post-entrenamiento</li>
                    <li>• Suplementos si es necesario</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enlaces contextuales */}
          <Card className="card-golden-lg bg-orange-50 border-l-4 border-orange-400 mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-orange-800 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Complementa tu análisis de composición corporal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-golden-sm">
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/grasa-corporal" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tu grasa corporal:</a></strong> Métodos científicos de pliegues cutáneos para máxima precisión</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/composicion" className="text-blue-600 hover:underline font-medium transition-golden">Método Navy:</a></strong> Alternativa rápida con circunferencias corporales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tus calorías:</a></strong> Ajusta tu alimentación según tu composición corporal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula tus necesidades basadas en masa magra</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Calculadoras relacionadas */}
        <RelatedCalculators currentPage="masa-muscular" />

        {/* Widget para embeber - genera backlinks naturales */}
        <div className="flex justify-center">
          <EmbedWidget />
        </div>

        {/* Social Share */}
        <SocialShare
          title="Calculadora de Masa Muscular - Índice y Composición"
          url="https://nutrifit-calculator.com/masa-muscular"
          description="Calcula tu masa muscular, índice de masa muscular y obtén recomendaciones para optimizar tu desarrollo muscular. ¡Totalmente gratis!"
        />

        {/* Navegación entre calculadoras */}
        <CalculatorNavigation currentCalculator="masa-muscular" />
      </Container>
    </>
  );
}
