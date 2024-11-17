import { isDate, isInteger, isUndefined } from '../../guards';
import { createDateFromTokens, EN_DATETIME_REG_EXP, ISO_DATETIME_REG_EXP, prefixedDateMethodsFactory, RU_DATETIME_REG_EXP } from '../dates.utils';
import type { _DateTokens, DateTokens } from '../dates.types';

const tokensFromDate = (date: Date | null, utc: boolean) => {
	if (!date) return null;

	const get = prefixedDateMethodsFactory('get', utc);

	date.setUTCMinutes(date.getUTCMinutes() + new Date().getTimezoneOffset());

	const year = date[get('FullYear')]();
	const month = date[get('Month')]();
	const day = date[get('Date')]();
	const hours = date[get('Hours')]();
	const minutes = date[get('Minutes')]();
	const seconds = date[get('Seconds')]();
	const milliseconds = date[get('Milliseconds')]();

	return { year, month, day, hours, minutes, seconds, milliseconds };
};

type Options = {
	/**
	 * Whether to treat the passed value as a UTC datetime.
	 *
	 * @default false
	 */
	utc: boolean;
};

const DEFAULT_OPTIONS: Options = { utc: false };

/**
 * Splits a given Date / date string in various syntax / timestamp into a separate tokens. \
 * The tokens are always refer to a local date, `utc` option controls how to treat the given value.
 *
 * @param   input         A Date object, or a date string written in ISO, Russian or British notation, or a timestamp.
 *                        Example of ISO string: `2024-05-25T23:00:00+0030` \
 *                        Example of date string in Russian notation: `25.05.2024 23:00:00` \
 *                        Example of date string in British notation: `05/25/2024 23:00:00`
 * @param   userOptions   Parser options.
 *
 * @returns               Date tokens or `null` in case of invalid input.
 */
export const parseDate = (input: string | number | Date, userOptions?: Partial<Options>): DateTokens | null => {
	const options = { ...DEFAULT_OPTIONS, ...userOptions };

	if (isDate(input)) {
		if (!isDate(input, true)) return null;

		const year = input.getFullYear();
		const month = input.getMonth();
		const day = input.getDate();
		const hours = input.getHours();
		const minutes = input.getMinutes();
		const seconds = input.getSeconds();
		const milliseconds = input.getMilliseconds();

		return tokensFromDate(
			createDateFromTokens({ year, month, day, hours, minutes, seconds, milliseconds }),
			options.utc,
		);
	}

	if (isInteger(input)) {
		return tokensFromDate(new Date(input), options.utc);
	}

	// First check for ISO date format
	let match = input.match(ISO_DATETIME_REG_EXP);
	if (match) {
		const [
			year, month, day, hours, minutes, seconds, milliseconds, offset,
		] = match.slice(1).map((part, index) => {
			if (isUndefined(part)) return 0;

			if (index === 1) return Number(part) - 1;

			if (index === 7) {
				const [sign, offsetString] = [part[0], part.slice(1)];

				const offset = (() => {
					// Only hours
					if (offsetString.length === 2) { return Number(offsetString) * 60; }

					// Hours and minutes without separator
					if (offsetString.length === 4) {
						return (Number(offsetString.slice(0, 2)) * 60 + Number(offsetString.slice(2)));
					}

					// According to RegExp remains only option with hours and minutes with separator
					return (Number(offsetString.slice(0, 2)) * 60 + Number(offsetString.slice(3)));
				})();

				return sign === '+' ? offset : -offset;
			}

			return Number(part);
		});

		return tokensFromDate(
			createDateFromTokens({ year, month, day, hours, minutes, seconds, milliseconds, offset }),
			options.utc,
		);
	}

	// RU date format
	match = input.match(RU_DATETIME_REG_EXP);
	if (match) {
		const [
			day, month, year, hours, minutes, seconds, milliseconds,
		] = match.slice(1).map((part, index) => {
			if (isUndefined(part)) return 0;
			if (index === 1) return Number(part) - 1;
			return Number(part);
		});

		return tokensFromDate(
			createDateFromTokens({ year, month, day, hours, minutes, seconds, milliseconds }),
			options.utc,
		);
	}

	// EN date format
	match = input.match(EN_DATETIME_REG_EXP);
	if (match) {
		const [
			month, day, year, hours, minutes, seconds, milliseconds,
		] = match.slice(1).map((part, index) => {
			if (isUndefined(part)) return 0;
			if (index === 0) return Number(part) - 1;
			return Number(part);
		});

		return tokensFromDate(
			createDateFromTokens({ year, month, day, hours, minutes, seconds, milliseconds }),
			options.utc,
		);
	}

	return null;
};
