/**
 * Quotes the given string with specified `char`.
 *
 * @param   str    String to be quoted.
 * @param   char   Quote character.
 *
 * @returns        Quoted string.
 */
export const quote = (str: string, char: string = '"'): string => {
	if (str === '') return `${char}${char}`;
	const [first, last] = [str[0], str.at(-1)];
	if (first !== char) str = char + str;
	if (last !== char) str += char;

	return str;
};
