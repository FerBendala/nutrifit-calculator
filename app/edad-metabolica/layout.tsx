import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('edad-metabolica');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
