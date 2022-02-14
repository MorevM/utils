import { hyphenate } from './hyphenate';

describe('hyphenate', () => {
	it('Converts a given string written in snake_case to kebab-case', () => {
		expect(hyphenate('foo_bar')).toBe('foo-bar');
	});

	it('Converts a given string written in camelCase to kebab-case', () => {
		expect(hyphenate('fooBar')).toBe('foo-bar');
	});

	it('Converts a given string written in PascalCase to kebab-case', () => {
		expect(hyphenate('FooBar')).toBe('foo-bar');
	});

	it('Converts a given string written in dot.case to kebab-case', () => {
		expect(hyphenate('foo.bar')).toBe('foo-bar');
	});

	it('Converts a given space-separated string to kebab-case', () => {
		expect(hyphenate('foo bar')).toBe('foo-bar');
	});

	it('Converts a given string written in UPPERCASE to lowercase', () => {
		expect(hyphenate('FOOBAR')).toBe('foobar');
	});

	it('Returns a given string written in lowercase as is', () => {
		expect(hyphenate('foobar')).toBe('foobar');
	});

	it('Returns a given string written in kebab-case as is', () => {
		expect(hyphenate('foo-bar')).toBe('foo-bar');
	});

	it('Returns empty string as is', () => {
		expect(hyphenate('')).toBe('');
	});
});
