import { escapeRegExp } from './escape-reg-exp';

describe('escape-reg-exp', () => {
	const escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\';
	const unescaped = '^$.*+?()[]{}|\\';

	it('Escapes the RegExp special characters', () => {
		expect(escapeRegExp(unescaped)).toBe(escaped);
	});

	it('Does nothing if string doesn\'t contain any special `RegExp` characters', () => {
		expect(escapeRegExp('foo')).toBe('foo');
	});

	it('Returns empty string for any falsy input', () => {
		expect(escapeRegExp('')).toBe('');
		expect(escapeRegExp(null)).toBe('');
		expect(escapeRegExp(undefined)).toBe('');
	});
});
