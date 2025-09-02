import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Next.js 15 hat Server Actions standardmäßig aktiviert
  
  // Vercel-spezifische Konfiguration
  experimental: {
    // Optimierungen für Vercel
    optimizePackageImports: ['leaflet'],
  },
  
  // Webpack-Konfiguration für Leaflet
  webpack: (config, { isServer }) => {
    // Leaflet-Icons korrekt behandeln
    config.module.rules.push({
      test: /\.png$/,
      type: 'asset/resource',
    });
    
    // Fallback für Node.js-Module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Transpile Leaflet für bessere Kompatibilität
  transpilePackages: ['leaflet'],
};

export default nextConfig;
