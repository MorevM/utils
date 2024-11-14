import { arrayOfLength } from '../array-of-length/array-of-length';

/**
 * Returns an array of integers starting from argument `from` and ending with `to` argument. \
 * Returns an array starting from / ending with `0` if single argument is passed.
 *
 * @param   from   Lower value of resulting array
 * @param   to     Upper value of resulting array
 *
 * @returns        An array starting with `from` and ending with `to`.
 */
export const arrayRange = (from: number, to?: number) => {
	if (to === undefined) {
		if (from < 0) {
			to = 0;
		} else {
			to = from;
			from = 0;
		}
	}

	return arrayOfLength(Math.abs(to - from) + 1, (index) => index)
		.map((i) => (from > to ? -i : i) + from);
};
