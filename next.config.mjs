// next.config.mjs
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "assets.aceternity.com",
      "pbs.twimg.com",
      "jkt48.com",
      "res.cloudinary.com",
    ],
  },
  output: "standalone",
};

export default withPWA(nextConfig);
