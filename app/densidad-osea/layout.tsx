import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('densidad-osea');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
