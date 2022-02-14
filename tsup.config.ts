import type { Options } from 'tsup';

export const tsup: Options = {
	splitting: false,
	sourcemap: false,
	clean: true,
	// target: 'es6',
	format: ['cjs', 'esm'],
	dts: true,
	entryPoints: [
		'src/arrays/index.ts',
		'src/browser/index.ts',
		'src/dom/index.ts',
		'src/numbers/index.ts',
		'src/objects/index.ts',
		'src/strings/index.ts',
		'src/types/index.ts',
		'src/utility/index.ts',
		'src/index.ts',
	],
};
