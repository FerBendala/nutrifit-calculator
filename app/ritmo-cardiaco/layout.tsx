import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('ritmo-cardiaco');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
