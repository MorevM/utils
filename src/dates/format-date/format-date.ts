/* eslint-disable jsdoc/no-multi-asterisks */
import { toArray } from '../../arrays';
import { mergeObjects } from '../../objects';
import type { Arrayable } from '../../types';
import { toDate } from '../to-date/to-date';
import { prefixedDateMethodsFactory } from '../utils';
import type { Input, LocaleObject, Options } from './format-date.types';
import { FORMAT_DATE_LOCALE_EN, FORMAT_DATE_LOCALE_RU } from './format-date.locales';
import { ORDERED_DAY_INDICES, TOKEN, pad } from './format-date.utils';

const _formatDate = (pattern: string, locales: LocaleObject[], input: Input, options: Options) => {
	const { utc, locale } = options;

	const date = toDate(input);
	if (!date) return null;

	const $i18n = locales.find(({ name }) => name === locale)?.values;
	if (!$i18n) {
		throw new Error(`The locale object for locale \`${locale}\` does not exists.`);
	}

	const localized = (
		entity: 'month' | 'day',
		type: 'abbreviated' | 'wide',
		variant: 'standalone' | 'format',
		index: number,
	) => {
		const _type = toArray($i18n[`${entity}Names`][type][index]);

		return variant === 'standalone'
			? _type[0]
			: _type[1] ?? _type[0];
	};

	const get = prefixedDateMethodsFactory('get', utc);

	const day = () => date[get('Date')]();
	const weekday = () => date[get('Day')]();
	const month = () => date[get('Month')]();
	const year = () => date[get('FullYear')]();
	const hours = () => date[get('Hours')]();
	const minutes = () => date[get('Minutes')]();
	const seconds = () => date[get('Seconds')]();

	const weekdayIndex = () => {
		const offset = weekday() - $i18n.firstDayOfWeekIndex;
		return ORDERED_DAY_INDICES.at(offset)! + 1;
	};

	const timezone = (format: 'minimal' | 'basic' | 'extended') => {
		const offset = utc ? 0 : date.getTimezoneOffset();
		if (offset === 0) return 'Z';

		const sign = offset < 0 ? '+' : '-';
		const offsetHours = Math.floor(Math.abs(offset) / 60);
		const offsetMinutes = Math.abs(offset) - offsetHours * 60;

		const joinCharacter = ['basic', 'minimal'].includes(format) ? '' : ':';
		const filterer = format === 'minimal'
			? (value: number) => value !== 0
			: (value: number) => true;

		const time = [offsetHours, offsetMinutes]
			.filter((value) => filterer(value))
			.map((part) => pad(part))
			.join(joinCharacter);

		return `${sign}${time}`;
	};

	const matchers = {
		// Year
		yy: () => year().toString().slice(-2),
		yyyy: () => pad(year(), 4),
		// Month (standalone)
		L: () => month() + 1,
		LL: () => pad(month() + 1),
		LLL: () => localized('month', 'abbreviated', 'standalone', month()),
		_LLL: () => localized('month', 'abbreviated', 'standalone', month()).toLocaleLowerCase(),
		LLLL: () => localized('month', 'wide', 'standalone', month()),
		_LLLL: () => localized('month', 'wide', 'standalone', month()).toLocaleLowerCase(),
		// Month (format)
		M: () => month() + 1,
		MM: () => pad(month() + 1),
		MMM: () => localized('month', 'abbreviated', 'format', month()),
		_MMM: () => localized('month', 'abbreviated', 'format', month()).toLocaleLowerCase(),
		MMMM: () => localized('month', 'wide', 'format', month()),
		_MMMM: () => localized('month', 'wide', 'format', month()).toLocaleLowerCase(),
		// Weekday (standalone)
		c: () => weekdayIndex(),
		cc: () => pad(weekdayIndex()),
		ccc: () => localized('day', 'abbreviated', 'standalone', weekday()),
		_ccc: () => localized('day', 'abbreviated', 'standalone', weekday()).toLocaleLowerCase(),
		cccc: () => localized('day', 'wide', 'standalone', weekday()),
		_cccc: () => localized('day', 'wide', 'standalone', weekday()).toLocaleLowerCase(),
		// Weekday (format)
		e: () => weekdayIndex(),
		ee: () => pad(weekdayIndex()),
		eee: () => localized('day', 'abbreviated', 'format', weekday()),
		_eee: () => localized('day', 'abbreviated', 'format', weekday()).toLocaleLowerCase(),
		eeee: () => localized('day', 'wide', 'format', weekday()),
		_eeee: () => localized('day', 'wide', 'format', weekday()).toLocaleLowerCase(),
		// Day
		d: () => day(),
		dd: () => pad(day()),
		// Hours
		h: () => (hours() % 12) || 12,
		hh: () => pad((hours() % 12) || 12),
		H: () => hours(),
		HH: () => pad(hours()),
		// Minutes
		m: () => minutes(),
		mm: () => pad(minutes()),
		// Seconds
		s: () => seconds(),
		ss: () => pad(seconds()),
		// Timezone as JS-compatible string
		X: () => timezone('minimal'),
		XX: () => timezone('basic'),
		XXX: () => timezone('extended'),
	};

	return pattern.replaceAll(TOKEN, (match) => {
		if (match in matchers) {
			/* @ts-expect-error -- No way to type */
			return matchers[match]();
		}

		return match.slice(1, -1);
	});
};

/**
 * Creates a date format function.
 *
 * @param   localeData       Locale data.
 * @param   defaultOptions   An options passed to format function as defaults.
 *
 * @returns                  Date format function with defined locales.
 */
export const createFormatDate = (localeData: Arrayable<LocaleObject>, defaultOptions: Options) => {
	/**
	 * Formats a given Date, timestamp or a date in string form (can be represented as ISO, in Russin or British notation)
	 * according to a given pattern.
	 *
	 * @see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 *
	 * @param   pattern   A pattern to format the date with. \
	 *                    The list of tokens is taken from https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table, but is incomplete.
	 *
	 *                    To preserve the string as it is, enclose it in square brackets, e.g. `formatDate('[The date is] MM/dd/yyyy')`
	 *
	 *                    **Available tokens (summary)**:
	 *                    * `year`: `yy`, `yyyy`
	 *                    * `month (standalone)`: `L`, `LL`, `LLL`, `LLLL`, `_LLL`, `_LLLL`
	 *                    * `month (format)`: `M`, `MM`, `MMM`, `MMMM`, `_MMM`, `_MMMM`
	 *                    * `weekday (standalone)`: `c`, `cc`, `ccc`, `cccc`, `_ccc`, `_cccc`
	 *                    * `weekday (format)`: `e`, `ee`, `eee`, `eeee`, `_eee`, `_eeee`
	 *                    * `day`: `d`, `dd`
	 *                    * `hours`: `h`, `hh`, `H`, `HH`
	 *                    * `minutes`: `m`, `mm`
	 *                    * `seconds`: `s`, `ss`
	 *                    * `timezone`: `X`, `XX`, `XXX`
	 *
	 *                    **Available tokens (in details)**:
	 *                    * `-- Year -- `
	 *                    * `yy` - last two digits of the year, e.g. "14" for "2014", "94" for "1994", etc
	 *                    * `yyyy` - full year, e.g. "2014" or "2014"
	 *
	 *                    * `-- Month (standalone style) -- `
	 *                    * `L` - standalone numeric month (stated with 1) with minimal required digits, e.g. "1", "12"
	 *                    * `LL` - standalone padded numeric month (stated with 1), e.g. "01", "12"
	 *                    * `LLL` - standalone abbreviated month name, e.g. "Jan", "Aug"
	 *                    * `_LLL` - lowercased standalone abbreviated month name, e.g. "jan", "aug"
	 *                    * `LLLL` - standalone wide month name, e.g. "January", "August"
	 *                    * `_LLLL` - lowercased standalone abbreviated month name, e.g. "january", "august"
	 *
	 *                    * `-- Month (format style) -- `
	 *                    * `M` - formatted numeric month (stated with 1) with minimal required digits, e.g. "1", "12"
	 *                    * `MM` - formatted padded numeric month (stated with 1), e.g. "01", "12"
	 *                    * `MMM` - formatted abbreviated month name, e.g. "Jan", "Aug"
	 *                    * `_MMM` - lowercased formatted abbreviated month name, e.g. "jan", "aug"
	 *                    * `MMMM` - formatted wide month name, e.g. "January", "August"
	 *                    * `_MMMM` - lowercased formatted abbreviated month name, e.g. "january", "august
	 *                    "
	 *                    * `-- Weekday (standalone style) -- `
	 *                    * `c` - standalone numeric weekday index (stated with 1) with minimal required digits, e.g. "1", "7"
	 *                    * `cc` - standalone padded numeric weekday index (stated with 1), e.g. "01", "07"
	 *                    * `ccc` - standalone abbreviated weekday name, e.g. "Mon", "Tue"
	 *                    * `_ccc` - lowercased standalone abbreviated weekday name, e.g. "mon", "tue"
	 *                    * `cccc` - standalone wide weekday name, e.g. "Monday", "Tuesday"
	 *                    * `_cccc` - lowercased standalone abbreviated weekday name, e.g. "monday", "tuesday"
	 *
	 *                    * `-- Weekday (format style) -- `
	 *                    * `e` - formatted numeric weekday index (stated with 1) with minimal required digits, e.g. "1", "12"
	 *                    * `ee` - formatted padded local weekday index (stated with 1), e.g. "01", "12"
	 *                    * `eee` - formatted abbreviated weekday name, e.g. "Mon", "Tue"
	 *                    * `_eee` - lowercased formatted abbreviated weekday name, e.g. "mon", "tue"
	 *                    * `eeee` - formatted wide weekday name, e.g. "Monday", "Tuesday"
	 *                    * `_eeee` - lowercased formatted abbreviated weekday name, e.g. "monday", "tuesday"
	 *
	 *                    * `-- Day -- `
	 *                    * `d` - index of the day in the month (stated with 1) with minimal required digits, e.g. "1", "25"
	 *                    * `dd` - padded index of the day in the month (stated with 1), e.g. "01", "25"
	 *
	 *                    * `-- Hours -- `
	 *                    * `h` - hours in range [0..11] with minimal required digits, e.g. "1", "10"
	 *                    * `hh` - padded hours in range [0..11], e.g. "01", "10"
	 *                    * `H` - hours in range [0..23] with minimal required digits, e.g. "1", "23"
	 *                    * `HH` - padded hours in range [0..23], e.g. "01", "10"
	 *
	 *                    * `-- Minutes -- `
	 *                    * `m` - minutes with minimal required digits, e.g. "1", "53"
	 *                    * `mm` - padded minutes, e.g. "01", "54"
	 *
	 *                    * `-- Seconds -- `
	 *                    * `s` - seconds with minimal required digits, e.g. "1", "53"
	 *                    * `ss` - padded seconds, e.g. "01", "54"
	 *
	 *                    * `-- Timezone -- `
	 *                    * `X` - ISO8601-compatible timezone with minimal characters, e.g. "Z", "-03", "-0300"
	 *                    * `XX` - ISO8601-compatible timezone in basic form, e.g. "Z", "-0300", "+0300"
	 *                    * `XXX` - ISO8601-compatible timezone in extended form, e.g. "Z", "-03:00", "+03:00"
	 * @param   input     A Date object, timestamp or string form of the date (in ISO8601, Russian or British notation).
	 * @param   options   Formatter options.
	 *
	 * @returns           A string built from the date according to the pattern and options, or `null` in case of invalid input.
	 */
	return (pattern: string, input: Input = new Date(), options?: Partial<Options>) => {
		return _formatDate(pattern, toArray(localeData), input, mergeObjects(defaultOptions, options) as Required<Options>);
	};
};

export const formatDate = createFormatDate([FORMAT_DATE_LOCALE_EN, FORMAT_DATE_LOCALE_RU], { utc: false, locale: 'en' });

export const formatDateRu = createFormatDate(FORMAT_DATE_LOCALE_RU, { utc: false, locale: 'ru' });
export const formatDateEn = createFormatDate(FORMAT_DATE_LOCALE_EN, { utc: false, locale: 'en' });
