import { fileExtension } from './file-extension';

describe('file-extension', () => {
	it('Returns `null` for UNIX-hidden files', () => {
		expect(fileExtension('.htaccess')).toBeNull();
	});

	it('Returns `null` if there is no extension', () => {
		expect(fileExtension('')).toBeNull();
		expect(fileExtension('foo')).toBeNull();
		expect(fileExtension('foo/bar.bar/baz')).toBeNull();
	});

	it('Returns this file extension of filename given', () => {
		expect(fileExtension('foo.js')).toBe('js');
		expect(fileExtension('foo.test.js')).toBe('js');
		expect(fileExtension('foo-bar baz.png')).toBe('png');
		expect(fileExtension('.eslintrc.js')).toBe('js');
	});

	it('Correctly works with full paths', () => {
		expect(fileExtension('/some/foo.js')).toBe('js');
		expect(fileExtension('D://dir.foo/foo.test.js')).toBe('js');
		expect(fileExtension('D:\\dir.foo\foo.test.js')).toBe('js');
	});
});
