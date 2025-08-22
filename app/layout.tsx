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
  viewport: 'width=device-width, initial-scale=1',
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

        {/* CSS Interceptor - Optimizado para producción */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Interceptor CSS optimizado para navegadores que no soporten preload
            (function() {
              var interceptedFiles = [];
              var originalAppendChild = document.head.appendChild;
              var originalInsertBefore = document.head.insertBefore;
              var originalCreateElement = document.createElement;
              
              // Interceptar createElement para links
              document.createElement = function(tagName) {
                var element = originalCreateElement.call(this, tagName);
                
                if (tagName.toLowerCase() === 'link') {
                  var originalRelSetter = Object.getOwnPropertyDescriptor(element, 'rel') || 
                                         Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'rel');
                  
                  Object.defineProperty(element, 'rel', {
                    get: function() {
                      return originalRelSetter ? originalRelSetter.get.call(this) : this.getAttribute('rel');
                    },
                    set: function(value) {
                      if (value === 'stylesheet' && this.href) {
                        // Convertir a preload para evitar bloqueo
                        if (originalRelSetter && originalRelSetter.set) {
                          originalRelSetter.set.call(this, 'preload');
                        } else {
                          this.setAttribute('rel', 'preload');
                        }
                        this.setAttribute('as', 'style');
                        this.setAttribute('data-intercepted', 'true');
                        
                        // Handler para conversión diferida
                        this.onload = function() {
                          this.onload = null;
                          if (originalRelSetter && originalRelSetter.set) {
                            originalRelSetter.set.call(this, 'stylesheet');
                          } else {
                            this.setAttribute('rel', 'stylesheet');
                          }
                        };
                        
                        interceptedFiles.push(this.href);
                        return;
                      }
                      
                      if (originalRelSetter && originalRelSetter.set) {
                        originalRelSetter.set.call(this, value);
                      } else {
                        this.setAttribute('rel', value);
                      }
                    },
                    configurable: true,
                    enumerable: true
                  });
                }
                
                return element;
              };
              
              // Función para interceptar CSS dinámico
              function interceptCSS(node) {
                if (!node || node.tagName !== 'LINK' || node.rel !== 'stylesheet' || !node.href) return node;
                
                var preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'style';
                preloadLink.href = node.href;
                preloadLink.setAttribute('data-intercepted', 'true');
                
                preloadLink.onload = function() {
                  this.onload = null;
                  this.rel = 'stylesheet';
                };
                
                preloadLink.onerror = function() {
                  var fallback = document.createElement('link');
                  fallback.rel = 'stylesheet';
                  fallback.href = this.href;
                  document.head.appendChild(fallback);
                };
                
                var noscript = document.createElement('noscript');
                var fallback = document.createElement('link');
                fallback.rel = 'stylesheet';
                fallback.href = node.href;
                noscript.appendChild(fallback);
                
                originalAppendChild.call(document.head, preloadLink);
                originalAppendChild.call(document.head, noscript);
                
                interceptedFiles.push(node.href);
                return preloadLink;
              }
              
              // Override appendChild
              document.head.appendChild = function(node) {
                var processed = interceptCSS(node);
                if (processed !== node) {
                  return processed;
                }
                return originalAppendChild.call(this, node);
              };
              
              // Override insertBefore
              document.head.insertBefore = function(newNode, referenceNode) {
                var processed = interceptCSS(newNode);
                if (processed !== newNode) {
                  return originalInsertBefore.call(this, processed, referenceNode);
                }
                return originalInsertBefore.call(this, newNode, referenceNode);
              };
              
              // Procesar CSS existente
              function processExistingCSS() {
                var existingCSS = document.querySelectorAll('link[rel="stylesheet"]');
                existingCSS.forEach(function(link) {
                  if (link.href && !link.hasAttribute('data-intercepted')) {
                    var processed = interceptCSS(link);
                    if (processed !== link) {
                      link.remove();
                    }
                  }
                });
              }
              
              processExistingCSS();
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', processExistingCSS);
              }
              
              // Observer para CSS dinámico
              var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'LINK' && node.rel === 'stylesheet' && !node.hasAttribute('data-intercepted')) {
                      var processed = interceptCSS(node);
                      if (processed !== node) {
                        node.remove();
                      }
                    }
                  });
                });
              });
              
              observer.observe(document.head, { childList: true, subtree: true });
            })();
          `
        }} />

        {/* Resource prioritization */}
        <meta name="theme-color" content="#ffffff" />

        {/* Fallback para navegadores sin soporte de preload */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Interceptor de document.write para casos edge
            (function() {
              var originalWrite = document.write;
              document.write = function(html) {
                if (html && html.includes('rel="stylesheet"')) {
                  html = html.replace(/rel="stylesheet"/g, 'rel="preload" as="style" onload="this.onload=null;this.rel=\\'stylesheet\\'"');
                }
                return originalWrite.call(this, html);
              };
              
              var originalInnerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
              if (originalInnerHTMLSetter) {
                Object.defineProperty(Element.prototype, 'innerHTML', {
                  set: function(html) {
                    if (html && html.includes('rel="stylesheet"') && this === document.head) {
                      html = html.replace(/rel="stylesheet"/g, 'rel="preload" as="style" onload="this.onload=null;this.rel=\\'stylesheet\\'"');
                    }
                    return originalInnerHTMLSetter.set.call(this, html);
                  },
                  get: originalInnerHTMLSetter.get,
                  configurable: true,
                  enumerable: true
                });
              }
            })();
            
            // Mostrar contenido cuando esté listo
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


        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Procesamiento final de CSS residual */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Procesar CSS residual que pueda escapar otros filtros
            window.addEventListener('DOMContentLoaded', function() {
              var remainingCSS = document.querySelectorAll('link[rel="stylesheet"]');
              remainingCSS.forEach(function(link) {
                if (link.href && link.href.includes('.css')) {
                  var preload = document.createElement('link');
                  preload.rel = 'preload';
                  preload.as = 'style';
                  preload.href = link.href;
                  preload.onload = function() {
                    this.rel = 'stylesheet';
                  };
                  
                  link.parentNode.insertBefore(preload, link);
                  link.remove();
                }
              });
              
              document.body.style.visibility = 'visible';
            });
            
            // Función de utilidad para carga asíncrona de CSS
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