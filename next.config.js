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

  // Configuración para mejorar el rendimiento
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: false,
  },

  // Optimizaciones para mejorar LCP y reducir polyfills
  experimental: {
    swcPlugins: [],
    // Optimización de CSS para romper cadenas críticas
    optimizeCss: false, // Deshabilitamos para control manual
  },

  // Configuración moderna de transpilación para eliminar polyfills innecesarios
  // Basado en funciones Baseline ampliamente disponibles
  env: {
    NEXT_PUBLIC_BROWSERSLIST: 'chrome >= 91, firefox >= 90, safari >= 14, edge >= 91'
  },

  // Configuración de webpack para optimizar CSS
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimizaciones de CSS para producción
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
            },
          },
        },
      };

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
