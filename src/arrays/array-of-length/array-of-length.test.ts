import { arrayOfLength } from './array-of-length';

describe('array-of-length', () => {
	it('Returns an array with a given length filled with `undefined` by default', () => {
		expect(arrayOfLength(3)).toStrictEqual([undefined, undefined, undefined]);
	});

	it('Uses the map function if it passed', () => {
		expect(arrayOfLength(3, (index) => index + 1)).toStrictEqual([1, 2, 3]);
	});

	it('Returns an empty array if a given length is incorrect', () => {
		expect(arrayOfLength(0)).toStrictEqual([]);
		expect(arrayOfLength(.5)).toStrictEqual([]);
		expect(arrayOfLength(-1)).toStrictEqual([]);
		/* @ts-expect-error -- Edge case */
		expect(arrayOfLength('123')).toStrictEqual([]);
		/* @ts-expect-error -- Edge case */
		expect(arrayOfLength(true)).toStrictEqual([]);
		/* @ts-expect-error -- Edge case */
		expect(arrayOfLength([10, 11, 12])).toStrictEqual([]);
	});
});
