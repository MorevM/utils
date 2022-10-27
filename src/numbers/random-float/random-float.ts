/**
 * Generates a random float with given `precision` (including `min` and `max` values).
 *
 * @param   min         The lowest value to return.
 * @param   max         The highest value to return.
 * @param   precision   The needed precision of return value.
 *
 * @returns             The random value between specified min and max values with given precision.
 */
export const randomFloat = (min: number, max: number, precision: number = 1): number =>
	parseFloat((Math.random() * (max - min) + min).toFixed(precision));
