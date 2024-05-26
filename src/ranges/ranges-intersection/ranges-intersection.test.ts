import { rangesIntersection } from './ranges-intersection';

describe('ranges-intersection', () => {
	it(`Doesn't mutate the original array`, () => {
		const original = [[1, 2], [0, 5]] as const;
		const clone = [...original];
		rangesIntersection(original);

		expect(original).toStrictEqual(clone);
	});

	it(`Returns empty result for invalid ranges`, () => {
		expect(rangesIntersection([[0, 0], null])).toStrictEqual([]);
		expect(rangesIntersection([[10, 10], [10, 10], null])).toStrictEqual([]);
	});

	it(`Returns empty result for non-overlapping ranges`, () => {
		expect(rangesIntersection([[0, 0], [0, 0]])).toStrictEqual([]);
		expect(rangesIntersection([[-Infinity, 0], [1, Infinity]])).toStrictEqual([]);
		expect(rangesIntersection([[1, 2], [2, 3]])).toStrictEqual([]);
		expect(rangesIntersection([[-1, 0], [1, 2]])).toStrictEqual([]);
		expect(rangesIntersection([[-2, 0], [1, 5]])).toStrictEqual([]);
		expect(rangesIntersection([[-1, 0], [1, 2], [3, 4], [5, 6]])).toStrictEqual([]);
	});

	it('Returns intersection on edges using `inclusive` option', () => {
		expect(rangesIntersection([[0, 0], [0, 0]], { inclusive: true })).toStrictEqual([[0, 0]]);
		expect(rangesIntersection([[0, 0], [0, 0], [2, 3], [3, 4]], { inclusive: true })).toStrictEqual([[0, 0], [3, 3]]);
		expect(rangesIntersection([
			[10, 20], [15, 25],
			[0, 0], [0, 0],
		], { inclusive: true })).toStrictEqual([[0, 0], [15, 20]]);
	});

	it(`Returns correct result for two overlapping ranges`, () => {
		expect(rangesIntersection([[-Infinity, Infinity], [5, Infinity]])).toStrictEqual([[5, Infinity]]);
		expect(rangesIntersection([[-Infinity, Infinity], [-Infinity, Infinity]])).toStrictEqual([[-Infinity, Infinity]]);
		expect(rangesIntersection([[-Infinity, 10], [-Infinity, 20]])).toStrictEqual([[-Infinity, 10]]);
		expect(rangesIntersection([[-Infinity, 10], [-Infinity, Infinity]])).toStrictEqual([[-Infinity, 10]]);
		expect(rangesIntersection([[0, Infinity], [-Infinity, Infinity]])).toStrictEqual([[0, Infinity]]);
		expect(rangesIntersection([[-Infinity, 10], [5, Infinity]])).toStrictEqual([[5, 10]]);
		expect(rangesIntersection([[-10, 10], [-20, 20]])).toStrictEqual([[-10, 10]]);
		expect(rangesIntersection([[-20, 20], [-10, 10]])).toStrictEqual([[-10, 10]]);
		expect(rangesIntersection([[-20, 20], [-10, 10]])).toStrictEqual([[-10, 10]]);
	});

	it('Treats `null` as `-Infinity` / `Infinity`', () => {
		expect(rangesIntersection([[null, null], [null, null]])).toStrictEqual([[-Infinity, Infinity]]);
		expect(rangesIntersection([[null, 0], [null, -10]])).toStrictEqual([[-Infinity, -10]]);
		expect(rangesIntersection([[0, Infinity], [10, Infinity]])).toStrictEqual([[10, Infinity]]);
		expect(rangesIntersection([[0, Infinity], [10, 20]])).toStrictEqual([[10, 20]]);
	});

	it(`Returns correct result for multiple overlapping ranges`, () => {
		expect(rangesIntersection([
			[-Infinity, Infinity],
			[-Infinity, Infinity],
			[0, 2],
			[2, 3],
		])).toStrictEqual([[-Infinity, Infinity]]);

		expect(rangesIntersection([
			[-10, -4],
			[-Infinity, -5],
			[0, 2],
			[0, 3],
		])).toStrictEqual([[-10, -5], [0, 2]]);
	});
});
