/* eslint-disable @typescript-eslint/require-array-sort-compare */
import { deepEqual } from '../../objects';
import { arrayOfLength } from '../array-of-length/array-of-length';
import { arrayShuffle } from './array-shuffle';

const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('array-shuffle', () => {
	it('Returns the shuffled array', () => {
		const TIMES = 100000;
		const result = arrayOfLength(TIMES, () => arrayShuffle(input));

		const sameOrderCount = result.reduce((acc, curr) => {
			return acc + (deepEqual(input, curr) ? 1 : 0);
		}, 0);

		// `0.1%` of `10!` looks like a pretty good threshold, doesn't it?
		expect(sameOrderCount).toBeLessThan(TIMES / 1000);
	});

	it('Contains the same elements after shuffle', () => {
		expect(arrayShuffle(input).sort()).toStrictEqual([...input].sort());
	});

	it('Returns given array as is if it contains single element', () => {
		expect(arrayShuffle([1])).toStrictEqual([1]);
	});

	it('Returns empty array if empty array given', () => {
		expect(arrayShuffle([])).toStrictEqual([]);
	});
});
