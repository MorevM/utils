import type { PlainObject } from '../plain-object/plain-object';

/**
 * Object keys as an array. \
 * Suitable for typing `Object.keys()`
 */
export type ObjectKeys<T extends PlainObject> = Array<keyof T>;
