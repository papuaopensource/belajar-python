// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: "id",
		locales: ["id", "en"],
		routing: {
			prefixDefaultLocale: false
		}
	},
	integrations: [
		react(),
		mdx(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
	vite: {
		optimizeDeps: {
			include: ['react', 'react-dom']
		}
	}
});
