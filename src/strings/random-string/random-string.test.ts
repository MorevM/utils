import { randomString } from './random-string';

describe('random-string', () => {
	it('Returns the random string of a given length', () => {
		expect(randomString(10, false)).toHaveLength(10);
		expect(randomString(100, false)).toHaveLength(100);
	});

	it('Returns the random string of a given length which first character is latin if `startWithLatin` argument value is `true`', () => {
		expect(randomString(10, true)).toMatch(/^[a-z]/);
	});
});
