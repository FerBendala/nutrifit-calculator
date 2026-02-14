import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('vo2max');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
