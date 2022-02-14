/**
 * Checks whether a given value is considered to be nullish.
 *
 * @see      https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 *
 * @param     {any}       value   The value being evaluated.
 *
 * @returns   {boolean}
 */
export const isNullish = (value: any): boolean =>
	value === null || typeof value === 'undefined';
