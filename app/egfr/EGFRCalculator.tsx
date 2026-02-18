"use client";

import { NumberInput } from '@/components/NumberInput';
import { SelectInput } from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeEGFR } from '@/lib/formulas';
import { Gauge, Info } from 'lucide-react';
import { useState } from 'react';

export function EGFRCalculator() {
  const [formData, setFormData] = useState({
    creatinine: '',
    age: '',
    sex: 'male' as 'male' | 'female',
    weight: '',
    isBlack: 'no' as 'yes' | 'no'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeEGFR> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const creatinine = parseFloat(formData.creatinine);
      const age = parseInt(formData.age);
      const weight = formData.weight ? parseFloat(formData.weight) : undefined;
      const isBlack = formData.isBlack === 'yes';
      const analysis = analyzeEGFR(creatinine, age, formData.sex, weight, isBlack);
      setResult(analysis);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error al calcular');
    }
  };

  const isFormValid = formData.creatinine && formData.age;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case '1': return 'bg-success-subtle border-success text-foreground';
      case '2': return 'bg-success-subtle border-success text-foreground';
      case '3a': return 'bg-warning-subtle border-warning text-foreground';
      case '3b': return 'bg-warning-subtle border-warning text-foreground';
      case '4': return 'bg-destructive-subtle border-destructive text-foreground';
      case '5': return 'bg-destructive-subtle border-destructive text-foreground';
      default: return 'bg-muted border-border text-foreground';
    }
  };

  return (
    <>
      <section id="calculator" aria-label="Calculadora eGFR">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <Gauge className="w-6 h-6 mr-3 text-teal-600" />
              Calculadora de Filtrado Glomerular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-info-subtle rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> Introduce la creatinina sérica en mg/dL (valor de tu analítica).
                  El peso es opcional; si lo introduces se calculará también el clearance de Cockcroft-Gault para ajuste de dosis.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <NumberInput
                  id="creatinine"
                  label="Creatinina sérica"
                  value={formData.creatinine}
                  onChange={handleInputChange('creatinine')}
                  min={0.2}
                  max={20}
                  step={0.01}
                  unit="mg/dL"
                  placeholder="1.0"
                  required
                />
                <NumberInput
                  id="age"
                  label="Edad"
                  value={formData.age}
                  onChange={handleInputChange('age')}
                  min={18}
                  max={120}
                  step={1}
                  unit="años"
                  placeholder="50"
                  required
                />
                <SelectInput
                  id="sex"
                  label="Género"
                  value={formData.sex}
                  onChange={handleInputChange('sex')}
                  options={[
                    { value: 'male', label: 'Hombre' },
                    { value: 'female', label: 'Mujer' }
                  ]}
                  required
                />
                <NumberInput
                  id="weight"
                  label="Peso (opcional, para Cockcroft-Gault)"
                  value={formData.weight}
                  onChange={handleInputChange('weight')}
                  min={30}
                  max={300}
                  step={0.1}
                  unit="kg"
                  placeholder="70"
                />
                <SelectInput
                  id="isBlack"
                  label="Origen afroamericano / raza negra (CKD-EPI/MDRD)"
                  value={formData.isBlack}
                  onChange={handleInputChange('isBlack')}
                  options={[
                    { value: 'no', label: 'No' },
                    { value: 'yes', label: 'Sí' }
                  ]}
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                <Gauge className="w-5 h-5 mr-2" />
                Calcular eGFR
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <Gauge className="w-6 h-6 mr-3 text-teal-600" />
              Resultados de Filtrado Glomerular
            </h2>
          </header>
          <div className="p-6 space-golden-md">
            <Card className={`bg-gradient-to-br ${getStageColor(result.stage)} border-l-4`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center">
                  <Gauge className="w-4 h-4 mr-2" />
                  Estadio de Enfermedad Renal (ERC)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{result.stageLabel}</div>
                <p className="text-sm text-muted-foreground">{result.interpretation}</p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-teal-50 to-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-teal-900">CKD-EPI (eGFR)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-teal-700">
                    {result.ckdEpi} mL/min/1.73 m²
                  </div>
                  <p className="text-xs text-teal-600 mt-1">Ecuación recomendada en guías</p>
                </CardContent>
              </Card>
              <Card className="bg-info-subtle">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">MDRD-4</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-info">
                    {result.mdrd} mL/min/1.73 m²
                  </div>
                  <p className="text-xs text-info mt-1">Referencia histórica</p>
                </CardContent>
              </Card>
              {result.cockcroftGault !== undefined && (
                <Card className="bg-accent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">Cockcroft-Gault</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {result.cockcroftGault} mL/min
                    </div>
                    <p className="text-xs text-warning mt-1">Clearance creatinina (ajuste dosis)</p>
                  </CardContent>
                </Card>
              )}
            </div>

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

            <Card className="bg-gradient-to-br bg-muted border-l-4 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center text-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  Significado clínico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{result.clinicalSignificance}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}
