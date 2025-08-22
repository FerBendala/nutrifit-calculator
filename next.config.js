const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  // Optimizaciones para reducir cadena crítica
  // experimental: {
  //   optimizeCss: true, // Causa problemas con critters en Next 13.5.1
  // },

  // Configuración del compilador optimizada para CSS no bloqueante
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: false,
    emotion: false,
  },

  // Optimizaciones experimentales para eliminar CSS bloqueante
  experimental: {
    swcPlugins: [],
    optimizeCss: false, // Control manual de CSS
    esmExternals: true,
    serverComponentsExternalPackages: [],
    // cssChunking removido - no es una opción válida en Next.js 13.5.1
  },

  // Configuración moderna de transpilación para eliminar polyfills innecesarios
  // Basado en funciones Baseline ampliamente disponibles
  env: {
    NEXT_PUBLIC_BROWSERSLIST: 'chrome >= 91, firefox >= 90, safari >= 14, edge >= 91'
  },

  // Configuración de webpack para optimizar CSS
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimizaciones de CSS para producción - mejoradas
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 10,
              reuseExistingChunk: true,
            },
            // Separar CSS crítico del no crítico
            criticalStyles: {
              name: 'critical',
              test: /globals\.css$/,
              chunks: 'initial',
              enforce: true,
              priority: 20,
            },
          },
        },
      };

      // Configuración adicional para CSS no bloqueante
      config.plugins = config.plugins || [];

      // ESTRATEGIA FINAL: CSS completamente no bloqueante desde webpack
      try {
        const MiniCssExtractPlugin = require('next/dist/build/webpack/plugins/mini-css-extract-plugin').default;

        // Interceptar y reemplazar TODOS los plugins CSS
        config.plugins = config.plugins.map(plugin => {
          if (plugin instanceof MiniCssExtractPlugin) {


            return new MiniCssExtractPlugin({
              ...plugin.options,
              // FORZAR inserción como preload SIEMPRE
              insert: function (linkTag) {
                // Marcar como interceptado desde webpack
                linkTag.setAttribute('data-webpack-css', 'true');
                linkTag.setAttribute('data-original-rel', 'stylesheet');

                // SIEMPRE insertar como preload
                linkTag.rel = 'preload';
                linkTag.as = 'style';

                // Handler para conversión diferida
                linkTag.onload = function () {
                  this.onload = null;
                  this.rel = 'stylesheet';
                };

                // Error handler
                linkTag.onerror = function () {
                  this.rel = 'stylesheet';
                };

                // Noscript fallback
                const noscript = document.createElement('noscript');
                const fallback = document.createElement('link');
                fallback.rel = 'stylesheet';
                fallback.href = linkTag.href;
                noscript.appendChild(fallback);

                // Insertar en DOM
                document.head.appendChild(linkTag);
                document.head.appendChild(noscript);


              },
              // Configuración adicional
              chunkFilename: '[name].[contenthash].css',
              ignoreOrder: true,
              attributes: {
                'data-css-source': 'webpack'
              }
            });
          }
          return plugin;
        });

      } catch (error) {
        // Silently handle configuration errors
      }

      // ESTRATEGIA FINAL: Modificar el HTML de salida para interceptar CSS
      const HtmlWebpackPlugin = config.plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin');
      if (HtmlWebpackPlugin) {
        // Agregar hook para modificar HTML antes de que se genere
        config.plugins.push({
          apply: (compiler) => {
            compiler.hooks.compilation.tap('CSSInterceptorPlugin', (compilation) => {
              const HtmlWebpackPlugin = require('html-webpack-plugin');
              HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'CSSInterceptorPlugin',
                (data, cb) => {
                  // Reemplazar stylesheets con preload en HTML final
                  data.html = data.html.replace(
                    /<link\s+([^>]*?)rel="stylesheet"([^>]*?)>/gi,
                    (match, before, after) => {
                      const href = match.match(/href="([^"]+)"/i);
                      if (href && href[1].includes('_next/static/css/')) {
                        return '<link ' + before + 'rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"' + after + '><noscript><link ' + before + 'rel="stylesheet"' + after + '></noscript>';
                      }
                      return match;
                    }
                  );

                  cb(null, data);
                }
              );
            });
          }
        });
      }

      // Configuración adicional para evitar CSS bloqueante y polyfills innecesarios
      const originalEntry = config.entry;
      config.entry = () =>
        originalEntry().then((entry) => {
          // Modificar entry points para manejar CSS de forma asíncrona
          if (entry['main.js'] && !entry['main.js'].includes('./styles/critical.css')) {
            // No modificamos el entry, dejamos que nuestro script maneje el CSS
          }
          return entry;
        });

      // Eliminar polyfills innecesarios para funciones Baseline ampliamente disponibles
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...config.resolve.alias,
        // Eliminar polyfills específicos que ya no son necesarios
        'core-js/modules/es.array.at': false,
        'core-js/modules/es.array.flat': false,
        'core-js/modules/es.array.flat-map': false,
        'core-js/modules/es.object.from-entries': false,
        'core-js/modules/es.string.trim-start': false,
        'core-js/modules/es.string.trim-end': false,
      };

      // Configurar babel/swc para no transpile características modernas
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      // Encontrar la regla de JavaScript/TypeScript y modificarla
      const jsRule = config.module.rules.find(
        rule => rule.test && rule.test.toString().includes('tsx?')
      );

      if (jsRule && jsRule.use) {
        const swcLoader = Array.isArray(jsRule.use)
          ? jsRule.use.find(use => use.loader && use.loader.includes('swc-loader'))
          : jsRule.use.loader && jsRule.use.loader.includes('swc-loader') ? jsRule.use : null;

        if (swcLoader && swcLoader.options) {
          swcLoader.options.jsc = swcLoader.options.jsc || {};
          swcLoader.options.jsc.target = 'es2022';
          swcLoader.options.env = {
            targets: {
              chrome: '91',
              firefox: '90',
              safari: '14',
              edge: '91'
            },
            mode: 'entry',
            coreJs: false
          };
        }
      }
    }
    return config;
  },

  // TrailingSlash para sitios estáticos
  trailingSlash: true,

  // Optimización de bundle
  swcMinify: true,
};

module.exports = withBundleAnalyzer(nextConfig);
