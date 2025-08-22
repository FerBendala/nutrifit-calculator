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

      // Configuración adicional para evitar CSS bloqueante
      const originalEntry = config.entry;
      config.entry = () =>
        originalEntry().then((entry) => {
          // Modificar entry points para manejar CSS de forma asíncrona
          if (entry['main.js'] && !entry['main.js'].includes('./styles/critical.css')) {
            // No modificamos el entry, dejamos que nuestro script maneje el CSS
          }
          return entry;
        });
    }
    return config;
  },

  // TrailingSlash para sitios estáticos
  trailingSlash: true,

  // Optimización de bundle
  swcMinify: true,
};

module.exports = nextConfig;
