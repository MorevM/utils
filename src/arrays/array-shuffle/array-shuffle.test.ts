import { arrayShuffle } from './array-shuffle';

describe('array-shuffle', () => {
	it('Returns the shuffled array', () => {
		expect(arrayShuffle([1, 2, 3, 4])).not.toStrictEqual([1, 2, 3, 4]);
		expect(arrayShuffle([1, 2])).not.toStrictEqual([1, 2]);
	});

	it('Returns array as is if it contains single element', () => {
		expect(arrayShuffle([1])).toStrictEqual([1]);
	});

	it('Returns empty array if empty array given', () => {
		expect(arrayShuffle([])).toStrictEqual([]);
	});
});
