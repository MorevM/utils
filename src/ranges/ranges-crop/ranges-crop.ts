import { isEmpty, isNullish } from '../../guards';
import { rangesMerge } from '../ranges-merge/ranges-merge';
import type { OutputRange, Range } from '../utils';
import { formatInfinity } from '../utils';

/**
 * Crops an array of ranges if they go beyond the `start` and `end`.
 *
 * @param   ranges           An array of ranges to crop.
 * @param   start            Minimum allowed range value.
 * @param   end              Maximum allowed range value.
 * @param   infinityToNull   Whether the return value should be `null` instead of `+-Infinity`.
 *
 * @returns                  The array of cropped ranges.
 */
export const rangesCrop = (
	ranges: Range[] | null | undefined,
	start: number | null = null,
	end: number | null = null,
	infinityToNull: boolean = false,
): OutputRange[] => {
	if (isEmpty(ranges)) return [];
	if (isNullish(start)) start = -Infinity;
	if (isNullish(end)) end = +Infinity;
	// `start` and `end` cannot be `null` here since previous 2 lines.

	return rangesMerge(ranges)
		.map(range => [
			isNullish(range[0]) ? -Infinity : range[0],
			isNullish(range[1]) ? +Infinity : range[1],
		])
		.filter(range => range[1] >= start! && range[0] <= end!)
		.map(range => {
			let [first, second] = range;
			if (first < start!) first = start!;
			if (second > end!) second = end!;

			return [
				formatInfinity(first, infinityToNull),
				formatInfinity(second, infinityToNull),
			];
		});
};
