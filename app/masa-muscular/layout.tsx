import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('masa-muscular');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
