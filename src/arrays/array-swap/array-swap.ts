import { isUndefined } from '../../guards';
import { clamp } from '../../numbers/clamp/clamp';
import { rangesIntersection } from '../../ranges/ranges-intersection/ranges-intersection';
import { toArray } from '../to-array/to-array';

type SwapIndex = number | [number, number];

/**
 * Swaps array elements, or slices of its elements. \
 * **MUTATES** the given array.
 *
 * @param   arr              Array to operate with.
 * @param   firstPosition    Index of first element to swap (or a tuple from 2 numbers representing the array slice to swap).
 * @param   secondPosition   Index of seconde element to swap (or a tuple from 2 numbers representing the array slice to swap).
 *
 * @returns                  Array with swapped elements.
 *
 * @throws  Throws in case of invalid input:
 *          * If any swap position is outside of array range;
 *          * If swap ranges are crossed.
 */
export const arraySwapMutable = <T>(arr: T[], firstPosition: SwapIndex, secondPosition: SwapIndex) => {
	const isInRange = (index: number) => index >= 0 && index <= arr.length - 1;

	const [first, second] = [firstPosition, secondPosition]
		.map((position) => toArray(position) as [number] | [number, number])
		.sort((a, b) => a[0] > b[0] ? 1 : -1);

	if (first.some((position) => !isInRange(position))) {
		throw new Error('First swap position outside the array range');
	}

	if (!isUndefined(first[1]) && first[1] < first[0]) {
		throw new Error('The end edge of the first position is lower than the start edge');
	}

	if (second.some((position) => !isInRange(position))) {
		throw new Error('Second swap position outside the array range');
	}

	if (!isUndefined(second[1]) && second[1] < second[0]) {
		throw new Error('The end edge of the second position is lower than the start edge');
	}

	// Simplest scenario, just swap two array elements.
	if (first.length === 1 && second.length === 1) {
		[arr[first[0]], arr[second[0]]] = [arr[second[0]], arr[first[0]]];
		return arr;
	}

	const [firstRange, secondRange] = [first, second]
		.map((values) => (values.length === 1
			? [values[0], values[0]] as const
			: values));

	if (rangesIntersection([firstRange, secondRange], { inclusive: true }).length) {
		throw new Error('The edges cannot be crossed');
	}

	const firstSlice = arr.splice(first[0], (first[1] ? first[1] - first[0] + 1 : 1));

	const secondSlice = arr.splice(
		clamp(second[0] - firstSlice.length, 0),
		second[1] ? second[1] - second[0] + 1 : 1,
	);

	arr.splice(first[0], 0, ...secondSlice);
	arr.splice(second[0] + secondSlice.length - firstSlice.length, 0, ...firstSlice);

	return arr;
};

/**
 * Swaps array elements, or slices of its elements. \
 * **Does not mutate** the given array.
 *
 * @param   arr              Array to operate with.
 * @param   firstPosition    Index of first element to swap (or a tuple from 2 numbers representing the array slice to swap).
 * @param   secondPosition   Index of seconde element to swap (or a tuple from 2 numbers representing the array slice to swap).
 *
 * @returns                  Array with swapped elements.
 *
 * @throws  Throws in case of invalid input:
 *          * If any swap position is outside of array range;
 *          * If swap ranges are crossed.
 */
export const arraySwap = <T>(arr: T[], firstPosition: SwapIndex, secondPosition: SwapIndex) => {
	return arraySwapMutable([...arr], firstPosition, secondPosition);
};
