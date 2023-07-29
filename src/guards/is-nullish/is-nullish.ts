/**
 * Checks whether a given value is considered to be nullish.
 *
 * @see      https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is nullish value
 */
export const isNullish = (value: any): value is null | undefined =>
	value === null || typeof value === 'undefined';
