import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('bai');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
