// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://betterleasehold.co.uk',
  // 'static' produces plain HTML/CSS/JS in dist/ uploadable to Krystal's
  // public_html with no Node runtime on the server.
  output: 'static',
  build: {
    // Produces /right-to-manage/eligibility/index.html rather than
    // /right-to-manage/eligibility.html keeps URLs clean on Apache/LiteSpeed.
    format: 'directory',
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
