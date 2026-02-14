import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('egfr');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
