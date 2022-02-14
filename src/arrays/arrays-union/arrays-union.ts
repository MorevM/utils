/**
 * Computes the union of passed arrays.
 *
 * @example
 * arraysUnion([1, 2, 3], [3, 4, 5]) -> [1, 2, 3, 4, 5]
 *
 * @param     {any[][][]}   arrays   Arrays to process
 *
 * @returns   {any[]}                Union of arrays
 */
export const arraysUnion = (...arrays: any[][]): any[] =>
	[...new Set(arrays.flat())];
