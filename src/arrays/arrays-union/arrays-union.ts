/**
 * Computes the union of passed arrays.
 *
 * @example
 * arraysUnion([1, 2, 3], [3, 4, 5]) -> [1, 2, 3, 4, 5]
 *
 * @param   arrays   Arrays to process
 *
 * @returns          Union of arrays
 */
export const arraysUnion = <T = any>(...arrays: readonly T[][]): T[] =>
	[...new Set(arrays.flat())];
