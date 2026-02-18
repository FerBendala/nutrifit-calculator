'use client';

import { NumberInput } from '@/components/NumberInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeBSA } from '@/lib/formulas';
import { Activity, AlertTriangle, Calculator, Heart, Info, Pill, Stethoscope } from 'lucide-react';
import { useState } from 'react';

export function BSACalculator() {
  const [formData, setFormData] = useState({
    weight: '70',
    height: '175'
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeBSA> | null>(null);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height) return;

    try {
      const analysis = analyzeBSA(
        parseFloat(formData.weight),
        parseFloat(formData.height)
      );
      setResult(analysis);
    } catch (error) {
      console.error('Error calculating BSA:', error);
    }
  };

  const isFormValid = formData.weight && formData.height;

  return (
    <>
      <section id="calculator" aria-label="Calculadora de BSA">
        <Card className="card-golden-lg shadow-golden-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center justify-center">
              <span className="text-3xl mr-3">🏥</span>
              Calculadora de Superficie Corporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-golden-md">
              <div className="bg-info-subtle rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> El BSA se calcula automáticamente con 5 fórmulas científicas diferentes.
                    La fórmula Du Bois es considerada el estándar de oro en medicina clínica desde 1916.
                  </p>
                </div>
              </div>

              <div className="grid gap-[1.618rem] md:grid-cols-2">
                <NumberInput
                  id="weight"
                  label="Peso"
                  value={formData.weight}
                  onChange={handleInputChange('weight')}
                  min={20}
                  max={300}
                  step={0.1}
                  unit="kg"
                  placeholder="70.0"
                  required
                />

                <NumberInput
                  id="height"
                  label="Altura"
                  value={formData.height}
                  onChange={handleInputChange('height')}
                  min={100}
                  max={250}
                  step={0.1}
                  unit="cm"
                  placeholder="175.0"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full md:w-auto btn-golden-lg font-semibold transition-golden"
              >
                🏥 Calcular BSA
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {result && (
        <section className="card-golden-lg shadow-golden-lg border-2 border-primary/20 mt-8">
          <header className="p-6 pb-0">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <span className="text-3xl mr-3">📊</span>
              Resultados de Superficie Corporal
            </h2>
          </header>
          <div className="p-6">
            <div className="space-golden-lg">
              <div className="text-center card-golden bg-gradient-to-r bg-info-subtle border-2 border-info rounded-lg p-6">
                <div className="text-5xl font-bold text-info mb-2">
                  {result.average.toFixed(3)} m²
                </div>
                <div className="text-xl font-semibold text-foreground/90 mb-1">
                  Superficie Corporal Promedio
                </div>
                <p className="text-sm text-info">
                  Promedio de 5 fórmulas científicas (Du Bois, Mosteller, Haycock, Gehan, Boyd)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Resultados por Fórmula
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {result.comparison.map((formula, index) => (
                    <Card key={index} className={formula.formula === 'Du Bois' ? 'border-2 border-info bg-info-subtle/50' : ''}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center justify-between">
                          <span>{formula.formula}</span>
                          {formula.formula === 'Du Bois' && (
                            <span className="text-xs bg-info text-info-foreground px-2 py-1 rounded">Estándar</span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {formula.value.toFixed(3)} m²
                        </div>
                        {formula.difference !== 0 && (
                          <div className={`text-xs ${formula.difference > 0 ? 'text-success' : 'text-destructive'}`}>
                            {formula.difference > 0 ? '+' : ''}{formula.difference.toFixed(2)}% vs Du Bois
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-warning-subtle border-l-4 border-warning">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <Pill className="w-5 h-5 mr-2" />
                      Dosificación Quimioterapia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Dosis estándar:</span>
                      <span className="font-bold text-warning">{result.clinicalApplications.chemotherapy.doseArea} mg/m²</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-muted-foreground">Dosis calculada:</span>
                      <span className="font-bold text-lg text-foreground">{result.clinicalApplications.chemotherapy.exampleDose} mg</span>
                    </div>
                    <p className="text-xs text-warning mt-2">
                      Ejemplo: Doxorrubicina estándar 60-75 mg/m²
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-destructive-subtle border-l-4 border-destructive">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <Heart className="w-5 h-5 mr-2" />
                      Parámetros Cardíacos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Gasto cardíaco:</span>
                      <span className="font-bold text-destructive">{result.clinicalApplications.cardiacIndex.cardiacOutput} L/min</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-muted-foreground">Volumen sistólico:</span>
                      <span className="font-bold text-lg text-foreground/90">{result.clinicalApplications.cardiacIndex.strokeVolume} mL</span>
                    </div>
                    <p className="text-xs text-destructive mt-2">
                      Asumiendo índice cardíaco normal (5 L/min/m²)
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-info-subtle border-l-4 border-info400">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-info900">
                      <Activity className="w-5 h-5 mr-2" />
                      Fluidoterapia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Mantenimiento diario:</span>
                      <span className="font-bold text-info700">{result.clinicalApplications.fluidResuscitation.maintenanceFluids} mL/día</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-muted-foreground">Resucitación quemaduras (20%):</span>
                      <span className="font-bold text-lg text-info800">{result.clinicalApplications.fluidResuscitation.burnResuscitation} mL/24h</span>
                    </div>
                    <p className="text-xs text-info600 mt-2">
                      Parkland: 4 mL/kg/% superficie quemada
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-success-subtle border-l-4 border-success">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Soporte Nutricional
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Calorías totales:</span>
                      <span className="font-bold text-success">{result.clinicalApplications.nutritionalSupport.totalCalories} kcal/día</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-muted-foreground">Proteína:</span>
                      <span className="font-bold text-lg text-foreground/90">{result.clinicalApplications.nutritionalSupport.proteinNeeds} g/día</span>
                    </div>
                    <p className="text-xs text-success mt-2">
                      1000-1200 kcal/m² o 25-30 kcal/kg
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Pill className="w-5 h-5 mr-2" />
                    Ejemplos de Dosificación por BSA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.clinicalApplications.drugDosage.examples.map((drug, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-semibold text-sm text-foreground">{drug.drug}</div>
                          <div className="text-xs text-muted-foreground">{drug.dosePerBSA}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-info">{drug.calculatedDose}</div>
                          <div className="text-xs text-muted-foreground">{drug.unit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Alert className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Importante:</strong> Estas dosis son ejemplos educativos. Siempre consulta con el equipo médico
                      y revisa los protocolos hospitalarios antes de administrar cualquier medicamento.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="bg-warning-subtle border-l-4 border-warning">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                    <Info className="w-5 h-5 mr-2" />
                    Recomendaciones Clínicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm text-foreground/90">
                        <span className="text-warning mr-2">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
