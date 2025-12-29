/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Für lokale Bilder aus /public/ ist keine Konfiguration nötig
    // remotePatterns wird nur für externe Bildquellen benötigt
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Transformer.js benötigt WebAssembly Support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    
    // Fallbacks für Node.js Module im Browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig
