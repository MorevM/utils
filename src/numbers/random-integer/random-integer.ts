/**
 * Generates a random integer (including `min` and `max` values).
 *
 * @param   min   The lowest value to return.
 * @param   max   The highest value to return.
 *
 * @returns         Random integer value greater than `min` and less than `max` (inclusive)
 */
export const randomInteger = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;
