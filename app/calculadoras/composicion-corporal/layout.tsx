import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadoras de Composición Corporal – IMC, Grasa, Peso Ideal y Más',
  description: 'Calculadoras de composición corporal con fórmulas científicas. Calcula IMC, grasa corporal, peso ideal, masa magra, WHtR, WHR, FFMI, FMI, BAI y peso ajustado. Análisis completo de tu cuerpo.',
  openGraph: {
    title: 'Calculadoras de Composición Corporal – IMC, Grasa, Peso Ideal y Más',
    description: 'Calculadoras de composición corporal con fórmulas científicas. Analiza tu IMC, grasa, masa magra y más.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nutrifit-calculator.com/calculadoras/composicion-corporal/',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
