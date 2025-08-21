import { test, expect } from '@playwright/test';

test.describe('Fitness Calculator E2E Tests', () => {
  test('should complete the main calculator flow', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Check if the main heading is present
    await expect(page.locator('h1')).toContainText('Calculadora de Calorías y Macronutrientes');
    
    // Fill in the calculator form
    await page.selectOption('[data-testid="sex-select"]', 'male');
    await page.fill('input[id="age"]', '30');
    await page.fill('input[id="height"]', '180');
    await page.fill('input[id="weight"]', '80');
    
    // Select activity level
    await page.click('[data-testid="activity-level-select"]');
    await page.click('text=Moderada (ejercicio moderado 3-5 días/semana)');
    
    // Select goal (maintain is default)
    await page.click('[data-testid="goal-select"]');
    await page.click('text=Mantener peso');
    
    // Submit the form
    await page.click('button:has-text("Calcular mis calorías")');
    
    // Wait for results to appear
    await expect(page.locator('text=Tus Resultados')).toBeVisible({ timeout: 10000 });
    
    // Check if TDEE and target calories are displayed
    await expect(page.locator('text=TDEE')).toBeVisible();
    await expect(page.locator('text=Calorías objetivo')).toBeVisible();
    
    // Check if macros are displayed
    await expect(page.locator('text=Proteínas')).toBeVisible();
    await expect(page.locator('text=Grasas')).toBeVisible();
    await expect(page.locator('text=Carbohidratos')).toBeVisible();
    
    // Test copy functionality
    await page.click('button:has-text("Copiar resultados")');
    
    // Check if success toast appears
    await expect(page.locator('text=¡Copiado!')).toBeVisible({ timeout: 5000 });
  });

  test('should navigate between calculator pages', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation menu
    await page.click('button:has-text("Calculadoras")');
    
    // Navigate to IMC calculator
    await page.click('text=IMC');
    await expect(page).toHaveURL('/imc');
    await expect(page.locator('h1')).toContainText('Calculadora de IMC');
    
    // Navigate to TDEE calculator
    await page.goto('/tdee');
    await expect(page.locator('h1')).toContainText('Calculadora TDEE');
    
    // Navigate to protein calculator
    await page.goto('/proteina');
    await expect(page.locator('h1')).toContainText('Calculadora de Proteína Diaria');
    
    // Navigate to water calculator
    await page.goto('/agua');
    await expect(page.locator('h1')).toContainText('Calculadora de Agua Diaria');
  });

  test('should handle form validation', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit empty form
    const submitButton = page.locator('button:has-text("Calcular mis calorías")');
    await expect(submitButton).toBeDisabled();
    
    // Fill in invalid age
    await page.fill('input[id="age"]', '5');
    await page.click('input[id="height"]'); // Blur the age input
    
    // Check for validation error
    await expect(page.locator('text=El valor debe ser mayor a')).toBeVisible();
  });

  test('should display consent banner and handle cookie preferences', async ({ page }) => {
    // Clear any existing consent
    await page.context().clearCookies();
    
    await page.goto('/');
    
    // Check if consent banner is visible
    await expect(page.locator('text=Gestión de Cookies')).toBeVisible();
    
    // Accept all cookies
    await page.click('button:has-text("Aceptar todas")');
    
    // Banner should disappear
    await expect(page.locator('text=Gestión de Cookies')).not.toBeVisible();
  });

  test('should have accessible form elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for required form labels
    const ageLabel = page.locator('label[for="age"]');
    await expect(ageLabel).toBeVisible();
    await expect(ageLabel).toContainText('Edad');
    
    const heightLabel = page.locator('label[for="height"]');
    await expect(heightLabel).toBeVisible();
    await expect(heightLabel).toContainText('Altura');
    
    const weightLabel = page.locator('label[for="weight"]');
    await expect(weightLabel).toBeVisible();
    await expect(weightLabel).toContainText('Peso');
    
    // Check if inputs have proper attributes
    const ageInput = page.locator('input[id="age"]');
    await expect(ageInput).toHaveAttribute('required');
    await expect(ageInput).toHaveAttribute('min', '15');
    await expect(ageInput).toHaveAttribute('max', '100');
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check if page is responsive
    await expect(page.locator('h1')).toBeVisible();
    
    // Fill form on mobile
    await page.fill('input[id="age"]', '25');
    await page.fill('input[id="height"]', '165');
    await page.fill('input[id="weight"]', '60');
    
    // Form should still work
    const submitButton = page.locator('button:has-text("Calcular mis calorías")');
    // Note: We can't easily test select dropdowns in mobile without proper test IDs
    // This would require adding data-testid attributes to the select components
  });
});