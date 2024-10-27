import { withNextVideo } from "next-video/process";
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
    domains: ['cdn.noitatnemucod.net','gogocdn.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gogocdn.net',
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
export default withNextVideo(nextConfig);