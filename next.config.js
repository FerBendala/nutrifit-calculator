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

  // Configuración del compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimizaciones experimentales
  experimental: {
    esmExternals: true,
  },

  // TrailingSlash para sitios estáticos
  trailingSlash: true,

  // Optimización de bundle con SWC
  swcMinify: true,
};

module.exports = withBundleAnalyzer(nextConfig);
