/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel deployment
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['placeholder.svg'],
  },
};

export default nextConfig;

