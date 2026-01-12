// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Static mode for better performance with webhook rebuild
  image: {
    domains: ['cms.uit.ac.id'],
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