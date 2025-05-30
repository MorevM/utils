import { arrayRotate, arrayRotateMutable } from './array-rotate';

describe('array-rotate', () => {
	const testArray = [1, 2, 3, 4];

	it('Does not mutate the original array', () => {
		const arr = [...testArray];
		arrayRotate(arr, 1);

		expect(arr).toStrictEqual(testArray);
	});

	it('Correctly rotates array by positive offset', () => {
		expect(arrayRotate(testArray, 1)).toStrictEqual([2, 3, 4, 1]);
		expect(arrayRotate(testArray, 2)).toStrictEqual([3, 4, 1, 2]);
		expect(arrayRotate(testArray, 3)).toStrictEqual([4, 1, 2, 3]);
		expect(arrayRotate(testArray, 4)).toStrictEqual([1, 2, 3, 4]);
	});

	it('Correctly rotates array by negative offset', () => {
		expect(arrayRotate(testArray, -1)).toStrictEqual([4, 1, 2, 3]);
		expect(arrayRotate(testArray, -2)).toStrictEqual([3, 4, 1, 2]);
		expect(arrayRotate(testArray, -3)).toStrictEqual([2, 3, 4, 1]);
		expect(arrayRotate(testArray, -4)).toStrictEqual([1, 2, 3, 4]);
	});

	it('Correctly handles offset greater than array length', () => {
		expect(arrayRotate(testArray, 5)).toStrictEqual([2, 3, 4, 1]);
		expect(arrayRotate(testArray, 6)).toStrictEqual([3, 4, 1, 2]);
		expect(arrayRotate(testArray, -5)).toStrictEqual([4, 1, 2, 3]);
		expect(arrayRotate(testArray, -6)).toStrictEqual([3, 4, 1, 2]);
	});

	it('Returns empty array if empty array given', () => {
		expect(arrayRotate([], 1)).toStrictEqual([]);
		expect(arrayRotate([], -1)).toStrictEqual([]);
	});
});

describe('array-rotate-mutable', () => {
	it('Mutates the original array', () => {
		const arr = [1, 2, 3, 4];
		const result = arrayRotateMutable(arr, 1);

		expect(arr).toStrictEqual([2, 3, 4, 1]);
		expect(result).toBe(arr);
	});

	it('Returns the original array if empty array given', () => {
		const arr: number[] = [];

		expect(arrayRotateMutable(arr, 1)).toBe(arr);
	});
});
