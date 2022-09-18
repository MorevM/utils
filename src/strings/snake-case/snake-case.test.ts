import { snakeCase } from './snake-case';

describe('snake-case', () => {
	it('Converts a given string written in kebab-case to snake-case', () => {
		expect(snakeCase('foo-bar')).toBe('foo_bar');
	});

	it('Converts a given string written in camelCase to snake-case', () => {
		expect(snakeCase('fooBar')).toBe('foo_bar');
	});

	it('Converts a given string written in non-strict camelCase to snake-case', () => {
		expect(snakeCase('sectionID')).toBe('section_id');
	});

	it('Converts a given string written in PascalCase to snake-case', () => {
		expect(snakeCase('FooBar')).toBe('foo_bar');
	});

	it('Converts a given string written in dot.case to snake-case', () => {
		expect(snakeCase('foo.bar')).toBe('foo_bar');
	});

	it('Converts a given space-separated string to snake-case', () => {
		expect(snakeCase('foo bar')).toBe('foo_bar');
	});

	it('Converts a given string written in UPPERCASE to lowercase', () => {
		expect(snakeCase('FOOBAR')).toBe('foobar');
	});

	it('Returns a given string written in lowercase as is', () => {
		expect(snakeCase('foobar')).toBe('foobar');
	});

	it('Returns a given string written in snake-case as is', () => {
		expect(snakeCase('foo_bar')).toBe('foo_bar');
	});

	it('Returns empty string as is', () => {
		expect(snakeCase('')).toBe('');
	});
});
