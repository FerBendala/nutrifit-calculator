import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('1rm');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
