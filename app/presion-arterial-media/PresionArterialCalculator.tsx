"use client";

import { NumberInput } from '@/components/NumberInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeMAP } from '@/lib/formulas';
import { Activity, AlertTriangle, CheckCircle, Clock, HeartPulse, Info, Stethoscope } from 'lucide-react';
import { useState } from 'react';

export function PresionArterialCalculator() {
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
      {/* Formulario de cálculo */}
      <section id="calculator" aria-label="Calculadora de Presión Arterial Media">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <HeartPulse className="w-6 h-6 mr-3 text-destructive" />
              Calculadora de Presión Arterial Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="bg-info-subtle rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
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
                  <div className="bg-destructive-subtle border border-destructive rounded-lg p-3">
                    <p className="text-sm text-foreground/90">
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
              <HeartPulse className="w-6 h-6 mr-3 text-destructive" />
              Resultados de Presión Arterial Media
            </h2>
          </header>
          <div className="p-6 space-golden-md">
            {/* MAP Principal */}
            <Card className={`bg-gradient-to-br ${result.category === 'Hipotensión' ? 'from-red-50 to-red-100' :
              result.category === 'Normal' ? 'bg-success-subtle' :
                result.category === 'Prehipertensión' ? 'bg-warning-subtle' :
                  result.category === 'Hipertensión Estadio 1' ? 'bg-warning-subtle' :
                    result.category === 'Hipertensión Estadio 2' ? 'from-red-50 to-red-100' :
                      'from-red-50 to-red-100'
              } border-l-4 ${result.category === 'Hipotensión' ? 'border-destructive' :
                result.category === 'Normal' ? 'border-success' :
                  result.category === 'Prehipertensión' ? 'border-warning' :
                    result.category === 'Hipertensión Estadio 1' ? 'border-warning' :
                      result.category === 'Hipertensión Estadio 2' ? 'border-destructive' :
                        'border-destructive'
              }`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-semibold flex items-center ${result.category === 'Normal' ? 'text-foreground' :
                  result.category === 'Hipotensión' || result.category === 'Crisis Hipertensiva' ? 'text-foreground' :
                    'text-foreground'
                  }`}>
                  <HeartPulse className="w-4 h-4 mr-2" />
                  Presión Arterial Media (MAP)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-5xl font-bold mb-2 ${result.category === 'Normal' ? 'text-success' :
                  result.category === 'Hipotensión' || result.category === 'Crisis Hipertensiva' ? 'text-destructive' :
                    'text-warning'
                  }`}>
                  {result.map} mmHg
                </div>
                <div className={`text-lg font-semibold mb-1 ${result.category === 'Normal' ? 'text-foreground/90' :
                  result.category === 'Hipotensión' || result.category === 'Crisis Hipertensiva' ? 'text-foreground/90' :
                    'text-foreground/90'
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
              <Card className="bg-info-subtle">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                    <Activity className="w-4 h-4 mr-2" />
                    Presión Sistólica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-info mb-1">
                    {result.systolicBP} mmHg
                  </div>
                  <p className="text-xs text-info">
                    Presión máxima durante la contracción del corazón
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-accent">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                    <Activity className="w-4 h-4 mr-2" />
                    Presión Diastólica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning mb-1">
                    {result.diastolicBP} mmHg
                  </div>
                  <p className="text-xs text-warning">
                    Presión mínima durante la relajación del corazón
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Categoría de Presión Arterial */}
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-l-4 border-indigo-400">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
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
            <Card className={`bg-gradient-to-br ${result.organPerfusion.risk === 'Bajo' ? 'bg-success-subtle border-success' :
              result.organPerfusion.risk === 'Moderado' ? 'bg-warning-subtle border-warning' :
                result.organPerfusion.risk === 'Alto' ? 'bg-warning-subtle border-warning' :
                  'from-red-50 to-red-100 border-destructive'
              } border-l-4`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-semibold flex items-center ${result.organPerfusion.risk === 'Bajo' ? 'text-foreground' :
                  result.organPerfusion.risk === 'Moderado' ? 'text-foreground' :
                    result.organPerfusion.risk === 'Alto' ? 'text-foreground' :
                      'text-foreground'
                  }`}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Perfusión de Órganos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-lg font-bold mb-1 ${result.organPerfusion.risk === 'Bajo' ? 'text-success' :
                  result.organPerfusion.risk === 'Moderado' ? 'text-warning' :
                    result.organPerfusion.risk === 'Alto' ? 'text-warning' :
                      'text-destructive'
                  }`}>
                  {result.organPerfusion.status}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {result.organPerfusion.description}
                </p>
                <div className={`text-xs font-semibold inline-block px-2 py-1 rounded ${result.organPerfusion.risk === 'Bajo' ? 'bg-success-subtle text-foreground/90' :
                  result.organPerfusion.risk === 'Moderado' ? 'bg-warning-subtle text-foreground/90' :
                    result.organPerfusion.risk === 'Alto' ? 'bg-warning-subtle text-foreground/90' :
                      'bg-destructive-subtle text-foreground/90'
                  }`}>
                  Riesgo: {result.organPerfusion.risk}
                </div>
              </CardContent>
            </Card>

            {/* Recomendaciones */}
            <Card className="bg-gradient-to-br bg-info-subtle border-l-4 border-info">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-info mr-2">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Monitoreo */}
            <Card className="bg-accent border-l-4 border-warning">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  Frecuencia de Monitoreo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-warning mb-2">
                  {result.monitoring.frequency}
                </div>
                <ul className="space-y-1">
                  {result.monitoring.actions.map((action, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-warning mr-2">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Factores de Riesgo */}
            {result.riskFactors.length > 0 && (
              <Card className="bg-destructive-subtle border-l-4 border-destructive">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Factores de Riesgo Asociados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {result.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-destructive mr-2">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Interpretación Clínica */}
            <Card className="bg-gradient-to-br bg-muted border-l-4 border-border">
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
    </>
  );
}
