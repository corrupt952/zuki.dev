/** @type {import('next').NextConfig} */
const i18n = {
  locales: ['ja', 'en'],
  defaultLocale: 'en',
};

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    i18n,
  },
}

module.exports = nextConfig
