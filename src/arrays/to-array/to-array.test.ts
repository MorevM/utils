import { toArray } from './to-array';

const cb = () => ({});

describe('to-array', () => {
	it('Converts given value to an array', () => {
		expect(toArray(1)).toStrictEqual([1]);
		expect(toArray({ foo: 'bar' })).toStrictEqual([{ foo: 'bar' }]);
		expect(toArray(cb)).toStrictEqual([cb]);
		expect(toArray(undefined)).toStrictEqual([undefined]);
	});

	it('Remains value unchanged if it already an array', () => {
		expect(toArray([1])).toStrictEqual([1]);
		expect(toArray([{ foo: 'bar' }, { baz: 'bar' }])).toStrictEqual([{ foo: 'bar' }, { baz: 'bar' }]);
		expect(toArray([cb, cb])).toStrictEqual([cb, cb]);
		expect(toArray([])).toStrictEqual([]);
	});
});
