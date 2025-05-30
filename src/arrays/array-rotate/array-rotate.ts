/**
 * Rotates an array by the specified offset. \
 * **MUTATES** the original array.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4];
 * arrayRotateMutable(arr, 1); // [2, 3, 4, 1]
 * ```
 *
 * @param   array    The array to rotate.
 * @param   offset   Number of positions to rotate, positive or negative.
 *
 * @returns          The mutated array.
 */
export const arrayRotateMutable = <T>(array: T[], offset: number) => {
	const { length } = array;
	if (!length) return array;

	const mod = ((offset % length) + length) % length;
	const toAppend = array.splice(0, mod);

	array.push(...toAppend);
	return array;
};


/**
 * Rotates an array by the specified offset. \
 * Does not mutate the original array.
 *
 * @example
 * ```ts
 * arrayRotate([1, 2, 3, 4], 1) // [2, 3, 4, 1]
 * arrayRotate([1, 2, 3, 4], -1) // [4, 1, 2, 3]
 * ```
 *
 * @param   array    The array to rotate.
 * @param   offset   Number of positions to rotate, positive or negative.
 *
 * @returns          A new rotated array.
 */
export const arrayRotate = <T>(array: T[], offset: number) => {
	return arrayRotateMutable([...array], offset);
};
