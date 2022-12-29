/**
 * Checks whether a given value is considered to be empty.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is `empty`
 */
import { isIterable } from '../is-iterable/is-iterable';
import { isObject } from '../is-object/is-object';

export const isEmpty = (value: any): boolean => {
	if ([undefined, null, false, NaN, 0, ''].includes(value)) {
		return true;
	}

	if (isIterable(value) && typeof value === 'object' && 'length' in value && value.length === 0) return true;
	if (isIterable(value) && typeof value === 'object' && 'size' in value && value.size === 0) return true;
	if (isObject(value)) return !Object.keys(value).length;

	return false;
};
