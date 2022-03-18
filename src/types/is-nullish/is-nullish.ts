/**
 * Checks whether a given value is considered to be nullish.
 *
 * @see      https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */

type NullishType = null | undefined;

export const isNullish = (value: any): value is NullishType =>
	value === null || typeof value === 'undefined';
