import { kebabCase } from './kebab-case';

describe('kebab-case', () => {
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

	it('Treat repeating uppercase characters as a single word', () => {
		expect(kebabCase('getID')).toBe('get-id');
	});

	it(`Doesn't put a separator in start of resulting string`, () => {
		expect(kebabCase('22Id', { numbers: true })).toBe('22-id');
	});

	it(`Doesn't treat number as separator with no options`, () => {
		expect(kebabCase('desktop2k')).toBe('desktop2k');
	});

	it('Treats number as separator with `{ numbers: true }`', () => {
		expect(kebabCase('desktop2k', { numbers: true })).toBe('desktop-2k');
	});

	it('Treats uppercase characted after digit as a new word', () => {
		expect(kebabCase('get2Ids', { numbers: true })).toBe('get-2-ids');
	});

	it('Treats repeating digits as single number with `{ numbers: true }`', () => {
		expect(kebabCase('desktop24k', { numbers: true })).toBe('desktop-24k');
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
