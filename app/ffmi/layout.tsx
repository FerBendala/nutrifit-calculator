import { SchemaMarkup } from '@/components/SchemaMarkup';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('ffmi');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup calculatorKey="ffmi" />
      {children}
    </>
  );
}
