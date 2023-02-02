import { toArray } from '../../arrays/to-array/to-array';
import { isArray, isNullish, isObject } from '../../guards';
import { toNumber } from '../../numbers/to-number/to-number';

type PathVariant = string | Array<string | number>;

const extractSegments = (path: PathVariant) => toArray(path)
	.map((p: string | number) => p.toString().trim())
	.flatMap(part => part
		.replaceAll(/\[(.?)]/g, '.$1.')
		.replaceAll(/\.+/g, '.')
		.split('.')
		.filter(Boolean)
		.map(p => toNumber(p, p)));

/**
 * Gets a property from an object using dot (object path) notation.
 *
 * @param   input          The value to search in.
 * @param   path           The path to search using dot or array notation.
 * @param   defaultValue   The value to return if the path doesn't exist.
 * @returns                The value of property in the passed path if exists, `defaultValue` otherwise.
 */
export const objectGet = (
	input: any,
	path: PathVariant,
	defaultValue: any = undefined,
) => {
	if (!input || (!isObject(input) && !isArray(input)) || isNullish(path)) {
		return defaultValue;
	}
	const segments = extractSegments(path);

	let result = input;
	while (segments.length) {
		const property = segments.shift() as string | number;
		if (!(property in result)) return defaultValue;
		result = result[property];
	}

	return result;
};
