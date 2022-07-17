import { isObject } from './is-object';

describe('is-object', () => {
	it('Returns `true` if a given value is an object', () => {
		expect(isObject({})).toBe(true);
	});

	it('Returns `false` if a given value is object of some type other than `Object`', () => {
		expect(isObject(new Date())).toBe(false);
	});
});
