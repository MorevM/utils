import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		globalSetup: ['./utils/vitest.global-setup.ts'],
		setupFiles: ['./utils/vitest.setup.ts'],
		environment: 'jsdom',
		reporters: ['verbose'],
		coverage: {
			enabled: true,
			provider: 'v8',
			all: false,
		},
	},
});
