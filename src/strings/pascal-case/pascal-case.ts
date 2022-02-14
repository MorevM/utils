import _camelCase from 'camelcase';

type PascalCaseOptions = {
	readonly preserveConsecutiveUppercase?: boolean;
	readonly locale?: false | string | readonly string[];
};

const defaultOptions: PascalCaseOptions = {
	preserveConsecutiveUppercase: false,
	locale: false,
};

/**
 * Convert a dash/dot/underscore/space separated string to PascalCase: `foo-bar` → `FooBar`
 *
 * @param     {string|Array<string>}   input     A string/array of strings to convert to PascalCase.
 * @param     {PascalCaseOptions}      options   Additional options being supplied to the `_camelCase`.
 *
 * @returns   {string}                           The string converted to PascalCase.
 */
export const pascalCase = (
	input: string | readonly string[],
	options?: PascalCaseOptions,
): string =>
	_camelCase(input, { ...defaultOptions, ...options, pascalCase: true });
