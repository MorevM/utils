import { camelCase } from '../camel-case/camel-case';

type PascalCaseOptions = {
	readonly preserveConsecutiveUppercase?: boolean;
};

const defaultOptions: PascalCaseOptions = {
	preserveConsecutiveUppercase: false,
};

/**
 * Convert a dash/dot/underscore/space separated string to PascalCase: `foo-bar` → `FooBar`
 *
 * @param   input     A string/array of strings to convert to PascalCase.
 * @param   options   Additional options being supplied to the `_camelCase`.
 *
 * @returns             The string converted to PascalCase.
 */
export const pascalCase = (
	input: string | readonly string[],
	options?: PascalCaseOptions,
): string => {
	const base = camelCase(input, { ...defaultOptions, ...options });
	if (!base.length) return '';
	return base[0].toUpperCase() + base.slice(1);
};
