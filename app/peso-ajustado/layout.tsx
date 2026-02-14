import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('peso-ajustado');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
