import { isFile } from './is-file';

describe('is-blob', () => {
	it('Returns `true` if a given value is a `File`', () => {
		expect(isFile(new File([], 'test.txt'))).toBe(true);
	});

	it('Returns `false` if a given value is not a string', () => {
		expect(isFile(new Blob())).toBe(false);
		expect(isFile({})).toBe(false);
		expect(isFile(null)).toBe(false);
		expect(isFile(undefined)).toBe(false);
		expect(isFile(1)).toBe(false);
		expect(isFile(0)).toBe(false);
		expect(isFile(new Uint8Array(1))).toBe(false);
		expect(isFile(new Uint16Array(1))).toBe(false);
		expect(isFile(new Uint32Array(1))).toBe(false);
	});
});
