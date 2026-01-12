// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Server mode for SSR to handle dynamic query params
  adapter: node({
    mode: 'standalone'
  }),
  image: {
    domains: ['cms.uit.ac.id', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.uit.ac.id',
        pathname: '/uploads/**'
      }
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});