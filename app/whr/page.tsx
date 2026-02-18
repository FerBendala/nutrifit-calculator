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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeWHR, calculateComprehensiveWHR } from '@/lib/formulas';
import { AlertTriangle, Calculator, Heart, Info, Ruler, Scale, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

interface WHRResult {
  method: string;
  whr?: number;
  whtr?: number;
  bodyShape?: string;
  androidGynoidRatio?: string;
  healthScore?: number;
  category: string;
  healthRisk: string;
  cardiovascularRisk: string;
  metabolicRisk: string;
  recommendations: string[];
  comparison: string;
  idealRange: string;
  clinicalInterpretation: string;
}

export default function WHRPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic WHR
    basicGender: 'male',
    basicWaist: '',
    basicHip: '',

    // Comprehensive WHR
    comprehensiveGender: 'male',
    comprehensiveWaist: '',
    comprehensiveHip: '',
    comprehensiveHeight: ''
  });

  const [result, setResult] = useState<WHRResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let analysis: any;
      let method: string;

      switch (activeTab) {
        case 'basic':
          const basicGender = formData.basicGender as 'male' | 'female';
          const basicWaist = parseFloat(formData.basicWaist);
          const basicHip = parseFloat(formData.basicHip);

          analysis = analyzeWHR(basicWaist, basicHip, basicGender);
          method = 'Ratio Cintura-Cadera Básico (OMS)';
          break;

        case 'comprehensive':
          const comprehensiveGender = formData.comprehensiveGender as 'male' | 'female';
          const comprehensiveWaist = parseFloat(formData.comprehensiveWaist);
          const comprehensiveHip = parseFloat(formData.comprehensiveHip);
          const comprehensiveHeight = parseFloat(formData.comprehensiveHeight);

          const comprehensiveResult = calculateComprehensiveWHR(
            comprehensiveWaist,
            comprehensiveHip,
            comprehensiveHeight,
            comprehensiveGender
          );

          analysis = {
            whr: comprehensiveResult.whr,
            whtr: comprehensiveResult.whtr,
            category: getWHRCategory(comprehensiveResult.whr, comprehensiveGender),
            healthRisk: getWHRRisk(comprehensiveResult.whr, comprehensiveGender),
            cardiovascularRisk: getCardiovascularRisk(comprehensiveResult.whr, comprehensiveGender),
            metabolicRisk: getMetabolicRisk(comprehensiveResult.whr, comprehensiveGender),
            recommendations: comprehensiveResult.recommendations,
            comparison: getWHRComparison(comprehensiveGender),
            idealRange: getWHRIdealRange(comprehensiveGender),
            clinicalInterpretation: getClinicalInterpretation(comprehensiveResult.whr, comprehensiveGender)
          };
          method = 'Análisis Integral WHR + WHtR';
          break;

        default:
          throw new Error('Método no válido');
      }

      setResult({
        method,
        whr: analysis.whr,
        whtr: analysis.whtr,
        bodyShape: analysis.bodyShape,
        androidGynoidRatio: analysis.androidGynoidRatio,
        healthScore: analysis.healthScore,
        category: analysis.category,
        healthRisk: analysis.healthRisk,
        cardiovascularRisk: analysis.cardiovascularRisk,
        metabolicRisk: analysis.metabolicRisk,
        recommendations: analysis.recommendations,
        comparison: analysis.comparison,
        idealRange: analysis.idealRange,
        clinicalInterpretation: analysis.clinicalInterpretation
      });

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const isFormValid = () => {
    switch (activeTab) {
      case 'basic':
        return formData.basicGender && formData.basicWaist && formData.basicHip;
      case 'comprehensive':
        return formData.comprehensiveGender && formData.comprehensiveWaist && formData.comprehensiveHip && formData.comprehensiveHeight;
      default:
        return false;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo': return 'text-foreground bg-success-subtle border-success';
      case 'Moderado': return 'text-foreground bg-info-subtle border-info';
      case 'Alto': return 'text-foreground bg-warning-subtle border-warning';
      case 'Muy Alto': return 'text-foreground bg-destructive-subtle border-destructive';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  // Helper functions for comprehensive analysis
  function getWHRCategory(whr: number, gender: 'male' | 'female'): string {
    const cutoffs = {
      male: { low: 0.85, moderate: 0.90, high: 0.95, veryHigh: 1.00 },
      female: { low: 0.75, moderate: 0.80, high: 0.85, veryHigh: 0.90 }
    };

    const userCutoffs = cutoffs[gender];

    if (whr < userCutoffs.low) return 'Excelente (distribución óptima)';
    else if (whr < userCutoffs.moderate) return 'Bueno (distribución favorable)';
    else if (whr < userCutoffs.high) return 'Moderado (vigilancia recomendada)';
    else if (whr < userCutoffs.veryHigh) return 'Alto riesgo (acción necesaria)';
    else return 'Muy alto riesgo (intervención urgente)';
  }

  function getWHRRisk(whr: number, gender: 'male' | 'female'): string {
    const cutoffs = {
      male: { low: 0.85, moderate: 0.90, high: 0.95, veryHigh: 1.00 },
      female: { low: 0.75, moderate: 0.80, high: 0.85, veryHigh: 0.90 }
    };

    const userCutoffs = cutoffs[gender];

    if (whr < userCutoffs.low) return 'Bajo';
    else if (whr < userCutoffs.moderate) return 'Bajo';
    else if (whr < userCutoffs.high) return 'Moderado';
    else if (whr < userCutoffs.veryHigh) return 'Alto';
    else return 'Muy Alto';
  }

  function getCardiovascularRisk(whr: number, gender: 'male' | 'female'): string {
    const cutoffs = {
      male: { moderate: 0.90, high: 0.95 },
      female: { moderate: 0.80, high: 0.85 }
    };

    const userCutoffs = cutoffs[gender];

    if (whr > userCutoffs.moderate) {
      return `Riesgo cardiovascular aumentado en ${(whr / userCutoffs.moderate * 100 - 100).toFixed(0)}% según estudios epidemiológicos`;
    }
    return 'Riesgo cardiovascular dentro de parámetros saludables';
  }

  function getMetabolicRisk(whr: number, gender: 'male' | 'female'): string {
    const cutoffs = {
      male: { high: 0.95 },
      female: { high: 0.85 }
    };

    const userCutoffs = cutoffs[gender];

    if (whr > userCutoffs.high) {
      return 'Mayor riesgo de síndrome metabólico, diabetes tipo 2 y resistencia a la insulina';
    }
    return 'Riesgo metabólico estándar o reducido';
  }

  function getWHRComparison(gender: 'male' | 'female'): string {
    return gender === 'male'
      ? `Hombres: Óptimo (< 0.90), Moderado (0.90-0.95), Alto riesgo (> 0.95)`
      : `Mujeres: Óptimo (< 0.80), Moderado (0.80-0.85), Alto riesgo (> 0.85)`;
  }

  function getWHRIdealRange(gender: 'male' | 'female'): string {
    return gender === 'male' ? '0.80-0.90' : '0.70-0.80';
  }

  function getClinicalInterpretation(whr: number, gender: 'male' | 'female'): string {
    const cutoffs = {
      male: { high: 0.95 },
      female: { high: 0.85 }
    };

    const userCutoffs = cutoffs[gender];

    if (whr > userCutoffs.high) {
      return 'Indicativo de obesidad central y mayor riesgo cardiometabólico. Requiere intervención médica.';
    }
    return 'Distribución de grasa favorable. Continuar con hábitos saludables preventivos.';
  }

  return (
    <>
      <SchemaMarkup calculatorKey="whr" />
      <CalculatorBreadcrumbs calculatorKey="whr" className="container-golden mb-4 pt-4" />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora WHR (Ratio Cintura-Cadera)
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Calcula tu WHR (Ratio Cintura-Cadera) según estándares de la OMS para evaluar tu distribución de grasa corporal.
              Descubre si tu forma corporal es androide (manzana) o ginoide (pera) y evalúa tu riesgo cardiovascular.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de WHR">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-foreground">
                  Calculadora de Ratio Cintura-Cadera
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Elige el tipo de análisis según tus datos disponibles
                </p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="relative z-10 grid w-full grid-cols-1 sm:grid-cols-2 gap-2 mb-6 sm:mb-0 h-auto sm:h-10">
                    <TabsTrigger value="basic">Análisis Básico OMS</TabsTrigger>
                    <TabsTrigger value="comprehensive">Análisis Integral</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-info-subtle rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-info mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-foreground/90 mb-1">Análisis Básico OMS</h3>
                            <p className="text-sm text-info">
                              Método estándar de la OMS para evaluar riesgo cardiovascular por distribución de grasa.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="basicGender"
                          label="Sexo"
                          value={formData.basicGender}
                          onChange={(value) => handleInputChange('basicGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="basicWaist"
                          label="Circunferencia de cintura"
                          value={formData.basicWaist}
                          onChange={(value) => handleInputChange('basicWaist', value)}
                          placeholder="85"
                          unit="cm"
                          min={50}
                          max={150}
                          required
                        />

                        <NumberInput
                          id="basicHip"
                          label="Circunferencia de cadera"
                          value={formData.basicHip}
                          onChange={(value) => handleInputChange('basicHip', value)}
                          placeholder="95"
                          unit="cm"
                          min={60}
                          max={160}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular WHR Básico
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="comprehensive" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-success-subtle rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-success mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-foreground/90 mb-1">Análisis Integral WHR + WHtR</h3>
                            <p className="text-sm text-success">
                              Análisis completo que incluye ratio cintura-cadera, ratio cintura-altura y clasificación morfológica.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="comprehensiveGender"
                          label="Sexo"
                          value={formData.comprehensiveGender}
                          onChange={(value) => handleInputChange('comprehensiveGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="comprehensiveWaist"
                          label="Circunferencia de cintura"
                          value={formData.comprehensiveWaist}
                          onChange={(value) => handleInputChange('comprehensiveWaist', value)}
                          placeholder="85"
                          unit="cm"
                          min={50}
                          max={150}
                          required
                        />

                        <NumberInput
                          id="comprehensiveHip"
                          label="Circunferencia de cadera"
                          value={formData.comprehensiveHip}
                          onChange={(value) => handleInputChange('comprehensiveHip', value)}
                          placeholder="95"
                          unit="cm"
                          min={60}
                          max={160}
                          required
                        />

                        <NumberInput
                          id="comprehensiveHeight"
                          label="Altura"
                          value={formData.comprehensiveHeight}
                          onChange={(value) => handleInputChange('comprehensiveHeight', value)}
                          placeholder="170"
                          unit="cm"
                          min={120}
                          max={220}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Análisis Integral
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
                  Resultados - {result.method}
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* Main Results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <article className="text-center p-6 bg-info-subtle rounded-lg border-l-4 border-info">
                      <div className="text-3xl font-bold text-info mb-2">
                        {result.whr?.toFixed(3)}
                      </div>
                      <div className="text-sm font-medium text-foreground/90">WHR</div>
                    </article>

                    {result.whtr && (
                      <article className="text-center p-6 bg-success-subtle rounded-lg border-l-4 border-success">
                        <div className="text-3xl font-bold text-success mb-2">
                          {result.whtr.toFixed(3)}
                        </div>
                        <div className="text-sm font-medium text-foreground/90">WHtR</div>
                      </article>
                    )}

                    <article className={`text-center p-6 rounded-lg border-l-4 ${getRiskColor(result.healthRisk)}`}>
                      <div className="text-3xl font-bold mb-2">
                        {result.category}
                      </div>
                      <div className="text-sm font-medium">Estado</div>
                    </article>
                  </div>

                  {/* Body Shape Analysis */}
                  {result.bodyShape && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <article className="card-golden bg-card/50">
                        <header className="p-6 pb-0">
                          <h3 className="text-lg font-semibold text-foreground flex items-center">
                            <Scale className="h-5 w-5 mr-2 text-info" />
                            Clasificación Morfológica
                          </h3>
                        </header>
                        <div className="p-6">
                          <div className="space-y-3">
                            <div>
                              <div className="font-medium text-foreground mb-1">Forma corporal:</div>
                              <div className="text-sm text-muted-foreground">{result.bodyShape}</div>
                            </div>
                            <div>
                              <div className="font-medium text-foreground mb-1">Tipo de distribución:</div>
                              <div className="text-sm text-muted-foreground">{result.androidGynoidRatio}</div>
                            </div>
                            {result.healthScore !== undefined && (
                              <div>
                                <div className="font-medium text-foreground mb-1">Puntuación de salud:</div>
                                <div className="text-sm text-muted-foreground">{result.healthScore}/100</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>

                      <article className="card-golden bg-card/50">
                        <header className="p-6 pb-0">
                          <h3 className="text-lg font-semibold text-foreground">
                            Rango ideal
                          </h3>
                        </header>
                        <div className="p-6">
                          <p className="text-sm text-muted-foreground leading-[1.618]">
                            {result.idealRange}
                          </p>
                        </div>
                      </article>
                    </div>
                  )}

                  {/* Health Risks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="card-golden bg-card/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-foreground flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-destructive" />
                          Riesgo Cardiovascular
                        </h3>
                      </header>
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground leading-[1.618]">
                          {result.cardiovascularRisk}
                        </p>
                      </div>
                    </article>

                    <article className="card-golden bg-card/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-foreground flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-warning" />
                          Riesgo Metabólico
                        </h3>
                      </header>
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground leading-[1.618]">
                          {result.metabolicRisk}
                        </p>
                      </div>
                    </article>
                  </div>

                  {/* Clinical Interpretation */}
                  <article className="card-golden-lg bg-info-subtle border-l-4 border-info">
                    <header className="p-6 pb-0">
                      <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                        <Info className="w-5 h-5 mr-2" />
                        Interpretación Clínica
                      </h3>
                    </header>
                    <div className="p-6">
                      <p className="text-foreground/90 leading-relaxed mb-4">
                        <strong>{result.clinicalInterpretation}</strong>
                      </p>
                      <p className="text-sm text-info leading-relaxed">
                        {result.comparison}
                      </p>
                    </div>
                  </article>

                  {/* Recommendations */}
                  <article className="card-golden bg-card/50">
                    <header className="p-6 pb-0">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-success" />
                        Recomendaciones Personalizadas
                      </h3>
                    </header>
                    <div className="p-6">
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 mr-1 flex-shrink-0"></span>
                            <span className="text-sm text-muted-foreground leading-[1.618]">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el Ratio Cintura-Cadera (WHR)?
              </h2>
            </header>

            <section className="card-golden-lg bg-info-subtle border-l-4 border-info mb-8">
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El <strong>Ratio Cintura-Cadera (WHR)</strong> es una medida antropométrica que evalúa la distribución de la grasa corporal
                  comparando la circunferencia de la cintura con la de las caderas. Es un indicador clave de <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4837733/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">riesgo cardiovascular</a> y síndrome metabólico según estándares de la OMS. Estudios epidemiológicos como el <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Framingham Heart Study</a> validan su precisión predictiva superior al IMC.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A diferencia del IMC, el WHR identifica la <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">grasa visceral peligrosa</a> que se acumula alrededor de los órganos internos, principal factor de riesgo para enfermedades cardíacas. Estudios como el <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium transition-golden">Framingham Heart Study</a> demuestran su superioridad predictiva sobre el IMC tradicional.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-success-subtle border-l-4 border-success">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <Scale className="w-5 h-5 mr-2" />
                    Ventajas del WHR sobre el IMC
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Detecta grasa visceral:</strong> Identifica la grasa más peligrosa para la salud</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Independiente de altura:</strong> Más preciso que IMC para personas altas/bajas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Predice riesgo cardiovascular:</strong> Mejor predictor que IMC según estudios OMS - <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3504067/" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">evidencia Framingham</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Sensible a cambios:</strong> Detecta mejoras en distribución de grasa</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Estándar médico:</strong> Utilizado por cardiólogos y endocrinólogos</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-warning-subtle border-l-4 border-warning">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Clasificación de Formas Corporales
                  </h3>
                </header>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-info-subtle rounded-full flex items-center justify-center">
                        <span className="text-info text-sm">🍐</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground/90">Tipo Ginoide (Pera)</div>
                        <div className="text-sm text-info">WHR bajo - Grasa en caderas y muslos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-warning-subtle rounded-full flex items-center justify-center">
                        <span className="text-warning text-sm">⭕</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground/90">Tipo Intermedio</div>
                        <div className="text-sm text-warning">WHR moderado - Distribución equilibrada</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-destructive-subtle rounded-full flex items-center justify-center">
                        <span className="text-destructive text-sm">🍎</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground/90">Tipo Androide (Manzana)</div>
                        <div className="text-sm text-foreground/90">WHR alto - Grasa abdominal central</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  Cómo Medir Correctamente
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">Medición de Cintura</h4>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Punto más estrecho del torso (generalmente ombligo)</li>
                      <li>• En ayunas, después de exhalar normalmente</li>
                      <li>• Cinta métrica horizontal alrededor del cuerpo</li>
                      <li>• No comprimir la piel excesivamente</li>
                      <li>• <a href="https://www.who.int/publications/i/item/9789241501491" target="_blank" rel="noopener noreferrer" className="text-info hover:underline transition-colors font-medium">Protocolo OMS oficial</a></li>
                    </ul>
                  </article>
                  <article>
                    <h4 className="font-semibold text-foreground mb-3">Medición de Cadera</h4>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Punto más ancho de las caderas/glúteos</li>
                      <li>• Cinta métrica horizontal alrededor del cuerpo</li>
                      <li>• Incluir la parte más prominente de los glúteos</li>
                      <li>• Mantener postura erguida durante la medición</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="card-golden-lg bg-warning-subtle border-l-4 border-warning mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-foreground/90 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación de WHR
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-foreground/90 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/whtr/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula tu WHtR:</a></strong> Ratio cintura-altura para riesgo cardiometabólico</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/imc/" className="text-info hover:underline transition-colors font-medium transition-golden">Evalúa tu IMC:</a></strong> Combina métricas antropométricas para evaluación completa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/bai/" className="text-info hover:underline transition-colors font-medium transition-golden">Calcula BAI sin peso:</a></strong> Estima grasa corporal con solo cadera y altura según Bergman</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/grasa-corporal/" className="text-info hover:underline transition-colors font-medium transition-golden">Mide tu grasa corporal:</a></strong> Conoce el porcentaje total de grasa para contexto</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span><strong><a href="/composicion/" className="text-info hover:underline transition-colors font-medium transition-golden">Análisis de composición:</a></strong> Evaluación completa de masa magra vs grasa</span>
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="whr" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora WHR Médica - Ratio Cintura-Cadera OMS"
            url="https://nutrifit-calculator.com/whr/"
            description="Calcula tu Ratio Cintura-Cadera según estándares OMS. Evalúa distribución de grasa, riesgo cardiovascular y obtén recomendaciones médicas profesionales. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="whr" />
        </main>
      </Container>
    </>
  );
}
