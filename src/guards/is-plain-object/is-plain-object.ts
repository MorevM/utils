import { isObject } from '../is-object/is-object';
import type { PlainObject } from '../../types';

/**
 * Checks whether a given value is a plain object.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a plain object.
 */
export const isPlainObject = (value: unknown): value is PlainObject<unknown> => {
	if (!isObject(value)) return false;

	const prototype = Object.getPrototypeOf(value);

	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null)
		&& !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
