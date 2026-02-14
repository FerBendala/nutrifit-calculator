import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('masa-magra');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
