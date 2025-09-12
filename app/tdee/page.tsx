"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SelectInput } from '@/components/SelectInput';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdSlot } from '@/components/UnifiedAdSlot';
import { formatCalories } from '@/lib/format';
import { ACTIVITY_LEVELS, calculateBMR, calculateTDEE, UserData } from '@/lib/formulas';
import { generateJsonLd } from '@/lib/seo';
import { useState } from 'react';

export default function TDEEPage() {
  const [formData, setFormData] = useState({
    sex: 'male',
    age: '',
    height: '',
    weight: '',
    activityLevel: ''
  });

  const [result, setResult] = useState<{ bmr: number; tdee: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { age, height, weight, activityLevel } = formData;

    if (!age || !height || !weight || !activityLevel) return;

    const userData: UserData = {
      sex: formData.sex as 'male' | 'female',
      age: parseInt(age),
      height: parseInt(height),
      weight: parseFloat(weight)
    };

    const bmr = calculateBMR(userData);
    const tdee = calculateTDEE(bmr, parseFloat(activityLevel));

    setResult({ bmr, tdee });
  };

  const isFormValid = formData.age && formData.height && formData.weight && formData.activityLevel;
  const jsonLd = generateJsonLd('tdee');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size="xl" className="py-[4.236rem]">
        <div className="max-w-5xl mx-auto space-golden-lg">
          <div className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora TDEE - Gasto Calórico Diario
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula tu TDEE (Total Daily Energy Expenditure) - el gasto calórico diario total
              que quemas incluyendo tu actividad física.
            </p>
          </div>

          <Card className="card-golden-lg shadow-golden-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <span className="text-3xl mr-3">⚡</span>
                Calculadora TDEE
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
                    min={15}
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
                    min={130}
                    max={250}
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
                    max={300}
                    step={0.1}
                    unit="kg"
                    placeholder="70.0"
                    required
                  />
                </div>

                <SelectInput
                  id="activityLevel"
                  label="Nivel de actividad física"
                  value={formData.activityLevel}
                  onChange={handleInputChange('activityLevel')}
                  options={ACTIVITY_LEVELS.map(level => ({
                    value: level.value,
                    label: level.label
                  }))}
                  placeholder="Selecciona tu nivel de actividad"
                  required
                />

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                >
                  ⚡ Calcular TDEE
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Tus Resultados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-[1.618rem] md:grid-cols-2">
                  <div className="text-center card-golden bg-secondary/50">
                    <div className="text-4xl font-bold text-blue-600 mb-[0.618rem]">
                      {formatCalories(Math.round(result.bmr))}
                    </div>
                    <div className="text-lg font-semibold text-blue-700 mb-[0.382rem]">
                      BMR (Metabolismo Basal)
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Calorías que quemas en reposo
                    </p>
                  </div>

                  <div className="text-center card-golden bg-primary text-primary-foreground">
                    <div className="text-5xl font-bold mb-[0.618rem]">
                      {formatCalories(Math.round(result.tdee))}
                    </div>
                    <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                      TDEE (Gasto Total Diario)
                    </div>
                    <p className="text-sm opacity-90">
                      Calorías totales que quemas al día
                    </p>
                  </div>
                </div>

                <div className="mt-[2.618rem] card-golden bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400">
                  <h4 className="font-bold mb-[1.618rem] text-lg flex items-center">
                    <span className="text-2xl mr-3">💡</span>
                    ¿Qué significan estos números?
                  </h4>
                  <ul className="text-sm text-muted-foreground space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>BMR:</strong> Calorías necesarias para funciones vitales (respirar, circular sangre, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>TDEE:</strong> BMR + calorías de actividad física y termogénesis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Para mantener tu peso, consume aproximadamente tu TDEE en calorías</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Para perder peso, consume menos de tu TDEE (déficit calórico)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Para ganar peso, consume más de tu TDEE (superávit calórico)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AdSlot después del contenido principal */}
          <AdSlot
            adSlot="9572878239"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
            requireMinContent={true}
            minWords={100}
            lazyLoad={true}
          />

          <div className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
              Entendiendo tu TDEE: gasto calórico según peso y ejercicio
            </h2>

            <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
              El TDEE (Total Daily Energy Expenditure) representa la cantidad total de energía
              que tu cuerpo gasta en un día completo. Se compone de varios factores:
            </p>

            <div className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <div className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🔥</span>
                  Componentes del TDEE
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-red-600 mr-2 min-w-[96px]">BMR (60-70%):</span>
                    <span>Metabolismo basal calculado con la <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">ecuación Mifflin-St Jeor</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-orange-600 mr-2 min-w-[96px]">TEF (8-15%):</span>
                    <span>Termogénesis de alimentos (energía para digerir) - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC524030/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios sobre TEF</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="font-bold text-green-600 mr-2 min-w-[96px]">EAT (15-30%):</span>
                    <span>Actividad física planificada (ejercicio) - <a href="https://www.acsm.org/read-research/trending-topics-resource-pages/physical-activity-guidelines" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">guías ACSM</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="font-bold text-blue-600 mr-2 min-w-[96px]">NEAT (15-30%):</span>
                    <span>Actividades no ejercicio (caminar, fidgeting) - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">estudios NEAT</a></span>
                  </li>
                </ul>
              </div>

              <div className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Factores que influyen
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Edad, sexo, altura y peso</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Composición corporal (músculo vs grasa) - revisa tu <a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">IMC</a> como referencia</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>Nivel de actividad física</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-orange-600 mr-2">•</span>
                    <span>Genética y hormonas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Cómo usar tu TDEE para alcanzar tus objetivos
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-red-700 flex items-center">
                    <span className="text-lg mr-2">📉</span>
                    Perder peso
                  </h4>
                  <ul className="text-sm text-blue-800 space-golden-xs">
                    <li>• TDEE - 300-500 kcal/día</li>
                    <li>• Pérdida de 0.5-1kg/semana</li>
                    <li>• Usa nuestra <a href="/" className="text-blue-600 hover:underline font-medium transition-golden"> calculadora principal</a> para macros</li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 flex items-center">
                    <span className="text-lg mr-2">⚖️</span>
                    Mantener peso
                  </h4>
                  <ul className="text-sm text-blue-800 space-golden-xs">
                    <li>• Consume exactamente tu TDEE</li>
                    <li>• Monitorea semanalmente</li>
                    <li>• Ajusta según resultados</li>
                  </ul>
                </div>
                <div className="card-golden bg-white/50">
                  <h4 className="font-bold mb-[0.618rem] text-green-700 flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Ganar músculo
                  </h4>
                  <ul className="text-sm text-blue-800 space-golden-xs">
                    <li>• TDEE + 200-400 kcal/día</li>
                    <li>• Ganancia de 0.25-0.5kg/semana</li>
                    <li>• Optimiza tu <a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">ingesta de proteína</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 card-golden-lg border-l-4 border-yellow-400 mb-[2.618rem]">
              <h3 className="font-bold text-yellow-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Consideraciones importantes
              </h3>
              <ul className="text-sm text-yellow-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>El TDEE es una estimación:</strong> Puede variar ±10-15% entre personas similares</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Adaptación metabólica:</strong> Tu metabolismo se ajusta con el tiempo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Recalcula regularmente:</strong> Cada 4-6 semanas o tras cambios de peso significativos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span><strong>Monitorea resultados:</strong> Ajusta según tu progreso real, no solo los números</span>
                </li>
              </ul>
            </div>

            <div className="space-golden-md">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre TDEE</h3>
              <div className="space-golden-sm">
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Por qué mi TDEE es diferente al de mi amigo con datos similares?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    El TDEE varía por genética, composición corporal, hormonas y historial metabólico.
                    Dos personas con el mismo peso pueden tener metabolismos muy diferentes.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Debo contar las calorías quemadas en el gimnasio además del TDEE?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    No, el TDEE ya incluye tu actividad física. Solo usa las calorías del TDEE,
                    no sumes las del ejercicio para evitar sobreestimar tu gasto.
                  </p>
                </div>
                <div className="card-golden bg-gray-50">
                  <h4 className="font-semibold mb-[0.618rem]">¿Qué hago si no estoy viendo resultados con mi TDEE?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Después de 2-3 semanas sin cambios, ajusta ±100-200 kcal según tu objetivo.
                    También verifica tu <a href="/agua" className="text-blue-600 hover:underline font-medium">hidratación</a> y considera factores como el estrés y el sueño.
                  </p>
                </div>
              </div>
            </div>

            {/* Enlaces contextuales */}
            <div className="bg-orange-50 card-golden-lg border-l-4 border-orange-400 mb-[2.618rem]">
              <h3 className="font-bold text-orange-900 mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu cálculo de TDEE
              </h3>
              <ul className="text-sm text-orange-800 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tus macronutrientes:</a></strong> Usa tu TDEE para determinar la distribución de macros perfecta</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/imc" className="text-blue-600 hover:underline font-medium transition-golden">Verifica tu IMC:</a></strong> Conoce tu estado de peso actual para contextualizar tu TDEE</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu proteína:</a></strong> Calcula tus necesidades específicas de proteína según tu objetivo</span>
                </li>
              </ul>
            </div>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/tdee" />

            {/* Widget para embeber - genera backlinks naturales */}
            <div className="flex justify-center">
              <EmbedWidget />
            </div>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/tdee"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="tdee" />
          </div>
        </div>
      </Container>
    </>
  );
}