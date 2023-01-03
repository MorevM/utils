export type Range = readonly [number | null | undefined, number | null | undefined];

export const formatInfinity = (value: any, isNeeded: boolean) => isNeeded
	? ((value === Infinity || value === -Infinity) ? null : value)
	: value;
