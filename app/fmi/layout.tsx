import { SchemaMarkup } from '@/components/SchemaMarkup';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('fmi');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup calculatorKey="fmi" />
      {children}
    </>
  );
}
