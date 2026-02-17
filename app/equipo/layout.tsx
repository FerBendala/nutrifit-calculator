import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestro Equipo - Profesionales en Salud y Nutricion | NutriFit Calculator',
  description: 'Conoce al equipo detras de NutriFit Calculator. Profesionales de la salud, nutricion y tecnologia comprometidos con la precision cientifica.',
  openGraph: {
    title: 'Nuestro Equipo | NutriFit Calculator',
    description: 'Conoce al equipo detras de NutriFit Calculator. Profesionales de la salud y nutricion.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nutrifit-calculator.com/equipo/',
  },
};

export default function EquipoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
