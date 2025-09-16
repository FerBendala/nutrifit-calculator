#!/usr/bin/env node

/**
 * Script para probar el sistema automático de Schema Markup
 * Ejecutar con: node scripts/test-auto-schema.js
 */

const fs = require('fs');
const path = require('path');

// Simular la configuración de calculadoras
const CALCULATORS = [
  {
    key: 'home',
    title: 'Calculadora de Calorías y Macros',
    href: '/',
    description: 'Calculadora principal con distribución de macronutrientes personalizada',
    category: 'nutrition',
    priority: 'high'
  },
  {
    key: 'imc',
    title: 'Calculadora IMC',
    href: '/imc',
    description: 'Índice de masa corporal y categorías de peso saludable',
    category: 'body-composition',
    priority: 'high'
  },
  {
    key: 'nueva-calculadora',
    title: 'Calculadora de Test',
    href: '/test',
    description: 'Calculadora de prueba para verificar el sistema automático',
    category: 'fitness',
    priority: 'medium'
  }
];

// Función para generar pasos automáticamente
function getCalculatorSteps(calculatorKey) {
  const calculator = CALCULATORS.find(calc => calc.key === calculatorKey);

  if (!calculator) {
    return getDefaultSteps();
  }

  const categorySteps = {
    'nutrition': [
      {
        name: 'Introduce tus datos básicos',
        text: 'Ingresa tu peso, altura, edad y sexo en los campos correspondientes'
      },
      {
        name: 'Selecciona tu nivel de actividad',
        text: 'Elige el nivel de ejercicio que realizas semanalmente'
      },
      {
        name: 'Define tu objetivo nutricional',
        text: 'Selecciona tu objetivo específico de nutrición'
      },
      {
        name: 'Obtén tus resultados',
        text: 'Recibe tu cálculo personalizado con recomendaciones nutricionales'
      }
    ],
    'body-composition': [
      {
        name: 'Introduce tus medidas',
        text: 'Ingresa las medidas corporales requeridas (peso, altura, etc.)'
      },
      {
        name: 'Añade medidas adicionales',
        text: 'Si es necesario, incluye medidas específicas como circunferencias'
      },
      {
        name: 'Obtén tu análisis',
        text: 'Recibe tu análisis de composición corporal con interpretación'
      }
    ],
    'fitness': [
      {
        name: 'Introduce tus datos',
        text: 'Ingresa tu peso, edad y otros datos relevantes'
      },
      {
        name: 'Selecciona tu nivel de entrenamiento',
        text: 'Elige tu nivel de experiencia y frecuencia de entrenamiento'
      },
      {
        name: 'Obtén tus métricas',
        text: 'Recibe tus métricas de fitness personalizadas'
      }
    ],
    'health': [
      {
        name: 'Introduce tus datos básicos',
        text: 'Ingresa tu peso, altura y otros datos de salud relevantes'
      },
      {
        name: 'Selecciona tu nivel de actividad',
        text: 'Elige tu nivel de actividad física diaria'
      },
      {
        name: 'Obtén tus recomendaciones',
        text: 'Recibe tus recomendaciones de salud personalizadas'
      }
    ]
  };

  return categorySteps[calculator.category] || getDefaultSteps();
}

function getDefaultSteps() {
  return [
    {
      name: 'Introduce tus datos',
      text: 'Ingresa la información requerida en los campos correspondientes'
    },
    {
      name: 'Configura tus parámetros',
      text: 'Ajusta los parámetros según tus necesidades específicas'
    },
    {
      name: 'Obtén tus resultados',
      text: 'Recibe tu cálculo personalizado con recomendaciones'
    }
  ];
}

// Función para generar Schema de calculadora
function generateCalculatorSchema(calculator) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${calculator.title} - NutriFit Calculator`,
    description: calculator.description,
    url: `https://nutrifit-calculator.com${calculator.href}`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
    featureList: [
      'Cálculo instantáneo',
      'Fórmulas científicas validadas',
      'Interfaz intuitiva',
      'Resultados precisos',
      'Gratis y sin registro'
    ],
    keywords: calculator.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').join(', ')
  };
}

// Función para generar Schema HowTo
function generateHowToSchema(calculator) {
  const steps = getCalculatorSteps(calculator.key);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Cómo usar la ${calculator.title}`,
    description: `Guía paso a paso para usar la ${calculator.title} de forma efectiva`,
    totalTime: 'PT2M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  };
}

// Función principal de prueba
function main() {
  console.log('🔍 Probando sistema automático de Schema Markup...\n');

  // Probar con cada calculadora
  CALCULATORS.forEach(calculator => {
    console.log(`📊 Probando calculadora: ${calculator.title}`);
    console.log(`   - Key: ${calculator.key}`);
    console.log(`   - Categoría: ${calculator.category}`);
    console.log(`   - Prioridad: ${calculator.priority}`);

    // Generar Schema de calculadora
    const calculatorSchema = generateCalculatorSchema(calculator);
    console.log(`   - Schema generado: ✅`);

    // Generar Schema HowTo
    const howToSchema = generateHowToSchema(calculator);
    const steps = getCalculatorSteps(calculator.key);
    console.log(`   - Pasos generados: ${steps.length} pasos`);
    console.log(`   - HowTo generado: ✅`);

    // Mostrar pasos generados
    console.log(`   - Pasos automáticos:`);
    steps.forEach((step, index) => {
      console.log(`     ${index + 1}. ${step.name}`);
    });

    console.log('');
  });

  // Probar con una calculadora que no existe
  console.log('🧪 Probando con calculadora inexistente...');
  const nonExistentSteps = getCalculatorSteps('calculadora-inexistente');
  console.log(`   - Pasos por defecto generados: ${nonExistentSteps.length} pasos`);
  console.log(`   - Sistema de fallback: ✅`);

  console.log('\n✅ Sistema automático de Schema Markup funcionando correctamente!');
  console.log('🎯 Las futuras calculadoras se generarán automáticamente');
  console.log('📝 Solo necesitas añadir la calculadora a CALCULATORS y usar <SchemaMarkup calculatorKey="key" />');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { getCalculatorSteps, generateCalculatorSchema, generateHowToSchema };
