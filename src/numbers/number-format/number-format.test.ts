import { numberFormat } from './number-format';

describe('number-format', () => {
	it('Returns the string representation of a given number formatted using given parameters', () => {
		expect(numberFormat(1234.56, 2, '.', ' ')).toBe('1 234.56');
	});

	it('Correctly separates thousands', () => {
		expect(numberFormat(1, 0, '.', ' ')).toBe('1');
		expect(numberFormat(10, 0, '.', ' ')).toBe('10');
		expect(numberFormat(100, 0, '.', ' ')).toBe('100');
		expect(numberFormat(1000, 0, '.', ' ')).toBe('1 000');
		expect(numberFormat(10000, 0, '.', ' ')).toBe('10 000');
		expect(numberFormat(100000, 0, '.', ' ')).toBe('100 000');
		expect(numberFormat(1000000, 0, '.', ' ')).toBe('1 000 000');
	});

	it('Omits fractional part by rounding a given number if `decimals` argument value is `0`', () => {
		expect(numberFormat(1234.12, 0, '.', ' ')).toBe('1 234');
		expect(numberFormat(1234.89, 0, '.', ' ')).toBe('1 235');
	});

	it('Adds fractional part consist of zeros if `decimals` argument value is larger than `0` and a given number is integer', () => {
		expect(numberFormat(1234, 2, '.', ' ')).toBe('1 234.00');
	});

	it('Pads fractional part with zeros if `decimals` argument value is larger than its length', () => {
		expect(numberFormat(1234.5, 2, '.', ' ')).toBe('1 234.50');
	});

	it('Correctly works with string input', () => {
		expect(numberFormat('1000000', 0, '.', ' ')).toBe('1 000 000');
		expect(numberFormat('1000', 2, '.', ' ')).toBe('1 000.00');
		expect(numberFormat('100')).toBe('100');
	});

	it('Treats wrong input as `0`', () => {
		expect(numberFormat('not a number')).toBe('0');
		expect(numberFormat(null)).toBe('0');
		expect(numberFormat(undefined)).toBe('0');
		expect(numberFormat(true)).toBe('0');
		expect(numberFormat('not a number', 2, '.', ' ')).toBe('0.00');
	});
});
