// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    sanity({
      projectId: '48wq30y4',
      dataset: 'production',
      useCdn: false, // See note on using the CDN
      apiVersion: "2025-09-15", // insert the current date to access the latest version of the API
      studioBasePath: '/admin' // If you want to access the Studio on a route
    }),
    react(),
  ],
  adapter: netlify(),
});