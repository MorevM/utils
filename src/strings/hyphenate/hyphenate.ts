import { kebabCase } from '../kebab-case/kebab-case';

/**
 * Convert a string to kebab-case: `fooFar` → `foo-bar`
 *
 * @param     {string}   input   A string to convert to kebab-case
 *
 * @returns   {string}           The string converted to kebab-case.
 */
export const hyphenate = (input: string): string => {
	// TODO: [>1.0.0] Remove
	console.warn('Helper `hyphenate` has been renamed to `kebabCase` and will be removed in the next major release.');
	return kebabCase(input);
};
