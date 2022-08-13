import { rangesSort } from './ranges-sort';

describe('rangesSort', () => {
	it(`Doesn't mutate the original array`, () => {
		const original = [[1, 2], [0, 1]] as Array<[number, number]>;
		const clone = [...original];
		rangesSort(original);

		expect(original).toStrictEqual(clone);
	});

	it('Returns given array as is if only one range is passed', () => {
		expect(rangesSort([[0, 0]])).toStrictEqual([[0, 0]]);
	});

	it('Correctly sorts two ranges', () => {
		expect(rangesSort([[0, 0], [0, 0]])).toStrictEqual([[0, 0], [0, 0]]);
		expect(rangesSort([[0, 1], [1, 2]])).toStrictEqual([[0, 1], [1, 2]]);
		expect(rangesSort([[1, 2], [0, 1]])).toStrictEqual([[0, 1], [1, 2]]);
		expect(rangesSort([[0, 2], [0, 1]])).toStrictEqual([[0, 1], [0, 2]]);
		expect(rangesSort([[0, 2], [-1, 1]])).toStrictEqual([[-1, 1], [0, 2]]);
	});

	it('Correctly sorts more than two ranges', () => {
		expect(rangesSort([[-1, 1], [-2, 2], [-3, 3]])).toStrictEqual([[-3, 3], [-2, 2], [-1, 1]]);
		expect(rangesSort([[-1, 1], [-1, 2], [-1, -1]])).toStrictEqual([[-1, -1], [-1, 1], [-1, 2]]);
	});

	it('Allows arguments to be `null`', () => {
		expect(rangesSort([[-1, 1], null, [-3, 3]])).toStrictEqual([[-3, 3], [-1, 1]]);
		expect(rangesSort([[-1, 1], [-1, -1]])).toStrictEqual([[-1, -1], [-1, 1]]);
	});

	it('Returns an empty array for empty input', () => {
		expect(rangesSort([])).toStrictEqual([]);
		expect(rangesSort([null, null])).toStrictEqual([]);
	});

	it('Correctly works with open ranges represented by a single value', () => {
		expect(rangesSort([
			[null, 1], [-2, 2], [null, -2], [-3, 3], [0, null], [-2, Infinity],
		])).toStrictEqual([
			[null, -2], [null, 1], [-3, 3], [-2, 2], [-2, Infinity], [0, null],
		]);
	});
});
