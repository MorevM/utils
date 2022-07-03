/**
 * Convert a string to kebab-case: `fooFar` → `foo-bar`
 *
 * @param   input   A string to convert to kebab-case
 *
 * @returns           The string converted to kebab-case.
 */
export const kebabCase = (input: string): string => input
	.replace(/([a-z])([A-Z])/g, '$1-$2')
	.replace(/[\s._]+/g, '-')
	.toLowerCase();
