import { kebabCase } from './kebab-case';

describe('kebabCase', () => {
	it('Converts a given string written in snake_case to kebab-case', () => {
		expect(kebabCase('foo_bar')).toBe('foo-bar');
	});

	it('Converts a given string written in camelCase to kebab-case', () => {
		expect(kebabCase('fooBar')).toBe('foo-bar');
	});

	it('Converts a given string written in PascalCase to kebab-case', () => {
		expect(kebabCase('FooBar')).toBe('foo-bar');
	});

	it('Converts a given string written in dot.case to kebab-case', () => {
		expect(kebabCase('foo.bar')).toBe('foo-bar');
	});

	it('Converts a given space-separated string to kebab-case', () => {
		expect(kebabCase('foo bar')).toBe('foo-bar');
	});

	it('Converts a given string written in UPPERCASE to lowercase', () => {
		expect(kebabCase('FOOBAR')).toBe('foobar');
	});

	it('Returns a given string written in lowercase as is', () => {
		expect(kebabCase('foobar')).toBe('foobar');
	});

	it('Returns a given string written in kebab-case as is', () => {
		expect(kebabCase('foo-bar')).toBe('foo-bar');
	});

	it('Returns empty string as is', () => {
		expect(kebabCase('')).toBe('');
	});
});
