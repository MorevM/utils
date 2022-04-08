/* eslint-disable func-style */

/**
 * @callback ToArray
 * @param     {any}     value
 * @returns   {any[]}
 *
 * @callback KeepArray
 * @param     {any[]}   value
 * @returns   {any[]}
 */

/**
 * Casts the given value to an array.
 * Remains array as is if given value is array already.
 *
 * @type {ToArray & KeepArray}
 */
export function toArray<T extends any[]>(value: T): T;
export function toArray<T>(value: T): T[];
export function toArray(value: any): any[] {
	return [value].flat();
}
