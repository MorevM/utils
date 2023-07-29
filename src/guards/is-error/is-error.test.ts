import { isError } from './is-error';

class NonStandardError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = 'NonStandardError';
	}
}

describe('is-error', () => {
	it('Returns `false` for any non-error value', () => {
		expect(isError(null)).toBe(false);
		expect(isError(undefined)).toBe(false);
		expect(isError(false)).toBe(false);
		expect(isError(NaN)).toBe(false);
		expect(isError(0)).toBe(false);
		expect(isError(0n)).toBe(false);
		expect(isError('')).toBe(false);
		expect(isError([])).toBe(false);
		expect(isError({})).toBe(false);
		expect(isError(new Map())).toBe(false);
		expect(isError(new Set())).toBe(false);
		expect(isError(document.querySelectorAll('.foo'))).toBe(false);
	});

	it('Returns `true` for standard error', () => {
		expect(isError(new Error('error'))).toBe(true);
	});

	it('Returns `true` for non-standard error', () => {
		expect(isError(new NonStandardError('error'))).toBe(true);
	});
});
