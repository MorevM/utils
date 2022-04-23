/**
 * Returns the file extension for given filename / filepath.
 *
 * @param     {string}   input   Filename / Full path to file
 *
 * @returns   {string}           File extension (without leading dot) or `null`
 */
export const fileExtension = (input: string): string | null => {
	const basePath = input.split(/[/\\]/).pop() as string;
	return basePath.slice((Math.max(0, basePath.lastIndexOf('.')) || Infinity) + 1) || null;
};
