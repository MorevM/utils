import type { _DateTokens, Prefix } from './dates.types';

export const ISO_DATETIME_REG_EXP = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])(?:[ T](0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d{3}))?(?:Z|([+-](?:0\d|1\d|2[0-3])(?::?[0-5]\d)?))?)?$/;
export const RU_DATETIME_REG_EXP = /^([1-9]|0\d|[12]\d|3[01])\.(0[1-9]|[1-9]|1[0-2])\.(\d{4})(?:\s*([01]\d|2[0-3]|\d)(?::(0\d|[1-5]\d|\d))?(?::(0\d|[1-5]\d|\d))?(?:.(\d{3}))?)?$/;
export const EN_DATETIME_REG_EXP = /^(0[1-9]|[1-9]|1[0-2])\/([1-9]|0\d|[12]\d|3[01])\/(\d{4})(?:\s*([01]\d|2[0-3]|\d)(?::(0\d|[1-5]\d|\d))?(?::(0\d|[1-5]\d|\d))?(?:.(\d{3}))?)?$/;

export const prefixedDateMethodsFactory = <Type extends 'get' | 'set', UTC extends boolean>(type: Type, utc: UTC) => {
	return <const T extends string>(string: T) => {
		const prefix = (() => {
			const value = type === 'get'
				? utc ? 'getUTC' : 'get'
				: utc ? 'setUTC' : 'set';
			return value as Prefix<Type, UTC>;
		})();

		return `${prefix}${string}` as const;
	};
};

export const createDateFromTokens = (tokens: _DateTokens) => {
	const date = new Date(Date.UTC(tokens.year, tokens.month, tokens.day));

	// The date is invalid, e.g. `February, 23` for a not leap year,
	// `April, 31` and so on.
	if (date.getUTCMonth() !== tokens.month || date.getUTCDate() !== tokens.day) {
		return null;
	}

	date.setUTCHours(tokens.hours);
	date.setUTCMinutes(tokens.minutes);
	date.setUTCSeconds(tokens.seconds);
	date.setUTCMilliseconds(tokens.milliseconds);

	if (!tokens.offset) return date;

	date.setUTCMinutes(date.getUTCMinutes() + tokens.offset);

	return date;
};
