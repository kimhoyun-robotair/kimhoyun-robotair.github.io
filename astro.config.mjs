import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkWikiLinks from './src/lib/remark-wiki-links.mjs';

export default defineConfig({
  site: 'https://kimhoyun-robotair.github.io',
  output: 'static',
  compressHTML: true,
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkWikiLinks],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: { theme: 'github-light' },
  },
});
