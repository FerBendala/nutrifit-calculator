import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata('recuperacion-cardiaca');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
