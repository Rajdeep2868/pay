/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  poweredByHeader: false,
  optimizeFonts: true,
  transpilePackages: ['html5-qrcode'],
  webpack: (config) => {
    // Fix for warn: 'the request of a dependency is an expression'
    config.module.exprContextCritical = false;
    return config;
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig;