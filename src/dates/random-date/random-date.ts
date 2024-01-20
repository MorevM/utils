import { isArray, isDate, isString, isUndefined } from '../../guards';
import { clamp } from '../../numbers';

type Options = {
	/**
	 * The time to be set for the date.
	 * Can be a tuple of numbers of length from 1 to 4 in the order `[hours, minutes?, seconds?, milliseconds?]`
	 * or a string in the format `hh:mm:ss.mmm`.
	 */
	time: [number] | [number, number] | [number, number, number] | [number, number, number, number] | string;
};

const setTime = (date: Date, hours: number, minutes: number, seconds: number, milliseconds: number) => {
	hours = clamp(hours, 0, 23);
	minutes = clamp(minutes, 0, 59);
	seconds = clamp(seconds, 0, 59);
	milliseconds = clamp(milliseconds, 0, 999);

	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(seconds);
	date.setMilliseconds(milliseconds);
};

/**
 * Generates a random date between `start` and `end` dates. \
 * Optionally can set specific time for a date using `time` option.
 *
 * @param   start         Minimum date. Default is a Date object for a date `01.01.1970`.
 * @param   end           Maximum date. Default is the current date.
 * @param   userOptions   Generation options.
 *
 * @returns               A random date between `start` and `end` date with (optionally) set time.
 */
export const randomDate = (
	start: Date | null = new Date(0),
	end: Date | null = new Date(),
	userOptions?: Partial<Options>,
): Date => {
	if (!isDate(start, true)) start = new Date(0);
	if (!isDate(end, true)) end = new Date();

	const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

	if (isUndefined(userOptions)) return date;

	if (isString(userOptions.time)) {
		const [time, milliseconds = 0] = userOptions.time.split('.');
		const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map((maybeNumber) => {
			const number = Number(maybeNumber);
			return Number.isNaN(number) ? 0 : number;
		});
		setTime(date, hours, minutes, seconds, +milliseconds);
	}

	if (isArray(userOptions.time)) {
		const [hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = userOptions.time;
		setTime(date, hours, minutes, seconds, milliseconds);
	}

	return date;
};
