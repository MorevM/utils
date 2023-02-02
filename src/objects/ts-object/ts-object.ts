import type { ObjectEntries, ObjectKeys, ObjectValues, PlainObject } from '../../types';
import type { ObjectFromEntries } from '../../types/objects/object-from-entries/object-from-entries';

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
	keys: <T extends PlainObject>(obj: T) => Object.keys(obj) as unknown as Array<ObjectKeys<Required<T>>>,

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

	/**
	 * Typed version of `Object.fromEntries()`.
	 *
	 * @param   entries   Entries to process.
	 *
	 * @returns           `Object.fromEntries()` return value for a given object.
	 */
	fromEntries: <Key extends PropertyKey, Entries extends ReadonlyArray<readonly [Key, any]>>(entries: Entries) =>
		Object.fromEntries(entries) as ObjectFromEntries<Key, Entries>,
};
