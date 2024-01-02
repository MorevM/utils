/* eslint-disable import/exports-last */
/* eslint-disable func-style -- It's needed to type `this` here. */
import type { AsyncArray, Callback, Mapper, Reducer } from './async-array.types';
import { resolve, series } from './async-array.utils';

function forEach<T>(this: T[], callback: Callback): Promise<void> {
	return resolve(this).then(
		series((results, value, index, arr) => callback(value, index, arr), undefined),
	);
}

function reduce<T>(this: T[], reducer: Reducer, initial?: T) {
	return resolve(this).then(
		series(reducer, initial, 'left-to-right'),
	);
}

function reduceRight<T>(this: T[], reducer: Reducer, initial?: T) {
	return resolve(this).then(
		series(reducer, initial, 'right-to-left'),
	);
}

function map<T>(this: T[], mapper: Mapper) {
	return resolve(this).then(
		(values) => Promise.all(
			values.map((value, index, arr) => mapper(value, index, arr)),
		),
	);
}

/**
 * A wrapper over some `Array` methods to use asynchronous functions in an intuitive way.
 *
 * @param   arr   Array of promises or values to iterate over.
 *
 * @returns       `AsyncArray` instance.
 */
export const asyncArray = <T>(arr: T[]): AsyncArray<T> => {
	return {
		forEach: forEach.bind(arr),
		reduce: reduce.bind(arr),
		reduceRight: reduceRight.bind(arr),
		map: map.bind(arr),
	};
};
