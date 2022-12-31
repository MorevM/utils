import { assert } from '../../functions';
import { isNullish, isNumeric } from '../../guards';

type AllowedInTuple = number | null | undefined;
type Range = [AllowedInTuple, AllowedInTuple];

const comparator = (a: AllowedInTuple, b: AllowedInTuple) => {
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
 * @param   ranges   An array of ranges.
 *
 * @returns          Sorted ranges or an empty array for invalid input.
 */
export const rangesSort = (ranges: Array<Range | null> | null | undefined): Range[] => {
	return [...(ranges ?? [])].filter(r => r !== null).sort((r1, r2) => {
		// These values are filtered in the upper line.
		assert(!isNullish(r1) && !isNullish(r2));

		if (r1[0] === r2[0]) {
			return comparator(r1[1], r2[1]);
		}

		return comparator(r1[0], r2[0]);
	}) as Range[];
};
