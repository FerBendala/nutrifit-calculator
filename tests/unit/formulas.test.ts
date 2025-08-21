import { describe, it, expect } from 'vitest';
import { 
  calculateBMR, 
  calculateTDEE, 
  calculateTargetCalories, 
  calculateMacros, 
  calculateBMI,
  calculateProteinNeeds,
  calculateWaterNeeds,
  MACRO_DISTRIBUTIONS 
} from '@/lib/formulas';

describe('Formula calculations', () => {
  const testUserMale = {
    sex: 'male' as const,
    age: 30,
    height: 180,
    weight: 80
  };

  const testUserFemale = {
    sex: 'female' as const,
    age: 25,
    height: 165,
    weight: 60
  };

  describe('BMR calculations', () => {
    it('should calculate BMR for male correctly', () => {
      const bmr = calculateBMR(testUserMale);
      // Expected: 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
      expect(bmr).toBe(1780);
    });

    it('should calculate BMR for female correctly', () => {
      const bmr = calculateBMR(testUserFemale);
      // Expected: 10*60 + 6.25*165 - 5*25 - 161 = 600 + 1031.25 - 125 - 161 = 1345.25
      expect(bmr).toBe(1345.25);
    });
  });

  describe('TDEE calculations', () => {
    it('should calculate TDEE with moderate activity', () => {
      const bmr = calculateBMR(testUserMale);
      const tdee = calculateTDEE(bmr, 1.55); // Moderate activity
      expect(tdee).toBe(1780 * 1.55);
    });
  });

  describe('Target calories calculations', () => {
    it('should calculate target calories for weight loss', () => {
      const tdee = 2500;
      const targetCalories = calculateTargetCalories(tdee, -0.2); // Lose weight
      expect(targetCalories).toBe(2000);
    });

    it('should calculate target calories for maintenance', () => {
      const tdee = 2500;
      const targetCalories = calculateTargetCalories(tdee, 0); // Maintain
      expect(targetCalories).toBe(2500);
    });

    it('should calculate target calories for weight gain', () => {
      const tdee = 2500;
      const targetCalories = calculateTargetCalories(tdee, 0.1); // Gain weight
      expect(targetCalories).toBe(2750);
    });
  });

  describe('Macro calculations', () => {
    it('should calculate macros for weight loss goal', () => {
      const targetCalories = 2000;
      const weight = 80;
      const distribution = MACRO_DISTRIBUTIONS.lose;
      
      const macros = calculateMacros(targetCalories, weight, distribution);
      
      // Protein: 2.0 * 80 = 160g = 640 kcal
      expect(macros.protein).toBe(160);
      expect(macros.calories.protein).toBe(640);
      
      // Fat: 25% of 2000 = 500 kcal = ~56g
      expect(macros.calories.fat).toBe(500);
      expect(macros.fat).toBeCloseTo(56, 0);
      
      // Carbs: remaining calories = 2000 - 640 - 500 = 860 kcal = 215g
      expect(macros.calories.carbs).toBe(860);
      expect(macros.carbs).toBe(215);
    });

    it('should have macros that add up to target calories (within 1%)', () => {
      const targetCalories = 2200;
      const weight = 70;
      const distribution = MACRO_DISTRIBUTIONS.maintain;
      
      const macros = calculateMacros(targetCalories, weight, distribution);
      const totalCalories = macros.calories.protein + macros.calories.fat + macros.calories.carbs;
      
      const difference = Math.abs(totalCalories - targetCalories);
      const percentDifference = (difference / targetCalories) * 100;
      
      expect(percentDifference).toBeLessThan(1);
    });
  });

  describe('BMI calculations', () => {
    it('should calculate BMI correctly', () => {
      const result = calculateBMI(80, 180);
      // BMI = 80 / (1.8^2) = 80 / 3.24 = 24.7
      expect(result.bmi).toBeCloseTo(24.7, 1);
      expect(result.category).toBe('Peso normal');
    });

    it('should categorize BMI correctly', () => {
      expect(calculateBMI(50, 180).category).toBe('Bajo peso');
      expect(calculateBMI(70, 180).category).toBe('Peso normal');
      expect(calculateBMI(90, 180).category).toBe('Sobrepeso');
      expect(calculateBMI(110, 180).category).toBe('Obesidad');
    });
  });

  describe('Protein needs calculations', () => {
    it('should calculate protein needs for different activity levels', () => {
      const weight = 70;
      
      const sedentary = calculateProteinNeeds(weight, 'sedentary');
      const active = calculateProteinNeeds(weight, 'active');
      const athlete = calculateProteinNeeds(weight, 'athlete');
      
      expect(sedentary.min).toBeLessThan(active.min);
      expect(active.min).toBeLessThan(athlete.min);
    });

    it('should adjust for body fat percentage when provided', () => {
      const weight = 80;
      const bodyFat = 15;
      
      const withBodyFat = calculateProteinNeeds(weight, 'active', bodyFat);
      const withoutBodyFat = calculateProteinNeeds(weight, 'active');
      
      // With body fat should be lower (based on lean mass)
      expect(withBodyFat.min).toBeLessThan(withoutBodyFat.min);
    });
  });

  describe('Water needs calculations', () => {
    it('should calculate water needs correctly', () => {
      const weight = 70;
      const result = calculateWaterNeeds(weight, 'moderate');
      
      // Base: 30-35ml per kg = 2100-2450ml
      // With moderate activity: ~2310-2695ml
      expect(result.min).toBeGreaterThan(2000);
      expect(result.max).toBeGreaterThan(result.min);
    });

    it('should increase water needs with activity level', () => {
      const weight = 70;
      
      const low = calculateWaterNeeds(weight, 'low');
      const moderate = calculateWaterNeeds(weight, 'moderate');
      const high = calculateWaterNeeds(weight, 'high');
      
      expect(low.min).toBeLessThan(moderate.min);
      expect(moderate.min).toBeLessThan(high.min);
    });
  });
});