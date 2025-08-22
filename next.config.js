/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  // Optimizaciones para reducir cadena crítica
  experimental: {
    optimizeCss: true, // Optimiza el CSS crítico
  },

  // Configuración para mejorar el rendimiento
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // TrailingSlash para sitios estáticos
  trailingSlash: true,

  // Optimización de bundle
  swcMinify: true,
};

module.exports = nextConfig;
