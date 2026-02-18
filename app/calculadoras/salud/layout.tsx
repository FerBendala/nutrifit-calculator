import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadoras de Salud – Riesgo Cardiovascular, Renal, Óseo y Más',
  description: 'Calculadoras médicas de salud con fórmulas validadas. Evalúa riesgo cardiovascular (ABSI, BRI, CI), grasa visceral, densidad ósea, función renal (eGFR), sarcopenia, presión arterial y más.',
  openGraph: {
    title: 'Calculadoras de Salud – Riesgo Cardiovascular, Renal, Óseo y Más',
    description: 'Calculadoras médicas de salud con fórmulas validadas. Evalúa riesgo cardiovascular, función renal y más.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nutrifit-calculator.com/calculadoras/salud/',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
