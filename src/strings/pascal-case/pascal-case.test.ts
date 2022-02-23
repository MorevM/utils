import { pascalCase } from './pascal-case';

describe('pascal-case', () => {
	it('Converts a given string written in snake_case to PascalCase', () => {
		expect(pascalCase('foo_bar')).toBe('FooBar');
	});

	it('Converts a given string written in kebab-case to PascalCase', () => {
		expect(pascalCase('foo-bar')).toBe('FooBar');
	});

	it('Converts a given string written in camelCase to PascalCase', () => {
		expect(pascalCase('fooBar')).toBe('FooBar');
	});

	it('Converts a given string written in dot.case to PascalCase', () => {
		expect(pascalCase('foo.bar')).toBe('FooBar');
	});

	it('Converts a given space-separated string to PascalCase', () => {
		expect(pascalCase('foo bar')).toBe('FooBar');
	});

	it('Capitalizes a given string written in UPPERCASE', () => {
		expect(pascalCase('FOOBAR')).toBe('Foobar');
	});

	it('Capitalizes a given string written in lowercase', () => {
		expect(pascalCase('foobar')).toBe('Foobar');
	});

	it('Returns a given string written in PascalCase as is', () => {
		expect(pascalCase('FooBar')).toBe('FooBar');
	});

	it('Returns empty string as is', () => {
		expect(pascalCase('')).toBe('');
	});

	it('Respects non-latin characters', () => {
		expect(pascalCase('приветики-буфетики')).toBe('ПриветикиБуфетики');
		expect(pascalCase('РОЗОВЫЙ_пушистый единорог')).toBe('РозовыйПушистыйЕдинорог');
		expect(
			pascalCase('РОЗОВЫЙ_пушистый единорог', { preserveConsecutiveUppercase: true }),
		).toBe('РОЗОВЫЙПушистыйЕдинорог');
	});
});
