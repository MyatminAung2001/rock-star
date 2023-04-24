/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["media.rawg.io"]
  }
}

module.exports = nextConfig
