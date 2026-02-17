"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCalories, formatGrams, formatResultsForCopy } from '@/lib/format';
import { CopyButton } from './CopyButton';

interface MacroResult {
  protein: number;
  fat: number;
  carbs: number;
}

interface ResultCardProps {
  tdee: number;
  targetCalories: number;
  macros: MacroResult;
  goal: string;
}

export function ResultCard({ tdee, targetCalories, macros, goal }: ResultCardProps) {
  const copyText = formatResultsForCopy({
    tdee,
    targetCalories,
    macros
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          Tus Resultados
          <CopyButton text={copyText} />
        </CardTitle>
        <CardDescription>
          Basado en tu objetivo: {goal}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">TDEE (mantenimiento):</span>
              <span className="font-bold text-primary">{formatCalories(tdee)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
              <span className="font-medium">Calorías objetivo:</span>
              <span className="font-bold text-primary">{formatCalories(targetCalories)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Macronutrientes diarios
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-info-subtle rounded">
                <span>💪 Proteínas:</span>
                <span className="font-semibold">{formatGrams(macros.protein)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-warning-subtle rounded">
                <span>🥑 Grasas:</span>
                <span className="font-semibold">{formatGrams(macros.fat)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-success-subtle rounded">
                <span>🌾 Carbohidratos:</span>
                <span className="font-semibold">{formatGrams(macros.carbs)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Nota importante:</strong> Estos cálculos son orientativos y no sustituyen
            el consejo de un profesional de la nutrición o médico.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}