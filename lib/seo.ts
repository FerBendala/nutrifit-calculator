import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

export const SITE_CONFIG = {
  name: 'NutriFit Calculator - Calculadoras de Nutrición y Fitness',
  description: 'Calculadoras de nutrición y fitness con fórmulas científicas validadas. Calcula calorías, macros, grasa corporal, peso ideal y más. Resultados precisos y gratuitos.',
  url: 'https://nutrifit-calculator.com',
  ogImage: '/api/og',
};

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'Calculadora de Calorías y Macros Gratis - Resultados en Segundos',
    description: 'Calcula tus calorías y macros diarios según tu objetivo: perder grasa, mantener peso o ganar músculo. Fórmula Mifflin-St Jeor validada científicamente. Resultados precisos en segundos. 100% gratuita.',
    keywords: ['calculadora calorías', 'calculadora macros', 'calcular calorías', 'macronutrientes', 'perder grasa', 'perder peso', 'ganar músculo', 'dieta', 'nutrición', 'calculadora fitness'],
    path: '/'
  },
  imc: {
    title: 'Calculadora de IMC - Calcula tu Índice de Masa Corporal',
    description: 'Calcula tu IMC (Índice de Masa Corporal) al instante. Descubre si tu peso es normal, bajo peso, sobrepeso u obesidad según los estándares de la OMS. Resultados precisos con interpretación clara.',
    keywords: ['calculadora IMC', 'calcular IMC', 'índice masa corporal', 'peso ideal', 'calcular peso', 'IMC OMS', 'sobrepeso', 'obesidad', 'peso saludable'],
    path: '/imc/'
  },
  tdee: {
    title: 'Calculadora TDEE - Cuántas Calorías Necesitas al Día',
    description: 'Calcula tu gasto calórico diario (TDEE) según tu edad, peso y actividad física. Descubre cuántas calorías necesitas para mantener, perder o ganar peso. Usa la fórmula Mifflin-St Jeor validada científicamente.',
    keywords: ['calculadora TDEE', 'cuántas calorías necesito', 'gasto calórico diario', 'calcular calorías', 'calorías mantenimiento', 'TDEE calculadora', 'metabolismo', 'perder peso', 'calorías diarias'],
    path: '/tdee/'
  },
  proteina: {
    title: 'Calculadora de Proteína Diaria - Cuánta Necesitas',
    description: 'Calcula cuánta proteína necesitas al día según tu peso, actividad física y objetivo (ganar músculo, perder grasa o mantener). Recomendaciones basadas en estudios científicos. Resultados personalizados al instante.',
    keywords: ['calculadora proteína', 'cuánta proteína necesito', 'proteína diaria', 'calcular proteína', 'proteína para ganar músculo', 'gramos proteína día', 'proteína peso'],
    path: '/proteina/'
  },
  agua: {
    title: 'Calculadora de Agua Diaria - Cuántos Litros Necesitas',
    description: 'Calcula cuánta agua debes beber al día según tu peso, actividad física y condiciones ambientales. Mantente bien hidratado con recomendaciones personalizadas basadas en estudios científicos.',
    keywords: ['calculadora agua', 'cuánta agua beber', 'agua diaria', 'litros agua día', 'calcular hidratación', 'cuántos litros agua', 'hidratación diaria'],
    path: '/agua/'
  },
  composicion: {
    title: 'Calculadora de Composición Corporal - Grasa, Músculo y Más',
    description: 'Calcula tu composición corporal completa con el método Navy validado científicamente. Obtén tu porcentaje de grasa, masa magra y ratio cintura-cadera usando solo medidas simples. Análisis completo de tu cuerpo.',
    keywords: ['calculadora composición corporal', 'composición corporal', 'calcular composición corporal', 'método navy', 'porcentaje grasa', 'masa magra', 'medidas corporales'],
    path: '/composicion/'
  },
  'ritmo-cardiaco': {
    title: 'Calculadora de Frecuencia Cardíaca - Zonas de Entrenamiento',
    description: 'Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento personalizadas. Descubre tus zonas de quema de grasa, cardio y anaeróbica según tu edad. Optimiza tu entrenamiento cardiovascular con datos precisos.',
    keywords: ['calculadora frecuencia cardíaca', 'frecuencia cardíaca máxima', 'zonas de entrenamiento', 'pulsaciones máximas', 'zona quema grasa', 'ritmo cardíaco', 'FCM'],
    path: '/ritmo-cardiaco/'
  },
  'grasa-corporal': {
    title: 'Calculadora de Grasa Corporal - Tu % Exacto con Métodos Científicos',
    description: 'Calcula tu porcentaje de grasa corporal con métodos científicos utilizados por profesionales. Usa pliegues cutáneos (Jackson-Pollock y Durnin-Womersley) para obtener resultados precisos. Descubre tu composición corporal real.',
    keywords: ['calculadora grasa corporal', 'calcular grasa corporal', 'porcentaje grasa corporal', 'pliegues cutáneos', 'composición corporal', 'cuánta grasa tengo', 'grasa corporal', 'medir grasa'],
    path: '/grasa-corporal/'
  },
  'peso-ideal': {
    title: 'Calculadora de Peso Ideal - 5 Fórmulas para Tu Altura',
    description: 'Calcula tu peso ideal según tu altura con 5 fórmulas científicas diferentes (Robinson, Miller, Devine, Hamwi, Peterson). Compara resultados y descubre tu rango de peso saludable. Resultados personalizados al instante.',
    keywords: ['calculadora peso ideal', 'peso ideal según altura', 'cuál es mi peso ideal', 'calcular peso ideal', 'peso saludable', 'peso según altura', 'IMC ideal'],
    path: '/peso-ideal/'
  },
  'masa-muscular': {
    title: 'Calculadora de Masa Muscular - Cuánto Músculo Tienes',
    description: 'Calcula tu masa muscular total e índice de masa muscular con la fórmula de Lee validada científicamente. Descubre cuántos kilogramos de músculo tienes y evalúa tu desarrollo muscular. Ideal para seguir tu progreso en el gym.',
    keywords: ['calculadora masa muscular', 'cuánta masa muscular tengo', 'calcular masa muscular', 'músculo total', 'índice masa muscular', 'desarrollo muscular', 'cuánto músculo tengo'],
    path: '/masa-muscular/'
  },
  bmr: {
    title: 'Calculadora de Metabolismo Basal (BMR) - Tu Gasto en Reposo',
    description: 'Calcula tu metabolismo basal (BMR): las calorías que quemas en reposo absoluto. Usa 3 fórmulas científicas (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle). Descubre cuánta energía necesita tu cuerpo para funcionar.',
    keywords: ['calculadora BMR', 'metabolismo basal', 'calcular metabolismo', 'calorías en reposo', 'BMR calculadora', 'tasa metabólica basal', 'cuántas calorías quemo', 'metabolismo'],
    path: '/bmr/'
  },
  '1rm': {
    title: 'Calculadora 1RM - Tu Repetición Máxima con 5 Fórmulas',
    description: 'Calcula tu 1RM (una repetición máxima) con 5 fórmulas científicas validadas. Descubre cuánto peso máximo puedes levantar en press banca, sentadilla o cualquier ejercicio. Planifica tu entrenamiento de fuerza de forma precisa.',
    keywords: ['calculadora 1RM', '1RM calculadora', 'una repetición máxima', 'calcular 1RM', 'fuerza máxima', 'peso máximo', 'repetición máxima', 'calcular peso máximo'],
    path: '/1rm/'
  },
  whtr: {
    title: 'Calculadora WHtR - Ratio Cintura-Altura y Riesgo de Salud',
    description: 'Calcula tu WHtR (Ratio Cintura-Altura) para evaluar tu riesgo de salud según tu grasa abdominal. Mejor predictor que el IMC para detectar riesgo de diabetes y síndrome metabólico. Solo necesitas cintura y altura.',
    keywords: ['calculadora WHtR', 'WHtR calculadora', 'ratio cintura altura', 'calcular WHtR', 'grasa abdominal', 'riesgo salud', 'cintura altura'],
    path: '/whtr/'
  },
  vo2max: {
    title: 'Calculadora VO2 Max - Mide Tu Capacidad Cardiovascular',
    description: 'Calcula tu VO2 Max con 4 métodos científicos (Test de Cooper, Rockport, Astrand, Step Test). Evalúa tu capacidad cardiovascular y nivel de fitness. Descubre si tu condición aeróbica es excelente, buena o necesita mejorar.',
    keywords: ['calculadora VO2 Max', 'VO2 max calculadora', 'test de Cooper', 'capacidad cardiovascular', 'calcular VO2 max', 'fitness cardiovascular', 'resistencia aeróbica'],
    path: '/vo2max/'
  },
  sarcopenia: {
    title: 'Calculadora de Sarcopenia - Evalúa Pérdida Muscular por Edad',
    description: 'Calculadora médica del Índice de Sarcopenia con fórmulas Baumgartner, ASMM y SMMI según estándares EWGSOP2. Evalúa pérdida muscular relacionada con la edad, riesgo de fragilidad y estrategias preventivas. Para profesionales de la salud y geriatría.',
    keywords: ['calculadora sarcopenia', 'índice sarcopenia', 'pérdida muscular edad', 'sarcopenia', 'EWGSOP2', 'masa muscular envejecimiento', 'fragilidad', 'geriatría'],
    path: '/sarcopenia/'
  },
  whr: {
    title: 'Calculadora WHR - Ratio Cintura-Cadera',
    description: 'Calcula tu WHR (Ratio Cintura-Cadera) según estándares de la OMS para evaluar tu distribución de grasa corporal y riesgo cardiovascular. Descubre si tu forma corporal es androide (manzana) o ginoide (pera).',
    keywords: ['calculadora WHR', 'WHR calculadora', 'ratio cintura cadera', 'calcular WHR', 'forma corporal', 'distribución grasa', 'cintura cadera'],
    path: '/whr/'
  },
  ffmi: {
    title: 'Calculadora FFMI - Índice de Masa Libre de Grasa',
    description: 'Calcula tu FFMI (Índice de Masa Libre de Grasa) para evaluar tu desarrollo muscular independientemente de tu grasa corporal. Descubre tu potencial genético y compara tu masa muscular con atletas naturales. Ideal para fisicoculturismo.',
    keywords: ['calculadora FFMI', 'FFMI calculadora', 'índice masa libre de grasa', 'calcular FFMI', 'masa muscular', 'desarrollo muscular', 'potencial genético muscular'],
    path: '/ffmi/'
  },
  fmi: {
    title: 'Calculadora FMI - Índice de Masa Grasa Corporal',
    description: 'Calcula tu FMI (Índice de Masa Grasa) según la fórmula Schutz para evaluar tu cantidad de grasa corporal independientemente de tu altura. Complementa el FFMI para un análisis completo de tu composición corporal.',
    keywords: ['calculadora FMI', 'FMI calculadora', 'índice masa grasa', 'calcular FMI', 'grasa corporal', 'composición corporal', 'masa grasa'],
    path: '/fmi/'
  },
  bai: {
    title: 'Calculadora BAI - Grasa Corporal Sin Báscula',
    description: 'Calcula tu grasa corporal sin necesidad de báscula usando el BAI (Índice de Adiposidad Corporal). Solo necesitas tu altura y circunferencia de cadera. Especialmente precisa para mujeres. Alternativa práctica al IMC.',
    keywords: ['calculadora BAI', 'BAI calculadora', 'grasa corporal sin báscula', 'calcular grasa sin peso', 'índice adiposidad corporal', 'BAI fórmula', 'grasa corporal cadera'],
    path: '/bai/'
  },
  rmr: {
    title: 'Calculadora RMR - Tasa Metabólica en Reposo',
    description: 'Calcula tu RMR (Tasa Metabólica en Reposo) con 3 fórmulas científicas. Descubre cuántas calorías quemas en reposo considerando actividades diarias ligeras. Más práctico que el BMR para planificar tu dieta.',
    keywords: ['calculadora RMR', 'RMR calculadora', 'tasa metabólica reposo', 'calcular RMR', 'calorías reposo', 'metabolismo reposo', 'gasto energético'],
    path: '/rmr/'
  },
  'peso-ajustado': {
    title: 'Calculadora de Peso Ajustado (ABW) - Fórmula para Obesidad',
    description: 'Calcula tu peso ajustado (ABW) según la fórmula Robinson utilizada en nutrición clínica. Esencial para estimar necesidades energéticas y proteicas en personas con obesidad o bajo peso. Resultado inmediato y preciso.',
    keywords: ['calculadora peso ajustado', 'peso ajustado obesidad', 'ABW', 'peso ajustado qué es', 'adjusted body weight', 'peso clínico', 'necesidades calóricas obesidad'],
    path: '/peso-ajustado/'
  },
  bsa: {
    title: 'Calculadora BSA - Superficie Corporal con 5 Fórmulas Médicas',
    description: 'Calculadora médica de BSA (Superficie Corporal) con 5 fórmulas científicas: Du Bois, Mosteller, Haycock, Gehan y Boyd. Esencial para dosificación de quimioterapia, cálculo de índice cardíaco y fluidos intravenosos. Herramienta clínica validada para profesionales de la salud.',
    keywords: ['calculadora BSA', 'superficie corporal', 'body surface area', 'BSA médica', 'Du Bois', 'Mosteller', 'dosificación quimioterapia', 'índice cardíaco', 'BSA fórmula'],
    path: '/bsa/'
  },
  absi: {
    title: 'Calculadora ABSI - Índice de Forma Corporal y Riesgo de Mortalidad',
    description: 'Calculadora de ABSI (A Body Shape Index) según fórmula Krakauer & Krakauer (2012). Predice riesgo de mortalidad mejor que el IMC al incorporar distribución de grasa abdominal. Evalúa riesgo cardiovascular, diabetes y mortalidad. Herramienta epidemiológica validada.',
    keywords: ['calculadora ABSI', 'A Body Shape Index', 'ABSI índice', 'predicción mortalidad', 'riesgo cardiovascular ABSI', 'forma corporal', 'Krakauer'],
    path: '/absi/'
  },
  bri: {
    title: 'Calculadora BRI - Índice de Redondez Corporal y Riesgo Metabólico',
    description: 'Calculadora de BRI (Body Roundness Index) según fórmula Thomas et al. (2013). Predice riesgo metabólico y cardiovascular basándose en la forma corporal. Evaluación de síndrome metabólico, diabetes tipo 2 y enfermedad cardiovascular.',
    keywords: ['calculadora BRI', 'Body Roundness Index', 'BRI índice', 'riesgo metabólico', 'índice redondez corporal', 'síndrome metabólico', 'Thomas'],
    path: '/bri/'
  },
  ci: {
    title: 'Calculadora CI - Índice de Conicidad y Grasa Abdominal',
    description: 'Calculadora de CI (Conicity Index) según fórmula Valdez (1991). Evalúa distribución de grasa abdominal comparando cintura con circunferencia esperada. Predice riesgo cardiovascular y metabólico. Herramienta epidemiológica validada para profesionales.',
    keywords: ['calculadora CI', 'Conicity Index', 'índice conicidad', 'CI Valdez', 'grasa abdominal', 'riesgo cardiovascular CI', 'obesidad abdominal'],
    path: '/ci/'
  },
  'grasa-visceral': {
    title: 'Calculadora de Grasa Visceral - Riesgo Según Tu Grasa Interna',
    description: 'Calcula tu nivel de grasa visceral (la grasa que rodea tus órganos internos) con 2 fórmulas científicas validadas. Evalúa tu riesgo metabólico y cardiovascular. Descubre si tu grasa visceral está en niveles saludables.',
    keywords: ['calculadora grasa visceral', 'grasa visceral', 'calcular grasa visceral', 'grasa interna', 'grasa abdominal', 'riesgo metabólico', 'grasa órganos'],
    path: '/grasa-visceral/'
  },
  'masa-magra': {
    title: 'Calculadora de Masa Magra (LBM) - Músculos, Huesos y Más',
    description: 'Calcula tu masa magra (LBM) total con 4 métodos científicos. Descubre cuánto pesas sin contar la grasa: músculo, huesos, órganos y agua. Útil para atletas y seguimiento de composición corporal real.',
    keywords: ['calculadora masa magra', 'LBM calculadora', 'masa magra', 'calcular masa magra', 'lean body mass', 'peso sin grasa', 'composición corporal'],
    path: '/masa-magra/'
  },
  'edad-metabolica': {
    title: 'Calculadora de Edad Metabólica - ¿Tu Metabolismo es Joven o Viejo?',
    description: 'Descubre tu edad metabólica comparando tu metabolismo con el promedio de tu edad. Averigua si tu cuerpo funciona como alguien más joven o más viejo de lo que eres. Resultado basado en tu metabolismo basal (BMR).',
    keywords: ['calculadora edad metabólica', 'edad metabólica', 'metabolic age', 'mi edad metabólica', 'metabolismo joven', 'metabolismo viejo', 'calcular edad metabólica'],
    path: '/edad-metabolica/'
  },
  'presion-arterial-media': {
    title: 'Calculadora de Presión Arterial Media (MAP) - Evaluación Cardiovascular',
    description: 'Calculadora médica de presión arterial media (MAP) para evaluación de perfusión de órganos y riesgo cardiovascular. Interpretación clínica según guías AHA/ACC. Herramienta para profesionales de la salud.',
    keywords: ['calculadora MAP', 'presión arterial media', 'MAP calculadora', 'perfusión órganos', 'presión arterial media fórmula', 'evaluación cardiovascular', 'MAP médica'],
    path: '/presion-arterial-media/'
  },
  'recuperacion-cardiaca': {
    title: 'Calculadora de Recuperación Cardíaca - Tu Condición Cardiovascular',
    description: 'Calcula tu recuperación cardíaca (HRR) para evaluar tu condición cardiovascular. Mide qué tan rápido bajan tus pulsaciones después del ejercicio. Un indicador clave de fitness y salud del corazón.',
    keywords: ['calculadora recuperación cardíaca', 'HRR calculadora', 'recuperación cardíaca', 'calcular HRR', 'pulsaciones post ejercicio', 'condición cardiovascular', 'fitness cardíaco'],
    path: '/recuperacion-cardiaca/'
  },
  'densidad-osea': {
    title: 'Calculadora de Densidad Ósea (BMD) - T-Score y Osteoporosis',
    description: 'Calculadora médica de densidad mineral ósea (BMD) para evaluación de osteoporosis según criterios WHO. Calcula T-Score y Z-Score. Evalúa riesgo de fracturas y categoriza osteopenia u osteoporosis. Para profesionales de la salud.',
    keywords: ['calculadora BMD', 'densidad ósea', 'BMD calculadora', 'T-Score', 'Z-Score', 'osteoporosis', 'osteopenia', 'densidad mineral ósea', 'WHO'],
    path: '/densidad-osea/'
  },
  egfr: {
    title: 'Calculadora eGFR - Filtrado Glomerular y Función Renal',
    description: 'Calculadora médica de filtrado glomerular estimado (eGFR) con fórmulas CKD-EPI, MDRD y Cockcroft-Gault. Estadificación de enfermedad renal crónica (ERC) y ajuste de dosis de medicamentos. Herramienta para profesionales de la salud.',
    keywords: ['calculadora eGFR', 'filtrado glomerular', 'eGFR calculadora', 'CKD-EPI', 'MDRD', 'función renal', 'creatinina', 'enfermedad renal crónica'],
    path: '/egfr/'
  },
  fibra: {
    title: 'Calculadora de Fibra Diaria - Cuánta Necesitas',
    description: 'Calcula cuánta fibra dietética necesitas al día según tu edad, sexo y calorías. Recomendaciones IOM/FDA (14 g por 1000 kcal). Mejora tu salud digestiva con la cantidad correcta de fibra.',
    keywords: ['calculadora fibra', 'cuánta fibra necesito', 'fibra diaria', 'calcular fibra', 'gramos fibra día', 'fibra dietética', 'necesidades fibra'],
    path: '/fibra/'
  },
  azucar: {
    title: 'Calculadora de Azúcar Diaria - Tu Límite Según la OMS',
    description: 'Calcula tu límite máximo de azúcar al día según las recomendaciones de la OMS. Descubre cuántos gramos de azúcares libres puedes consumir basándote en tus calorías diarias. Para una dieta saludable.',
    keywords: ['calculadora azúcar', 'límite azúcar día', 'cuánta azúcar consumir', 'azúcar diaria', 'gramos azúcar día', 'OMS azúcar', 'azúcares libres'],
    path: '/azucar/'
  },
  sodio: {
    title: 'Calculadora de Sodio y Sal - Límite Diario Recomendado',
    description: 'Conoce el límite de sodio y sal según la OMS: menos de 2 g de sodio (5 g de sal) al día. Incluye recomendaciones especiales para hipertensión. Cuida tu salud cardiovascular controlando tu consumo.',
    keywords: ['calculadora sodio', 'límite sodio', 'cuánta sal consumir', 'sodio diario', 'sal día', 'OMS sodio', 'reducir sal', 'hipertensión'],
    path: '/sodio/'
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