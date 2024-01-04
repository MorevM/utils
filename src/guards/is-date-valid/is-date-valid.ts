import { isDate } from '../is-date/is-date';

/**
 * Checks whether a given value is a valid date object.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a valid Date object.
 */
export const isDateValid = (value: Date): value is Date =>
	isDate(value) && !Number.isNaN(value.getTime());
