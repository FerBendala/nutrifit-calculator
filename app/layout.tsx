import { ConsentBanner } from '@/components/ConsentBanner';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { SITE_CONFIG } from '@/lib/seo';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Mejora el LCP permitiendo fallback fonts
  preload: true
});

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
        {/* Resource hints optimizados para mejorar LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload de fuentes críticas para evitar FOIT/FOUT */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Estilos críticos inline optimizados para LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Reset crítico y tipografía base */
            *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
            html{line-height:1.15;-webkit-text-size-adjust:100%;scroll-behavior:smooth}
            body{margin:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,sans-serif;font-display:swap;background:#fff;color:#000}
            
            /* Layout crítico optimizado */
            .min-h-screen{min-height:100vh}
            .flex{display:flex}
            .flex-col{flex-direction:column}
            .flex-1{flex:1 1 0%}
            .items-center{align-items:center}
            .justify-center{justify-content:center}
            .text-center{text-align:center}
            
            /* Container responsive eficiente */
            .container{max-width:1200px;margin:0 auto;padding:0 1rem}
            @media(min-width:640px){.container{padding:0 1.5rem}}
            @media(min-width:1024px){.container{padding:0 2rem}}
            
            /* Tipografía crítica optimizada */
            h1{font-size:2.25rem;font-weight:700;line-height:1.2;margin:0;letter-spacing:-0.025em;color:#111827}
            @media(min-width:640px){h1{font-size:3rem;letter-spacing:-0.05em}}
            
            /* Párrafo hero crítico - optimizado para LCP */
            .hero-description{font-size:1.25rem;line-height:1.75;color:#6b7280;max-width:42rem;margin:0 auto;font-weight:400}
            
            /* Sección hero optimizada */
            .hero-section{text-align:center;margin-bottom:2rem}
            .hero-section > * + *{margin-top:1rem}
            
            /* Header optimizado para performance */
            header{position:sticky;top:0;z-index:40;width:100%;border-bottom:1px solid #e5e7eb;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);will-change:transform;contain:layout style paint}
            
            /* Espaciado eficiente */
            .space-y-4>:not(:first-child){margin-top:1rem}
            .space-y-8>:not(:first-child){margin-top:2rem}
            
            /* Botones optimizados */
            .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:0.375rem;font-weight:500;transition:opacity 0.15s ease,transform 0.15s ease;will-change:opacity,transform;cursor:pointer}
            .btn:hover{opacity:0.9;transform:translateY(-1px)}
            .btn:active{transform:translateY(0)}
            
            /* Optimizaciones de rendering */
            img{max-width:100%;height:auto}
            button{cursor:pointer}
            a{color:inherit;text-decoration:none}
            
            /* Optimizaciones críticas para reducir render delay */
            .space-y-8{display:flex;flex-direction:column;gap:2rem}
            .max-w-4xl{max-width:56rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            
            /* Prevenir layout shift */
            .text-4xl{font-size:2.25rem}
            @media(min-width:640px){.text-5xl{font-size:3rem}}
            .font-bold{font-weight:700}
            .tracking-tight{letter-spacing:-0.025em}
            @media(min-width:640px){.tracking-tight{letter-spacing:-0.05em}}
          `
        }} />

        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

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