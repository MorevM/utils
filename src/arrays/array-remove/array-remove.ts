/**
 * Mutable version of `arrayRemove()`.
 * Removes an element from a given array.
 *
 * @param   arr         The original array.
 * @param   value       The value to remove.
 * @param   onlyFirst   Whether to remove only first occurrence or all occurrences found.
 *                      Default is `false` that means to remove all occurrences.
 *
 * @returns             The array itself without specified elements.
 */
export const arrayRemoveMutable = <T = any>(arr: T[], value: T, onlyFirst: boolean = false) => {
	while (true) { // eslint-disable-line no-constant-condition
		const occurrence = arr.indexOf(value);
		if (occurrence === -1) return arr;
		arr.splice(occurrence, 1);
		if (onlyFirst) return arr;
	}
};

/**
 * Removes an element from a given array. \
 * Doesn't mutate the original array.
 *
 * @param   arr         The original array.
 * @param   value       The value to remove.
 * @param   onlyFirst   Whether to remove only first occurrence or all occurrences found.
 *                      Default is `false` that means to remove all occurrences.
 *
 * @returns             The whole new array without specified elements.
 */
export const arrayRemove = <T = any>(arr: readonly T[], value: T, onlyFirst: boolean = false) =>
	arrayRemoveMutable([...arr], value, onlyFirst);
