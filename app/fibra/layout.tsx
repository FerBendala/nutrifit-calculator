import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('fibra');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
