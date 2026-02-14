import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('agua');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
