import { isArray } from './is-array';

describe(isArray, () => {
	it('Returns `true` if a given value is an array', () => {
		expect(isArray([])).toBe(true);
	});

	it('Returns `false` if a given value is not an array', () => {
		expect(isArray({})).toBe(false);
	});
});
