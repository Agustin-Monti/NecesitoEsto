/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',  // <-- Esto ayuda en Vercel
};

module.exports = nextConfig;
