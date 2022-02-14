import { arraysDifference } from './arrays-difference';

describe('arrays-difference', () => {
	it('Returns the array of values that are present not in all of a given arrays', () => {
		expect(arraysDifference([1, 2, 3], [2, 3, 4])).toStrictEqual([1, 4]);
		expect(arraysDifference([1, 2, 3], [2, 3, 4], [3, 4, 5])).toStrictEqual([1, 2, 4, 5]);
	});

	it('Returns empty array if equal arrays given', () => {
		expect(arraysDifference([1, 2, 3], [1, 2, 3])).toStrictEqual([]);
	});

	it('Returns empty array if the only array given', () => {
		expect(arraysDifference([1, 2, 3])).toStrictEqual([]);
	});

	it('Returns empty array if empty array(s) given', () => {
		expect(arraysDifference([])).toStrictEqual([]);
		expect(arraysDifference([], [])).toStrictEqual([]);
	});
});
