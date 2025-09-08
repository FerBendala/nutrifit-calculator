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

/**
 * Calculate maximum heart rate using different formulas
 */
export function calculateMaxHeartRate(
  age: number,
  formula: 'tanaka' | 'haskell' | 'gulati' = 'tanaka',
  sex?: 'male' | 'female'
): { maxHR: number; formula: string; accuracy: string; } {
  let maxHR: number;
  let formulaName: string;
  let accuracy: string;

  switch (formula) {
    case 'tanaka':
      maxHR = 208 - (0.7 * age);
      formulaName = 'Fórmula de Tanaka';
      accuracy = 'Más precisa para población general (±10-12 ppm)';
      break;
    case 'gulati':
      if (sex === 'female') {
        maxHR = 206 - (0.88 * age);
        formulaName = 'Fórmula de Gulati (Mujeres)';
        accuracy = 'Específica para mujeres (±10 ppm)';
      } else {
        // Fallback to Tanaka for males
        maxHR = 208 - (0.7 * age);
        formulaName = 'Fórmula de Tanaka';
        accuracy = 'Más precisa para población general (±10-12 ppm)';
      }
      break;
    case 'haskell':
    default:
      maxHR = 220 - age;
      formulaName = 'Fórmula clásica de Haskell-Fox';
      accuracy = 'Menos precisa pero ampliamente conocida (±15 ppm)';
      break;
  }

  return {
    maxHR: Math.round(maxHR),
    formula: formulaName,
    accuracy
  };
}

/**
 * Calculate heart rate training zones
 */
export function calculateHeartRateZones(maxHR: number): {
  zone1: { min: number; max: number; name: string; description: string; color: string; };
  zone2: { min: number; max: number; name: string; description: string; color: string; };
  zone3: { min: number; max: number; name: string; description: string; color: string; };
  zone4: { min: number; max: number; name: string; description: string; color: string; };
  zone5: { min: number; max: number; name: string; description: string; color: string; };
} {
  return {
    zone1: {
      min: Math.round(maxHR * 0.50),
      max: Math.round(maxHR * 0.60),
      name: 'Zona 1 - Recuperación',
      description: 'Recuperación activa y calentamiento',
      color: 'text-gray-600'
    },
    zone2: {
      min: Math.round(maxHR * 0.60),
      max: Math.round(maxHR * 0.70),
      name: 'Zona 2 - Base Aeróbica',
      description: 'Quema de grasa y resistencia básica',
      color: 'text-blue-600'
    },
    zone3: {
      min: Math.round(maxHR * 0.70),
      max: Math.round(maxHR * 0.80),
      name: 'Zona 3 - Aeróbica',
      description: 'Mejora cardiovascular y resistencia',
      color: 'text-green-600'
    },
    zone4: {
      min: Math.round(maxHR * 0.80),
      max: Math.round(maxHR * 0.90),
      name: 'Zona 4 - Umbral Anaeróbico',
      description: 'Mejora del rendimiento y velocidad',
      color: 'text-yellow-600'
    },
    zone5: {
      min: Math.round(maxHR * 0.90),
      max: Math.round(maxHR * 1.00),
      name: 'Zona 5 - Potencia',
      description: 'Máxima intensidad y potencia',
      color: 'text-red-600'
    }
  };
}

/**
 * Calculate target heart rate for fat burning
 */
export function calculateFatBurningZone(maxHR: number): {
  min: number;
  max: number;
  optimal: number;
  percentage: string;
} {
  const min = Math.round(maxHR * 0.60);
  const max = Math.round(maxHR * 0.70);
  const optimal = Math.round(maxHR * 0.65);

  return {
    min,
    max,
    optimal,
    percentage: '60-70%'
  };
}

/**
 * Calculate body fat percentage using skinfold measurements (Jackson-Pollock 3-site)
 */
export function calculateBodyFatSkinfolds(
  sex: 'male' | 'female',
  age: number,
  triceps: number, // mm
  suprailiac: number, // mm
  thigh: number, // mm (for females) or chest (for males)
  subscapular?: number // mm (optional 4th measurement)
): { bodyFat: number; category: string; leanMass: number; fatMass: number; method: string; } {
  // Calculate sum of skinfolds
  let sumSf: number;
  let method: string;

  if (sex === 'male') {
    sumSf = triceps + suprailiac + thigh; // chest instead of thigh for males
    method = 'Jackson-Pollock 3 sitios (hombres)';
  } else {
    sumSf = triceps + suprailiac + thigh;
    method = 'Jackson-Pollock 3 sitios (mujeres)';
  }

  // Calculate body density using Jackson-Pollock equations
  let bodyDensity: number;

  if (sex === 'male') {
    bodyDensity = 1.10938 - (0.0008267 * sumSf) + (0.0000016 * sumSf * sumSf) - (0.0002574 * age);
  } else {
    bodyDensity = 1.0994921 - (0.0009929 * sumSf) + (0.0000023 * sumSf * sumSf) - (0.0001392 * age);
  }

  // Convert body density to body fat percentage using Siri equation
  const bodyFat = ((495 / bodyDensity) - 450);

  // Determine category
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
    fatMass: 0,  // Will be calculated with weight
    method
  };
}

/**
 * Calculate body fat using 4-site skinfold method (Durnin-Womersley)
 */
export function calculateBodyFat4Site(
  sex: 'male' | 'female',
  age: number,
  triceps: number,
  biceps: number,
  subscapular: number,
  suprailiac: number
): { bodyFat: number; category: string; leanMass: number; fatMass: number; method: string; } {
  const sumSf = triceps + biceps + subscapular + suprailiac;

  let bodyDensity: number;

  if (sex === 'male') {
    if (age >= 17 && age <= 19) {
      bodyDensity = 1.1620 - (0.0630 * Math.log10(sumSf));
    } else if (age >= 20 && age <= 29) {
      bodyDensity = 1.1631 - (0.0632 * Math.log10(sumSf));
    } else if (age >= 30 && age <= 39) {
      bodyDensity = 1.1422 - (0.0544 * Math.log10(sumSf));
    } else if (age >= 40 && age <= 49) {
      bodyDensity = 1.1620 - (0.0700 * Math.log10(sumSf));
    } else {
      bodyDensity = 1.1715 - (0.0779 * Math.log10(sumSf));
    }
  } else {
    if (age >= 16 && age <= 19) {
      bodyDensity = 1.1549 - (0.0678 * Math.log10(sumSf));
    } else if (age >= 20 && age <= 29) {
      bodyDensity = 1.1599 - (0.0717 * Math.log10(sumSf));
    } else if (age >= 30 && age <= 39) {
      bodyDensity = 1.1423 - (0.0632 * Math.log10(sumSf));
    } else if (age >= 40 && age <= 49) {
      bodyDensity = 1.1333 - (0.0612 * Math.log10(sumSf));
    } else {
      bodyDensity = 1.1339 - (0.0645 * Math.log10(sumSf));
    }
  }

  // Convert to body fat percentage using Siri equation
  const bodyFat = ((495 / bodyDensity) - 450);

  // Determine category
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
    leanMass: 0,
    fatMass: 0,
    method: 'Durnin-Womersley 4 sitios'
  };
}

/**
 * Calculate body fat using 7-site skinfold method (Jackson-Pollock)
 */
export function calculateBodyFat7Site(
  sex: 'male' | 'female',
  age: number,
  chest: number,
  midaxillary: number,
  triceps: number,
  subscapular: number,
  abdomen: number,
  suprailiac: number,
  thigh: number
): { bodyFat: number; category: string; leanMass: number; fatMass: number; method: string; } {
  const sumSf = chest + midaxillary + triceps + subscapular + abdomen + suprailiac + thigh;

  let bodyDensity: number;

  if (sex === 'male') {
    bodyDensity = 1.112 - (0.00043499 * sumSf) + (0.00000055 * sumSf * sumSf) - (0.00028826 * age);
  } else {
    bodyDensity = 1.097 - (0.00046971 * sumSf) + (0.00000056 * sumSf * sumSf) - (0.00012828 * age);
  }

  // Convert to body fat percentage using Siri equation
  const bodyFat = ((495 / bodyDensity) - 450);

  // Determine category
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
    leanMass: 0,
    fatMass: 0,
    method: 'Jackson-Pollock 7 sitios'
  };
}