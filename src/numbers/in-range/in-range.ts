import { isNullish } from '../../guards';
import type { ArrayOf } from '../../types';

type RangePart = number | null;

/**
 * Checks whether at least one of provided ranges includes a given number.
 *
 * @param        value    The number to search in ranges.
 * @param        ranges   The ranges to check for occurrences.
 *
 * @returns               Is any provided range includes a given number.
 *
 * @deprecated  This function will be removed in the next major release for better consistency across the groups.
 * 							Use `rangeIncludes` from `ranges` group instead.
 */
export const inRange = (value: number, ...ranges: Array<ArrayOf<'exactly', 2, RangePart>>) =>
	ranges.some(([min, max]) => {
		if (!isNullish(min) && value < min) return false;
		// eslint-disable-next-line sonarjs/prefer-single-boolean-return
		if (!isNullish(max) && value > max) return false;

		return true;
	});
