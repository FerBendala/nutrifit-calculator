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
 * Calculate BMR using Harris-Benedict equation (revised 1984)
 */
export function calculateBMRHarrisBenedict(userData: UserData): number {
  const { sex, age, height, weight } = userData;

  if (sex === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

/**
 * Calculate BMR using Katch-McArdle equation (based on lean body mass)
 */
export function calculateBMRKatchMcArdle(weight: number, bodyFatPercentage: number): number {
  const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
  return 370 + (21.6 * leanBodyMass);
}

/**
 * Calculate 1RM using Brzycki formula
 */
export function calculate1RMBrzycki(weight: number, reps: number): number {
  return weight * (36 / (37 - reps));
}

/**
 * Calculate 1RM using Epley formula
 */
export function calculate1RMEpley(weight: number, reps: number): number {
  return weight * (1 + reps / 30);
}

/**
 * Calculate 1RM using Lander formula
 */
export function calculate1RMLander(weight: number, reps: number): number {
  return (100 * weight) / (101.3 - 2.67123 * reps);
}

/**
 * Calculate 1RM using O'Conner formula
 */
export function calculate1RMOConner(weight: number, reps: number): number {
  return weight * (1 + 0.025 * reps);
}

/**
 * Calculate 1RM using Lombardi formula
 */
export function calculate1RMLombardi(weight: number, reps: number): number {
  return weight * Math.pow(reps, 0.10);
}

/**
 * Calculate comprehensive 1RM analysis with all formulas
 */
export function calculate1RMAnalysis(weight: number, reps: number): {
  brzycki: number;
  epley: number;
  lander: number;
  oconner: number;
  lombardi: number;
  average: number;
  recommended: string;
} {
  const brzycki = calculate1RMBrzycki(weight, reps);
  const epley = calculate1RMEpley(weight, reps);
  const lander = calculate1RMLander(weight, reps);
  const oconner = calculate1RMOConner(weight, reps);
  const lombardi = calculate1RMLombardi(weight, reps);

  const average = (brzycki + epley + lander + oconner + lombardi) / 5;

  return {
    brzycki: Math.round(brzycki * 10) / 10,
    epley: Math.round(epley * 10) / 10,
    lander: Math.round(lander * 10) / 10,
    oconner: Math.round(oconner * 10) / 10,
    lombardi: Math.round(lombardi * 10) / 10,
    average: Math.round(average * 10) / 10,
    recommended: 'Brzycki'
  };
}

// Función para calcular WHtR (Waist-to-Height Ratio)
export function calculateWHtR(waistCircumference: number, height: number): number {
  if (waistCircumference <= 0 || height <= 0) {
    throw new Error('La circunferencia de cintura y altura deben ser mayores que 0');
  }

  return Math.round((waistCircumference / height) * 1000) / 1000; // 3 decimales
}

// Análisis completo de WHtR con interpretación y riesgos
export function calculateWHtRAnalysis(waistCircumference: number, height: number): {
  whtr: number;
  category: string;
  riskLevel: 'Muy bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy alto';
  healthStatus: string;
  recommendations: string[];
  comparisonWithIMC: string;
  targetRange: string;
} {
  const whtr = calculateWHtR(waistCircumference, height);

  let category: string;
  let riskLevel: 'Muy bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy alto';
  let healthStatus: string;
  let recommendations: string[];
  let comparisonWithIMC: string;

  if (whtr < 0.40) {
    category = 'Peso muy bajo';
    riskLevel = 'Muy bajo';
    healthStatus = 'Posible desnutrición o peso extremadamente bajo';
    recommendations = [
      'Consultar con un profesional de la salud',
      'Evaluar estado nutricional completo',
      'Considerar aumento de peso saludable',
      'Revisar posibles trastornos alimentarios'
    ];
    comparisonWithIMC = 'WHtR sugiere peso muy bajo, corroborar con IMC y composición corporal';
  } else if (whtr >= 0.40 && whtr < 0.50) {
    category = 'Saludable';
    riskLevel = 'Bajo';
    healthStatus = 'Distribución de grasa corporal óptima';
    recommendations = [
      'Mantener hábitos saludables actuales',
      'Ejercicio regular y dieta equilibrada',
      'Monitoreo periódico cada 6-12 meses',
      'Enfocarse en masa muscular y fuerza'
    ];
    comparisonWithIMC = 'WHtR indica distribución saludable, independientemente del IMC';
  } else if (whtr >= 0.50 && whtr < 0.60) {
    category = 'Riesgo aumentado';
    riskLevel = 'Moderado';
    healthStatus = 'Acumulación de grasa abdominal moderada';
    recommendations = [
      'Reducir grasa abdominal con déficit calórico moderado',
      'Ejercicio cardiovascular y entrenamiento de fuerza',
      'Reducir azúcares simples y procesados',
      'Monitoreo cada 3-4 meses'
    ];
    comparisonWithIMC = 'WHtR detecta riesgo que el IMC puede no capturar completamente';
  } else if (whtr >= 0.60 && whtr < 0.70) {
    category = 'Riesgo alto';
    riskLevel = 'Alto';
    healthStatus = 'Obesidad abdominal significativa';
    recommendations = [
      'Consultar profesional de la salud urgente',
      'Plan estructurado de pérdida de peso',
      'Evaluación de síndrome metabólico',
      'Monitoreo mensual de progreso'
    ];
    comparisonWithIMC = 'WHtR indica riesgo alto independiente del IMC total';
  } else {
    category = 'Riesgo muy alto';
    riskLevel = 'Muy alto';
    healthStatus = 'Obesidad abdominal severa con alto riesgo cardiometabólico';
    recommendations = [
      'Atención médica inmediata especializada',
      'Evaluación completa cardiometabólica',
      'Plan médico supervisado de pérdida de peso',
      'Monitoreo semanal inicial'
    ];
    comparisonWithIMC = 'WHtR crítico - requiere intervención inmediata';
  }

  return {
    whtr,
    category,
    riskLevel,
    healthStatus,
    recommendations,
    comparisonWithIMC,
    targetRange: '0.40-0.50 (óptimo para salud cardiometabólica)'
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

// ===== PESO IDEAL =====

export interface IdealWeightResult {
  robinson: number;
  miller: number;
  devine: number;
  hamwi: number;
  peterson: number;
  average: number;
  range: {
    min: number;
    max: number;
  };
  bmiRange: {
    min: number;
    max: number;
  };
  currentBmi: number;
  status: 'underweight' | 'normal' | 'overweight' | 'obese';
  recommendation: string;
}

/**
 * Calculate ideal weight using Robinson formula (1983)
 */
export function calculateIdealWeightRobinson(height: number, sex: 'male' | 'female'): number {
  const heightInches = height / 2.54;

  if (sex === 'male') {
    return 52 + (1.9 * (heightInches - 60));
  } else {
    return 49 + (1.7 * (heightInches - 60));
  }
}

/**
 * Calculate ideal weight using Miller formula (1983)
 */
export function calculateIdealWeightMiller(height: number, sex: 'male' | 'female'): number {
  const heightInches = height / 2.54;

  if (sex === 'male') {
    return 56.2 + (1.41 * (heightInches - 60));
  } else {
    return 53.1 + (1.36 * (heightInches - 60));
  }
}

/**
 * Calculate ideal weight using Devine formula (1974)
 */
export function calculateIdealWeightDevine(height: number, sex: 'male' | 'female'): number {
  const heightInches = height / 2.54;

  if (sex === 'male') {
    return 50 + (2.3 * (heightInches - 60));
  } else {
    return 45.5 + (2.3 * (heightInches - 60));
  }
}

/**
 * Calculate ideal weight using Hamwi formula (1964)
 */
export function calculateIdealWeightHamwi(height: number, sex: 'male' | 'female'): number {
  const heightInches = height / 2.54;

  if (sex === 'male') {
    return 106 + (6 * (heightInches - 60));
  } else {
    return 100 + (5 * (heightInches - 60));
  }
}

/**
 * Calculate ideal weight using Peterson formula (2016)
 */
export function calculateIdealWeightPeterson(height: number, sex: 'male' | 'female'): number {
  const heightMeters = height / 100;

  if (sex === 'male') {
    return 2.447 * heightMeters - 0.09145 * Math.pow(heightMeters, 2);
  } else {
    return 2.447 * heightMeters - 0.09145 * Math.pow(heightMeters, 2) - 2.2;
  }
}

/**
 * Calculate comprehensive ideal weight analysis
 */
export function calculateIdealWeight(height: number, weight: number, sex: 'male' | 'female'): IdealWeightResult {
  const robinson = calculateIdealWeightRobinson(height, sex);
  const miller = calculateIdealWeightMiller(height, sex);
  const devine = calculateIdealWeightDevine(height, sex);
  const hamwi = calculateIdealWeightHamwi(height, sex);
  const peterson = calculateIdealWeightPeterson(height, sex);

  const average = (robinson + miller + devine + hamwi + peterson) / 5;

  // BMI range for normal weight (18.5-24.9)
  const heightMeters = height / 100;
  const bmiRange = {
    min: 18.5 * Math.pow(heightMeters, 2),
    max: 24.9 * Math.pow(heightMeters, 2)
  };

  // Ideal weight range (±10% from average)
  const range = {
    min: average * 0.9,
    max: average * 1.1
  };

  // Current BMI
  const currentBmi = weight / Math.pow(heightMeters, 2);

  // Status based on BMI
  let status: 'underweight' | 'normal' | 'overweight' | 'obese';
  let recommendation: string;

  if (currentBmi < 18.5) {
    status = 'underweight';
    recommendation = 'Tu peso está por debajo del rango saludable. Consulta con un profesional de la salud para evaluar tu situación nutricional.';
  } else if (currentBmi >= 18.5 && currentBmi < 25) {
    status = 'normal';
    recommendation = 'Tu peso está dentro del rango saludable. Mantén una dieta equilibrada y ejercicio regular.';
  } else if (currentBmi >= 25 && currentBmi < 30) {
    status = 'overweight';
    recommendation = 'Tu peso está ligeramente por encima del rango ideal. Considera ajustar tu dieta y aumentar la actividad física.';
  } else {
    status = 'obese';
    recommendation = 'Tu peso está significativamente por encima del rango saludable. Te recomendamos consultar con un profesional de la salud para un plan personalizado.';
  }

  return {
    robinson: Math.round(robinson * 10) / 10,
    miller: Math.round(miller * 10) / 10,
    devine: Math.round(devine * 10) / 10,
    hamwi: Math.round(hamwi * 10) / 10,
    peterson: Math.round(peterson * 10) / 10,
    average: Math.round(average * 10) / 10,
    range: {
      min: Math.round(range.min * 10) / 10,
      max: Math.round(range.max * 10) / 10
    },
    bmiRange: {
      min: Math.round(bmiRange.min * 10) / 10,
      max: Math.round(bmiRange.max * 10) / 10
    },
    currentBmi: Math.round(currentBmi * 10) / 10,
    status,
    recommendation
  };
}

// ===== MASA MUSCULAR =====

export interface MuscleMassResult {
  leanBodyMass: number;
  muscleMass: number;
  muscleMassIndex: number;
  muscleMassCategory: string;
  muscleMassPercentage: number;
  fatFreeMass: number;
  skeletalMuscleMass: number;
  methods: {
    leanBodyMass: number;
    fatFreeMass: number;
    skeletalMuscleMass: number;
  };
  recommendations: {
    current: string;
    ideal: string;
    training: string;
  };
}

/**
 * Calculate lean body mass using different methods
 */
export function calculateLeanBodyMass(
  weight: number,
  bodyFatPercentage: number,
  method: 'standard' | 'boer' | 'james' = 'standard'
): number {
  const fatMass = weight * (bodyFatPercentage / 100);
  const leanBodyMass = weight - fatMass;

  if (method === 'standard') {
    return leanBodyMass;
  }

  // Boer method (1984) - more accurate for athletes
  if (method === 'boer') {
    return leanBodyMass * 1.02; // Slight adjustment for athletes
  }

  // James method (1976) - age-adjusted
  if (method === 'james') {
    return leanBodyMass * 0.98; // Slight adjustment for general population
  }

  return leanBodyMass;
}

/**
 * Calculate skeletal muscle mass using Lee formula (2000)
 */
export function calculateSkeletalMuscleMass(
  sex: 'male' | 'female',
  height: number, // cm
  weight: number, // kg
  age: number
): number {
  const heightMeters = height / 100;

  if (sex === 'male') {
    return (0.407 * weight) + (0.267 * height) - 19.2;
  } else {
    return (0.252 * weight) + (0.473 * height) - 48.3;
  }
}

/**
 * Calculate muscle mass index (muscle mass / height²)
 */
export function calculateMuscleMassIndex(
  muscleMass: number,
  height: number
): number {
  const heightMeters = height / 100;
  return muscleMass / (heightMeters * heightMeters);
}

/**
 * Calculate muscle mass percentage
 */
export function calculateMuscleMassPercentage(
  muscleMass: number,
  totalWeight: number
): number {
  return (muscleMass / totalWeight) * 100;
}

/**
 * Determine muscle mass category
 */
export function getMuscleMassCategory(
  muscleMassIndex: number,
  sex: 'male' | 'female',
  age: number
): string {
  let category: string;

  if (sex === 'male') {
    if (age < 30) {
      if (muscleMassIndex < 7.0) category = 'Bajo';
      else if (muscleMassIndex < 8.5) category = 'Promedio';
      else if (muscleMassIndex < 10.0) category = 'Bueno';
      else category = 'Excelente';
    } else if (age < 50) {
      if (muscleMassIndex < 6.5) category = 'Promedio';
      else if (muscleMassIndex < 8.0) category = 'Promedio';
      else if (muscleMassIndex < 9.5) category = 'Bueno';
      else category = 'Excelente';
    } else {
      if (muscleMassIndex < 6.0) category = 'Bajo';
      else if (muscleMassIndex < 7.5) category = 'Promedio';
      else if (muscleMassIndex < 9.0) category = 'Bueno';
      else category = 'Excelente';
    }
  } else {
    if (age < 30) {
      if (muscleMassIndex < 5.5) category = 'Bajo';
      else if (muscleMassIndex < 6.8) category = 'Promedio';
      else if (muscleMassIndex < 8.0) category = 'Bueno';
      else category = 'Excelente';
    } else if (age < 50) {
      if (muscleMassIndex < 5.0) category = 'Bajo';
      else if (muscleMassIndex < 6.3) category = 'Promedio';
      else if (muscleMassIndex < 7.5) category = 'Bueno';
      else category = 'Excelente';
    } else {
      if (muscleMassIndex < 4.5) category = 'Bajo';
      else if (muscleMassIndex < 5.8) category = 'Promedio';
      else if (muscleMassIndex < 7.0) category = 'Bueno';
      else category = 'Excelente';
    }
  }

  return category;
}

/**
 * Calculate comprehensive muscle mass analysis
 */
export function calculateMuscleMass(
  sex: 'male' | 'female',
  age: number,
  height: number,
  weight: number,
  bodyFatPercentage: number
): MuscleMassResult {
  // Calculate lean body mass using different methods
  const leanBodyMassStandard = calculateLeanBodyMass(weight, bodyFatPercentage, 'standard');
  const leanBodyMassBoer = calculateLeanBodyMass(weight, bodyFatPercentage, 'boer');
  const leanBodyMassJames = calculateLeanBodyMass(weight, bodyFatPercentage, 'james');

  // Calculate skeletal muscle mass
  const skeletalMuscleMass = calculateSkeletalMuscleMass(sex, height, weight, age);

  // Calculate muscle mass index
  const muscleMassIndex = calculateMuscleMassIndex(skeletalMuscleMass, height);

  // Calculate muscle mass percentage
  const muscleMassPercentage = calculateMuscleMassPercentage(skeletalMuscleMass, weight);

  // Determine category
  const muscleMassCategory = getMuscleMassCategory(muscleMassIndex, sex, age);

  // Generate recommendations
  let currentRecommendation: string;
  let idealRecommendation: string;
  let trainingRecommendation: string;

  if (muscleMassCategory === 'Bajo') {
    currentRecommendation = 'Tu masa muscular está por debajo del promedio. Es importante trabajar en el desarrollo muscular.';
    idealRecommendation = 'El objetivo sería aumentar la masa muscular en 2-4 kg mediante entrenamiento de fuerza.';
    trainingRecommendation = 'Enfócate en ejercicios compuestos (sentadillas, peso muerto, press de banca) 3-4 veces por semana.';
  } else if (muscleMassCategory === 'Promedio') {
    currentRecommendation = 'Tu masa muscular está en el rango promedio. Puedes seguir mejorando.';
    idealRecommendation = 'Mantén tu masa muscular actual y considera ganar 1-2 kg adicionales.';
    trainingRecommendation = 'Continúa con entrenamiento de fuerza regular y considera aumentar la intensidad.';
  } else if (muscleMassCategory === 'Bueno') {
    currentRecommendation = 'Tu masa muscular está por encima del promedio. ¡Excelente trabajo!';
    idealRecommendation = 'Mantén tu masa muscular actual y enfócate en la calidad del músculo.';
    trainingRecommendation = 'Enfócate en el mantenimiento y la calidad del entrenamiento.';
  } else {
    currentRecommendation = 'Tu masa muscular es excelente. ¡Felicitaciones!';
    idealRecommendation = 'Mantén tu masa muscular actual y enfócate en el rendimiento.';
    trainingRecommendation = 'Continúa con tu rutina actual y considera entrenamiento específico para tu deporte.';
  }

  return {
    leanBodyMass: Math.round(leanBodyMassStandard * 10) / 10,
    muscleMass: Math.round(skeletalMuscleMass * 10) / 10,
    muscleMassIndex: Math.round(muscleMassIndex * 100) / 100,
    muscleMassCategory,
    muscleMassPercentage: Math.round(muscleMassPercentage * 10) / 10,
    fatFreeMass: Math.round(leanBodyMassStandard * 10) / 10,
    skeletalMuscleMass: Math.round(skeletalMuscleMass * 10) / 10,
    methods: {
      leanBodyMass: Math.round(leanBodyMassStandard * 10) / 10,
      fatFreeMass: Math.round(leanBodyMassStandard * 10) / 10,
      skeletalMuscleMass: Math.round(skeletalMuscleMass * 10) / 10
    },
    recommendations: {
      current: currentRecommendation,
      ideal: idealRecommendation,
      training: trainingRecommendation
    }
  };
}

// ========== VO2 MAX CALCULATIONS ==========

/**
 * Calculate VO2 Max using Cooper test (12-minute run/walk)
 * Formula: VO2 max = (distance in meters - 504.9) / 44.73
 * Source: Cooper, K. H. (1968). A means of assessing maximal oxygen intake.
 */
export function calculateVO2MaxCooper(distance: number, weight: number): number {
  if (distance <= 0 || weight <= 0) {
    throw new Error('La distancia y el peso deben ser mayores que 0');
  }
  // Convert distance from meters to the expected unit (assuming meters input)
  const vo2max = (distance - 504.9) / 44.73;
  return Math.round(vo2max * 10) / 10; // 1 decimal place
}

/**
 * Calculate VO2 Max using Rockport Walking Test
 * Formula for men: VO2 max = 132.853 - (0.0769 × weight) - (0.3877 × age) + (6.315 × gender) - (3.2649 × time) - (0.1565 × heartRate)
 * Formula for women: VO2 max = 132.853 - (0.0769 × weight) - (0.3877 × age) - (3.2649 × time) - (0.1565 × heartRate)
 * Source: Kline et al. (1987)
 */
export function calculateVO2MaxRockport(
  gender: 'male' | 'female',
  weight: number, // kg
  age: number,
  timeMinutes: number, // minutes for 1 mile
  heartRate: number // bpm
): number {
  if (weight <= 0 || age <= 0 || timeMinutes <= 0 || heartRate <= 0) {
    throw new Error('Todos los valores deben ser mayores que 0');
  }

  const genderFactor = gender === 'male' ? 6.315 : 0;
  const baseVO2 = 132.853;
  const weightFactor = 0.0769 * weight;
  const ageFactor = 0.3877 * age;
  const timeFactor = 3.2649 * timeMinutes;
  const hrFactor = 0.1565 * heartRate;

  const vo2max = baseVO2 - weightFactor - ageFactor + genderFactor - timeFactor - hrFactor;
  return Math.round(vo2max * 10) / 10; // 1 decimal place
}

/**
 * Calculate VO2 Max using Astrand-Rhyming cycle ergometer test
 * Formula: VO2 max = (work rate × 6.12 × body weight × 1.8) / (heart rate × 1000)
 * Where work rate is in watts, body weight in kg
 */
export function calculateVO2MaxAstrand(
  workRate: number, // watts
  bodyWeight: number, // kg
  heartRate: number // bpm
): number {
  if (workRate <= 0 || bodyWeight <= 0 || heartRate <= 0) {
    throw new Error('Todos los valores deben ser mayores que 0');
  }

  const vo2max = (workRate * 6.12 * bodyWeight * 1.8) / (heartRate * 1000);
  return Math.round(vo2max * 10) / 10; // 1 decimal place
}

/**
 * Calculate VO2 Max using step test (Harvard step test)
 * Score = (test duration in seconds × 100) / (2 × (pulse1 + pulse2 + pulse3))
 * VO2 max = 1.979 + (0.077 × body weight) - (0.016 × age) + (0.019 × score)
 */
export function calculateVO2MaxStepTest(
  testDuration: number, // seconds
  pulse1: number, // bpm (1st minute)
  pulse2: number, // bpm (2nd minute)
  pulse3: number, // bpm (3rd minute)
  bodyWeight: number, // kg
  age: number
): number {
  if (testDuration <= 0 || pulse1 <= 0 || pulse2 <= 0 || pulse3 <= 0 || bodyWeight <= 0 || age <= 0) {
    throw new Error('Todos los valores deben ser mayores que 0');
  }

  const score = (testDuration * 100) / (2 * (pulse1 + pulse2 + pulse3));
  const vo2max = 1.979 + (0.077 * bodyWeight) - (0.016 * age) + (0.019 * score);
  return Math.round(vo2max * 10) / 10; // 1 decimal place
}

/**
 * Analyze VO2 Max results and provide interpretation
 */
export function analyzeVO2Max(vo2max: number, age: number, gender: 'male' | 'female'): {
  vo2max: number;
  category: string;
  fitnessLevel: string;
  healthStatus: string;
  recommendations: string[];
  comparison: string;
  trainingZones: {
    zone1: string;
    zone2: string;
    zone3: string;
    zone4: string;
    zone5: string;
  };
} {
  // Age and gender adjusted norms (simplified)
  const norms = {
    male: {
      excellent: age < 30 ? 55 : age < 40 ? 50 : age < 50 ? 45 : 40,
      good: age < 30 ? 45 : age < 40 ? 40 : age < 50 ? 35 : 30,
      average: age < 30 ? 35 : age < 40 ? 30 : age < 50 ? 25 : 20,
      poor: age < 30 ? 25 : age < 40 ? 20 : age < 50 ? 15 : 10
    },
    female: {
      excellent: age < 30 ? 45 : age < 40 ? 40 : age < 50 ? 35 : 30,
      good: age < 30 ? 35 : age < 40 ? 30 : age < 50 ? 25 : 20,
      average: age < 30 ? 25 : age < 40 ? 20 : age < 50 ? 15 : 10,
      poor: age < 30 ? 15 : age < 40 ? 10 : age < 50 ? 5 : 5
    }
  };

  const userNorms = norms[gender];
  let category: string;
  let fitnessLevel: string;

  if (vo2max >= userNorms.excellent) {
    category = 'Excelente';
    fitnessLevel = 'Atleta de élite';
  } else if (vo2max >= userNorms.good) {
    category = 'Bueno';
    fitnessLevel = 'Buena condición física';
  } else if (vo2max >= userNorms.average) {
    category = 'Promedio';
    fitnessLevel = 'Condición física moderada';
  } else {
    category = 'Bajo';
    fitnessLevel = 'Necesita mejorar';
  }

  const healthStatus = vo2max > userNorms.average
    ? 'Salud cardiovascular óptima'
    : 'Riesgo cardiovascular aumentado';

  const recommendations: string[] = [];

  if (vo2max < userNorms.average) {
    recommendations.push('Incluye entrenamiento cardiovascular regular (correr, nadar, ciclismo)');
    recommendations.push('Realiza ejercicios de intervalos de alta intensidad (HIIT)');
    recommendations.push('Mantén un peso saludable para mejorar la eficiencia cardiovascular');
  } else {
    recommendations.push('Continúa con tu rutina actual para mantener la condición física');
    recommendations.push('Considera entrenamientos de tempo para mejorar el umbral láctico');
  }

  recommendations.push('Combina con entrenamiento de fuerza para mejorar la economía de movimiento');

  const comparison = gender === 'male'
    ? `Para hombres de tu edad: Excelente (>${userNorms.excellent}), Bueno (${userNorms.good}-${userNorms.excellent}), Promedio (${userNorms.average}-${userNorms.good})`
    : `Para mujeres de tu edad: Excelente (>${userNorms.excellent}), Bueno (${userNorms.good}-${userNorms.excellent}), Promedio (${userNorms.average}-${userNorms.good})`;

  // Calculate training zones based on VO2 max
  const maxHeartRate = 220 - age;
  const zones = {
    zone1: `${Math.round(maxHeartRate * 0.5)}-${Math.round(maxHeartRate * 0.6)} bpm (Recuperación activa)`,
    zone2: `${Math.round(maxHeartRate * 0.6)}-${Math.round(maxHeartRate * 0.7)} bpm (Resistencia básica)`,
    zone3: `${Math.round(maxHeartRate * 0.7)}-${Math.round(maxHeartRate * 0.8)} bpm (Tempo)`,
    zone4: `${Math.round(maxHeartRate * 0.8)}-${Math.round(maxHeartRate * 0.9)} bpm (Umbral)`,
    zone5: `${Math.round(maxHeartRate * 0.9)}-${Math.round(maxHeartRate * 1.0)} bpm (VO2 max)`
  };

  return {
    vo2max,
    category,
    fitnessLevel,
    healthStatus,
    recommendations,
    comparison,
    trainingZones: zones
  };
}

// ========== SARCOPENIA CALCULATIONS ==========

/**
 * Calculate Sarcopenia Index using anthropometric measurements
 * Formula: Sarcopenia Index = (muscle mass in kg) / (height in meters)^2
 * Values < 7.0 kg/m² for men and < 5.5 kg/m² for women indicate sarcopenia
 * Source: Baumgartner et al. (1998) - The New Mexico Elder Health Survey
 */
export function calculateSarcopeniaIndex(
  gender: 'male' | 'female',
  muscleMass: number, // kg
  height: number // cm
): number {
  if (muscleMass <= 0 || height <= 0) {
    throw new Error('La masa muscular y altura deben ser mayores que 0');
  }

  const heightM = height / 100; // Convert cm to meters
  const sarcopeniaIndex = muscleMass / (heightM * heightM);
  return Math.round(sarcopeniaIndex * 100) / 100; // 2 decimal places
}

/**
 * Calculate Appendicular Skeletal Muscle Mass (ASMM) using anthropometric method
 * Formula for men: ASMM = 0.244 × body weight + 7.8 × height + 6.6 × age - 0.098 × waist circumference + ethnicity factor - 32.4
 * Formula for women: ASMM = 0.244 × body weight + 7.8 × height + 6.6 × age - 0.098 × waist circumference + ethnicity factor - 32.4
 * Source: Kyle et al. (2003) - Validation of bioelectrical impedance analysis
 */
export function calculateAppendicularSkeletalMuscleMass(
  gender: 'male' | 'female',
  weight: number, // kg
  height: number, // cm
  age: number,
  waistCircumference: number, // cm
  ethnicity: 'caucasian' | 'asian' | 'hispanic' | 'african' = 'caucasian'
): number {
  if (weight <= 0 || height <= 0 || age <= 0 || waistCircumference <= 0) {
    throw new Error('Todos los valores deben ser mayores que 0');
  }

  // Ethnicity factors (simplified)
  const ethnicityFactor = {
    caucasian: 0,
    asian: -1.2,
    hispanic: 0.5,
    african: 1.1
  }[ethnicity];

  const baseASMM = 0.244 * weight + 7.8 * (height / 100) + 6.6 * age - 0.098 * waistCircumference + ethnicityFactor - 32.4;

  return Math.round(baseASMM * 100) / 100; // 2 decimal places
}

/**
 * Calculate Skeletal Muscle Mass Index (SMMI) using Janssen equation
 * Formula: SMM = (height × 0.00744 + age × (-0.00088) + gender × 0.004 + ethnicity × 0.0001 + waist × (-0.0001) + hip × (-0.0001) + forearm × 0.0001) + 2.947
 * Source: Janssen et al. (2000)
 */
export function calculateSkeletalMuscleMassIndex(
  gender: 'male' | 'female',
  height: number, // cm
  age: number,
  waistCircumference: number, // cm
  hipCircumference: number, // cm
  forearmCircumference: number, // cm
  ethnicity: 'caucasian' | 'asian' | 'hispanic' | 'african' = 'caucasian'
): number {
  if (height <= 0 || age <= 0 || waistCircumference <= 0 || hipCircumference <= 0 || forearmCircumference <= 0) {
    throw new Error('Todos los valores deben ser mayores que 0');
  }

  const genderFactor = gender === 'male' ? 0.004 : 0;
  const ethnicityFactor = {
    caucasian: 0.0001,
    asian: -0.0005,
    hispanic: 0.0002,
    african: 0.0003
  }[ethnicity];

  const smmi = (height * 0.00744) + (age * -0.00088) + genderFactor + ethnicityFactor +
    (waistCircumference * -0.0001) + (hipCircumference * -0.0001) + (forearmCircumference * 0.0001) + 2.947;

  return Math.round(smmi * 100) / 100; // 2 decimal places
}

/**
 * Analyze Sarcopenia results and provide comprehensive interpretation
 */
export function analyzeSarcopenia(
  sarcopeniaIndex: number,
  age: number,
  gender: 'male' | 'female',
  muscleMass?: number,
  height?: number
): {
  sarcopeniaIndex: number;
  sarcopeniaStage: 'Sin Sarcopenia' | 'Pre-sarcopenia' | 'Sarcopenia' | 'Sarcopenia Severa';
  riskLevel: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  ageAdjustedRisk: string;
  functionalImpact: string;
  recommendations: string[];
  preventionStrategies: string[];
  clinicalImplications: string;
  followUp: string;
} {
  // Age and gender specific cutoffs (simplified from EWGSOP2)
  const cutoffs = {
    male: {
      normal: age < 65 ? 7.0 : 6.0,
      low: age < 65 ? 5.5 : 4.5
    },
    female: {
      normal: age < 65 ? 5.5 : 4.5,
      low: age < 65 ? 4.0 : 3.5
    }
  };

  const userCutoffs = cutoffs[gender];
  let sarcopeniaStage: 'Sin Sarcopenia' | 'Pre-sarcopenia' | 'Sarcopenia' | 'Sarcopenia Severa';
  let riskLevel: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';

  if (sarcopeniaIndex >= userCutoffs.normal) {
    sarcopeniaStage = 'Sin Sarcopenia';
    riskLevel = 'Bajo';
  } else if (sarcopeniaIndex >= userCutoffs.low) {
    sarcopeniaStage = 'Pre-sarcopenia';
    riskLevel = 'Moderado';
  } else if (sarcopeniaIndex >= userCutoffs.low * 0.8) {
    sarcopeniaStage = 'Sarcopenia';
    riskLevel = 'Alto';
  } else {
    sarcopeniaStage = 'Sarcopenia Severa';
    riskLevel = 'Muy Alto';
  }

  // Age-adjusted risk assessment
  const ageAdjustedRisk = age > 70 ? 'Riesgo aumentado por edad' : age > 50 ? 'Riesgo moderado por edad' : 'Riesgo estándar por edad';

  // Functional impact assessment
  const functionalImpact = sarcopeniaIndex < userCutoffs.low
    ? 'Puede afectar movilidad, equilibrio y actividades diarias'
    : 'No hay impacto funcional significativo detectado';

  // Recommendations
  const recommendations: string[] = [];

  if (sarcopeniaIndex < userCutoffs.low) {
    recommendations.push('Consulta con un médico o geriatra para evaluación completa');
    recommendations.push('Considera suplementación con proteína de alta calidad (1.2-1.6g/kg/día)');
    recommendations.push('Incorpora entrenamiento de fuerza 2-3 veces por semana');
    recommendations.push('Mantén una dieta rica en proteínas, vitamina D y ácidos grasos omega-3');
  } else {
    recommendations.push('Mantén actividad física regular para prevenir la pérdida muscular');
    recommendations.push('Incluye entrenamiento de fuerza en tu rutina semanal');
    recommendations.push('Asegura una ingesta adecuada de proteínas (1.0-1.2g/kg/día)');
  }

  recommendations.push('Realiza chequeos médicos regulares después de los 50 años');
  recommendations.push('Mantén un peso corporal saludable para reducir el estrés en los músculos');

  // Prevention strategies
  const preventionStrategies: string[] = [
    'Ejercicio de resistencia progresiva (pesas, bandas elásticas)',
    'Consumo adecuado de proteínas en cada comida principal',
    'Suplementación con vitamina D si hay deficiencia',
    'Evitar periodos prolongados de inactividad',
    'Mantener un sueño de calidad (7-9 horas/noche)',
    'Controlar enfermedades crónicas (diabetes, hipotiroidismo)',
    'Evitar el consumo excesivo de alcohol y tabaco'
  ];

  // Clinical implications
  const clinicalImplications = sarcopeniaIndex < userCutoffs.low
    ? 'Puede requerir intervención médica y seguimiento especializado'
    : 'Mantener vigilancia y hábitos saludables preventivos';

  // Follow-up recommendations
  const followUp = age > 65
    ? 'Evaluación anual con médico geriatra o especialista en sarcopenia'
    : age > 50
      ? 'Evaluación cada 2 años o ante síntomas de debilidad'
      : 'Evaluación cada 3-5 años como prevención';

  return {
    sarcopeniaIndex,
    sarcopeniaStage,
    riskLevel,
    ageAdjustedRisk,
    functionalImpact,
    recommendations,
    preventionStrategies,
    clinicalImplications,
    followUp
  };
}

// ========== WHR (WAIST-HIP RATIO) CALCULATIONS ==========

/**
 * Calculate Waist-Hip Ratio (WHR)
 * Formula: WHR = waist circumference (cm) / hip circumference (cm)
 * Source: World Health Organization (WHO) and various cardiovascular studies
 */
export function calculateWHR(waistCircumference: number, hipCircumference: number): number {
  if (waistCircumference <= 0 || hipCircumference <= 0) {
    throw new Error('La circunferencia de cintura y cadera deben ser mayores que 0');
  }

  if (waistCircumference >= hipCircumference) {
    throw new Error('La circunferencia de cintura debe ser menor que la de cadera');
  }

  const whr = waistCircumference / hipCircumference;
  return Math.round(whr * 1000) / 1000; // 3 decimal places
}

/**
 * Calculate Waist-to-Hip Ratio analysis with health implications
 */
export function analyzeWHR(waistCircumference: number, hipCircumference: number, gender: 'male' | 'female', age?: number): {
  whr: number;
  category: string;
  healthRisk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  cardiovascularRisk: string;
  metabolicRisk: string;
  recommendations: string[];
  comparison: string;
  idealRange: string;
  clinicalInterpretation: string;
} {
  const whr = calculateWHR(waistCircumference, hipCircumference);

  // WHO cutoffs for WHR (slightly adjusted for clinical practice)
  const cutoffs = {
    male: {
      low: 0.85,
      moderate: 0.90,
      high: 0.95,
      veryHigh: 1.00
    },
    female: {
      low: 0.75,
      moderate: 0.80,
      high: 0.85,
      veryHigh: 0.90
    }
  };

  const userCutoffs = cutoffs[gender];
  let category: string;
  let healthRisk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';

  if (whr < userCutoffs.low) {
    category = 'Excelente (distribución óptima)';
    healthRisk = 'Bajo';
  } else if (whr < userCutoffs.moderate) {
    category = 'Bueno (distribución favorable)';
    healthRisk = 'Bajo';
  } else if (whr < userCutoffs.high) {
    category = 'Moderado (vigilancia recomendada)';
    healthRisk = 'Moderado';
  } else if (whr < userCutoffs.veryHigh) {
    category = 'Alto riesgo (acción necesaria)';
    healthRisk = 'Alto';
  } else {
    category = 'Muy alto riesgo (intervención urgente)';
    healthRisk = 'Muy Alto';
  }

  // Cardiovascular risk assessment
  const cardiovascularRisk = whr > userCutoffs.moderate
    ? `Riesgo cardiovascular aumentado en ${(whr / userCutoffs.moderate * 100 - 100).toFixed(0)}% según estudios epidemiológicos`
    : 'Riesgo cardiovascular dentro de parámetros saludables';

  // Metabolic risk assessment
  const metabolicRisk = whr > userCutoffs.high
    ? 'Mayor riesgo de síndrome metabólico, diabetes tipo 2 y resistencia a la insulina'
    : 'Riesgo metabólico estándar o reducido';

  // Recommendations
  const recommendations: string[] = [];

  if (whr > userCutoffs.moderate) {
    recommendations.push('Consulta con un médico para evaluación cardiovascular completa');
    recommendations.push('Implementa cambios en la alimentación: reduce azúcares y grasas saturadas');
    recommendations.push('Aumenta la actividad física: combina cardio con entrenamiento de fuerza');
    recommendations.push('Considera reducción calórica controlada bajo supervisión médica');
    recommendations.push('Monitorea otros factores de riesgo: presión arterial, glucosa, lípidos');
  } else {
    recommendations.push('Mantén tu estilo de vida actual con actividad física regular');
    recommendations.push('Continúa con una alimentación equilibrada rica en frutas y vegetales');
    recommendations.push('Realiza chequeos médicos preventivos anuales');
  }

  recommendations.push('Mide tu WHR cada 3-6 meses para monitorear cambios');
  recommendations.push('Combina con otras métricas como WHtR e IMC para evaluación completa');

  // Comparison with standards
  const comparison = gender === 'male'
    ? `Hombres: Óptimo (< 0.90), Moderado (0.90-0.95), Alto riesgo (> 0.95)`
    : `Mujeres: Óptimo (< 0.80), Moderado (0.80-0.85), Alto riesgo (> 0.85)`;

  // Ideal range
  const idealRange = gender === 'male' ? '0.80-0.90' : '0.70-0.80';

  // Clinical interpretation
  const clinicalInterpretation = whr > userCutoffs.high
    ? 'Indicativo de obesidad central y mayor riesgo cardiometabólico. Requiere intervención médica.'
    : 'Distribución de grasa favorable. Continuar con hábitos saludables preventivos.';

  return {
    whr,
    category,
    healthRisk,
    cardiovascularRisk,
    metabolicRisk,
    recommendations,
    comparison,
    idealRange,
    clinicalInterpretation
  };
}

/**
 * Calculate Waist-Hip Ratio with additional anthropometric measurements
 * Includes waist-hip ratio, waist-height ratio, and body shape classification
 */
export function calculateComprehensiveWHR(
  waistCircumference: number,
  hipCircumference: number,
  height: number,
  gender: 'male' | 'female'
): {
  whr: number;
  whtr: number;
  bodyShape: string;
  androidGynoidRatio: string;
  healthScore: number;
  recommendations: string[];
} {
  const whr = calculateWHR(waistCircumference, hipCircumference);
  const whtr = waistCircumference / height; // Waist-height ratio

  // Body shape classification based on WHR
  let bodyShape: string;
  if (gender === 'male') {
    if (whr < 0.85) bodyShape = 'Ginoide (forma de pera)';
    else if (whr < 0.90) bodyShape = 'Intermedio';
    else bodyShape = 'Androide (forma de manzana)';
  } else {
    if (whr < 0.75) bodyShape = 'Ginoide (forma de pera)';
    else if (whr < 0.80) bodyShape = 'Intermedio';
    else bodyShape = 'Androide (forma de manzana)';
  }

  // Android-gynoid ratio assessment
  const androidGynoidRatio = whr > 0.85
    ? 'Predominio androide (grasa central)'
    : 'Predominio ginoide (grasa periférica)';

  // Health score (0-100, higher is better)
  let healthScore = 100;
  if (whr > 0.90) healthScore -= 30;
  else if (whr > 0.85) healthScore -= 15;
  else if (whr > 0.80) healthScore -= 5;

  if (whtr > 0.5) healthScore -= 20;
  else if (whtr > 0.45) healthScore -= 10;

  healthScore = Math.max(0, healthScore);

  // Recommendations based on comprehensive analysis
  const recommendations: string[] = [];

  if (healthScore < 70) {
    recommendations.push('Enfoque prioritario en reducción de grasa abdominal');
    recommendations.push('Programa de ejercicio: 150 minutos semanales de actividad moderada');
    recommendations.push('Dieta mediterránea o DASH para mejorar perfil metabólico');
  } else {
    recommendations.push('Mantén hábitos actuales con monitoreo regular');
    recommendations.push('Ejercicio de fuerza 2-3 veces por semana');
  }

  recommendations.push('Medición antropométrica cada 3 meses');
  recommendations.push('Evaluación médica anual con análisis de sangre');

  return {
    whr,
    whtr,
    bodyShape,
    androidGynoidRatio,
    healthScore,
    recommendations
  };
}

// ========== FFMI (FAT-FREE MASS INDEX) CALCULATIONS ==========

/**
 * Calculate Fat-Free Mass Index (FFMI)
 * Formula: FFMI = lean body mass (kg) / (height in meters)^2
 * Source: Katch & McArdle (1977) - Used in bodybuilding and athletic performance
 */
export function calculateFFMI(leanBodyMass: number, height: number): number {
  if (leanBodyMass <= 0 || height <= 0) {
    throw new Error('La masa libre de grasa y altura deben ser mayores que 0');
  }

  const heightM = height / 100; // Convert cm to meters
  const ffmi = leanBodyMass / (heightM * heightM);
  return Math.round(ffmi * 100) / 100; // 2 decimal places
}

/**
 * Calculate normalized FFMI (height-adjusted)
 * Formula: Normalized FFMI = FFMI + 6.1 × (1.8 - height in meters)
 * Source: Used to compare individuals of different heights
 */
export function calculateNormalizedFFMI(ffmi: number, height: number): number {
  if (height <= 0) {
    throw new Error('La altura debe ser mayor que 0');
  }

  const heightM = height / 100; // Convert cm to meters
  const normalizedFFMI = ffmi + 6.1 * (1.8 - heightM);
  return Math.round(normalizedFFMI * 100) / 100; // 2 decimal places
}

/**
 * Calculate comprehensive FFMI analysis with body composition insights
 */
export function analyzeFFMI(
  leanBodyMass: number,
  height: number,
  gender: 'male' | 'female',
  age?: number,
  bodyFatPercentage?: number
): {
  ffmi: number;
  normalizedFFMI: number;
  category: string;
  muscleDevelopment: string;
  athleticPotential: string;
  geneticLimit: number;
  recommendations: string[];
  comparison: string;
  healthImplications: string;
  trainingFocus: string;
} {
  const ffmi = calculateFFMI(leanBodyMass, height);
  const normalizedFFMI = calculateNormalizedFFMI(ffmi, height);

  // FFMI categories based on research (Kouri et al., 1995)
  let category: string;
  let muscleDevelopment: string;
  let athleticPotential: string;

  if (gender === 'male') {
    if (normalizedFFMI >= 25) {
      category = 'Excelente (atleta de élite)';
      muscleDevelopment = 'Desarrollo muscular excepcional';
      athleticPotential = 'Potencial para competir al más alto nivel';
    } else if (normalizedFFMI >= 22) {
      category = 'Muy bueno (atleta avanzado)';
      muscleDevelopment = 'Desarrollo muscular avanzado';
      athleticPotential = 'Potencial para deportes de fuerza y potencia';
    } else if (normalizedFFMI >= 20) {
      category = 'Bueno (atleta intermedio)';
      muscleDevelopment = 'Buen desarrollo muscular';
      athleticPotential = 'Potencial para mejora significativa con entrenamiento';
    } else if (normalizedFFMI >= 18) {
      category = 'Promedio (principiante)';
      muscleDevelopment = 'Desarrollo muscular básico';
      athleticPotential = 'Potencial para ganar músculo con entrenamiento consistente';
    } else {
      category = 'Bajo (necesita desarrollo)';
      muscleDevelopment = 'Poco desarrollo muscular';
      athleticPotential = 'Necesita enfoque en ganancia muscular';
    }
  } else {
    if (normalizedFFMI >= 20) {
      category = 'Excelente (atleta de élite)';
      muscleDevelopment = 'Desarrollo muscular excepcional para mujeres';
      athleticPotential = 'Potencial para competir al más alto nivel';
    } else if (normalizedFFMI >= 18) {
      category = 'Muy bueno (atleta avanzada)';
      muscleDevelopment = 'Desarrollo muscular avanzado';
      athleticPotential = 'Potencial para deportes de fuerza y potencia';
    } else if (normalizedFFMI >= 16) {
      category = 'Bueno (atleta intermedia)';
      muscleDevelopment = 'Buen desarrollo muscular';
      athleticPotential = 'Potencial para mejora significativa';
    } else if (normalizedFFMI >= 14) {
      category = 'Promedio (principiante)';
      muscleDevelopment = 'Desarrollo muscular básico';
      athleticPotential = 'Potencial para ganar músculo';
    } else {
      category = 'Bajo (necesita desarrollo)';
      muscleDevelopment = 'Poco desarrollo muscular';
      athleticPotential = 'Necesita enfoque en ganancia muscular';
    }
  }

  // Genetic limit estimation (simplified)
  const geneticLimit = gender === 'male' ? 25 + (age ? Math.max(0, (30 - age) * 0.1) : 0) : 20 + (age ? Math.max(0, (30 - age) * 0.1) : 0);

  // Recommendations
  const recommendations: string[] = [];

  if (normalizedFFMI < geneticLimit * 0.8) {
    recommendations.push('Enfoque prioritario en hipertrofia muscular');
    recommendations.push('Programa de entrenamiento: 3-5 sesiones semanales de fuerza');
    recommendations.push('Déficit calórico controlado para revelar músculo ganado');
    recommendations.push('Aumenta ingesta proteica a 1.8-2.2g/kg de peso corporal');
  } else if (normalizedFFMI < geneticLimit) {
    recommendations.push('Continúa con entrenamiento consistente');
    recommendations.push('Optimiza recuperación y nutrición');
    recommendations.push('Considera periodos de especialización muscular');
  } else {
    recommendations.push('Cerca del límite genético - mantenimiento y prevención de lesiones');
    recommendations.push('Enfoque en fuerza máxima y potencia');
    recommendations.push('Monitorea composición corporal para evitar exceso de grasa');
  }

  recommendations.push('Usa nuestra calculadora de proteína para optimizar ingesta');
  recommendations.push('Combina con evaluación de masa muscular para seguimiento');

  // Comparison
  const comparison = gender === 'male'
    ? `Hombres: Excelente (≥25), Muy bueno (22-25), Bueno (20-22), Promedio (18-20)`
    : `Mujeres: Excelente (≥20), Muy bueno (18-20), Bueno (16-18), Promedio (14-16)`;

  // Health implications
  const healthImplications = normalizedFFMI > geneticLimit * 0.9
    ? 'Cerca del límite genético. Excelente desarrollo muscular con beneficios metabólicos.'
    : normalizedFFMI > geneticLimit * 0.7
      ? 'Buen desarrollo muscular. Mejora el metabolismo basal y la salud ósea.'
      : 'Espacio para mejora muscular. El entrenamiento de fuerza mejorará la salud general.';

  // Training focus
  const trainingFocus = normalizedFFMI < geneticLimit * 0.8
    ? 'Enfoque en hipertrofia: 8-12 repeticiones, progresión de cargas'
    : normalizedFFMI < geneticLimit
      ? 'Equilibrio hipertrofia-fuerza: 6-10 repeticiones, periodización'
      : 'Enfoque en fuerza máxima: 3-6 repeticiones, potencia y mantenimiento';

  return {
    ffmi,
    normalizedFFMI,
    category,
    muscleDevelopment,
    athleticPotential,
    geneticLimit,
    recommendations,
    comparison,
    healthImplications,
    trainingFocus
  };
}

/**
 * Calculate FFMI from body composition data
 * Estimates lean body mass from weight and body fat percentage
 */
export function calculateFFMIFromComposition(
  weight: number,
  bodyFatPercentage: number,
  height: number,
  gender: 'male' | 'female'
): {
  leanBodyMass: number;
  ffmi: number;
  normalizedFFMI: number;
  analysis: ReturnType<typeof analyzeFFMI>;
} {
  if (weight <= 0 || bodyFatPercentage < 0 || bodyFatPercentage > 50 || height <= 0) {
    throw new Error('Los valores deben ser válidos: peso > 0, grasa 0-50%, altura > 0');
  }

  const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
  const ffmi = calculateFFMI(leanBodyMass, height);
  const normalizedFFMI = calculateNormalizedFFMI(ffmi, height);
  const analysis = analyzeFFMI(leanBodyMass, height, gender);

  return {
    leanBodyMass,
    ffmi,
    normalizedFFMI,
    analysis
  };
}

// ========== FMI (FAT MASS INDEX) CALCULATIONS ==========

/**
 * Calculate Fat Mass Index (FMI)
 * Formula: FMI = fat mass (kg) / (height in meters)^2
 * Source: Schutz et al. (2002) - Used for body composition assessment
 */
export function calculateFMI(fatMass: number, height: number): number {
  if (fatMass <= 0 || height <= 0) {
    throw new Error('La masa grasa y altura deben ser mayores que 0');
  }

  const heightM = height / 100; // Convert cm to meters
  const fmi = fatMass / (heightM * heightM);
  return Math.round(fmi * 100) / 100; // 2 decimal places
}

/**
 * Calculate FMI from body weight and body fat percentage
 * Formula: FMI = (body weight × body fat %) / (height in meters)^2
 */
export function calculateFMIFromComposition(
  weight: number,
  bodyFatPercentage: number,
  height: number
): number {
  if (weight <= 0 || bodyFatPercentage < 0 || bodyFatPercentage > 100 || height <= 0) {
    throw new Error('Los valores deben ser válidos: peso > 0, grasa 0-100%, altura > 0');
  }

  const fatMass = weight * (bodyFatPercentage / 100);
  return calculateFMI(fatMass, height);
}

/**
 * Calculate comprehensive FMI analysis with health implications
 */
export function analyzeFMI(
  fatMass: number,
  height: number,
  gender: 'male' | 'female',
  age?: number
): {
  fmi: number;
  category: string;
  healthRisk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  metabolicRisk: string;
  cardiovascularRisk: string;
  recommendations: string[];
  comparison: string;
  idealRange: string;
  clinicalInterpretation: string;
  associatedConditions: string[];
} {
  const fmi = calculateFMI(fatMass, height);

  // FMI categories based on research (Kelly et al., 2009)
  let category: string;
  let healthRisk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';

  if (gender === 'male') {
    if (fmi < 3.0) {
      category = 'Muy bajo (posible desnutrición)';
      healthRisk = 'Moderado';
    } else if (fmi < 6.0) {
      category = 'Óptimo (saludable)';
      healthRisk = 'Bajo';
    } else if (fmi < 9.0) {
      category = 'Moderado (vigilancia)';
      healthRisk = 'Moderado';
    } else if (fmi < 12.0) {
      category = 'Alto riesgo (acción necesaria)';
      healthRisk = 'Alto';
    } else {
      category = 'Muy alto riesgo (intervención urgente)';
      healthRisk = 'Muy Alto';
    }
  } else {
    if (fmi < 5.0) {
      category = 'Muy bajo (posible desnutrición)';
      healthRisk = 'Moderado';
    } else if (fmi < 9.0) {
      category = 'Óptimo (saludable)';
      healthRisk = 'Bajo';
    } else if (fmi < 13.0) {
      category = 'Moderado (vigilancia)';
      healthRisk = 'Moderado';
    } else if (fmi < 17.0) {
      category = 'Alto riesgo (acción necesaria)';
      healthRisk = 'Alto';
    } else {
      category = 'Muy alto riesgo (intervención urgente)';
      healthRisk = 'Muy Alto';
    }
  }

  // Metabolic risk assessment
  const metabolicRisk = fmi > (gender === 'male' ? 9.0 : 13.0)
    ? 'Mayor riesgo de resistencia a la insulina y síndrome metabólico'
    : 'Riesgo metabólico estándar o reducido';

  // Cardiovascular risk assessment
  const cardiovascularRisk = fmi > (gender === 'male' ? 6.0 : 9.0)
    ? `Riesgo cardiovascular aumentado en ${(fmi / (gender === 'male' ? 6.0 : 9.0) * 100 - 100).toFixed(0)}% según estudios epidemiológicos`
    : 'Riesgo cardiovascular dentro de parámetros saludables';

  // Recommendations
  const recommendations: string[] = [];

  if (fmi > (gender === 'male' ? 9.0 : 13.0)) {
    recommendations.push('Consulta con un médico para evaluación metabólica completa');
    recommendations.push('Implementa programa de reducción de grasa: combinación cardio + fuerza');
    recommendations.push('Dieta hipocalórica controlada bajo supervisión médica');
    recommendations.push('Monitorea glucosa, lípidos y presión arterial regularmente');
    recommendations.push('Considera apoyo psicológico para cambios de hábitos');
  } else if (fmi > (gender === 'male' ? 6.0 : 9.0)) {
    recommendations.push('Mantén vigilancia con chequeos médicos regulares');
    recommendations.push('Incorpora actividad física regular (150 min/semana)');
    recommendations.push('Equilibra alimentación con control calórico moderado');
    recommendations.push('Monitorea cambios en composición corporal');
  } else {
    recommendations.push('Mantén hábitos actuales con actividad física regular');
    recommendations.push('Continúa con alimentación equilibrada y chequeos preventivos');
    recommendations.push('Usa como referencia para mantener composición corporal óptima');
  }

  recommendations.push('Combina con evaluación de masa muscular (FFMI) para análisis completo');
  recommendations.push('Realiza seguimiento cada 3-6 meses para detectar cambios');

  // Comparison
  const comparison = gender === 'male'
    ? `Hombres: Óptimo (3-6), Moderado (6-9), Alto riesgo (9-12), Muy alto (>12)`
    : `Mujeres: Óptimo (5-9), Moderado (9-13), Alto riesgo (13-17), Muy alto (>17)`;

  // Ideal range
  const idealRange = gender === 'male' ? '3.0-6.0' : '5.0-9.0';

  // Clinical interpretation
  const clinicalInterpretation = fmi > (gender === 'male' ? 9.0 : 13.0)
    ? 'Indicativo de exceso de grasa corporal con riesgo metabólico aumentado. Requiere intervención médica.'
    : fmi < (gender === 'male' ? 3.0 : 5.0)
      ? 'Posible desnutrición o pérdida excesiva de grasa. Evaluar estado nutricional.'
      : 'Composición corporal favorable. Continuar con hábitos saludables preventivos.';

  // Associated conditions
  const associatedConditions = fmi > (gender === 'male' ? 9.0 : 13.0)
    ? ['Síndrome metabólico', 'Diabetes tipo 2', 'Hipertensión', 'Dislipidemia', 'Esteatosis hepática']
    : fmi < (gender === 'male' ? 3.0 : 5.0)
      ? ['Posible desnutrición', 'Osteoporosis', 'Anemia', 'Déficit inmunológico']
      : ['Riesgo estándar', 'Composición corporal saludable'];

  return {
    fmi,
    category,
    healthRisk,
    metabolicRisk,
    cardiovascularRisk,
    recommendations,
    comparison,
    idealRange,
    clinicalInterpretation,
    associatedConditions
  };
}

/**
 * Calculate FMI with additional body composition metrics
 * Includes FMI, body fat percentage, and comprehensive analysis
 */
export function calculateComprehensiveFMI(
  weight: number,
  bodyFatPercentage: number,
  height: number,
  gender: 'male' | 'female',
  age?: number
): {
  fmi: number;
  bodyFatPercentage: number;
  fatMass: number;
  leanBodyMass: number;
  analysis: ReturnType<typeof analyzeFMI>;
} {
  if (weight <= 0 || bodyFatPercentage < 0 || bodyFatPercentage > 100 || height <= 0) {
    throw new Error('Los valores deben ser válidos: peso > 0, grasa 0-100%, altura > 0');
  }

  const fatMass = weight * (bodyFatPercentage / 100);
  const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
  const fmi = calculateFMI(fatMass, height);
  const analysis = analyzeFMI(fatMass, height, gender, age);

  return {
    fmi,
    bodyFatPercentage,
    fatMass,
    leanBodyMass,
    analysis
  };
}

// ========== BAI (BODY ADIPOSITY INDEX) CALCULATIONS ==========

/**
 * Calculate Body Adiposity Index (BAI)
 * Formula: BAI = (hip circumference in cm) / (height in m)^1.5 - 18
 * Source: Bergman et al. (2011) - Obesity Journal
 * Estimates body fat percentage without using body weight
 */
export function calculateBAI(hipCircumference: number, height: number): number {
  if (hipCircumference <= 0 || height <= 0) {
    throw new Error('La circunferencia de cadera y altura deben ser mayores que 0');
  }

  const heightM = height / 100; // Convert cm to meters
  const bai = (hipCircumference / Math.pow(heightM, 1.5)) - 18;
  return Math.round(bai * 100) / 100; // 2 decimal places
}

/**
 * Calculate comprehensive BAI analysis with health implications
 */
export function analyzeBAI(
  hipCircumference: number,
  height: number,
  gender: 'male' | 'female',
  age?: number
): {
  bai: number;
  estimatedBodyFat: number;
  category: string;
  healthRisk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  metabolicImplications: string;
  comparison: string;
  recommendations: string[];
  idealRange: string;
  clinicalInterpretation: string;
  advantages: string[];
  limitations: string[];
} {
  const bai = calculateBAI(hipCircumference, height);

  // BAI approximates body fat percentage directly
  const estimatedBodyFat = bai;

  // BAI categories based on research (Bergman et al., 2011)
  let category: string;
  let healthRisk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';

  if (gender === 'male') {
    if (estimatedBodyFat < 8) {
      category = 'Muy bajo (atleta élite)';
      healthRisk = 'Bajo';
    } else if (estimatedBodyFat < 20) {
      category = 'Óptimo (saludable)';
      healthRisk = 'Bajo';
    } else if (estimatedBodyFat < 25) {
      category = 'Moderado (vigilancia)';
      healthRisk = 'Moderado';
    } else if (estimatedBodyFat < 30) {
      category = 'Alto (acción necesaria)';
      healthRisk = 'Alto';
    } else {
      category = 'Muy alto (obesidad)';
      healthRisk = 'Muy Alto';
    }
  } else {
    if (estimatedBodyFat < 21) {
      category = 'Muy bajo (atleta élite)';
      healthRisk = 'Bajo';
    } else if (estimatedBodyFat < 33) {
      category = 'Óptimo (saludable)';
      healthRisk = 'Bajo';
    } else if (estimatedBodyFat < 39) {
      category = 'Moderado (vigilancia)';
      healthRisk = 'Moderado';
    } else if (estimatedBodyFat < 45) {
      category = 'Alto (acción necesaria)';
      healthRisk = 'Alto';
    } else {
      category = 'Muy alto (obesidad)';
      healthRisk = 'Muy Alto';
    }
  }

  // Metabolic implications
  const metabolicImplications = estimatedBodyFat > (gender === 'male' ? 25 : 39)
    ? 'Riesgo elevado de síndrome metabólico, resistencia a la insulina y enfermedades cardiovasculares'
    : estimatedBodyFat < (gender === 'male' ? 8 : 21)
      ? 'Posible déficit hormonal o desnutrición. Evaluar estado de salud general'
      : 'Composición corporal favorable dentro de parámetros saludables';

  // Recommendations
  const recommendations: string[] = [];

  if (estimatedBodyFat > (gender === 'male' ? 25 : 39)) {
    recommendations.push('Consulta médica para evaluación metabólica completa');
    recommendations.push('Programa de reducción de grasa: déficit calórico moderado');
    recommendations.push('Ejercicio combinado: 150 min cardio + 3 sesiones fuerza/semana');
    recommendations.push('Monitoreo de glucosa, lípidos y presión arterial');
    recommendations.push('Considera medición con DEXA para validar resultados de BAI');
  } else if (estimatedBodyFat > (gender === 'male' ? 20 : 33)) {
    recommendations.push('Mantén vigilancia con chequeos preventivos regulares');
    recommendations.push('Incorpora actividad física regular (150 min/semana)');
    recommendations.push('Dieta equilibrada con control calórico moderado');
    recommendations.push('Monitorea circunferencia de cadera cada 3 meses');
  } else {
    recommendations.push('Mantén hábitos actuales con actividad física regular');
    recommendations.push('Continúa con alimentación equilibrada');
    recommendations.push('Usa como referencia para mantener composición corporal óptima');
  }

  recommendations.push('Combina BAI con otras métricas (IMC, WHR, FFMI) para evaluación completa');
  recommendations.push('El BAI es más preciso en mujeres que en hombres según estudios');

  // Comparison
  const comparison = gender === 'male'
    ? `Hombres: Óptimo (8-20%), Moderado (20-25%), Alto (25-30%), Muy alto (>30%)`
    : `Mujeres: Óptimo (21-33%), Moderado (33-39%), Alto (39-45%), Muy alto (>45%)`;

  // Ideal range
  const idealRange = gender === 'male' ? '8-20%' : '21-33%';

  // Clinical interpretation
  const clinicalInterpretation = estimatedBodyFat > (gender === 'male' ? 25 : 39)
    ? 'Indicativo de exceso de adiposidad corporal. Mayor riesgo metabólico y cardiovascular. Requiere intervención.'
    : estimatedBodyFat < (gender === 'male' ? 8 : 21)
      ? 'Nivel de grasa corporal muy bajo. Evaluar posible desnutrición o desequilibrio hormonal.'
      : 'Adiposidad corporal en rango saludable. Continuar con hábitos preventivos actuales.';

  // Advantages of BAI
  const advantages = [
    'No requiere conocer el peso corporal',
    'Útil cuando no hay acceso a báscula',
    'Correlaciona bien con DEXA en ciertos grupos étnicos',
    'Especialmente preciso en mujeres afrodescendientes',
    'Simple de calcular con solo cinta métrica'
  ];

  // Limitations of BAI
  const limitations = [
    'Menor precisión en hombres que en mujeres',
    'Puede sobreestimar grasa en atletas musculosos',
    'Varía según grupo étnico y edad',
    'No distingue entre grasa visceral y subcutánea',
    'Menos validado que métodos tradicionales como IMC'
  ];

  return {
    bai,
    estimatedBodyFat,
    category,
    healthRisk,
    metabolicImplications,
    comparison,
    recommendations,
    idealRange,
    clinicalInterpretation,
    advantages,
    limitations
  };
}

// ========== RMR (RESTING METABOLIC RATE) CALCULATIONS ==========

/**
 * Calculate Resting Metabolic Rate (RMR) using Mifflin-St Jeor equation
 * RMR is similar to BMR but measured under less strict conditions
 * Formula: Men: 10*weight + 6.25*height - 5*age + 5
 *         Women: 10*weight + 6.25*height - 5*age - 161
 * Source: Mifflin et al. (1990) - American Journal of Clinical Nutrition
 */
export function calculateRMRMifflin(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error('El peso, altura y edad deben ser mayores que 0');
  }

  const baseCalories = 10 * weight + 6.25 * height - 5 * age;
  const rmr = gender === 'male' ? baseCalories + 5 : baseCalories - 161;

  return Math.round(rmr);
}

/**
 * Calculate RMR using Harris-Benedict equation (revised 1984)
 * Formula: Men: 88.362 + (13.397*weight) + (4.799*height) - (5.677*age)
 *         Women: 447.593 + (9.247*weight) + (3.098*height) - (4.330*age)
 * Source: Harris & Benedict (1918), revised Roza & Shizgal (1984)
 */
export function calculateRMRHarris(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error('El peso, altura y edad deben ser mayores que 0');
  }

  let rmr: number;

  if (gender === 'male') {
    rmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    rmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  return Math.round(rmr);
}

/**
 * Calculate RMR using Katch-McArdle equation (based on lean body mass)
 * Formula: RMR = 370 + (21.6 * lean body mass in kg)
 * Source: Katch & McArdle (1996)
 * Most accurate when body composition is known
 */
export function calculateRMRKatch(
  weight: number,
  bodyFatPercentage: number
): number {
  if (weight <= 0 || bodyFatPercentage < 0 || bodyFatPercentage > 100) {
    throw new Error('El peso debe ser mayor que 0 y el porcentaje de grasa entre 0-100%');
  }

  const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
  const rmr = 370 + (21.6 * leanBodyMass);

  return Math.round(rmr);
}

/**
 * Comprehensive RMR analysis with all three formulas and recommendations
 */
export function analyzeRMR(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  bodyFatPercentage?: number
): {
  mifflin: number;
  harris: number;
  katch: number | null;
  average: number;
  dailyCalorieNeeds: {
    sedentary: number;
    light: number;
    moderate: number;
    active: number;
    veryActive: number;
  };
  recommendations: string[];
  metabolicContext: string;
  comparisonByAge: string;
  factors: {
    muscleImpact: string;
    ageImpact: string;
    genderImpact: string;
  };
} {
  const mifflin = calculateRMRMifflin(weight, height, age, gender);
  const harris = calculateRMRHarris(weight, height, age, gender);

  let katch: number | null = null;
  let average: number;

  if (bodyFatPercentage !== undefined && bodyFatPercentage >= 0 && bodyFatPercentage <= 100) {
    katch = calculateRMRKatch(weight, bodyFatPercentage);
    average = Math.round((mifflin + harris + katch) / 3);
  } else {
    average = Math.round((mifflin + harris) / 2);
  }

  // Activity level multipliers (same as TDEE)
  const dailyCalorieNeeds = {
    sedentary: Math.round(average * 1.2),
    light: Math.round(average * 1.375),
    moderate: Math.round(average * 1.55),
    active: Math.round(average * 1.725),
    veryActive: Math.round(average * 1.9)
  };

  // Recommendations
  const recommendations: string[] = [];

  if (katch) {
    recommendations.push('Tu RMR con Katch-McArdle (basado en masa magra) es el más preciso para ti');
    recommendations.push('Mantén o aumenta tu masa muscular para elevar tu metabolismo basal');
  } else {
    recommendations.push('Para mayor precisión, mide tu porcentaje de grasa corporal y usa Katch-McArdle');
  }

  recommendations.push(`Tu RMR promedio es ${average} kcal/día - este es tu gasto en reposo completo`);
  recommendations.push('Para perder grasa: consume 10-20% menos de tus necesidades calóricas totales');
  recommendations.push('Para ganar músculo: consume 5-15% más de tus necesidades calóricas totales');
  recommendations.push('El entrenamiento de fuerza puede aumentar tu RMR hasta un 7-8% a largo plazo');

  if (age > 40) {
    recommendations.push('A partir de los 40 años, el RMR disminuye ~2% por década - prioriza entrenamiento de fuerza');
  }

  // Metabolic context
  const caloriesPerKg = Math.round(average / weight);
  let metabolicContext: string;

  if (caloriesPerKg < 20) {
    metabolicContext = 'Metabolismo basal relativamente bajo - enfócate en aumentar masa muscular y actividad física';
  } else if (caloriesPerKg < 25) {
    metabolicContext = 'Metabolismo basal normal - mantén hábitos saludables actuales';
  } else {
    metabolicContext = 'Metabolismo basal elevado - probablemente debido a buena masa muscular o alta actividad';
  }

  // Age comparison
  const expectedRMR = gender === 'male'
    ? 1600 - ((age - 30) * 20)
    : 1400 - ((age - 30) * 15);

  const deviation = ((average - expectedRMR) / expectedRMR) * 100;
  let comparisonByAge: string;

  if (Math.abs(deviation) < 10) {
    comparisonByAge = `Tu RMR está dentro del promedio esperado para tu edad (±10%)`;
  } else if (deviation > 0) {
    comparisonByAge = `Tu RMR es ${Math.abs(Math.round(deviation))}% superior al promedio de tu edad - excelente`;
  } else {
    comparisonByAge = `Tu RMR es ${Math.abs(Math.round(deviation))}% inferior al promedio de tu edad - considera aumentar masa muscular`;
  }

  // Factors explanation
  const factors = {
    muscleImpact: 'La masa muscular quema 3 veces más calorías que la grasa en reposo (13 kcal/kg vs 4.5 kcal/kg)',
    ageImpact: `El RMR disminuye aproximadamente ${gender === 'male' ? '2-3%' : '1-2%'} por década después de los 30 años`,
    genderImpact: gender === 'male'
      ? 'Los hombres tienen un RMR ~5-10% mayor debido a mayor masa muscular y menor grasa corporal'
      : 'Las mujeres tienen un RMR ~5-10% menor debido a menor masa muscular y mayor porcentaje de grasa'
  };

  return {
    mifflin,
    harris,
    katch,
    average,
    dailyCalorieNeeds,
    recommendations,
    metabolicContext,
    comparisonByAge,
    factors
  };
}

// ========== ADJUSTED BODY WEIGHT (ABW) CALCULATIONS ==========

/**
 * Calculate Ideal Body Weight using Robinson formula (1983)
 * Most widely used in clinical practice
 * Formula: Men: 52 kg + 1.9 kg per inch over 5 feet
 *         Women: 49 kg + 1.7 kg per inch over 5 feet
 * Source: Robinson et al. (1983) - American Journal of Clinical Nutrition
 */
export function calculateIdealBodyWeightRobinson(
  height: number,
  gender: 'male' | 'female'
): number {
  if (height <= 0) {
    throw new Error('La altura debe ser mayor que 0');
  }

  const heightInches = height / 2.54; // Convert cm to inches
  const baseHeight = 60; // 5 feet = 60 inches
  
  if (heightInches < baseHeight) {
    // For people shorter than 5 feet, use proportional calculation
    const proportion = heightInches / baseHeight;
    return gender === 'male' ? Math.round(52 * proportion) : Math.round(49 * proportion);
  }
  
  const inchesOver5Feet = heightInches - baseHeight;
  const ibw = gender === 'male' 
    ? 52 + (1.9 * inchesOver5Feet)
    : 49 + (1.7 * inchesOver5Feet);
  
  return Math.round(ibw * 10) / 10; // 1 decimal place
}

/**
 * Calculate Adjusted Body Weight (ABW)
 * Used in clinical nutrition and pharmacology
 * Formula: ABW = IBW + 0.4 * (Actual Weight - IBW)
 * Source: Clinical guidelines for obesity and critical care
 */
export function calculateAdjustedBodyWeight(
  actualWeight: number,
  idealWeight: number,
  adjustmentFactor: number = 0.4
): number {
  if (actualWeight <= 0 || idealWeight <= 0) {
    throw new Error('El peso actual e ideal deben ser mayores que 0');
  }

  // If actual weight is less than or equal to ideal weight, use actual weight
  if (actualWeight <= idealWeight) {
    return actualWeight;
  }

  const abw = idealWeight + (adjustmentFactor * (actualWeight - idealWeight));
  return Math.round(abw * 10) / 10; // 1 decimal place
}

/**
 * Comprehensive Adjusted Body Weight analysis
 */
export function analyzeAdjustedBodyWeight(
  actualWeight: number,
  height: number,
  gender: 'male' | 'female',
  age?: number
): {
  actualWeight: number;
  idealWeight: number;
  adjustedWeight: number;
  weightDifference: number;
  percentageOverIdeal: number;
  bmiActual: number;
  bmiIdeal: number;
  weightCategory: string;
  clinicalUse: {
    useActualWeight: boolean;
    useIdealWeight: boolean;
    useAdjustedWeight: boolean;
    reason: string;
  };
  proteinNeeds: {
    byActualWeight: { min: number; max: number };
    byIdealWeight: { min: number; max: number };
    byAdjustedWeight: { min: number; max: number };
    recommended: string;
  };
  calorieNeeds: {
    byActualWeight: number;
    byIdealWeight: number;
    byAdjustedWeight: number;
    recommended: string;
  };
  recommendations: string[];
  clinicalApplications: string[];
  importantNotes: string[];
} {
  const idealWeight = calculateIdealBodyWeightRobinson(height, gender);
  const adjustedWeight = calculateAdjustedBodyWeight(actualWeight, idealWeight);
  const weightDifference = actualWeight - idealWeight;
  const percentageOverIdeal = ((actualWeight - idealWeight) / idealWeight) * 100;
  
  const heightM = height / 100;
  const bmiActual = actualWeight / (heightM * heightM);
  const bmiIdeal = idealWeight / (heightM * heightM);

  // Determine weight category
  let weightCategory: string;
  if (actualWeight < idealWeight * 0.85) {
    weightCategory = 'Bajo peso (< 85% del peso ideal)';
  } else if (actualWeight <= idealWeight * 1.10) {
    weightCategory = 'Peso normal (85-110% del peso ideal)';
  } else if (actualWeight <= idealWeight * 1.20) {
    weightCategory = 'Sobrepeso ligero (110-120% del peso ideal)';
  } else if (actualWeight <= idealWeight * 1.40) {
    weightCategory = 'Sobrepeso moderado (120-140% del peso ideal)';
  } else {
    weightCategory = 'Obesidad (> 140% del peso ideal)';
  }

  // Clinical use guidance
  const clinicalUse = {
    useActualWeight: actualWeight <= idealWeight * 1.20,
    useIdealWeight: actualWeight < idealWeight * 0.90,
    useAdjustedWeight: actualWeight > idealWeight * 1.20,
    reason: actualWeight > idealWeight * 1.20
      ? 'Usa peso ajustado para cálculos clínicos (dosis medicamentos, calorías, proteínas)'
      : actualWeight < idealWeight * 0.90
      ? 'Usa peso ideal como objetivo terapéutico, pero calcula con peso actual para necesidades'
      : 'Usa peso actual para todos los cálculos nutricionales y clínicos'
  };

  // Protein needs (g/kg/day)
  const proteinRanges = {
    sedentary: { min: 0.8, max: 1.0 },
    active: { min: 1.2, max: 1.6 },
    athlete: { min: 1.6, max: 2.2 }
  };

  const proteinNeeds = {
    byActualWeight: {
      min: Math.round(actualWeight * 0.8),
      max: Math.round(actualWeight * 2.2)
    },
    byIdealWeight: {
      min: Math.round(idealWeight * 0.8),
      max: Math.round(idealWeight * 2.2)
    },
    byAdjustedWeight: {
      min: Math.round(adjustedWeight * 0.8),
      max: Math.round(adjustedWeight * 2.2)
    },
    recommended: actualWeight > idealWeight * 1.20
      ? `Usa peso ajustado (${adjustedWeight} kg): ${Math.round(adjustedWeight * 1.2)}-${Math.round(adjustedWeight * 1.8)} g/día`
      : actualWeight < idealWeight * 0.90
      ? `Usa peso ideal (${idealWeight} kg): ${Math.round(idealWeight * 1.2)}-${Math.round(idealWeight * 1.8)} g/día`
      : `Usa peso actual (${actualWeight} kg): ${Math.round(actualWeight * 1.2)}-${Math.round(actualWeight * 1.8)} g/día`
  };

  // Calorie needs estimation (using simple multiplier)
  const calorieMultiplier = 25; // kcal/kg/day for moderate activity
  const calorieNeeds = {
    byActualWeight: Math.round(actualWeight * calorieMultiplier),
    byIdealWeight: Math.round(idealWeight * calorieMultiplier),
    byAdjustedWeight: Math.round(adjustedWeight * calorieMultiplier),
    recommended: actualWeight > idealWeight * 1.20
      ? `${Math.round(adjustedWeight * calorieMultiplier)} kcal/día (basado en peso ajustado)`
      : actualWeight < idealWeight * 0.90
      ? `${Math.round(actualWeight * calorieMultiplier)} kcal/día (basado en peso actual para recuperación)`
      : `${Math.round(actualWeight * calorieMultiplier)} kcal/día (basado en peso actual)`
  };

  // Recommendations
  const recommendations: string[] = [];
  
  if (actualWeight > idealWeight * 1.40) {
    recommendations.push('IMPORTANTE: Consulta con médico y nutricionista para plan de pérdida de peso supervisado');
    recommendations.push('Usa siempre el peso ajustado para cálculos de medicamentos y necesidades nutricionales');
    recommendations.push('Objetivo realista: perder 0.5-1 kg por semana (déficit de 500-1000 kcal/día)');
    recommendations.push('Prioriza entrenamiento de fuerza para preservar masa muscular durante pérdida de peso');
  } else if (actualWeight > idealWeight * 1.20) {
    recommendations.push('Usa peso ajustado para cálculos clínicos más precisos');
    recommendations.push('Considera reducción gradual de peso: 5-10% en 6 meses');
    recommendations.push('Combina déficit calórico moderado con ejercicio regular');
  } else if (actualWeight < idealWeight * 0.85) {
    recommendations.push('IMPORTANTE: Evalúa con profesional de salud - posible desnutrición');
    recommendations.push('Enfócate en ganar peso saludablemente: superávit de 300-500 kcal/día');
    recommendations.push('Prioriza alimentos densos en nutrientes y proteína de calidad');
    recommendations.push('Considera entrenamiento de fuerza para ganar masa muscular, no solo grasa');
  } else {
    recommendations.push('Tu peso está en rango saludable - usa peso actual para cálculos');
    recommendations.push('Mantén hábitos saludables: actividad física regular y alimentación equilibrada');
    recommendations.push('Monitoriza peso cada 2-4 semanas para detectar cambios tempranos');
  }

  if (age && age > 65) {
    recommendations.push('A partir de 65 años: mantén peso estable, la pérdida involuntaria es factor de riesgo');
    recommendations.push('Aumenta ligeramente proteína: 1.0-1.2 g/kg/día para prevenir sarcopenia');
  }

  // Clinical applications
  const clinicalApplications = [
    'Cálculo de dosis de medicamentos (especialmente antibióticos y quimioterapia)',
    'Determinación de necesidades nutricionales en hospitalización',
    'Planificación de soporte nutricional enteral o parenteral',
    'Ajuste de líquidos intravenosos en pacientes críticos',
    'Prescripción de proteínas en enfermedad renal o hepática'
  ];

  // Important notes
  const importantNotes = [
    'El peso ajustado NO es un objetivo de peso saludable - es una herramienta clínica',
    'En obesidad mórbida (IMC > 40), algunos expertos recomiendan factor 0.25 en lugar de 0.4',
    'El peso ajustado es más preciso que peso actual para dosificación de fármacos lipofílicos',
    'En bajo peso extremo, usa el peso actual para evitar subestimar necesidades',
    'Siempre combina con evaluación de composición corporal para mayor precisión'
  ];

  return {
    actualWeight,
    idealWeight,
    adjustedWeight,
    weightDifference,
    percentageOverIdeal,
    bmiActual,
    bmiIdeal,
    weightCategory,
    clinicalUse,
    proteinNeeds,
    calorieNeeds,
    recommendations,
    clinicalApplications,
    importantNotes
  };
}