/* eslint-disable import/exports-last */
import { isNullish } from '../../guards';
import { rangesSort } from '../ranges-sort/ranges-sort';
import { formatInfinity } from '../utils';
import type { AvailableRangeValues, OutputRange } from '../utils';

/**
 * Sorts and merges given ranges.
 *
 * @param   ranges           An array of ranges.
 * @param   joinEdges        Whether to combine ranges if they are contiguous.
 * @param   infinityToNull   Whether to return `null` instead of `Infinity`.
 *
 * @returns                  Sorted and merged ranges or an empty array for invalid input.
 */
export const rangesMerge = <
	T extends AvailableRangeValues,
	I extends boolean = false,
>(
	ranges: T,
	joinEdges = true,
	infinityToNull: I = false as I,
): Array<OutputRange<T, I>> => {
	const sorted = rangesSort(ranges, infinityToNull)
		.map(r => [
			isNullish(r[0]) ? -Infinity : r[0],
			isNullish(r[1]) ? +Infinity : r[1],
		]);

	for (let l = sorted.length - 1, i = l; i > 0; i--) {
		if (
			sorted[i][0] <= sorted[i - 1][0]
      || (!joinEdges && sorted[i][0] < sorted[i - 1][1])
      || (joinEdges && sorted[i][0] <= sorted[i - 1][1])
		) {
			sorted[i - 1][0] = Math.min(sorted[i][0], sorted[i - 1][0]);
			sorted[i - 1][1] = Math.max(sorted[i][1], sorted[i - 1][1]);
			sorted.splice(i, 1);
			i = sorted.length;
		}
	}

	return sorted.length
		? sorted.map(r => [
			formatInfinity(r[0], infinityToNull),
			formatInfinity(r[1], infinityToNull),
		]) as Array<OutputRange<T, I>>
		: [];
};
