import { SchemaMarkup } from '@/components/SchemaMarkup';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('peso-ajustado');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup calculatorKey="peso-ajustado" />
      {children}
    </>
  );
}
