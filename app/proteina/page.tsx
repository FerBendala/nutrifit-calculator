"use client";

import dynamic from 'next/dynamic';
import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { NumberInput } from '@/components/NumberInput';
import { CalculatorBreadcrumbs } from '@/components/CalculatorBreadcrumbs';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams } from '@/lib/format';
import { calculateProteinNeeds } from '@/lib/formulas';
import { useState } from 'react';

// Lazy load componentes no críticos
const EmbedWidget = dynamic(() => import('@/components/EmbedWidget').then(mod => ({ default: mod.EmbedWidget })), {
  loading: () => <div className="h-96 animate-pulse bg-muted rounded-lg" />,
});

const RelatedCalculators = dynamic(() => import('@/components/RelatedCalculators').then(mod => ({ default: mod.RelatedCalculators })), {
  loading: () => <div className="h-48 animate-pulse bg-gradient-to-r bg-muted rounded-lg" />,
});

const SocialShare = dynamic(() => import('@/components/SocialShare').then(mod => ({ default: mod.SocialShare })), {
  loading: () => <div className="h-24 animate-pulse bg-muted rounded-lg" />,
});

export default function ProteinaPage() {
  const [formData, setFormData] = useState({
    weight: '',
    goal: 'active',
    bodyFatPercentage: ''
  });

  const [result, setResult] = useState<{ min: number; max: number; } | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { weight, goal } = formData;

    if (!weight) return;

    const bodyFat = formData.bodyFatPercentage ? parseFloat(formData.bodyFatPercentage) : undefined;
    const proteinNeeds = calculateProteinNeeds(
      parseFloat(weight),
      goal as 'sedentary' | 'active' | 'athlete',
      bodyFat
    );

    setResult(proteinNeeds);
  };

  const isFormValid = formData.weight;

  return (
    <>
      <SchemaMarkup calculatorKey="proteina" />
      <CalculatorBreadcrumbs calculatorKey="proteina" className="container-golden mb-4 pt-4" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Proteína Diaria
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calcula cuánta proteína necesitas al día según tu peso, actividad física y objetivo.
              Recomendaciones basadas en estudios científicos para ganar músculo, perder grasa o mantener.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de proteína">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center">
                  <span className="text-3xl mr-3">🥩</span>
                  Calculadora de Proteína
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
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

                    <SelectInput
                      id="goal"
                      label="Objetivo/Actividad"
                      value={formData.goal}
                      onChange={handleInputChange('goal')}
                      options={[
                        { value: 'sedentary', label: 'Sedentario (mínima actividad)' },
                        { value: 'active', label: 'Activo (ejercicio regular)' },
                        { value: 'athlete', label: 'Atleta (entrenamiento intenso)' }
                      ]}
                      required
                    />
                  </div>

                  <NumberInput
                    id="bodyFatPercentage"
                    label="Porcentaje de grasa corporal (opcional)"
                    value={formData.bodyFatPercentage}
                    onChange={handleInputChange('bodyFatPercentage')}
                    min={5}
                    max={50}
                    step={0.1}
                    unit="%"
                    placeholder="15.0"
                  />

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    🥩 Calcular necesidades de proteína
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Tus Necesidades de Proteína
                </h2>
              </header>
              <div className="p-6">
                <div className="text-center space-golden-md">
                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <article className="text-center card-golden bg-secondary/50">
                      <div className="text-4xl font-bold text-info mb-[0.618rem]">
                        {formatGrams(result.min)}
                      </div>
                      <div className="text-lg font-semibold text-info mb-[0.382rem]">
                        Mínimo diario
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Para mantener masa muscular
                      </p>
                    </article>

                    <article className="text-center card-golden bg-primary text-primary-foreground">
                      <div className="text-5xl font-bold mb-[0.618rem]">
                        {formatGrams(result.max)}
                      </div>
                      <div className="text-xl font-bold opacity-95 mb-[0.382rem]">
                        Óptimo diario
                      </div>
                      <p className="text-sm opacity-90">
                        Para maximizar resultados
                      </p>
                    </article>
                  </div>

                  <section className="mt-[2.618rem] card-golden bg-gradient-to-r bg-success-subtle border-l-4 border-success">
                    <h3 className="font-bold mb-[1.618rem] text-lg flex items-center">
                      <span className="text-2xl mr-3">💡</span>
                      Recomendaciones
                    </h3>
                    <ul className="text-sm text-muted-foreground space-golden-xs text-left">
                      <li className="flex items-start">
                        <span className="text-success mr-2">•</span>
                        <span>Consume entre <strong>{formatGrams(result.min)}</strong> y <strong>{formatGrams(result.max)}</strong> de proteína al día</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-info mr-2">•</span>
                        <span>Distribuye la ingesta a lo largo del día (20-30g por comida)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-warning mr-2">•</span>
                        <span>Combina fuentes de proteína completas (animales) e incompletas (vegetales)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-warning mr-2">•</span>
                        <span>Ajusta según tu respuesta individual y resultados</span>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Por qué es importante la proteína para ganar músculo y mantener peso?
              </h2>

              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La proteína es un macronutriente esencial que forma la base estructural de nuestro cuerpo.
                A diferencia de las grasas y carbohidratos, nuestro cuerpo no puede almacenar proteínas,
                por lo que necesitamos un suministro constante a través de la alimentación.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🏗️</span>
                  Funciones principales
                </h3>
                <ul className="text-sm text-muted-foreground space-golden-xs">
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-info mr-2">•</span>
                    <span><strong>Construcción y reparación muscular:</strong> Especialmente importante tras el ejercicio - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3871410/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios sobre síntesis proteica</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-success mr-2">•</span>
                    <span><strong>Producción de enzimas y hormonas:</strong> Insulina, hormona del crecimiento, etc. - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2903966/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">función hormonal</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Mantenimiento del sistema inmune:</strong> Anticuerpos y células defensivas - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2913766/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">inmunidad y proteína</a></span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Transporte de nutrientes:</strong> Hemoglobina transporta oxígeno</span>
                  </li>
                  <li className="flex items-start py-[0.382rem] border-b border-border/30">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Control del apetito y saciedad:</strong> Mayor efecto térmico que otros macros</span>
                  </li>
                  <li className="flex items-start py-[0.382rem]">
                    <span className="text-warning mr-2">•</span>
                    <span><strong>Mantenimiento del pH sanguíneo:</strong> Función buffer del organismo</span>
                  </li>
                </ul>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <span className="text-2xl mr-3">🥩</span>
                  Fuentes de proteína completa
                </h3>
                <div className="space-golden-sm">
                  <section>
                    <h4 className="font-semibold text-sm">Proteínas animales (completas):</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• <strong>Carnes:</strong> Pollo (23g/100g), ternera (26g/100g), cerdo (25g/100g)</li>
                      <li>• <strong>Pescados:</strong> Salmón (25g/100g), atún (30g/100g), merluza (18g/100g)</li>
                      <li>• <strong>Huevos:</strong> 6g por huevo grande, proteína de alta calidad</li>
                      <li>• <strong>Lácteos:</strong> Leche (3.4g/100ml), yogur griego (10g/100g), queso (25g/100g)</li>
                    </ul>
                  </section>
                  <section>
                    <h4 className="font-semibold text-sm">Proteínas vegetales:</h4>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• <strong>Legumbres:</strong> Lentejas (9g/100g), garbanzos (8g/100g)</li>
                      <li>• <strong>Frutos secos:</strong> Almendras (21g/100g), cacahuetes (26g/100g)</li>
                      <li>• <strong>Cereales:</strong> Quinoa (4.4g/100g), avena (17g/100g)</li>
                      <li>• <strong>Combinar:</strong> Arroz + legumbres = proteína completa</li>
                    </ul>
                  </section>
                </div>
              </article>
            </section>

            <section className="bg-info-subtle card-golden-lg border-l-4 border-info mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🔬</span>
                Recomendaciones según la ciencia
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-3">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                    <span className="text-lg mr-2">😴</span>
                    Sedentarios:
                  </h4>
                  <p className="text-lg font-bold text-foreground/90 mb-[0.382rem]">0.8-1.0g/kg peso</p>
                  <p className="text-xs text-info">Mínimo para mantener masa muscular según la <a href="https://www.who.int/publications/i/item/9789241549028" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">OMS</a></p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">🏃</span>
                    Activos:
                  </h4>
                  <p className="text-lg font-bold text-foreground/90 mb-[0.382rem]">1.2-1.6g/kg peso</p>
                  <p className="text-xs text-info">Para personas con actividad física regular</p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">💪</span>
                    Atletas/Fuerza:
                  </h4>
                  <p className="text-lg font-bold text-foreground/90 mb-[0.382rem]">1.6-2.4g/kg peso</p>
                  <p className="text-xs text-info">Según <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">estudios de síntesis proteica</a></p>
                </article>
              </div>
            </section>

            <section className="bg-success-subtle card-golden-lg border-l-4 border-success mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Timing y distribución óptima
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                    <span className="text-lg mr-2">⏰</span>
                    Distribución diaria:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-success mr-2">•</span>
                      <span><strong>20-40g por comida:</strong> Optimiza síntesis proteica muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>3-4 comidas al día:</strong> Mantiene balance nitrogenado positivo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Antes de dormir:</strong> Caseína o proteína de digestión lenta</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>Post-entreno:</strong> 20-25g dentro de 2 horas</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-warning flex items-center">
                    <span className="text-lg mr-2">📈</span>
                    Factores que aumentan necesidades:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Edad avanzada:</strong> Resistencia anabólica</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span><strong>Déficit calórico:</strong> Para preservar masa muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span><strong>Entrenamiento intenso:</strong> Mayor síntesis y degradación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span><strong>Recuperación de lesiones:</strong> Reparación tisular</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Señales de deficiencia proteica
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">🚨</span>
                    Síntomas tempranos:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>Pérdida de masa muscular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mayor tiempo de recuperación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Fatiga constante</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Antojos de alimentos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Cabello y uñas débiles</span>
                    </li>
                  </ul>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-destructive flex items-center">
                    <span className="text-lg mr-2">⚡</span>
                    Consecuencias a largo plazo:
                  </h4>
                  <ul className="text-sm text-foreground/90 space-golden-xs">
                    <li className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>Sarcopenia (pérdida muscular)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Sistema inmune debilitado</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Problemas de cicatrización</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-info mr-2">•</span>
                      <span>Metabolismo más lento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning mr-2">•</span>
                      <span>Mayor riesgo de fracturas</span>
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💊</span>
                ¿Necesito suplementos de proteína?
              </h3>
              <div className="space-golden-sm">
                <p className="text-sm text-foreground/90 mb-[1.618rem] font-medium">
                  <strong>La mayoría de personas pueden cubrir sus necesidades con alimentos.</strong>
                  Los suplementos son útiles en situaciones específicas:
                </p>
                <div className="grid gap-[1.618rem] md:grid-cols-2">
                  <article className="card-golden bg-card/50">
                    <h4 className="font-bold mb-[0.618rem] text-success flex items-center">
                      <span className="text-lg mr-2">✅</span>
                      Cuándo considerar suplementos:
                    </h4>
                    <ul className="text-sm text-foreground/90 space-golden-xs">
                      <li className="flex items-start">
                        <span className="text-success mr-2">•</span>
                        <span>Atletas con necesidades muy altas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-info mr-2">•</span>
                        <span>Dietas veganas estrictas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-warning mr-2">•</span>
                        <span>Personas mayores con poco apetito</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-warning mr-2">•</span>
                        <span>Conveniencia post-entreno</span>
                      </li>
                    </ul>
                  </article>
                  <article className="card-golden bg-card/50">
                    <h4 className="font-bold mb-[0.618rem] text-info flex items-center">
                      <span className="text-lg mr-2">🥤</span>
                      Tipos de proteína en polvo:
                    </h4>
                    <ul className="text-sm text-foreground/90 space-golden-xs">
                      <li className="flex items-start">
                        <span className="text-info mr-2">•</span>
                        <span><strong>Whey:</strong> Rápida absorción, post-entreno</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-warning mr-2">•</span>
                        <span><strong>Caseína:</strong> Lenta absorción, antes de dormir</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-success mr-2">•</span>
                        <span><strong>Vegetal:</strong> Guisante, arroz, cáñamo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-warning mr-2">•</span>
                        <span><strong>Mixtas:</strong> Combinan diferentes fuentes</span>
                      </li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            <section className="space-golden-md mt-[2.618rem]">
              <h3 className="text-xl font-semibold mb-[1.618rem] text-center">❓ Preguntas frecuentes sobre proteína</h3>
              <div className="space-golden-sm">
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Puedo consumir demasiada proteína?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Para personas sanas, consumir hasta 2.5g/kg de peso corporal es seguro.
                    Cantidades muy altas (&gt;3g/kg) pueden sobrecargar riñones en personas con problemas renales.
                    Usa nuestra calculadora para encontrar tu rango óptimo.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿La proteína vegetal es igual de efectiva?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    Las proteínas vegetales pueden ser igual de efectivas si se combinan correctamente
                    para obtener todos los aminoácidos esenciales. Combina legumbres con cereales,
                    o usa quinoa, que ya es una proteína completa.
                  </p>
                </article>
                <article className="card-golden bg-muted">
                  <h4 className="font-semibold mb-[0.618rem]">¿Debo tomar proteína inmediatamente después del entreno?</h4>
                  <p className="text-sm text-muted-foreground leading-[1.618]">
                    La &quot;ventana anabólica&quot; es más amplia de lo que se pensaba. Lo importante es
                    el total diario de proteína. Si entrenas en ayunas o hace muchas horas que no comes,
                    sí es beneficioso tomar proteína pronto después del ejercicio.
                  </p>
                </article>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="bg-warning-subtle card-golden-lg border-l-4 border-warning mb-[2.618rem]">
              <h3 className="font-bold text-foreground mb-[1.618rem] text-xl flex items-center">
                <span className="text-2xl mr-3">💡</span>
                Complementa tu cálculo de proteína
              </h3>
              <ul className="text-sm text-foreground/90 space-golden-xs">
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/peso-ajustado/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu Peso Ajustado:</a></strong> ABW clínico para necesidades proteicas precisas en obesidad o bajo peso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tus calorías totales:</a></strong> Integra tu proteína en un plan nutricional completo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/bmr/" className="text-info hover:underline transition-colors font-medium transition-golden">Conoce tu metabolismo basal:</a></strong> Base para calcular necesidades energéticas precisas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/ffmi/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu desarrollo muscular:</a></strong> Usa FFMI para optimizar ingesta proteica según masa libre de grasa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/tdee/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu gasto calórico:</a></strong> Determina cuántas calorías necesitas según tu actividad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/1rm/" className="text-info hover:underline transition-colors font-medium transition-golden">Planifica entrenamientos de fuerza:</a></strong> Optimiza el entrenamiento para maximizar síntesis proteica</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/agua/" className="text-info hover:underline transition-colors font-medium transition-golden">Optimiza tu hidratación:</a></strong> La hidratación afecta la síntesis proteica</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/fibra/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu fibra diaria:</a></strong> Necesidades de fibra según edad, sexo y calorías (IOM/FDA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/azucar/" className="text-info hover:underline transition-colors font-medium transition-golden">Límite de azúcar (OMS):</a></strong> Máximo de azúcares libres según tus calorías</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/sodio/" className="text-info hover:underline transition-colors font-medium transition-golden">Sodio/Sal (OMS):</a></strong> Límite de sodio y sal para salud cardiovascular</span>
                </li>
                <li className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span><strong><a href="/alcohol/" className="text-info hover:underline transition-colors font-medium transition-golden">Alcohol:</a></strong> Unidades estándar, calorías y límite de bajo riesgo</span>
                </li>
              </ul>
            </section>

            {/* Calculadoras relacionadas */}
            <RelatedCalculators currentPage="/proteina" />

            {/* Widget para embeber - genera backlinks naturales */}
            <section className="flex justify-center">
              <EmbedWidget />
            </section>

            {/* Social Share */}
            <SocialShare
              title="Calculadora de Calorías y Macronutrientes Gratis"
              url="https://nutrifit-calculator.com/proteina/"
              description="Calcula tus calorías diarias y macros con la fórmula científica Mifflin-St Jeor. ¡Totalmente gratis!"
            />

            {/* Navegación entre calculadoras */}
            <CalculatorNavigation currentCalculator="proteina" />
          </article>
        </main>
      </Container>
    </>
  );
}