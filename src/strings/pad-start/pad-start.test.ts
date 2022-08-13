import { padStart } from './pad-start';

describe('pad-start', () => {
	it('Correctly fills the resulting string using mixed type of first argument', () => {
		expect(padStart(1, 3, '0')).toBe('001');
		expect(padStart('1', 4, 'xx')).toBe('xxx1');
		expect(padStart(.5, 4, '0')).toBe('00.5');
		expect(padStart(100, 3, '0')).toBe('100');
	});

	it('Uses default settings if single argument is passed', () => {
		expect(padStart(1)).toBe('01');
		expect(padStart(10)).toBe('10');
		expect(padStart(100)).toBe('100');
	});
});
