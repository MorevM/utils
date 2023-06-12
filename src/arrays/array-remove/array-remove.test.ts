import { arrayRemove, arrayRemoveMutable } from './array-remove';

describe('array-remove', () => {
	const testArray = [1, 2, 3, 1, 2, 3];

	it('Doesn\'t mutate the original array', () => {
		const arr = [1, 2, 3];
		arrayRemove(arr, 1);

		expect(arr).toStrictEqual([1, 2, 3]);
	});

	it('Returns the original array as is if there is nothing to remove `items`', () => {
		expect(arrayRemove(testArray, 0)).toStrictEqual(testArray);
	});

	it('Correctly removes an element(s) using default `onlyFirst` setting (false)', () => {
		expect(arrayRemove(testArray, 1)).toStrictEqual([2, 3, 2, 3]);
		expect(arrayRemove(testArray, 2)).toStrictEqual([1, 3, 1, 3]);
		expect(arrayRemove(testArray, 3)).toStrictEqual([1, 2, 1, 2]);
		expect(arrayRemove(testArray, 4)).toStrictEqual([1, 2, 3, 1, 2, 3]);
	});

	it('Removes the only first element using default `onlyFirst` setting (true)', () => {
		expect(arrayRemove(testArray, 1, true)).toStrictEqual([2, 3, 1, 2, 3]);
		expect(arrayRemove(testArray, 2, true)).toStrictEqual([1, 3, 1, 2, 3]);
		expect(arrayRemove(testArray, 0, true)).toStrictEqual([1, 2, 3, 1, 2, 3]);
	});
});

describe('array-remove-mutable', () => {
	it('Mutates the original array (`onlyFirst` is `false`)', () => {
		const arr = [1, 2, 3, 1, 2, 3];
		arrayRemoveMutable(arr, 1);

		expect(arr).toStrictEqual([2, 3, 2, 3]);
	});

	it('Mutates the original array (`onlyFirst` is `true`)', () => {
		const arr = [1, 2, 3, 1, 2, 3];
		arrayRemoveMutable(arr, 1, true);

		expect(arr).toStrictEqual([2, 3, 1, 2, 3]);
	});
});
