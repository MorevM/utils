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
	const neededLength = (isInteger(length) && length > 0) ? length : 0;

	const arr = new Array(neededLength).fill(undefined);

	return mapFunction
		? arr.map((_, index) => mapFunction(index))
		: arr;
};
