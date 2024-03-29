import type { ObjectKeys } from '../object-keys/object-keys';

/**
 * Object entries. \
 * Suitable for typing `Object.entries()`
 */
export type ObjectEntries<
	Type extends Record<PropertyKey, any>,
> = Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>;
