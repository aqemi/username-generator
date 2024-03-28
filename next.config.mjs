/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    if (!context.isServer) {
      config.resolve.fallback = {
        'fs/promises': false,
        'timers/promises': false,
      };
    }
    return config;
  },
};

export default nextConfig;
