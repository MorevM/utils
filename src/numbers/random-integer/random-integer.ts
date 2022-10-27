/**
 * Generates a random integer (including `min` and `max` values). \
 * Returns a random integer between 1 and `MAX_SAFE_INTEGER`
 * if called with no arguments which covers the most frequent use case.
 *
 * @param   min   The lowest value to return.
 * @param   max   The highest value to return.
 *
 * @returns         Random integer value greater than `min` and less than `max` (inclusive)
 */
export const randomInteger = (min: number = 1, max: number = Number.MAX_SAFE_INTEGER): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;
