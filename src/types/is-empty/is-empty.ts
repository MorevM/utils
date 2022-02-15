/**
 * Checks whether a given value is considered to be empty.
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
import { isArray } from '../is-array/is-array';
import { isObject } from '../is-object/is-object';

export const isEmpty = (value: any): boolean => {
	if ([undefined, null, false, NaN, 0, ''].includes(value)) {
		return true;
	}

	if (isArray(value)) return !(value as any[]).length;
	if (isObject(value)) return !Object.keys(value).length;

	return false;
};
