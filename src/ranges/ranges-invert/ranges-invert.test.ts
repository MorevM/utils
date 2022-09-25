import { rangesInvert } from './ranges-invert';

describe('ranges-invert', () => {
	it(`Doesn't mutate the original array`, () => {
		const original = [[1, 2], [0, 1]] as Array<[number, number]>;
		const clone = [...original];
		rangesInvert(original);

		expect(original).toStrictEqual(clone);
	});

	it(`Returns an empty array for empty input`, () => {
		expect(rangesInvert([])).toStrictEqual([]);
	});

	it(`Returns an empty array for invalid input`, () => {
		expect(rangesInvert(undefined)).toStrictEqual([]);
		expect(rangesInvert(null)).toStrictEqual([]);
	});

	it('Inverts a single range without any options', () => {
		expect(rangesInvert([[0, 5]])).toStrictEqual([[-Infinity, 0], [5, +Infinity]]);
	});

	it('Inverts a multiple ranges without any options', () => {
		expect(rangesInvert([[0, 5], [6, 10]])).toStrictEqual([[-Infinity, 0], [5, 6], [10, +Infinity]]);
	});

	it('Inverts a multiple intersecting ranges without any options', () => {
		expect(rangesInvert([[-1, 5], [2, 3], [4, 6]])).toStrictEqual([[-Infinity, -1], [6, +Infinity]]);
	});

	it('Inverts a multiple ranges considering `start` argument outside of range', () => {
		expect(rangesInvert([[-1, 5], [2, 3], [4, 6]], -10)).toStrictEqual([[-10, -1], [6, +Infinity]]);
	});

	it('Inverts a multiple ranges considering `start` argument inside of range', () => {
		expect(rangesInvert([[-1, 5], [2, 3], [4, 6]], 5)).toStrictEqual([[6, +Infinity]]);
	});

	it('Inverts a multiple ranges considering `start` argument outside of range (more than max)', () => {
		expect(rangesInvert([[-1, 5], [2, 3], [4, 6]], 10)).toStrictEqual([[10, +Infinity]]);
	});

	it('Inverts a multiple ranges considering `end` argument outside of range', () => {
		expect(rangesInvert([[-1, 5], [2, 3], [4, 6]], null, 10)).toStrictEqual([[-Infinity, -1], [6, 10]]);
	});

	it('Inverts a multiple ranges considering `end` argument inside of range', () => {
		expect(rangesInvert([[0, 2], [3, 5]], null, 4)).toStrictEqual([[-Infinity, 0], [2, 3]]);
	});

	it('Inverts a multiple ranges considering `end` argument inside of first range', () => {
		expect(rangesInvert([[0, 2], [3, 5]], null, 1)).toStrictEqual([[-Infinity, 0]]);
	});

	it('Inverts a multiple ranges considering `end` argument outside of range (less than min)', () => {
		expect(rangesInvert([[0, 2], [3, 5]], null, 1)).toStrictEqual([[-Infinity, 0]]);
	});

	it('Inverts a multiple ranges considering `start` and `end` arguments both (inside of range)', () => {
		expect(rangesInvert([[0, 5], [6, 10]], 2, 8)).toStrictEqual([[5, 6]]);
	});

	it('Inverts a multiple ranges considering `start` and `end` arguments both (outside of range)', () => {
		expect(rangesInvert([[0, 5], [6, 10]], -1, 11)).toStrictEqual([[-1, 0], [5, 6], [10, 11]]);
	});

	it('Returns an empty array if there is nothing to invert considering `start` and `end`', () => {
		expect(rangesInvert([[0, 5], [5, 10]], 2, 8)).toStrictEqual([]);
	});

	it('Considers `infinityToNull` argument', () => {
		expect(rangesInvert([[-1, 5], [2, 3], [4, 6]], null, null, true)).toStrictEqual([[null, -1], [6, null]]);
	});
});
