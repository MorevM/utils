import { precision } from './precision';

describe('precision', () => {
	it('Calculates the number precision', () => {
		expect(precision(.1)).toBe(1);
		expect(precision(1)).toBe(0);
		expect(precision(1.)).toBe(0);
		expect(precision(1.1)).toBe(1);
		expect(precision(1.11)).toBe(2);
		expect(precision(1.111)).toBe(3);
		expect(precision(1.110519940000000)).toBe(8);
	});

	it('Calculates the precision of numeric string', () => {
		expect(precision('1')).toBe(0);
		expect(precision('1.')).toBe(0);
		expect(precision('1.1')).toBe(1);
		expect(precision('+123.123')).toBe(3);
		expect(precision('-123.123')).toBe(3);
	});

	it('Returns `null` for any invalid input', () => {
		expect(precision('wow')).toBeNull();
		expect(precision('123.1w23')).toBeNull();
		expect(precision('--123.123')).toBeNull();
		expect(precision(null)).toBeNull();
		expect(precision(undefined)).toBeNull();
	});
});
