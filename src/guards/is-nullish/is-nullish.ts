import { isUndefined } from '../is-undefined/is-undefined';
import { isNull } from '../is-null/is-null';

/**
 * Checks whether a given value is considered to be nullish.
 *
 * @see      https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is nullish value
 */
export const isNullish = (value: unknown): value is null | undefined =>
	isNull(value) || isUndefined(value);
