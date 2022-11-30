/**
 * Mutable version of `arrayInsert()`.
 * Inserts an element(s) in a certain position of the given array. \
 * Mutates the original array.
 *
 * @param   arr     The original array.
 * @param   index   The needed index of newly added element(s).
 * @param   items   The item or items to insert.
 *
 * @returns         The array itself with inserted elements.
 */
export const arrayInsertMutable = (arr: any[], index: number, ...items: any[]) => {
	arr.splice(index, 0, ...items);

	return arr;
};

/**
 * Inserts an element(s) in a certain position of the given array. \
 * Doesn't mutate the original array.
 *
 * @param   arr     The original array.
 * @param   index   The needed index of newly added element(s).
 * @param   items   The item or items to insert.
 *
 * @returns         The whole new array with inserted elements.
 */
export const arrayInsert = (arr: any[], index: number, ...items: any[]) =>
	arrayInsertMutable([...arr], index, ...items);
