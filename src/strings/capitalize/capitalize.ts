/**
 * Converts the first character of string to upper case.
 *
 * @param   input   The string to capitalize.
 *
 * @returns           Capitalized string.
 */
export const capitalize = (input: string): string => {
	if (!input.length) return '';
	return input[0].toUpperCase() + input.slice(1);
};
