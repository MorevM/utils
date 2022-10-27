type ToReturn<T> = T extends any[] ? T : T[];

/**
 * Casts the given value to an array.
 * Remains array as is if given value is an array already.
 *
 * @param   value   Any value
 *
 * @returns         Array itself if the value is already array, single-value array containing value otherwise
 */
export const toArray = <T>(value: T): ToReturn<T> =>
	[value].flat() as ToReturn<T>;
