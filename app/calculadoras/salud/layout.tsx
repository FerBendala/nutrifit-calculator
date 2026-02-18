import { JsonLd } from '@/components/JsonLd';
import { getCalculatorsByCategory } from '@/lib/calculators';
import { getCanonicalUrl, SITE_CONFIG } from '@/lib/seo';
import { Metadata } from 'next';

const CANONICAL = getCanonicalUrl('/calculadoras/salud');

export const metadata: Metadata = {
  title: 'Calculadoras de Salud – Riesgo Cardiovascular, Renal, Óseo y Más',
  description: 'Calculadoras médicas de salud con fórmulas validadas. Evalúa riesgo cardiovascular (ABSI, BRI, CI), grasa visceral, densidad ósea, función renal (eGFR), sarcopenia, presión arterial y más.',
  keywords: ['calculadora salud', 'riesgo cardiovascular', 'ABSI', 'BRI', 'grasa visceral', 'eGFR', 'densidad ósea', 'sarcopenia', 'presión arterial'],
  openGraph: {
    title: 'Calculadoras de Salud – Riesgo Cardiovascular, Renal, Óseo y Más',
    description: 'Calculadoras médicas de salud con fórmulas validadas. Evalúa riesgo cardiovascular, función renal y más.',
    type: 'website',
    url: CANONICAL,
    siteName: SITE_CONFIG.name,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: 'Calculadoras de Salud' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras de Salud – Riesgo Cardiovascular, Renal, Óseo y Más',
    description: 'Calculadoras médicas de salud con fórmulas validadas.',
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: {
    canonical: CANONICAL,
  },
};

function getCategoryJsonLd() {
  const calculators = getCalculatorsByCategory('health');
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Calculadoras de Salud y Riesgo Médico',
    description: 'Calculadoras médicas de salud con fórmulas validadas.',
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
        { '@type': 'ListItem', position: 2, name: 'Salud', item: CANONICAL },
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
