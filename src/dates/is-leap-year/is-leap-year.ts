import { isInteger, isNull, isDate, isString } from '../../guards';

/**
 * Checks whether the passed value is a Date representing or leap year,
 * or whether the passed number (or string representation of a number)
 * is a representation of a leap year.
 *
 * @param   value   The value to check.
 *
 * @returns         Whether the value represents a leap year.
 */
export const isLeapYear = (value: string | number | Date) => {
	const year = (() => {
		if (isInteger(value)) return value;
		if (isString(value)) {
			const maybeNumber = +value;
			return Number.isNaN(maybeNumber) ? null : maybeNumber;
		}
		if (isDate(value, true)) return value.getFullYear();
		return null;
	})();

	if (isNull(year)) return false;

	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
