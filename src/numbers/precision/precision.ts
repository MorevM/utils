import { toNumber } from '../to-number/to-number';

/**
 * Returns the precision of the number. \
 * If it is impossible to cast given value to a number, returns `null`.
 *
 * @see https://stackoverflow.com/a/73937406
 *
 * @param   maybeNumber   Number (or numeric string) to determine its precision.
 *
 * @returns               A given number precision or `null` in case of invalid input.
 */
export const precision = (maybeNumber: any) => {
	const value = toNumber(maybeNumber, null);
	if (value === null || !Number.isFinite(value)) return null;

	let e = 1; let p = 0;
	while (Math.round(value * e) / e !== value) { e *= 10; p++; }

	return p;
};
