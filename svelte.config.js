import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$lib: './src/lib',
			$components: './src/components',
			$stores: './src/stores',
			$styles: './src/styles',
			$utils: './src/utils',
			$assets: './src/assets',
			$routes: './src/routes',
			$static: './static'
		}
	},

	preprocess: [vitePreprocess({})]
};

export default config;
