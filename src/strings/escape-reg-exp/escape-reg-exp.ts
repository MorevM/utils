/**
 * Escapes the `RegExp` special characters in a given string.
 *
 * @param   str   The string to escape.
 *
 * @returns       The escaped string.
 */
export const escapeRegExp = (str: string | null | undefined) =>
	(str ?? '').replaceAll(/[$()*+.?[\\\]^{|}]/g, '\\$&');
