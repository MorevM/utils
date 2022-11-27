/**
 * Generates a random string of given length and (optionally) starting with a latin character
 * (if used to fill `id` of HTMLElement for example)
 *
 * @param   length           The length of result string.
 * @param   startWithLatin   Should string strictly start with latin character or not
 *
 * @returns                  Generated string of a given length.
 */
export const randomString = (length: number = 10, startWithLatin: boolean = true): string => {
	// TODO: Remove when issue is resolved: https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1994
	// eslint-disable-next-line unicorn/no-useless-spread
	const base = [...new Array(length)].map(() => (Math.trunc(Math.random() * 36)).toString(36)).join('');
	if (!startWithLatin) return base;
	const latinCharacters = 'abcdefghijklmnopqrstuvwxyz';
	const firstChar = latinCharacters.charAt(Math.floor(Math.random() * latinCharacters.length));
	return firstChar + base.slice(1);
};
