/**
 * Clamps a value between an upper and lower bound.
 *
 * @param   value   The preferred value to return.
 * @param   min     The lowest value to return or `null` to skip.
 * @param   max     The highest value to return or `null` to skip.
 *
 * @returns         Value not less than the `min` and not greater than the `max`
 */
export const clamp = (
	value: number,
	min: number | null = -Infinity,
	max: number | null = Infinity,
) =>
	Math.max(
		min ?? -Infinity,
		Math.min(value, max ?? Infinity),
	);
