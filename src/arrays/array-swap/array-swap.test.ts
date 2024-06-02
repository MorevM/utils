import { arraySwap, arraySwapMutable } from './array-swap';

describe('array-swap', () => {
	it('Does not mutate an original array', () => {
		const original = [0, 1, 2, 4, 5];
		const clone = [...original];
		arraySwap(original, 2, 3);

		expect(original).toStrictEqual(clone);
	});

	it('Mutates the original array using `arraySwapMutable`', () => {
		const original = [0, 1, 2, 4, 5];
		const clone = [...original];
		const swapped = arraySwapMutable(original, 2, 3);

		expect(original).not.toStrictEqual(clone);
		expect(original).toStrictEqual(swapped);
	});

	it('Throws if any swap index is outside the array length', () => {
		expect(() => arraySwap([1, 2, 3], -1, 2)).toThrow('First swap position outside the array range');
		expect(() => arraySwap([1, 2, 3], 1, 3)).toThrow('Second swap position outside the array range');
	});

	it('Throws if the end edge of swap range is lower than the start edge', () => {
		expect(() => arraySwap([1, 2, 3], [1, 0], 2)).toThrow('The end edge of the first position is lower than the start edge');
		expect(() => arraySwap([1, 2, 3], 0, [2, 1])).toThrow('The end edge of the second position is lower than the start edge');
	});

	it('Throws if ranges are crossed', () => {
		expect(() => arraySwap([1, 2, 3, 4], [0, 2], [1, 3])).toThrow('The edges cannot be crossed');
		expect(() => arraySwap([1, 2, 3, 4], [0, 2], [2, 3])).toThrow('The edges cannot be crossed');
	});

	it('Swaps array values using integer positions', () => {
		expect(arraySwap([1, 2], 0, 1)).toStrictEqual([2, 1]);
		expect(arraySwap([1, 2], 1, 0)).toStrictEqual([2, 1]);
		//
		expect(arraySwap([1, 2, 3, 4, 5], 1, 2)).toStrictEqual([1, 3, 2, 4, 5]);
		expect(arraySwap([1, 2, 3, 4, 5], 2, 1)).toStrictEqual([1, 3, 2, 4, 5]);
		//
		expect(arraySwap([1, 2, 3, 4, 5], 0, 4)).toStrictEqual([5, 2, 3, 4, 1]);
		expect(arraySwap([1, 2, 3, 4, 5], 4, 0)).toStrictEqual([5, 2, 3, 4, 1]);
	});

	it('Swaps array values using integer position and the range position', () => {
		expect(arraySwap([1, 2, 3], 0, [1, 2])).toStrictEqual([2, 3, 1]);
		expect(arraySwap([1, 2, 3], [1, 2], 0)).toStrictEqual([2, 3, 1]);
		//
		expect(arraySwap([1, 2, 3, 4, 5], 0, [3, 4])).toStrictEqual([4, 5, 2, 3, 1]);
		expect(arraySwap([1, 2, 3, 4, 5], [3, 4], 0)).toStrictEqual([4, 5, 2, 3, 1]);
		//
		expect(arraySwap([1, 2, 3, 4, 5], 2, [3, 4])).toStrictEqual([1, 2, 4, 5, 3]);
		expect(arraySwap([1, 2, 3, 4, 5], [3, 4], 2)).toStrictEqual([1, 2, 4, 5, 3]);
		//
		expect(arraySwap([1, 2, 3, 4, 5], 0, [1, 4])).toStrictEqual([2, 3, 4, 5, 1]);
		expect(arraySwap([1, 2, 3, 4, 5], 0, [2, 4])).toStrictEqual([3, 4, 5, 2, 1]);
	});

	it('Swaps array values using range positions', () => {
		expect(arraySwap([1, 2, 3, 4], [0, 1], [2, 3])).toStrictEqual([3, 4, 1, 2]);
		expect(arraySwap([1, 2, 3, 4], [2, 3], [0, 1])).toStrictEqual([3, 4, 1, 2]);
		//
		expect(arraySwap([1, 2, 3, 4, 5, 6], [1, 2], [3, 4])).toStrictEqual([1, 4, 5, 2, 3, 6]);
		expect(arraySwap([1, 2, 3, 4, 5, 6], [3, 4], [1, 2])).toStrictEqual([1, 4, 5, 2, 3, 6]);
		//
		expect(arraySwap([1, 2, 3, 4, 5, 6], [0, 2], [3, 5])).toStrictEqual([4, 5, 6, 1, 2, 3]);
		expect(arraySwap([1, 2, 3, 4, 5, 6], [3, 5], [0, 2])).toStrictEqual([4, 5, 6, 1, 2, 3]);
		//
		expect(arraySwap([1, 2, 3, 4, 5, 6], [0, 1], [2, 5])).toStrictEqual([3, 4, 5, 6, 1, 2]);
	});
});
