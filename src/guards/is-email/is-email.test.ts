import { isEmail } from './is-email';

describe('is-email', () => {
	it('Returns `false` for any non-string input', () => {
		expect(isEmail(null)).toBe(false);
		expect(isEmail(undefined)).toBe(false);
		expect(isEmail(1)).toBe(false);
		expect(isEmail(true)).toBe(false);
		expect(isEmail({})).toBe(false);
		expect(isEmail([])).toBe(false);
		expect(isEmail(new Date())).toBe(false);
		expect(isEmail(new Set())).toBe(false);
		expect(isEmail(new Map())).toBe(false);
	});

	it('Returns `true` if correct email given', () => {
		expect(isEmail('test@test.te')).toBe(true);
		expect(isEmail('test.test@test.te')).toBe(true);
		expect(isEmail('test@test.test.test')).toBe(true);
	});

	it('Returns `true` if correct cyrillic email given', () => {
		expect(isEmail('тест@россия.рф')).toBe(true);
	});

	it('Returns `false` if incorrect email given', () => {
		expect(isEmail('test@')).toBe(false);
		expect(isEmail('test@test')).toBe(false);
		expect(isEmail('test@test@test.test')).toBe(false);
		expect(isEmail('test@test@test.test')).toBe(false);
	});
});
