import { capitalize } from './capitalize';

describe('capitalize', () => {
	it('Returns empty string for empty input', () => {
		expect(capitalize('')).toBe('');
	});

	it('Returns string as is if the first char already is capital letter', () => {
		expect(capitalize('Foo')).toBe('Foo');
	});

	it('Returns capitalized string', () => {
		expect(capitalize('some')).toBe('Some');
	});
});
