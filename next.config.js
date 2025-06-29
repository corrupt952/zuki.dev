/** @type {import('next').NextConfig} */
const i18n = {
  locales: ['ja', 'en'],
  defaultLocale: 'en',
}

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    i18n,
  },
  images: {
    unoptimized: true,
  },
}

if (process.env.NODE_ENV === 'production') {
  nextConfig.output = 'export'
}

module.exports = nextConfig
