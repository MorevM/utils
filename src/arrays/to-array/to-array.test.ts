import { toArray } from './to-array';

const callback = () => ({});

describe('to-array', () => {
	it('Converts given value to an array', () => {
		expect(toArray(1)).toStrictEqual([1]);
		expect(toArray({ foo: 'bar' })).toStrictEqual([{ foo: 'bar' }]);
		expect(toArray(callback)).toStrictEqual([callback]);
		expect(toArray(undefined)).toStrictEqual([undefined]);
	});

	it('Remains value unchanged if it already an array', () => {
		expect(toArray([1])).toStrictEqual([1]);
		expect(toArray([{ foo: 'bar' }, { baz: 'bar' }])).toStrictEqual([{ foo: 'bar' }, { baz: 'bar' }]);
		expect(toArray([callback, callback])).toStrictEqual([callback, callback]);
		expect(toArray([])).toStrictEqual([]);
	});
});
