/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.atlasacademy.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
