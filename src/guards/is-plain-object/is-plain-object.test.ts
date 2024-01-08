import { runInNewContext } from 'node:vm';
import { isPlainObject } from './is-plain-object';

class Foo {
	private readonly x: any;

	public constructor(x: any) {
		this.x = x;
	}
}

describe('is-plain-object', () => {
	it('Returns `true` if a given value is a plain object', () => {
		expect(isPlainObject({})).toBe(true);
		expect(isPlainObject({ foo: 'bar' })).toBe(true);
		expect(isPlainObject({ valueOf: 'foo' })).toBe(true);
		expect(isPlainObject({ constructor: Foo })).toBe(true);
		expect(isPlainObject(new Object({}))).toBe(true);
		expect(isPlainObject(Object.create(null))).toBe(true);
		expect(isPlainObject(runInNewContext('({})'))).toBe(true);
	});

	it('Returns `false` if a given value is not a plain object', () => {
		expect(isPlainObject([])).toBe(false);
		expect(isPlainObject(null)).toBe(false);
		expect(isPlainObject(undefined)).toBe(false);
		expect(isPlainObject(() => {})).toBe(false);
		expect(isPlainObject(Object.create({}))).toBe(false);
		expect(isPlainObject(Number(10))).toBe(false);
		expect(isPlainObject(String('foo'))).toBe(false);
	});
});
