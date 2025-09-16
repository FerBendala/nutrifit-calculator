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
import { formatGrams } from '@/lib/format';
import { calculateBodyComposition, calculateBodyFat4Site, calculateBodyFatSkinfolds } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function GrasaCorporalPage() {
  const [formData, setFormData] = useState({
    sex: 'male',
    age: '',
    weight: '',
    method: '3site',
    triceps: '',
    suprailiac: '',
    thigh: '',
    chest: '',
    biceps: '',
    subscapular: '',
    midaxillary: '',
    abdomen: ''
  });

  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
    leanMass: number;
    fatMass: number;
    method: string;
  } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { sex, age, weight, method } = formData;

    if (!age || !weight) return;

    let bodyFatResult;

    try {
      if (method === '3site') {
        const { triceps, suprailiac, thigh } = formData;
        if (!triceps || !suprailiac || !thigh) return;

        bodyFatResult = calculateBodyFatSkinfolds(
          sex as 'male' | 'female',
          parseInt(age),
          parseFloat(triceps),
          parseFloat(suprailiac),
          parseFloat(thigh)
        );
      } else if (method === '4site') {
        const { triceps, biceps, subscapular, suprailiac } = formData;
        if (!triceps || !biceps || !subscapular || !suprailiac) return;

        bodyFatResult = calculateBodyFat4Site(
          sex as 'male' | 'female',
          parseInt(age),
          parseFloat(triceps),
          parseFloat(biceps),
          parseFloat(subscapular),
          parseFloat(suprailiac)
        );
      } else {
        // 7-site method
        const { chest, midaxillary, triceps, subscapular, abdomen, suprailiac, thigh } = formData;
        if (!chest || !midaxillary || !triceps || !subscapular || !abdomen || !suprailiac || !thigh) return;

        // Import the 7-site function
        const { calculateBodyFat7Site } = require('@/lib/formulas');
        bodyFatResult = calculateBodyFat7Site(
          sex as 'male' | 'female',
          parseInt(age),
          parseFloat(chest),
          parseFloat(midaxillary),
          parseFloat(triceps),
          parseFloat(subscapular),
          parseFloat(abdomen),
          parseFloat(suprailiac),
          parseFloat(thigh)
        );
      }

      // Calculate body composition
      const composition = calculateBodyComposition(parseFloat(weight), bodyFatResult.bodyFat);

      setResult({
        ...bodyFatResult,
        leanMass: composition.leanMass,
        fatMass: composition.fatMass
      });
    } catch (error) {
      console.error('Error calculating body fat:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Esencial': return 'text-red-600';
      case 'Atlético': return 'text-green-600';
      case 'Fitness': return 'text-blue-600';
      case 'Aceptable': return 'text-yellow-600';
      case 'Obesidad': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const isFormValid = () => {
    const { age, weight, method } = formData;
    if (!age || !weight) return false;

    if (method === '3site') {
      return formData.triceps && formData.suprailiac && formData.thigh;
    } else if (method === '4site') {
      return formData.triceps && formData.biceps && formData.subscapular && formData.suprailiac;
    } else {
      return formData.chest && formData.midaxillary && formData.triceps &&
        formData.subscapular && formData.abdomen && formData.suprailiac && formData.thigh;
    }
  };

  const jsonLd = generateJsonLd('grasa-corporal');

  return (
    <>
      <SchemaMarkup calculatorKey="grasa-corporal" />

      <Container size="xl" className="py-[4.236rem]">
        <div className="max-w-5xl mx-auto space-golden-lg">
          <div className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Grasa Corporal Médica
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora profesional de grasa corporal con métodos Jackson-Pollock y Durnin-Womersley
              validados científicamente. Precisión de ±3-5% utilizada por nutricionistas y médicos.
            </p>
          </div>

          <Card className="card-golden-lg shadow-golden-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <span className="text-3xl mr-3">📏</span>
                Calculadora de Grasa Corporal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-golden-md">
                <div className="grid gap-[1.618rem] md:grid-cols-2">
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

                  <NumberInput
                    id="age"
                    label="Edad"
                    value={formData.age}
                    onChange={handleInputChange('age')}
                    min={16}
                    max={80}
                    unit="años"
                    placeholder="25"
                    required
                  />

                  <NumberInput
                    id="weight"
                    label="Peso"
                    value={formData.weight}
                    onChange={handleInputChange('weight')}
                    min={40}
                    max={200}
                    step={0.1}
                    unit="kg"
                    placeholder="70.0"
                    required
                  />

                  <SelectInput
                    id="method"
                    label="Método de medición"
                    value={formData.method}
                    onChange={handleInputChange('method')}
                    options={[
                      { value: '3site', label: '3 sitios (Jackson-Pollock)' },
                      { value: '4site', label: '4 sitios (Durnin-Womersley)' },
                      { value: '7site', label: '7 sitios (Jackson-Pollock)' }
                    ]}
                    required
                  />
                </div>

                {/* 3-site measurements */}
                {formData.method === '3site' && (
                  <div className="space-golden-md">
                    <h3 className="text-lg font-semibold mb-[1.618rem]">Mediciones de pliegues cutáneos (3 sitios)</h3>
                    <div className="grid gap-[1.618rem] md:grid-cols-3">
                      <NumberInput
                        id="triceps"
                        label="Tríceps"
                        value={formData.triceps}
                        onChange={handleInputChange('triceps')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="12.5"
                        required
                      />
                      <NumberInput
                        id="suprailiac"
                        label="Suprailiaco"
                        value={formData.suprailiac}
                        onChange={handleInputChange('suprailiac')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="15.0"
                        required
                      />
                      <NumberInput
                        id="thigh"
                        label={formData.sex === 'male' ? 'Pectoral' : 'Muslo'}
                        value={formData.thigh}
                        onChange={handleInputChange('thigh')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="18.0"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* 4-site measurements */}
                {formData.method === '4site' && (
                  <div className="space-golden-md">
                    <h3 className="text-lg font-semibold mb-[1.618rem]">Mediciones de pliegues cutáneos (4 sitios)</h3>
                    <div className="grid gap-[1.618rem] md:grid-cols-2">
                      <NumberInput
                        id="triceps"
                        label="Tríceps"
                        value={formData.triceps}
                        onChange={handleInputChange('triceps')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="12.5"
                        required
                      />
                      <NumberInput
                        id="biceps"
                        label="Bíceps"
                        value={formData.biceps}
                        onChange={handleInputChange('biceps')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="8.0"
                        required
                      />
                      <NumberInput
                        id="subscapular"
                        label="Subescapular"
                        value={formData.subscapular}
                        onChange={handleInputChange('subscapular')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="15.0"
                        required
                      />
                      <NumberInput
                        id="suprailiac"
                        label="Suprailiaco"
                        value={formData.suprailiac}
                        onChange={handleInputChange('suprailiac')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="15.0"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* 7-site measurements */}
                {formData.method === '7site' && (
                  <div className="space-golden-md">
                    <h3 className="text-lg font-semibold mb-[1.618rem]">Mediciones de pliegues cutáneos (7 sitios)</h3>
                    <div className="grid gap-[1.618rem] md:grid-cols-2">
                      <NumberInput
                        id="chest"
                        label="Pectoral"
                        value={formData.chest}
                        onChange={handleInputChange('chest')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="12.0"
                        required
                      />
                      <NumberInput
                        id="midaxillary"
                        label="Axilar medio"
                        value={formData.midaxillary}
                        onChange={handleInputChange('midaxillary')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="10.0"
                        required
                      />
                      <NumberInput
                        id="triceps"
                        label="Tríceps"
                        value={formData.triceps}
                        onChange={handleInputChange('triceps')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="12.5"
                        required
                      />
                      <NumberInput
                        id="subscapular"
                        label="Subescapular"
                        value={formData.subscapular}
                        onChange={handleInputChange('subscapular')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="15.0"
                        required
                      />
                      <NumberInput
                        id="abdomen"
                        label="Abdominal"
                        value={formData.abdomen}
                        onChange={handleInputChange('abdomen')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="20.0"
                        required
                      />
                      <NumberInput
                        id="suprailiac"
                        label="Suprailiaco"
                        value={formData.suprailiac}
                        onChange={handleInputChange('suprailiac')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="15.0"
                        required
                      />
                      <NumberInput
                        id="thigh"
                        label="Muslo"
                        value={formData.thigh}
                        onChange={handleInputChange('thigh')}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="mm"
                        placeholder="18.0"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!isFormValid()}
                  className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                >
                  📏 Calcular grasa corporal
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Tu Composición Corporal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-golden-md">
                  <div className="space-golden-sm">
                    <div className="text-6xl font-bold text-primary mb-[0.618rem]">
                      {result.bodyFat}%
                    </div>
                    <div className={`text-2xl font-bold ${getCategoryColor(result.category)}`}>
                      {result.category}
                    </div>
                    <div className="text-sm text-muted-foreground mt-[0.618rem]">
                      Método: {result.method}
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2 mt-[2.618rem]">
                    <div className="text-center card-golden bg-secondary/50">
                      <div className="text-4xl font-bold text-blue-600 mb-[0.618rem]">
                        {formatGrams(result.leanMass, 1)}
                      </div>
                      <div className="text-lg font-semibold text-blue-700 mb-[0.382rem]">
                        Masa Magra
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Músculo, huesos, órganos
                      </p>
                    </div>

                    <div className="text-center card-golden bg-primary text-primary-foreground">
                      <div className="text-4xl font-bold mb-[0.618rem]">
                        {formatGrams(result.fatMass, 1)}
                      </div>
                      <div className="text-lg font-semibold opacity-95 mb-[0.382rem]">
                        Masa Grasa
                      </div>
                      <p className="text-sm opacity-90">
                        Grasa corporal total
                      </p>
                    </div>
                  </div>

                  <div className="mt-[2.618rem] card-golden bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400">
                    <h4 className="font-bold mb-[1.618rem] text-lg flex items-center">
                      <span className="text-2xl mr-3">📊</span>
                      Rangos de grasa corporal
                    </h4>
                    <div className="grid gap-[1.618rem] md:grid-cols-2">
                      <div>
                        <h5 className="font-semibold mb-[0.618rem] text-blue-700">Hombres:</h5>
                        <div className="space-golden-xs text-sm">
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Esencial:</span>
                            <span className="text-red-600 font-bold">&lt; 6%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Atlético:</span>
                            <span className="text-green-600 font-bold">6-14%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Fitness:</span>
                            <span className="text-blue-600 font-bold">14-18%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Aceptable:</span>
                            <span className="text-yellow-600 font-bold">18-25%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem]">
                            <span className="font-medium">Obesidad:</span>
                            <span className="text-red-600 font-bold">&gt; 25%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-[0.618rem] text-pink-700">Mujeres:</h5>
                        <div className="space-golden-xs text-sm">
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Esencial:</span>
                            <span className="text-red-600 font-bold">&lt; 14%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Atlético:</span>
                            <span className="text-green-600 font-bold">14-21%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Fitness:</span>
                            <span className="text-blue-600 font-bold">21-25%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem] border-b border-border/30">
                            <span className="font-medium">Aceptable:</span>
                            <span className="text-yellow-600 font-bold">25-32%</span>
                          </div>
                          <div className="flex justify-between py-[0.382rem]">
                            <span className="font-medium">Obesidad:</span>
                            <span className="text-red-600 font-bold">&gt; 32%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
              ¿Qué es la grasa corporal? Métodos de medición por pliegues cutáneos
            </h2>

            <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
              La grasa corporal es el porcentaje de tu peso total que corresponde a tejido adiposo.
              A diferencia del <a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">IMC</a>,
              la medición de grasa corporal distingue entre masa muscular y grasa, proporcionando
              una evaluación más precisa de tu composición corporal.
            </p>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <div className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔬</span>
                  Métodos de medición
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-blue-600 mr-2 min-w-[80px]">3 sitios:</span>
                    <span>Jackson-Pollock - Tríceps, suprailiaco, muslo/pectoral - <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudio original</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-green-600 mr-2 min-w-[80px]">4 sitios:</span>
                    <span>Durnin-Womersley - Tríceps, bíceps, subescapular, suprailiaco - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC524030/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">método validado</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-purple-600 mr-2 min-w-[80px]">7 sitios:</span>
                    <span>Jackson-Pollock - 7 puntos corporales para máxima precisión</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="font-bold text-orange-600 mr-2 min-w-[80px]">Precisión:</span>
                    <span>±3-5% con medición correcta de pliegues</span>
                  </li>
                </ul>
              </div>

              <div className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">⚖️</span>
                  Tipos de grasa corporal
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>Grasa esencial:</strong> Necesaria para funciones vitales (3-5% hombres, 8-12% mujeres) - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2903966/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">función esencial</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span><strong>Grasa de almacenamiento:</strong> Reserva energética en tejido subcutáneo - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">metabolismo energético</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong>Grasa visceral:</strong> Alrededor de órganos (más peligrosa para la salud)</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Grasa intramuscular:</strong> Dentro del tejido muscular</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">📏</span>
                Cómo medir pliegues cutáneos correctamente
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">🛠️</span>
                    Herramientas necesarias:
                  </h4>
                  <ul className="text-sm text-blue-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Calibrador de pliegues:</strong> Precisión de 0.1mm</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Marcador corporal:</strong> Para localizar puntos exactos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Cinta métrica:</strong> Para verificar ubicaciones</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span><strong>Ayuda de otra persona:</strong> Para mediciones precisas</span>
                    </li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">📍</span>
                    Ubicaciones de medición:
                  </h4>
                  <ul className="text-sm text-blue-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Tríceps:</strong> Punto medio entre hombro y codo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Suprailiaco:</strong> Diagonal sobre cresta ilíaca</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Muslo:</strong> Punto medio entre cadera y rodilla</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span><strong>Subescapular:</strong> Debajo del omóplato</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 card-golden-lg border-l-4 border-green-400 mb-[2.618rem]">
              <h3 className="font-bold text-green-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💪</span>
                Importancia de la grasa corporal para la salud
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">✅</span>
                    Beneficios de niveles óptimos:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Mejor sensibilidad a la insulina - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2913766/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios sobre insulina</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Reducción del riesgo cardiovascular - <a href="https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">AHA</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Mejor función hormonal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Mayor movilidad y flexibilidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Mejor rendimiento deportivo</span>
                    </li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    Riesgos de niveles inadecuados:
                  </h4>
                  <ul className="text-sm text-green-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Muy baja: Problemas hormonales, inmunitarios</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Muy alta: Diabetes, hipertensión, apnea</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Distribución abdominal: Mayor riesgo metabólico</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Inflamación crónica de bajo grado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Problemas articulares y de movilidad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Cómo mejorar tu composición corporal
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Para reducir grasa corporal:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Déficit calórico moderado (300-500 kcal/día)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Entrenamiento de fuerza para preservar músculo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Cardio de intensidad moderada-alta</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Consumo adecuado de <a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">proteína</a> (2g/kg)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Sueño de calidad (7-9 horas)</span>
                    </li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Para aumentar masa muscular:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Superávit calórico controlado (200-400 kcal/día)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Entrenamiento de fuerza progresivo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Proteína distribuida a lo largo del día</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Descanso adecuado entre entrenamientos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Monitoreo regular de composición corporal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Limitaciones y consideraciones importantes
              </h3>
              <ul className="text-sm text-yellow-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Precisión del medidor:</strong> Requiere práctica y calibrador de calidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Hidratación:</strong> La deshidratación puede afectar las mediciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Variabilidad diaria:</strong> Medir siempre a la misma hora y condiciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Edad y sexo:</strong> Las fórmulas son específicas para cada grupo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>No distingue grasa visceral:</strong> Solo mide grasa subcutánea</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Consistencia:</strong> Usar siempre el mismo método y medidor</span>
                </li>
              </ul>
            </div>

            <div className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre grasa corporal</h3>
              <div className="space-golden-sm">
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Cuál es la diferencia entre IMC y grasa corporal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El <a href="/imc" className="text-blue-600 hover:underline font-medium">IMC</a> solo considera peso y altura,
                    mientras que la grasa corporal distingue entre músculo y grasa. Un atleta puede tener IMC alto pero
                    grasa corporal baja, mientras que alguien con poco músculo puede tener IMC normal pero grasa corporal alta.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Con qué frecuencia debo medir mi grasa corporal?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para seguimiento de cambios, mide cada 2-4 semanas. La grasa corporal cambia más lentamente que el peso.
                    Es más importante la tendencia a largo plazo que las mediciones individuales. Siempre mide en las mismas
                    condiciones (hora, hidratación, etc.).
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo medir mi grasa corporal en casa?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Sí, con un calibrador de pliegues de calidad y práctica. Sin embargo, es más preciso que otra persona
                    tome las mediciones. Para máxima precisión, considera una evaluación profesional con DEXA o BodPod,
                    especialmente si necesitas datos muy exactos.
                  </p>
                </div>
              </div>
            </div>

            {/* Enlaces contextuales */}
            <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu análisis de composición corporal
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tus calorías diarias:</a></strong> Ajusta tu alimentación según tu composición corporal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula tus necesidades basadas en masa magra</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/tdee" className="text-blue-600 hover:underline font-medium transition-golden">Conoce tu TDEE:</a></strong> Ajusta tu gasto calórico según tu composición</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/composicion" className="text-blue-600 hover:underline font-medium transition-golden">Método Navy:</a></strong> Compara con mediciones de circunferencias</span>
                </li>
              </ul>
            </div>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/grasa-corporal" />

            {/* Widget para embeber - genera backlinks naturales */}
            <div className="flex justify-center">
              <EmbedWidget />
            </div>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Grasa Corporal Gratis"
              url="https://nutrifit-calculator.com/grasa-corporal"
              description="Calcula tu porcentaje de grasa corporal con métodos científicos de pliegues cutáneos. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="grasa-corporal" />
          </div>
        </div>
      </Container>
    </>
  );
}
