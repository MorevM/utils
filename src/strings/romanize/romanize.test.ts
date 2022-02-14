import { romanize } from './romanize';

describe('is-email', () => {
	it('Looks like it works', () => {
		expect(romanize(1)).toBe('I');
		expect(romanize(2)).toBe('II');
		expect(romanize(3)).toBe('III');
		expect(romanize(4)).toBe('IV');
		expect(romanize(5)).toBe('V');
		expect(romanize(6)).toBe('VI');
		expect(romanize(10)).toBe('X');
		expect(romanize(20)).toBe('XX');
		expect(romanize(22)).toBe('XXII');
	});
});
