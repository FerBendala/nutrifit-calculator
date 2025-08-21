"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ACTIVITY_LEVELS,
  GOALS,
  MACRO_DISTRIBUTIONS,
  UserData,
  calculateBMR,
  calculateMacros,
  calculateTDEE,
  calculateTargetCalories
} from '@/lib/formulas';
import { useEffect, useRef, useState } from 'react';
import { MacroBreakdown } from './MacroBreakdown';
import { NumberInput } from './NumberInput';
import { ResultCard } from './ResultCard';
import { SelectInput } from './SelectInput';

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
  const resultsRef = useRef<HTMLDivElement>(null);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem('calculator-form-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Guardar en localStorage
    localStorage.setItem('calculator-form-data', JSON.stringify(newFormData));
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

      // Scroll suave a los resultados después de un pequeño delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    const defaultData: FormData = {
      sex: 'male',
      age: '',
      height: '',
      weight: '',
      activityLevel: '',
      goal: 'maintain'
    };

    setFormData(defaultData);
    setResults(null);
    localStorage.removeItem('calculator-form-data');
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
                placeholder="30"
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
                placeholder="175"
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
                placeholder="75.0"
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

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={!isFormValid || isCalculating}
                className="flex-1 sm:flex-none"
              >
                {isCalculating ? 'Calculando...' : 'Calcular mis calorías'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isCalculating}
                className="flex-1 sm:flex-none"
              >
                Reiniciar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {results && (
        <div ref={resultsRef} className="space-y-6">
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