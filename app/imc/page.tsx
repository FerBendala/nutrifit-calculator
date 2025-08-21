"use client";

import { useState } from 'react';
import { generateMetadata as generateMeta, generateJsonLd } from '@/lib/seo';
import { Container } from '@/components/Container';
import { NumberInput } from '@/components/NumberInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';
import { calculateBMI } from '@/lib/formulas';

export default function IMCPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string; } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!height || !weight) return;
    
    const bmiResult = calculateBMI(parseFloat(weight), parseInt(height));
    setResult(bmiResult);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Bajo peso': return 'text-blue-600';
      case 'Peso normal': return 'text-green-600';
      case 'Sobrepeso': return 'text-yellow-600';
      case 'Obesidad': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const isFormValid = height && weight;
  const jsonLd = generateJsonLd('imc');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Container className="py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Calculadora de IMC
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calcula tu Índice de Masa Corporal (IMC) y conoce tu categoría de peso 
              según los estándares de la Organización Mundial de la Salud.
            </p>
          </div>

          <AdSlot 
            adSlot="3456789012"
            style={{ display: 'block', height: '90px' }}
            className="w-full"
          />

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de IMC</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <NumberInput
                    id="height"
                    label="Altura"
                    value={height}
                    onChange={setHeight}
                    min={130}
                    max={250}
                    unit="cm"
                    placeholder="170"
                    required
                  />
                  
                  <NumberInput
                    id="weight"
                    label="Peso"
                    value={weight}
                    onChange={setWeight}
                    min={30}
                    max={300}
                    step={0.1}
                    unit="kg"
                    placeholder="70.0"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={!isFormValid}
                  className="w-full md:w-auto"
                >
                  Calcular IMC
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Tu Resultado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">
                      {result.bmi}
                    </div>
                    <div className={`text-xl font-semibold ${getCategoryColor(result.category)}`}>
                      {result.category}
                    </div>
                  </div>
                  
                  <div className="grid gap-4 mt-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Rangos de IMC (OMS):</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Bajo peso:</span>
                          <span className="text-blue-600">&lt; 18.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peso normal:</span>
                          <span className="text-green-600">18.5 - 24.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sobrepeso:</span>
                          <span className="text-yellow-600">25.0 - 29.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Obesidad:</span>
                          <span className="text-red-600">≥ 30.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <AdSlot 
            adSlot="4567890123"
            style={{ display: 'block', height: '250px' }}
            className="w-full"
          />

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-4">
              ¿Qué es el Índice de Masa Corporal (IMC)?
            </h2>
            
            <p className="text-muted-foreground mb-4">
              El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso con tu altura 
              para determinar si tu peso está dentro de un rango saludable. Se calcula dividiendo 
              tu peso en kilogramos entre tu altura en metros al cuadrado.
            </p>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">
                ⚠️ Limitaciones importantes del IMC
              </h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• No distingue entre masa muscular y grasa</li>
                <li>• Puede ser menos preciso en atletas o personas muy musculosas</li>
                <li>• No considera la distribución de grasa corporal</li>
                <li>• Los rangos pueden variar según la edad y etnia</li>
                <li>• Es solo una herramienta de screening, no un diagnóstico</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}