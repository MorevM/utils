/**
 * Unquotes the given string.
 *
 * @param     {string}   str   String to unquote.
 *
 * @returns   {string}         String without start/end quotes.
 */
export const unquote = (str: string): string => {
	if (!str) return '';
	const [first, last] = [str[0], str[str.length - 1]];
	if (first !== last) return str;

	if (first === '"' || first === "'") return str.slice(1, -1);
	return str;
};
