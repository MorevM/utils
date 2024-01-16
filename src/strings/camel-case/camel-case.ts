/* eslint-disable regexp/no-unused-capturing-group, no-autofix/regexp/no-unused-capturing-group -- Used actually */
import { isArray, isString } from '../../guards';

type CamelCaseOptions = {
	readonly preserveConsecutiveUppercase?: boolean;
};

const UPPERCASE = /\p{Lu}/u;
const LOWERCASE = /\p{Ll}/u;
const LEADING_CAPITAL = /^\p{Lu}(?!\p{Lu})/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[ \-._]+/;

const LEADING_SEPARATORS = new RegExp(`^${SEPARATORS.source}`);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp(`\\d+${IDENTIFIER.source}`, 'gu');

const defaultOptions: CamelCaseOptions = {
	preserveConsecutiveUppercase: false,
};

const preserveCamelCase = (string: string) => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && UPPERCASE.test(character)) {
			string = `${string.slice(0, i)}-${string.slice(i)}`;
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
			string = `${string.slice(0, i - 1)}-${string.slice(i - 1)}`;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const preserveConsecutiveUppercase = (input: string) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replaceAll(LEADING_CAPITAL, m1 => m1.toLowerCase());
};

const postProcess = (input: string) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replaceAll(SEPARATORS_AND_IDENTIFIER, (_, identifier) => identifier.toUpperCase())
		.replaceAll(NUMBERS_AND_IDENTIFIER, m => m.toUpperCase());
};

/**
 * Converts a dash/dot/underscore/space separated string to camelCase: `foo-bar` → `fooBar`
 *
 * @param        input     A string/array of strings to convert to camelCase.
 * @param        options   Additional options being supplied to the `_camelCase`.
 *
 * @returns                The string converted to camelCase.
 *
 * @throws    {TypeError}  Throws if not a string is passed in.
 */
export const camelCase = (
	input: string | readonly string[],
	options?: CamelCaseOptions,
): string => {
	if (!isArray(!input) && !isString(input)) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = { ...defaultOptions, ...options };

	input = isArray(input)
		? input.map(v => v.trim()).filter(Boolean).join('-')
		: (input as string).trim();

	if (!input.length) return '';
	if (input.length === 1) return input.toLowerCase();
	if (input !== input.toLowerCase()) {
		input = preserveCamelCase(input);
	}

	input = input.replace(LEADING_SEPARATORS, '');

	input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input) : input.toLowerCase();

	return postProcess(input);
};
