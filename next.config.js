/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "cdn.shopify.com" },
      { hostname: "epomaker.com" },
      { hostname: "wxalbum-10001658.image.myqcloud.com" },
      { hostname: "1h3.googleusercontent.com" },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
