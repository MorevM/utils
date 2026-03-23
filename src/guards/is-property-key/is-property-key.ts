import { isNumber } from '../is-number/is-number';
import { isString } from '../is-string/is-string';
import { isSymbol } from '../is-symbol/is-symbol';

/**
 * Checks whether a given value can be used as an object property key.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is property key.
 */
export const isPropertyKey = (value: unknown): value is PropertyKey =>
	isString(value) || isNumber(value) || isSymbol(value);
