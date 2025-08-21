import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

export const SITE_CONFIG = {
  name: 'Calculadora Fitness',
  description: 'Calculadora gratuita de calorías, macros, IMC y más. Herramientas profesionales para tu nutrición y fitness.',
  url: 'https://calculadora-fitness.vercel.app',
  ogImage: '/api/og',
};

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'Calculadora de Calorías y Macros Gratis - Calculadora Fitness',
    description: 'Calcula tus calorías diarias y distribución de macronutrientes (proteínas, grasas, carbohidratos) según tu objetivo. Fórmula científica Mifflin-St Jeor.',
    keywords: ['calculadora calorías', 'macronutrientes', 'TDEE', 'pérdida peso', 'ganancia músculo', 'nutrición'],
    path: '/'
  },
  imc: {
    title: 'Calculadora de IMC (Índice de Masa Corporal) - Calculadora Fitness',
    description: 'Calcula tu Índice de Masa Corporal (IMC) y conoce tu categoría según los estándares de la OMS. Herramienta gratuita y precisa.',
    keywords: ['IMC', 'índice masa corporal', 'peso ideal', 'obesidad', 'sobrepeso'],
    path: '/imc'
  },
  tdee: {
    title: 'Calculadora TDEE - Gasto Calórico Diario - Calculadora Fitness',
    description: 'Calcula tu TDEE (Total Daily Energy Expenditure) con la fórmula Mifflin-St Jeor. Conoce tu gasto calórico diario según tu actividad física.',
    keywords: ['TDEE', 'gasto calórico', 'metabolismo basal', 'BMR', 'calorías diarias'],
    path: '/tdee'
  },
  proteina: {
    title: 'Calculadora de Proteína Diaria - Calculadora Fitness',
    description: 'Calcula tus necesidades diarias de proteína según tu peso, objetivo y nivel de actividad. Recomendaciones basadas en ciencia.',
    keywords: ['proteína diaria', 'proteínas', 'masa muscular', 'nutrición deportiva'],
    path: '/proteina'
  },
  agua: {
    title: 'Calculadora de Agua Diaria - Hidratación - Calculadora Fitness',
    description: 'Calcula cuánta agua debes beber al día según tu peso y nivel de actividad. Mantén una hidratación óptima para tu salud.',
    keywords: ['agua diaria', 'hidratación', 'líquidos', 'salud', 'bienestar'],
    path: '/agua'
  }
};

export function generateMetadata(page: keyof typeof PAGE_METADATA): Metadata {
  const pageData = PAGE_METADATA[page];
  
  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    authors: [{ name: 'Calculadora Fitness' }],
    creator: 'Calculadora Fitness',
    publisher: 'Calculadora Fitness',
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
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      name: 'Calculadora Fitness'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    }
  };
}