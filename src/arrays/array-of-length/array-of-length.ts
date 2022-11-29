import { isInteger } from '../../guards';

/**
 * Constructs an array of a given length.
 * Kinda syntax sugar for `Array.from({ length: n })`.
 *
 * @param   length        The needed length of array.
 * @param   mapFunction   Optional function to return each element value.
 *
 * @returns               An array of a given length.
 */
export const arrayOfLength = <T = undefined>(
	length: number,
	mapFunction?: (index: number) => T,
): T[] => {
	const neededLength = isInteger(length) ? length : 0;
	const mapFn = mapFunction ?? (() => undefined);

	// The value is always `undefined` in this situation,
	// so it can be omitted from the public signature.
	return Array.from({ length: neededLength }, (_, index) => mapFn(index));
};
