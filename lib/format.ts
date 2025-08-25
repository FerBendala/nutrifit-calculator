/**
 * Format numbers with Spanish locale
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Format calories with unit
 */
export function formatCalories(calories: number): string {
  return `${formatNumber(calories)} kcal`;
}

/**
 * Format grams with unit
 */
export function formatGrams(grams: number, decimals: number = 0): string {
  return `${formatNumber(grams, decimals)} g`;
}

/**
 * Format milliliters with unit
 */
export function formatMilliliters(ml: number): string {
  return `${formatNumber(ml)} ml`;
}

/**
 * Format percentage
 */
export function formatPercentage(percentage: number, decimals: number = 1): string {
  return `${formatNumber(percentage, decimals)}%`;
}

/**
 * Validate input numbers
 */
export function validateNumber(value: string, min: number, max: number): { isValid: boolean; message?: string; } {
  const num = parseFloat(value);

  if (isNaN(num)) {
    return { isValid: false, message: 'Introduce un número válido' };
  }

  if (num < min) {
    return { isValid: false, message: `El valor debe ser mayor a ${min}` };
  }

  if (num > max) {
    return { isValid: false, message: `El valor debe ser menor a ${max}` };
  }

  return { isValid: true };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Format results for copying
 */
export function formatResultsForCopy(results: {
  tdee: number;
  targetCalories: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
}): string {
  const { tdee, targetCalories, macros } = results;

  return `🔥 Mis resultados de calorías y macros:

📊 TDEE (mantenimiento): ${formatCalories(tdee)}
🎯 Calorías objetivo: ${formatCalories(targetCalories)}

💪 Macronutrientes diarios:
• Proteínas: ${formatGrams(macros.protein)}
• Grasas: ${formatGrams(macros.fat)}
• Carbohidratos: ${formatGrams(macros.carbs)}

Calculado en tu-calculadora-fitness.com 🚀`;
}