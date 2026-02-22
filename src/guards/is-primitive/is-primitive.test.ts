import { isPrimitive } from './is-primitive';

/* @ts-expect-error -- Edge case */
// eslint-disable-next-line @typescript-eslint/no-unused-private-class-members
class Foo { private readonly foo: string; }

// eslint-disable-next-line func-style, @typescript-eslint/no-empty-function
function fn() {}
const arrowFn = () => {};

describe('is-primitive', () => {
	it('Returns `true` if a given value is a primitive', () => {
		expect(isPrimitive(1)).toBe(true);
		expect(isPrimitive(Infinity)).toBe(true);
		expect(isPrimitive(-Infinity)).toBe(true);
		expect(isPrimitive(Number(1))).toBe(true);
		expect(isPrimitive(NaN)).toBe(true);

		expect(isPrimitive(10n)).toBe(true);
		// eslint-disable-next-line unicorn/prefer-bigint-literals -- Important to test different format
		expect(isPrimitive(BigInt(1))).toBe(true);

		expect(isPrimitive('string')).toBe(true);
		expect(isPrimitive(String('string'))).toBe(true);

		expect(isPrimitive(false)).toBe(true);
		expect(isPrimitive(Boolean(false))).toBe(true);

		expect(isPrimitive(Symbol('q'))).toBe(true);

		expect(isPrimitive(null)).toBe(true);
		expect(isPrimitive(undefined)).toBe(true);
	});

	it('Returns `false` if a given value is not a primitive', () => {
		expect(isPrimitive({})).toBe(false);
		expect(isPrimitive([])).toBe(false);
		expect(isPrimitive(Foo)).toBe(false);
		expect(isPrimitive(new Foo())).toBe(false);

		/* eslint-disable no-new-wrappers, unicorn/new-for-builtins */
		expect(isPrimitive(new Number(1))).toBe(false);
		expect(isPrimitive(new String('123'))).toBe(false);
		expect(isPrimitive(new Boolean('123'))).toBe(false);

		// eslint-disable-next-line no-object-constructor
		expect(isPrimitive(new Object())).toBe(false);
		expect(isPrimitive(new Array(15))).toBe(false);
		expect(isPrimitive(fn)).toBe(false);
		expect(isPrimitive(arrowFn)).toBe(false);
		expect(isPrimitive(() => {})).toBe(false);
		expect(isPrimitive(/foo/g)).toBe(false);
		expect(isPrimitive(new Date())).toBe(false);
		/* eslint-enable no-new-wrappers, unicorn/new-for-builtins */
	});
});
