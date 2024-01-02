import { isArray } from '../../guards';
import type { Reducer } from './async-array.types';

export const resolve = async <T>(collectionOrPromise: T[]): Promise<Awaited<T[]>> => {
	if (isArray(collectionOrPromise)) return Promise.all(collectionOrPromise);
	return Promise.all([collectionOrPromise]);
};

export const series = (reducer: Reducer, initial: any, order: 'left-to-right' | 'right-to-left' = 'left-to-right') => {
	const method = order === 'left-to-right' ? 'reduce' : 'reduceRight';

	return (iterable: any[]) => {
		return iterable[method]((accumulator, value, index) => {
			return accumulator.then((results: any) => reducer(results, value, index, iterable));
		}, Promise.resolve(initial));
	};
};
