/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Add your CDN/image domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Disable ESLint during builds (components are migrated from React app)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during builds for migration
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
