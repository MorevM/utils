import { padEnd } from './pad-end';

describe('pad-end', () => {
	it('Correctly fills the resulting string using mixed type of first argument', () => {
		expect(padEnd(1, 3, '0')).toBe('100');
		expect(padEnd('1', 4, 'xx')).toBe('1xxx');
		expect(padEnd(.5, 4, '0')).toBe('0.50');
		expect(padEnd(100, 3, 'x')).toBe('100');
	});

	it('Uses default `fillString` if last argument is omitted', () => {
		expect(padEnd(1, 2)).toBe('1 ');
		expect(padEnd(10, 2)).toBe('10');
		expect(padEnd(100, 4)).toBe('100 ');
	});
});
