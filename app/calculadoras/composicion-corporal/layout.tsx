import { JsonLd } from '@/components/JsonLd';
import { getCalculatorsByCategory } from '@/lib/calculators';
import { getCanonicalUrl, SITE_CONFIG } from '@/lib/seo';
import { Metadata } from 'next';

const CANONICAL = getCanonicalUrl('/calculadoras/composicion-corporal');

export const metadata: Metadata = {
  title: 'Calculadoras de Composición Corporal – IMC, Grasa, Peso Ideal y Más',
  description: 'Calculadoras de composición corporal con fórmulas científicas. Calcula IMC, grasa corporal, peso ideal, masa magra, WHtR, WHR, FFMI, FMI, BAI y peso ajustado. Análisis completo de tu cuerpo.',
  keywords: ['composición corporal', 'IMC', 'grasa corporal', 'peso ideal', 'masa magra', 'WHtR', 'WHR', 'FFMI', 'FMI', 'BAI'],
  openGraph: {
    title: 'Calculadoras de Composición Corporal – IMC, Grasa, Peso Ideal y Más',
    description: 'Calculadoras de composición corporal con fórmulas científicas. Analiza tu IMC, grasa, masa magra y más.',
    type: 'website',
    url: CANONICAL,
    siteName: SITE_CONFIG.name,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: 'Calculadoras de Composición Corporal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras de Composición Corporal – IMC, Grasa, Peso Ideal y Más',
    description: 'Calculadoras de composición corporal con fórmulas científicas.',
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: {
    canonical: CANONICAL,
  },
};

function getCategoryJsonLd() {
  const calculators = getCalculatorsByCategory('body-composition');
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Calculadoras de Composición Corporal',
    description: 'Calculadoras de composición corporal con fórmulas científicas validadas.',
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
        { '@type': 'ListItem', position: 2, name: 'Composición Corporal', item: CANONICAL },
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
