import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadoras de Fitness – 1RM, VO2 Max, Masa Muscular y Más',
  description: 'Calculadoras de fitness con fórmulas científicas validadas. Calcula tu 1RM, VO2 Max, masa muscular, FFMI, frecuencia cardíaca y recuperación cardíaca. Optimiza tu entrenamiento con datos precisos.',
  openGraph: {
    title: 'Calculadoras de Fitness – 1RM, VO2 Max, Masa Muscular y Más',
    description: 'Calculadoras de fitness con fórmulas científicas. Calcula 1RM, VO2 Max, masa muscular y más.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nutrifit-calculator.com/calculadoras/fitness/',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
