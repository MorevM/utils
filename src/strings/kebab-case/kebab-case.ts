type Options = {
	/**
	 * Whether numbers should be separated.
	 */
	numbers: boolean;
};

/**
 * Convert a string to kebab-case: `fooFar` → `foo-bar`
 *
 * @param   input      A string to convert to kebab-case
 * @param   _options   Transform options
 *
 * @returns            The string converted to kebab-case.
 */
export const kebabCase = (input: string, _options?: Options): string => {
	const options = { numbers: false, ..._options };
	let result = input
		.replaceAll(/([a-z])([A-Z])/g, '$1-$2')
		.replaceAll(/[\s._]+/g, '-');

	if (!options.numbers) return result.toLowerCase();

	result = result
		.replace(/\d+/, '-$&')
		.replaceAll(/(\d)([A-Z])/g, '$1-$2');

	return result.startsWith('-')
		? result.slice(1).toLowerCase()
		: result.toLowerCase();
};
