import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadoras de Nutrición Gratis – Calorías, Macros, Proteína y Más',
  description: 'Calculadoras de nutrición con fórmulas científicas validadas. Calcula calorías (TDEE), metabolismo basal (BMR/RMR), proteína diaria, fibra, azúcar, sodio y alcohol. Resultados precisos y gratuitos.',
  openGraph: {
    title: 'Calculadoras de Nutrición Gratis – Calorías, Macros, Proteína y Más',
    description: 'Calculadoras de nutrición con fórmulas científicas validadas. Calcula calorías, macros, proteína y más.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nutrifit-calculator.com/calculadoras/nutricion/',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
