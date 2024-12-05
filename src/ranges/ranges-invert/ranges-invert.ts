import { isNullish } from '../../guards';
import { rangeIncludes } from '../range-includes/range-includes';
import { rangesCrop } from '../ranges-crop/ranges-crop';
import { rangesMerge } from '../ranges-merge/ranges-merge';
import { formatInfinity } from '../ranges.utils';
import type { AvailableRangeValues, OutputRange, Range } from '../ranges.utils';

export const rangesInvert = <
	T extends AvailableRangeValues,
	I extends boolean = false,
>(
	ranges: T,
	start: number | null = null,
	end: number | null = null,
	infinityToNull: I = false as I,
): Array<OutputRange<T, I>> => {
	if (isNullish(start)) start = -Infinity;
	if (isNullish(end)) end = +Infinity;
	// `start` and `end` cannot be `null` since the top two lines of code.

	return rangesCrop(
		rangesMerge(ranges, true, infinityToNull).reduce<Range[]>((acc, range, i, arr) => {
			const res: Range[] = [];

			if (i === 0 && arr[0][0]! > start) {
				res.push([
					formatInfinity(start, infinityToNull),
					formatInfinity(arr[0][0], infinityToNull),
				]);
			}

			const tail = i < arr.length - 1 ? arr[i + 1][0] : end;
			if (!rangeIncludes(end, [range])) {
				res.push([
					formatInfinity((range[1] ?? -Infinity) > start ? range[1] : start, infinityToNull),
					formatInfinity(tail, infinityToNull),
				]);
			}

			return res.length ? [...acc, ...res] : acc;
		}, []),
		start,
		end,
		infinityToNull,
	) as unknown as Array<OutputRange<T, I>>;
};
