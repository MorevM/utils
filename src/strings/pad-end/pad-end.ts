/**
 * Pads the given number/string with a given `fillString` (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the end of the given string.
 *
 * @param   input        String / number to apply pad.
 * @param   maxLength    The length of the resulting string once the given string has been padded.
 * @param   fillString   The string to pad the given string with.
 *
 * @returns                The padded string.
 */
export const padEnd = (input: string | number, maxLength: number, fillString = ' '): string =>
	input.toString().padEnd(maxLength, fillString);
