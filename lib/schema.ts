import { CalculatorConfig, CALCULATORS } from './calculators';
import { getCanonicalUrl } from './seo';

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
    '@id': 'https://nutrifit-calculator.com/#webapp',
    name: 'NutriFit Calculator - Calculadoras Fit GRATIS',
    description: 'Calculadoras fit gratuitas de calorías, macros, IMC y más. Herramientas profesionales para tu nutrición y fitness.',
    url: 'https://nutrifit-calculator.com/',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com/'
    },
    inLanguage: 'es-ES'
  };
}

// Schema para calculadoras individuales
export function generateCalculatorSchema(calculator: CalculatorConfig): SchemaMarkup {
  const canonicalUrl = getCanonicalUrl(calculator.href);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${canonicalUrl}#app`,
    name: `${calculator.title} - NutriFit Calculator`,
    description: calculator.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com/'
    },
    inLanguage: 'es-ES'
  };
}

// Schema HowTo para guías de uso
// NOTA: Este schema NO se usa actualmente porque los pasos son demasiado genéricos.
// Solo usar HowTo si se agregan pasos detallados y específicos para cada calculadora.
// Los pasos actuales son descripciones obvias que no aportan valor SEO adicional.
export function generateHowToSchema(calculator: CalculatorConfig): SchemaMarkup {
  const canonicalUrl = getCanonicalUrl(calculator.href);
  const steps = getCalculatorSteps(calculator.key);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${canonicalUrl}#howto`,
    name: `Cómo usar la ${calculator.title}`,
    description: `Guía paso a paso para usar la ${calculator.title} de forma efectiva`,
    image: `https://nutrifit-calculator.com/images/og-default.png`,
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
    '@id': 'https://nutrifit-calculator.com/#website',
    name: 'NutriFit Calculator',
    description: 'Calculadoras fit gratuitas de calorías, macros, IMC y más. Herramientas profesionales para tu nutrición y fitness.',
    url: 'https://nutrifit-calculator.com/',
    inLanguage: 'es-ES',
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: 'https://nutrifit-calculator.com/'
    }
  };
}

// Función que genera automáticamente el Schema para cualquier calculadora
export function generateCalculatorSchemaByKey(calculatorKey: string): SchemaMarkup[] {
  const calculator = CALCULATORS.find(calc => calc.key === calculatorKey);

  if (!calculator) {
    // Para la home, generar schemas completos (WebApplication + WebSite + FAQ)
    if (calculatorKey === 'home') {
      const schemas = [generateWebApplicationSchema(), generateWebsiteSchema()];
      const faqSchema = generateFAQSchema('home');
      if (faqSchema) schemas.push(faqSchema);
      return schemas;
    }
    // Fallback: solo WebApplication + WebSite para páginas desconocidas
    console.warn(`Calculadora con key "${calculatorKey}" no encontrada`);
    return [generateWebApplicationSchema(), generateWebsiteSchema()];
  }

  // Para calculadoras individuales, usar generateAllSchemas 
  // (que ahora solo genera SoftwareApplication + FAQ)
  return generateAllSchemas(calculator);
}

// Función que genera Schema para todas las calculadoras automáticamente
// NOTA: Función legacy / NO USAR en producción para markup por página.
// Esta función contradice la estrategia actual (sin HowTo, sin WebApp/WebSite en todas).
// Si se necesita en el futuro, debe respetar la estrategia actual.
export function generateAllCalculatorsSchema(): SchemaMarkup[] {
  console.warn('generateAllCalculatorsSchema() es legacy y no debe usarse para markup por página');
  return [];
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
  ],
  'peso-ideal': [
    {
      question: '¿Cuál es mi peso ideal según mi altura?',
      answer: 'El peso ideal varía según la fórmula utilizada. Las más comunes son Robinson, Miller, Devine, Hamwi y Peterson. Cada una da un rango ligeramente diferente. Recomendamos ver el rango completo en vez de un número exacto.'
    },
    {
      question: '¿Existe un único peso ideal para cada persona?',
      answer: 'No. El peso ideal es un rango, no un número exacto. Depende de tu composición corporal, masa muscular, estructura ósea y otros factores individuales que las fórmulas no pueden capturar completamente.'
    }
  ],
  'masa-muscular': [
    {
      question: '¿Cuánta masa muscular es normal?',
      answer: 'En hombres, la masa muscular representa entre el 36-42% del peso corporal. En mujeres, entre el 29-35%. Estos valores varían según edad, nivel de actividad física y genética.'
    },
    {
      question: '¿Cómo se calcula la masa muscular?',
      answer: 'La fórmula de Lee et al. (2000) estima la masa muscular esquelética a partir de altura, peso, sexo y etnia. Es la más utilizada en investigación y se correlaciona bien con mediciones por DEXA.'
    }
  ],
  composicion: [
    {
      question: '¿Qué método es más preciso para medir composición corporal?',
      answer: 'El gold standard es DEXA (absorciometría dual de rayos X). El método Navy, usado en nuestra calculadora, tiene una precisión de ±3-4% y solo requiere una cinta métrica, haciéndolo accesible para uso doméstico.'
    },
    {
      question: '¿Qué incluye la composición corporal?',
      answer: 'La composición corporal se divide en masa grasa y masa libre de grasa (músculos, huesos, órganos, agua). Conocer esta distribución es más útil que solo el peso total para evaluar la salud.'
    }
  ],
  whtr: [
    {
      question: '¿Qué es el WHtR y por qué es mejor que el IMC?',
      answer: 'El WHtR (ratio cintura-altura) es un indicador de grasa abdominal. Múltiples estudios demuestran que predice mejor el riesgo de diabetes y enfermedades cardiovasculares que el IMC, porque considera la distribución de la grasa.'
    },
    {
      question: '¿Cuál es un WHtR saludable?',
      answer: 'Un WHtR menor a 0.5 se considera saludable para ambos sexos. Valores entre 0.5-0.6 indican riesgo aumentado, y por encima de 0.6 indican riesgo alto de enfermedades metabólicas.'
    }
  ],
  vo2max: [
    {
      question: '¿Qué es el VO2 max y por qué importa?',
      answer: 'El VO2 max es la cantidad máxima de oxígeno que tu cuerpo puede utilizar durante el ejercicio. Es el mejor indicador de fitness cardiovascular y se asocia con menor riesgo de mortalidad por cualquier causa.'
    },
    {
      question: '¿Cómo puedo mejorar mi VO2 max?',
      answer: 'El entrenamiento interválico de alta intensidad (HIIT) es el método más efectivo para mejorar el VO2 max. También el ejercicio continuo de intensidad moderada-alta (75-85% FCmax) 3-5 veces por semana.'
    }
  ],
  '1rm': [
    {
      question: '¿Qué es el 1RM?',
      answer: 'El 1RM (una repetición máxima) es el peso máximo que puedes levantar una sola vez con buena técnica en un ejercicio determinado. Es la referencia para programar intensidades de entrenamiento.'
    },
    {
      question: '¿Es seguro probar mi 1RM directo?',
      answer: 'Probar el 1RM directo tiene riesgo de lesión, especialmente para principiantes. Es más seguro estimarlo con submáximo: levanta un peso con el que hagas 3-10 repeticiones y usa una fórmula de estimación como Epley o Brzycki.'
    }
  ],
  fibra: [
    {
      question: '¿Cuánta fibra necesito al día?',
      answer: 'La recomendación general es 14g de fibra por cada 1000 kcal consumidas (IOM/FDA). Para adultos, esto equivale a 25-38g diarios dependiendo del sexo y las calorías totales.'
    },
    {
      question: '¿Qué pasa si consumo poca fibra?',
      answer: 'La ingesta insuficiente de fibra se asocia con estreñimiento, mayor riesgo de enfermedades cardiovasculares, diabetes tipo 2 y ciertos tipos de cáncer colorrectal.'
    }
  ],
  ffmi: [
    {
      question: '¿Qué es el FFMI y para qué sirve?',
      answer: 'El FFMI (Índice de Masa Libre de Grasa) mide tu desarrollo muscular independientemente de la grasa. Valores por encima de 25 en hombres son muy difíciles de alcanzar de forma natural, lo que lo hace útil para evaluar potencial genético.'
    },
    {
      question: '¿Cuál es un buen FFMI?',
      answer: 'Para hombres: 18-20 es promedio, 20-22 es bueno, 22-25 es excelente/atlético. Para mujeres: 15-17 es promedio, 17-19 es bueno, 19-21 es excelente. Valores por encima de 25 (hombres) o 22 (mujeres) son extremadamente raros naturalmente.'
    }
  ],
  fmi: [
    {
      question: '¿Qué es el FMI y en qué se diferencia del IMC?',
      answer: 'El FMI (Fat Mass Index) mide solo la masa grasa relativa a tu altura, a diferencia del IMC que mezcla grasa y músculo. Esto lo hace más preciso para evaluar exceso de grasa corporal, especialmente en personas musculosas.'
    },
    {
      question: '¿Cuáles son los rangos normales de FMI?',
      answer: 'Para hombres: 3-6 kg/m² es normal. Para mujeres: 5-9 kg/m² es normal. Valores superiores indican exceso de grasa corporal. El FMI complementa al FFMI para un análisis completo de composición corporal.'
    }
  ],
  whr: [
    {
      question: '¿Qué es el WHR y qué mide?',
      answer: 'El WHR (Waist-to-Hip Ratio) es la relación entre la circunferencia de tu cintura y tu cadera. Según la OMS, valores superiores a 0.90 en hombres y 0.85 en mujeres indican obesidad abdominal y mayor riesgo cardiovascular.'
    },
    {
      question: '¿Es mejor el WHR que el IMC para evaluar riesgo?',
      answer: 'Sí, el WHR detecta mejor el riesgo cardiovascular que el IMC porque mide la distribución de grasa. Una persona con IMC normal puede tener WHR alto (grasa abdominal) y viceversa.'
    }
  ],
  bai: [
    {
      question: '¿Cómo estima el BAI la grasa corporal sin báscula?',
      answer: 'El BAI (Body Adiposity Index) usa solo la circunferencia de cadera y la altura para estimar el porcentaje de grasa corporal. Fue desarrollado por Bergman et al. (2011) como alternativa al IMC que no requiere peso.'
    },
    {
      question: '¿Qué tan preciso es el BAI?',
      answer: 'El BAI tiene una precisión moderada (±3-5%) y funciona mejor en mujeres que en hombres. Es útil cuando no se dispone de báscula, pero los métodos de pliegues cutáneos o bioimpedancia son más precisos.'
    }
  ],
  rmr: [
    {
      question: '¿En qué se diferencia el RMR del BMR?',
      answer: 'El RMR (Resting Metabolic Rate) incluye el gasto de actividades ligeras como estar sentado, mientras que el BMR (Basal Metabolic Rate) mide el gasto en reposo absoluto. El RMR es típicamente 10-20% mayor que el BMR y más práctico para planificar dietas.'
    },
    {
      question: '¿Qué fórmula debo usar para calcular mi RMR?',
      answer: 'La fórmula Mifflin-St Jeor es la más precisa para la mayoría de personas. Si conoces tu porcentaje de grasa corporal, la fórmula Katch-McArdle puede ser más precisa.'
    }
  ],
  'masa-magra': [
    {
      question: '¿Qué es la masa magra (LBM)?',
      answer: 'La masa magra (Lean Body Mass) es todo tu peso corporal excepto la grasa: incluye músculos, huesos, órganos, agua y tejido conectivo. Es un indicador más útil que el peso total para evaluar tu condición física.'
    },
    {
      question: '¿Cómo se calcula la masa magra?',
      answer: 'Se puede estimar restando la masa grasa del peso total. Existen fórmulas como Boer, James y Hume que la calculan directamente a partir de peso, altura y sexo, sin necesidad de medir grasa corporal.'
    }
  ],
  'grasa-visceral': [
    {
      question: '¿Qué es la grasa visceral y por qué es peligrosa?',
      answer: 'La grasa visceral (VAT) rodea los órganos internos del abdomen. A diferencia de la grasa subcutánea, la visceral produce hormonas inflamatorias que aumentan el riesgo de diabetes tipo 2, enfermedades cardiovasculares e hígado graso.'
    },
    {
      question: '¿Cómo reducir la grasa visceral?',
      answer: 'El ejercicio aeróbico es el método más efectivo, seguido del entrenamiento de fuerza. Una dieta con déficit calórico moderado y baja en azúcares refinados también reduce selectivamente la grasa visceral.'
    }
  ],
  ci: [
    {
      question: '¿Qué es el Índice de Conicidad (CI)?',
      answer: 'El CI (Conicity Index) evalúa la distribución de grasa comparando tu cintura con la circunferencia de un cilindro del mismo peso y altura. Fue propuesto por Valdez (1991) y valores cercanos a 1.0 son ideales; por encima de 1.25 indica alta acumulación abdominal.'
    },
    {
      question: '¿Para qué sirve el CI en la práctica clínica?',
      answer: 'El CI es un predictor independiente de riesgo cardiovascular y metabólico. Es especialmente útil en estudios epidemiológicos y complementa al IMC y WHR para evaluar obesidad central.'
    }
  ],
  bri: [
    {
      question: '¿Qué mide el BRI (Body Roundness Index)?',
      answer: 'El BRI estima la forma corporal como una elipse, usando cintura y altura. Valores cercanos a 1 indican cuerpo cilíndrico (bajo riesgo), mientras valores altos indican forma más redondeada con mayor grasa abdominal y riesgo metabólico.'
    },
    {
      question: '¿Cuáles son los rangos de BRI?',
      answer: 'Un BRI de 1-3 es generalmente saludable. Entre 3-5 indica riesgo moderado. Superior a 5 indica alto riesgo de síndrome metabólico y enfermedades cardiovasculares.'
    }
  ],
  absi: [
    {
      question: '¿Qué es el ABSI y cómo predice la mortalidad?',
      answer: 'El ABSI (A Body Shape Index) fue desarrollado por Krakauer & Krakauer (2012). Incorpora la circunferencia de cintura junto con el IMC y la altura para predecir riesgo de mortalidad. Un ABSI alto indica desproporción en la grasa abdominal.'
    },
    {
      question: '¿Es el ABSI mejor que el IMC?',
      answer: 'Sí, para predecir mortalidad el ABSI es superior al IMC porque captura la distribución de grasa. El IMC no distingue entre personas con la misma masa pero diferente distribución grasa.'
    }
  ],
  bsa: [
    {
      question: '¿Qué es la BSA y para qué se usa en medicina?',
      answer: 'La BSA (Body Surface Area) es el área total de la superficie corporal. Se usa principalmente para dosificar quimioterapia, calcular el índice cardíaco, estimar necesidades de fluidos en quemados y ajustar dosis de medicamentos.'
    },
    {
      question: '¿Qué fórmula de BSA es más precisa?',
      answer: 'La fórmula de Du Bois (1916) es la más utilizada históricamente. La de Mosteller es más simple y casi igual de precisa. Para pediatría, la fórmula de Haycock es preferida.'
    }
  ],
  'peso-ajustado': [
    {
      question: '¿Cuándo se usa el peso ajustado (ABW)?',
      answer: 'El ABW se usa cuando el peso real es significativamente mayor que el ideal, especialmente en pacientes con obesidad. Se aplica para calcular dosis de medicamentos, necesidades calóricas y proteicas de forma más precisa que usando el peso real.'
    },
    {
      question: '¿Cómo se calcula el peso ajustado?',
      answer: 'La fórmula más común es: ABW = Peso ideal + 0.25 × (Peso real - Peso ideal). El factor 0.25 refleja que el tejido adiposo tiene menor actividad metabólica que el tejido magro.'
    }
  ],
  'edad-metabolica': [
    {
      question: '¿Qué es la edad metabólica?',
      answer: 'La edad metabólica compara tu metabolismo basal (BMR) con el promedio de diferentes edades. Si tu BMR corresponde al promedio de alguien de 30 años pero tienes 40, tu edad metabólica es 30, lo que indica un metabolismo más joven.'
    },
    {
      question: '¿Cómo puedo mejorar mi edad metabólica?',
      answer: 'El entrenamiento de fuerza es el factor más importante, ya que aumenta la masa muscular que eleva el metabolismo. También ayudan el ejercicio cardiovascular regular, una dieta rica en proteínas y un buen descanso.'
    }
  ],
  'presion-arterial-media': [
    {
      question: '¿Qué es la presión arterial media (MAP)?',
      answer: 'La MAP es la presión promedio en las arterias durante un ciclo cardíaco completo. Se calcula como: MAP = PAD + 1/3 × (PAS - PAD). Valores entre 70-100 mmHg son normales. Es crucial para evaluar la perfusión de órganos.'
    },
    {
      question: '¿Por qué es importante la MAP en la clínica?',
      answer: 'Una MAP inferior a 60 mmHg puede causar isquemia en órganos vitales. En cuidados intensivos, se monitoriza para asegurar perfusión adecuada del cerebro, riñones y corazón.'
    }
  ],
  'recuperacion-cardiaca': [
    {
      question: '¿Qué es la recuperación cardíaca (HRR)?',
      answer: 'La HRR mide cuántas pulsaciones bajan en el primer minuto después de dejar de hacer ejercicio. Una caída de 12+ latidos/min al minuto 1 es normal. Menos de 12 puede indicar disfunción autonómica o bajo fitness cardiovascular.'
    },
    {
      question: '¿Cómo mejorar mi recuperación cardíaca?',
      answer: 'El ejercicio aeróbico regular (3-5 veces/semana) mejora la recuperación cardíaca al fortalecer el sistema nervioso parasimpático. En semanas, puedes ver mejoras significativas en tu HRR.'
    }
  ],
  'densidad-osea': [
    {
      question: '¿Qué es el T-Score de densidad ósea?',
      answer: 'El T-Score compara tu densidad ósea con la de un adulto joven sano. Según la OMS: mayor a -1 es normal, entre -1 y -2.5 es osteopenia (pérdida moderada), y menor a -2.5 es osteoporosis.'
    },
    {
      question: '¿Quién debe hacerse una densitometría ósea?',
      answer: 'Se recomienda para mujeres mayores de 65 años, hombres mayores de 70, y personas con factores de riesgo como menopausia precoz, uso prolongado de corticoides, fracturas previas o antecedentes familiares de osteoporosis.'
    }
  ],
  egfr: [
    {
      question: '¿Qué es el eGFR y qué indica?',
      answer: 'El eGFR (estimated Glomerular Filtration Rate) estima cuánta sangre filtran los riñones por minuto. Un eGFR mayor a 90 es normal. Entre 60-89 puede ser normal en ancianos. Menor a 60 indica enfermedad renal crónica.'
    },
    {
      question: '¿Qué fórmula de eGFR es más precisa?',
      answer: 'La CKD-EPI (2021) es la más recomendada actualmente. MDRD es útil cuando el eGFR es menor a 60. Cockcroft-Gault estima el aclaramiento de creatinina y se usa para ajustar dosis de medicamentos.'
    }
  ],
  sarcopenia: [
    {
      question: '¿Qué es la sarcopenia?',
      answer: 'La sarcopenia es la pérdida progresiva de masa muscular, fuerza y función física asociada al envejecimiento. Según los criterios EWGSOP2, se diagnostica combinando baja fuerza de agarre, baja masa muscular y bajo rendimiento físico.'
    },
    {
      question: '¿A qué edad comienza la sarcopenia?',
      answer: 'La pérdida muscular comienza a los 30 años (1-2% anual) y se acelera después de los 60. El sedentarismo, la dieta pobre en proteínas y enfermedades crónicas aceleran el proceso. El ejercicio de fuerza es la intervención más efectiva.'
    }
  ],
  azucar: [
    {
      question: '¿Cuánto azúcar puedo consumir al día?',
      answer: 'La OMS recomienda que los azúcares libres sean menos del 10% de las calorías diarias, e idealmente menos del 5%. Para una dieta de 2000 kcal, esto equivale a máximo 50g (ideal 25g) de azúcar al día.'
    },
    {
      question: '¿Qué son los azúcares libres?',
      answer: 'Son los azúcares añadidos a alimentos y bebidas por fabricantes o consumidores, más los presentes naturalmente en miel, jarabes y zumos de frutas. No incluyen los azúcares naturales de frutas enteras ni la lactosa de la leche.'
    }
  ],
  sodio: [
    {
      question: '¿Cuánto sodio debo consumir al día?',
      answer: 'La OMS recomienda menos de 2g de sodio al día (equivalente a 5g de sal). Si tienes hipertensión, se recomienda menos de 1.5g de sodio (3.75g de sal). La mayoría de personas consumen el doble de lo recomendado.'
    },
    {
      question: '¿Cómo reducir el consumo de sodio?',
      answer: 'El 75% del sodio viene de alimentos procesados y comidas fuera de casa. Cocinar en casa, leer etiquetas, usar especias en lugar de sal y elegir productos bajos en sodio son las estrategias más efectivas.'
    }
  ],
  alcohol: [
    {
      question: '¿Qué es una unidad estándar de alcohol?',
      answer: 'Una unidad estándar contiene 10g de alcohol puro. Equivale aproximadamente a: 250ml de cerveza (5%), 100ml de vino (12%) o 30ml de destilados (40%). La OMS recomienda no superar 2 unidades diarias.'
    },
    {
      question: '¿Cuántas calorías tiene el alcohol?',
      answer: 'El alcohol aporta 7 kcal/g, casi el doble que los carbohidratos. Una cerveza tiene ~150 kcal, una copa de vino ~120 kcal y un chupito ~100 kcal. Estas son calorías vacías sin valor nutricional.'
    }
  ]
};

// Schema FAQPage para rich snippets
export function generateFAQSchema(calculatorKey: string): SchemaMarkup | null {
  const faqs = CALCULATOR_FAQS[calculatorKey];
  
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Construir URL canónica según si es home o calculadora
  const calculator = CALCULATORS.find(calc => calc.key === calculatorKey);
  const canonicalUrl = calculator 
    ? getCanonicalUrl(calculator.href)
    : 'https://nutrifit-calculator.com/';

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntityOfPage: canonicalUrl,
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

const CATEGORY_LABELS: Record<string, string> = {
  'nutrition': 'Nutrición',
  'body-composition': 'Composición Corporal',
  'fitness': 'Fitness',
  'health': 'Salud',
};

export function generateBreadcrumbSchema(calculator: CalculatorConfig): SchemaMarkup {
  const canonicalUrl = getCanonicalUrl(calculator.href);
  const categoryLabel = CATEGORY_LABELS[calculator.category] || calculator.category;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://nutrifit-calculator.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabel,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calculator.title,
        item: canonicalUrl,
      },
    ],
  };
}

// Función principal para generar todos los schemas
export function generateAllSchemas(calculator?: CalculatorConfig): SchemaMarkup[] {
  // Solo para la home: WebApplication + WebSite + FAQ
  if (!calculator) {
    const schemas = [generateWebApplicationSchema(), generateWebsiteSchema()];
    const faqSchema = generateFAQSchema('home');
    if (faqSchema) {
      schemas.push(faqSchema);
    }
    return schemas;
  }

  // Para calculadoras individuales: SoftwareApplication + BreadcrumbList + FAQ
  const schemas = [
    generateCalculatorSchema(calculator),
    generateBreadcrumbSchema(calculator),
  ];
  
  const faqSchema = generateFAQSchema(calculator.key);
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  return schemas;
}
