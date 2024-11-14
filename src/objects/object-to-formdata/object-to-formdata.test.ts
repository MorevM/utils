import { objectToFormdata } from './object-to-formdata';

const formDataAppend = global.FormData.prototype.append;

describe('object-to-formdata', () => {
	beforeEach(() => { vi.spyOn(global.FormData.prototype, 'append').mockImplementation(formDataAppend); });

	afterEach(() => { vi.restoreAllMocks(); });

	describe('Default options', () => {
		it('Skips over `undefined` values', () => {
			const formData = objectToFormdata({ a: undefined });

			expect(formData.append).not.toHaveBeenCalled();
			expect(formData.get('a')).toBeNull();
		});

		it('Skips only `undefined` values', () => {
			const formData = objectToFormdata({ a: undefined, b: 'undefined' });

			expect(formData.append).toHaveBeenCalledTimes(1);
			expect(formData.get('a')).toBeNull();
			expect(formData.get('b')).toBe('undefined');
		});

		it('Skips over `null` values', () => {
			const formData = objectToFormdata({ a: null });

			expect(formData.append).not.toHaveBeenCalled();
			expect(formData.get('a')).toBeNull();
		});

		it('Skips only `null` values', () => {
			const formData = objectToFormdata({ a: null, b: 1 });

			expect(formData.append).toHaveBeenCalledTimes(1);
			expect(formData.get('a')).toBeNull();
			expect(formData.get('b')).toBe('1');
		});

		it('Preserves booleans in string representation', () => {
			const formData = objectToFormdata({ a: true, b: false });

			expect(formData.append).toHaveBeenCalledTimes(2);
			expect(formData.get('a')).toBe('true');
			expect(formData.get('b')).toBe('false');
		});

		it('Skips over empty arrays', () => {
			const formData = objectToFormdata({ a: [] });

			expect(formData.append).not.toHaveBeenCalled();
			expect(formData.get('a')).toBeNull();
		});

		it('Skips only empty arrays', () => {
			const formData = objectToFormdata({ a: [], b: [1, 2], c: 3 });

			expect(formData.append).toHaveBeenCalledWith('b[]', '1');
			expect(formData.append).toHaveBeenCalledWith('b[]', '2');
			expect(formData.append).toHaveBeenCalledWith('c', '3');
			expect(formData.get('a')).toBeNull();
			expect(formData.getAll('b[]')).toStrictEqual(['1', '2']);
			expect(formData.get('c')).toBe('3');
		});

		it('Does not use indices for arrays', () => {
			const formData = objectToFormdata({ b: [1, 2] });

			expect(formData.append).toHaveBeenCalledTimes(2);
			expect(formData.append).toHaveBeenCalledWith('b[]', '1');
			expect(formData.append).toHaveBeenCalledWith('b[]', '2');
			expect(formData.getAll('b[]')).toStrictEqual(['1', '2']);
		});

		it('Appends brackets for arrays', () => {
			const formData = objectToFormdata({ b: [1, 2] });

			expect(formData.append).toHaveBeenCalledTimes(2);
			expect(formData.append).toHaveBeenCalledWith('b[]', '1');
			expect(formData.append).toHaveBeenCalledWith('b[]', '2');
			expect(formData.getAll('b[]')).toStrictEqual(['1', '2']);
		});

		it('Uses brackets as object notation', () => {
			const formData = objectToFormdata({ b: { a: 1, b: [1, 2] } });

			expect(formData.append).toHaveBeenCalledTimes(3);
			expect(formData.append).toHaveBeenCalledWith('b[a]', '1');
			expect(formData.append).toHaveBeenCalledWith('b[b][]', '1');
			expect(formData.append).toHaveBeenCalledWith('b[b][]', '2');
			expect(formData.get('b[a]')).toBe('1');
			expect(formData.getAll('b[b][]')).toStrictEqual(['1', '2']);
		});
	});

	describe('Non-default options', () => {
		it('Appends an indices to arrays', () => {
			const formData = objectToFormdata({ a: [1, 2] }, { indices: true });

			expect(formData.append).toHaveBeenCalledTimes(2);
			expect(formData.append).toHaveBeenCalledWith('a[0]', '1');
			expect(formData.append).toHaveBeenCalledWith('a[1]', '2');
			expect(formData.get('a[0]')).toBe('1');
			expect(formData.get('a[1]')).toBe('2');
		});

		it('Preserves `null` values as strings using `preserve-as-string-null` value for `nullValues` option', () => {
			const formData = objectToFormdata({ a: null }, { nullValues: 'preserve-as-string-null' });

			expect(formData.append).toHaveBeenCalledTimes(1);
			expect(formData.append).toHaveBeenCalledWith('a', 'null');
			expect(formData.get('a')).toBe('null');
		});

		it('Preserves `null` values as empty string using `preserve-as-empty-string` value for `nullValues` option', () => {
			const formData = objectToFormdata({ a: null }, { nullValues: 'preserve-as-empty-string' });

			expect(formData.append).toHaveBeenCalledTimes(1);
			expect(formData.append).toHaveBeenCalledWith('a', '');
			expect(formData.get('a')).toBe('');
		});

		it('Preserves booleans as integers using `preserve-as-integers` value for `booleanValues` option', () => {
			const formData = objectToFormdata({ a: true, b: false }, { booleanValues: 'preserve-as-integers' });

			expect(formData.append).toHaveBeenCalledTimes(2);
			expect(formData.get('a')).toBe('1');
			expect(formData.get('b')).toBe('0');
		});

		it('Preserves empty arrays as an empty string using `preserve` value for `emptyArrays` option', () => {
			const formData = objectToFormdata({ a: [] }, { emptyArrays: 'preserve' });

			expect(formData.append).toHaveBeenCalledTimes(1);
			expect(formData.get('a')).toBe('');
		});

		it('Preserves arrays brackets only for file arrays using `append-only-for-files` value for `arraysBrackets` option', () => {
			const file = new File([], '');
			const files = [file, file];
			const notOnlyfiles = [file, file, 1];
			const formData = objectToFormdata({ a: [1, 2], files, notOnlyfiles }, { arrayBrackets: 'append-only-for-files' });

			expect(formData.append).toHaveBeenCalledTimes(7);
			expect(formData.append).toHaveBeenCalledWith('a', '1');
			expect(formData.append).toHaveBeenCalledWith('a', '2');
			expect(formData.append).toHaveBeenCalledWith('files[]', file);
			expect(formData.append).toHaveBeenCalledWith('files[]', file);
			expect(formData.append).toHaveBeenCalledWith('notOnlyfiles', file);
			expect(formData.append).toHaveBeenCalledWith('notOnlyfiles', file);
			expect(formData.append).toHaveBeenCalledWith('notOnlyfiles', '1');
		});

		it('Omits any arrays brackets using `omit` value for `arraysBrackets` option', () => {
			const file = new File([], '');
			const files = [file, file];
			const formData = objectToFormdata({ 'a': [1, 2], files, 'c': { a: 1 }, 'd[]': [1, 2] }, { arrayBrackets: 'omit' });

			expect(formData.append).toHaveBeenCalledTimes(7);
			expect(formData.append).toHaveBeenCalledWith('a', '1');
			expect(formData.append).toHaveBeenCalledWith('a', '2');
			expect(formData.append).toHaveBeenCalledWith('files', file);
			expect(formData.append).toHaveBeenCalledWith('files', file);
			expect(formData.append).toHaveBeenCalledWith('c[a]', '1');
			expect(formData.append).toHaveBeenCalledWith('d', '1');
			expect(formData.append).toHaveBeenCalledWith('d', '2');
		});

		it('Uses dots for object keys `dots` value for `objectKeysNotation` option', () => {
			const formData = objectToFormdata({ a: { a: 1, b: [1, 2] } }, { objectKeysNotation: 'dots' });

			expect(formData.append).toHaveBeenCalledTimes(3);
			expect(formData.append).toHaveBeenCalledWith('a.a', '1');
			expect(formData.append).toHaveBeenCalledWith('a.b[]', '1');
			expect(formData.append).toHaveBeenCalledWith('a.b[]', '2');
		});
	});

	it('Respects given FormData as a third argument', () => {
		const existingFormData = new FormData();
		existingFormData.append('foo', 'bar');

		const formData = objectToFormdata({ a: '1' }, null, existingFormData);

		expect(formData.append).toHaveBeenCalledWith('a', '1');
		expect(formData.get('foo')).toBe('bar');
		expect(formData.get('a')).toBe('1');
	});

	it('Complex test', () => {
		const file = new File([], 'temp.txt');
		const blob = new Blob();
		const date = new Date();
		const formData = objectToFormdata({
			'a': true,
			'b': 1.994,
			'c': 'string',
			'd': {
				a: [1, 2, 3],
				b: {
					a: [file],
					f: null,
					g: undefined,
				},
			},
			'e': '',
			'f': {},
			'g': [[1, 2]],
			'h[]': 1,
			'i[]': [file, 1],
			'j': date,
			'k': file,
			'l': [blob, blob],
		});

		expect(formData.append).toHaveBeenCalledTimes(17);
		expect(formData.append).toHaveBeenCalledWith('a', 'true');
		expect(formData.append).toHaveBeenCalledWith('b', '1.994');
		expect(formData.append).toHaveBeenCalledWith('c', 'string');
		expect(formData.append).toHaveBeenCalledWith('d[a][]', '1');
		expect(formData.append).toHaveBeenCalledWith('d[a][]', '2');
		expect(formData.append).toHaveBeenCalledWith('d[a][]', '3');
		expect(formData.append).toHaveBeenCalledWith('d[b][a][]', file);
		expect(formData.append).toHaveBeenCalledWith('e', '');
		expect(formData.append).toHaveBeenCalledWith('g[][]', '1');
		expect(formData.append).toHaveBeenCalledWith('g[][]', '2');
		expect(formData.append).toHaveBeenCalledWith('h[]', '1');
		expect(formData.append).toHaveBeenCalledWith('i[][]', file);
		expect(formData.append).toHaveBeenCalledWith('i[][]', '1');
		expect(formData.append).toHaveBeenCalledWith('j', date.toISOString());
		expect(formData.append).toHaveBeenCalledWith('k', file);
		expect(formData.append).toHaveBeenCalledWith('l[]', blob);
		expect(formData.append).toHaveBeenCalledWith('l[]', blob);
	});
});
