import { isString } from './is-string';

describe('is-string', () => {
	it('Returns `true` if a given value is a string', () => {
		expect(isString('foo')).toBe(true);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(isString({})).toBe(false);
	});
});
