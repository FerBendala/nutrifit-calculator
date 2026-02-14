import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('presion-arterial-media');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
