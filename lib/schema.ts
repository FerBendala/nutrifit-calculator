import { CalculatorConfig, CALCULATORS } from './calculators';

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Schema para la aplicación web principal
export function generateWebApplicationSchema(): SchemaMarkup {
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
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
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
    featureList: CALCULATORS.map(calc => calc.title),
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

// Schema para calculadoras individuales
export function generateCalculatorSchema(calculator: CalculatorConfig): SchemaMarkup {
  const baseUrl = 'https://nutrifit-calculator.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${calculator.title} - NutriFit Calculator`,
    description: calculator.description,
    url: `${baseUrl}${calculator.href}`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
    author: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: baseUrl
    },
    featureList: [
      'Cálculo instantáneo',
      'Fórmulas científicas validadas',
      'Interfaz intuitiva',
      'Resultados precisos',
      'Gratis y sin registro'
    ],
    screenshot: `${baseUrl}/api/og?title=${encodeURIComponent(calculator.title)}`,
    softwareVersion: '1.0',
    datePublished: '2024-08-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'es-ES',
    audience: {
      '@type': 'Audience',
      audienceType: 'Fitness enthusiasts, nutritionists, athletes, health-conscious individuals'
    },
    keywords: calculator.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').join(', '),
    mainEntity: {
      '@type': 'Thing',
      name: calculator.title,
      description: calculator.description
    }
  };
}

// Schema HowTo para guías de uso
export function generateHowToSchema(calculator: CalculatorConfig): SchemaMarkup {
  const steps = getCalculatorSteps(calculator.key);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Cómo usar la ${calculator.title}`,
    description: `Guía paso a paso para usar la ${calculator.title} de forma efectiva`,
    image: `https://nutrifit-calculator.com/api/og?title=${encodeURIComponent(calculator.title)}`,
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Peso corporal (en kg)'
      },
      {
        '@type': 'HowToSupply',
        name: 'Altura (en cm)'
      },
      {
        '@type': 'HowToSupply',
        name: 'Edad'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: calculator.title
      }
    ],
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
    })),
    author: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com'
    }
  };
}

// Función que genera pasos automáticamente basándose en la categoría de la calculadora
function getCalculatorSteps(calculatorKey: string): Array<{ name: string, text: string, image?: string }> {
  const calculator = CALCULATORS.find(calc => calc.key === calculatorKey);

  if (!calculator) {
    return getDefaultSteps();
  }

  // Pasos específicos por categoría
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

// Pasos por defecto para calculadoras sin categoría específica
function getDefaultSteps(): Array<{ name: string, text: string, image?: string }> {
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

// Schema para el sitio web completo
export function generateWebsiteSchema(): SchemaMarkup {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NutriFit Calculator',
    description: 'Calculadoras fit gratuitas de calorías, macros, IMC y más. Herramientas profesionales para tu nutrición y fitness.',
    url: 'https://nutrifit-calculator.com',
    inLanguage: 'es-ES',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nutrifit-calculator.com/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Calculadoras de Fitness',
      description: 'Lista de calculadoras gratuitas para fitness y nutrición',
      numberOfItems: CALCULATORS.length,
      itemListElement: CALCULATORS.map((calc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: calc.title,
        url: `https://nutrifit-calculator.com${calc.href}`
      }))
    }
  };
}

// Función que genera automáticamente el Schema para cualquier calculadora
export function generateCalculatorSchemaByKey(calculatorKey: string): SchemaMarkup[] {
  const calculator = CALCULATORS.find(calc => calc.key === calculatorKey);

  if (!calculator) {
    console.warn(`Calculadora con key "${calculatorKey}" no encontrada`);
    return [generateWebApplicationSchema(), generateWebsiteSchema()];
  }

  return generateAllSchemas(calculator);
}

// Función que genera Schema para todas las calculadoras automáticamente
export function generateAllCalculatorsSchema(): SchemaMarkup[] {
  const schemas = [generateWebApplicationSchema(), generateWebsiteSchema()];

  // Añadir Schema para cada calculadora
  CALCULATORS.forEach(calculator => {
    schemas.push(generateCalculatorSchema(calculator));
    schemas.push(generateHowToSchema(calculator));
  });

  return schemas;
}

// Función principal para generar todos los schemas
export function generateAllSchemas(calculator?: CalculatorConfig): SchemaMarkup[] {
  const schemas = [generateWebApplicationSchema(), generateWebsiteSchema()];

  if (calculator) {
    schemas.push(generateCalculatorSchema(calculator));
    schemas.push(generateHowToSchema(calculator));
  }

  return schemas;
}
