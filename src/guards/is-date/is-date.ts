/**
 * Checks whether a given value is a date object.
 * Optionally it can also check whether the given value represents a valid date.
 *
 * @param   value           The value being evaluated.
 * @param   checkValidity   Whether to return `false` if the Date object is invalid, e.g. `new Date('foo')`.
 *
 * @returns                 Whether the value is Date object. \
 *                          If the second argument is `true` it returns `false` for invalid Date objects.
 */
export const isDate = (value: unknown, checkValidity?: boolean): value is Date => {
	const isDateObject = Object.prototype.toString.call(value).includes('Date');
	if (!isDateObject) return false;

	if (!checkValidity) return isDateObject;

	return !Number.isNaN((value as Date).getTime());
};
