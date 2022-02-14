/**
 * Quotes the given string with specified `char`.
 *
 * @param     {string}   str    String to be quoted.
 * @param     {string}   char   Quote character.
 *
 * @returns   {string}          Quoted string.
 */
export const quote = (str: string, char: string = '"'): string => {
	if (str === '') return `${char}${char}`;
	const [first, last] = [str[0], str[str.length - 1]];
	if (first !== char) str = char + str;
	if (last !== char) str += char;

	return str;
};
