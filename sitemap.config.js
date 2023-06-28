/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zuki.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './out',
}
