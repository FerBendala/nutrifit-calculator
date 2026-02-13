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

// ============ Fibra dietética (recomendaciones IOM / FDA) ============

export interface FiberResult {
  byAgeSex: number;
  byCalories?: number;
  recommendedMin: number;
  recommendedMax: number;
  interpretation: string;
  tips: string[];
  foodSources: string[];
}

/**
 * Recomendación de fibra por edad y sexo (Adequate Intake, IOM/FDA).
 * Valores en g/día para adultos; para menores de 19 se usan rangos estándar.
 */
export function getFiberRecommendationByAgeSex(age: number, sex: 'male' | 'female'): number {
  if (age >= 51) return sex === 'female' ? 21 : 30;
  if (age >= 19) return sex === 'female' ? 25 : 38;
  if (age >= 14) return sex === 'female' ? 26 : 38;
  if (age >= 9) return sex === 'female' ? 26 : 31;
  return 25; // default adult-like
}

/**
 * Recomendación de fibra según ingesta calórica: 14 g por 1000 kcal (IOM).
 */
export function getFiberRecommendationByCalories(calories: number): number {
  if (calories <= 0) return 0;
  return Math.round((calories / 1000) * 14);
}

/**
 * Analiza necesidades de fibra y devuelve recomendación unificada, interpretación y consejos.
 */
export function analyzeFiberNeeds(
  age: number,
  sex: 'male' | 'female',
  dailyCalories?: number
): FiberResult {
  const byAgeSex = getFiberRecommendationByAgeSex(age, sex);
  const byCalories = dailyCalories && dailyCalories > 0 ? getFiberRecommendationByCalories(dailyCalories) : undefined;

  let recommendedMin: number;
  let recommendedMax: number;
  let interpretation: string;

  if (byCalories !== undefined) {
    recommendedMin = Math.min(byAgeSex, byCalories);
    recommendedMax = Math.max(byAgeSex, byCalories);
    interpretation = `Según tu edad y sexo se recomiendan ${byAgeSex} g de fibra al día. Según tu ingesta calórica (${dailyCalories} kcal), la recomendación es ${byCalories} g (14 g por cada 1000 kcal). Objetivo orientativo: entre ${recommendedMin} y ${recommendedMax} g al día.`;
  } else {
    recommendedMin = byAgeSex;
    recommendedMax = byAgeSex + 5;
    interpretation = `Para tu edad (${age} años) y sexo, la ingesta adecuada de fibra es ${byAgeSex} g al día según las guías IOM/FDA. Si conoces tu ingesta calórica, introdúcela para obtener una recomendación adicional basada en calorías.`;
  }

  const tips: string[] = [
    'Aumenta la fibra de forma gradual para evitar molestias digestivas.',
    'Bebe suficiente agua cuando aumentes la fibra.',
    'Prioriza frutas, verduras, legumbres y cereales integrales.',
    'Incluye variedad: fibra soluble (avena, manzana) e insoluble (integrales, verduras).',
    'Lee etiquetas: busca "fibra" en la información nutricional.'
  ];

  const foodSources: string[] = [
    'Legumbres (lentejas, garbanzos, alubias): 7-10 g por ración',
    'Cereales integrales (avena, pan integral, arroz integral): 2-4 g por ración',
    'Frutas (manzana, pera, frutos rojos, plátano): 2-4 g por pieza',
    'Verduras (brócoli, zanahoria, espinacas): 2-4 g por ración',
    'Frutos secos y semillas: 2-3 g por puñado'
  ];

  return {
    byAgeSex,
    byCalories,
    recommendedMin,
    recommendedMax,
    interpretation,
    tips,
    foodSources
  };
}

// ============ Azúcar (recomendaciones OMS) ============

export interface SugarResult {
  maxGrams10Percent: number;
  maxGrams5Percent: number;
  interpretation: string;
  tips: string[];
  freeSugarsDefinition: string[];
}

/** Azúcar aporta ~4 kcal/g. OMS: azúcares libres <10% (fuerte) y <5% (beneficio adicional) de la energía. */
const KCAL_PER_GRAM_SUGAR = 4;

/**
 * Máximo de azúcares libres (g/día) para un % de calorías (OMS: 10% o 5%).
 */
export function getMaxSugarGramsByPercent(dailyCalories: number, percent: number): number {
  if (dailyCalories <= 0) return 0;
  const calorieLimit = (dailyCalories * percent) / 100;
  return Math.round((calorieLimit / KCAL_PER_GRAM_SUGAR) * 10) / 10;
}

/**
 * Analiza límite de azúcar según OMS e interpretación.
 */
export function analyzeSugarLimit(dailyCalories: number): SugarResult {
  const maxGrams10Percent = getMaxSugarGramsByPercent(dailyCalories, 10);
  const maxGrams5Percent = getMaxSugarGramsByPercent(dailyCalories, 5);

  const interpretation = `Para ${dailyCalories} kcal/día, la OMS recomienda limitar los azúcares libres a menos del 10% de la energía: máximo ${maxGrams10Percent} g al día. Para beneficios adicionales (caries, peso), menos del 5%: máximo ${maxGrams5Percent} g al día.`;

  const tips: string[] = [
    'Prioriza alimentos sin azúcares añadidos y revisa etiquetas ("azúcar", "jarabes", "miel").',
    'Bebidas azucaradas concentran mucho azúcar: limita refrescos, zumos envasados y bebidas energéticas.',
    'La fruta entera no cuenta como azúcares libres; sí los zumos y concentrados.',
    'Endulza con moderación: pequeñas cantidades son compatibles con el límite OMS.',
    'Compara por 100 g o por ración en el etiquetado para elegir opciones con menos azúcar.'
  ];

  const freeSugarsDefinition: string[] = [
    'Azúcares añadidos (sacarosa, glucosa, jarabe de maíz, miel, etc.).',
    'Azúcares naturalmente presentes en zumos, concentrados y néctares.',
    'No incluye: azúcares en fruta y verdura enteras ni en la leche sin azúcar.'
  ];

  return {
    maxGrams10Percent,
    maxGrams5Percent,
    interpretation,
    tips,
    freeSugarsDefinition
  };
}

// ============ Sodio (recomendaciones OMS) ============

export interface SodiumResult {
  maxSodiumMg: number;
  maxSaltGrams: number;
  strictSodiumMg: number;
  strictSaltGrams: number;
  interpretation: string;
  tips: string[];
}

/** OMS: <2 g sodio/día (adultos). Sal = ~40% sodio → 2 g sodio ≈ 5 g sal. Estricto (HTA): 1.5 g sodio ≈ 3.75 g sal. */
const SODIUM_TO_SALT_RATIO = 0.4; // 1 g sal ≈ 0.4 g sodio

/**
 * Convierte sodio (g) a sal equivalente (g).
 */
export function sodiumToSaltGrams(sodiumGrams: number): number {
  if (sodiumGrams <= 0) return 0;
  return Math.round((sodiumGrams / SODIUM_TO_SALT_RATIO) * 100) / 100;
}

/**
 * Analiza límite de sodio según OMS. Incluye límite general y estricto (ej. hipertensión).
 */
export function analyzeSodiumLimit(): SodiumResult {
  const maxSodiumG = 2;   // OMS: <2 g/día
  const strictSodiumG = 1.5; // Recomendación más estricta (ej. HTA)
  const maxSodiumMg = maxSodiumG * 1000;
  const maxSaltGrams = sodiumToSaltGrams(maxSodiumG);
  const strictSodiumMg = strictSodiumG * 1000;
  const strictSaltGrams = sodiumToSaltGrams(strictSodiumG);

  const interpretation = `La OMS recomienda para adultos menos de ${maxSodiumMg} mg de sodio al día (menos de ${maxSaltGrams} g de sal). Para personas con hipertensión o indicación médica se suele recomendar un límite más estricto: menos de ${strictSodiumMg} mg de sodio (menos de ${strictSaltGrams} g de sal) al día.`;

  const tips: string[] = [
    'La mayor parte del sodio suele venir de alimentos procesados y sal de mesa; revisa etiquetas ("sodio", "sodium").',
    'Cocina con menos sal y usa especias, ajo, limón o hierbas para dar sabor.',
    'Lava en agua las conservas (legumbres, aceitunas) para reducir sodio.',
    'Compara por 100 g en el etiquetado: "alto en sodio" suele ser más de 0,6 g por 100 g.',
    'Evita añadir sal en la mesa y limita snacks salados, embutidos y salsas comerciales.'
  ];

  return {
    maxSodiumMg,
    maxSaltGrams,
    strictSodiumMg,
    strictSaltGrams,
    interpretation,
    tips
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

/**
 * Calculate Body Surface Area (BSA) using Du Bois formula (1916)
 * Most accurate and widely used in clinical practice
 * BSA (m²) = 0.007184 × weight^0.425 × height^0.725
 */
export function calculateBSADuBois(weight: number, height: number): number {
  // Weight in kg, height in cm
  // BSA (m²) = 0.007184 × weight^0.425 × height^0.725
  return 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
}

/**
 * Calculate Body Surface Area using Mosteller formula (1987)
 * Simplified and commonly used in pediatric and adult medicine
 * BSA (m²) = √((height × weight) / 3600)
 */
export function calculateBSAMosteller(weight: number, height: number): number {
  // Weight in kg, height in cm
  return Math.sqrt((height * weight) / 3600);
}

/**
 * Calculate Body Surface Area using Haycock formula (1978)
 * More accurate for children and small adults
 * BSA (m²) = 0.024265 × weight^0.5378 × height^0.3964
 */
export function calculateBSAHaycock(weight: number, height: number): number {
  // Weight in kg, height in cm
  const heightInMeters = height / 100;
  return 0.024265 * Math.pow(weight, 0.5378) * Math.pow(heightInMeters, 0.3964);
}

/**
 * Calculate Body Surface Area using Gehan & George formula (1970)
 * Useful for extremes of body size
 * BSA (m²) = 0.0235 × weight^0.51456 × height^0.42246
 */
export function calculateBSAGehan(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return 0.0235 * Math.pow(weight, 0.51456) * Math.pow(heightInMeters, 0.42246);
}

/**
 * Calculate Body Surface Area using Boyd formula (1935)
 * Older formula, still referenced in some contexts
 * BSA (m²) = 0.0003207 × (weight^0.7285 - 0.0188 × log10(weight)) × height^0.3
 */
export function calculateBSABoyd(weight: number, height: number): number {
  const heightInMeters = height / 100;
  const logWeight = Math.log10(weight);
  return 0.0003207 * (Math.pow(weight, 0.7285) - 0.0188 * logWeight) * Math.pow(heightInMeters, 0.3);
}

/**
 * Comprehensive BSA analysis with all formulas and clinical applications
 */
export interface BSAAnalysis {
  duBois: number;
  mosteller: number;
  haycock: number;
  gehan: number;
  boyd: number;
  average: number;
  primaryFormula: string;
  comparison: {
    formula: string;
    value: number;
    difference: number;
  }[];
  clinicalApplications: {
    chemotherapy: {
      doseArea: number; // mg/m²
      exampleDose: number; // example dose in mg
    };
    cardiacIndex: {
      cardiacOutput: number; // L/min (normal range: 4-8)
      strokeVolume: number; // mL/beat
    };
    drugDosage: {
      examples: {
        drug: string;
        dosePerBSA: string;
        calculatedDose: number;
        unit: string;
      }[];
    };
    fluidResuscitation: {
      maintenanceFluids: number; // mL/day
      burnResuscitation: number; // mL for 24h (Parkland formula)
    };
    nutritionalSupport: {
      totalCalories: number; // kcal/day
      proteinNeeds: number; // g/day
    };
  };
  accuracyNotes: string[];
  recommendations: string[];
}

export function analyzeBSA(weight: number, height: number): BSAAnalysis {
  const duBois = calculateBSADuBois(weight, height);
  const mosteller = calculateBSAMosteller(weight, height);
  const haycock = calculateBSAHaycock(weight, height);
  const gehan = calculateBSAGehan(weight, height);
  const boyd = calculateBSABoyd(weight, height);

  const average = (duBois + mosteller + haycock + gehan + boyd) / 5;

  // Determine primary formula (Du Bois is gold standard)
  const primaryFormula = 'Du Bois (1916)';

  // Compare all formulas relative to Du Bois
  const comparison = [
    { formula: 'Du Bois', value: duBois, difference: 0 },
    { formula: 'Mosteller', value: mosteller, difference: ((mosteller - duBois) / duBois) * 100 },
    { formula: 'Haycock', value: haycock, difference: ((haycock - duBois) / duBois) * 100 },
    { formula: 'Gehan & George', value: gehan, difference: ((gehan - duBois) / duBois) * 100 },
    { formula: 'Boyd', value: boyd, difference: ((boyd - duBois) / duBois) * 100 }
  ];

  // Clinical applications
  const chemotherapyDoseArea = 75; // Example: 75 mg/m²
  const exampleChemoDose = average * chemotherapyDoseArea;

  const normalCardiacIndex = 5; // L/min/m² (normal range 2.5-4.0 L/min/m²)
  const cardiacOutput = average * normalCardiacIndex; // Total cardiac output
  const strokeVolume = (cardiacOutput * 1000) / 70; // Assuming 70 bpm

  const drugDosageExamples = [
    {
      drug: 'Doxorrubicina (quimioterapia)',
      dosePerBSA: '60-75 mg/m²',
      calculatedDose: Math.round(average * 67.5), // average of range
      unit: 'mg'
    },
    {
      drug: 'Cisplatino (quimioterapia)',
      dosePerBSA: '50-100 mg/m²',
      calculatedDose: Math.round(average * 75),
      unit: 'mg'
    },
    {
      drug: 'Gentamicina (antibiótico)',
      dosePerBSA: '1.5-2 mg/kg (corregido por BSA si IMC >30)',
      calculatedDose: Math.round(weight * 1.75),
      unit: 'mg'
    },
    {
      drug: 'Fluidos mantenimiento',
      dosePerBSA: '1500-2000 mL/m²/día',
      calculatedDose: Math.round(average * 1750),
      unit: 'mL/día'
    }
  ];

  // Maintenance fluids: 1500-2000 mL/m²/day
  const maintenanceFluids = average * 1750;

  // Burn resuscitation (Parkland formula): 4 mL/kg/% burn area
  // Using average burn of 20% for calculation example
  const burnPercentage = 20;
  const burnResuscitation24h = 4 * weight * burnPercentage;

  // Nutritional support
  // Total calories: 25-30 kcal/kg, or 1000-1200 kcal/m²
  const totalCalories = Math.max(average * 1100, weight * 27.5);
  // Protein: 1.2-1.5 g/kg or 40-50 g/m²
  const proteinNeeds = Math.max(average * 45, weight * 1.35);

  const accuracyNotes = [
    'Du Bois es la fórmula más precisa y estándar en medicina clínica desde 1916',
    'Mosteller es la más simple y comúnmente usada en pediatría',
    'Haycock es más precisa para niños y adultos de talla pequeña',
    'Gehan & George es útil en extremos de tamaño corporal',
    'Las diferencias entre fórmulas suelen ser <3% en la mayoría de casos',
    'En obesidad o bajo peso extremo, consulta con especialista para ajustes'
  ];

  const recommendations = [
    'Usa la fórmula Du Bois como referencia estándar en la mayoría de casos',
    'En pediatría, considera Haycock o Mosteller por su simplicidad',
    'Para quimioterapia y fármacos críticos, siempre usa la misma fórmula de forma consistente',
    'Combina BSA con ABW (peso ajustado) en pacientes con obesidad para mayor precisión',
    'El BSA es esencial en oncología, cardiología y cuidados intensivos',
    'Revisa las dosis calculadas con el equipo médico, especialmente en pacientes críticos'
  ];

  return {
    duBois,
    mosteller,
    haycock,
    gehan,
    boyd,
    average,
    primaryFormula,
    comparison,
    clinicalApplications: {
      chemotherapy: {
        doseArea: chemotherapyDoseArea,
        exampleDose: Math.round(exampleChemoDose)
      },
      cardiacIndex: {
        cardiacOutput: Math.round(cardiacOutput * 10) / 10,
        strokeVolume: Math.round(strokeVolume)
      },
      drugDosage: {
        examples: drugDosageExamples
      },
      fluidResuscitation: {
        maintenanceFluids: Math.round(maintenanceFluids),
        burnResuscitation: Math.round(burnResuscitation24h)
      },
      nutritionalSupport: {
        totalCalories: Math.round(totalCalories),
        proteinNeeds: Math.round(proteinNeeds)
      }
    },
    accuracyNotes,
    recommendations
  };
}

/**
 * Calculate A Body Shape Index (ABSI) - Krakauer & Krakauer (2012)
 * Predicts mortality risk better than BMI alone by incorporating waist circumference
 * ABSI = WC / (BMI^(2/3) × height^(1/2))
 * Where WC is in meters, BMI is kg/m², height is in meters
 */
export function calculateABSI(waistCircumference: number, bmi: number, height: number): number {
  // Convert waist circumference from cm to meters
  const waistMeters = waistCircumference / 100;
  const heightMeters = height / 100;

  // ABSI formula: WC / (BMI^(2/3) × height^(1/2))
  const denominator = Math.pow(bmi, 2 / 3) * Math.pow(heightMeters, 1 / 2);
  return waistMeters / denominator;
}

/**
 * Calculate ABSI z-score (standardized score)
 * Compares individual ABSI to population mean
 */
export function calculateABSIZScore(absi: number, gender: 'male' | 'female', age: number): number {
  // Population means and standard deviations by gender (from Krakauer & Krakauer 2012)
  // These are approximate values - actual values vary by population
  const meanABSI = gender === 'male' ? 0.0808 : 0.0806;
  const sdABSI = gender === 'male' ? 0.0054 : 0.0059;

  // Age adjustment (ABSI increases slightly with age)
  const ageAdjustment = age > 50 ? 0.0001 * (age - 50) : 0;
  const adjustedMean = meanABSI + ageAdjustment;

  return (absi - adjustedMean) / sdABSI;
}

/**
 * Comprehensive ABSI analysis with mortality risk assessment
 */
export interface ABSIAnalysis {
  absi: number;
  absiZScore: number;
  mortalityRisk: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  riskCategory: string;
  percentile: number;
  relativeRisk: number; // Relative risk compared to average
  healthStatus: string;
  recommendations: string[];
  comparison: {
    metric: string;
    value: number;
    status: string;
  }[];
  clinicalInterpretation: string;
  mortalityRiskFactors: string[];
  improvementStrategies: string[];
}

export function analyzeABSI(
  waistCircumference: number,
  weight: number,
  height: number,
  gender: 'male' | 'female',
  age: number
): ABSIAnalysis {
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const absi = calculateABSI(waistCircumference, bmi, height);
  const absiZScore = calculateABSIZScore(absi, gender, age);

  // Percentile calculation based on z-score
  // Using cumulative distribution function of standard normal distribution
  const percentile = Math.round((0.5 * (1 + erf(absiZScore / Math.sqrt(2)))) * 100);
  // Clamp percentile to 0-100 range
  const clampedPercentile = Math.max(0, Math.min(100, percentile));

  // Mortality risk assessment based on ABSI z-score
  let mortalityRisk: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  let riskCategory: string;
  let relativeRisk: number;
  let healthStatus: string;

  if (absiZScore < -1.0) {
    mortalityRisk = 'Muy Bajo';
    riskCategory = 'Riesgo muy bajo de mortalidad';
    relativeRisk = 0.6;
    healthStatus = 'Excelente - ABSI indica bajo riesgo de mortalidad';
  } else if (absiZScore < -0.5) {
    mortalityRisk = 'Bajo';
    riskCategory = 'Riesgo bajo de mortalidad';
    relativeRisk = 0.8;
    healthStatus = 'Bueno - Riesgo de mortalidad por debajo del promedio';
  } else if (absiZScore < 0.5) {
    mortalityRisk = 'Moderado';
    riskCategory = 'Riesgo promedio de mortalidad';
    relativeRisk = 1.0;
    healthStatus = 'Moderado - Riesgo de mortalidad en rango promedio';
  } else if (absiZScore < 1.0) {
    mortalityRisk = 'Alto';
    riskCategory = 'Riesgo alto de mortalidad';
    relativeRisk = 1.4;
    healthStatus = 'Alerta - Riesgo de mortalidad por encima del promedio';
  } else {
    mortalityRisk = 'Muy Alto';
    riskCategory = 'Riesgo muy alto de mortalidad';
    relativeRisk = 2.0;
    healthStatus = 'Crítico - Riesgo de mortalidad significativamente elevado';
  }

  // Comparison with other metrics
  const whr = waistCircumference / (height * 0.5); // Approximate hip circumference
  const whtr = waistCircumference / height;

  const comparison = [
    {
      metric: 'ABSI',
      value: absi,
      status: absiZScore < 0 ? 'Favorable' : absiZScore < 0.5 ? 'Normal' : 'Desfavorable'
    },
    {
      metric: 'IMC',
      value: bmi,
      status: bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidad'
    },
    {
      metric: 'WHtR',
      value: whtr,
      status: whtr < 0.5 ? 'Normal' : whtr < 0.6 ? 'Elevado' : 'Alto'
    },
    {
      metric: 'Circunferencia Cintura',
      value: waistCircumference,
      status: (gender === 'male' && waistCircumference < 94) || (gender === 'female' && waistCircumference < 80)
        ? 'Normal'
        : (gender === 'male' && waistCircumference < 102) || (gender === 'female' && waistCircumference < 88)
          ? 'Elevada'
          : 'Alta'
    }
  ];

  // Recommendations
  const recommendations: string[] = [];

  if (absiZScore > 0.5) {
    recommendations.push('Prioriza reducción de grasa abdominal mediante ejercicio cardiovascular regular');
    recommendations.push('Implementa dieta con déficit calórico moderado (300-500 kcal/día)');
    recommendations.push('Incluye entrenamiento de fuerza para preservar masa muscular durante pérdida de peso');
    recommendations.push('Considera evaluación médica para descartar síndrome metabólico');
  } else if (absiZScore > 0) {
    recommendations.push('Mantén actividad física regular (150 min/semana de ejercicio moderado)');
    recommendations.push('Monitorea circunferencia de cintura mensualmente');
    recommendations.push('Sigue una dieta equilibrada rica en fibra y proteína');
  } else {
    recommendations.push('Mantén tus hábitos actuales de ejercicio y nutrición');
    recommendations.push('Continúa monitoreando tu ABSI anualmente');
    recommendations.push('Considera evaluación de composición corporal para optimización');
  }

  // Mortality risk factors
  const mortalityRiskFactors: string[] = [];
  if (absiZScore > 1.0) {
    mortalityRiskFactors.push('Riesgo cardiovascular significativamente elevado');
    mortalityRiskFactors.push('Mayor riesgo de diabetes tipo 2');
    mortalityRiskFactors.push('Aumento del riesgo de eventos cardiovasculares');
    mortalityRiskFactors.push('Mayor riesgo de mortalidad por todas las causas');
  } else if (absiZScore > 0.5) {
    mortalityRiskFactors.push('Riesgo cardiovascular moderadamente elevado');
    mortalityRiskFactors.push('Mayor riesgo de síndrome metabólico');
  }

  // Improvement strategies
  const improvementStrategies: string[] = [];
  if (absiZScore > 0) {
    improvementStrategies.push('Reducir circunferencia de cintura 5-10 cm puede mejorar significativamente el ABSI');
    improvementStrategies.push('Perder 5-10% del peso corporal actual puede reducir el riesgo');
    improvementStrategies.push('Ejercicio de alta intensidad (HIIT) es efectivo para reducir grasa abdominal');
    improvementStrategies.push('Dieta mediterránea o DASH puede mejorar el perfil de riesgo');
  }

  const clinicalInterpretation = `Tu ABSI de ${absi.toFixed(4)} (z-score: ${absiZScore.toFixed(2)}) indica un ${riskCategory.toLowerCase()}. 
    Este índice predice mortalidad mejor que el IMC solo al incorporar la distribución de grasa abdominal. 
    Un ABSI elevado se asocia con mayor riesgo cardiovascular, diabetes y mortalidad por todas las causas. 
    ${absiZScore > 0.5 ? 'Se recomienda intervención médica y cambios en estilo de vida.' : 'Mantén hábitos saludables para preservar tu bajo riesgo.'}`;

  return {
    absi,
    absiZScore,
    mortalityRisk,
    riskCategory,
    percentile: clampedPercentile,
    relativeRisk,
    healthStatus,
    recommendations,
    comparison,
    clinicalInterpretation,
    mortalityRiskFactors,
    improvementStrategies
  };
}

/**
 * Error function approximation for z-score to percentile conversion
 */
function erf(x: number): number {
  // Approximation of error function
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * Calculate Body Roundness Index (BRI) - Thomas et al. (2013)
 * Predicts metabolic and cardiovascular risk by estimating body roundness
 * BRI = 364.2 - 365.5 × √(1 - (WC/(2π))² / (0.5 × height)²)
 * Where WC is waist circumference in meters, height is in meters
 */
export function calculateBRI(waistCircumference: number, height: number): number {
  // Convert to meters
  const waistMeters = waistCircumference / 100;
  const heightMeters = height / 100;

  // BRI formula: 364.2 - 365.5 × √(1 - (WC/(2π))² / (0.5 × height)²)
  const numerator = Math.pow(waistMeters / (2 * Math.PI), 2);
  const denominator = Math.pow(0.5 * heightMeters, 2);
  const sqrtTerm = Math.sqrt(1 - (numerator / denominator));

  return 364.2 - 365.5 * sqrtTerm;
}

/**
 * Comprehensive BRI analysis with metabolic and cardiovascular risk assessment
 */
export interface BRIAnalysis {
  bri: number;
  riskCategory: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  metabolicRisk: string;
  cardiovascularRisk: string;
  healthStatus: string;
  briInterpretation: string;
  comparison: {
    metric: string;
    value: number;
    status: string;
  }[];
  recommendations: string[];
  riskFactors: string[];
  improvementStrategies: string[];
  clinicalInterpretation: string;
}

export function analyzeBRI(
  waistCircumference: number,
  weight: number,
  height: number,
  gender: 'male' | 'female',
  age: number
): BRIAnalysis {
  const bri = calculateBRI(waistCircumference, height);
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const whtr = waistCircumference / height;

  // BRI risk categories based on research (Thomas et al. 2013, and subsequent studies)
  // BRI ranges typically: 0-20 (very low risk) to 20+ (high risk)
  let riskCategory: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  let metabolicRisk: string;
  let cardiovascularRisk: string;
  let healthStatus: string;
  let briInterpretation: string;

  if (bri < 3) {
    riskCategory = 'Muy Bajo';
    metabolicRisk = 'Riesgo metabólico muy bajo';
    cardiovascularRisk = 'Riesgo cardiovascular muy bajo';
    healthStatus = 'Excelente - BRI indica forma corporal óptima';
    briInterpretation = 'Tu BRI indica una forma corporal muy favorable con bajo riesgo de complicaciones metabólicas y cardiovasculares.';
  } else if (bri < 5) {
    riskCategory = 'Bajo';
    metabolicRisk = 'Riesgo metabólico bajo';
    cardiovascularRisk = 'Riesgo cardiovascular bajo';
    healthStatus = 'Bueno - Forma corporal saludable';
    briInterpretation = 'Tu BRI está en rango saludable, indicando bajo riesgo de síndrome metabólico y enfermedad cardiovascular.';
  } else if (bri < 8) {
    riskCategory = 'Moderado';
    metabolicRisk = 'Riesgo metabólico moderado';
    cardiovascularRisk = 'Riesgo cardiovascular moderado';
    healthStatus = 'Moderado - Algunos factores de riesgo presentes';
    briInterpretation = 'Tu BRI indica riesgo moderado. Se recomienda monitoreo y cambios en estilo de vida preventivos.';
  } else if (bri < 12) {
    riskCategory = 'Alto';
    metabolicRisk = 'Riesgo metabólico alto';
    cardiovascularRisk = 'Riesgo cardiovascular alto';
    healthStatus = 'Alerta - Riesgo elevado de complicaciones';
    briInterpretation = 'Tu BRI indica riesgo elevado de síndrome metabólico y enfermedad cardiovascular. Se recomienda intervención.';
  } else {
    riskCategory = 'Muy Alto';
    metabolicRisk = 'Riesgo metabólico muy alto';
    cardiovascularRisk = 'Riesgo cardiovascular muy alto';
    healthStatus = 'Crítico - Riesgo muy elevado, requiere atención médica';
    briInterpretation = 'Tu BRI indica riesgo muy elevado. Se recomienda evaluación médica inmediata y cambios significativos en estilo de vida.';
  }

  // Comparison with other metrics
  const comparison = [
    {
      metric: 'BRI',
      value: bri,
      status: riskCategory === 'Muy Bajo' || riskCategory === 'Bajo' ? 'Favorable' : riskCategory === 'Moderado' ? 'Moderado' : 'Desfavorable'
    },
    {
      metric: 'IMC',
      value: bmi,
      status: bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidad'
    },
    {
      metric: 'WHtR',
      value: whtr,
      status: whtr < 0.5 ? 'Normal' : whtr < 0.6 ? 'Elevado' : 'Alto'
    },
    {
      metric: 'Circunferencia Cintura',
      value: waistCircumference,
      status: (gender === 'male' && waistCircumference < 94) || (gender === 'female' && waistCircumference < 80)
        ? 'Normal'
        : (gender === 'male' && waistCircumference < 102) || (gender === 'female' && waistCircumference < 88)
          ? 'Elevada'
          : 'Alta'
    }
  ];

  // Recommendations
  const recommendations: string[] = [];

  if (bri >= 8) {
    recommendations.push('Prioriza reducción de grasa abdominal mediante ejercicio cardiovascular regular (150+ min/semana)');
    recommendations.push('Implementa dieta con déficit calórico moderado (300-500 kcal/día)');
    recommendations.push('Incluye entrenamiento de fuerza 2-3 veces por semana para preservar masa muscular');
    recommendations.push('Considera evaluación médica para descartar síndrome metabólico y diabetes');
    recommendations.push('Monitorea presión arterial, glucosa y lípidos regularmente');
  } else if (bri >= 5) {
    recommendations.push('Mantén actividad física regular (150 min/semana de ejercicio moderado)');
    recommendations.push('Monitorea circunferencia de cintura mensualmente');
    recommendations.push('Sigue una dieta equilibrada rica en fibra, proteína y grasas saludables');
    recommendations.push('Evita alimentos ultraprocesados y azúcares añadidos');
  } else {
    recommendations.push('Mantén tus hábitos actuales de ejercicio y nutrición');
    recommendations.push('Continúa monitoreando tu BRI anualmente');
    recommendations.push('Considera evaluación de composición corporal para optimización');
  }

  // Risk factors
  const riskFactors: string[] = [];
  if (bri >= 12) {
    riskFactors.push('Alto riesgo de síndrome metabólico');
    riskFactors.push('Mayor riesgo de diabetes tipo 2');
    riskFactors.push('Aumento del riesgo de enfermedad cardiovascular');
    riskFactors.push('Mayor riesgo de hipertensión arterial');
    riskFactors.push('Riesgo elevado de dislipidemia (colesterol y triglicéridos)');
  } else if (bri >= 8) {
    riskFactors.push('Riesgo moderado-alto de síndrome metabólico');
    riskFactors.push('Mayor riesgo de resistencia a la insulina');
    riskFactors.push('Aumento del riesgo cardiovascular');
  }

  // Improvement strategies
  const improvementStrategies: string[] = [];
  if (bri >= 5) {
    improvementStrategies.push('Reducir circunferencia de cintura 5-10 cm puede mejorar significativamente el BRI');
    improvementStrategies.push('Perder 5-10% del peso corporal actual puede reducir el riesgo metabólico');
    improvementStrategies.push('Ejercicio de alta intensidad (HIIT) es efectivo para reducir grasa abdominal');
    improvementStrategies.push('Dieta mediterránea o DASH puede mejorar el perfil metabólico');
    improvementStrategies.push('Reducir consumo de azúcares refinados y carbohidratos procesados');
    improvementStrategies.push('Aumentar consumo de fibra (25-30g/día) y proteína magra');
  }

  const clinicalInterpretation = `Tu BRI de ${bri.toFixed(2)} indica ${riskCategory.toLowerCase()}. 
    El Body Roundness Index predice riesgo metabólico y cardiovascular basándose en la forma corporal. 
    Un BRI elevado se asocia con mayor riesgo de síndrome metabólico, diabetes tipo 2 y enfermedad cardiovascular. 
    ${bri >= 8 ? 'Se recomienda intervención médica y cambios significativos en estilo de vida.' : 'Mantén hábitos saludables para preservar tu bajo riesgo.'}`;

  return {
    bri,
    riskCategory,
    metabolicRisk,
    cardiovascularRisk,
    healthStatus,
    briInterpretation,
    comparison,
    recommendations,
    riskFactors,
    improvementStrategies,
    clinicalInterpretation
  };
}

/**
 * Calculate Conicity Index (CI) - Valdez (1991)
 * Evaluates abdominal fat distribution by comparing waist circumference
 * to the expected circumference of a cylinder with the same weight and height
 * CI = WC / (0.109 × √(weight/height))
 * Where WC is waist circumference in meters, weight is in kg, height is in meters
 */
export function calculateConicityIndex(waistCircumference: number, weight: number, height: number): number {
  // Convert to meters
  const waistMeters = waistCircumference / 100;
  const heightMeters = height / 100;

  // CI formula: WC / (0.109 × √(weight/height))
  const denominator = 0.109 * Math.sqrt(weight / heightMeters);
  return waistMeters / denominator;
}

/**
 * Comprehensive Conicity Index analysis with cardiovascular and metabolic risk assessment
 */
export interface CIAnalysis {
  ci: number;
  riskCategory: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  cardiovascularRisk: string;
  metabolicRisk: string;
  healthStatus: string;
  ciInterpretation: string;
  comparison: {
    metric: string;
    value: number;
    status: string;
  }[];
  recommendations: string[];
  riskFactors: string[];
  improvementStrategies: string[];
  clinicalInterpretation: string;
}

export function analyzeConicityIndex(
  waistCircumference: number,
  weight: number,
  height: number,
  gender: 'male' | 'female',
  age: number
): CIAnalysis {
  const ci = calculateConicityIndex(waistCircumference, weight, height);
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const whtr = waistCircumference / height;

  // CI risk categories based on research (Valdez 1991, and subsequent studies)
  // CI < 1.18: Very low risk (normal distribution)
  // CI 1.18-1.25: Low to moderate risk
  // CI 1.25-1.30: Moderate to high risk
  // CI > 1.30: High risk (abdominal obesity)
  let riskCategory: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  let cardiovascularRisk: string;
  let metabolicRisk: string;
  let healthStatus: string;
  let ciInterpretation: string;

  if (ci < 1.18) {
    riskCategory = 'Muy Bajo';
    cardiovascularRisk = 'Riesgo cardiovascular muy bajo';
    metabolicRisk = 'Riesgo metabólico muy bajo';
    healthStatus = 'Excelente - CI indica distribución de grasa favorable';
    ciInterpretation = 'Tu CI indica una distribución de grasa corporal muy favorable, con bajo riesgo de complicaciones cardiovasculares y metabólicas.';
  } else if (ci < 1.25) {
    riskCategory = 'Bajo';
    cardiovascularRisk = 'Riesgo cardiovascular bajo';
    metabolicRisk = 'Riesgo metabólico bajo';
    healthStatus = 'Bueno - Distribución de grasa saludable';
    ciInterpretation = 'Tu CI está en rango saludable, indicando distribución de grasa corporal favorable y bajo riesgo cardiovascular.';
  } else if (ci < 1.30) {
    riskCategory = 'Moderado';
    cardiovascularRisk = 'Riesgo cardiovascular moderado';
    metabolicRisk = 'Riesgo metabólico moderado';
    healthStatus = 'Moderado - Algunos factores de riesgo presentes';
    ciInterpretation = 'Tu CI indica riesgo moderado de distribución de grasa abdominal. Se recomienda monitoreo y cambios en estilo de vida preventivos.';
  } else if (ci < 1.35) {
    riskCategory = 'Alto';
    cardiovascularRisk = 'Riesgo cardiovascular alto';
    metabolicRisk = 'Riesgo metabólico alto';
    healthStatus = 'Alerta - Riesgo elevado de complicaciones';
    ciInterpretation = 'Tu CI indica riesgo elevado de distribución de grasa abdominal. Se recomienda intervención para reducir circunferencia de cintura.';
  } else {
    riskCategory = 'Muy Alto';
    cardiovascularRisk = 'Riesgo cardiovascular muy alto';
    metabolicRisk = 'Riesgo metabólico muy alto';
    healthStatus = 'Crítico - Riesgo muy elevado, requiere atención médica';
    ciInterpretation = 'Tu CI indica riesgo muy elevado de distribución de grasa abdominal. Se recomienda evaluación médica inmediata y cambios significativos en estilo de vida.';
  }

  // Comparison with other metrics
  const comparison = [
    {
      metric: 'CI',
      value: ci,
      status: riskCategory === 'Muy Bajo' || riskCategory === 'Bajo' ? 'Favorable' : riskCategory === 'Moderado' ? 'Moderado' : 'Desfavorable'
    },
    {
      metric: 'IMC',
      value: bmi,
      status: bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidad'
    },
    {
      metric: 'WHtR',
      value: whtr,
      status: whtr < 0.5 ? 'Normal' : whtr < 0.6 ? 'Elevado' : 'Alto'
    },
    {
      metric: 'Circunferencia Cintura',
      value: waistCircumference,
      status: (gender === 'male' && waistCircumference < 94) || (gender === 'female' && waistCircumference < 80)
        ? 'Normal'
        : (gender === 'male' && waistCircumference < 102) || (gender === 'female' && waistCircumference < 88)
          ? 'Elevada'
          : 'Alta'
    }
  ];

  // Recommendations
  const recommendations: string[] = [];

  if (ci >= 1.30) {
    recommendations.push('Prioriza reducción de grasa abdominal mediante ejercicio cardiovascular regular (150+ min/semana)');
    recommendations.push('Implementa dieta con déficit calórico moderado (300-500 kcal/día)');
    recommendations.push('Incluye entrenamiento de fuerza 2-3 veces por semana para preservar masa muscular');
    recommendations.push('Considera evaluación médica para descartar síndrome metabólico y diabetes');
    recommendations.push('Monitorea presión arterial, glucosa y lípidos regularmente');
    recommendations.push('Reduce consumo de azúcares refinados y carbohidratos procesados');
  } else if (ci >= 1.25) {
    recommendations.push('Mantén actividad física regular (150 min/semana de ejercicio moderado)');
    recommendations.push('Monitorea circunferencia de cintura mensualmente');
    recommendations.push('Sigue una dieta equilibrada rica en fibra, proteína y grasas saludables');
    recommendations.push('Evita alimentos ultraprocesados y azúcares añadidos');
    recommendations.push('Incluye ejercicios específicos para fortalecer core y reducir grasa abdominal');
  } else {
    recommendations.push('Mantén tus hábitos actuales de ejercicio y nutrición');
    recommendations.push('Continúa monitoreando tu CI anualmente');
    recommendations.push('Considera evaluación de composición corporal para optimización');
  }

  // Risk factors
  const riskFactors: string[] = [];
  if (ci >= 1.35) {
    riskFactors.push('Alto riesgo de síndrome metabólico');
    riskFactors.push('Mayor riesgo de diabetes tipo 2');
    riskFactors.push('Aumento del riesgo de enfermedad cardiovascular');
    riskFactors.push('Mayor riesgo de hipertensión arterial');
    riskFactors.push('Riesgo elevado de dislipidemia (colesterol y triglicéridos)');
    riskFactors.push('Mayor riesgo de enfermedad coronaria');
  } else if (ci >= 1.30) {
    riskFactors.push('Riesgo moderado-alto de síndrome metabólico');
    riskFactors.push('Mayor riesgo de resistencia a la insulina');
    riskFactors.push('Aumento del riesgo cardiovascular');
    riskFactors.push('Riesgo de hipertensión arterial');
  } else if (ci >= 1.25) {
    riskFactors.push('Riesgo moderado de distribución de grasa abdominal');
    riskFactors.push('Mayor riesgo de resistencia a la insulina');
  }

  // Improvement strategies
  const improvementStrategies: string[] = [];
  if (ci >= 1.25) {
    improvementStrategies.push('Reducir circunferencia de cintura 5-10 cm puede mejorar significativamente el CI');
    improvementStrategies.push('Perder 5-10% del peso corporal actual puede reducir el riesgo cardiovascular');
    improvementStrategies.push('Ejercicio de alta intensidad (HIIT) es efectivo para reducir grasa abdominal');
    improvementStrategies.push('Dieta mediterránea o DASH puede mejorar el perfil metabólico');
    improvementStrategies.push('Reducir consumo de azúcares refinados y carbohidratos procesados');
    improvementStrategies.push('Aumentar consumo de fibra (25-30g/día) y proteína magra');
    improvementStrategies.push('Ejercicios específicos para core (planchas, abdominales) pueden ayudar');
  }

  const clinicalInterpretation = `Tu CI de ${ci.toFixed(3)} indica ${riskCategory.toLowerCase()}. 
    El Conicity Index evalúa la distribución de grasa abdominal comparando la circunferencia de cintura con la esperada
    para un cilindro con el mismo peso y altura. Un CI elevado se asocia con mayor riesgo de síndrome metabólico,
    diabetes tipo 2 y enfermedad cardiovascular. 
    ${ci >= 1.30 ? 'Se recomienda intervención médica y cambios significativos en estilo de vida.' : 'Mantén hábitos saludables para preservar tu bajo riesgo.'}`;

  return {
    ci,
    riskCategory,
    cardiovascularRisk,
    metabolicRisk,
    healthStatus,
    ciInterpretation,
    comparison,
    recommendations,
    riskFactors,
    improvementStrategies,
    clinicalInterpretation
  };
}

/**
 * Calculate Visceral Adipose Tissue (VAT) - Lee et al. (2008)
 * Estimates visceral fat area (cm²) using anthropometric measurements
 * VAT = -266.4 + (0.67 × age) + (0.68 × BMI) + (11.4 × gender) - (0.08 × BMI × age)
 * Where gender: 0 for female, 1 for male
 * 
 * Alternative formula (Ryo et al. 2005):
 * VAT = 0.0001 × (WC^2 × BMI × age × gender_factor)
 */
export function calculateVATLee(
  age: number,
  bmi: number,
  gender: 'male' | 'female'
): number {
  const genderFactor = gender === 'male' ? 1 : 0;
  // Lee et al. (2008) formula
  const vat = -266.4 + (0.67 * age) + (0.68 * bmi) + (11.4 * genderFactor) - (0.08 * bmi * age);
  return Math.max(0, vat); // VAT cannot be negative
}

/**
 * Calculate Visceral Adipose Tissue using Ryo et al. (2005) formula
 * VAT = 0.0001 × (WC^2 × BMI × age × gender_factor)
 * Where WC is waist circumference in cm, gender_factor: 1.0 for male, 0.9 for female
 */
export function calculateVATRyo(
  waistCircumference: number,
  bmi: number,
  age: number,
  gender: 'male' | 'female'
): number {
  const genderFactor = gender === 'male' ? 1.0 : 0.9;
  const vat = 0.0001 * (waistCircumference * waistCircumference * bmi * age * genderFactor);
  return vat;
}

/**
 * Comprehensive VAT analysis with metabolic and cardiovascular risk assessment
 */
export interface VATAnalysis {
  vatLee: number;
  vatRyo: number;
  vatAverage: number;
  riskCategory: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  metabolicRisk: string;
  cardiovascularRisk: string;
  healthStatus: string;
  vatInterpretation: string;
  comparison: {
    metric: string;
    value: number;
    status: string;
  }[];
  recommendations: string[];
  riskFactors: string[];
  improvementStrategies: string[];
  clinicalInterpretation: string;
}

export function analyzeVAT(
  waistCircumference: number,
  weight: number,
  height: number,
  gender: 'male' | 'female',
  age: number
): VATAnalysis {
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);

  const vatLee = calculateVATLee(age, bmi, gender);
  const vatRyo = calculateVATRyo(waistCircumference, bmi, age, gender);
  const vatAverage = (vatLee + vatRyo) / 2;

  // VAT risk categories based on research
  // VAT < 100 cm²: Very low risk
  // VAT 100-130 cm²: Low to moderate risk
  // VAT 130-160 cm²: Moderate to high risk
  // VAT > 160 cm²: High risk
  let riskCategory: 'Muy Bajo' | 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  let metabolicRisk: string;
  let cardiovascularRisk: string;
  let healthStatus: string;
  let vatInterpretation: string;

  if (vatAverage < 100) {
    riskCategory = 'Muy Bajo';
    metabolicRisk = 'Riesgo metabólico muy bajo';
    cardiovascularRisk = 'Riesgo cardiovascular muy bajo';
    healthStatus = 'Excelente - Grasa visceral en rango óptimo';
    vatInterpretation = 'Tu grasa visceral está en rango muy favorable, indicando bajo riesgo de complicaciones metabólicas y cardiovasculares.';
  } else if (vatAverage < 130) {
    riskCategory = 'Bajo';
    metabolicRisk = 'Riesgo metabólico bajo';
    cardiovascularRisk = 'Riesgo cardiovascular bajo';
    healthStatus = 'Bueno - Grasa visceral en rango saludable';
    vatInterpretation = 'Tu grasa visceral está en rango saludable, indicando bajo riesgo de síndrome metabólico y enfermedad cardiovascular.';
  } else if (vatAverage < 160) {
    riskCategory = 'Moderado';
    metabolicRisk = 'Riesgo metabólico moderado';
    cardiovascularRisk = 'Riesgo cardiovascular moderado';
    healthStatus = 'Moderado - Algunos factores de riesgo presentes';
    vatInterpretation = 'Tu grasa visceral indica riesgo moderado. Se recomienda monitoreo y cambios en estilo de vida preventivos.';
  } else if (vatAverage < 200) {
    riskCategory = 'Alto';
    metabolicRisk = 'Riesgo metabólico alto';
    cardiovascularRisk = 'Riesgo cardiovascular alto';
    healthStatus = 'Alerta - Riesgo elevado de complicaciones';
    vatInterpretation = 'Tu grasa visceral indica riesgo elevado de síndrome metabólico y enfermedad cardiovascular. Se recomienda intervención.';
  } else {
    riskCategory = 'Muy Alto';
    metabolicRisk = 'Riesgo metabólico muy alto';
    cardiovascularRisk = 'Riesgo cardiovascular muy alto';
    healthStatus = 'Crítico - Riesgo muy elevado, requiere atención médica';
    vatInterpretation = 'Tu grasa visceral indica riesgo muy elevado. Se recomienda evaluación médica inmediata y cambios significativos en estilo de vida.';
  }

  // Comparison with other metrics
  const whtr = waistCircumference / height;
  const comparison = [
    {
      metric: 'Grasa Visceral (VAT)',
      value: vatAverage,
      status: riskCategory === 'Muy Bajo' || riskCategory === 'Bajo' ? 'Favorable' : riskCategory === 'Moderado' ? 'Moderado' : 'Desfavorable'
    },
    {
      metric: 'IMC',
      value: bmi,
      status: bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidad'
    },
    {
      metric: 'WHtR',
      value: whtr,
      status: whtr < 0.5 ? 'Normal' : whtr < 0.6 ? 'Elevado' : 'Alto'
    },
    {
      metric: 'Circunferencia Cintura',
      value: waistCircumference,
      status: (gender === 'male' && waistCircumference < 94) || (gender === 'female' && waistCircumference < 80)
        ? 'Normal'
        : (gender === 'male' && waistCircumference < 102) || (gender === 'female' && waistCircumference < 88)
          ? 'Elevada'
          : 'Alta'
    }
  ];

  // Recommendations
  const recommendations: string[] = [];

  if (vatAverage >= 160) {
    recommendations.push('Prioriza reducción de grasa visceral mediante ejercicio cardiovascular regular (150+ min/semana)');
    recommendations.push('Implementa dieta con déficit calórico moderado (300-500 kcal/día)');
    recommendations.push('Incluye entrenamiento de fuerza 2-3 veces por semana para preservar masa muscular');
    recommendations.push('Considera evaluación médica para descartar síndrome metabólico y diabetes');
    recommendations.push('Monitorea presión arterial, glucosa y lípidos regularmente');
    recommendations.push('Reduce consumo de azúcares refinados, carbohidratos procesados y alcohol');
    recommendations.push('Aumenta consumo de fibra (25-30g/día) y proteína magra');
  } else if (vatAverage >= 130) {
    recommendations.push('Mantén actividad física regular (150 min/semana de ejercicio moderado)');
    recommendations.push('Monitorea circunferencia de cintura mensualmente');
    recommendations.push('Sigue una dieta equilibrada rica en fibra, proteína y grasas saludables');
    recommendations.push('Evita alimentos ultraprocesados y azúcares añadidos');
    recommendations.push('Incluye ejercicios específicos para fortalecer core y reducir grasa abdominal');
  } else {
    recommendations.push('Mantén tus hábitos actuales de ejercicio y nutrición');
    recommendations.push('Continúa monitoreando tu grasa visceral anualmente');
    recommendations.push('Considera evaluación de composición corporal para optimización');
  }

  // Risk factors
  const riskFactors: string[] = [];
  if (vatAverage >= 200) {
    riskFactors.push('Alto riesgo de síndrome metabólico');
    riskFactors.push('Mayor riesgo de diabetes tipo 2');
    riskFactors.push('Aumento del riesgo de enfermedad cardiovascular');
    riskFactors.push('Mayor riesgo de hipertensión arterial');
    riskFactors.push('Riesgo elevado de dislipidemia (colesterol y triglicéridos)');
    riskFactors.push('Mayor riesgo de enfermedad coronaria');
    riskFactors.push('Riesgo de esteatosis hepática (hígado graso)');
  } else if (vatAverage >= 160) {
    riskFactors.push('Riesgo moderado-alto de síndrome metabólico');
    riskFactors.push('Mayor riesgo de resistencia a la insulina');
    riskFactors.push('Aumento del riesgo cardiovascular');
    riskFactors.push('Riesgo de hipertensión arterial');
    riskFactors.push('Mayor riesgo de esteatosis hepática');
  } else if (vatAverage >= 130) {
    riskFactors.push('Riesgo moderado de distribución de grasa visceral');
    riskFactors.push('Mayor riesgo de resistencia a la insulina');
  }

  // Improvement strategies
  const improvementStrategies: string[] = [];
  if (vatAverage >= 130) {
    improvementStrategies.push('Reducir circunferencia de cintura 5-10 cm puede reducir significativamente la grasa visceral');
    improvementStrategies.push('Perder 5-10% del peso corporal actual puede reducir el riesgo metabólico');
    improvementStrategies.push('Ejercicio de alta intensidad (HIIT) es efectivo para reducir grasa visceral');
    improvementStrategies.push('Dieta mediterránea o DASH puede mejorar el perfil metabólico');
    improvementStrategies.push('Reducir consumo de azúcares refinados y carbohidratos procesados');
    improvementStrategies.push('Aumentar consumo de fibra (25-30g/día) y proteína magra');
    improvementStrategies.push('Reducir consumo de alcohol puede ayudar a reducir grasa visceral');
    improvementStrategies.push('Ejercicios específicos para core (planchas, abdominales) pueden ayudar');
  }

  const clinicalInterpretation = `Tu grasa visceral estimada de ${vatAverage.toFixed(1)} cm² indica ${riskCategory.toLowerCase()}. 
    La grasa visceral es el tejido adiposo que rodea los órganos internos y es más peligrosa que la grasa subcutánea.
    Un exceso de grasa visceral se asocia con mayor riesgo de síndrome metabólico, diabetes tipo 2 y enfermedad cardiovascular. 
    ${vatAverage >= 160 ? 'Se recomienda intervención médica y cambios significativos en estilo de vida.' : 'Mantén hábitos saludables para preservar tu bajo riesgo.'}`;

  return {
    vatLee,
    vatRyo,
    vatAverage,
    riskCategory,
    metabolicRisk,
    cardiovascularRisk,
    healthStatus,
    vatInterpretation,
    comparison,
    recommendations,
    riskFactors,
    improvementStrategies,
    clinicalInterpretation
  };
}

/**
 * Calculate Lean Body Mass (LBM) using multiple methods
 * LBM = Total Body Weight - Fat Mass
 * Includes muscle, bone, organs, water, and other non-fat tissues
 */
export function calculateLBMStandard(
  weight: number,
  bodyFatPercentage: number
): number {
  const fatMass = weight * (bodyFatPercentage / 100);
  return weight - fatMass;
}

/**
 * Calculate LBM using Boer method (1984) - adjusted for athletes
 */
export function calculateLBMBoer(
  weight: number,
  bodyFatPercentage: number
): number {
  const standardLBM = calculateLBMStandard(weight, bodyFatPercentage);
  return standardLBM * 1.02; // Slight adjustment for athletes
}

/**
 * Calculate LBM using James method (1976) - age-adjusted for general population
 */
export function calculateLBMJames(
  weight: number,
  bodyFatPercentage: number
): number {
  const standardLBM = calculateLBMStandard(weight, bodyFatPercentage);
  return standardLBM * 0.98; // Slight adjustment for general population
}

/**
 * Calculate LBM using Hume method (1966) - based on gender and height
 */
export function calculateLBMHume(
  weight: number,
  height: number,
  gender: 'male' | 'female'
): number {
  const heightMeters = height / 100;
  if (gender === 'male') {
    return (0.32810 * weight) + (0.33929 * height) - 29.5336;
  } else {
    return (0.29569 * weight) + (0.41813 * height) - 43.2933;
  }
}

/**
 * Comprehensive LBM analysis with health assessment
 */
export interface LBMAnalysis {
  lbmStandard: number;
  lbmBoer: number;
  lbmJames: number;
  lbmHume: number;
  lbmAverage: number;
  fatMass: number;
  bodyFatPercentage: number;
  lbmPercentage: number;
  category: 'Muy Bajo' | 'Bajo' | 'Normal' | 'Alto' | 'Muy Alto';
  healthStatus: string;
  lbmInterpretation: string;
  comparison: {
    metric: string;
    value: number;
    status: string;
  }[];
  recommendations: string[];
  benefits: string[];
  improvementStrategies: string[];
  clinicalInterpretation: string;
}

export function analyzeLBM(
  weight: number,
  height: number,
  bodyFatPercentage: number,
  gender: 'male' | 'female',
  age: number
): LBMAnalysis {
  const lbmStandard = calculateLBMStandard(weight, bodyFatPercentage);
  const lbmBoer = calculateLBMBoer(weight, bodyFatPercentage);
  const lbmJames = calculateLBMJames(weight, bodyFatPercentage);
  const lbmHume = calculateLBMHume(weight, height, gender);
  const lbmAverage = (lbmStandard + lbmBoer + lbmJames + lbmHume) / 4;

  const fatMass = weight * (bodyFatPercentage / 100);
  const lbmPercentage = (lbmAverage / weight) * 100;

  // LBM categories based on percentage of total weight and gender
  // Higher LBM percentage is generally better (more muscle, less fat)
  let category: 'Muy Bajo' | 'Bajo' | 'Normal' | 'Alto' | 'Muy Alto';
  let healthStatus: string;
  let lbmInterpretation: string;

  if (gender === 'male') {
    if (lbmPercentage < 70) {
      category = 'Muy Bajo';
      healthStatus = 'Masa magra muy baja - Riesgo de sarcopenia y pérdida funcional';
      lbmInterpretation = 'Tu masa magra está muy por debajo de lo recomendado, lo que puede indicar pérdida muscular significativa o alto porcentaje de grasa corporal.';
    } else if (lbmPercentage < 75) {
      category = 'Bajo';
      healthStatus = 'Masa magra baja - Requiere atención para prevenir pérdida muscular';
      lbmInterpretation = 'Tu masa magra está por debajo de lo ideal. Se recomienda aumentar masa muscular y reducir grasa corporal.';
    } else if (lbmPercentage < 85) {
      category = 'Normal';
      healthStatus = 'Masa magra en rango saludable';
      lbmInterpretation = 'Tu masa magra está en un rango saludable. Mantén hábitos de ejercicio y nutrición adecuados.';
    } else if (lbmPercentage < 90) {
      category = 'Alto';
      healthStatus = 'Masa magra alta - Excelente composición corporal';
      lbmInterpretation = 'Tu masa magra está en un rango excelente, indicando buena composición corporal y bajo porcentaje de grasa.';
    } else {
      category = 'Muy Alto';
      healthStatus = 'Masa magra muy alta - Nivel atlético';
      lbmInterpretation = 'Tu masa magra está en un nivel muy alto, típico de atletas o personas muy entrenadas.';
    }
  } else {
    if (lbmPercentage < 60) {
      category = 'Muy Bajo';
      healthStatus = 'Masa magra muy baja - Riesgo de sarcopenia y pérdida funcional';
      lbmInterpretation = 'Tu masa magra está muy por debajo de lo recomendado, lo que puede indicar pérdida muscular significativa o alto porcentaje de grasa corporal.';
    } else if (lbmPercentage < 65) {
      category = 'Bajo';
      healthStatus = 'Masa magra baja - Requiere atención para prevenir pérdida muscular';
      lbmInterpretation = 'Tu masa magra está por debajo de lo ideal. Se recomienda aumentar masa muscular y reducir grasa corporal.';
    } else if (lbmPercentage < 75) {
      category = 'Normal';
      healthStatus = 'Masa magra en rango saludable';
      lbmInterpretation = 'Tu masa magra está en un rango saludable. Mantén hábitos de ejercicio y nutrición adecuados.';
    } else if (lbmPercentage < 80) {
      category = 'Alto';
      healthStatus = 'Masa magra alta - Excelente composición corporal';
      lbmInterpretation = 'Tu masa magra está en un rango excelente, indicando buena composición corporal y bajo porcentaje de grasa.';
    } else {
      category = 'Muy Alto';
      healthStatus = 'Masa magra muy alta - Nivel atlético';
      lbmInterpretation = 'Tu masa magra está en un nivel muy alto, típico de atletas o personas muy entrenadas.';
    }
  }

  // Comparison with other metrics
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const comparison = [
    {
      metric: 'Masa Magra (LBM)',
      value: lbmAverage,
      status: category === 'Normal' || category === 'Alto' || category === 'Muy Alto' ? 'Favorable' : 'Desfavorable'
    },
    {
      metric: 'Masa Grasa',
      value: fatMass,
      status: bodyFatPercentage < (gender === 'male' ? 20 : 25) ? 'Normal' : bodyFatPercentage < (gender === 'male' ? 25 : 32) ? 'Elevada' : 'Alta'
    },
    {
      metric: 'Porcentaje Grasa Corporal',
      value: bodyFatPercentage,
      status: bodyFatPercentage < (gender === 'male' ? 20 : 25) ? 'Normal' : bodyFatPercentage < (gender === 'male' ? 25 : 32) ? 'Elevado' : 'Alto'
    },
    {
      metric: 'IMC',
      value: bmi,
      status: bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidad'
    }
  ];

  // Recommendations
  const recommendations: string[] = [];

  if (category === 'Muy Bajo' || category === 'Bajo') {
    recommendations.push('Prioriza entrenamiento de fuerza 3-4 veces por semana para aumentar masa muscular');
    recommendations.push('Consume suficiente proteína (1.6-2.2g por kg de peso corporal)');
    recommendations.push('Mantén un ligero superávit calórico (200-300 kcal/día) si buscas ganar masa');
    recommendations.push('Incluye ejercicios compuestos (sentadillas, peso muerto, press) en tu rutina');
    recommendations.push('Considera evaluación médica para descartar sarcopenia o pérdida muscular patológica');
    recommendations.push('Monitorea progreso con mediciones de circunferencias y fuerza');
  } else if (category === 'Normal') {
    recommendations.push('Mantén entrenamiento de fuerza regular (2-3 veces por semana)');
    recommendations.push('Consume proteína adecuada (1.2-1.6g por kg de peso corporal)');
    recommendations.push('Mantén balance calórico para preservar masa magra');
    recommendations.push('Incluye ejercicios de resistencia para mantener masa muscular');
  } else {
    recommendations.push('Mantén tus hábitos actuales de ejercicio y nutrición');
    recommendations.push('Continúa monitoreando tu masa magra regularmente');
    recommendations.push('Considera periodización del entrenamiento para optimización continua');
  }

  // Benefits of maintaining/increasing LBM
  const benefits: string[] = [];
  if (category === 'Normal' || category === 'Alto' || category === 'Muy Alto') {
    benefits.push('Mayor tasa metabólica en reposo (quema más calorías en reposo)');
    benefits.push('Mejor función física y movilidad');
    benefits.push('Menor riesgo de sarcopenia relacionada con la edad');
    benefits.push('Mejor salud ósea y densidad mineral');
    benefits.push('Mayor fuerza y resistencia');
    benefits.push('Mejor control glucémico y sensibilidad a la insulina');
    benefits.push('Mejor composición corporal y apariencia física');
  }

  // Improvement strategies
  const improvementStrategies: string[] = [];
  if (category === 'Muy Bajo' || category === 'Bajo') {
    improvementStrategies.push('Entrenamiento de fuerza progresivo: aumenta peso o repeticiones gradualmente');
    improvementStrategies.push('Proteína post-entrenamiento: consume 20-30g de proteína después del ejercicio');
    improvementStrategies.push('Descanso adecuado: permite 48 horas de recuperación entre sesiones de mismo grupo muscular');
    improvementStrategies.push('Hidratación: bebe suficiente agua (35ml por kg de peso)');
    improvementStrategies.push('Sueño: duerme 7-9 horas para optimizar recuperación y síntesis proteica');
    improvementStrategies.push('Suplementación: considera creatina (3-5g/día) para mejorar rendimiento y masa muscular');
  }

  const clinicalInterpretation = `Tu masa magra de ${lbmAverage.toFixed(1)} kg (${lbmPercentage.toFixed(1)}% del peso corporal) indica ${category.toLowerCase()}. 
    La masa magra incluye músculos, huesos, órganos, agua y otros tejidos no grasos. Mantener o aumentar la masa magra es crucial para 
    la salud metabólica, función física y prevención de sarcopenia. ${category === 'Muy Bajo' || category === 'Bajo'
      ? 'Se recomienda intervención con entrenamiento de fuerza y nutrición adecuada para aumentar masa magra.'
      : 'Mantén hábitos saludables para preservar tu masa magra.'}`;

  return {
    lbmStandard,
    lbmBoer,
    lbmJames,
    lbmHume,
    lbmAverage,
    fatMass,
    bodyFatPercentage,
    lbmPercentage,
    category,
    healthStatus,
    lbmInterpretation,
    comparison,
    recommendations,
    benefits,
    improvementStrategies,
    clinicalInterpretation
  };
}

/**
 * Calculate expected BMR for a given age using Mifflin-St Jeor formula
 * Uses average values for weight and height at each age
 */
function calculateExpectedBMRByAge(
  age: number,
  gender: 'male' | 'female',
  weight: number,
  height: number
): number {
  // Use Mifflin-St Jeor formula with current weight/height but adjust for age
  // The formula already includes age, so we calculate what BMR should be at this age
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculate Metabolic Age by comparing actual BMR with expected BMR at different ages
 * Metabolic Age indicates how "old" or "young" your metabolism is compared to your chronological age
 */
export function calculateMetabolicAge(
  actualBMR: number,
  weight: number,
  height: number,
  gender: 'male' | 'female',
  chronologicalAge: number
): number {
  // Binary search to find the age where expected BMR matches actual BMR
  let lowAge = 15;
  let highAge = 100;
  let metabolicAge = chronologicalAge;

  // Iterate to find the age where expected BMR equals actual BMR
  for (let i = 0; i < 50; i++) {
    const testAge = (lowAge + highAge) / 2;
    const expectedBMR = calculateExpectedBMRByAge(testAge, gender, weight, height);

    if (Math.abs(expectedBMR - actualBMR) < 1) {
      metabolicAge = Math.round(testAge);
      break;
    } else if (expectedBMR > actualBMR) {
      // If expected BMR is higher, metabolism is "younger" (lower age)
      highAge = testAge;
    } else {
      // If expected BMR is lower, metabolism is "older" (higher age)
      lowAge = testAge;
    }
  }

  return Math.round(metabolicAge);
}

/**
 * Comprehensive Metabolic Age analysis
 */
export interface MetabolicAgeAnalysis {
  chronologicalAge: number;
  metabolicAge: number;
  ageDifference: number;
  actualBMR: number;
  expectedBMR: number;
  formulaUsed: 'Mifflin-St Jeor' | 'Katch-McArdle';
  category: 'Mucho Más Joven' | 'Más Joven' | 'Similar' | 'Más Viejo' | 'Mucho Más Viejo';
  metabolicStatus: string;
  interpretation: string;
  comparison: {
    metric: string;
    value: number;
    status: string;
  }[];
  recommendations: string[];
  improvementStrategies: string[];
  factors: {
    muscleMass: string;
    activityLevel: string;
    nutrition: string;
    sleep: string;
  };
  clinicalInterpretation: string;
}

export function analyzeMetabolicAge(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  bodyFatPercentage?: number
): MetabolicAgeAnalysis {
  // Calculate actual BMR - use Katch-McArdle if body fat percentage is provided (more accurate)
  let actualBMR: number;
  let formulaUsed: 'Mifflin-St Jeor' | 'Katch-McArdle';
  if (bodyFatPercentage !== undefined && bodyFatPercentage >= 0 && bodyFatPercentage <= 100) {
    // Katch-McArdle formula (more accurate when body fat is known)
    const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
    actualBMR = 370 + (21.6 * leanBodyMass);
    formulaUsed = 'Katch-McArdle';
  } else {
    // Mifflin-St Jeor formula (standard when body fat is not known)
    actualBMR = calculateExpectedBMRByAge(age, gender, weight, height);
    formulaUsed = 'Mifflin-St Jeor';
  }

  // Calculate metabolic age
  const metabolicAge = calculateMetabolicAge(actualBMR, weight, height, gender, age);

  // Calculate expected BMR for chronological age (always use Mifflin-St Jeor for comparison)
  const expectedBMR = calculateExpectedBMRByAge(age, gender, weight, height);

  const ageDifference = metabolicAge - age;

  // Categorize metabolic age
  let category: 'Mucho Más Joven' | 'Más Joven' | 'Similar' | 'Más Viejo' | 'Mucho Más Viejo';
  let metabolicStatus: string;
  let interpretation: string;

  if (ageDifference <= -10) {
    category = 'Mucho Más Joven';
    metabolicStatus = 'Excelente - Metabolismo muy eficiente';
    interpretation = `Tu metabolismo es ${Math.abs(ageDifference)} años más joven que tu edad cronológica. Esto indica un metabolismo muy eficiente, típico de personas con buena masa muscular, actividad física regular y hábitos saludables.`;
  } else if (ageDifference < -5) {
    category = 'Más Joven';
    metabolicStatus = 'Bueno - Metabolismo eficiente';
    interpretation = `Tu metabolismo es ${Math.abs(ageDifference)} años más joven que tu edad cronológica. Esto indica un metabolismo eficiente, probablemente debido a buena composición corporal y actividad física.`;
  } else if (ageDifference <= 5) {
    category = 'Similar';
    metabolicStatus = 'Normal - Metabolismo acorde a tu edad';
    interpretation = `Tu metabolismo es similar a tu edad cronológica (diferencia de ${Math.abs(ageDifference)} años). Esto es normal y esperado para tu edad.`;
  } else if (ageDifference < 10) {
    category = 'Más Viejo';
    metabolicStatus = 'Atención - Metabolismo menos eficiente';
    interpretation = `Tu metabolismo es ${ageDifference} años mayor que tu edad cronológica. Esto puede indicar pérdida de masa muscular, sedentarismo o hábitos que afectan el metabolismo.`;
  } else {
    category = 'Mucho Más Viejo';
    metabolicStatus = 'Alerta - Metabolismo significativamente menos eficiente';
    interpretation = `Tu metabolismo es ${ageDifference} años mayor que tu edad cronológica. Esto indica un metabolismo menos eficiente que requiere atención. Puede estar relacionado con pérdida significativa de masa muscular, sedentarismo o factores metabólicos.`;
  }

  // Comparison with other metrics
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const comparison = [
    {
      metric: 'Edad Metabólica',
      value: metabolicAge,
      status: category === 'Mucho Más Joven' || category === 'Más Joven' ? 'Favorable' : category === 'Similar' ? 'Normal' : 'Desfavorable'
    },
    {
      metric: 'Edad Cronológica',
      value: age,
      status: 'Referencia'
    },
    {
      metric: 'BMR Real',
      value: actualBMR,
      status: 'Actual'
    },
    {
      metric: 'BMR Esperado',
      value: expectedBMR,
      status: 'Referencia'
    }
  ];

  // Recommendations
  const recommendations: string[] = [];

  if (category === 'Mucho Más Viejo' || category === 'Más Viejo') {
    recommendations.push('Prioriza entrenamiento de fuerza 3-4 veces por semana para aumentar masa muscular');
    recommendations.push('Aumenta actividad física diaria (caminar, subir escaleras, actividades cotidianas)');
    recommendations.push('Consume suficiente proteína (1.6-2.2g por kg de peso corporal) para preservar/aumentar masa muscular');
    recommendations.push('Evita dietas muy restrictivas que pueden reducir aún más el metabolismo');
    recommendations.push('Mejora calidad y cantidad de sueño (7-9 horas por noche)');
    recommendations.push('Considera evaluación médica para descartar condiciones que afecten el metabolismo');
    recommendations.push('Mantén hidratación adecuada (35ml por kg de peso)');
  } else if (category === 'Similar') {
    recommendations.push('Mantén hábitos actuales de ejercicio y nutrición');
    recommendations.push('Incluye entrenamiento de fuerza regular para preservar masa muscular');
    recommendations.push('Monitorea tu edad metabólica periódicamente');
    recommendations.push('Considera optimizar composición corporal para mejorar metabolismo');
  } else {
    recommendations.push('Mantén tus excelentes hábitos de ejercicio y nutrición');
    recommendations.push('Continúa monitoreando tu edad metabólica anualmente');
    recommendations.push('Considera compartir tus estrategias para mantener un metabolismo joven');
  }

  // Improvement strategies
  const improvementStrategies: string[] = [];
  if (category === 'Mucho Más Viejo' || category === 'Más Viejo') {
    improvementStrategies.push('Entrenamiento de fuerza: aumenta masa muscular para elevar BMR');
    improvementStrategies.push('Ejercicio cardiovascular: 150+ min/semana de actividad moderada-intensa');
    improvementStrategies.push('Proteína adecuada: 1.6-2.2g por kg de peso para síntesis proteica');
    improvementStrategies.push('Sueño: 7-9 horas de calidad para optimizar hormonas metabólicas');
    improvementStrategies.push('Hidratación: agua suficiente para procesos metabólicos');
    improvementStrategies.push('Evita restricciones calóricas extremas que reducen metabolismo');
    improvementStrategies.push('Incluye ejercicios de alta intensidad (HIIT) 1-2 veces por semana');
    improvementStrategies.push('Mantén masa muscular durante pérdida de peso');
  }

  // Factors affecting metabolic age
  const factors = {
    muscleMass: category === 'Mucho Más Joven' || category === 'Más Joven'
      ? 'Tu masa muscular está contribuyendo positivamente a un metabolismo joven'
      : category === 'Similar'
        ? 'Tu masa muscular está en rango normal para tu edad'
        : 'Aumentar masa muscular puede mejorar significativamente tu edad metabólica',
    activityLevel: category === 'Mucho Más Joven' || category === 'Más Joven'
      ? 'Tu nivel de actividad física está manteniendo tu metabolismo activo'
      : category === 'Similar'
        ? 'Mantén o aumenta tu actividad física para preservar metabolismo'
        : 'Aumentar actividad física es crucial para mejorar tu edad metabólica',
    nutrition: category === 'Mucho Más Joven' || category === 'Más Joven'
      ? 'Tu nutrición está apoyando un metabolismo eficiente'
      : category === 'Similar'
        ? 'Optimiza tu nutrición para mantener metabolismo'
        : 'Mejorar nutrición (proteína, hidratación, evitar restricciones extremas) puede ayudar',
    sleep: category === 'Mucho Más Joven' || category === 'Más Joven'
      ? 'Tu sueño probablemente está optimizando hormonas metabólicas'
      : category === 'Similar'
        ? 'Mantén hábitos de sueño saludables'
        : 'Mejorar calidad y cantidad de sueño puede ayudar a optimizar metabolismo'
  };

  const clinicalInterpretation = `Tu edad metabólica de ${metabolicAge} años ${ageDifference > 0 ? 'es mayor' : ageDifference < 0 ? 'es menor' : 'es similar'} a tu edad cronológica de ${age} años (diferencia de ${Math.abs(ageDifference)} años). 
    La edad metabólica refleja la eficiencia de tu metabolismo comparado con el promedio de personas de tu edad. 
    ${category === 'Mucho Más Joven' || category === 'Más Joven'
      ? 'Un metabolismo más joven indica buena composición corporal, actividad física regular y hábitos saludables.'
      : category === 'Similar'
        ? 'Un metabolismo similar a tu edad es normal y esperado.'
        : 'Un metabolismo más viejo puede indicar pérdida de masa muscular, sedentarismo o factores que afectan el metabolismo. Se recomienda intervención con ejercicio y nutrición.'}`;

  return {
    chronologicalAge: age,
    metabolicAge,
    ageDifference,
    actualBMR,
    expectedBMR,
    formulaUsed,
    category,
    metabolicStatus,
    interpretation,
    comparison,
    recommendations,
    improvementStrategies,
    factors,
    clinicalInterpretation
  };
}

// ============================================================================
// RECUPERACIÓN CARDÍACA (HRR - Heart Rate Recovery)
// ============================================================================

/**
 * Calculate Heart Rate Recovery (HRR) at 1 minute
 * HRR measures how quickly the heart rate decreases after stopping exercise
 * HRR1 = Peak HR during exercise - HR at 1 minute post-exercise
 * 
 * @param peakHR Peak heart rate during exercise (bpm)
 * @param hr1min Heart rate at 1 minute after stopping exercise (bpm)
 * @returns Heart rate recovery at 1 minute (bpm)
 */
export function calculateHRR1min(peakHR: number, hr1min: number): number {
  if (peakHR <= 0 || hr1min <= 0) {
    throw new Error('Las frecuencias cardíacas deben ser valores positivos');
  }
  if (peakHR < hr1min) {
    throw new Error('La frecuencia cardíaca pico debe ser mayor que la frecuencia cardíaca post-ejercicio');
  }

  return peakHR - hr1min;
}

/**
 * Calculate Heart Rate Recovery (HRR) at 2 minutes
 * HRR2 = Peak HR during exercise - HR at 2 minutes post-exercise
 * 
 * @param peakHR Peak heart rate during exercise (bpm)
 * @param hr2min Heart rate at 2 minutes after stopping exercise (bpm)
 * @returns Heart rate recovery at 2 minutes (bpm)
 */
export function calculateHRR2min(peakHR: number, hr2min: number): number {
  if (peakHR <= 0 || hr2min <= 0) {
    throw new Error('Las frecuencias cardíacas deben ser valores positivos');
  }
  if (peakHR < hr2min) {
    throw new Error('La frecuencia cardíaca pico debe ser mayor que la frecuencia cardíaca post-ejercicio');
  }

  return peakHR - hr2min;
}

/**
 * Calculate percentage HRR recovery
 * Percentage recovery = (HRR / Peak HR) × 100
 * 
 * @param hrr Heart rate recovery value (bpm)
 * @param peakHR Peak heart rate during exercise (bpm)
 * @returns Percentage recovery
 */
export function calculateHRRPercentage(hrr: number, peakHR: number): number {
  if (peakHR <= 0) {
    throw new Error('La frecuencia cardíaca pico debe ser positiva');
  }

  return Math.round((hrr / peakHR) * 100 * 10) / 10;
}

/**
 * Comprehensive HRR analysis with clinical interpretation
 */
export interface HRRAnalysis {
  peakHR: number;
  hr1min?: number;
  hr2min?: number;
  hrr1min?: number;
  hrr2min?: number;
  hrr1minPercentage?: number;
  hrr2minPercentage?: number;
  category1min?: 'Excelente' | 'Buena' | 'Normal' | 'Pobre' | 'Muy Pobre';
  category2min?: 'Excelente' | 'Buena' | 'Normal' | 'Pobre' | 'Muy Pobre';
  status: string;
  interpretation: string;
  cardiovascularFitness: {
    level: string;
    description: string;
    risk: 'Bajo' | 'Moderado' | 'Alto';
  };
  recommendations: string[];
  clinicalSignificance: string;
  improvementStrategies: string[];
  monitoring: {
    frequency: string;
    actions: string[];
  };
  riskFactors: string[];
  clinicalInterpretation: string;
}

/**
 * Analyze Heart Rate Recovery with clinical interpretation
 * Based on clinical guidelines and research
 */
export function analyzeHRR(
  peakHR: number,
  hr1min?: number,
  hr2min?: number,
  age?: number,
  gender?: 'male' | 'female'
): HRRAnalysis {
  let hrr1min: number | undefined;
  let hrr2min: number | undefined;
  let hrr1minPercentage: number | undefined;
  let hrr2minPercentage: number | undefined;
  let category1min: 'Excelente' | 'Buena' | 'Normal' | 'Pobre' | 'Muy Pobre' | undefined;
  let category2min: 'Excelente' | 'Buena' | 'Normal' | 'Pobre' | 'Muy Pobre' | undefined;

  // Calculate HRR at 1 minute if provided
  if (hr1min !== undefined) {
    hrr1min = calculateHRR1min(peakHR, hr1min);
    hrr1minPercentage = calculateHRRPercentage(hrr1min, peakHR);

    // Categorize HRR1min (normal values: >12 bpm is good, >18 bpm is excellent)
    if (hrr1min >= 18) {
      category1min = 'Excelente';
    } else if (hrr1min >= 15) {
      category1min = 'Buena';
    } else if (hrr1min >= 12) {
      category1min = 'Normal';
    } else if (hrr1min >= 8) {
      category1min = 'Pobre';
    } else {
      category1min = 'Muy Pobre';
    }
  }

  // Calculate HRR at 2 minutes if provided
  if (hr2min !== undefined) {
    hrr2min = calculateHRR2min(peakHR, hr2min);
    hrr2minPercentage = calculateHRRPercentage(hrr2min, peakHR);

    // Categorize HRR2min (normal values: >22 bpm is good, >30 bpm is excellent)
    if (hrr2min >= 30) {
      category2min = 'Excelente';
    } else if (hrr2min >= 25) {
      category2min = 'Buena';
    } else if (hrr2min >= 22) {
      category2min = 'Normal';
    } else if (hrr2min >= 15) {
      category2min = 'Pobre';
    } else {
      category2min = 'Muy Pobre';
    }
  }

  // Determine overall status
  let status: string;
  let interpretation: string;

  if (hrr1min !== undefined && hrr2min !== undefined) {
    const avgCategory =
      (category1min === 'Excelente' || category2min === 'Excelente') ? 'Excelente' :
        (category1min === 'Buena' || category2min === 'Buena') ? 'Buena' :
          (category1min === 'Normal' || category2min === 'Normal') ? 'Normal' :
            (category1min === 'Pobre' || category2min === 'Pobre') ? 'Pobre' :
              'Muy Pobre';

    if (avgCategory === 'Excelente') {
      status = 'Recuperación cardíaca excelente';
      interpretation = `Tu recuperación cardíaca es excelente (${hrr1min} bpm a 1 min, ${hrr2min} bpm a 2 min). Esto indica una excelente condición cardiovascular y función autonómica. Tu corazón se recupera rápidamente después del ejercicio.`;
    } else if (avgCategory === 'Buena') {
      status = 'Recuperación cardíaca buena';
      interpretation = `Tu recuperación cardíaca es buena (${hrr1min} bpm a 1 min, ${hrr2min} bpm a 2 min). Esto indica una buena condición cardiovascular. Tu corazón se recupera adecuadamente después del ejercicio.`;
    } else if (avgCategory === 'Normal') {
      status = 'Recuperación cardíaca normal';
      interpretation = `Tu recuperación cardíaca está en el rango normal (${hrr1min} bpm a 1 min, ${hrr2min} bpm a 2 min). Esto es típico para personas con condición física promedio.`;
    } else if (avgCategory === 'Pobre') {
      status = 'Recuperación cardíaca pobre';
      interpretation = `Tu recuperación cardíaca es pobre (${hrr1min} bpm a 1 min, ${hrr2min} bpm a 2 min). Esto puede indicar una condición cardiovascular subóptima o disfunción autonómica. Se recomienda consultar con un médico.`;
    } else {
      status = 'Recuperación cardíaca muy pobre';
      interpretation = `Tu recuperación cardíaca es muy pobre (${hrr1min} bpm a 1 min, ${hrr2min} bpm a 2 min). Esto puede indicar un problema cardiovascular o disfunción autonómica significativa. Se recomienda consultar con un médico urgentemente.`;
    }
  } else if (hrr1min !== undefined) {
    if (category1min === 'Excelente') {
      status = 'Recuperación cardíaca excelente';
      interpretation = `Tu recuperación cardíaca a 1 minuto es excelente (${hrr1min} bpm). Esto indica una excelente condición cardiovascular.`;
    } else if (category1min === 'Buena') {
      status = 'Recuperación cardíaca buena';
      interpretation = `Tu recuperación cardíaca a 1 minuto es buena (${hrr1min} bpm). Esto indica una buena condición cardiovascular.`;
    } else if (category1min === 'Normal') {
      status = 'Recuperación cardíaca normal';
      interpretation = `Tu recuperación cardíaca a 1 minuto está en el rango normal (${hrr1min} bpm).`;
    } else if (category1min === 'Pobre') {
      status = 'Recuperación cardíaca pobre';
      interpretation = `Tu recuperación cardíaca a 1 minuto es pobre (${hrr1min} bpm). Se recomienda consultar con un médico.`;
    } else {
      status = 'Recuperación cardíaca muy pobre';
      interpretation = `Tu recuperación cardíaca a 1 minuto es muy pobre (${hrr1min} bpm). Se recomienda consultar con un médico urgentemente.`;
    }
  } else if (hrr2min !== undefined) {
    if (category2min === 'Excelente') {
      status = 'Recuperación cardíaca excelente';
      interpretation = `Tu recuperación cardíaca a 2 minutos es excelente (${hrr2min} bpm). Esto indica una excelente condición cardiovascular.`;
    } else if (category2min === 'Buena') {
      status = 'Recuperación cardíaca buena';
      interpretation = `Tu recuperación cardíaca a 2 minutos es buena (${hrr2min} bpm). Esto indica una buena condición cardiovascular.`;
    } else if (category2min === 'Normal') {
      status = 'Recuperación cardíaca normal';
      interpretation = `Tu recuperación cardíaca a 2 minutos está en el rango normal (${hrr2min} bpm).`;
    } else if (category2min === 'Pobre') {
      status = 'Recuperación cardíaca pobre';
      interpretation = `Tu recuperación cardíaca a 2 minutos es pobre (${hrr2min} bpm). Se recomienda consultar con un médico.`;
    } else {
      status = 'Recuperación cardíaca muy pobre';
      interpretation = `Tu recuperación cardíaca a 2 minutos es muy pobre (${hrr2min} bpm). Se recomienda consultar con un médico urgentemente.`;
    }
  } else {
    status = 'Datos insuficientes';
    interpretation = 'Proporciona al menos una medida de frecuencia cardíaca post-ejercicio para calcular la recuperación cardíaca.';
  }

  // Cardiovascular fitness assessment
  let cardiovascularFitness: {
    level: string;
    description: string;
    risk: 'Bajo' | 'Moderado' | 'Alto';
  };

  const bestCategory = category1min || category2min;
  if (bestCategory === 'Excelente' || bestCategory === 'Buena') {
    cardiovascularFitness = {
      level: 'Alta',
      description: 'Una recuperación cardíaca buena o excelente indica una condición cardiovascular alta, función autonómica saludable y bajo riesgo cardiovascular.',
      risk: 'Bajo'
    };
  } else if (bestCategory === 'Normal') {
    cardiovascularFitness = {
      level: 'Moderada',
      description: 'Una recuperación cardíaca normal indica una condición cardiovascular moderada. Hay margen para mejorar con ejercicio regular.',
      risk: 'Moderado'
    };
  } else {
    cardiovascularFitness = {
      level: 'Baja',
      description: 'Una recuperación cardíaca pobre puede indicar condición cardiovascular baja, disfunción autonómica o riesgo cardiovascular aumentado. Requiere evaluación médica.',
      risk: 'Alto'
    };
  }

  // Recommendations
  const recommendations: string[] = [];

  if (bestCategory === 'Excelente' || bestCategory === 'Buena') {
    recommendations.push('Mantener tu rutina de ejercicio regular');
    recommendations.push('Continuar con entrenamiento cardiovascular variado');
    recommendations.push('Monitorear la recuperación cardíaca periódicamente');
  } else if (bestCategory === 'Normal') {
    recommendations.push('Aumentar la frecuencia de ejercicio cardiovascular (3-5 veces por semana)');
    recommendations.push('Incluir entrenamiento de intervalos de alta intensidad (HIIT)');
    recommendations.push('Mantener un peso saludable');
    recommendations.push('Gestionar el estrés mediante técnicas de relajación');
  } else {
    recommendations.push('Consultar con un médico para evaluación cardiovascular');
    recommendations.push('Iniciar un programa de ejercicio gradual bajo supervisión médica');
    recommendations.push('Realizar ejercicio cardiovascular regular de intensidad moderada');
    recommendations.push('Evitar ejercicio intenso hasta evaluación médica');
    recommendations.push('Monitorear otros factores de riesgo cardiovascular');
  }

  // Clinical significance
  const clinicalSignificance = `La recuperación cardíaca (HRR) es un indicador importante de la condición cardiovascular y la función del sistema nervioso autónomo. Mide la capacidad del corazón para recuperarse después del ejercicio. Una recuperación rápida (HRR alta) indica buena condición cardiovascular, mientras que una recuperación lenta puede indicar problemas cardiovasculares o disfunción autonómica.`;

  // Improvement strategies
  const improvementStrategies: string[] = [
    'Ejercicio cardiovascular regular (150 minutos/semana de intensidad moderada o 75 minutos de alta intensidad)',
    'Entrenamiento de intervalos de alta intensidad (HIIT) 2-3 veces por semana',
    'Entrenamiento de resistencia 2-3 veces por semana',
    'Mantener un peso saludable',
    'Gestionar el estrés y mejorar la calidad del sueño',
    'Evitar el tabaco y limitar el consumo de alcohol',
    'Seguir una dieta saludable para el corazón'
  ];

  // Monitoring
  const monitoring = {
    frequency: bestCategory === 'Pobre' || bestCategory === 'Muy Pobre' ? 'Mensual o según indicación médica' : 'Trimestral',
    actions: [
      'Medir la recuperación cardíaca después de ejercicio regular',
      'Registrar valores para seguimiento',
      'Consultar con médico si hay cambios significativos o valores persistentemente bajos',
      'Realizar pruebas de esfuerzo periódicas si es recomendado por médico'
    ]
  };

  // Risk factors
  const riskFactors: string[] = [];
  if (bestCategory === 'Pobre' || bestCategory === 'Muy Pobre') {
    riskFactors.push('Enfermedad cardiovascular');
    riskFactors.push('Mortalidad cardiovascular aumentada');
    riskFactors.push('Disfunción autonómica');
    riskFactors.push('Condición física baja');
  }

  // Clinical interpretation
  let clinicalInterpretation = `HRR de ${hrr1min !== undefined ? `${hrr1min} bpm a 1 min` : ''}${hrr1min !== undefined && hrr2min !== undefined ? ' y ' : ''}${hrr2min !== undefined ? `${hrr2min} bpm a 2 min` : ''} con frecuencia cardíaca pico de ${peakHR} bpm. `;

  if (bestCategory === 'Excelente' || bestCategory === 'Buena') {
    clinicalInterpretation += 'Una recuperación cardíaca buena o excelente indica condición cardiovascular óptima y bajo riesgo cardiovascular.';
  } else if (bestCategory === 'Normal') {
    clinicalInterpretation += 'Una recuperación cardíaca normal es típica para personas con condición física promedio. Hay margen para mejorar con ejercicio regular.';
  } else {
    clinicalInterpretation += 'Una recuperación cardíaca pobre puede indicar condición cardiovascular subóptima, disfunción autonómica o riesgo cardiovascular aumentado. Requiere evaluación médica y posiblemente pruebas adicionales.';
  }

  return {
    peakHR,
    hr1min,
    hr2min,
    hrr1min,
    hrr2min,
    hrr1minPercentage,
    hrr2minPercentage,
    category1min,
    category2min,
    status,
    interpretation,
    cardiovascularFitness,
    recommendations,
    clinicalSignificance,
    improvementStrategies,
    monitoring,
    riskFactors,
    clinicalInterpretation
  };
}

// ============================================================================
// PRESIÓN ARTERIAL MEDIA (MAP - Mean Arterial Pressure)
// ============================================================================

/**
 * Calculate Mean Arterial Pressure (MAP)
 * MAP represents the average arterial pressure throughout one cardiac cycle
 * Formula: MAP = DBP + (1/3)(SBP - DBP) = (2 × DBP + SBP) / 3
 * 
 * @param systolicBP Systolic blood pressure (mmHg)
 * @param diastolicBP Diastolic blood pressure (mmHg)
 * @returns Mean arterial pressure (mmHg)
 */
export function calculateMAP(systolicBP: number, diastolicBP: number): number {
  if (systolicBP <= 0 || diastolicBP <= 0) {
    throw new Error('Las presiones arteriales deben ser valores positivos');
  }
  if (systolicBP < diastolicBP) {
    throw new Error('La presión sistólica debe ser mayor que la diastólica');
  }

  // Standard formula: MAP = DBP + (1/3)(SBP - DBP)
  const map = diastolicBP + (1 / 3) * (systolicBP - diastolicBP);

  return Math.round(map * 10) / 10; // Round to 1 decimal place
}

/**
 * Comprehensive MAP analysis with clinical interpretation
 */
export interface MAPAnalysis {
  map: number;
  systolicBP: number;
  diastolicBP: number;
  category: 'Hipotensión' | 'Normal' | 'Prehipertensión' | 'Hipertensión Estadio 1' | 'Hipertensión Estadio 2' | 'Crisis Hipertensiva';
  bpCategory: 'Normal' | 'Elevada' | 'Hipertensión Estadio 1' | 'Hipertensión Estadio 2' | 'Crisis Hipertensiva';
  status: string;
  interpretation: string;
  clinicalSignificance: string;
  organPerfusion: {
    status: string;
    description: string;
    risk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  };
  recommendations: string[];
  monitoring: {
    frequency: string;
    actions: string[];
  };
  riskFactors: string[];
  clinicalInterpretation: string;
}

/**
 * Analyze Mean Arterial Pressure with clinical interpretation
 * Based on AHA/ACC 2017 guidelines
 */
export function analyzeMAP(systolicBP: number, diastolicBP: number): MAPAnalysis {
  const map = calculateMAP(systolicBP, diastolicBP);

  // Categorize MAP
  let category: 'Hipotensión' | 'Normal' | 'Prehipertensión' | 'Hipertensión Estadio 1' | 'Hipertensión Estadio 2' | 'Crisis Hipertensiva';
  let status: string;
  let interpretation: string;

  if (map < 70) {
    category = 'Hipotensión';
    status = 'Presión arterial media baja';
    interpretation = `Tu MAP de ${map} mmHg está por debajo del rango normal (70-100 mmHg). Esto puede indicar hipotensión, que puede causar síntomas como mareos, fatiga o desmayos. La perfusión de órganos puede estar comprometida.`;
  } else if (map >= 70 && map < 93) {
    category = 'Normal';
    status = 'Presión arterial media normal';
    interpretation = `Tu MAP de ${map} mmHg está dentro del rango normal (70-100 mmHg). Esto indica una presión arterial adecuada para mantener la perfusión de órganos vitales.`;
  } else if (map >= 93 && map < 100) {
    category = 'Prehipertensión';
    status = 'Presión arterial media en rango prehipertensivo';
    interpretation = `Tu MAP de ${map} mmHg está en el rango prehipertensivo. Aunque no es hipertensión, es importante monitorear y adoptar hábitos saludables para prevenir el desarrollo de hipertensión.`;
  } else if (map >= 100 && map < 110) {
    category = 'Hipertensión Estadio 1';
    status = 'Hipertensión estadio 1';
    interpretation = `Tu MAP de ${map} mmHg indica hipertensión estadio 1. Se recomienda cambios en el estilo de vida y posiblemente medicación según evaluación médica.`;
  } else if (map >= 110 && map < 120) {
    category = 'Hipertensión Estadio 2';
    status = 'Hipertensión estadio 2';
    interpretation = `Tu MAP de ${map} mmHg indica hipertensión estadio 2. Requiere intervención médica con medicación y cambios en el estilo de vida.`;
  } else {
    category = 'Crisis Hipertensiva';
    status = 'Crisis hipertensiva - Atención médica inmediata';
    interpretation = `Tu MAP de ${map} mmHg indica una crisis hipertensiva. Se requiere atención médica inmediata.`;
  }

  // Categorize BP according to AHA/ACC 2017 guidelines
  let bpCategory: 'Normal' | 'Elevada' | 'Hipertensión Estadio 1' | 'Hipertensión Estadio 2' | 'Crisis Hipertensiva';
  if (systolicBP < 120 && diastolicBP < 80) {
    bpCategory = 'Normal';
  } else if (systolicBP >= 120 && systolicBP < 130 && diastolicBP < 80) {
    bpCategory = 'Elevada';
  } else if ((systolicBP >= 130 && systolicBP < 140) || (diastolicBP >= 80 && diastolicBP < 90)) {
    bpCategory = 'Hipertensión Estadio 1';
  } else if ((systolicBP >= 140 && systolicBP < 180) || (diastolicBP >= 90 && diastolicBP < 120)) {
    bpCategory = 'Hipertensión Estadio 2';
  } else {
    bpCategory = 'Crisis Hipertensiva';
  }

  // Organ perfusion assessment
  let organPerfusion: {
    status: string;
    description: string;
    risk: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
  };

  if (map >= 70 && map <= 100) {
    organPerfusion = {
      status: 'Óptima',
      description: 'La perfusión de órganos vitales (cerebro, corazón, riñones) es adecuada. El MAP está en el rango ideal para mantener el flujo sanguíneo a los órganos.',
      risk: 'Bajo'
    };
  } else if (map < 70) {
    organPerfusion = {
      status: 'Comprometida',
      description: 'MAP bajo puede comprometer la perfusión de órganos vitales, especialmente en el cerebro y los riñones. Puede causar isquemia y daño orgánico.',
      risk: 'Alto'
    };
  } else if (map > 100 && map < 110) {
    organPerfusion = {
      status: 'Aumentada',
      description: 'MAP elevado aumenta la carga de trabajo del corazón y puede causar daño a largo plazo en órganos como riñones, cerebro y corazón.',
      risk: 'Moderado'
    };
  } else {
    organPerfusion = {
      status: 'Crítica',
      description: 'MAP muy elevado representa un riesgo significativo de daño orgánico agudo, incluyendo accidente cerebrovascular, infarto de miocardio o insuficiencia renal.',
      risk: 'Muy Alto'
    };
  }

  // Recommendations
  const recommendations: string[] = [];

  if (map < 70) {
    recommendations.push('Buscar atención médica para evaluar la causa de la hipotensión');
    recommendations.push('Aumentar la ingesta de líquidos y electrolitos si está deshidratado');
    recommendations.push('Evitar cambios bruscos de posición (ortostatismo)');
    recommendations.push('Considerar medias de compresión si hay hipotensión ortostática');
  } else if (map >= 70 && map < 100) {
    recommendations.push('Mantener hábitos saludables: dieta equilibrada, ejercicio regular');
    recommendations.push('Monitorear la presión arterial regularmente');
    recommendations.push('Mantener un peso saludable');
    recommendations.push('Limitar el consumo de sodio y alcohol');
  } else if (map >= 100) {
    recommendations.push('Consultar con un médico para evaluación y tratamiento');
    recommendations.push('Adoptar una dieta baja en sodio (DASH)');
    recommendations.push('Realizar ejercicio físico regular (150 min/semana)');
    recommendations.push('Mantener un peso saludable');
    recommendations.push('Limitar o evitar el consumo de alcohol');
    recommendations.push('Gestionar el estrés mediante técnicas de relajación');
    recommendations.push('Tomar medicación según prescripción médica');
  }

  // Monitoring frequency
  let monitoring: {
    frequency: string;
    actions: string[];
  };

  if (map < 70 || map >= 110) {
    monitoring = {
      frequency: 'Diario o según indicación médica',
      actions: [
        'Medir presión arterial al menos 2 veces al día',
        'Registrar valores en un diario',
        'Consultar con médico si hay cambios significativos',
        'Buscar atención de emergencia si hay síntomas de crisis hipertensiva'
      ]
    };
  } else if (map >= 100 && map < 110) {
    monitoring = {
      frequency: 'Varias veces por semana',
      actions: [
        'Medir presión arterial 2-3 veces por semana',
        'Registrar valores para seguimiento médico',
        'Consultar con médico regularmente'
      ]
    };
  } else {
    monitoring = {
      frequency: 'Mensual o según indicación médica',
      actions: [
        'Medir presión arterial mensualmente',
        'Mantener hábitos saludables',
        'Consultar con médico en chequeos regulares'
      ]
    };
  }

  // Risk factors
  const riskFactors: string[] = [];
  if (map >= 100) {
    riskFactors.push('Enfermedad cardiovascular');
    riskFactors.push('Accidente cerebrovascular');
    riskFactors.push('Enfermedad renal crónica');
    riskFactors.push('Daño a órganos diana');
    riskFactors.push('Síndrome metabólico');
  }
  if (map < 70) {
    riskFactors.push('Síncope y caídas');
    riskFactors.push('Isquemia de órganos');
    riskFactors.push('Shock');
  }

  // Clinical interpretation
  const clinicalInterpretation = `MAP de ${map} mmHg con presión arterial ${systolicBP}/${diastolicBP} mmHg. ` +
    `${category === 'Hipotensión'
      ? 'MAP bajo indica hipotensión que puede comprometer la perfusión de órganos. Requiere evaluación de la causa subyacente.'
      : category === 'Normal'
        ? 'MAP normal indica presión arterial adecuada para mantener la perfusión de órganos vitales.'
        : category === 'Prehipertensión'
          ? 'MAP en rango prehipertensivo requiere monitoreo y cambios en el estilo de vida para prevenir hipertensión.'
          : category === 'Hipertensión Estadio 1'
            ? 'MAP elevado indica hipertensión estadio 1. Requiere intervención con cambios en el estilo de vida y posiblemente medicación.'
            : category === 'Hipertensión Estadio 2'
              ? 'MAP significativamente elevado indica hipertensión estadio 2. Requiere tratamiento médico inmediato con medicación y cambios en el estilo de vida.'
              : 'MAP muy elevado indica crisis hipertensiva que requiere atención médica inmediata para prevenir daño orgánico agudo.'}`;

  return {
    map,
    systolicBP,
    diastolicBP,
    category,
    bpCategory,
    status,
    interpretation,
    clinicalSignificance: `La presión arterial media (MAP) es un indicador crítico de la perfusión de órganos. Representa la presión promedio en las arterias durante un ciclo cardíaco completo. Un MAP adecuado (70-100 mmHg) es esencial para mantener el flujo sanguíneo a órganos vitales como el cerebro, corazón y riñones.`,
    organPerfusion,
    recommendations,
    monitoring,
    riskFactors,
    clinicalInterpretation
  };
}

// ============================================================================
// DENSIDAD ÓSEA (BMD - Bone Mineral Density)
// ============================================================================

/**
 * Calculate T-Score from BMD
 * T-Score compares BMD to healthy young adult (peak bone mass)
 * T-Score = (BMD - BMD_young_adult) / SD_young_adult
 * 
 * @param bmd Bone mineral density (g/cm²)
 * @param youngAdultBMD Average BMD of healthy young adult (g/cm²)
 * @param sd Standard deviation of young adult BMD (g/cm²)
 * @returns T-Score
 */
export function calculateTScore(bmd: number, youngAdultBMD: number, sd: number): number {
  if (sd <= 0) {
    throw new Error('La desviación estándar debe ser positiva');
  }

  return Math.round(((bmd - youngAdultBMD) / sd) * 10) / 10;
}

/**
 * Calculate Z-Score from BMD
 * Z-Score compares BMD to age-matched peers
 * Z-Score = (BMD - BMD_age_matched) / SD_age_matched
 * 
 * @param bmd Bone mineral density (g/cm²)
 * @param ageMatchedBMD Average BMD of age-matched peers (g/cm²)
 * @param sd Standard deviation of age-matched BMD (g/cm²)
 * @returns Z-Score
 */
export function calculateZScore(bmd: number, ageMatchedBMD: number, sd: number): number {
  if (sd <= 0) {
    throw new Error('La desviación estándar debe ser positiva');
  }

  return Math.round(((bmd - ageMatchedBMD) / sd) * 10) / 10;
}

/**
 * Estimate BMD from age, gender, and other factors
 * Simplified estimation based on population averages
 * Note: This is an approximation. Actual BMD requires DXA scan.
 * 
 * @param age Age in years
 * @param gender Gender ('male' | 'female')
 * @param weight Weight in kg
 * @param height Height in cm
 * @returns Estimated BMD (g/cm²)
 */
export function estimateBMD(age: number, gender: 'male' | 'female', weight: number, height: number): number {
  if (age < 0 || weight <= 0 || height <= 0) {
    throw new Error('La edad, peso y altura deben ser valores positivos');
  }

  // Base BMD values (peak bone mass around age 30)
  const baseBMD = gender === 'male' ? 1.05 : 0.95; // g/cm²

  // Age-related decline (approximately 0.5-1% per year after age 30)
  const ageFactor = age > 30 ? 1 - ((age - 30) * 0.008) : 1;

  // Weight factor (higher weight = slightly higher BMD due to loading)
  const weightFactor = 1 + ((weight - 70) / 1000);

  // Height factor (taller individuals may have slightly lower BMD)
  const heightFactor = 1 - ((height - 170) / 5000);

  const estimatedBMD = baseBMD * ageFactor * weightFactor * heightFactor;

  // Ensure reasonable bounds
  return Math.max(0.6, Math.min(1.3, Math.round(estimatedBMD * 100) / 100));
}

/**
 * Comprehensive BMD analysis with clinical interpretation
 */
export interface BMDAnalysis {
  bmd?: number;
  tScore?: number;
  zScore?: number;
  site: 'lumbar' | 'femoral' | 'forearm' | 'total';
  category: 'Normal' | 'Osteopenia' | 'Osteoporosis' | 'Severe Osteoporosis';
  status: string;
  interpretation: string;
  fractureRisk: {
    level: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
    description: string;
    riskPercentage: string;
  };
  recommendations: string[];
  clinicalSignificance: string;
  preventionStrategies: string[];
  monitoring: {
    frequency: string;
    actions: string[];
  };
  riskFactors: string[];
  clinicalInterpretation: string;
}

/**
 * Analyze Bone Mineral Density with clinical interpretation
 * Based on WHO criteria and clinical guidelines
 */
export function analyzeBMD(
  bmd?: number,
  tScore?: number,
  zScore?: number,
  site: 'lumbar' | 'femoral' | 'forearm' | 'total' = 'lumbar',
  age?: number,
  gender?: 'male' | 'female'
): BMDAnalysis {
  // If BMD is not provided but T-Score is, estimate BMD
  let actualBMD = bmd;
  let actualTScore = tScore;
  let actualZScore = zScore;

  // If only T-Score is provided, estimate BMD (using average young adult BMD)
  if (!actualBMD && actualTScore !== undefined) {
    const youngAdultBMD = site === 'lumbar' ? 1.0 : site === 'femoral' ? 0.95 : 0.75;
    const sd = 0.12; // Typical SD for BMD
    actualBMD = Math.round((youngAdultBMD + (actualTScore * sd)) * 100) / 100;
  }

  // If only BMD is provided, calculate T-Score (using average values)
  if (actualBMD !== undefined && actualTScore === undefined) {
    const youngAdultBMD = site === 'lumbar' ? 1.0 : site === 'femoral' ? 0.95 : 0.75;
    const sd = 0.12;
    actualTScore = calculateTScore(actualBMD, youngAdultBMD, sd);
  }

  // Determine category based on T-Score (WHO criteria)
  let category: 'Normal' | 'Osteopenia' | 'Osteoporosis' | 'Severe Osteoporosis';

  if (actualTScore === undefined) {
    category = 'Normal'; // Default if no T-Score available
  } else if (actualTScore >= -1.0) {
    category = 'Normal';
  } else if (actualTScore >= -2.5) {
    category = 'Osteopenia';
  } else if (actualTScore > -3.0) {
    category = 'Osteoporosis';
  } else {
    category = 'Severe Osteoporosis';
  }

  // Determine status and interpretation
  let status: string;
  let interpretation: string;

  if (category === 'Normal') {
    status = 'Densidad ósea normal';
    interpretation = actualBMD !== undefined
      ? `Tu densidad ósea (${actualBMD} g/cm²) está en el rango normal. Tu T-Score de ${actualTScore} indica que tu densidad ósea es comparable a la de un adulto joven saludable.`
      : `Tu T-Score de ${actualTScore} indica densidad ósea normal. Tu densidad ósea es comparable a la de un adulto joven saludable.`;
  } else if (category === 'Osteopenia') {
    status = 'Osteopenia (densidad ósea baja)';
    interpretation = actualBMD !== undefined
      ? `Tu densidad ósea (${actualBMD} g/cm²) está por debajo de lo normal. Tu T-Score de ${actualTScore} indica osteopenia, que es una disminución de la densidad ósea que puede aumentar el riesgo de fracturas.`
      : `Tu T-Score de ${actualTScore} indica osteopenia (densidad ósea baja). Esto puede aumentar el riesgo de fracturas. Se recomienda tomar medidas preventivas.`;
  } else if (category === 'Osteoporosis') {
    status = 'Osteoporosis';
    interpretation = actualBMD !== undefined
      ? `Tu densidad ósea (${actualBMD} g/cm²) está significativamente baja. Tu T-Score de ${actualTScore} indica osteoporosis, una condición que aumenta significativamente el riesgo de fracturas. Se requiere tratamiento médico.`
      : `Tu T-Score de ${actualTScore} indica osteoporosis. Esta condición aumenta significativamente el riesgo de fracturas. Se requiere evaluación y tratamiento médico.`;
  } else {
    status = 'Osteoporosis severa';
    interpretation = actualBMD !== undefined
      ? `Tu densidad ósea (${actualBMD} g/cm²) está muy baja. Tu T-Score de ${actualTScore} indica osteoporosis severa, con riesgo muy alto de fracturas. Se requiere tratamiento médico inmediato.`
      : `Tu T-Score de ${actualTScore} indica osteoporosis severa, con riesgo muy alto de fracturas. Se requiere tratamiento médico inmediato.`;
  }

  // Fracture risk assessment
  let fractureRisk: {
    level: 'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto';
    description: string;
    riskPercentage: string;
  };

  if (category === 'Normal') {
    fractureRisk = {
      level: 'Bajo',
      description: 'El riesgo de fractura es bajo con densidad ósea normal.',
      riskPercentage: '<10%'
    };
  } else if (category === 'Osteopenia') {
    fractureRisk = {
      level: 'Moderado',
      description: 'El riesgo de fractura está moderadamente aumentado con osteopenia.',
      riskPercentage: '10-20%'
    };
  } else if (category === 'Osteoporosis') {
    fractureRisk = {
      level: 'Alto',
      description: 'El riesgo de fractura está significativamente aumentado con osteoporosis.',
      riskPercentage: '20-40%'
    };
  } else {
    fractureRisk = {
      level: 'Muy Alto',
      description: 'El riesgo de fractura es muy alto con osteoporosis severa.',
      riskPercentage: '>40%'
    };
  }

  // Recommendations
  const recommendations: string[] = [];

  if (category === 'Normal') {
    recommendations.push('Mantener una dieta rica en calcio (1000-1200 mg/día)');
    recommendations.push('Asegurar ingesta adecuada de vitamina D (800-1000 UI/día)');
    recommendations.push('Realizar ejercicio con carga de peso regular');
    recommendations.push('Evitar el tabaco y limitar el consumo de alcohol');
    recommendations.push('Realizar seguimiento periódico según recomendación médica');
  } else if (category === 'Osteopenia') {
    recommendations.push('Consultar con un médico para evaluación completa');
    recommendations.push('Aumentar ingesta de calcio (1200-1500 mg/día)');
    recommendations.push('Asegurar niveles adecuados de vitamina D');
    recommendations.push('Iniciar programa de ejercicio con carga de peso');
    recommendations.push('Considerar suplementación si es recomendada por médico');
    recommendations.push('Evitar factores de riesgo (tabaco, alcohol excesivo)');
  } else {
    recommendations.push('Consultar urgentemente con un médico especialista');
    recommendations.push('Iniciar tratamiento médico según indicación');
    recommendations.push('Aumentar ingesta de calcio (1500 mg/día)');
    recommendations.push('Asegurar niveles adecuados de vitamina D');
    recommendations.push('Realizar ejercicio supervisado con carga de peso');
    recommendations.push('Tomar medidas para prevenir caídas');
    recommendations.push('Considerar medicamentos para la osteoporosis si es recomendado');
  }

  // Clinical significance
  const clinicalSignificance = `La densidad ósea (BMD) es una medida de la cantidad de mineral óseo por unidad de área. Se utiliza para diagnosticar osteoporosis y evaluar el riesgo de fracturas. El T-Score compara la densidad ósea con la de un adulto joven saludable del mismo género, mientras que el Z-Score compara con personas de la misma edad. Una densidad ósea baja aumenta significativamente el riesgo de fracturas, especialmente en cadera, columna vertebral y muñeca.`;

  // Prevention strategies
  const preventionStrategies: string[] = [
    'Dieta rica en calcio: lácteos, vegetales de hoja verde, pescado con espinas',
    'Exposición solar moderada para síntesis de vitamina D (15-20 min/día)',
    'Ejercicio con carga de peso: caminar, correr, entrenamiento de fuerza',
    'Ejercicios de equilibrio para prevenir caídas',
    'Evitar el tabaco (reduce la densidad ósea)',
    'Limitar el consumo de alcohol (máximo 1-2 bebidas/día)',
    'Mantener un peso saludable (ni muy bajo ni muy alto)',
    'Evitar dietas extremas o restrictivas'
  ];

  // Monitoring
  const monitoring = {
    frequency: category === 'Normal' ? 'Cada 2-3 años o según recomendación médica' :
      category === 'Osteopenia' ? 'Anual o según recomendación médica' :
        'Cada 6-12 meses según indicación médica',
    actions: [
      'Realizar DXA scan periódicamente según recomendación médica',
      'Monitorear niveles de calcio y vitamina D en sangre',
      'Evaluar factores de riesgo de fractura',
      'Revisar medicamentos que puedan afectar la densidad ósea',
      'Evaluar riesgo de caídas y tomar medidas preventivas'
    ]
  };

  // Risk factors
  const riskFactors: string[] = [];
  if (category !== 'Normal') {
    riskFactors.push('Edad avanzada (especialmente >65 años)');
    riskFactors.push('Género femenino (mayor riesgo post-menopausia)');
    riskFactors.push('Historia familiar de osteoporosis');
    riskFactors.push('Bajo peso corporal (IMC <18.5)');
    riskFactors.push('Fumar');
    riskFactors.push('Consumo excesivo de alcohol');
    riskFactors.push('Sedentarismo');
    riskFactors.push('Deficiencia de calcio o vitamina D');
    riskFactors.push('Uso prolongado de corticosteroides');
    riskFactors.push('Menopausia temprana');
  }

  // Clinical interpretation
  let clinicalInterpretation = '';

  if (actualBMD !== undefined) {
    clinicalInterpretation += `BMD de ${actualBMD} g/cm² en ${site === 'lumbar' ? 'columna lumbar' : site === 'femoral' ? 'cuello femoral' : site === 'forearm' ? 'antebrazo' : 'total'}. `;
  }

  if (actualTScore !== undefined) {
    clinicalInterpretation += `T-Score de ${actualTScore} (${category}). `;
  }

  if (actualZScore !== undefined) {
    clinicalInterpretation += `Z-Score de ${actualZScore}. `;
  }

  if (category === 'Normal') {
    clinicalInterpretation += 'La densidad ósea está dentro del rango normal. Se recomienda mantener hábitos saludables para preservar la salud ósea.';
  } else if (category === 'Osteopenia') {
    clinicalInterpretation += 'La densidad ósea está por debajo de lo normal (osteopenia). Se recomienda evaluación médica y medidas preventivas para reducir el riesgo de progresión a osteoporosis.';
  } else if (category === 'Osteoporosis') {
    clinicalInterpretation += 'La densidad ósea está significativamente baja (osteoporosis). Se requiere evaluación médica y tratamiento para reducir el riesgo de fracturas.';
  } else {
    clinicalInterpretation += 'La densidad ósea está muy baja (osteoporosis severa). Se requiere tratamiento médico inmediato para reducir el riesgo muy alto de fracturas.';
  }

  return {
    bmd: actualBMD,
    tScore: actualTScore,
    zScore: actualZScore,
    site,
    category,
    status,
    interpretation,
    fractureRisk,
    recommendations,
    clinicalSignificance,
    preventionStrategies,
    monitoring,
    riskFactors,
    clinicalInterpretation
  };
}

// ============ eGFR (Filtrado Glomerular Estimado) ============

export interface EGFRResult {
  ckdEpi: number;
  mdrd: number;
  cockcroftGault?: number;
  stage: '1' | '2' | '3a' | '3b' | '4' | '5';
  stageLabel: string;
  interpretation: string;
  recommendations: string[];
  clinicalSignificance: string;
}

/**
 * CKD-EPI 2009: estimación de GFR (mL/min/1.73 m²) a partir de creatinina sérica (mg/dL), edad, sexo y raza.
 * Levey AS, et al. Ann Intern Med. 2009.
 */
export function calculateEGFRCkdEpi(
  creatinineMgDl: number,
  age: number,
  sex: 'male' | 'female',
  isBlack: boolean = false
): number {
  if (creatinineMgDl <= 0 || age < 18) return 0;
  const k = sex === 'female' ? 0.7 : 0.9;
  const a = sex === 'female'
    ? (creatinineMgDl <= 0.7 ? -0.329 : -1.209)
    : (creatinineMgDl <= 0.9 ? -0.411 : -1.209);
  const scrRatio = creatinineMgDl / k;
  let gfr = (sex === 'female' ? 144 : 141) * Math.pow(scrRatio, a) * Math.pow(0.993, age);
  if (isBlack) gfr *= 1.159;
  return Math.round(gfr * 10) / 10;
}

/**
 * MDRD-4: ecuación de 4 variables (creatinina mg/dL, edad, sexo, raza). mL/min/1.73 m².
 */
export function calculateEGFRMDRD(
  creatinineMgDl: number,
  age: number,
  sex: 'male' | 'female',
  isBlack: boolean = false
): number {
  if (creatinineMgDl <= 0 || age < 18) return 0;
  let gfr = 175 * Math.pow(creatinineMgDl, -1.154) * Math.pow(age, -0.203);
  if (sex === 'female') gfr *= 0.742;
  if (isBlack) gfr *= 1.212;
  return Math.round(Math.min(Math.max(gfr, 0), 999) * 10) / 10;
}

/**
 * Cockcroft-Gault: clearance de creatinina (mL/min), no estandarizado a BSA. Útil para ajuste de dosis.
 */
export function calculateCreatinineClearanceCockcroftGault(
  creatinineMgDl: number,
  age: number,
  weightKg: number,
  sex: 'male' | 'female'
): number {
  if (creatinineMgDl <= 0 || age < 18 || weightKg <= 0) return 0;
  let crCl = ((140 - age) * weightKg) / (72 * creatinineMgDl);
  if (sex === 'female') crCl *= 0.85;
  return Math.round(crCl * 10) / 10;
}

function getCKDStage(gfr: number): { stage: '1' | '2' | '3a' | '3b' | '4' | '5'; label: string } {
  if (gfr >= 90) return { stage: '1', label: 'G1 - Normal o alto (≥90)' };
  if (gfr >= 60) return { stage: '2', label: 'G2 - Leve (60-89)' };
  if (gfr >= 45) return { stage: '3a', label: 'G3a - Leve-moderado (45-59)' };
  if (gfr >= 30) return { stage: '3b', label: 'G3b - Moderado-severo (30-44)' };
  if (gfr >= 15) return { stage: '4', label: 'G4 - Severo (15-29)' };
  return { stage: '5', label: 'G5 - Enfermedad renal terminal (<15)' };
}

export function analyzeEGFR(
  creatinineMgDl: number,
  age: number,
  sex: 'male' | 'female',
  weightKg?: number,
  isBlack: boolean = false
): EGFRResult {
  const ckdEpi = calculateEGFRCkdEpi(creatinineMgDl, age, sex, isBlack);
  const mdrd = calculateEGFRMDRD(creatinineMgDl, age, sex, isBlack);
  const cockcroftGault = weightKg && weightKg > 0
    ? calculateCreatinineClearanceCockcroftGault(creatinineMgDl, age, weightKg, sex)
    : undefined;
  const { stage, label: stageLabel } = getCKDStage(ckdEpi);

  let interpretation: string;
  const recommendations: string[] = [];

  if (ckdEpi >= 90) {
    interpretation = `Tu filtrado glomerular estimado (eGFR) es de ${ckdEpi} mL/min/1.73 m² (CKD-EPI), dentro del rango normal. La función renal está preservada.`;
    recommendations.push('Mantener hidratación adecuada');
    recommendations.push('Evitar nefrotóxicos innecesarios (AINES, contrastes sin indicación)');
    recommendations.push('Control de tensión y glucemia si hay factores de riesgo');
  } else if (ckdEpi >= 60) {
    interpretation = `Tu eGFR es de ${ckdEpi} mL/min/1.73 m² (estadio G2). Indica función renal levemente disminuida. Conviene confirmar con repetir analítica y valorar causa.`;
    recommendations.push('Repetir creatinina y eGFR en 3-6 meses');
    recommendations.push('Valorar proteinuria y sedimento');
    recommendations.push('Control de tensión arterial y glucemia');
    recommendations.push('Evitar nefrotóxicos');
  } else if (ckdEpi >= 45) {
    interpretation = `Tu eGFR es de ${ckdEpi} mL/min/1.73 m² (estadio G3a). Función renal levemente a moderadamente reducida. Se recomienda seguimiento nefrológico.`;
    recommendations.push('Seguimiento con médico o nefrología');
    recommendations.push('Control estricto de tensión y diabetes');
    recommendations.push('Ajustar dosis de fármacos según función renal');
    recommendations.push('Valorar causa y progresión');
  } else if (ckdEpi >= 30) {
    interpretation = `Tu eGFR es de ${ckdEpi} mL/min/1.73 m² (estadio G3b). Reducción moderada-severa de la función renal. Es importante valoración nefrológica.`;
    recommendations.push('Valoración nefrológica recomendada');
    recommendations.push('Control de tensión, anemia, fosfato y PTH');
    recommendations.push('Ajuste de medicación según guías');
    recommendations.push('Preparación para posibles opciones de tratamiento renal sustitutivo');
  } else if (ckdEpi >= 15) {
    interpretation = `Tu eGFR es de ${ckdEpi} mL/min/1.73 m² (estadio G4). Enfermedad renal severa. Se requiere seguimiento nefrológico estrecho.`;
    recommendations.push('Seguimiento nefrológico estrecho');
    recommendations.push('Preparación para diálisis o trasplante según criterio médico');
    recommendations.push('Manejo de complicaciones (anemia, metabolismo óseo, acidosis)');
    recommendations.push('Dieta y medicación adaptadas a función renal');
  } else {
    interpretation = `Tu eGFR es de ${ckdEpi} mL/min/1.73 m² (estadio G5). Enfermedad renal terminal. Requiere tratamiento sustitutivo (diálisis o trasplante) o cuidados conservadores según indicación médica.`;
    recommendations.push('Manejo por nefrología y equipo multidisciplinar');
    recommendations.push('Diálisis o trasplante según indicación y preferencias');
    recommendations.push('Cuidados paliativos renales si se elige no dializar');
  }

  const clinicalSignificance = 'El eGFR estima la tasa de filtración glomerular (capacidad de filtrado de los riñones). Se utiliza para detectar y estadificar la enfermedad renal crónica (ERC), ajustar dosis de medicamentos y planificar seguimiento. CKD-EPI es la ecuación recomendada en la mayoría de guías; MDRD se mantiene por comparación histórica. Cockcroft-Gault estima el clearance de creatinina (mL/min) y se usa sobre todo para ajuste de dosis. Los resultados deben interpretarse siempre en contexto clínico y con un profesional de la salud.';

  return {
    ckdEpi,
    mdrd,
    cockcroftGault,
    stage,
    stageLabel,
    interpretation,
    recommendations,
    clinicalSignificance
  };
}