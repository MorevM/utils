import type { PlainObject } from '../plain-object/plain-object';

/**
 * Object values as an union with optional ability to set which keys should be presented.
 */
export type ObjectValues<T extends PlainObject, K extends keyof T = keyof T> = T[K];
