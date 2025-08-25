import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

export const SITE_CONFIG = {
  name: 'NutriFit Calculator',
  description: 'Calculadora gratuita de calorías, macros, IMC y más. Herramientas profesionales para tu nutrición y fitness.',
  url: 'https://nutrifit-calculator.com',
  ogImage: '/api/og',
};

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'Calculadora de Calorías y Macros - NutriFit Calculator',
    description: 'Calculadora gratuita de calorías y macros para perder grasa, mantener peso o ganar músculo. Calcula tu objetivo según peso y ejercicio con fórmula científica.',
    keywords: ['calculadora calorías', 'macronutrientes', 'perder grasa', 'mantener peso', 'ganar músculo', 'peso corporal', 'ejercicio'],
    path: '/'
  },
  imc: {
    title: 'Calculadora de IMC - Índice de Masa Corporal - NutriFit',
    description: 'Calculadora de IMC gratuita para conocer tu peso ideal. Calcula tu índice de masa corporal según peso y altura con estándares OMS.',
    keywords: ['calculadora IMC', 'índice masa corporal', 'peso ideal', 'peso corporal', 'calculadora peso', 'obesidad'],
    path: '/imc'
  },
  tdee: {
    title: 'Calculadora TDEE - Gasto Calórico Diario - NutriFit',
    description: 'Calculadora TDEE gratuita según peso y ejercicio. Calcula tu gasto calórico diario total para perder grasa, mantener peso o ganar músculo.',
    keywords: ['calculadora TDEE', 'gasto calórico', 'peso corporal', 'ejercicio físico', 'perder grasa', 'mantener peso'],
    path: '/tdee'
  },
  proteina: {
    title: 'Calculadora de Proteína Diaria - NutriFit',
    description: 'Calculadora de proteína según peso corporal y ejercicio. Calcula tus necesidades diarias para ganar músculo o mantener peso con recomendaciones científicas.',
    keywords: ['calculadora proteína', 'proteína diaria', 'peso corporal', 'ganar músculo', 'ejercicio', 'masa muscular'],
    path: '/proteina'
  },
  agua: {
    title: 'Calculadora de Agua Diaria - Hidratación - NutriFit',
    description: 'Calculadora de agua diaria según peso corporal y ejercicio. Calcula cuánta agua beber para mantener hidratación óptima durante el ejercicio.',
    keywords: ['calculadora agua', 'agua diaria', 'peso corporal', 'ejercicio', 'hidratación', 'agua ejercicio'],
    path: '/agua'
  },
  composicion: {
    title: 'Calculadora de Grasa Corporal y Composición - NutriFit',
    description: 'Calculadora de grasa corporal gratuita con método Navy. Calcula tu porcentaje de grasa, masa magra y ratio cintura-cadera según medidas corporales.',
    keywords: ['calculadora grasa corporal', 'composición corporal', 'masa magra', 'método navy', 'porcentaje grasa', 'medidas corporales'],
    path: '/composicion'
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
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      name: 'NutriFit Calculator'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    }
  };
}