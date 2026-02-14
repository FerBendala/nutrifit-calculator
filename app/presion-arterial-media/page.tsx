"use client";

import { Container } from '@/components/Container';
import { CalculatorNavigation } from '@/components/ContextualLinks';
import { EmbedWidget } from '@/components/EmbedWidget';
import { NumberInput } from '@/components/NumberInput';
import { RelatedCalculators } from '@/components/RelatedCalculators';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeMAP } from '@/lib/formulas';
import { Activity, AlertTriangle, CheckCircle, Clock, HeartPulse, Info, Stethoscope } from 'lucide-react';
import { useState } from 'react';

export default function PresionArterialMediaPage() {
  const [formData, setFormData] = useState({
    systolicBP: '',
    diastolicBP: ''
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeMAP> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.systolicBP || !formData.diastolicBP) return;

    try {
      const analysis = analyzeMAP(
        parseFloat(formData.systolicBP),
        parseFloat(formData.diastolicBP)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating MAP:', error);
    }
  };

  const isFormValid = formData.systolicBP && formData.diastolicBP &&
    parseFloat(formData.systolicBP) > parseFloat(formData.diastolicBP);

  return (
    <>
      <SchemaMarkup calculatorKey="presion-arterial-media" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Presión Arterial Media (MAP)
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Calculadora médica de presión arterial media (MAP) para evaluación de perfusión de órganos
              y riesgo cardiovascular. Interpretación clínica según guías AHA/ACC. Herramienta para profesionales de la salud.
            </p>
          </header>

          {/* Formulario de cálculo */}
          <section id="calculator" aria-label="Calculadora de Presión Arterial Media">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <HeartPulse className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" />
                  Calculadora de Presión Arterial Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-golden-md">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Nota:</strong> La presión arterial media (MAP) representa la presión promedio en las arterias
                        durante un ciclo cardíaco completo. Es un indicador crítico de la perfusión de órganos vitales.
                        Introduce tus valores de presión arterial sistólica y diastólica.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-[1.618rem] md:grid-cols-2">
                    <NumberInput
                      id="systolicBP"
                      label="Presión Arterial Sistólica"
                      value={formData.systolicBP}
                      onChange={handleInputChange('systolicBP')}
                      min={70}
                      max={250}
                      step={1}
                      unit="mmHg"
                      placeholder="120"
                      required
                    />

                    <NumberInput
                      id="diastolicBP"
                      label="Presión Arterial Diastólica"
                      value={formData.diastolicBP}
                      onChange={handleInputChange('diastolicBP')}
                      min={40}
                      max={150}
                      step={1}
                      unit="mmHg"
                      placeholder="80"
                      required
                    />
                  </div>

                  {formData.systolicBP && formData.diastolicBP &&
                    parseFloat(formData.systolicBP) <= parseFloat(formData.diastolicBP) && (
                      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-700 dark:text-red-300">
                          <AlertTriangle className="w-4 h-4 inline mr-2" />
                          La presión sistólica debe ser mayor que la diastólica.
                        </p>
                      </div>
                    )}

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
                  >
                    <HeartPulse className="w-5 h-5 mr-2" />
                    Calcular Presión Arterial Media
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
              <header className="p-6 pb-0">
                <h2 className="text-2xl font-semibold flex items-center justify-center">
                  <HeartPulse className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" />
                  Resultados de Presión Arterial Media
                </h2>
              </header>
              <div className="p-6 space-golden-md">
                {/* MAP Principal */}
                <Card className={`bg-gradient-to-br ${result.category === 'Hipotensión' ? 'from-red-50 to-red-100' :
                  result.category === 'Normal' ? 'from-green-50 to-green-100' :
                    result.category === 'Prehipertensión' ? 'from-yellow-50 to-yellow-100' :
                      result.category === 'Hipertensión Estadio 1' ? 'from-orange-50 to-orange-100' :
                        result.category === 'Hipertensión Estadio 2' ? 'from-red-50 to-red-100' :
                          'from-red-50 to-red-100'
                  } border-l-4 ${result.category === 'Hipotensión' ? 'border-red-400' :
                    result.category === 'Normal' ? 'border-green-400' :
                      result.category === 'Prehipertensión' ? 'border-yellow-400' :
                        result.category === 'Hipertensión Estadio 1' ? 'border-orange-400' :
                          result.category === 'Hipertensión Estadio 2' ? 'border-red-400' :
                            'border-red-500'
                  }`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.category === 'Normal' ? 'text-green-900' :
                      result.category === 'Hipotensión' || result.category === 'Crisis Hipertensiva' ? 'text-red-900' :
                        'text-orange-900'
                      }`}>
                      <HeartPulse className="w-4 h-4 mr-2" />
                      Presión Arterial Media (MAP)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-5xl font-bold mb-2 ${result.category === 'Normal' ? 'text-green-700 dark:text-green-300' :
                      result.category === 'Hipotensión' || result.category === 'Crisis Hipertensiva' ? 'text-red-700 dark:text-red-300' :
                        'text-orange-700 dark:text-orange-300'
                      }`}>
                      {result.map} mmHg
                    </div>
                    <div className={`text-lg font-semibold mb-1 ${result.category === 'Normal' ? 'text-green-800 dark:text-green-200' :
                      result.category === 'Hipotensión' || result.category === 'Crisis Hipertensiva' ? 'text-red-800 dark:text-red-200' :
                        'text-orange-800 dark:text-orange-200'
                      }`}>
                      {result.status}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.interpretation}
                    </p>
                  </CardContent>
                </Card>

                {/* Presiones Arteriales */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-blue-900 dark:text-blue-100">
                        <Activity className="w-4 h-4 mr-2" />
                        Presión Sistólica
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                        {result.systolicBP} mmHg
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Presión máxima durante la contracción del corazón
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                        <Activity className="w-4 h-4 mr-2" />
                        Presión Diastólica
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-1">
                        {result.diastolicBP} mmHg
                      </div>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        Presión mínima durante la relajación del corazón
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Categoría de Presión Arterial */}
                <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-indigo-900">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Categoría según AHA/ACC 2017
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-indigo-700 mb-1">
                      {result.bpCategory}
                    </div>
                    <p className="text-xs text-indigo-600">
                      {result.systolicBP}/{result.diastolicBP} mmHg
                    </p>
                  </CardContent>
                </Card>

                {/* Perfusión de Órganos */}
                <Card className={`bg-gradient-to-br ${result.organPerfusion.risk === 'Bajo' ? 'from-green-50 to-green-100 border-green-400' :
                  result.organPerfusion.risk === 'Moderado' ? 'from-yellow-50 to-yellow-100 border-yellow-400' :
                    result.organPerfusion.risk === 'Alto' ? 'from-orange-50 to-orange-100 border-orange-400' :
                      'from-red-50 to-red-100 border-red-400'
                  } border-l-4`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-semibold flex items-center ${result.organPerfusion.risk === 'Bajo' ? 'text-green-900' :
                      result.organPerfusion.risk === 'Moderado' ? 'text-yellow-900' :
                        result.organPerfusion.risk === 'Alto' ? 'text-orange-900' :
                          'text-red-900'
                      }`}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Perfusión de Órganos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-lg font-bold mb-1 ${result.organPerfusion.risk === 'Bajo' ? 'text-green-700 dark:text-green-300' :
                      result.organPerfusion.risk === 'Moderado' ? 'text-yellow-700 dark:text-yellow-300' :
                        result.organPerfusion.risk === 'Alto' ? 'text-orange-700 dark:text-orange-300' :
                          'text-red-700 dark:text-red-300'
                      }`}>
                      {result.organPerfusion.status}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.organPerfusion.description}
                    </p>
                    <div className={`text-xs font-semibold inline-block px-2 py-1 rounded ${result.organPerfusion.risk === 'Bajo' ? 'bg-green-200 text-green-800 dark:text-green-200' :
                      result.organPerfusion.risk === 'Moderado' ? 'bg-yellow-200 text-yellow-800 dark:text-yellow-200' :
                        result.organPerfusion.risk === 'Alto' ? 'bg-orange-200 text-orange-800 dark:text-orange-200' :
                          'bg-red-200 text-red-800 dark:text-red-200'
                      }`}>
                      Riesgo: {result.organPerfusion.risk}
                    </div>
                  </CardContent>
                </Card>

                {/* Recomendaciones */}
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-blue-900 dark:text-blue-100">
                      <Info className="w-4 h-4 mr-2" />
                      Recomendaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Monitoreo */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-purple-900">
                      <Clock className="w-4 h-4 mr-2" />
                      Frecuencia de Monitoreo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-2">
                      {result.monitoring.frequency}
                    </div>
                    <ul className="space-y-1">
                      {result.monitoring.actions.map((action, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Factores de Riesgo */}
                {result.riskFactors.length > 0 && (
                  <Card className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center text-red-900">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Factores de Riesgo Asociados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {result.riskFactors.map((risk, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Interpretación Clínica */}
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-gray-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Interpretación Clínica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.clinicalSignificance}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {result.clinicalInterpretation}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Contenido educativo */}
          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es la Presión Arterial Media (MAP)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                La presión arterial media (MAP) es un indicador crítico de la perfusión de órganos vitales.
                Representa la presión promedio en las arterias durante un ciclo cardíaco completo y es esencial
                para mantener el flujo sanguíneo adecuado a órganos como el cerebro, corazón y riñones.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <HeartPulse className="w-5 h-5 mr-3 text-red-600 dark:text-red-400" />
                  Fórmula de Cálculo
                </h3>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-3">
                  <p className="text-sm font-mono text-blue-900 dark:text-blue-100 mb-2">
                    MAP = DBP + (1/3)(SBP - DBP)
                  </p>
                  <p className="text-sm font-mono text-blue-900 dark:text-blue-100">
                    MAP = (2 × DBP + SBP) / 3
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Donde <strong>SBP</strong> es la presión sistólica y <strong>DBP</strong> es la presión diastólica.
                  Esta fórmula refleja que la presión diastólica representa aproximadamente 2/3 del ciclo cardíaco,
                  mientras que la presión sistólica representa 1/3.
                </p>
              </article>

              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" />
                  Rango Normal
                </h3>
                <div className="space-golden-sm">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <p className="text-lg font-bold text-green-700 dark:text-green-300 mb-1">70-100 mmHg</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Rango normal para perfusión adecuada de órganos</p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start">
                      <span className="text-red-600 dark:text-red-400 mr-2">•</span>
                      <span><strong>&lt;70 mmHg:</strong> Hipotensión - Perfusión comprometida</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                      <span><strong>70-100 mmHg:</strong> Normal - Perfusión óptima</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                      <span><strong>&gt;100 mmHg:</strong> Hipertensión - Riesgo cardiovascular</span>
                    </li>
                  </ul>
                </div>
              </article>
            </section>

            <section className="bg-blue-50 dark:bg-blue-950/30 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl flex items-center">
                <Stethoscope className="w-5 h-5 mr-3" />
                Importancia Clínica de la MAP
              </h3>
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <HeartPulse className="w-4 h-4 mr-2" />
                    Perfusión de Órganos
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    La MAP es el principal determinante del flujo sanguíneo a órganos vitales.
                    Un MAP adecuado (70-100 mmHg) asegura que el cerebro, corazón y riñones
                    reciban suficiente oxígeno y nutrientes.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Evaluación de Shock
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    En situaciones de emergencia, un MAP &lt;65 mmHg se considera indicador de shock
                    y requiere intervención inmediata para restaurar la perfusión de órganos.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitoreo Continuo
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    En unidades de cuidados intensivos, la MAP se monitorea continuamente para
                    evaluar la respuesta al tratamiento y prevenir daño orgánico.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-bold mb-[0.618rem] text-blue-700 dark:text-blue-300 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Riesgo Cardiovascular
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Un MAP elevado (&gt;100 mmHg) aumenta el riesgo de enfermedad cardiovascular,
                    accidente cerebrovascular y daño a órganos diana a largo plazo.
                  </p>
                </article>
              </div>
            </section>

            <section className="card-golden-lg mb-[2.618rem]">
              <h3 className="text-2xl font-semibold mb-[1.618rem] flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
                Categorías de Presión Arterial (AHA/ACC 2017)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left p-3 font-semibold">Categoría</th>
                      <th className="text-left p-3 font-semibold">Sistólica (mmHg)</th>
                      <th className="text-left p-3 font-semibold">Diastólica (mmHg)</th>
                      <th className="text-left p-3 font-semibold">MAP Típico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-green-50 dark:bg-green-950/30">
                      <td className="p-3 font-semibold text-green-700 dark:text-green-300">Normal</td>
                      <td className="p-3">&lt;120</td>
                      <td className="p-3">&lt;80</td>
                      <td className="p-3">70-93</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-yellow-50 dark:bg-yellow-950/30">
                      <td className="p-3 font-semibold text-yellow-700 dark:text-yellow-300">Elevada</td>
                      <td className="p-3">120-129</td>
                      <td className="p-3">&lt;80</td>
                      <td className="p-3">93-97</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-orange-50 dark:bg-orange-950/30">
                      <td className="p-3 font-semibold text-orange-700 dark:text-orange-300">Hipertensión Estadio 1</td>
                      <td className="p-3">130-139</td>
                      <td className="p-3">80-89</td>
                      <td className="p-3">97-106</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-red-50 dark:bg-red-950/30">
                      <td className="p-3 font-semibold text-red-700 dark:text-red-300">Hipertensión Estadio 2</td>
                      <td className="p-3">≥140</td>
                      <td className="p-3">≥90</td>
                      <td className="p-3">≥107</td>
                    </tr>
                    <tr className="bg-red-100">
                      <td className="p-3 font-semibold text-red-800 dark:text-red-200">Crisis Hipertensiva</td>
                      <td className="p-3">&gt;180</td>
                      <td className="p-3">&gt;120</td>
                      <td className="p-3">&gt;140</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-cyan-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-[1.618rem] text-xl">
                Preguntas Frecuentes (FAQ)
              </h3>
              <div className="space-golden-md">
                <article className="card-golden bg-card/50">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">¿Por qué es importante la MAP?</h4>
                  <p className="text-sm text-muted-foreground">
                    La MAP es crucial porque representa la presión promedio que impulsa la sangre a través
                    del sistema circulatorio. Un MAP adecuado asegura que los órganos vitales reciban
                    suficiente flujo sanguíneo y oxígeno.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">¿Cuál es la diferencia entre MAP y presión arterial normal?</h4>
                  <p className="text-sm text-muted-foreground">
                    La presión arterial normal (SBP/DBP) muestra los valores máximos y mínimos durante
                    el ciclo cardíaco. La MAP calcula el promedio, que es más útil para evaluar la
                    perfusión de órganos y el riesgo cardiovascular a largo plazo.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">¿Qué significa un MAP bajo?</h4>
                  <p className="text-sm text-muted-foreground">
                    Un MAP &lt;70 mmHg indica hipotensión y puede comprometer la perfusión de órganos,
                    especialmente el cerebro y los riñones. Puede causar síntomas como mareos, fatiga,
                    confusión y, en casos severos, shock.
                  </p>
                </article>
                <article className="card-golden bg-card/50">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">¿Cómo puedo mejorar mi MAP?</h4>
                  <p className="text-sm text-muted-foreground">
                    Para un MAP elevado: dieta baja en sodio (DASH), ejercicio regular, mantener peso
                    saludable, limitar alcohol, gestionar estrés y tomar medicación según prescripción médica.
                    Para un MAP bajo: consultar con médico para identificar la causa subyacente.
                  </p>
                </article>
              </div>
            </section>
          </article>

          <RelatedCalculators currentPage="/presion-arterial-media" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>

          <SocialShare
            title="Calculadora de Presión Arterial Media (MAP) - Evaluación Cardiovascular"
            url="https://nutrifit-calculator.com/presion-arterial-media/"
            description="Calcula tu presión arterial media (MAP) para evaluación de perfusión de órganos y riesgo cardiovascular según guías AHA/ACC. ¡Totalmente gratis!"
          />
          <CalculatorNavigation currentCalculator="presion-arterial-media" />
        </main>
      </Container>
    </>
  );
}

