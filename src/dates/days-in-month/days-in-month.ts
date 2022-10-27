/**
 * Retrieves count of days in given `month` and `year`. \
 * Uses local time year if no `year` argument is passed.
 *
 * @param   monthIndex   Index of month (January is 0)
 * @param   year         Year (uses local time year if omitted)
 *
 * @returns              Count of days in given month for year `year` (or local year)
 */
export const daysInMonth = (monthIndex: number, year?: number) => {
	year ??= new Date().getFullYear();
	return new Date(year, monthIndex + 1, 0).getDate();
};
