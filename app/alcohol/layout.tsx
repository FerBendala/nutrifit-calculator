import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('alcohol');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
