import { isPromise } from './is-promise';

const promise = new Promise((res, rej) => res(''));
const asyncFn = async () => 1;

describe('is-promise', () => {
	it('Returns `true` if a given value is a Promise', () => {
		expect(isPromise(promise)).toBe(true);
		expect(isPromise(asyncFn())).toBe(true);
		expect(isPromise(Promise.resolve(1))).toBe(true);
	});

	it('Returns `false` if a given value is not a Promise', () => {
		expect(isPromise({})).toBe(false);
		expect(isPromise(async () => ({}))).toBe(false);
		expect(isPromise(true)).toBe(false);
	});
});
