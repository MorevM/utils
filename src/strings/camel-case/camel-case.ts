import _camelCase from 'camelcase';

type CamelCaseOptions = {
	readonly preserveConsecutiveUppercase?: boolean;
	readonly locale?: false | string | readonly string[];
};

const defaultOptions: CamelCaseOptions = {
	preserveConsecutiveUppercase: false,
	locale: false,
};

/**
 * Converts a dash/dot/underscore/space separated string to camelCase: `foo-bar` → `fooBar`
 *
 * @param     {string|Array<string>}   input     A string/array of strings to convert to camelCase.
 * @param     {CamelCaseOptions}       options   Additional options being supplied to the `_camelCase`.
 *
 * @returns   {string}                           The string converted to camelCase.
 */
export const camelCase = (
	input: string | readonly string[],
	options?: CamelCaseOptions,
): string =>
	_camelCase(input, { ...defaultOptions, ...options, pascalCase: false });
