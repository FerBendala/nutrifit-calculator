import { ConsentBanner } from '@/components/ConsentBanner';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { SITE_CONFIG } from '@/lib/seo';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  robots: 'index, follow',
  authors: [{ name: 'Calculadora Fitness' }],
  creator: 'Calculadora Fitness',
  publisher: 'Calculadora Fitness',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* AdSense verification meta tag */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID} />
        )}
        {/* Scripts se cargan dinámicamente por ConsentBanner tras aceptar */}
      </head>
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <ConsentBanner />
        <Toaster />
        {/* GTM noscript se carga solo si hay consentimiento */}
      </body>
    </html>
  );
}