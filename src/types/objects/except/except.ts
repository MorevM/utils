import type { IsEqual } from '../../utility/is-equal/is-equal';

/**
 * Filters out keys from an object. \
 * Returns `never` if `Key` is strictly equal to `Exclude` or extends it.
 * Returns `never` if `Key` extends `Exclude`.
 * Returns `Key` otherwise.
 *
 * @example
 *   Filter<'foo', 'foo'> --> never
 *   Filter<'foo', string> --> never
 *   Filter<'foo', 'bar'> --> 'foo'
 */
type Filter<Key, Exclude> = IsEqual<Key, Exclude> extends true
	? never
	: (Key extends Exclude ? never : Key);

/**
 * Creates a type from an object type without certain keys.
 *
 * Stricter version of `Omit` that restricts the omitted keys to be present on the given type,
 * also works fine with index signatures while `Omit` doesn't.
 */
export type Except<Type, Keys extends keyof Type> = {
	[Key in keyof Type as Filter<Key, Keys>]: Type[Key];
};
