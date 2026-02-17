"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatGrams, formatPercentage } from '@/lib/format';

interface MacroBreakdownProps {
  macros: {
    protein: number;
    fat: number;
    carbs: number;
    calories: {
      protein: number;
      fat: number;
      carbs: number;
    };
  };
  targetCalories: number;
}

export function MacroBreakdown({ macros, targetCalories }: MacroBreakdownProps) {
  const proteinPercentage = (macros.calories.protein / targetCalories) * 100;
  const fatPercentage = (macros.calories.fat / targetCalories) * 100;
  const carbPercentage = (macros.calories.carbs / targetCalories) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Desglose de Macronutrientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Visual bars */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Proteínas</span>
                <span>{formatGrams(macros.protein)} ({formatPercentage(proteinPercentage)})</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-macro-protein h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${proteinPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Grasas</span>
                <span>{formatGrams(macros.fat)} ({formatPercentage(fatPercentage)})</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-macro-fat h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${fatPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Carbohidratos</span>
                <span>{formatGrams(macros.carbs)} ({formatPercentage(carbPercentage)})</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-macro-carbs h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${carbPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-macro-protein">{macros.protein}</div>
                <div className="text-xs text-muted-foreground">g proteína</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-macro-fat">{macros.fat}</div>
                <div className="text-xs text-muted-foreground">g grasa</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-macro-carbs">{macros.carbs}</div>
                <div className="text-xs text-muted-foreground">g carbohidratos</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}