/**
 * Generates a random integer (including `min` and `max` values).
 *
 * @param     {number}   min   The lowest value to return.
 * @param     {number}   max   The highest value to return.
 *
 * @returns   {number}
 */
export const randomInteger = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;
