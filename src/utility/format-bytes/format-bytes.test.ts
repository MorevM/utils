import { formatBytes, formatBytesRu } from './format-bytes';

describe('formatBytes', () => {
	it('Considers invalid input as `0`', () => {
		const returnValue = {
			value: 0, valueAsString: '0', unit: 'B', isInteger: true,
		};

		/* @ts-expect-error -- Edge case */
		expect(formatBytes('string')).toMatchObject(returnValue);
		expect(formatBytes(Number.NaN)).toMatchObject(returnValue);
		expect(formatBytes(Infinity)).toMatchObject(returnValue);
		expect(formatBytes(-Infinity)).toMatchObject(returnValue);
	});

	it('Correctly works with default settings', () => {
		expect(formatBytes(999)).toMatchObject({
			value: 999, valueAsString: '999', unit: 'B', isInteger: true,
		});
		expect(formatBytes(1024)).toMatchObject({
			value: 1, valueAsString: '1', unit: 'kB', isInteger: true,
		});
	});

	it('Correctly works with non-default `mode`', () => {
		expect(formatBytes(1000, { mode: 'IEC' })).toMatchObject({
			value: 1000, valueAsString: '1000', unit: 'B', isInteger: true,
		});
		expect(formatBytes(2000, { mode: 'IEC' })).toMatchObject({
			value: 2, valueAsString: '2', unit: 'KiB', isInteger: true,
		});
	});

	it('Respects non-default `precision` and `trimZeros`', () => {
		expect(formatBytes(2100, { precision: 3 })).toMatchObject({
			value: 2.1, valueAsString: '2.1', unit: 'kB', isInteger: false,
		});
		expect(formatBytes(2100, { precision: 3, trimZeros: false })).toMatchObject({
			value: 2.1, valueAsString: '2.100', unit: 'kB', isInteger: false,
		});
		expect(formatBytes(2000, { mode: 'IEC', precision: 3 })).toMatchObject({
			value: 1.953, valueAsString: '1.953', unit: 'KiB', isInteger: false,
		});
	});

	it('Respects custom `toString` function', () => {
		expect(formatBytes(2100, { toString: () => 'foo' }).toString()).toBe('foo');
	});

	it('Correctly implements `toString` method', () => {
		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		// TODO: Fix types for toString
		expect(formatBytes(2100, { precision: 3 }).toString()).toBe('2.1 kB');
	});

	it('Correctly works with non-default `to` value', () => {
		expect(formatBytes(100000, { to: 'b' })).toMatchObject({
			value: 100000, valueAsString: '100000', unit: 'B', isInteger: true,
		});
		expect(formatBytes(100000, { to: 'm' })).toMatchObject({
			value: .1, valueAsString: '0.1', unit: 'MB', isInteger: false,
		});
		expect(formatBytes(100000, { to: 'g', precision: 4 })).toMatchObject({
			value: .0001, valueAsString: '0.0001', unit: 'GB', isInteger: false,
		});
		expect(formatBytes(100000, { to: 'g', precision: 4, mode: 'IEC' })).toMatchObject({
			value: .0001, valueAsString: '0.0001', unit: 'GiB', isInteger: false,
		});
	});

	it('Respects custom units', () => {
		expect(formatBytes(100, { customUnits: { metric: { b: 'foo' } } })).toMatchObject({
			value: 100, valueAsString: '100', unit: 'foo', isInteger: true,
		});

		expect(formatBytes(1000, { customUnits: { metric: { b: 'foo' } } })).toMatchObject({
			value: 1, valueAsString: '1', unit: 'kB', isInteger: true,
		});
	});

	it('Respects Russian units', () => {
		expect(formatBytesRu(100)).toMatchObject({
			value: 100, valueAsString: '100', unit: 'Б', isInteger: true,
		});

		expect(formatBytesRu(1024 * 1024, { mode: 'IEC' })).toMatchObject({
			value: 1, valueAsString: '1', unit: 'Мб', isInteger: true,
		});
	});
});
