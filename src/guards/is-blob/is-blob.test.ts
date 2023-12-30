import { isBlob } from './is-blob';

describe('is-blob', () => {
	it('Returns `true` if a given value is a `Blob`', () => {
		expect(isBlob(new Blob())).toBe(true);
		expect(isBlob(new File([], 'test.txt'))).toBe(true);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(isBlob({})).toBe(false);
		expect(isBlob(null)).toBe(false);
		expect(isBlob(undefined)).toBe(false);
		expect(isBlob(1)).toBe(false);
		expect(isBlob(0)).toBe(false);
		expect(isBlob(new Uint8Array(1))).toBe(false);
		expect(isBlob(new Uint16Array(1))).toBe(false);
		expect(isBlob(new Uint32Array(1))).toBe(false);
	});
});
