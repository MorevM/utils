import { isString } from '../is-string/is-string';

/**
 * Checks whether a given value is a valid HEX.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a valid HEX.
 */
export const isHex = (value: unknown): value is string => {
	if (!isString(value)) return false;

	return /^#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})$/i.test(value.toLowerCase());
};
