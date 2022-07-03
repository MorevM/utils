type FormatSlashesOptions = {
	/**
	 * Slash variant
	 */
	to: '/' | '\\';
	/**
	 * Should there be a leading slash?
	 */
	start: boolean;
	/**
	 * Should there be a trailing slash?
	 */
	end: boolean;
};

/**
 * Formats given string
 *
 * @param   input     The input string.
 * @param   options   Formatter options.
 *
 * @returns             Formatted string.
 */
export const formatSlashes = (input: string, options?: Partial<FormatSlashesOptions>): string => {
	// Remove any duplicated slashes except after `:` (in case https://some.ru/path//)
	input = input.replace(/([^:]\/)\/+/g, '$1').replace(/\\\\+/g, '\\');

	if (options?.to) {
		const re = options.to === '/' ? '\\\\' : '/';
		input = input.replace(new RegExp(re, 'g'), options.to);
	}

	const slash = options?.to ?? input.match(/[/\\]/)?.[0] ?? '/';

	if (options?.start === true && !input.startsWith(slash)) {
		input = slash + input;
	}
	if (options?.start === false && input.startsWith(slash)) {
		input = input.slice(1);
	}

	if (options?.end === true && !input.endsWith(slash)) {
		input += slash;
	}
	if (options?.end === false && input.endsWith(slash)) {
		input = input.slice(0, -1);
	}

	return input;
};
