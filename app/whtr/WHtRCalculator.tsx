"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, Target, TrendingUp, Heart, Info } from 'lucide-react';
import { calculateWHtRAnalysis } from '@/lib/formulas';
import { NumberInput } from '@/components/NumberInput';

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
      case 'Muy bajo': return 'text-blue-700 bg-blue-50';
      case 'Bajo': return 'text-green-700 bg-green-50';
      case 'Moderado': return 'text-yellow-700 bg-yellow-50';
      case 'Alto': return 'text-orange-700 bg-orange-50';
      case 'Muy alto': return 'text-red-700 bg-red-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <article className="grid gap-[2.618rem] lg:grid-cols-2 lg:items-start">
      {/* Calculadora */}
      <section className="space-golden-sm">
        <Card className="card-golden-lg">
          <CardHeader className="text-center space-golden-xs">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Calculator className="h-6 w-6 text-blue-600" />
              Ratio Cintura-Altura
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Medición a la altura del ombligo en ayunas
            </p>
          </CardHeader>
          
          <CardContent className="space-golden-sm">
            <form onSubmit={handleSubmit} className="space-golden-sm">
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
              />

              <Button type="submit" className="w-full" size="lg">
                <Calculator className="mr-2 h-4 w-4" />
                Calcular WHtR
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>¿Cómo medir correctamente?</strong><br />
            Mide la cintura en el punto más estrecho del torso, generalmente a la altura del ombligo, 
            en ayunas y después de exhalar normalmente.
          </AlertDescription>
        </Alert>
      </section>

      {/* Resultados */}
      {result && (
        <section className="space-golden-sm">
          {/* Resultado principal */}
          <Card className="card-golden-lg">
            <CardContent className="text-center space-golden-sm pt-6">
              <div className="space-golden-xs">
                <div className="text-5xl font-bold text-blue-600 mb-[0.382rem]">
                  {result.whtr}
                </div>
                <div className="text-xl font-bold text-blue-700 mb-[0.382rem]">
                  WHtR (Ratio Cintura-Altura)
                </div>
                <div className="text-lg text-muted-foreground">
                  Evaluación de distribución de grasa abdominal
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getRiskColor(result.riskLevel)}`}>
                <Heart className="h-4 w-4" />
                {result.category} - Riesgo {result.riskLevel}
              </div>
            </CardContent>
          </Card>

          {/* Interpretación detallada */}
          <Card className="card-golden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Interpretación y Estado de Salud
              </CardTitle>
            </CardHeader>
            <CardContent className="space-golden-sm">
              <Alert className={getRiskColor(result.riskLevel)}>
                <AlertDescription className="leading-[1.618]">
                  <strong>{result.healthStatus}</strong><br />
                  {result.comparisonWithIMC}
                </AlertDescription>
              </Alert>

              <div className="space-golden-xs">
                <h4 className="font-semibold text-lg">Recomendaciones específicas:</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="leading-[1.618]">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 leading-[1.618]">
                  <strong>🎯 Rango objetivo:</strong> {result.targetRange}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </article>
  );
}
