/**
 * Clamps a value between an upper and lower bound.
 *
 * @param   value   The preferred value to return.
 * @param   min     The lowest value to return.
 * @param   max     The highest value to return.
 *
 * @returns         Value not less than the `min` and not greater than the `max`
 */
export const clamp = (value: number, min: number, max: number): number =>
	Math.max(min, Math.min(value, max));
