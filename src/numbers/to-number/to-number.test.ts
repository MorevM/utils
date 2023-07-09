import { toNumber } from './to-number';

describe('to-number', () => {
	it('Returns a real numbers as is', () => {
		expect(toNumber(0)).toBe(0);
		expect(toNumber(-0)).toBe(-0);
		expect(toNumber(-Infinity)).toBe(-Infinity);
		expect(toNumber(+Infinity)).toBe(+Infinity);
		expect(toNumber(1.11)).toBe(1.11);
		expect(toNumber(Math.PI)).toBe(Math.PI);
	});

	it('Converts given number in string form to a real number', () => {
		expect(toNumber('123')).toBe(123);
		expect(toNumber('123.123')).toBe(123.123);
		expect(toNumber('    -123     ')).toBe(-123);
		expect(toNumber('    +123.12  ')).toBe(123.12);
		expect(toNumber('    +123.12  ')).toBe(123.12);
	});

	it('Throws if it\'s impossible to cast to a number and no fallback value is provided', () => {
		expect(() => toNumber('!')).toThrow();
		expect(() => toNumber(['123'])).toThrow();
		expect(() => toNumber(NaN)).toThrow();
		expect(() => toNumber(null)).toThrow();
		expect(() => toNumber(undefined)).toThrow();
		expect(() => toNumber({})).toThrow();
		expect(() => toNumber(true)).toThrow();
		expect(() => toNumber(false)).toThrow();
		expect(() => toNumber(Symbol('foo'))).toThrow();
		expect(() => toNumber(new Date())).toThrow();
	});

	it('Returns the fallback value if specified and cast to a number was unsuccessful', () => {
		expect(toNumber('!', 0)).toBe(0);
		expect(toNumber(['123'], [])).toStrictEqual([]);
		expect(toNumber(null, 'foo')).toBe('foo');
		expect(toNumber(undefined, true)).toBe(true);
		expect(toNumber({}, undefined)).toBeUndefined();
	});
});
