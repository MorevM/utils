import { arraysUnion } from './arrays-union';

describe('arrays-union', () => {
	it('Returns the array which is the result of combine a given arrays', () => {
		expect(arraysUnion([1, 2], [3, 4])).toStrictEqual([1, 2, 3, 4]);
		expect(arraysUnion([1, 2], [3, 4], [5, 6])).toStrictEqual([1, 2, 3, 4, 5, 6]);
	});

	it('Omits duplicated values', () => {
		expect(arraysUnion([1, 2, 3], [3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5]);
	});

	it('Returns a given array without duplicated values if it is the only given array', () => {
		expect(arraysUnion([1, 2, 3, 1, 2])).toStrictEqual([1, 2, 3]);
	});

	it('Returns empty array if empty array(s) given', () => {
		expect(arraysUnion([])).toStrictEqual([]);
		expect(arraysUnion([], [])).toStrictEqual([]);
	});
});
