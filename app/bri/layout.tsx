import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('bri');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
