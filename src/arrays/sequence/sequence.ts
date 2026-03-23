import { isNull, isPropertyKey, isUndefined } from '../../guards';

type Options<T = unknown, Key extends PropertyKey = PropertyKey> = {
	toKey: (item: T) => Key;
};
type FindPredicate<Item> = (item: Item) => boolean;
type FindOptions = { wrap?: boolean };

const DEFAULTS: Options<unknown, string> = {
	toKey: (item) => item?.toString?.() ?? `[custom object]`,
};

const findRelative = <Item>(
	items: readonly Item[],
	startIndex: number,
	predicate: FindPredicate<Item>,
	direction: 1 | -1,
	{ wrap = false }: FindOptions = {},
) => {
	const { length } = items;
	if (!length) return null;

	const iterations = wrap
		? length - 1
		: direction === 1
			? length - startIndex - 1
			: startIndex;

	for (let step = 1; step <= iterations; step++) {
		const candidateIndex = wrap
			? (((startIndex + (step * direction)) % length) + length) % length
			: startIndex + (step * direction);
		const candidate = items[candidateIndex];

		if (predicate(candidate)) return candidate;
	}

	return null;
};

/**
 * Creates a sequence helper around an array and provides methods
 * for reading neighbouring, indexed, and keyed items.
 *
 * @param   items     Source items of the sequence.
 * @param   options   Sequence options. \
 *                    Use `toKey` to resolve items by a custom property key.
 *
 * @returns           A helper object exposing the original items,
 *                    sequence length, and navigation methods.
 */
export const sequence = <
	Item,
	UserKey extends PropertyKey,
	OptionsType extends Partial<Options<Item, UserKey>>,
	Key = OptionsType extends { toKey: (item: Item) => infer K }
		? Item | K
		: Item,
>(
	items: readonly Item[],
	options?: OptionsType,
) => {
	const { toKey } = { ...DEFAULTS, ...options } as Options<Item, UserKey>;
	const indexesByKey = new Map<any, number>();

	items.forEach((item, index) => indexesByKey.set(toKey(item), index));

	/**
	 * Returns the index of the given item or key.
	 *
	 * @param   item   The item itself or the key produced by `toKey`.
	 *
	 * @returns        The index of the matched item, or `null` if no match is found.
	 */
	const indexOf = (item: Item | Key) => {
		const directItemIndex = items.indexOf(item as Item);
		if (directItemIndex !== -1) return directItemIndex;

		if (isPropertyKey(item)) {
			const itemIndex = indexesByKey.get(item);
			return isUndefined(itemIndex) ? null : itemIndex;
		}

		return indexesByKey.get(toKey(item as Item)) ?? null;
	};

	/**
	 * Returns an item at the given index.
	 *
	 * @param   index   The index to read. Negative indexes are supported.
	 *
	 * @returns         The item at the given index, or `null` if the index is out of bounds.
	 */
	const at = (index: number) => items.at(index) ?? null;

	/**
	 * Returns an item by its value or key.
	 *
	 * @param   item   The item itself or the key produced by `toKey`.
	 *
	 * @returns        The matched item, or `null` if no match is found.
	 */
	const get = (item: Key) => {
		const itemIndex = indexOf(item);

		return isNull(itemIndex)
			? null
			: items[itemIndex] ?? null;
	};

	/**
	 * Checks whether an item exists in the sequence.
	 *
	 * @param   item   The item itself or the key produced by `toKey`.
	 *
	 * @returns        Whether the sequence contains the given item or key.
	 */
	const has = (item: Key) => !isNull(indexOf(item));

	/**
	 * Returns the first item in the sequence.
	 *
	 * @returns   The first item in the sequence.
	 */
	const first = () => items[0];

	/**
	 * Returns the last item in the sequence.
	 *
	 * @returns   The last item in the sequence.
	 */
	const last = () => items.at(-1) as Item;

	/**
	 * Returns the previous item relative to the given item or key.
	 *
	 * @param   item           The item itself or the key produced by `toKey`.
	 * @param   defaultValue   Value to return if the item is not found.
	 *
	 * @returns                The previous item.
	 *                         If the given item is the first one, returns `defaultValue` when provided,
	 *                         otherwise returns the last item.
	 *                         Returns `defaultValue` or `null` if the item is not found.
	 */
	const prev = (item: Item | Key, defaultValue?: Item) => {
		const itemIndex = indexOf(item);
		if (isNull(itemIndex)) return defaultValue ?? null;

		return items[itemIndex - 1] ?? defaultValue ?? last();
	};

	/**
	 * Returns the next item relative to the given item or key.
	 *
	 * @param   item           The item itself or the key produced by `toKey`.
	 * @param   defaultValue   Value to return if the item is not found.
	 *
	 * @returns                The next item.
	 *                         If the given item is the last one, returns `defaultValue` when provided,
	 *                         otherwise returns the first item.
	 *                         Returns `defaultValue` or `null` if the item is not found.
	 */
	const next = (item: Item | Key, defaultValue?: Item) => {
		const itemIndex = indexOf(item);
		if (isNull(itemIndex)) return defaultValue ?? null;

		return items[itemIndex + 1] ?? defaultValue ?? first();
	};

	/**
	 * Finds the next item matching the predicate.
	 *
	 * @param   item          The item itself or the key produced by `toKey`.
	 * @param   predicate     Predicate used to test candidate items.
	 * @param   findOptions   Search options. Use `wrap: true` to continue from the start.
	 *
	 * @returns               The next matching item, or `null` if no match is found.
	 */
	const findNext = (item: Item | Key, predicate: FindPredicate<Item>, findOptions?: FindOptions) => {
		const itemIndex = indexOf(item);
		if (isNull(itemIndex)) return null;

		return findRelative(items, itemIndex, predicate, 1, findOptions);
	};

	/**
	 * Finds the previous item matching the predicate.
	 *
	 * @param   item          The item itself or the key produced by `toKey`.
	 * @param   predicate     Predicate used to test candidate items.
	 * @param   findOptions   Search options. Use `wrap: true` to continue from the end.
	 *
	 * @returns               The previous matching item, or `null` if no match is found.
	 */
	const findPrev = (item: Item | Key, predicate: FindPredicate<Item>, findOptions?: FindOptions) => {
		const itemIndex = indexOf(item);
		if (isNull(itemIndex)) return null;

		return findRelative(items, itemIndex, predicate, -1, findOptions);
	};

	/**
	 * Returns an item shifted by the given offset with circular wrapping.
	 *
	 * @param   item     The item itself or the key produced by `toKey`.
	 * @param   offset   Number of steps to move. Negative offsets move backwards.
	 *
	 * @returns          The shifted item, or `null` if the starting item is not found.
	 */
	const spin = (item: Item | Key, offset: number) => {
		const startIndex = indexOf(item);
		if (isNull(startIndex)) return null;
		const setLength = items.length;
		const returnValueIndex = (((startIndex + offset) % setLength) + setLength) % setLength;

		return items[returnValueIndex];
	};

	return {
		/**
		 * Original sequence items.
		 */
		items,
		/**
		 * Number of items in the sequence.
		 */
		length: items.length,
		indexOf,
		at,
		get,
		has,
		first,
		last,
		findNext,
		findPrev,
		prev,
		next,
		spin,
	};
};
