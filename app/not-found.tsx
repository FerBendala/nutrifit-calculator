import { Container } from '@/components/Container';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada | NutriFit Calculator',
  description: 'La página que buscas no existe. Explora nuestras calculadoras de nutrición y fitness.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <Container size="xl" className="py-[4.236rem]">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <p className="text-8xl font-bold text-primary/20">404</p>
          <h1 className="text-3xl font-bold">Página no encontrada</h1>
          <p className="text-muted-foreground text-lg">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Calculadoras populares</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="p-4 rounded-lg border hover:bg-accent transition-colors text-left"
            >
              <p className="font-medium">Calorías y Macros</p>
              <p className="text-sm text-muted-foreground">Calcula tus necesidades calóricas</p>
            </Link>
            <Link
              href="/imc/"
              className="p-4 rounded-lg border hover:bg-accent transition-colors text-left"
            >
              <p className="font-medium">Calculadora IMC</p>
              <p className="text-sm text-muted-foreground">Índice de masa corporal</p>
            </Link>
            <Link
              href="/tdee/"
              className="p-4 rounded-lg border hover:bg-accent transition-colors text-left"
            >
              <p className="font-medium">Calculadora TDEE</p>
              <p className="text-sm text-muted-foreground">Gasto energético diario</p>
            </Link>
            <Link
              href="/proteina/"
              className="p-4 rounded-lg border hover:bg-accent transition-colors text-left"
            >
              <p className="font-medium">Proteína Diaria</p>
              <p className="text-sm text-muted-foreground">Gramos de proteína necesarios</p>
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
}
