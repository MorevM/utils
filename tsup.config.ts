import type { Options } from 'tsup';

export const tsup: Options = {
	splitting: false,
	sourcemap: false,
	clean: true,
	target: 'node12',
	format: ['cjs', 'esm'],
	dts: true,
	entryPoints: ['src/index.ts'],
};
