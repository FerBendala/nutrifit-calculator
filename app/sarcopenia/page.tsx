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
import { analyzeSarcopenia, calculateAppendicularSkeletalMuscleMass, calculateSarcopeniaIndex, calculateSkeletalMuscleMassIndex } from '@/lib/formulas';
import { AlertCircle, Calculator, Dumbbell, Heart, Info, Shield, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

interface SarcopeniaResult {
  method: string;
  sarcopeniaIndex?: number;
  asmm?: number;
  smmi?: number;
  sarcopeniaStage: string;
  riskLevel: string;
  ageAdjustedRisk: string;
  functionalImpact: string;
  recommendations: string[];
  preventionStrategies: string[];
  clinicalImplications: string;
  followUp: string;
}

export default function SarcopeniaPage() {
  const [activeTab, setActiveTab] = useState('index');
  const [formData, setFormData] = useState({
    // Sarcopenia Index
    indexGender: 'male',
    indexMuscleMass: '',
    indexHeight: '',

    // ASMM
    asmmGender: 'male',
    asmmWeight: '',
    asmmHeight: '',
    asmmAge: '',
    asmmWaist: '',
    asmmEthnicity: 'caucasian',

    // SMMI
    smmiGender: 'male',
    smmiHeight: '',
    smmiAge: '',
    smmiWaist: '',
    smmiHip: '',
    smmiForearm: '',
    smmiEthnicity: 'caucasian'
  });

  const [result, setResult] = useState<SarcopeniaResult | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let analysis: any;
      let method: string;

      switch (activeTab) {
        case 'index':
          const indexGender = formData.indexGender as 'male' | 'female';
          const muscleMass = parseFloat(formData.indexMuscleMass);
          const height = parseFloat(formData.indexHeight);

          const sarcopeniaIndex = calculateSarcopeniaIndex(indexGender, muscleMass, height);
          analysis = analyzeSarcopenia(sarcopeniaIndex, parseInt(formData.asmmAge || '50'), indexGender);
          method = 'Índice de Sarcopenia (Baumgartner)';
          break;

        case 'asmm':
          const asmmGender = formData.asmmGender as 'male' | 'female';
          const asmmWeight = parseFloat(formData.asmmWeight);
          const asmmHeight = parseFloat(formData.asmmHeight);
          const asmmAge = parseInt(formData.asmmAge);
          const asmmWaist = parseFloat(formData.asmmWaist);

          const asmm = calculateAppendicularSkeletalMuscleMass(asmmGender, asmmWeight, asmmHeight, asmmAge, asmmWaist, formData.asmmEthnicity as any);
          const sarcopeniaIndexFromASMM = asmm / Math.pow(asmmHeight / 100, 2);
          analysis = analyzeSarcopenia(sarcopeniaIndexFromASMM, asmmAge, asmmGender);
          method = 'Masa Muscular Esquelética Apendicular (ASMM)';
          break;

        case 'smmi':
          const smmiGender = formData.smmiGender as 'male' | 'female';
          const smmiHeight = parseFloat(formData.smmiHeight);
          const smmiAge = parseInt(formData.smmiAge);
          const smmiWaist = parseFloat(formData.smmiWaist);
          const smmiHip = parseFloat(formData.smmiHip);
          const smmiForearm = parseFloat(formData.smmiForearm);

          const smmi = calculateSkeletalMuscleMassIndex(smmiGender, smmiHeight, smmiAge, smmiWaist, smmiHip, smmiForearm, formData.smmiEthnicity as any);
          analysis = analyzeSarcopenia(smmi, smmiAge, smmiGender);
          method = 'Índice de Masa Muscular Esquelética (SMMI)';
          break;

        default:
          throw new Error('Método no válido');
      }

      setResult({
        method,
        sarcopeniaIndex: activeTab === 'index' ? analysis.sarcopeniaIndex : undefined,
        asmm: activeTab === 'asmm' ? analysis.sarcopeniaIndex : undefined,
        smmi: activeTab === 'smmi' ? analysis.sarcopeniaIndex : undefined,
        sarcopeniaStage: analysis.sarcopeniaStage,
        riskLevel: analysis.riskLevel,
        ageAdjustedRisk: analysis.ageAdjustedRisk,
        functionalImpact: analysis.functionalImpact,
        recommendations: analysis.recommendations,
        preventionStrategies: analysis.preventionStrategies,
        clinicalImplications: analysis.clinicalImplications,
        followUp: analysis.followUp
      });

    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const isFormValid = () => {
    switch (activeTab) {
      case 'index':
        return formData.indexGender && formData.indexMuscleMass && formData.indexHeight;
      case 'asmm':
        return formData.asmmGender && formData.asmmWeight && formData.asmmHeight && formData.asmmAge && formData.asmmWaist;
      case 'smmi':
        return formData.smmiGender && formData.smmiHeight && formData.smmiAge && formData.smmiWaist && formData.smmiHip && formData.smmiForearm;
      default:
        return false;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo': return 'text-green-600 bg-green-50 border-green-400';
      case 'Moderado': return 'text-blue-600 bg-blue-50 border-blue-400';
      case 'Alto': return 'text-orange-600 bg-orange-50 border-orange-400';
      case 'Muy Alto': return 'text-red-600 bg-red-50 border-red-400';
      default: return 'text-gray-600 bg-gray-50 border-gray-400';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="sarcopenia" />
      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-lg pt-[2.618rem]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculadora Índice de Sarcopenia Médica
            </h1>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">
              Calculadora profesional para evaluar la pérdida muscular relacionada con la edad.
              Basada en estándares EWGSOP2 con fórmulas Baumgartner, ASMM y SMMI.
              Ideal para adultos mayores, geriatras y profesionales de la salud.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora de Índice de Sarcopenia">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Calculadora de Sarcopenia
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Elige el método de evaluación según tus datos disponibles
                </p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="index">Índice Básico</TabsTrigger>
                    <TabsTrigger value="asmm">ASMM Completo</TabsTrigger>
                    <TabsTrigger value="smmi">SMMI Avanzado</TabsTrigger>
                  </TabsList>

                  <TabsContent value="index" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-blue-800 mb-1">Índice de Sarcopenia (Baumgartner)</h3>
                            <p className="text-sm text-blue-700">
                              Método simple que requiere masa muscular y altura. Ideal para screening inicial.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="indexGender"
                          label="Sexo"
                          value={formData.indexGender}
                          onChange={(value) => handleInputChange('indexGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="indexMuscleMass"
                          label="Masa muscular"
                          value={formData.indexMuscleMass}
                          onChange={(value) => handleInputChange('indexMuscleMass', value)}
                          placeholder="25"
                          unit="kg"
                          min={10}
                          max={100}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="indexHeight"
                          label="Altura"
                          value={formData.indexHeight}
                          onChange={(value) => handleInputChange('indexHeight', value)}
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
                        Calcular Índice de Sarcopenia
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="asmm" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-green-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-green-800 mb-1">Masa Muscular Esquelética Apendicular (ASMM)</h3>
                            <p className="text-sm text-green-700">
                              Método más preciso que incluye edad, peso, altura y circunferencia de cintura.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="asmmGender"
                          label="Sexo"
                          value={formData.asmmGender}
                          onChange={(value) => handleInputChange('asmmGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <SelectInput
                          id="asmmEthnicity"
                          label="Etnia"
                          value={formData.asmmEthnicity}
                          onChange={(value) => handleInputChange('asmmEthnicity', value)}
                          options={[
                            { value: 'caucasian', label: 'Caucásico' },
                            { value: 'asian', label: 'Asiático' },
                            { value: 'hispanic', label: 'Hispano' },
                            { value: 'african', label: 'Africano' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="asmmWeight"
                          label="Peso corporal"
                          value={formData.asmmWeight}
                          onChange={(value) => handleInputChange('asmmWeight', value)}
                          placeholder="70"
                          unit="kg"
                          min={30}
                          max={200}
                          step={0.1}
                          required
                        />

                        <NumberInput
                          id="asmmHeight"
                          label="Altura"
                          value={formData.asmmHeight}
                          onChange={(value) => handleInputChange('asmmHeight', value)}
                          placeholder="170"
                          unit="cm"
                          min={120}
                          max={220}
                          required
                        />

                        <NumberInput
                          id="asmmAge"
                          label="Edad"
                          value={formData.asmmAge}
                          onChange={(value) => handleInputChange('asmmAge', value)}
                          placeholder="50"
                          unit="años"
                          min={18}
                          max={100}
                          required
                        />

                        <NumberInput
                          id="asmmWaist"
                          label="Circunferencia de cintura"
                          value={formData.asmmWaist}
                          onChange={(value) => handleInputChange('asmmWaist', value)}
                          placeholder="85"
                          unit="cm"
                          min={50}
                          max={150}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular ASMM
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="smmi" className="space-golden-sm">
                    <form onSubmit={handleSubmit} className="space-golden-md">
                      <div className="bg-purple-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-purple-800 mb-1">Índice de Masa Muscular Esquelética (SMMI)</h3>
                            <p className="text-sm text-purple-700">
                              Método más completo que incluye múltiples medidas antropométricas para mayor precisión.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-[1.618rem] md:grid-cols-2">
                        <SelectInput
                          id="smmiGender"
                          label="Sexo"
                          value={formData.smmiGender}
                          onChange={(value) => handleInputChange('smmiGender', value)}
                          options={[
                            { value: 'male', label: 'Hombre' },
                            { value: 'female', label: 'Mujer' }
                          ]}
                          required
                        />

                        <SelectInput
                          id="smmiEthnicity"
                          label="Etnia"
                          value={formData.smmiEthnicity}
                          onChange={(value) => handleInputChange('smmiEthnicity', value)}
                          options={[
                            { value: 'caucasian', label: 'Caucásico' },
                            { value: 'asian', label: 'Asiático' },
                            { value: 'hispanic', label: 'Hispano' },
                            { value: 'african', label: 'Africano' }
                          ]}
                          required
                        />

                        <NumberInput
                          id="smmiHeight"
                          label="Altura"
                          value={formData.smmiHeight}
                          onChange={(value) => handleInputChange('smmiHeight', value)}
                          placeholder="170"
                          unit="cm"
                          min={120}
                          max={220}
                          required
                        />

                        <NumberInput
                          id="smmiAge"
                          label="Edad"
                          value={formData.smmiAge}
                          onChange={(value) => handleInputChange('smmiAge', value)}
                          placeholder="50"
                          unit="años"
                          min={18}
                          max={100}
                          required
                        />

                        <NumberInput
                          id="smmiWaist"
                          label="Circunferencia de cintura"
                          value={formData.smmiWaist}
                          onChange={(value) => handleInputChange('smmiWaist', value)}
                          placeholder="85"
                          unit="cm"
                          min={50}
                          max={150}
                          required
                        />

                        <NumberInput
                          id="smmiHip"
                          label="Circunferencia de cadera"
                          value={formData.smmiHip}
                          onChange={(value) => handleInputChange('smmiHip', value)}
                          placeholder="95"
                          unit="cm"
                          min={60}
                          max={150}
                          required
                        />

                        <NumberInput
                          id="smmiForearm"
                          label="Circunferencia de antebrazo"
                          value={formData.smmiForearm}
                          onChange={(value) => handleInputChange('smmiForearm', value)}
                          placeholder="25"
                          unit="cm"
                          min={15}
                          max={40}
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
                        Calcular SMMI
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
                <h2 className="text-2xl font-bold text-center text-gray-900">
                  Resultados - {result.method}
                </h2>
              </header>
              <div className="p-6">
                <div className="space-golden-lg">
                  {/* Main Results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <article className="text-center p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {result.sarcopeniaIndex?.toFixed(2) || result.asmm?.toFixed(2) || result.smmi?.toFixed(2)}
                      </div>
                      <div className="text-sm font-medium text-blue-800">
                        {activeTab === 'index' ? 'Índice de Sarcopenia' : activeTab === 'asmm' ? 'ASMM (kg)' : 'SMMI'}
                      </div>
                    </article>

                    <article className={`text-center p-6 rounded-lg border-l-4 ${getRiskColor(result.riskLevel)}`}>
                      <div className="text-3xl font-bold mb-2">
                        {result.sarcopeniaStage}
                      </div>
                      <div className="text-sm font-medium">Estado</div>
                    </article>

                    <article className={`text-center p-6 rounded-lg border-l-4 ${getRiskColor(result.riskLevel)}`}>
                      <div className="text-3xl font-bold mb-2">
                        {result.riskLevel}
                      </div>
                      <div className="text-sm font-medium">Riesgo</div>
                    </article>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="card-golden bg-white/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-blue-600" />
                          Evaluación Clínica
                        </h3>
                      </header>
                      <div className="p-6">
                        <div className="space-y-3">
                          <div>
                            <div className="font-medium text-gray-900 mb-1">Riesgo ajustado por edad:</div>
                            <div className="text-sm text-gray-600">{result.ageAdjustedRisk}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 mb-1">Impacto funcional:</div>
                            <div className="text-sm text-gray-600">{result.functionalImpact}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 mb-1">Implicaciones clínicas:</div>
                            <div className="text-sm text-gray-600">{result.clinicalImplications}</div>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article className="card-golden bg-white/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Seguimiento recomendado
                        </h3>
                      </header>
                      <div className="p-6">
                        <p className="text-sm text-gray-600 leading-[1.618]">
                          {result.followUp}
                        </p>
                      </div>
                    </article>
                  </div>

                  {/* Recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="card-golden bg-white/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                          Recomendaciones Personalizadas
                        </h3>
                      </header>
                      <div className="p-6">
                        <ul className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-1 flex-shrink-0"></span>
                              <span className="text-sm text-gray-600 leading-[1.618]">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>

                    <article className="card-golden bg-white/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <Dumbbell className="h-5 w-5 mr-2 text-orange-600" />
                          Estrategias de Prevención
                        </h3>
                      </header>
                      <div className="p-6">
                        <ul className="space-y-2">
                          {result.preventionStrategies.map((strategy, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-1 flex-shrink-0"></span>
                              <span className="text-sm text-gray-600 leading-[1.618]">{strategy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                ¿Qué es la Sarcopenia?
              </h2>
            </header>

            <section className="card-golden-lg bg-blue-50 border-l-4 border-blue-400 mb-8">
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  La <strong>sarcopenia</strong> es la pérdida progresiva y generalizada de masa muscular esquelética
                  que ocurre con el <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2804956/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">envejecimiento</a>.
                  Afecta la movilidad, el equilibrio y aumenta el riesgo de caídas y fracturas.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Según la <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3377163/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium transition-golden">EWGSOP2</a>,
                  se diagnostica cuando hay baja masa muscular más baja fuerza o rendimiento físico reducido.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="card-golden-lg bg-red-50 border-l-4 border-red-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-red-800 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Factores de Riesgo de Sarcopenia
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-red-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Edad avanzada:</strong> Mayor riesgo después de los 50 años</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Sedentarismo:</strong> Falta de actividad física regular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Desnutrición:</strong> Déficit de proteínas y calorías</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Enfermedades crónicas:</strong> Diabetes, cáncer, EPOC</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Inflamación crónica:</strong> Procesos inflamatorios persistentes</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="card-golden-lg bg-green-50 border-l-4 border-green-400">
                <header className="p-6 pb-0">
                  <h3 className="text-xl font-semibold text-green-800 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Beneficios de la Prevención
                  </h3>
                </header>
                <div className="p-6">
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Mejor movilidad:</strong> Mantiene independencia funcional</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Menor riesgo de caídas:</strong> Mejora el equilibrio y estabilidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Calidad de vida:</strong> Mantiene actividades diarias autónomas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Longevidad saludable:</strong> Reduce dependencia y fragilidad</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Ahorro sanitario:</strong> Menos hospitalizaciones y cuidados</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="card-golden-lg bg-purple-50 border-l-4 border-purple-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-purple-800 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Estadísticas de Sarcopenia
                </h3>
              </header>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">10-20%</div>
                    <div className="text-sm text-purple-800">Prevalencia en adultos &gt; 50 años</div>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">50%</div>
                    <div className="text-sm text-purple-800">Prevalencia en adultos &gt; 80 años</div>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">3x</div>
                    <div className="text-sm text-purple-800">Mayor riesgo de mortalidad</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enlaces contextuales */}
            <section className="card-golden-lg bg-orange-50 border-l-4 border-orange-400 mt-8">
              <header className="p-6 pb-0">
                <h3 className="text-xl font-semibold text-orange-800 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Complementa tu evaluación de sarcopenia
                </h3>
              </header>
              <div className="p-6">
                <ul className="text-sm text-orange-800 space-golden-xs">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong><a href="/masa-muscular" className="text-blue-600 hover:underline font-medium transition-golden">Calcula tu masa muscular:</a></strong> Evalúa la cantidad total de músculo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong><a href="/proteina" className="text-blue-600 hover:underline font-medium transition-golden">Optimiza tu ingesta proteica:</a></strong> Fundamental para mantener la masa muscular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong><a href="/composicion" className="text-blue-600 hover:underline font-medium transition-golden">Evalúa composición corporal:</a></strong> Relación entre músculo y grasa corporal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <span><strong><a href="/vo2max" className="text-blue-600 hover:underline font-medium transition-golden">Mide tu capacidad cardiovascular:</a></strong> El ejercicio aeróbico ayuda a prevenir la sarcopenia</span>
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* Calculadoras relacionadas */}
          <RelatedCalculators currentPage="sarcopenia" />

          {/* Widget para embeber */}
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          {/* Social Share */}
          <SocialShare
            title="Calculadora Índice de Sarcopenia - Evaluación Médica"
            url="https://nutrifit-calculator.com/sarcopenia"
            description="Calcula tu Índice de Sarcopenia con fórmulas médicas profesionales. Evalúa pérdida muscular relacionada con la edad y obtén recomendaciones preventivas. ¡Totalmente gratis!"
          />

          {/* Navegación entre calculadoras */}
          <CalculatorNavigation currentCalculator="sarcopenia" />
        </main>
      </Container>
    </>
  );
}
