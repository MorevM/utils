/* eslint-disable func-style -- There is no access to `arguments` in arrow functions */
import { isNumeric, isString } from '../../guards';

/**
 * Attempts to cast the passed value to a number.
 * If the cast was successful, returns resulting number.
 * If the cast was unsuccessful, throws an Error unless the fallback value is provided.
 *
 * @param   value      The value to cast.
 * @param   fallback   Fallback value if cast was unsuccessful.
 *
 * @returns            The number if cast was successful, fallback value otherwise if provided.
 * @throws               Throws if cast was unsuccessful with no fallback value provided.
 */
export function toNumber<F>(value: any, fallback?: F): number | F {
	const throwOrReturnFallback = () => {
		if (arguments.length === 1) {
			throw new Error(`The value "${value as string}" cannot be converted to a number`);
		}

		return fallback;
	};

	if (isNumeric(value)) return value;
	if (isString(value)) {
		const number = Number(value);
		return isNumeric(number) ? number : throwOrReturnFallback();
	}

	return throwOrReturnFallback();
}
