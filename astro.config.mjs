import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config.ts';

const integrations = [];
if (SITE_URL) {
  integrations.push(sitemap());
}

export default defineConfig({
  site: SITE_URL || undefined,
  trailingSlash: 'ignore',
  integrations,
  vite: {
    plugins: [tailwindcss()],
  },
});
