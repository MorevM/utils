import { quote } from './quote';

describe('quote', () => {
	it('Returns empty quotes for empty string', () => {
		expect(quote('')).toBe('""');
	});

	it('Returns empty quotes for empty string with non-default char', () => {
		expect(quote('', "'")).toBe("''");
	});

	it('Returns quoted string with default char', () => {
		expect(quote('test')).toBe('"test"');
	});

	it('Returns quoted string with non-default char', () => {
		expect(quote('test', "'")).toBe("'test'");
	});
});
