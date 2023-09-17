import { isNullish } from '../../guards';
import { rangeIncludes } from '../range-includes/range-includes';
import { rangesCrop } from '../ranges-crop/ranges-crop';
import { rangesMerge } from '../ranges-merge/ranges-merge';
import type { OutputRange, Range } from '../utils';
import { formatInfinity } from '../utils';

export const rangesInvert = (
	ranges: ReadonlyArray<Range | null> | null | undefined,
	start: number | null = null,
	end: number | null = null,
	infinityToNull: boolean = false,
): OutputRange[] => {
	if (isNullish(start)) start = -Infinity;
	if (isNullish(end)) end = +Infinity;
	// `start` and `end` cannot be `null` since the top two lines of code.

	return rangesCrop(
		rangesMerge(ranges).reduce<Range[]>((acc, range, i, arr) => {
			const res: Range[] = [];

			if (i === 0 && arr[0][0]! > start!) {
				res.push([
					formatInfinity(start, infinityToNull),
					formatInfinity(arr[0][0], infinityToNull),
				]);
			}

			const tail = i < arr.length - 1 ? arr[i + 1][0] : end;
			if (!rangeIncludes(end!, [range])) {
				res.push([
					formatInfinity((range[1] ?? -Infinity) > start! ? range[1] : start, infinityToNull),
					formatInfinity(tail, infinityToNull),
				]);
			}

			return res.length ? [...acc, ...res] : acc;
		}, []),
		start,
		end,
		infinityToNull,
	);
};
