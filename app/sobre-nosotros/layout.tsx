import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Metodología y Misión | NutriFit Calculator',
  description: 'Conoce la metodología científica, el proceso de revisión editorial y la misión de NutriFit Calculator. Calculadoras de salud basadas en evidencia científica.',
  openGraph: {
    title: 'Sobre Nosotros - Metodología y Misión | NutriFit Calculator',
    description: 'Conoce la metodología científica, el proceso de revisión editorial y la misión de NutriFit Calculator.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nutrifit-calculator.com/sobre-nosotros/',
  },
};

export default function SobreNosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
