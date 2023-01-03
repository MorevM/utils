import { isNullish } from '../../guards';
import { rangesSort } from '../ranges-sort/ranges-sort';
import type { OutputRange, Range } from '../utils';

/**
 * Sorts and merges given ranges.
 *
 * @param   ranges      An array of ranges.
 * @param   joinEdges   Whether to combine ranges if they are contiguous.
 *
 * @returns             Sorted and merged ranges or an empty array for invalid input.
 */
export const rangesMerge = (ranges: Array<Range | null> | null | undefined, joinEdges = true): OutputRange[] => {
	const sorted = rangesSort(ranges)
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
			r[0] === -Infinity ? null : r[0],
			r[1] === Infinity ? null : r[1],
		])
		: [];
};
