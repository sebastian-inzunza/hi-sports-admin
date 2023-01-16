/* eslint-disable @typescript-eslint/no-var-requires */
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest.json$/],
})

const nextConfig = withPWA({
  // next config
  images: {
    domains: ['loremflickr.com'],
  },
})
module.exports = nextConfig
