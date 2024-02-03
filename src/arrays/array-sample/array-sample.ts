import { isInteger } from '../../guards';
import { randomInteger } from '../../numbers/random-integer/random-integer';
import { arrayOfLength } from '../array-of-length/array-of-length';
import { arrayShuffle } from '../array-shuffle/array-shuffle';

type NeverAsUndefined<Type, AsArray extends boolean> = [Type] extends [never]
	? undefined
	: AsArray extends true ? Type[] : Type;

// @TODO: Maybe it is possible to create a tuple instead of array
type Result<
	Source extends readonly any[],
	Type,
	SampleSize,
> = Source['length'] extends 0
	? undefined
	: SampleSize extends 1
		? NeverAsUndefined<Type, false>
		: NeverAsUndefined<Type, true>;

/**
 * Returns `size` random elements from the given array.
 *
 * @param   array      The original array.
 * @param   size       The needed length of sample. \
 *                     Default is `1`.
 * @param   oversize   Should the function return more elements than the original array has if `size` is greater than the original array length? \
 *                     Default is `false`.
 *
 * @returns            An array containing `size` elements from a given array,
 *                     or just a random value from the given array if the `size` is `1` (default).
 */
export const arraySample = <const T, Size extends number = 1>(
	array: readonly T[],
	size: Size = 1 as Size,
	oversize: boolean = false,
): Result<typeof array, T, Size> => {
	if (!array?.length || !isInteger(size) || size < 1) return undefined as Result<typeof array, T, Size>;

	if (size === 1) {
		return array[randomInteger(0, array.length - 1)] as Result<typeof array, T, Size>;
	}

	(!oversize) && (size = Math.min(array.length, size) as Size);

	const result: T[] = [];
	while (result.length < size) {
		const neededCount = size - result.length;
		const iterationIndexes = arrayOfLength(array.length, (index) => index);

		if (neededCount > array.length) {
			result.push(...iterationIndexes.map(i => array[i]));
		} else {
			result.push(...arrayShuffle(iterationIndexes).slice(0, neededCount).map(i => array[i]));
		}
	}

	return result as Result<typeof array, T, Size>;
};
