import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('composicion');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
