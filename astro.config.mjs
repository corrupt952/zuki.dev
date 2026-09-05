import { readFileSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Project detail pages were folded into the list; old links land on the row.
const projects = JSON.parse(readFileSync('./src/locales/en.json', 'utf8')).pages
  .portfolio.projects;
const redirects = Object.fromEntries(
  projects.flatMap(({ slug }) => [
    [`/portfolio/${slug}`, `/portfolio#${slug}`],
    [`/ja/portfolio/${slug}`, `/ja/portfolio#${slug}`],
  ]),
);

export default defineConfig({
  site: 'https://zuki.dev',
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects,
  integrations: [sitemap()],
});
