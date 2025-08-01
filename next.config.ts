
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3gr7hv60ouvr1.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'naturesprotection.eu',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'elpida-varna.bg',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.lazcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.petshop.md',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c.scdn.gr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.naturesprotection.pet',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tauroproline.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tauroproline.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  allowedDevOrigins: [
      'https://6000-firebase-studio-1749817101482.cluster-6vyo4gb53jczovun3dxslzjahs.cloudworkstations.dev',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

    
