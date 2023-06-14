/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')
const { i18n } = require('./next-i18next.config')
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  runtimeCaching,
})

module.exports = withPWA({
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'via.placeholder.com',
      'res.cloudinary.com',
      's3.amazonaws.com',
      '127.0.0.1',
      'localhost',
    ],
  },
  ...(process.env.APPLICATION_MODE === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
})
