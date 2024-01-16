import type { Primitive } from '../../types';
import { isNullish } from '../is-nullish/is-nullish';

/**
 * Checks whether the value is a primitive.
 *
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a primitive value.
 */
export const isPrimitive = (value: unknown): value is Primitive => {
	if (isNullish(value)) return true;

	return !['object', 'function'].includes(typeof value);
};
