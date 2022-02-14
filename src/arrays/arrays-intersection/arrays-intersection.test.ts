import { arraysIntersection } from './arrays-intersection';

describe('arrays-intersection', () => {
	it('Returns the array of values that are present in all of a given arrays', () => {
		expect(arraysIntersection([1, 2, 3], [2, 3, 4])).toStrictEqual([2, 3]);
		expect(arraysIntersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toStrictEqual([3]);
	});

	it('Returns a given array as is if it is the only given array', () => {
		expect(arraysIntersection([1, 2, 3])).toStrictEqual([1, 2, 3]);
	});

	it('Returns empty array if there is no intersections between all of a given arrays', () => {
		expect(arraysIntersection([1, 2], [3, 4], [5, 6])).toStrictEqual([]);
	});

	it('Returns empty array if empty array(s) given', () => {
		expect(arraysIntersection([])).toStrictEqual([]);
		expect(arraysIntersection([], [])).toStrictEqual([]);
	});
});
