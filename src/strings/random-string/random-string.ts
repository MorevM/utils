/**
 * Generates a random string of given length and (optionally) starting with a latin character
 * (if used to fill `id` of HTMLElement for example)
 *
 * @param     {number}    length           The length of result string.
 * @param     {boolean}   startWithLatin   Should string strictly start with latin character or not
 *
 * @returns   {string}                     Generated string of a given length.
 */
export const randomString = (length: number = 10, startWithLatin: boolean = true): string => {
	const base = [...new Array(length)].map(() => (Math.trunc(Math.random() * 36)).toString(36)).join('');
	if (!startWithLatin) return base;
	const latinCharacters = 'abcdefghijklmnopqrstuvwxyz';
	const firstChar = latinCharacters.charAt(Math.floor(Math.random() * latinCharacters.length));
	return firstChar + base.slice(1);
};
