import { JsonLd } from '@/components/JsonLd';
import { getCalculatorsByCategory } from '@/lib/calculators';
import { getCanonicalUrl, SITE_CONFIG } from '@/lib/seo';
import { Metadata } from 'next';

const CANONICAL = getCanonicalUrl('/calculadoras/nutricion');

export const metadata: Metadata = {
  title: 'Calculadoras de Nutrición Gratis – Calorías, Macros, Proteína y Más',
  description: 'Calculadoras de nutrición con fórmulas científicas validadas. Calcula calorías (TDEE), metabolismo basal (BMR/RMR), proteína diaria, fibra, azúcar, sodio y alcohol. Resultados precisos y gratuitos.',
  keywords: ['calculadora nutrición', 'calorías', 'macros', 'TDEE', 'BMR', 'proteína diaria', 'fibra', 'azúcar', 'sodio'],
  openGraph: {
    title: 'Calculadoras de Nutrición Gratis – Calorías, Macros, Proteína y Más',
    description: 'Calculadoras de nutrición con fórmulas científicas validadas. Calcula calorías, macros, proteína y más.',
    type: 'website',
    url: CANONICAL,
    siteName: SITE_CONFIG.name,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: 'Calculadoras de Nutrición' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras de Nutrición Gratis – Calorías, Macros, Proteína y Más',
    description: 'Calculadoras de nutrición con fórmulas científicas validadas.',
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: {
    canonical: CANONICAL,
  },
};

function getCategoryJsonLd() {
  const calculators = getCalculatorsByCategory('nutrition');
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Calculadoras de Nutrición',
    description: 'Calculadoras de nutrición con fórmulas científicas validadas.',
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
        { '@type': 'ListItem', position: 2, name: 'Nutrición', item: CANONICAL },
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
