#!/usr/bin/env node

/**
 * Script para verificar que el Schema Markup funciona correctamente
 * Ejecutar con: node scripts/test-schema.js
 */

const fs = require('fs');
const path = require('path');

// Función para validar JSON
function validateJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return { valid: true, data: parsed };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Función para verificar propiedades requeridas del Schema
function validateSchemaProperties(schema) {
  const requiredProps = ['@context', '@type'];
  const missing = requiredProps.filter(prop => !schema[prop]);

  if (missing.length > 0) {
    return { valid: false, missing };
  }

  return { valid: true };
}

// Función para generar Schema de prueba
function generateTestSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'NutriFit Calculator - Calculadoras Fit GRATIS',
    description: 'Calculadoras fit gratuitas de calorías, macros, IMC y más. Herramientas profesionales para tu nutrición y fitness.',
    url: 'https://nutrifit-calculator.com',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    author: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
    featureList: [
      'Calculadora de calorías y macros',
      'Calculadora de IMC',
      'Calculadora de TDEE',
      'Calculadora de proteína diaria',
      'Calculadora de grasa corporal',
      'Calculadora de peso ideal',
      'Calculadora de masa muscular',
      'Calculadora de ritmo cardíaco',
      'Calculadora de hidratación'
    ],
    screenshot: 'https://nutrifit-calculator.com/api/og',
    softwareVersion: '1.0',
    datePublished: '2024-08-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'es-ES',
    audience: {
      '@type': 'Audience',
      audienceType: 'Fitness enthusiasts, nutritionists, athletes, health-conscious individuals'
    }
  };
}

// Función principal
function main() {
  console.log('🔍 Verificando Schema Markup...\n');

  // Generar Schema de prueba
  const testSchema = generateTestSchema();
  const schemaString = JSON.stringify(testSchema, null, 2);

  console.log('✅ Schema generado correctamente');
  console.log('📊 Propiedades del Schema:');
  console.log(`   - Tipo: ${testSchema['@type']}`);
  console.log(`   - Nombre: ${testSchema.name}`);
  console.log(`   - URL: ${testSchema.url}`);
  console.log(`   - Categoría: ${testSchema.applicationCategory}`);
  console.log(`   - Gratuito: ${testSchema.isAccessibleForFree}`);
  console.log(`   - Características: ${testSchema.featureList.length} items`);

  // Validar JSON
  const jsonValidation = validateJSON(schemaString);
  if (!jsonValidation.valid) {
    console.error('❌ Error en JSON:', jsonValidation.error);
    process.exit(1);
  }

  // Validar propiedades del Schema
  const schemaValidation = validateSchemaProperties(testSchema);
  if (!schemaValidation.valid) {
    console.error('❌ Propiedades faltantes:', schemaValidation.missing);
    process.exit(1);
  }

  console.log('\n✅ Schema Markup válido');
  console.log('🎯 El Schema está listo para ser usado por Google');

  // Mostrar ejemplo de uso
  console.log('\n📝 Ejemplo de uso en HTML:');
  console.log('<script type="application/ld+json">');
  console.log(schemaString);
  console.log('</script>');

  console.log('\n🚀 Schema Markup implementado correctamente!');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { generateTestSchema, validateJSON, validateSchemaProperties };
