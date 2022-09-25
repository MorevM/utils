import { rangesCrop } from './ranges-crop';

describe('ranges-crop', () => {
	it(`Doesn't mutate the original array`, () => {
		const original = [[1, 2], [0, 1]] as Array<[number, number]>;
		const clone = [...original];
		rangesCrop(original, 10, 20);

		expect(original).toStrictEqual(clone);
	});

	it(`Returns an empty array for empty input`, () => {
		expect(rangesCrop([])).toStrictEqual([]);
	});

	it(`Returns an empty array for invalid input`, () => {
		expect(rangesCrop(undefined)).toStrictEqual([]);
		expect(rangesCrop(null)).toStrictEqual([]);
	});

	it('Crops nothing with no options', () => {
		expect(rangesCrop([[0, 5], [5, 10]])).toStrictEqual([[0, 10]]);
	});

	it('Crops nothing if the range\'s mimimum value is greater than `start`', () => {
		expect(rangesCrop([[0, 5], [5, 10]], -10)).toStrictEqual([[0, 10]]);
	});

	it('Crops nothing if the range\'s maximum value is less than `end`', () => {
		expect(rangesCrop([[0, 5], [5, 10]], null, 20)).toStrictEqual([[0, 10]]);
	});

	it('Crops single resulting range by `start`', () => {
		expect(rangesCrop([[0, 5], [5, 10]], 2)).toStrictEqual([[2, 10]]);
	});

	it('Crops multiple resulting ranges by `start`', () => {
		expect(rangesCrop([[0, 4], [5, 10]], 2)).toStrictEqual([[2, 4], [5, 10]]);
	});

	it('Crops ranges by `start` if they overlap', () => {
		expect(rangesCrop([[0, 5], [4, 10]], 3)).toStrictEqual([[3, 10]]);
	});

	it('Returns an empty array if `start` value is greater than maximum value of any range', () => {
		expect(rangesCrop([[0, 5], [4, 10]], 20)).toStrictEqual([]);
	});

	it('Crops single resulting range by `end`', () => {
		expect(rangesCrop([[0, 5], [5, 10]], null, 8)).toStrictEqual([[0, 8]]);
	});

	it('Crops multiple resulting ranges by `end`', () => {
		expect(rangesCrop([[0, 4], [5, 10]], null, 8)).toStrictEqual([[0, 4], [5, 8]]);
	});

	it('Crops ranges by `end` if they overlap', () => {
		expect(rangesCrop([[0, 5], [4, 10]], null, 8)).toStrictEqual([[0, 8]]);
	});

	it('Returns an empty array if `end` value is less than minimum value of any range', () => {
		expect(rangesCrop([[0, 5], [4, 10]], null, -1)).toStrictEqual([]);
	});

	it('Crops single resulting range by `start` and `end` both', () => {
		expect(rangesCrop([[0, 5], [5, 10]], 2, 8)).toStrictEqual([[2, 8]]);
	});

	it('Crops multiple resulting ranges by `start` and `end` both', () => {
		expect(rangesCrop([[0, 4], [5, 10]], 2, 8)).toStrictEqual([[2, 4], [5, 8]]);
	});

	it('Considers `infinityToNull` argument', () => {
		expect(rangesCrop([[-Infinity, 4], [5, Infinity]], null, null, true)).toStrictEqual([[null, 4], [5, null]]);
	});

	it('Considers `infinityToNull` argument using crop by `end`', () => {
		expect(rangesCrop([[-Infinity, 4], [5, Infinity]], null, 10, true)).toStrictEqual([[null, 4], [5, 10]]);
	});

	it('Considers `infinityToNull` argument using crop by `start`', () => {
		expect(rangesCrop([[-Infinity, 4], [5, Infinity]], -10, null, true)).toStrictEqual([[-10, 4], [5, null]]);
	});
});
