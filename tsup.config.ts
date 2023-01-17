import type { Options } from 'tsup';

export const tsup: Options = {
	splitting: false,
	sourcemap: false,
	clean: true,
	target: 'esnext',
	format: ['cjs', 'esm'],
	dts: true,
	entryPoints: ['src/index.ts'],
	outExtension: ({ format }) => ({ js: `.${format}.js` }),
};
