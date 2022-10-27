/**
 * Pads the given number/string with a given `fillString` (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the start of the given string.
 * `maxLength` and `fillString` defaults cover the most popular use case - leading zero to length 2.
 *
 * @param   input        String / number to apply pad.
 * @param   maxLength    The length of the resulting string once the given string has been padded.
 * @param   fillString   The string to pad the given string with.
 *
 * @returns              The padded string.
 */
export const padStart = (input: string | number, maxLength = 2, fillString = '0'): string =>
	input.toString().padStart(maxLength, fillString);
