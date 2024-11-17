import { createDateFromTokens } from '../dates.utils';
import { parseDate } from '../parse-date/parse-date';

type Options = {
	/**
	 * Whether to treat the passed value as UTC.
	 *
	 * @default false
	 */
	utc: boolean;
};

const DEFAULT_OPTIONS: Options = { utc: false };

/**
 * Attempts to convert a given value to a Date object. \
 * The value can be a Date (it's guaranteed that if it was returned, the Date is valid),
 * ISO-compatible string or a date string written in Russian or British notation.
 *
 * Return value is always adjusted to a local time, option `utc` controls how to treat the input value.
 *
 * @param   value         Timestamp, Date object, ISO-compatible string
 *                        or a string with date in Russian or British notation.
 * @param   userOptions   Transforming options.
 *
 * @returns               A Date object or `null` in case of invalid input.
 */
export const toDate = (value: string | number | Date, userOptions?: Options): Date | null => {
	const options = { ...DEFAULT_OPTIONS, ...userOptions };
	const tokens = parseDate(value, { utc: options.utc });
	if (!tokens) return null;

	const offset = new Date().getTimezoneOffset();

	return createDateFromTokens({
		...tokens,
		offset: options.utc ? -offset : offset,
	});
};
