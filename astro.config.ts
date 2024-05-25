import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, squooshImageService } from 'astro/config';

export default defineConfig({
	site: 'https://ckt1031.xyz',
	integrations: [
		icon(),
		tailwind(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
		mdx({
			optimize: true,
		}),
		robotsTxt({
			sitemap: ['https://ckt1031.xyz/sitemap-index.xml'],
			policy: [
				{
					userAgent: '*',
					disallow: ['/404', '/api'],
				},
				{
					userAgent: '*',
					allow: ['/'],
				},
			],
		}),
		(await import('@playform/compress')).default(),
	],
	image: {
		service: squooshImageService(),
		domains: ['obsidian-img.ckt1031.xyz'],
	},
});
