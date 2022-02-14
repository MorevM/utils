/**
 * Clamps a value between an upper and lower bound.
 *
 * @param     {number}   value   The preferred value to return.
 * @param     {number}   min     The lowest value to return.
 * @param     {number}   max     The highest value to return.
 *
 * @returns   {number}
 */
export const clamp = (value: number, min: number, max: number): number =>
	Math.max(min, Math.min(value, max));
