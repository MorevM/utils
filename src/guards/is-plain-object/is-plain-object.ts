import type { PlainObject } from '../../types';
import { isObject } from '../is-object/is-object';

/**
 * Checks whether a given value is a plain object.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is plain object.
 */
export const isPlainObject = (value: unknown): value is PlainObject => {
	if (!isObject(value)) return false;

	const prototype = Object.getPrototypeOf(value);

	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null)
		&& !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
