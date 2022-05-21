/* eslint-disable @typescript-eslint/require-array-sort-compare */
import { arrayShuffle } from './array-shuffle';

const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('array-shuffle', () => {
	// @TODO: Should test 1000 times
	it('Returns the shuffled array', () => {
		expect(arrayShuffle(input)).not.toStrictEqual([...input]);
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
