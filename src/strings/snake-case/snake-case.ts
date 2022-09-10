/**
 * Convert a string to snake-case: `fooFar` → `foo_bar`
 *
 * @param   input   A string to convert to snake-case
 *
 * @returns           The string converted to snake-case.
 */
export const snakeCase = (input: string): string => input
	.replace(/([a-z])([A-Z])/g, '$1-$2')
	.replace(/[\s\-.]+/g, '_')
	.toLowerCase();
