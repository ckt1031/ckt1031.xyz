const { neutral } = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class', '[data-theme="dark"]'],
	plugins: [require('@tailwindcss/typography')],
	theme: {
		extend: {
			colors: {
				gray: neutral,
			},
		},
		// @ts-expect-error
		typography: ({ theme }) => ({
			DEFAULT: {
				css: {
					a: {
						color: theme('colors.blue.600'),
					},
					blockquote: {
						borderLeftColor: theme('colors.gray.300'),
					},
					color: theme('colors.gray.700'),
					'h1,h2,h3,h4,h5,h6': {
						color: theme('colors.gray.900'),
					},
					p: {
						color: theme('colors.gray.700'),
					},
					strong: {
						color: theme('colors.gray.600'),
					},
				},
			},
			dark: {
				css: {
					a: {
						color: theme('colors.blue.300'),
					},
					blockquote: {
						borderLeftColor: theme('colors.gray.700'),
					},
					color: theme('colors.gray.300'),
					h1: {
						color: theme('colors.gray.300'),
					},
					'h1,h2,h3,h4,h5,h6': {
						color: theme('colors.gray.200'),
					},
					p: {
						color: theme('colors.gray.400'),
					},
					strong: {
						color: theme('colors.gray.300'),
					},
				},
			},
		}),
	},
};
