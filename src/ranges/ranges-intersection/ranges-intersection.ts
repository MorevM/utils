import { rangesMerge } from '../ranges-merge/ranges-merge';
import type { AvailableRangeValues, Range } from '../ranges.utils';

type Options = {
	/**
	 * Whether to treat identical edges as intersections.
	 *
	 * @example
	 * rangesIntersection([[0, 1], [1, 2]], { inclusive: true });
	 * // [[1, 1]]
	 *
	 * @default false
	 */
	inclusive: boolean;
};

const DEFAULT_OPTIONS = {
	inclusive: false,
};

// Utility function to make it less verbose.
const safeNumber = (maybeNumber: number | null | undefined, sign: '+' | '-' = '+') =>
	maybeNumber ?? (sign === '+' ? Infinity : -Infinity);

/**
 * Calculates the intersections of the passed ranges.
 *
 * @param   ranges        An array of ranges to calculate intersections.
 * @param   userOptions   Custom options.
 *
 * @returns               An array containing all intersections between passed ranges.
 */
export const rangesIntersection = (
	ranges: AvailableRangeValues,
	userOptions?: Partial<Options>,
) => {
	if (!ranges) return [];

	const options = { ...DEFAULT_OPTIONS, ...userOptions };

	const isOverlapping = (minRange: Range, maxRange: Range) => {
		return options.inclusive
			? safeNumber(minRange[1]) >= safeNumber(maxRange[0], '-')
			: safeNumber(minRange[1]) > safeNumber(maxRange[0], '-');
	};

	const matches = ranges.filter(Boolean).reduce<Array<[number, number]>>(
		(acc, r1, index) => {
			// The last element is already compared to all other ranges.
			if (index === ranges.length - 1) return acc;

			const restRanges = ranges.slice(index + 1).filter(Boolean);

			restRanges.forEach((r2) => {
				const min = safeNumber(r1[0], '-') < safeNumber(r2[0], '-') ? r1 : r2;
				const max = min === r1 ? r2 : r1;

				if (!isOverlapping(min, max)) return null;

				acc.push([
					safeNumber(max[0], '-'),
					safeNumber(min[1]) < safeNumber(max[1])
						? safeNumber(min[1])
						: safeNumber(max[1]),
				]);
			});

			return acc;
		}, [],
	);

	return rangesMerge(matches, options.inclusive);
};
