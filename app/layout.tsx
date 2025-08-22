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

        {/* INTERCEPTOR UNIVERSAL CSS - Funciona con cualquier nombre de archivo */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // SOLUCIÓN UNIVERSAL: Interceptar CUALQUIER CSS independientemente del nombre
            (function() {
              console.log('[CSS Interceptor] Iniciando interceptación universal de CSS');
              
              // Variables para tracking
              var interceptedFiles = [];
              var originalAppendChild = document.head.appendChild;
              var originalInsertBefore = document.head.insertBefore;
              
              // Función mejorada para interceptar CSS
              function interceptCSS(node, source) {
                if (!node || node.tagName !== 'LINK') return node;
                
                // Interceptar CUALQUIER stylesheet, sin importar la URL
                if (node.rel === 'stylesheet' && node.href) {
                  console.log('[CSS Interceptor] Interceptando CSS desde', source, ':', node.href);
                  
                  // Crear preload inmediatamente
                  var preloadLink = document.createElement('link');
                  preloadLink.rel = 'preload';
                  preloadLink.as = 'style';
                  preloadLink.href = node.href;
                  preloadLink.setAttribute('data-intercepted', 'true');
                  
                  // Handler para convertir a stylesheet
                  preloadLink.onload = function() {
                    console.log('[CSS Interceptor] CSS cargado, convirtiendo a stylesheet:', this.href);
                    this.onload = null;
                    this.rel = 'stylesheet';
                  };
                  
                  // Error handler
                  preloadLink.onerror = function() {
                    console.warn('[CSS Interceptor] Error cargando CSS:', this.href);
                    // Fallback: crear stylesheet normal
                    var fallback = document.createElement('link');
                    fallback.rel = 'stylesheet';
                    fallback.href = this.href;
                    document.head.appendChild(fallback);
                  };
                  
                  // Crear noscript fallback
                  var noscript = document.createElement('noscript');
                  var fallback = document.createElement('link');
                  fallback.rel = 'stylesheet';
                  fallback.href = node.href;
                  noscript.appendChild(fallback);
                  
                  // Insertar usando métodos originales para evitar loops
                  originalAppendChild.call(document.head, preloadLink);
                  originalAppendChild.call(document.head, noscript);
                  
                  // Trackear archivo interceptado
                  interceptedFiles.push(node.href);
                  
                  // Retornar el preload en lugar del CSS original
                  return preloadLink;
                }
                return node;
              }
              
              // Override appendChild - MÁS AGRESIVO
              document.head.appendChild = function(node) {
                var processed = interceptCSS(node, 'appendChild');
                if (processed !== node) {
                  console.log('[CSS Interceptor] Bloqueado appendChild de CSS:', node.href);
                  return processed;
                }
                return originalAppendChild.call(this, node);
              };
              
              // Override insertBefore - MÁS AGRESIVO
              document.head.insertBefore = function(newNode, referenceNode) {
                var processed = interceptCSS(newNode, 'insertBefore');
                if (processed !== newNode) {
                  console.log('[CSS Interceptor] Bloqueado insertBefore de CSS:', newNode.href);
                  return originalInsertBefore.call(this, processed, referenceNode);
                }
                return originalInsertBefore.call(this, newNode, referenceNode);
              };
              
              // Interceptar CSS ya presente en el DOM
              function interceptExistingCSS() {
                var existingCSS = document.querySelectorAll('link[rel="stylesheet"]');
                console.log('[CSS Interceptor] Procesando', existingCSS.length, 'CSS existentes');
                
                existingCSS.forEach(function(link, index) {
                  if (link.href && !link.hasAttribute('data-intercepted')) {
                    console.log('[CSS Interceptor] Procesando CSS existente', index + 1, ':', link.href);
                    var processed = interceptCSS(link, 'existing');
                    if (processed !== link) {
                      link.remove();
                    }
                  }
                });
              }
              
              // Ejecutar inmediatamente
              interceptExistingCSS();
              
              // También ejecutar cuando el DOM esté listo
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', interceptExistingCSS);
              }
              
              // Observer para CSS que se agregue dinámicamente
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'LINK' && node.rel === 'stylesheet' && !node.hasAttribute('data-intercepted')) {
                      console.log('[CSS Interceptor] Observer detectó nuevo CSS:', node.href);
                      var processed = interceptCSS(node, 'observer');
                      if (processed !== node) {
                        node.remove();
                      }
                    }
                  });
                });
              });
              
              observer.observe(document.head, { childList: true, subtree: true });
              
              // Función global para debugging
              window.cssInterceptorStatus = function() {
                console.log('[CSS Interceptor] Archivos interceptados:', interceptedFiles);
                console.log('[CSS Interceptor] CSS actuales en DOM:', document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"][as="style"]').length);
              };
              
              console.log('[CSS Interceptor] Interceptor universal activado');
            })();
          `
        }} />

        {/* Resource prioritization */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />

        {/* Deshabilitar CSS automático de Next.js para control manual */}
        <style data-next-hide-fouc data-ampdevmode-only>
          {`body { visibility: hidden; }`}
        </style>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Mostrar body una vez que el CSS crítico esté listo
            document.addEventListener('DOMContentLoaded', function() {
              document.body.style.visibility = 'visible';
            });
          `
        }} />

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
            
            /* CSS crítico expandido para reducir dependencias externas */
            .space-y-8{display:flex;flex-direction:column;gap:2rem}
            .max-w-4xl{max-width:56rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .py-8{padding-top:2rem;padding-bottom:2rem}
            .w-full{width:100%}
            
            /* Tipografía crítica completa */
            .text-4xl{font-size:2.25rem;line-height:2.5rem}
            .text-5xl{font-size:3rem;line-height:1}
            .text-xl{font-size:1.25rem;line-height:1.75rem}
            .text-2xl{font-size:1.5rem;line-height:2rem}
            .text-lg{font-size:1.125rem;line-height:1.75rem}
            .font-bold{font-weight:700}
            .font-semibold{font-weight:600}
            .font-medium{font-weight:500}
            .tracking-tight{letter-spacing:-0.025em}
            @media(min-width:640px){
              .sm\\:text-5xl{font-size:3rem;line-height:1}
              .tracking-tight{letter-spacing:-0.05em}
            }
            
            /* Layout crítico de cards */
            .rounded-lg{border-radius:0.5rem}
            .border{border-width:1px;border-color:#e5e7eb}
            .bg-card{background-color:#ffffff}
            .shadow-sm{box-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05)}
            .p-6{padding:1.5rem}
            .p-4{padding:1rem}
            .mb-4{margin-bottom:1rem}
            .mb-6{margin-bottom:1.5rem}
            .mt-4{margin-top:1rem}
            .mt-6{margin-top:1.5rem}
            
            /* Grid crítico */
            .grid{display:grid}
            .gap-6{gap:1.5rem}
            .gap-4{gap:1rem}
            @media(min-width:768px){
              .md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
              .md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
            }
            
            /* Colores críticos */
            .text-muted-foreground{color:#6b7280}
            .text-foreground{color:#111827}
            .bg-primary{background-color:#111827}
            .text-primary-foreground{color:#ffffff}
            
            /* Estados de botones críticos */
            .btn-primary{background-color:#111827;color:#ffffff;border:1px solid #111827}
            .btn-primary:hover{background-color:#1f2937;border-color:#1f2937}
            .btn-secondary{background-color:#f9fafb;color:#111827;border:1px solid #e5e7eb}
            .btn-secondary:hover{background-color:#f3f4f6;border-color:#d1d5db}
            
            /* Formularios críticos */
            input,select,textarea{display:block;width:100%;padding:0.5rem 0.75rem;border:1px solid #d1d5db;border-radius:0.375rem;font-size:0.875rem;line-height:1.25rem}
            input:focus,select:focus,textarea:focus{outline:2px solid #2563eb;outline-offset:2px;border-color:#2563eb}
            label{display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.5rem}
            
            /* Layout de formulario */
            .form-group{margin-bottom:1rem}
            .form-row{display:flex;gap:1rem}
            @media(max-width:768px){.form-row{flex-direction:column;gap:0.5rem}}
            
            /* Cards y contenedores críticos */
            .card{background-color:#ffffff;border:1px solid #e5e7eb;border-radius:0.5rem;padding:1.5rem;box-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1)}
            .card-header{margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid #e5e7eb}
            .card-content{color:#374151}
            
            /* Navegación crítica */
            nav{background-color:#ffffff;border-bottom:1px solid #e5e7eb}
            nav a{color:#374151;text-decoration:none;padding:0.5rem 1rem;display:inline-block}
            nav a:hover{color:#111827;background-color:#f9fafb}
            
            /* Estados de carga */
            .loading{opacity:0.6;pointer-events:none}
            .hidden{display:none!important}
            .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
            
            /* Responsive utilities críticos */
            @media(max-width:640px){
              .text-4xl{font-size:1.875rem;line-height:2.25rem}
              .hero-description{font-size:1.125rem;line-height:1.75rem}
              .container{padding:0 0.75rem}
            }
            
            /* Componentes adicionales críticos para eliminar dependencia CSS externa */
            .prose{max-width:65ch;color:#374151}
            .prose h2{font-size:1.5rem;font-weight:600;margin-top:2rem;margin-bottom:1rem;color:#111827}
            .prose h3{font-size:1.25rem;font-weight:600;margin-top:1.5rem;margin-bottom:0.5rem;color:#111827}
            .prose p{margin-bottom:1rem;line-height:1.75}
            
            /* Utilidades de posicionamiento */
            .relative{position:relative}
            .absolute{position:absolute}
            .sticky{position:sticky}
            .top-0{top:0}
            .z-40{z-index:40}
            .z-50{z-index:50}
            
            /* Utilidades de display críticas */
            .block{display:block}
            .inline{display:inline}
            .inline-block{display:inline-block}
            .table{display:table}
            
            /* Utilidades de overflow */
            .overflow-hidden{overflow:hidden}
            .overflow-auto{overflow:auto}
            
            /* Utilidades de cursor */
            .cursor-pointer{cursor:pointer}
            .cursor-not-allowed{cursor:not-allowed}
            
            /* Utilidades de selección */
            .select-none{user-select:none}
            
            /* Transiciones críticas */
            .transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
            .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
            
            /* Focus states críticos */
            .focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}
            .focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}
            
            /* Variables CSS críticas */
            :root{--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000}
          `
        }} />

        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Carga manual de CSS específico para evitar bloqueo */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Cargar CSS específico de forma asíncrona después del render inicial
            window.addEventListener('DOMContentLoaded', function() {
              // Buscar cualquier CSS que haya pasado nuestros filtros
              var remainingCSS = document.querySelectorAll('link[rel="stylesheet"]');
              remainingCSS.forEach(function(link) {
                if (link.href && link.href.includes('.css')) {
                  // Convertir a preload si no se procesó antes
                  var preload = document.createElement('link');
                  preload.rel = 'preload';
                  preload.as = 'style';
                  preload.href = link.href;
                  preload.onload = function() {
                    this.rel = 'stylesheet';
                  };
                  
                  // Reemplazar el CSS bloqueante
                  link.parentNode.insertBefore(preload, link);
                  link.remove();
                }
              });
              
              // Cargar CSS específicos conocidos de forma asíncrona
              var cssFiles = [
                // Estos se detectarán automáticamente, pero los incluimos por seguridad
              ];
              
              cssFiles.forEach(function(href) {
                var link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = href;
                link.onload = function() {
                  this.rel = 'stylesheet';
                };
                document.head.appendChild(link);
              });
              
              // Mostrar contenido una vez procesado
              document.body.style.visibility = 'visible';
            });
            
            // Función de utilidad global
            window.loadCSSAsync = function(href) {
              var link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'style';
              link.href = href;
              link.onload = function() {
                this.rel = 'stylesheet';
              };
              document.head.appendChild(link);
              return link;
            };
          `
        }} />

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