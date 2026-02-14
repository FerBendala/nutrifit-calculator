import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('peso-ideal');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
