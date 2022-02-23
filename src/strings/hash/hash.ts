/* eslint-disable @typescript-eslint/no-shadow, no-bitwise */

/**
 * Generates a simple hash for given string.
 * WARN: Don't use for sensitive data, it's not safe.
 *
 * @see https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
 *
 * @param     {string}   str   String to get hash.
 *
 * @returns   {string}         Hash for given string.
 */
export const hash = (str: string): string => {
	let hash = 0;
	for (let i = 0, l = str.length; i < l; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash &= hash; // Convert to 32bit integer
	}
	return new Uint32Array([hash])[0].toString(36);
};