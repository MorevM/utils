import { isInteger as _isInteger } from '../../guards';
import { mergeObjects } from '../../objects';

type Prefix = 'b' | 'k' | 'm' | 'g' | 't' | 'p' | 'e' | 'z' | 'y';
type Mode = 'metric' | 'IEC';

type Options = {
	/**
	 * The needed precision of the return value.
	 *
	 * @default 1
	 */
	precision: number;

	/**
	 * The first character of unit for return value or keyword `auto`. \
	 * 'k' means 'kB' or 'KiB', 'm' means 'mB' or 'MiB' and so on.
	 *
	 * @default 'auto'
	 */
	to: 'auto' | Prefix;

	/**
	 * The base to calculate a value.
	 * `metric` uses powers of ten, `IEC` uses powers of two.
	 *
	 * @default 'metric'
	 */
	mode: Mode;

	/**
	 * Whether to trim trailing zeros for the value (in a string form)
	 */
	trimZeros: boolean;

	/**
	 * An overrides for default  units, will be merged with it. \
	 * Useful for translations.
	 */
	customUnits: {
		[key in Mode]?: Partial<{
			[innerKey in Prefix]: string;
		}>
	};

	/**
	 * Custom formatter for `asString` property of return value, also overrides `.toString` method of object itself.
	 *
	 * @param   value           Calculated value as number
	 * @param   valueAsString   Calculated value as string
	 * @param   unit            Calculated unit name
	 * @param   isInteger       Whether the calculated value is integer number. Mostly used for `i18n` purposes.
	 *
	 * @returns                 String representation of return value
	 */
	toString: (value: number, valueAsString: string, unit: string, isInteger: boolean) => string;
};

type ReferenceEntry = {
	from: number;
	to: number;
	prefix: Prefix;
};

const REFERENCE_TABLE = {
	metric: [
		{ from: 0, to: 1e3, prefix: 'b' },
		{ from: 1e3, to: 1e6, prefix: 'k' },
		{ from: 1e6, to: 1e9, prefix: 'm' },
		{ from: 1e9, to: 1e12, prefix: 'g' },
		{ from: 1e12, to: 1e15, prefix: 't' },
		{ from: 1e15, to: 1e18, prefix: 'p' },
		{ from: 1e18, to: 1e21, prefix: 'e' },
		{ from: 1e21, to: 1e24, prefix: 'z' },
		{ from: 1e24, to: 1e27, prefix: 'y' },
	] as ReferenceEntry[],
	IEC: [
		{ from: 0, to: 1024 ** 1, prefix: 'b' },
		{ from: 1024 ** 1, to: 1024 ** 2, prefix: 'k' },
		{ from: 1024 ** 2, to: 1024 ** 3, prefix: 'm' },
		{ from: 1024 ** 3, to: 1024 ** 4, prefix: 'g' },
		{ from: 1024 ** 4, to: 1024 ** 5, prefix: 't' },
		{ from: 1024 ** 5, to: 1024 ** 6, prefix: 'p' },
		{ from: 1024 ** 6, to: 1024 ** 7, prefix: 'e' },
		{ from: 1024 ** 7, to: 1024 ** 8, prefix: 'z' },
		{ from: 1024 ** 8, to: 1024 ** 9, prefix: 'y' },
	] as ReferenceEntry[],
};

const UNITS_DEFAULTS = {
	metric: {
		b: 'B',
		k: 'kB',
		m: 'MB',
		g: 'GB',
		t: 'TB',
		p: 'PB',
		e: 'EB',
		z: 'ZB',
		y: 'YB',
	},
	IEC: {
		b: 'B',
		k: 'KiB',
		m: 'MiB',
		g: 'GiB',
		t: 'TiB',
		p: 'PiB',
		e: 'EiB',
		z: 'ZiB',
		y: 'YiB',
	},
};

const DEFAULT_OPTIONS = {
	precision: 1,
	to: 'auto',
	trimZeros: true,
	mode: 'metric',
	toString: (value: number, valueAsString: string, unit: string, isInteger: boolean) => `${valueAsString} ${unit}`,
};

const _options = new WeakMap();

class FormatBytes {
	/**
	 * The calculated value.
	 */
	public value: number;

	/**
	 * The calculated value in string form with needed precision.
	 */
	public valueAsString: string;

	/**
	 * Calculated unit of value.
	 */
	public unit: string;

	/**
	 * Whether the value is an integer number. \
	 * Mostly used for `i18n` purposes.
	 */
	public isInteger: boolean;

	public constructor(bytes: number, customOptions?: Partial<Options>) {
		if (!_isInteger(bytes)) bytes = 0;
		const options = mergeObjects(DEFAULT_OPTIONS, customOptions) as Required<Options>;
		_options.set(this, options);

		const referenceTable = REFERENCE_TABLE[options.mode];
		const entry = options.to === 'auto'
			? referenceTable.find(e => bytes >= e.from && bytes < e.to) ?? referenceTable[0]
			: referenceTable.find(i => i.prefix === options.to) ?? referenceTable[0];
		const { from, prefix } = entry;

		const unitsReferenceTable = mergeObjects(UNITS_DEFAULTS, options.customUnits) as typeof UNITS_DEFAULTS;
		const unit = unitsReferenceTable[options.mode][prefix];


		let value = bytes / from;
		value = Number.isFinite(value) ? value : bytes;

		let valueAsString = value.toFixed(options.precision);
		value = parseFloat(valueAsString);

		if (options.trimZeros) {
			value = parseFloat(valueAsString);
			valueAsString = value.toString();
		}

		const isInteger = _isInteger(value);

		this.value = value;
		this.valueAsString = valueAsString;
		this.unit = unit;
		this.isInteger = isInteger;
	}

	public toString() {
		const { value, valueAsString, unit, isInteger } = this;
		const options = _options.get(this);
		return options.toString(value, valueAsString, unit, isInteger);
	}
}

export const formatBytes = (bytes: number, customOptions?: Partial<Options>): FormatBytes =>
	new FormatBytes(bytes, customOptions);

export const formatBytesRu = (bytes: number, _customOptions?: Partial<Options>): FormatBytes => {
	const customOptions = mergeObjects({
		// Not sure actually, it's not reglamented ¯\_(ツ)_/¯
		customUnits: {
			metric: {
				b: 'Б',
				k: 'КБ',
				m: 'МБ',
				g: 'ГБ',
				t: 'ТБ',
				p: 'ПБ',
				e: 'ЕБ',
				z: 'ЗБ',
				y: 'ИБ',
			},
			IEC: {
				b: 'Б',
				k: 'Кб',
				m: 'Мб',
				g: 'Гб',
				t: 'Тб',
				p: 'Пб',
				e: 'Еб',
				z: 'Зб',
				y: 'Иб',
			},
		},
	}, _customOptions);

	return new FormatBytes(bytes, customOptions);
};
