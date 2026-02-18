"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeSarcopenia, calculateAppendicularSkeletalMuscleMass, calculateSarcopeniaIndex, calculateSkeletalMuscleMassIndex } from '@/lib/formulas';
import { Calculator, Dumbbell, Info, Shield, TrendingUp } from 'lucide-react';
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

export function SarcopeniaCalculator() {
  const [activeTab, setActiveTab] = useState('index');
  const [formData, setFormData] = useState({
    indexGender: 'male',
    indexMuscleMass: '',
    indexHeight: '',

    asmmGender: 'male',
    asmmWeight: '',
    asmmHeight: '',
    asmmAge: '',
    asmmWaist: '',
    asmmEthnicity: 'caucasian',

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
      case 'Bajo': return 'text-foreground bg-success-subtle border-success';
      case 'Moderado': return 'text-foreground bg-info-subtle border-info';
      case 'Alto': return 'text-foreground bg-warning-subtle border-warning';
      case 'Muy Alto': return 'text-foreground bg-destructive-subtle border-destructive';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora de Índice de Sarcopenia">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              Calculadora de Sarcopenia
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Elige el método de evaluación según tus datos disponibles
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="relative z-10 grid w-full grid-cols-1 md:grid-cols-3 gap-2 mb-6 md:mb-0 h-auto md:h-10">
                <TabsTrigger value="index">Índice Básico</TabsTrigger>
                <TabsTrigger value="asmm">ASMM Completo</TabsTrigger>
                <TabsTrigger value="smmi">SMMI Avanzado</TabsTrigger>
              </TabsList>

              <TabsContent value="index" className="space-golden-sm">
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-info-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground/90 mb-1">Índice de Sarcopenia (Baumgartner)</h3>
                        <p className="text-sm text-info">
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
                  <div className="bg-success-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground/90 mb-1">Masa Muscular Esquelética Apendicular (ASMM)</h3>
                        <p className="text-sm text-success">
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
                  <div className="bg-warning-subtle rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Índice de Masa Muscular Esquelética (SMMI)</h3>
                        <p className="text-sm text-warning">
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
            <h2 className="text-2xl font-bold text-center text-foreground">
              Resultados - {result.method}
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="text-center p-6 bg-info-subtle rounded-lg border-l-4 border-info">
                  <div className="text-3xl font-bold text-info mb-2">
                    {result.sarcopeniaIndex?.toFixed(2) || result.asmm?.toFixed(2) || result.smmi?.toFixed(2)}
                  </div>
                  <div className="text-sm font-medium text-foreground/90">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-info" />
                      Evaluación Clínica
                    </h3>
                  </header>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-foreground mb-1">Riesgo ajustado por edad:</div>
                        <div className="text-sm text-muted-foreground">{result.ageAdjustedRisk}</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">Impacto funcional:</div>
                        <div className="text-sm text-muted-foreground">{result.functionalImpact}</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">Implicaciones clínicas:</div>
                        <div className="text-sm text-muted-foreground">{result.clinicalImplications}</div>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      Seguimiento recomendado
                    </h3>
                  </header>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-[1.618]">
                      {result.followUp}
                    </p>
                  </div>
                </article>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-success" />
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

                <article className="card-golden bg-card/50">
                  <header className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Dumbbell className="h-5 w-5 mr-2 text-warning" />
                      Estrategias de Prevención
                    </h3>
                  </header>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {result.preventionStrategies.map((strategy, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-1 flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground leading-[1.618]">{strategy}</span>
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
    </>
  );
}
