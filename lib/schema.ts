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
    url: 'https://nutrifit-calculator.com/',
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
      url: 'https://nutrifit-calculator.com/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com/'
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
  const baseUrl = 'https://nutrifit-calculator.com/';

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
      url: 'https://nutrifit-calculator.com/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com/'
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
    url: 'https://nutrifit-calculator.com/',
    inLanguage: 'es-ES',
    author: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com/'
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
        url: `https://nutrifit-calculator.com/${calc.href}`
      }))
    }
  };
}

// Función que genera automáticamente el Schema para cualquier calculadora
export function generateCalculatorSchemaByKey(calculatorKey: string): SchemaMarkup[] {
  const calculator = CALCULATORS.find(calc => calc.key === calculatorKey);

  if (!calculator) {
    // Para la home, generar schemas básicos + FAQ de home
    if (calculatorKey === 'home') {
      const schemas = [generateWebApplicationSchema(), generateWebsiteSchema()];
      const faqSchema = generateFAQSchema('home');
      if (faqSchema) schemas.push(faqSchema);
      return schemas;
    }
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

// FAQs por calculadora para rich snippets
const CALCULATOR_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  home: [
    {
      question: '¿Cómo calcular mis calorías diarias?',
      answer: 'Introduce tu peso, altura, edad, sexo y nivel de actividad física. Nuestra calculadora usa la fórmula Mifflin-St Jeor validada científicamente para calcular tu metabolismo basal (BMR) y lo multiplica por tu factor de actividad para obtener tus calorías diarias (TDEE).'
    },
    {
      question: '¿Cuántas calorías necesito para perder peso?',
      answer: 'Para perder peso de forma saludable, necesitas crear un déficit calórico del 15-25% respecto a tu TDEE. Esto equivale a perder 0.5-1kg por semana. Nuestra calculadora te muestra las calorías exactas según tu objetivo.'
    },
    {
      question: '¿Cómo distribuir mis macronutrientes?',
      answer: 'La distribución recomendada es: proteínas 25-30% (1.6-2.2g/kg), grasas 20-35% (0.8-1.2g/kg), y carbohidratos el resto. Nuestra calculadora ajusta estos valores según tu objetivo específico.'
    },
    {
      question: '¿Con qué frecuencia debo recalcular mis macros?',
      answer: 'Recalcula cada 4-6 semanas o cuando hayas perdido/ganado 2-3kg de peso. Tu metabolismo se adapta con el tiempo, por lo que es importante ajustar regularmente.'
    }
  ],
  imc: [
    {
      question: '¿Qué es el IMC y cómo se calcula?',
      answer: 'El Índice de Masa Corporal (IMC) es una medida que relaciona tu peso con tu altura. Se calcula dividiendo tu peso en kilogramos entre tu altura en metros al cuadrado (kg/m²). Los rangos están establecidos por la OMS.'
    },
    {
      question: '¿Cuál es el IMC normal?',
      answer: 'Según la OMS, un IMC entre 18.5 y 24.9 se considera peso normal. Por debajo de 18.5 es bajo peso, entre 25-29.9 es sobrepeso, y 30 o más es obesidad.'
    },
    {
      question: '¿El IMC es preciso para todos?',
      answer: 'No, el IMC tiene limitaciones. No distingue entre masa muscular y grasa, por lo que atletas pueden tener IMC alto siendo saludables. Para una evaluación completa, considera también la composición corporal.'
    }
  ],
  tdee: [
    {
      question: '¿Qué es el TDEE?',
      answer: 'TDEE (Total Daily Energy Expenditure) es el gasto energético total diario. Incluye tu metabolismo basal (BMR), la termogénesis de alimentos (TEF), la actividad física planificada (EAT) y las actividades no ejercicio (NEAT).'
    },
    {
      question: '¿Cómo uso el TDEE para mis objetivos?',
      answer: 'Para perder peso: consume 300-500 kcal menos que tu TDEE. Para mantener: consume tu TDEE exacto. Para ganar músculo: consume 200-400 kcal más que tu TDEE.'
    },
    {
      question: '¿Por qué mi TDEE es diferente al de otras personas?',
      answer: 'El TDEE varía por genética, composición corporal, hormonas y historial metabólico. Dos personas con el mismo peso pueden tener metabolismos muy diferentes.'
    }
  ],
  proteina: [
    {
      question: '¿Cuánta proteína necesito al día?',
      answer: 'Las necesidades varían según tu objetivo: 1.6-2.2g/kg para ganancia muscular, 1.2-1.6g/kg para mantenimiento activo, y 0.8g/kg mínimo recomendado por la OMS.'
    },
    {
      question: '¿Puedo consumir demasiada proteína?',
      answer: 'Para personas sanas, consumos de hasta 2.5g/kg son seguros. Sin embargo, si tienes problemas renales, consulta con un profesional antes de aumentar tu ingesta.'
    }
  ],
  agua: [
    {
      question: '¿Cuánta agua debo beber al día?',
      answer: 'La recomendación general es 30-40ml por kg de peso corporal. Esto aumenta con el ejercicio, clima cálido y mayor ingesta de proteínas.'
    },
    {
      question: '¿Cómo saber si estoy bien hidratado?',
      answer: 'El color de la orina es un buen indicador: amarillo claro indica buena hidratación, mientras que amarillo oscuro indica deshidratación.'
    }
  ],
  bmr: [
    {
      question: '¿Qué es el BMR?',
      answer: 'BMR (Basal Metabolic Rate) es la cantidad de calorías que tu cuerpo quema en reposo absoluto para funciones vitales como respirar, circular sangre y mantener la temperatura corporal.'
    },
    {
      question: '¿Qué fórmula es más precisa para el BMR?',
      answer: 'La ecuación Mifflin-St Jeor es considerada la más precisa para la mayoría de personas. Sin embargo, la fórmula Katch-McArdle es más precisa si conoces tu porcentaje de grasa corporal.'
    }
  ],
  'grasa-corporal': [
    {
      question: '¿Cuál es un porcentaje de grasa corporal saludable?',
      answer: 'Para hombres: 10-20% es saludable, 6-13% es atlético. Para mujeres: 18-28% es saludable, 14-20% es atlético. Las mujeres necesitan más grasa esencial.'
    },
    {
      question: '¿Cómo medir la grasa corporal en casa?',
      answer: 'Puedes usar medidas de pliegues cutáneos con calibrador, método de la circunferencia (Navy), o bioimpedancia con básculas especiales. Cada método tiene diferentes niveles de precisión.'
    }
  ],
  'ritmo-cardiaco': [
    {
      question: '¿Cuál es mi frecuencia cardíaca máxima?',
      answer: 'La fórmula más común es 220 menos tu edad. Sin embargo, fórmulas más precisas como Tanaka (208 - 0.7 × edad) pueden dar mejores resultados para personas entrenadas.'
    },
    {
      question: '¿Qué zona de frecuencia cardíaca quema más grasa?',
      answer: 'La zona de quema de grasa está entre 60-70% de tu FCmax. Sin embargo, entrenar a mayor intensidad (70-85%) quema más calorías totales y puede ser más efectivo para perder peso.'
    }
  ]
};

// Schema FAQPage para rich snippets
export function generateFAQSchema(calculatorKey: string): SchemaMarkup | null {
  const faqs = CALCULATOR_FAQS[calculatorKey];
  
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Función principal para generar todos los schemas
export function generateAllSchemas(calculator?: CalculatorConfig): SchemaMarkup[] {
  const schemas = [generateWebApplicationSchema(), generateWebsiteSchema()];

  if (calculator) {
    schemas.push(generateCalculatorSchema(calculator));
    schemas.push(generateHowToSchema(calculator));
    
    // Agregar FAQ schema si existe para esta calculadora
    const faqSchema = generateFAQSchema(calculator.key);
    if (faqSchema) {
      schemas.push(faqSchema);
    }
  }

  return schemas;
}
