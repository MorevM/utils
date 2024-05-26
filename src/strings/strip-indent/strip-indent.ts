const _getMinimalIndent = (input: string) => {
	const match = input.match(/^[\t ]*(?=\S)/gm);
	if (!match) return 0;

	return match.reduce((minimalIndentation, spacings) =>
		Math.min(minimalIndentation, spacings.length), Infinity);
};


type Options = {
	/**
	 * Whether to remove leading linebreaks and spacings (before the first non-space character)
	 *
	 * @default true
	 */
	trimLeadingSpacings: boolean;

	/**
	 * Whether to remove trailing linebreaks and spacings (after the last non-space character)
	 *
	 * @default true
	 */
	trimTrailingSpacings: boolean;
};

const DEFAULTS: Options = {
	trimLeadingSpacings: true,
	trimTrailingSpacings: true,
};

const _applyOptions = (input: string, options: Options) => {
	options.trimLeadingSpacings && (input = input.replace(/^\n\s*(?=\S)/, ''));
	options.trimTrailingSpacings && (input = input.replace(/\n\s*$/, ''));

	return input;
};

/**
 * Removes an extra indentation of the string. \
 * Useful to work with template literal strings.
 *
 * @param   input         String to remove an extra indentation.
 * @param   userOptions   Extra options.
 *
 * @returns               The string with minimal required indentation.
 */
export const stripIndent = (input: string, userOptions?: Partial<Options>) => {
	const options = { ...DEFAULTS, ...userOptions };

	const minIndent = _getMinimalIndent(input);
	if (minIndent === 0) return _applyOptions(input, options);

	const regex = new RegExp(`^[\t ]{${minIndent}}`, 'gm');

	return _applyOptions(input, options).replace(regex, '');
};
