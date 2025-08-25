import { generateMetadata as generateMeta } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMeta('composicion');

export default function ComposicionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
