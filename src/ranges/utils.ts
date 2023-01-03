export type Range = readonly [number | null | undefined, number | null | undefined];
export type OutputRange = [number | null, number | null];

export const formatInfinity = (value: any, isNeeded: boolean) => isNeeded
	? ((value === Infinity || value === -Infinity) ? null : value)
	: value;
