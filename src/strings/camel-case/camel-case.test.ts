import { camelCase } from './camel-case';

describe('camel-case', () => {
	it('Converts a given string written in snake_case to camelCase', () => {
		expect(camelCase('foo_bar')).toBe('fooBar');
	});

	it('Converts a given string written in kebab-case to camelCase', () => {
		expect(camelCase('foo-bar')).toBe('fooBar');
	});

	it('Converts a given string written in PascalCase to camelCase', () => {
		expect(camelCase('FooBar')).toBe('fooBar');
	});

	it('Converts a given string written in dot.case to camelCase', () => {
		expect(camelCase('foo.bar')).toBe('fooBar');
	});

	it('Converts a given space-separated string to camelCase', () => {
		expect(camelCase('foo bar')).toBe('fooBar');
	});

	it('Converts a given string written in UPPERCASE to lowercase', () => {
		expect(camelCase('FOOBAR')).toBe('foobar');
	});

	it('Returns a given string written in lowercase as is', () => {
		expect(camelCase('foobar')).toBe('foobar');
	});

	it('Returns a given string written in camelCase as is', () => {
		expect(camelCase('fooBar')).toBe('fooBar');
	});

	it('Returns empty string as is', () => {
		expect(camelCase('')).toBe('');
	});
});
