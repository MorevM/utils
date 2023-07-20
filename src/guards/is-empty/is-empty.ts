/**
 * Checks whether a given value is considered to be empty.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is `empty`.
 */
import type { PlainObject } from '../../types';
import { isIterable } from '../is-iterable/is-iterable';
import { isObject } from '../is-object/is-object';

type Empty = undefined | null | false | 0 | 0n | '' | readonly [] | [] | PlainObject<never>;

export const isEmpty = (value: unknown): value is Empty => {
	if (typeof (value) === 'undefined') return true;
	if (value === null) return true;
	if (value === false) return true;
	if (Number.isNaN(value)) return true;
	if (value === 0) return true;
	if (value === BigInt(0)) return true; // Using `0n` may fail in some environments such as esbuild es2019
	if (value === '') return true;

	if (isIterable(value) && typeof value === 'object' && 'length' in value && value.length === 0) return true;
	if (isIterable(value) && typeof value === 'object' && 'size' in value && value.size === 0) return true;
	if (isObject(value)) return !Object.keys(value).length;

	return false;
};
