import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('sarcopenia');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
