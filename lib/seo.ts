import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

export const SITE_CONFIG = {
  name: 'NutriFit Calculator - Herramientas Médicas Profesionales',
  description: 'Calculadoras médicas profesionales de nutrición y fitness. Fórmulas científicas validadas utilizadas por nutricionistas y médicos. Precisión profesional garantizada.',
  url: 'https://nutrifit-calculator.com',
  ogImage: '/api/og',
};

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'Calculadora Profesional de Calorías y Macros | Científicamente Validada',
    description: 'Calculadora médica profesional de calorías y macronutrientes. Fórmula Mifflin-St Jeor validada científicamente. Resultados precisos para perder grasa, mantener peso o ganar músculo. 100% Gratuita.',
    keywords: ['calculadora fit', 'calculadora calorías', 'calculadora de macros', 'macronutrientes', 'perder grasa', 'mantener peso', 'ganar músculo', 'peso corporal', 'ejercicio', 'calculadora fitness'],
    path: '/'
  },
  imc: {
    title: 'Calculadora IMC Profesional | Estándares Médicos OMS | Precisión Científica',
    description: 'Calculadora médica de IMC con estándares oficiales de la OMS. Resultados precisos y categorización profesional de peso corporal. Utilizada por nutricionistas y médicos. Gratuita y confiable.',
    keywords: ['calculadora IMC', 'calculadora fit', 'índice masa corporal', 'peso ideal', 'peso corporal', 'calculadora peso', 'obesidad', 'calculadora fitness'],
    path: '/imc'
  },
  tdee: {
    title: 'Calculadora TDEE Médica | Gasto Calórico Preciso | Fórmula Científica',
    description: 'Calculadora profesional de TDEE con fórmula Mifflin-St Jeor validada. Gasto calórico diario exacto para nutricionistas y deportistas. Resultados precisos para objetivos específicos.',
    keywords: ['calculadora TDEE', 'calculadora fit', 'gasto calórico', 'peso corporal', 'ejercicio físico', 'perder grasa', 'mantener peso', 'calculadora fitness'],
    path: '/tdee'
  },
  proteina: {
    title: 'Calculadora de Proteína Médica | Necesidades Científicas | Precisión Profesional',
    description: 'Calculadora profesional de proteína basada en estudios científicos. Necesidades exactas para deportistas, nutricionistas y objetivos específicos. Fórmulas validadas por la comunidad médica.',
    keywords: ['calculadora proteína', 'calculadora fit', 'proteína diaria', 'peso corporal', 'ganar músculo', 'ejercicio', 'masa muscular', 'calculadora fitness'],
    path: '/proteina'
  },
  agua: {
    title: 'Calculadora de Hidratación Médica | Necesidades Científicas | Precisión Profesional',
    description: 'Calculadora profesional de hidratación basada en estudios médicos. Necesidades exactas de agua según peso, actividad y condiciones ambientales. Utilizada por deportistas y profesionales de la salud.',
    keywords: ['calculadora agua', 'agua diaria', 'peso corporal', 'ejercicio', 'hidratación', 'agua ejercicio'],
    path: '/agua'
  },
  composicion: {
    title: 'Calculadora de Composición Corporal Médica | Método Navy Validado | Precisión Científica',
    description: 'Calculadora profesional de composición corporal con método Navy validado científicamente. Porcentaje de grasa, masa magra y ratio cintura-cadera precisos. Utilizada por nutricionistas y médicos.',
    keywords: ['calculadora grasa corporal', 'calculadora fit', 'composición corporal', 'masa magra', 'método navy', 'porcentaje grasa', 'medidas corporales', 'calculadora fitness'],
    path: '/composicion'
  },
  'ritmo-cardiaco': {
    title: 'Calculadora de Ritmo Cardíaco Médica | Zonas de Entrenamiento Científicas',
    description: 'Calculadora profesional de frecuencia cardíaca con fórmulas médicas validadas. Zonas de entrenamiento precisas para deportistas y profesionales. Optimización cardiovascular basada en evidencia científica.',
    keywords: ['calculadora ritmo cardíaco', 'frecuencia cardíaca máxima', 'zonas entrenamiento', 'quemar grasa', 'cardio', 'pulsaciones'],
    path: '/ritmo-cardiaco'
  },
  'grasa-corporal': {
    title: 'Calculadora de Grasa Corporal Médica | Métodos Científicos Validados | Precisión Profesional',
    description: 'Calculadora profesional de grasa corporal con métodos Jackson-Pollock y Durnin-Womersley validados científicamente. Precisión de ±3-5% utilizada por nutricionistas y médicos deportivos.',
    keywords: ['calculadora grasa corporal', 'calculadora fit', 'pliegues cutáneos', 'Jackson-Pollock', 'Durnin-Womersley', 'composición corporal', 'porcentaje grasa', 'calibrador', 'calculadora fitness'],
    path: '/grasa-corporal'
  },
  'peso-ideal': {
    title: 'Calculadora de Peso Ideal Médica | 5 Fórmulas Científicas | Precisión Profesional',
    description: 'Calculadora profesional de peso ideal con 5 fórmulas médicas validadas (Robinson, Miller, Devine, Hamwi, Peterson). Resultados precisos utilizados por nutricionistas y médicos. Análisis comparativo profesional.',
    keywords: ['calculadora peso ideal', 'calculadora fit', 'peso ideal', 'fórmulas científicas', 'Robinson', 'Miller', 'Devine', 'Hamwi', 'Peterson', 'peso saludable', 'altura peso', 'calculadora fitness'],
    path: '/peso-ideal'
  },
  'masa-muscular': {
    title: 'Calculadora de Masa Muscular Médica | Fórmula Lee Validada | Precisión Científica',
    description: 'Calculadora profesional de masa muscular con fórmula de Lee (2000) validada científicamente. Índice de masa muscular preciso para deportistas y profesionales de la salud. Utilizada por nutricionistas deportivos.',
    keywords: ['calculadora masa muscular', 'calculadora fit', 'masa muscular', 'índice masa muscular', 'composición corporal', 'desarrollo muscular', 'fórmula Lee', 'entrenamiento fuerza', 'músculo', 'calculadora fitness'],
    path: '/masa-muscular'
  },
  bmr: {
    title: 'Calculadora BMR Médica | Metabolismo Basal Científico | 3 Fórmulas Validadas',
    description: 'Calculadora profesional de BMR (metabolismo basal) con fórmulas Mifflin-St Jeor, Harris-Benedict y Katch-McArdle validadas científicamente. Precisión médica para nutricionistas y profesionales de la salud.',
    keywords: ['calculadora BMR', 'calculadora fit', 'metabolismo basal', 'BMR', 'calorías basal', 'Mifflin-St Jeor', 'Harris-Benedict', 'Katch-McArdle', 'metabolismo', 'calorías reposo', 'calculadora fitness'],
    path: '/bmr'
  },
  '1rm': {
    title: 'Calculadora 1RM Científica | Una Repetición Máxima | 5 Fórmulas Validadas',
    description: 'Calculadora profesional de 1RM con fórmulas Brzycki, Epley, Lander, O\'Conner y Lombardi validadas científicamente. Planifica entrenamientos de fuerza con precisión médica. Utilizada por atletas y entrenadores.',
    keywords: ['calculadora 1RM', 'calculadora fit', 'una repetición máxima', '1RM', 'fuerza máxima', 'Brzycki', 'Epley', 'Lander', 'powerlifting', 'entrenamiento fuerza', 'repetición máxima', 'calculadora fitness'],
    path: '/1rm'
  },
  whtr: {
    title: 'Calculadora WHtR Médica | Ratio Cintura-Altura | Riesgo Cardiometabólico',
    description: 'Calculadora profesional WHtR (Waist-to-Height Ratio) para evaluar riesgo cardiometabólico por distribución de grasa abdominal. Mejor predictor que el IMC para diabetes y síndrome metabólico. Validado científicamente.',
    keywords: ['calculadora WHtR', 'calculadora fit', 'ratio cintura altura', 'WHtR', 'waist height ratio', 'riesgo cardiometabólico', 'grasa abdominal', 'síndrome metabólico', 'diabetes', 'obesidad central', 'calculadora médica'],
    path: '/whtr'
  },
  vo2max: {
    title: 'Calculadora VO2 Max | Capacidad Cardiovascular | Test de Cooper',
    description: 'Calculadora profesional de VO2 Max con 4 métodos científicos (Cooper, Rockport, Astrand, Step Test). Evalúa tu capacidad cardiovascular, zonas de entrenamiento y nivel de fitness. Ideal para deportistas y salud cardíaca.',
    keywords: ['calculadora VO2 Max', 'test de Cooper', 'capacidad cardiovascular', 'VO2 max', 'fitness cardiovascular', 'zonas de entrenamiento', 'salud cardíaca', 'deporte', 'entrenamiento', 'aeróbico', 'anaeróbico'],
    path: '/vo2max'
  },
  sarcopenia: {
    title: 'Calculadora Índice de Sarcopenia | Pérdida Muscular | EWGSOP',
    description: 'Calculadora médica profesional del Índice de Sarcopenia con fórmulas Baumgartner, ASMM y SMMI. Evalúa pérdida muscular relacionada con la edad, riesgo funcional y estrategias preventivas. Basado en estándares EWGSOP2.',
    keywords: ['calculadora sarcopenia', 'índice sarcopenia', 'pérdida muscular', 'sarcopenia', 'masa muscular edad', 'EWGSOP2', 'geriatría', 'envejecimiento', 'masa muscular', 'fragilidad', 'salud muscular', 'prevención sarcopenia'],
    path: '/sarcopenia'
  },
  whr: {
    title: 'Calculadora WHR Médica | Ratio Cintura-Cadera | OMS | Riesgo Cardiovascular',
    description: 'Calculadora profesional de Ratio Cintura-Cadera (WHR) según estándares OMS. Evalúa distribución de grasa corporal, riesgo cardiovascular y síndrome metabólico. Complementa WHtR e IMC para evaluación completa de salud.',
    keywords: ['calculadora WHR', 'ratio cintura cadera', 'WHR', 'waist hip ratio', 'distribución grasa', 'riesgo cardiovascular', 'síndrome metabólico', 'obesidad central', 'forma corporal', 'androide ginoide', 'salud cardiovascular', 'OMS'],
    path: '/whr'
  },
  ffmi: {
    title: 'Calculadora FFMI Médica | Índice Masa Libre de Grasa | Katch-McArdle',
    description: 'Calculadora profesional del Índice de Masa Libre de Grasa (FFMI) según fórmula Katch-McArdle. Evalúa desarrollo muscular independiente de grasa corporal. Ideal para atletas, fisicoculturistas y seguimiento de hipertrofia muscular.',
    keywords: ['calculadora FFMI', 'índice masa libre de grasa', 'FFMI', 'fat-free mass index', 'desarrollo muscular', 'hipertrofia', 'atletas', 'fisicoculturismo', 'composición corporal', 'masa muscular', 'Katch-McArdle', 'genética muscular'],
    path: '/ffmi'
  },
  fmi: {
    title: 'Calculadora FMI Médica | Índice Masa Grasa | Schutz | Composición Corporal',
    description: 'Calculadora profesional del Índice de Masa Grasa (FMI) según fórmula Schutz. Evalúa cantidad de grasa corporal independiente de altura. Complementa FFMI para análisis completo de composición corporal. Ideal para evaluación médica y seguimiento nutricional.',
    keywords: ['calculadora FMI', 'índice masa grasa', 'FMI', 'fat mass index', 'grasa corporal', 'composición corporal', 'obesidad', 'salud metabólica', 'evaluación nutricional', 'índice antropométrico', 'Schutz', 'análisis corporal'],
    path: '/fmi'
  },
  bai: {
    title: 'Calculadora BAI Médica | Índice Adiposidad Corporal | Bergman | Sin Báscula',
    description: 'Calculadora profesional del Índice de Adiposidad Corporal (BAI) según fórmula Bergman. Estima grasa corporal sin báscula usando solo cadera y altura. Especialmente precisa en mujeres. Alternativa práctica al IMC para evaluación de composición corporal.',
    keywords: ['calculadora BAI', 'índice adiposidad corporal', 'BAI', 'body adiposity index', 'grasa corporal sin báscula', 'circunferencia cadera', 'composición corporal', 'Bergman', 'estimación grasa', 'sin peso', 'antropometría', 'evaluación corporal'],
    path: '/bai'
  },
  rmr: {
    title: 'Calculadora RMR Médica | Tasa Metabólica Reposo | 3 Fórmulas Científicas',
    description: 'Calculadora profesional de RMR (Resting Metabolic Rate) con fórmulas Mifflin-St Jeor, Harris-Benedict y Katch-McArdle. Gasto energético en reposo más práctico que BMR. Ideal para planificación nutricional y seguimiento metabólico diario.',
    keywords: ['calculadora RMR', 'tasa metabólica reposo', 'RMR', 'resting metabolic rate', 'metabolismo basal', 'gasto energético', 'Mifflin-St Jeor', 'Harris-Benedict', 'Katch-McArdle', 'calorías reposo', 'metabolismo', 'nutrición'],
    path: '/rmr'
  },
  'peso-ajustado': {
    title: 'Calculadora Peso Ajustado Clínico ABW | Robinson | Farmacia y Nutrición',
    description: 'Calculadora profesional de Peso Ajustado (ABW - Adjusted Body Weight) según fórmula Robinson. Fundamental para dosificación de medicamentos, necesidades calóricas y proteicas en obesidad y bajo peso. Herramienta clínica validada para profesionales de salud.',
    keywords: ['calculadora peso ajustado', 'ABW', 'adjusted body weight', 'peso clínico', 'Robinson', 'dosificación medicamentos', 'nutrición clínica', 'peso ideal', 'obesidad', 'farmacia', 'necesidades proteicas', 'cálculos clínicos'],
    path: '/peso-ajustado'
  },
  bsa: {
    title: 'Calculadora BSA Superficie Corporal | 5 Fórmulas Científicas | Du Bois | Mosteller',
    description: 'Calculadora profesional de BSA (Body Surface Area - Superficie Corporal) con 5 fórmulas científicas: Du Bois, Mosteller, Haycock, Gehan y Boyd. Esencial para dosificación de quimioterapia, cálculo cardiaco, fluidos intravenosos y nutrición hospitalaria. Herramienta clínica validada.',
    keywords: ['calculadora BSA', 'superficie corporal', 'body surface area', 'BSA', 'Du Bois', 'Mosteller', 'Haycock', 'quimioterapia', 'dosificación medicamentos', 'cardiac index', 'fluidos intravenosos', 'nutrición hospitalaria', 'oncología', 'cuidados intensivos'],
    path: '/bsa'
  },
  absi: {
    title: 'Calculadora ABSI | A Body Shape Index | Predicción Mortalidad | Krakauer',
    description: 'Calculadora profesional de ABSI (A Body Shape Index) según fórmula Krakauer & Krakauer (2012). Predice riesgo de mortalidad mejor que el IMC solo al incorporar distribución de grasa abdominal. Evaluación de riesgo cardiovascular, diabetes y mortalidad por todas las causas.',
    keywords: ['calculadora ABSI', 'A Body Shape Index', 'ABSI', 'Krakauer', 'predicción mortalidad', 'riesgo cardiovascular', 'índice forma corporal', 'mortalidad', 'riesgo salud', 'circunferencia cintura', 'distribución grasa', 'síndrome metabólico'],
    path: '/absi'
  },
  bri: {
    title: 'Calculadora BRI | Body Roundness Index | Riesgo Metabólico | Thomas',
    description: 'Calculadora profesional de BRI (Body Roundness Index) según fórmula Thomas et al. (2013). Predice riesgo metabólico y cardiovascular basándose en la forma corporal. Evaluación de síndrome metabólico, diabetes tipo 2 y enfermedad cardiovascular.',
    keywords: ['calculadora BRI', 'Body Roundness Index', 'BRI', 'Thomas', 'riesgo metabólico', 'riesgo cardiovascular', 'índice redondez corporal', 'síndrome metabólico', 'diabetes', 'circunferencia cintura', 'forma corporal'],
    path: '/bri'
  },
  ci: {
    title: 'Calculadora CI | Conicity Index | Distribución Grasa Abdominal | Valdez',
    description: 'Calculadora profesional de CI (Conicity Index) según fórmula Valdez (1991). Evalúa distribución de grasa abdominal comparando cintura con circunferencia esperada. Predice riesgo cardiovascular y metabólico. Herramienta epidemiológica validada.',
    keywords: ['calculadora CI', 'Conicity Index', 'CI', 'Valdez', 'índice conicidad', 'distribución grasa abdominal', 'riesgo cardiovascular', 'riesgo metabólico', 'circunferencia cintura', 'obesidad abdominal', 'síndrome metabólico'],
    path: '/ci'
  }
};

export function generateMetadata(page: keyof typeof PAGE_METADATA): Metadata {
  const pageData = PAGE_METADATA[page];

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    authors: [{ name: 'NutriFit Calculator' }],
    creator: 'NutriFit Calculator',
    publisher: 'NutriFit Calculator',
    robots: 'index, follow',
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${SITE_CONFIG.url}${pageData.path}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(pageData.title)}`,
          width: 1200,
          height: 630,
          alt: pageData.title,
        }
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [`${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(pageData.title)}`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}${pageData.path}`
    }
  };
}

export function generateJsonLd(page: keyof typeof PAGE_METADATA) {
  const pageData = PAGE_METADATA[page];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_CONFIG.name,
    applicationCategory: 'HealthApplication',
    description: pageData.description,
    url: `${SITE_CONFIG.url}${pageData.path}`,
    operatingSystem: 'Web Browser',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    author: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: SITE_CONFIG.url
    },
    publisher: {
      '@type': 'Organization',
      name: 'NutriFit Calculator',
      url: SITE_CONFIG.url
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
    screenshot: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(pageData.title)}`,
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