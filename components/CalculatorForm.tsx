"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumberInput } from './NumberInput';
import { SelectInput } from './SelectInput';
import { ResultCard } from './ResultCard';
import { MacroBreakdown } from './MacroBreakdown';
import { 
  ACTIVITY_LEVELS, 
  GOALS, 
  MACRO_DISTRIBUTIONS,
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
  calculateMacros,
  UserData
} from '@/lib/formulas';

interface FormData {
  sex: 'male' | 'female';
  age: string;
  height: string;
  weight: string;
  activityLevel: string;
  goal: 'lose' | 'maintain' | 'gain';
}

export function CalculatorForm() {
  const [formData, setFormData] = useState<FormData>({
    sex: 'male',
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: 'maintain'
  });

  const [results, setResults] = useState<{
    tdee: number;
    targetCalories: number;
    macros: ReturnType<typeof calculateMacros>;
    goal: string;
  } | null>(null);

  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { age, height, weight, activityLevel } = formData;
    
    if (!age || !height || !weight || !activityLevel) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const userData: UserData = {
        sex: formData.sex,
        age: parseInt(age),
        height: parseInt(height),
        weight: parseFloat(weight)
      };
      
      const bmr = calculateBMR(userData);
      const tdee = calculateTDEE(bmr, parseFloat(activityLevel));
      const goalData = GOALS.find(g => g.value === formData.goal)!;
      const targetCalories = calculateTargetCalories(tdee, goalData.adjustment);
      const macroDistribution = MACRO_DISTRIBUTIONS[formData.goal];
      const macros = calculateMacros(targetCalories, userData.weight, macroDistribution);
      
      setResults({
        tdee: Math.round(tdee),
        targetCalories: Math.round(targetCalories),
        macros,
        goal: goalData.label
      });
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const isFormValid = formData.age && formData.height && formData.weight && formData.activityLevel;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Calorías y Macronutrientes</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <SelectInput
                id="sex"
                label="Sexo biológico"
                value={formData.sex}
                onChange={handleInputChange('sex')}
                options={[
                  { value: 'male', label: 'Hombre' },
                  { value: 'female', label: 'Mujer' }
                ]}
                required
              />
              
              <NumberInput
                id="age"
                label="Edad"
                value={formData.age}
                onChange={handleInputChange('age')}
                min={15}
                max={100}
                unit="años"
                placeholder="25"
                required
              />
              
              <NumberInput
                id="height"
                label="Altura"
                value={formData.height}
                onChange={handleInputChange('height')}
                min={130}
                max={250}
                unit="cm"
                placeholder="170"
                required
              />
              
              <NumberInput
                id="weight"
                label="Peso"
                value={formData.weight}
                onChange={handleInputChange('weight')}
                min={30}
                max={300}
                step={0.1}
                unit="kg"
                placeholder="70.0"
                required
              />
            </div>
            
            <div className="space-y-4">
              <SelectInput
                id="activityLevel"
                label="Nivel de actividad física"
                value={formData.activityLevel}
                onChange={handleInputChange('activityLevel')}
                options={ACTIVITY_LEVELS.map(level => ({
                  value: level.value,
                  label: level.label
                }))}
                placeholder="Selecciona tu nivel de actividad"
                required
              />
              
              <SelectInput
                id="goal"
                label="Objetivo"
                value={formData.goal}
                onChange={handleInputChange('goal')}
                options={GOALS.map(goal => ({
                  value: goal.value,
                  label: goal.label
                }))}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={!isFormValid || isCalculating}
              className="w-full md:w-auto"
            >
              {isCalculating ? 'Calculando...' : 'Calcular mis calorías'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {results && (
        <div className="space-y-6">
          <ResultCard
            tdee={results.tdee}
            targetCalories={results.targetCalories}
            macros={results.macros}
            goal={results.goal}
          />
          
          <MacroBreakdown
            macros={results.macros}
            targetCalories={results.targetCalories}
          />
        </div>
      )}
    </div>
  );
}