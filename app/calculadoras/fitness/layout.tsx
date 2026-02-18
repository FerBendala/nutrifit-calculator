import { JsonLd } from '@/components/JsonLd';
import { getCalculatorsByCategory } from '@/lib/calculators';
import { getCanonicalUrl, SITE_CONFIG } from '@/lib/seo';
import { Metadata } from 'next';

const CANONICAL = getCanonicalUrl('/calculadoras/fitness');

export const metadata: Metadata = {
  title: 'Calculadoras de Fitness – 1RM, VO2 Max, Masa Muscular y Más',
  description: 'Calculadoras de fitness con fórmulas científicas validadas. Calcula tu 1RM, VO2 Max, masa muscular, FFMI, frecuencia cardíaca y recuperación cardíaca. Optimiza tu entrenamiento con datos precisos.',
  keywords: ['calculadora fitness', '1RM', 'VO2 Max', 'masa muscular', 'FFMI', 'frecuencia cardíaca', 'recuperación cardíaca'],
  openGraph: {
    title: 'Calculadoras de Fitness – 1RM, VO2 Max, Masa Muscular y Más',
    description: 'Calculadoras de fitness con fórmulas científicas. Calcula 1RM, VO2 Max, masa muscular y más.',
    type: 'website',
    url: CANONICAL,
    siteName: SITE_CONFIG.name,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: 'Calculadoras de Fitness' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras de Fitness – 1RM, VO2 Max, Masa Muscular y Más',
    description: 'Calculadoras de fitness con fórmulas científicas validadas.',
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: {
    canonical: CANONICAL,
  },
};

function getCategoryJsonLd() {
  const calculators = getCalculatorsByCategory('fitness');
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Calculadoras de Fitness',
    description: 'Calculadoras de fitness con fórmulas científicas validadas.',
    url: CANONICAL,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: calculators.map((calc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: calc.title,
        url: getCanonicalUrl(calc.href),
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_CONFIG.url + '/' },
        { '@type': 'ListItem', position: 2, name: 'Fitness', item: CANONICAL },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={getCategoryJsonLd()} />
      {children}
    </>
  );
}
