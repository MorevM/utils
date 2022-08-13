import { rangesMerge } from './ranges-merge';

describe('ranges-merge', () => {
	it('Returns sorted ranges if there are no intersections', () => {
		expect(rangesMerge([[5, 10], [1, 4]])).toStrictEqual([[1, 4], [5, 10]]);
	});

	it('Returns an empty array for empty input', () => {
		expect(rangesMerge([])).toStrictEqual([]);
	});

	it('Correctly merges overlapping ranges', () => {
		expect(rangesMerge([[5, 10], [1, 4], [3, 6]])).toStrictEqual([[1, 10]]);
		expect(rangesMerge([[5, 10], [1, 4], [3, 6], [11, 13]])).toStrictEqual([[1, 10], [11, 13]]);
	});

	it('Correctly merges ranges respecting `null` values as arguments / inside the range', () => {
		expect(rangesMerge([
			[1, 5], null, [11, 15], [6, 10], null, [16, 20], [10, 30], [31, null],
		])).toStrictEqual([[1, 5], [6, 30], [31, null]]);
		expect(rangesMerge([
			[null, 5], null, [11, 15], [5, 10], null, [16, 20], [10, 30], [30, null],
		])).toStrictEqual([[null, null]]);
	});

	it('Respects `joinEdges` argument', () => {
		expect(rangesMerge([
			[1, 5], null, [9, 15], [5, 10], null, [15, 20], [31, null],
		], false)).toStrictEqual([[1, 5], [5, 15], [15, 20], [31, null]]);
	});

	it(`Doesn't mutate the original array`, () => {
		const original = [[1, 2], [0, 1]] as Array<[number, number]>;
		const clone = [...original];
		rangesMerge(original);

		expect(original).toStrictEqual(clone);
	});
});
