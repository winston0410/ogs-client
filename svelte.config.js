import sveltePreprocess from 'svelte-preprocess';
//  import gloryPreprocess from 'glory-svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

const config = {
	preprocess: [
        //  process.env.NODE_ENV !== "development" && gloryPreprocess(),
		sveltePreprocess({
            replace: [['process.env.NODE_ENV', 'production']],
            postcss: true,
        })
	],

	kit: {
		target: '#svelte',
        adapter: adapter()
	}
};

export default config;
