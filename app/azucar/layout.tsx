import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('azucar');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
