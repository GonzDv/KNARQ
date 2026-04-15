// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
	site: 'https://www.knarq.com',
	output: 'static',
	adapter: vercel(),

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [sitemap()],
});