/**
 * Unquotes the given string.
 *
 * @param   str   String to unquote.
 *
 * @returns       String without start/end quotes/backticks.
 */
export const unquote = (str: string): string => {
	if (!str) return '';
	const [first, last] = [str[0], str[str.length - 1]];
	if (first !== last) return str;

	if (first === '"' || first === "'" || first === '`') return str.slice(1, -1);
	return str;
};
