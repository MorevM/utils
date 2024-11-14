/* eslint-disable @stylistic/max-len, no-autofix/@typescript-eslint/method-signature-style */
import type { Awaitable } from '../../types';

export type Callback<T = any> = (value: T, index: number, array: T[]) => void;
export type Reducer<T = any, U = any> = (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => Awaitable<U>;
export type Mapper<T = any, U = any> = (value: T, index: number, array: T[]) => Awaitable<U>;

export interface AsyncArray<T> {
	/**
	 * Performs the specified action for each element in an array.
	 *
	 * @param   callbackfn   A function that accepts up to three arguments. \
	 *                       `forEach` calls the `callbackfn` function one time for each element in the array.
	 * @param   thisArg      An object to which the `this` keyword can refer in the `callbackfn` function.
	 *                       If thisArg is omitted, `undefined` is used as the `this` value.
	 */
	forEach(callbackfn: (value: Awaited<T>, index: number, array: Array<Awaited<T>>) => void, thisArg?: any): Promise<void>;

	/**
	 * Calls a defined callback function on each element of an array, and returns an array that contains the results.
	 *
	 * @param   callbackfn   A function that accepts up to three arguments. \
	 *                       The map method calls the callbackfn function one time for each element in the array.
	 * @param   thisArg      An object to which the this keyword can refer in the callbackfn function. \
	 *                       If thisArg is omitted, `undefined` is used as the `this` value.
	 */
	map<U>(callbackfn: (value: Awaited<T>, index: number, array: Array<Awaited<T>>) => Awaitable<U>, thisArg?: any): Promise<Array<Awaited<U>>>;

	/**
	 * Calls the specified callback function for all the elements in an array. \
	 * The return value of the callback function is the accumulated result,
	 * and is provided as an argument in the next call to the callback function.
	 *
	 * @param   callbackfn     A function that accepts up to four arguments. \
	 *                         The reduce method calls the callbackfn function one time for each element in the array.
	 * @param   initialValue   If initialValue is specified, it is used as the initial value to start the accumulation. \
	 *                         The first call to the callbackfn function provides this value as an argument instead of an array value.
	 */
	reduce(callbackfn: (previousValue: Awaited<T>, currentValue: Awaited<T>, currentIndex: number, array: Array<Awaited<T>>) => Awaitable<T>, initialValue?: T): Promise<Awaited<T>>;

	/**
	 * Calls the specified callback function for all the elements in an array. \
	 * The return value of the callback function is the accumulated result,
	 * and is provided as an argument in the next call to the callback function.
	 *
	 * @param   callbackfn     A function that accepts up to four arguments. \
	 *                         The reduce method calls the callbackfn function one time for each element in the array.
	 * @param   initialValue   If initialValue is specified, it is used as the initial value to start the accumulation. \
	 *                         The first call to the callbackfn function provides this value as an argument instead of an array value.
	 */
	reduce<U>(callbackfn: (previousValue: Awaited<U>, currentValue: Awaited<T>, currentIndex: number, array: Array<Awaited<T>>) => Awaitable<U>, initialValue: U): Promise<Awaited<U>>;

	/**
	 * Calls the specified callback function for all the elements in an array, in descending order. \
	 * The return value of the callback function is the accumulated result,
	 * and is provided as an argument in the next call to the callback function.
	 *
	 * @param   callbackfn     A function that accepts up to four arguments. \
	 *                         The reduceRight method calls the callbackfn function one time for each element in the array.
	 * @param   initialValue   If initialValue is specified, it is used as the initial value to start the accumulation. \
	 *                         The first call to the callbackfn function provides this value as an argument instead of an array value.
	 */
	reduceRight(callbackfn: (previousValue: Awaited<T>, currentValue: Awaited<T>, currentIndex: number, array: Array<Awaited<T>>) => Awaitable<T>, initialValue?: T): Promise<Awaited<T>>;

	/**
	 * Calls the specified callback function for all the elements in an array, in descending order. \
	 * The return value of the callback function is the accumulated result,
	 * and is provided as an argument in the next call to the callback function.
	 *
	 * @param   callbackfn     A function that accepts up to four arguments. \
	 *                         The reduceRight method calls the callbackfn function one time for each element in the array.
	 * @param   initialValue   If initialValue is specified, it is used as the initial value to start the accumulation. \
	 *                         The first call to the callbackfn function provides this value as an argument instead of an array value.
	 */
	reduceRight<U>(callbackfn: (previousValue: Awaited<U>, currentValue: Awaited<T>, currentIndex: number, array: Array<Awaited<T>>) => Awaitable<U>, initialValue: U): Promise<Awaited<U>>;
}
