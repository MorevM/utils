/**
 * Bare-bones linear interpolation function.
 *
 * @param   start    The initial value.
 * @param   end      The final value.
 * @param   amount   Amount of interpolation between `start` and `end` in range `[0..1]`.
 *
 * @returns          The interpolated value.
 */
export const lerp = (start: number, end: number, amount: number) => {
	return (1 - amount) * start + amount * end;
};
