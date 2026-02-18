import { SchemaMarkup } from '@/components/SchemaMarkup';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('vo2max');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaMarkup calculatorKey="vo2max" />
      {children}
    </>
  );
}
