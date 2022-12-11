/**
 * Object values as an union with optional ability to set which keys should be presented.
 */
export type ObjectValues<
	T extends Record<PropertyKey, unknown>,
	K extends keyof T = keyof T,
> = Array<T[K]>;
