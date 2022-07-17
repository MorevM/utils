import { isRegExp } from './is-reg-exp';

describe('is-reg-exp', () => {
	it('Returns `true` if a given value is a `RegExp` object', () => {
		expect(isRegExp(new RegExp('\\w+'))).toBe(true);
	});

	it('Returns `false` if a given value is not a `RegExp` object', () => {
		expect(isRegExp({})).toBe(false);
	});
});
