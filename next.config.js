/** @type {import('next').NextConfig} */

const configJson = require('./config.json') // import statement does not work here!
const { oaf } = configJson

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:dataset/collections/:collection/items',
          destination: `${oaf.endpoint}/:dataset/collections/:collection/items?f=json`,
          has: [{ type: 'query', key: 'f', value: "json" }],
        },
        {
          source: '/:dataset/collections/:collection/items/:item',
          destination: `${oaf.endpoint}/:dataset/collections/:collection/items/:item?f=json`,
          has: [{ type: 'query', key: 'f', value: "json" }],
        }
      ]
    }
  }
}

module.exports = nextConfig
