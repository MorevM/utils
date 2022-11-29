import { arrayOfLength } from '../../arrays';

/**
 * Generates a random string of a given length and (optionally) starting with a latin character
 * (if used to fill `id` of HTMLElement for example)
 *
 * @param   length           The length of result string. \
 *                           Default is `10`.
 * @param   startWithLatin   Should string strictly start with latin character or not. \
 *                           Default is `true`.
 *
 * @returns                  Generated string of a given length.
 */
export const randomString = (length: number = 10, startWithLatin: boolean = true): string => {
	const base = arrayOfLength(length, () => Math.trunc(Math.random() * 36).toString(36)).join('');
	if (!startWithLatin) return base;
	const latinCharacters = 'abcdefghijklmnopqrstuvwxyz';
	const firstChar = latinCharacters.charAt(Math.floor(Math.random() * latinCharacters.length));
	return firstChar + base.slice(1);
};
