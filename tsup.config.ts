import type { Options } from 'tsup';

export const tsup: Options = {
	splitting: false,
	sourcemap: false,
	clean: true,
	target: 'node12',
	format: ['cjs', 'esm'],
	dts: true,
	entryPoints: [
		'src/arrays/index.ts',
		'src/dates/index.ts',
		'src/dom/index.ts',
		'src/environment/index.ts',
		'src/functions/index.ts',
		'src/guards/index.ts',
		'src/numbers/index.ts',
		'src/objects/index.ts',
		'src/promises/index.ts',
		'src/ranges/index.ts',
		'src/strings/index.ts',
		'src/types/index.ts',
		'src/index.ts',
	],
};
