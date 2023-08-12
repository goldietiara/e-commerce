/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "plus.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "cdn.shopify.com" },
      { hostname: "epomaker.com" },
      { hostname: "1h3.googleusercontent.com" },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
