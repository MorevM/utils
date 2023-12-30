import { isUndefined } from './is-undefined';

describe('is-undefined', () => {
	it('Returns `true` if a given value is `undefined`', () => {
		expect(isUndefined(undefined)).toBe(true);
	});

	it('Returns `false` if a given value is not `undefined`', () => {
		expect(isUndefined(false)).toBe(false);
		expect(isUndefined(NaN)).toBe(false);
		expect(isUndefined(0)).toBe(false);
		expect(isUndefined({})).toBe(false);
		expect(isUndefined('undefined')).toBe(false);
		expect(isUndefined(0n)).toBe(false);
		expect(isUndefined([])).toBe(false);
		expect(isUndefined(() => {})).toBe(false);
	});
});
