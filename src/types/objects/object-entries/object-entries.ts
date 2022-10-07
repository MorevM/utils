import type { PlainObject } from '../plain-object/plain-object';

/**
 * Object entries. \
 * Suitable for typing `Object.entries()`
 */
export type ObjectEntries<T extends PlainObject> = Array<[keyof T, T[keyof T]]>;
