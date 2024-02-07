/* eslint-disable @typescript-eslint/prefer-function-type -- `type` is stripped in resulting `.d.ts` files */
/* eslint-disable jsdoc/no-multi-asterisks -- Need a list inside JSDocs */
import type { IntRange } from 'type-fest';
import type { ArrayOf } from '../../types';

export type Input = Date | string | number;

export type Options = {
	/**
	 * Whether to construct the string using value as UTC.
	 *
	 * @default false
	 */
	utc: boolean;

	/**
	 * A locale to use.
	 */
	locale: string;
};

export type LocaleObject = {
	/**
	 * Locale name.
	 */
	name: string;
	/**
	 * Locale-specific values.
	 */
	values: {
		/**
		 * First day of the week relative to Sunday, e.g.
		 * `0`, if the first day of the week is Sunday,
		 * `1` if the first day of the week is Monday, etc.
		 */
		firstDayOfWeekIndex: IntRange<0, 6>;

		/**
		 * Locale-specific day names.
		 */
		dayNames: {
			/**
			 * Abbreviated day names in order started with Sunday day, e.g. `['Sun', 'Mon', ...]`
			 */
			abbreviated: ArrayOf<'exactly', 7, string>;

			/**
			 * Wide (full) day names in order started with Sunday day, e.g. `['Sunday', 'Monday', ...]`
			 */
			wide: ArrayOf<'exactly', 7, string> | ArrayOf<'exactly', 7, [string, string]>;
		};

		/**
		 * Locale-specific month names.
		 */
		monthNames: {
			/**
			 * Abbreviated month names in order started with January day, e.g. `['Jan', 'Feb', ...]`
			 */
			abbreviated: ArrayOf<'exactly', 12, string>;

			/**
			 * Wide (full) month names in order started with January day, e.g. `['January', 'February', ...]`
			 */
			wide: ArrayOf<'exactly', 12, string> | ArrayOf<'exactly', 12, [string, string]>;
		};
	};
};

export interface FormatDate {
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
	(pattern: string, input: Input, options?: Partial<Options>): string | null;
}
