export type Prefix<Type extends 'get' | 'set', UTC extends boolean> = Type extends 'get'
	? UTC extends true ? 'getUTC' : 'get'
	: UTC extends true ? 'setUTC' : 'set';

export type _DateTokens = {
	/**
	 * Year of the date.
	 */
	year: number;

	/**
	 * Index of index of the date in range `[0..11]`.
	 */
	month: number;

	/**
	 * Day of the month of the date in range `[0..28|29|30|31]` depending on month and leap year.
	 */
	day: number;

	/**
	 * Hour of the date in range `[0..23]`.
	 */
	hours: number;

	/**
	 * Minutes of the date in range `[0..59]`.
	 */
	minutes: number;

	/**
	 * Seconds of the date in range `[0..59]`.
	 */
	seconds: number;

	/**
	 * Milliseconds of the date in range `[0..999]`.
	 */
	milliseconds: number;

	/**
	 * An offset to apply to correct the timezone in minutes.
	 */
	offset?: number;
};

export type DateTokens = Omit<_DateTokens, 'offset'>;
