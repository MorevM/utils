import { isInteger } from '../../guards';
import { randomInteger } from '../../numbers/random-integer/random-integer';
import { arrayOfLength } from '../array-of-length/array-of-length';
import { arrayShuffle } from '../array-shuffle/array-shuffle';

/**
 * Returns `size` random elements from the given array.
 *
 * @param   array      The original array.
 * @param   size       The needed length of sample. \
 *                     Default is `1`.
 * @param   oversize   Should the function return more elements than the original array has if `size` is greater than the original array length? \
 *                     Default is `false`.
 * @returns
 */
export const arraySample = (array: any[], size: number = 1, oversize: boolean = false) => {
	if (!array?.length || !isInteger(size) || size < 1) return undefined;

	if (size === 1) {
		return array[randomInteger(0, array.length - 1)];
	}

	(!oversize) && (size = Math.min(array.length, size));

	const result: any[] = [];
	while (result.length < size) {
		const neededCount = size - result.length;
		const iterationIndexes = arrayOfLength(array.length, (index) => index);

		if (neededCount > array.length) {
			result.push(...iterationIndexes.map(i => array[i]));
		} else {
			result.push(...arrayShuffle(iterationIndexes).slice(0, neededCount).map(i => array[i]));
		}
	}

	return result;
};
