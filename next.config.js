/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:dataset/collections/:collection/items',
          destination: 'https://api.hamburg.de/datasets/v1/:dataset/collections/:collection/items?f=json',
          has: [{ type: 'query', key: 'f', value: "json" }],
        }
      ]
    }
  }
}

module.exports = nextConfig
