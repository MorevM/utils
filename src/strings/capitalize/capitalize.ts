/**
 * Converts the first character of string to upper case.
 *
 * @param     {string}   input   The string to capitalize.
 *
 * @returns   {string}           Capitalized string.
 */
export const capitalize = (input: string): string => {
	if (!input.length) return '';
	return input[0].toUpperCase() + input.slice(1);
};
