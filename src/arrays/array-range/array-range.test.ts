import { arrayRange } from './array-range';

describe('array-range', () => {
	it('Returns an array containing the values from the passed `from` and `to` arguments', () => {
		expect(arrayRange(0, 2)).toStrictEqual([0, 1, 2]);
		expect(arrayRange(-2, 1)).toStrictEqual([-2, -1, 0, 1]);
	});

	it('Returns an array filling down if `from` argument is greater than `to`', () => {
		expect(arrayRange(2, 0)).toStrictEqual([2, 1, 0]);
		expect(arrayRange(2, -1)).toStrictEqual([2, 1, 0, -1]);
	});

	it('Returns a single value array if `from` and `to` are equal', () => {
		expect(arrayRange(0, 0)).toStrictEqual([0]);
		expect(arrayRange(-1, -1)).toStrictEqual([-1]);
	});

	it('Returns an array starting from `0` (or ending with `0`) if only one argument is passed', () => {
		expect(arrayRange(0)).toStrictEqual([0]);
		expect(arrayRange(2)).toStrictEqual([0, 1, 2]);
		expect(arrayRange(-2)).toStrictEqual([-2, -1, 0]);
	});
});
