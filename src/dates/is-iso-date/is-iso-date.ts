import { isString } from '../../guards';
import { ISO_DATETIME_REG_EXP } from '../dates.utils';

/**
 * Checks whether the given value is a valid ISO date string.
 *
 * @param   input    Value being evaluated.
 * @param   strict   Whether the date should be checked for validity in addition to checking just the syntax.
 *                   This includes checking for leap years and invalid dates like "April 31" (there are only 30 days in April)
 *
 * @returns          Whether the value is a valid ISO date string.
 */
export const isIsoDate = (input: unknown, strict: boolean = false): input is string => {
	if (!isString(input)) return false;

	const match = input.match(ISO_DATETIME_REG_EXP);
	if (!strict) return !!match;

	if (!match) return false; // Just for tsc
	const [year, month, day] = match.slice(1).map(Number);

	const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

	return date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
};
