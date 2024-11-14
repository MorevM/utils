import { assert } from '../../functions/assert/assert';
import { isNullish, isNumeric } from '../../guards';
import type { ElementOf } from '../../types';
import { formatInfinity } from '../ranges.utils';
import type { AvailableRangeValues, OutputRange, Range } from '../ranges.utils';

const comparator = (a: ElementOf<Range>, b: ElementOf<Range>) => {
	if (isNullish(a) && isNullish(b)) return 0;
	if (isNullish(a) && !isNullish(b)) return -1;
	if (!isNullish(a) && isNullish(b)) return 1;
	// Three lines above cover all cases so I'm sure.
	assert(isNumeric(a) && isNumeric(b));

	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

/**
 * Sorts given ranges.
 *
 * @param   ranges           An array of ranges.
 * @param   infinityToNull   Whether to convert `Infinity` values to `null`.
 *
 * @returns                  Sorted ranges or an empty array for invalid input.
 */
export const rangesSort = <
	T extends AvailableRangeValues,
	I extends boolean = false,
>(
	ranges: T,
	infinityToNull: I = false as I,
): Array<OutputRange<T, I>> => {
	return [...(ranges ?? [] as Range[])].filter((r) => !isNullish(r)).sort((r1, r2) => {
		// These values are filtered in the upper line.
		assert(!isNullish(r1) && !isNullish(r2));

		if (r1[0] === r2[0]) {
			return comparator(r1[1], r2[1]);
		}

		return comparator(r1[0], r2[0]);
	}).map((range) => [
		formatInfinity(range![0], infinityToNull),
		formatInfinity(range![1], infinityToNull),
	]) as Array<OutputRange<T, I>>;
};
