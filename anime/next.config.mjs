/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Configure SVGR
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  
  // Configure image domains
  images: {
    domains: ['cdn.noitatnemucod.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.noitatnemucod.net',
        port: '',
        pathname: '/**'
      }
    ]
  },

  // Add any other Next.js config options here
  reactStrictMode: true,
  swcMinify: true,
};

// Use ES modules export
export default nextConfig;