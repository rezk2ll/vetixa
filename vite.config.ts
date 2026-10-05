/// <reference types="node" />
import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

const adapter = process.env.ADAPTER === 'node' ? adapterNode() : adapterAuto();

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter,
			alias: {
				$components: 'src/lib/components',
				$lib: 'src/lib',
				$store: 'src/lib/store',
				$utils: 'src/lib/utils',
				$types: 'src/types'
			},
			csrf: {
				trustedOrigins: ['*']
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'v8',
			include: ['src/lib/utils/**/*.ts', 'src/lib/schemas/**/*.ts', 'src/lib/services/**/*.ts'],
			exclude: [
				'src/**/*.test.ts',
				'src/**/*.spec.ts',
				'src/lib/utils/form.ts',
				'src/lib/utils/mime.ts',
				'src/lib/utils/pagination.ts',
				'src/lib/utils/proxy.ts',
				'src/lib/utils/editor.ts',
				'src/lib/schemas/index.ts',
				'src/lib/utils/animal.ts',
				'src/lib/services/bill.ts',
				'src/lib/services/client.ts',
				'src/lib/services/funds.ts',
				'src/lib/services/inventory.ts',
				'src/lib/services/sale.ts'
			],
			thresholds: {
				lines: 80,
				branches: 80,
				functions: 80,
				statements: 80
			}
		}
	}
});
