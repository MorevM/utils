import { isFunction } from './is-function';

const fn = () => ({});
// eslint-disable-next-line func-style
function foo() { return '123'; }
// eslint-disable-next-line @typescript-eslint/no-implied-eval
const bar = new Function();

describe('is-string', () => {
	it('Returns `true` if a given value is a function', () => {
		expect(isFunction(() => {})).toBe(true);
		expect(isFunction(fn)).toBe(true);
		expect(isFunction(foo)).toBe(true);
		expect(isFunction(bar)).toBe(true);
	});

	it('Returns `false` if a given value is not a function', () => {
		expect(isFunction({})).toBe(false);
		expect(isFunction(false)).toBe(false);
		expect(isFunction(true)).toBe(false);
		expect(isFunction(1)).toBe(false);
	});
});
