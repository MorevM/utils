import { isNullish } from '../guards';
import type { ElementOf } from '../types';

export type Range = readonly [number | null | undefined, number | null | undefined];
export type AvailableRangeValues = ReadonlyArray<Range | null> | null | undefined;
export type OutputRange<T, InfToNull extends boolean> =
	InfToNull extends true
		? [number | null, number | null]
		: T extends Range[]
			? null extends ElementOf<ElementOf<T>>
				? [number | null, number | null]
				: [number, number]
			: [number | null, number | null];

export const formatInfinity = (value: number | null | undefined, isNeeded: boolean) => {
	if (!isNeeded) return isNullish(value) ? null : value;

	return (value === Infinity || value === -Infinity)
		? null
		: isNullish(value) ? null : value;
};
