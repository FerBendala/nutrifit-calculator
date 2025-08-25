export interface UserData {
  sex: 'male' | 'female';
  age: number;
  height: number; // cm
  weight: number; // kg
}

export interface ActivityLevel {
  value: number;
  label: string;
}

export interface Goal {
  value: 'lose' | 'maintain' | 'gain';
  label: string;
  adjustment: number; // percentage
}

export interface MacroDistribution {
  protein: number; // g/kg
  fat: number; // percentage of calories
}

export const ACTIVITY_LEVELS: ActivityLevel[] = [
  { value: 1.2, label: 'Sedentario (poco o ningún ejercicio)' },
  { value: 1.375, label: 'Ligera (ejercicio ligero 1-3 días/semana)' },
  { value: 1.55, label: 'Moderada (ejercicio moderado 3-5 días/semana)' },
  { value: 1.725, label: 'Intensa (ejercicio fuerte 6-7 días/semana)' },
  { value: 1.9, label: 'Muy intensa (ejercicio muy fuerte, trabajo físico)' }
];

export const GOALS: Goal[] = [
  { value: 'lose', label: 'Perder grasa', adjustment: -0.2 },
  { value: 'maintain', label: 'Mantener peso', adjustment: 0 },
  { value: 'gain', label: 'Ganar músculo', adjustment: 0.1 }
];

export const MACRO_DISTRIBUTIONS: Record<string, MacroDistribution> = {
  lose: { protein: 2.0, fat: 0.25 },
  maintain: { protein: 1.8, fat: 0.30 },
  gain: { protein: 2.2, fat: 0.30 }
};

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor equation
 */
export function calculateBMR(userData: UserData): number {
  const { sex, age, height, weight } = userData;

  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculate Total Daily Energy Expenditure
 */
export function calculateTDEE(bmr: number, activityLevel: number): number {
  return bmr * activityLevel;
}

/**
 * Calculate target calories based on goal
 */
export function calculateTargetCalories(tdee: number, goalAdjustment: number): number {
  return tdee * (1 + goalAdjustment);
}

/**
 * Calculate macro distribution
 */
export function calculateMacros(targetCalories: number, weight: number, distribution: MacroDistribution) {
  const proteinGrams = distribution.protein * weight;
  const proteinCalories = proteinGrams * 4;

  const fatCalories = targetCalories * distribution.fat;
  const fatGrams = fatCalories / 9;

  const carbCalories = targetCalories - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;

  return {
    protein: Math.round(proteinGrams),
    fat: Math.round(fatGrams),
    carbs: Math.round(carbGrams),
    calories: {
      protein: Math.round(proteinCalories),
      fat: Math.round(fatCalories),
      carbs: Math.round(carbCalories)
    }
  };
}

/**
 * Calculate BMI and category
 */
export function calculateBMI(weight: number, height: number): { bmi: number; category: string; } {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category: string;
  if (bmi < 18.5) {
    category = 'Bajo peso';
  } else if (bmi < 25) {
    category = 'Peso normal';
  } else if (bmi < 30) {
    category = 'Sobrepeso';
  } else {
    category = 'Obesidad';
  }

  return { bmi: Math.round(bmi * 10) / 10, category };
}

/**
 * Calculate daily protein needs based on goal
 */
export function calculateProteinNeeds(weight: number, goal: 'sedentary' | 'active' | 'athlete', bodyFatPercentage?: number): { min: number; max: number; } {
  let baseProtein: number;

  switch (goal) {
    case 'sedentary':
      baseProtein = 1.6;
      break;
    case 'active':
      baseProtein = 2.0;
      break;
    case 'athlete':
      baseProtein = 2.4;
      break;
  }

  let adjustedWeight = weight;
  if (bodyFatPercentage && bodyFatPercentage > 0) {
    // Calculate lean body mass
    const leanMass = weight * (1 - bodyFatPercentage / 100);
    adjustedWeight = leanMass;
  }

  return {
    min: Math.round(adjustedWeight * (baseProtein - 0.2)),
    max: Math.round(adjustedWeight * (baseProtein + 0.2))
  };
}

/**
 * Calculate daily water needs
 */
export function calculateWaterNeeds(weight: number, activityLevel: 'low' | 'moderate' | 'high' = 'moderate'): { min: number; max: number; } {
  const baseMin = weight * 30;
  const baseMax = weight * 35;

  let activityMultiplier = 1;
  switch (activityLevel) {
    case 'low':
      activityMultiplier = 1;
      break;
    case 'moderate':
      activityMultiplier = 1.1;
      break;
    case 'high':
      activityMultiplier = 1.3;
      break;
  }

  return {
    min: Math.round(baseMin * activityMultiplier),
    max: Math.round(baseMax * activityMultiplier)
  };
}

/**
 * Calculate body fat percentage using Navy Method
 */
export function calculateBodyFatNavy(
  sex: 'male' | 'female',
  height: number, // cm
  waist: number, // cm
  neck: number, // cm
  hip?: number // cm (required for females)
): { bodyFat: number; category: string; leanMass: number; fatMass: number; } {
  // Convert to inches for formula
  const heightInches = height / 2.54;
  const waistInches = waist / 2.54;
  const neckInches = neck / 2.54;
  const hipInches = hip ? hip / 2.54 : 0;

  let bodyFat: number;

  if (sex === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistInches - neckInches) + 0.15456 * Math.log10(heightInches)) - 450;
  } else {
    if (!hip) throw new Error('Hip measurement required for females');
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistInches + hipInches - neckInches) + 0.22100 * Math.log10(heightInches)) - 450;
  }

  let category: string;
  if (sex === 'male') {
    if (bodyFat < 6) category = 'Esencial';
    else if (bodyFat < 14) category = 'Atlético';
    else if (bodyFat < 18) category = 'Fitness';
    else if (bodyFat < 25) category = 'Aceptable';
    else category = 'Obesidad';
  } else {
    if (bodyFat < 14) category = 'Esencial';
    else if (bodyFat < 21) category = 'Atlético';
    else if (bodyFat < 25) category = 'Fitness';
    else if (bodyFat < 32) category = 'Aceptable';
    else category = 'Obesidad';
  }

  return {
    bodyFat: Math.round(bodyFat * 10) / 10,
    category,
    leanMass: 0, // Will be calculated with weight
    fatMass: 0   // Will be calculated with weight
  };
}

/**
 * Calculate body composition with weight
 */
export function calculateBodyComposition(
  weight: number,
  bodyFatPercentage: number
): { leanMass: number; fatMass: number; } {
  const fatMass = weight * (bodyFatPercentage / 100);
  const leanMass = weight - fatMass;

  return {
    leanMass: Math.round(leanMass * 10) / 10,
    fatMass: Math.round(fatMass * 10) / 10
  };
}

/**
 * Calculate waist-to-hip ratio
 */
export function calculateWaistHipRatio(
  waist: number,
  hip: number,
  sex: 'male' | 'female'
): { ratio: number; category: string; riskLevel: string; } {
  const ratio = waist / hip;

  let category: string;
  let riskLevel: string;

  if (sex === 'male') {
    if (ratio < 0.90) {
      category = 'Bajo';
      riskLevel = 'Bajo riesgo';
    } else if (ratio < 0.95) {
      category = 'Moderado';
      riskLevel = 'Riesgo moderado';
    } else {
      category = 'Alto';
      riskLevel = 'Alto riesgo';
    }
  } else {
    if (ratio < 0.80) {
      category = 'Bajo';
      riskLevel = 'Bajo riesgo';
    } else if (ratio < 0.85) {
      category = 'Moderado';
      riskLevel = 'Riesgo moderado';
    } else {
      category = 'Alto';
      riskLevel = 'Alto riesgo';
    }
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    category,
    riskLevel
  };
}