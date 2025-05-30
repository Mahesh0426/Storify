/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ik.imagekit.io"],
  },
  experimental: {
    serverActions: {},
  },
};

module.exports = nextConfig;
