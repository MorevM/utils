import { isNullish } from '../../guards';
import type { Range } from '../utils';

/**
 * Checks whether at least one of provided ranges
 * (or all of them depending on the `mode` argument) includes a given number.
 *
 * @param   value    The number to search in ranges.
 * @param   ranges   The ranges to check for occurrences.
 * @param   mode     Whether the every range includes a number (`all`) or at least one is enough (`any`). Default is `any`.
 *
 * @returns          Is any range (or all of them depending on the `mode` argument) includes a given number.
 */
export const rangeIncludes = (
	value: number,
	ranges: readonly Range[] | null | undefined,
	mode: 'all' | 'any' = 'any',
) => {
	const method = mode === 'all' ? 'every' : 'some';
	return (ranges ?? [])[method](([min, max]) => {
		if (!isNullish(min) && value < min) return false;
		// eslint-disable-next-line sonarjs/prefer-single-boolean-return
		if (!isNullish(max) && value > max) return false;

		return true;
	});
};
