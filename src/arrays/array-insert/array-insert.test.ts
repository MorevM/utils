import { arrayInsert, arrayInsertMutable } from './array-insert';

describe('array-insert', () => {
	const testArray = [1, 3];

	it('Doesn\'t mutate the original array', () => {
		const arr = [1, 2, 3];
		arrayInsert(arr, 1, 'any');

		expect(arr).toStrictEqual([1, 2, 3]);
	});

	it('Correctly inserts an element(s) using non-negative index', () => {
		expect(arrayInsert(testArray, 1, 2)).toStrictEqual([1, 2, 3]);
		expect(arrayInsert(testArray, 0, 0)).toStrictEqual([0, 1, 3]);
		expect(arrayInsert(testArray, 0, 0, 0)).toStrictEqual([0, 0, 1, 3]);
		expect(arrayInsert(testArray, 1, 2, 2)).toStrictEqual([1, 2, 2, 3]);
		expect(arrayInsert(testArray, Infinity, null, null)).toStrictEqual([1, 3, null, null]);
	});

	it('Correctly inserts an element(s) using negative index', () => {
		expect(arrayInsert(testArray, -1, 2)).toStrictEqual([1, 2, 3]);
		expect(arrayInsert(testArray, -0, 0)).toStrictEqual([0, 1, 3]);
		expect(arrayInsert(testArray, -2, 0, 0)).toStrictEqual([0, 0, 1, 3]);
		expect(arrayInsert(testArray, -Infinity, null, null)).toStrictEqual([null, null, 1, 3]);
	});

	it('Returns an array as is with no `items`', () => {
		expect(arrayInsert(testArray, 0)).toStrictEqual(testArray);
	});
});

describe('array-insert-mutable', () => {
	const arr = [1, 2, 3];

	it('Mutates the original array', () => {
		arrayInsertMutable(arr, 999, 4, 5, 6);

		expect(arr).toStrictEqual([1, 2, 3, 4, 5, 6]);
	});
});
