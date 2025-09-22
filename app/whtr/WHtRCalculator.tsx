"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from '@/components/NumberInput';
import { Button } from '@/components/ui/button';
import { Calculator, Heart } from 'lucide-react';
import { calculateWHtRAnalysis } from '@/lib/formulas';

interface FormData {
  waistCircumference: string;
  height: string;
}

interface WHtRResult {
  whtr: number;
  category: string;
  riskLevel: 'Muy bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy alto';
  healthStatus: string;
  recommendations: string[];
  comparisonWithIMC: string;
  targetRange: string;
}

export function WHtRCalculator() {
  const [formData, setFormData] = useState<FormData>({
    waistCircumference: '',
    height: ''
  });

  const [result, setResult] = useState<WHtRResult | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waist = parseFloat(formData.waistCircumference);
    const height = parseFloat(formData.height);

    if (!waist || !height || waist <= 0 || height <= 0) {
      alert('Por favor ingresa valores válidos para cintura y altura.');
      return;
    }

    try {
      const calculation = calculateWHtRAnalysis(waist, height);
      setResult(calculation);
    } catch (error) {
      alert('Error en el cálculo. Verifica los valores ingresados.');
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Muy bajo': return 'text-blue-700 bg-blue-50 border-blue-400';
      case 'Bajo': return 'text-green-700 bg-green-50 border-green-400';
      case 'Moderado': return 'text-yellow-700 bg-yellow-50 border-yellow-400';
      case 'Alto': return 'text-orange-700 bg-orange-50 border-orange-400';
      case 'Muy alto': return 'text-red-700 bg-red-50 border-red-400';
      default: return 'text-gray-700 bg-gray-50 border-gray-400';
    }
  };

  return (
    <Card className="card-golden-lg shadow-golden-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Calculadora de WHtR (Ratio Cintura-Altura)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Instrucciones */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            💡 <strong>Instrucciones:</strong> Mide la cintura en el punto más estrecho del torso,
            generalmente a la altura del ombligo, en ayunas y después de exhalar normalmente.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-golden-md">
            <div className="grid gap-[1.618rem] md:grid-cols-2 max-w-2xl mx-auto">
              <NumberInput
                id="waistCircumference"
                label="Circunferencia de cintura"
                value={formData.waistCircumference}
                onChange={(value) => handleInputChange('waistCircumference', value)}
                placeholder="85"
                unit="cm"
                min={30}
                max={200}
                step={0.1}
                required
              />

              <NumberInput
                id="height"
                label="Altura"
                value={formData.height}
                onChange={(value) => handleInputChange('height', value)}
                placeholder="170"
                unit="cm"
                min={100}
                max={250}
                step={0.1}
                required
              />
            </div>

            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                disabled={!formData.waistCircumference || !formData.height}
                className="btn-golden-lg font-semibold transition-golden px-8"
              >
                <Calculator className="mr-2 h-4 w-4" />
                🎯 Calcular WHtR
              </Button>
            </div>
          </form>
        </div>

        {/* Resultados */}
        {result && (
          <div className="mt-8 border-t pt-8">
            <section className="max-w-4xl mx-auto">
              {/* Resultado principal */}
              <div className="text-center space-golden-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <article className="text-center p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.whtr}
                    </div>
                    <div className="text-sm font-medium text-blue-800">WHtR</div>
                  </article>

                  <article className={`text-center p-6 rounded-lg border-l-4 ${getRiskColor(result.riskLevel)}`}>
                    <div className="text-3xl font-bold mb-2">
                      <Heart className="h-8 w-8 mx-auto" />
                    </div>
                    <div className="text-sm font-medium">{result.category}</div>
                  </article>

                  <article className={`text-center p-6 rounded-lg border-l-4 ${getRiskColor(result.riskLevel)}`}>
                    <div className="text-3xl font-bold mb-2">
                      {result.riskLevel}
                    </div>
                    <div className="text-sm font-medium">Riesgo</div>
                  </article>
                </div>

                {/* Interpretación detallada */}
                <div className="mt-8 space-golden-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="card-golden bg-white/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Estado de Salud
                        </h3>
                      </header>
                      <div className="p-6">
                        <p className="text-sm text-gray-600 leading-[1.618] mb-4">
                          <strong>{result.healthStatus}</strong>
                        </p>
                        <p className="text-sm text-gray-600 leading-[1.618]">
                          {result.comparisonWithIMC}
                        </p>
                      </div>
                    </article>

                    <article className="card-golden bg-white/50">
                      <header className="p-6 pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Recomendaciones
                        </h3>
                      </header>
                      <div className="p-6">
                        <ul className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-1 flex-shrink-0"></span>
                              <span className="text-sm text-gray-600 leading-[1.618]">{rec}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200 mt-4">
                          <p className="text-green-800 text-sm leading-[1.618]">
                            <strong>🎯 Rango objetivo:</strong> {result.targetRange}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </CardContent>
    </Card>
  );
}