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
      'kali-connect.s3.us-west-1.amazonaws.com',
      '18.141.64.26',
      '127.0.0.1',
      'localhost',
      'example.com',
    ],
  },
  webpack(config, _options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
      },
    })
    return config
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
