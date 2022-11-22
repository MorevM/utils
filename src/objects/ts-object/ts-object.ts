import type { ObjectEntries, ObjectKeys, ObjectValues, PlainObject } from '../../types';

/**
 * Object containing typed versions of popular `Object` methods.
 */
export const tsObject = {
	/**
	 * Typed version of `Object.keys()`.
	 *
	 * @param   obj   Object to process.
	 *
	 * @returns       `Object.keys()` return value for a given object.
	 */
	keys: <T extends PlainObject>(obj: T) => Object.keys(obj) as ObjectKeys<Required<T>>,

	/**
	 * Typed version of `Object.values()`.
	 *
	 * @param   obj   Object to process.
	 *
	 * @returns       `Object.values()` return value for a given object.
	 */
	values: <T extends PlainObject>(obj: T) => Object.values(obj) as ObjectValues<Required<T>>,

	/**
	 * Typed version of `Object.entries()`.
	 *
	 * @param   obj   Object to process.
	 *
	 * @returns       `Object.entries()` return value for a given object.
	 */
	entries: <T extends PlainObject>(obj: T) => Object.entries(obj) as ObjectEntries<Required<T>>,
};
