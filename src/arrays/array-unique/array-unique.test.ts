import { arrayUnique } from './array-unique';

describe('array-unique', () => {
	it('Returns the array without duplicated values (scalar / literal)', () => {
		expect(arrayUnique([1, 2, 1, 2])).toStrictEqual([1, 2]);
		expect(arrayUnique(['1', '2', 1, 2, '1', 1])).toStrictEqual(['1', '2', 1, 2]);
		expect(arrayUnique([{ foo: 'bar' }, { foo: 'bar' }])).toStrictEqual([{ foo: 'bar' }, { foo: 'bar' }]);
	});

	it('Returns the array without duplicated values (object / array)', () => {
		const obj = { foo: 'bar' };
		const arr = ['foo', 'bar'];

		expect(arrayUnique([obj, arr, obj, arr])).toStrictEqual([obj, arr]);
		expect(arrayUnique([1, obj, arr, '2', obj, arr])).toStrictEqual([1, obj, arr, '2']);
	});

	it('Returns empty array if empty array given', () => {
		expect(arrayUnique([])).toStrictEqual([]);
	});
});
