import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('grasa-corporal');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
