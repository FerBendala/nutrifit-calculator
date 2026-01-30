"use client";

import { Breadcrumbs } from '@/components/Breadcrumbs';
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
import { analyzeEGFR } from '@/lib/formulas';
import { Gauge, Info } from 'lucide-react';
import { useState } from 'react';

export default function EGFRPage() {
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
      case '1': return 'from-green-50 to-green-100 border-green-400 text-green-900';
      case '2': return 'from-lime-50 to-lime-100 border-lime-400 text-lime-900';
      case '3a': return 'from-yellow-50 to-yellow-100 border-yellow-400 text-yellow-900';
      case '3b': return 'from-orange-50 to-orange-100 border-orange-400 text-orange-900';
      case '4': return 'from-red-50 to-red-100 border-red-400 text-red-900';
      case '5': return 'from-red-100 to-red-200 border-red-600 text-red-900';
      default: return 'from-gray-50 to-gray-100 border-gray-400 text-gray-900';
    }
  };

  return (
    <>
      <SchemaMarkup calculatorKey="egfr" />

      <Container size="xl" className="py-[4.236rem]">
        <main className="max-w-5xl mx-auto space-golden-lg">
          <Breadcrumbs items={[{ label: 'eGFR (Filtrado Glomerular)' }]} className="mb-6" />

          <header className="text-center space-golden-md">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-[1.618rem]">
              Calculadora de Filtrado Glomerular (eGFR)
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-[1.618] font-light">
              Estimación de función renal con fórmulas CKD-EPI y MDRD. Estadificación de enfermedad renal crónica (ERC) y Cockcroft-Gault para ajuste de dosis. Para profesionales de la salud.
            </p>
          </header>

          <section id="calculator" aria-label="Calculadora eGFR">
            <Card className="card-golden-lg shadow-golden-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center justify-center">
                  <Gauge className="w-6 h-6 mr-3 text-teal-600" />
                  Calculadora de Filtrado Glomerular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
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
                    <p className="text-sm text-gray-700">{result.interpretation}</p>
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
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-blue-900">MDRD-4</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700">
                        {result.mdrd} mL/min/1.73 m²
                      </div>
                      <p className="text-xs text-blue-600 mt-1">Referencia histórica</p>
                    </CardContent>
                  </Card>
                  {result.cockcroftGault !== undefined && (
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold text-purple-900">Cockcroft-Gault</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-700">
                          {result.cockcroftGault} mL/min
                        </div>
                        <p className="text-xs text-purple-600 mt-1">Clearance creatinina (ajuste dosis)</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-blue-900">
                      <Info className="w-4 h-4 mr-2" />
                      Recomendaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-gray-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center text-gray-900">
                      <Info className="w-4 h-4 mr-2" />
                      Significado clínico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{result.clinicalSignificance}</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          <article className="prose prose-gray max-w-none space-golden-lg pt-[2.618rem]">
            <header>
              <h2 className="text-3xl font-semibold mb-[1.618rem] text-center">
                ¿Qué es el eGFR (Filtrado Glomerular Estimado)?
              </h2>
              <p className="text-muted-foreground mb-[2.618rem] text-lg leading-[1.618] text-center max-w-4xl mx-auto">
                El eGFR estima la tasa de filtración glomerular, es decir, la capacidad de los riñones para filtrar la sangre.
                Se calcula a partir de la creatinina sérica, edad, sexo y, en algunas ecuaciones, raza. Se utiliza para detectar
                y estadificar la enfermedad renal crónica (ERC), ajustar dosis de medicamentos y planificar seguimiento.
              </p>
            </header>

            <section className="grid gap-[1.618rem] md:grid-cols-2 mb-[2.618rem]">
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Gauge className="w-5 h-5 mr-3 text-teal-600" />
                  Estadios ERC (KDIGO)
                </h3>
                <div className="space-golden-sm text-sm">
                  <div className="bg-green-50 p-3 rounded-lg"><strong>G1:</strong> ≥90 — Normal o alto</div>
                  <div className="bg-lime-50 p-3 rounded-lg"><strong>G2:</strong> 60-89 — Leve</div>
                  <div className="bg-yellow-50 p-3 rounded-lg"><strong>G3a:</strong> 45-59 — Leve-moderado</div>
                  <div className="bg-orange-50 p-3 rounded-lg"><strong>G3b:</strong> 30-44 — Moderado-severo</div>
                  <div className="bg-red-50 p-3 rounded-lg"><strong>G4:</strong> 15-29 — Severo</div>
                  <div className="bg-red-100 p-3 rounded-lg"><strong>G5:</strong> &lt;15 — Enfermedad renal terminal</div>
                </div>
              </article>
              <article className="card-golden space-golden-sm">
                <h3 className="text-xl font-semibold mb-[0.618rem] flex items-center">
                  <Info className="w-5 h-5 mr-3 text-blue-600" />
                  Fórmulas utilizadas
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong>CKD-EPI (2009):</strong> Recomendada en guías; más precisa en GFR normales o altos.</li>
                  <li><strong>MDRD-4:</strong> Ecuación de 4 variables; referencia histórica.</li>
                  <li><strong>Cockcroft-Gault:</strong> Clearance de creatinina (mL/min), útil para ajuste de dosis de fármacos.</li>
                </ul>
              </article>
            </section>

            <section className="bg-blue-50 card-golden-lg border-l-4 border-blue-400 mb-[2.618rem]">
              <h3 className="font-bold text-blue-900 mb-[1.618rem] text-xl flex items-center">
                <Info className="w-5 h-5 mr-3" />
                Limitaciones y uso clínico
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                El eGFR es una estimación, no una medida directa del GFR. Puede ser menos preciso en extremos de edad, masa muscular muy alta o baja, embarazo, y en algunas etnias. La ecuación CKD-EPI 2009 incluye un coeficiente racial; la ecuación CKD-EPI 2021 (sin raza) está siendo adoptada en muchas guías. Los resultados deben interpretarse siempre en contexto clínico y con un profesional de la salud. No sustituye la valoración médica ni el seguimiento por nefrología cuando está indicado.
              </p>
            </section>

            <section className="prose prose-sm max-w-none">
              <h3 className="text-xl font-semibold mb-4">Preguntas frecuentes</h3>
              <h4 className="font-semibold text-base">¿En qué unidades debe estar la creatinina?</h4>
              <p className="text-muted-foreground">Esta calculadora usa creatinina en mg/dL (unidades habituales en España e Hispanoamérica). Si tu analítica está en µmol/L, divide el valor entre 88.4 para obtener mg/dL.</p>
              <h4 className="font-semibold text-base mt-4">¿Por qué aparece el factor raza?</h4>
              <p className="text-muted-foreground">Las ecuaciones CKD-EPI y MDRD 2009 incluyen un coeficiente para personas de origen afroamericano/raza negra porque en los estudios de validación se observaron diferencias en la relación creatinina-GFR. La ecuación CKD-EPI 2021, recomendada por NKF/ASN, ya no incluye raza.</p>
              <h4 className="font-semibold text-base mt-4">¿Para qué sirve el Cockcroft-Gault?</h4>
              <p className="text-muted-foreground">El clearance de creatinina (Cockcroft-Gault) se usa sobre todo para ajustar la dosis de medicamentos que se eliminan por el riñón. No está estandarizado a superficie corporal (1.73 m²) como el eGFR.</p>
            </section>
          </article>

          <RelatedCalculators currentPage="/egfr" />
          <section className="flex justify-center">
            <EmbedWidget />
          </section>
          <SocialShare
            title="Calculadora de Filtrado Glomerular (eGFR) - Función Renal"
            url="https://nutrifit-calculator.com/egfr"
            description="Calcula tu eGFR con CKD-EPI y MDRD. Estadificación de enfermedad renal crónica y Cockcroft-Gault para ajuste de dosis."
          />
          <CalculatorNavigation currentCalculator="egfr" />
        </main>
      </Container>
    </>
  );
}
