/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add any required Next.js configuration here
    images: {
      domains: ['gmtds.maplarge.com'],
    },
    // Disable React StrictMode which prevents double mounting
    reactStrictMode: false,
    // Leaflet has a client-only requirement
    transpilePackages: ['react-leaflet']
  };
  
  module.exports = nextConfig;