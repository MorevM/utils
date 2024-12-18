import { isArray, isObject, isRegExp, isString } from '../../guards/index';
import { camelCase, kebabCase, pascalCase, snakeCase } from '../../strings';
import type { PlainObject } from '../../types';

type Case = 'snake_case' | 'PascalCase' | 'kebab-case' | 'camelCase';

type Options = {
	depth: number;
	exclude: Array<string | RegExp>;
	excludeBranches: Array<string | RegExp>;
};

const getPath = (path: string, ...parts: Array<string | number>) => path ? `${path}.${parts.join('.')}` : parts.join('.');

const getHandler = (neededCase: Case) => {
	switch (neededCase) {
		case 'snake_case': return snakeCase;
		case 'PascalCase': return pascalCase;
		case 'camelCase': return camelCase;
		case 'kebab-case': return kebabCase;
		default: return (v: string) => v;
	}
};

/**
 * Creates a new object from given one with the keys written in needed case.
 *
 * @param   input        Object to convert keys case.
 * @param   neededCase   Needed keys case.
 * @param   _options     Custom options.
 *
 * @returns              New object with keys "renamed" to needed case.
 */
export const objectKeysCase = (input: unknown, neededCase: Case, _options?: Partial<Options>) => {
	const options = {
		depth: Infinity,
		exclude: [],
		excludeBranches: [],
		..._options,
	};
	const handler = getHandler(neededCase);

	const isExcluded = (type: 'key' | 'branch', key: string) => {
		const entity = type === 'key' ? options.exclude : options.excludeBranches;
		return entity.some((item) => {
			if (isString(item)) return item === key;
			if (isRegExp(item)) return item.test(key);
			return false;
		});
	};

	const isDepthAllowed = (depth: number) => options.depth > depth;

	const processEntry = (entry: unknown, path: string, depth: number) => {
		if (!isObject(entry) && !isArray(entry)) return entry;
		const isEntryArray = isArray(entry);

		return Object.entries(entry).reduce<PlainObject>((acc, [_key, _value]) => {
			const shouldTransformKey = !isExcluded('key', _key)
				&& !isExcluded('branch', getPath(path, _key))
				&& isDepthAllowed(depth);
			const shouldTransformValue = !isExcluded('branch', getPath(path, _key))
				&& (isDepthAllowed(depth + 1));

			const key = shouldTransformKey ? handler(_key) : _key;

			const value = shouldTransformValue ? processEntry(_value, getPath(path, _key), depth + 1) : _value;

			if (isEntryArray) (acc as any[]).push(value);
			if (!isEntryArray) acc[key] = value;

			return acc;
		}, isEntryArray ? [] : {});
	};

	return processEntry(input, '', 0);
};
