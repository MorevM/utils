import { sequence } from './sequence';

const STRING_TEST_CASE = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

const OBJECT_TEST_CASE = STRING_TEST_CASE.map((item) => ({ day: item }));
const FRIDAY_FROM_OBJECT_TEST_CASE = OBJECT_TEST_CASE.find(({ day }) => day === 'friday')!;

const DUPLICATE_KEY_OBJECT_TEST_CASE = [
	{ day: 'monday', order: 1 },
	{ day: 'monday', order: 2 },
	{ day: 'tuesday', order: 3 },
] as const;
const FIRST_MONDAY_FROM_DUPLICATE_KEY_OBJECT_TEST_CASE = DUPLICATE_KEY_OBJECT_TEST_CASE[0];

const SINGLE_ITEM_TEST_CASE = ['monday'] as const;

const EXTENDED_TEST_CASE = [
	{ day: 'sunday', value: { foo: 1 } },
	{ day: 'monday', value: { foo: 1, bar: 2 } },
	{ day: 'tuesday', value: { foo: 1, bar: 2, baz: 3 } },
	{ day: 'wednesday', value: { foo: 1, bar: 2 } },
	{ day: 'thursday', value: { foo: 1 } },
	{ day: 'friday', value: null },
	{ day: 'saturday', value: null },
] as const;

const stringSequence = sequence(STRING_TEST_CASE);
const objectSequence = sequence(OBJECT_TEST_CASE, {
	toKey: (item) => item.day,
});
const duplicateKeyObjectSequence = sequence(DUPLICATE_KEY_OBJECT_TEST_CASE, {
	toKey: (item) => item.day,
});
const extendedSequence = sequence(EXTENDED_TEST_CASE, {
	toKey: (item) => item.day,
});
const emptySequence = sequence([] as const);
const singleItemSequence = sequence(SINGLE_ITEM_TEST_CASE);

describe(sequence, () => {
	describe('Common API', () => {
		it('Exposes original items', () => {
			expect(stringSequence.items).toBe(STRING_TEST_CASE);
			expect(objectSequence.items).toBe(OBJECT_TEST_CASE);
		});

		it('Exposes sequence length', () => {
			expect(stringSequence).toHaveProperty('length', 7);
			expect(objectSequence).toHaveProperty('length', 7);
			expect(emptySequence).toHaveProperty('length', 0);

			expect(stringSequence.items).toHaveLength(7);
			expect(objectSequence.items).toHaveLength(7);
			expect(emptySequence.items).toHaveLength(0);
		});
	});

	describe('indexOf', () => {
		it('Returns an index for direct primitive values', () => {
			expect(stringSequence.indexOf('sunday')).toBe(0);
			expect(stringSequence.indexOf('friday')).toBe(5);
		});

		it('Returns an index for keys and direct object references', () => {
			expect(objectSequence.indexOf('sunday')).toBe(0);
			expect(objectSequence.indexOf(FRIDAY_FROM_OBJECT_TEST_CASE)).toBe(5);
		});

		it('Prefers exact object reference over key-based lookup', () => {
			expect(duplicateKeyObjectSequence.indexOf(FIRST_MONDAY_FROM_DUPLICATE_KEY_OBJECT_TEST_CASE)).toBe(0);
			expect(duplicateKeyObjectSequence.indexOf('monday')).toBe(1);
		});

		it('Returns `null` for missing values', () => {
			expect(stringSequence.indexOf('holiday' as never)).toBeNull();
			expect(objectSequence.indexOf('holiday' as never)).toBeNull();
		});
	});

	describe('at', () => {
		it('Returns an item by positive or negative index', () => {
			expect(stringSequence.at(0)).toBe('sunday');
			expect(stringSequence.at(-1)).toBe('saturday');
			expect(objectSequence.at(1)).toStrictEqual({ day: 'monday' });
		});

		it('Returns `null` for out-of-bounds indexes', () => {
			expect(stringSequence.at(7)).toBeNull();
			expect(stringSequence.at(-8)).toBeNull();
			expect(emptySequence.at(0)).toBeNull();
		});
	});

	describe('get', () => {
		it('Returns an item by direct value, key, or object reference', () => {
			expect(stringSequence.get('monday')).toBe('monday');
			expect(objectSequence.get('monday')).toStrictEqual({ day: 'monday' });
			expect(objectSequence.get(FRIDAY_FROM_OBJECT_TEST_CASE)).toStrictEqual({ day: 'friday' });
		});

		it('Prefers exact object reference over key-based lookup', () => {
			expect(duplicateKeyObjectSequence.get(FIRST_MONDAY_FROM_DUPLICATE_KEY_OBJECT_TEST_CASE))
				.toBe(FIRST_MONDAY_FROM_DUPLICATE_KEY_OBJECT_TEST_CASE);
			expect(duplicateKeyObjectSequence.get('monday')).toStrictEqual({ day: 'monday', order: 2 });
		});

		it('Returns `null` when no item matches', () => {
			expect(stringSequence.get('holiday' as never)).toBeNull();
			expect(objectSequence.get('holiday' as never)).toBeNull();
		});
	});

	describe('has', () => {
		it('Returns `true` for existing values', () => {
			expect(stringSequence.has('sunday')).toBe(true);
			expect(objectSequence.has('sunday')).toBe(true);
			expect(objectSequence.has(FRIDAY_FROM_OBJECT_TEST_CASE)).toBe(true);
		});

		it('Returns `true` for structurally equal objects when key matches', () => {
			expect(objectSequence.has({ day: 'friday' })).toBe(true);
		});

		it('Returns `false` for missing values', () => {
			expect(stringSequence.has('holiday' as never)).toBe(false);
			expect(objectSequence.has('holiday' as never)).toBe(false);
		});

		it('Matches plain objects by their default string key without `toKey`', () => {
			expect(
				sequence([{ day: 'friday' }] as const).has({ day: 'friday' } as never),
			).toBe(true);
		});
	});

	describe('first', () => {
		it('Returns the first item in sequence', () => {
			expect(stringSequence.first()).toBe('sunday');
			expect(objectSequence.first()).toStrictEqual({ day: 'sunday' });
		});

		it('Returns `undefined` for an empty sequence', () => {
			expect(emptySequence.first()).toBeUndefined();
		});
	});

	describe('last', () => {
		it('Returns the last item in sequence', () => {
			expect(stringSequence.last()).toBe('saturday');
			expect(objectSequence.last()).toStrictEqual({ day: 'saturday' });
		});

		it('Returns `undefined` for an empty sequence', () => {
			expect(emptySequence.last()).toBeUndefined();
		});
	});

	describe('prev', () => {
		it('Returns the previous item and wraps to the end', () => {
			expect(stringSequence.prev('sunday')).toBe('saturday');
			expect(stringSequence.prev('monday')).toBe('sunday');
			expect(stringSequence.prev('saturday')).toBe('friday');
		});

		it('Accepts keys and object references', () => {
			expect(objectSequence.prev('sunday')).toStrictEqual({ day: 'saturday' });
			expect(objectSequence.prev({ day: 'sunday' })).toStrictEqual({ day: 'saturday' });
			expect(objectSequence.prev('monday')).toStrictEqual({ day: 'sunday' });
			expect(objectSequence.prev({ day: 'monday' })).toStrictEqual({ day: 'sunday' });
		});

		it('Returns default value when an item is not found', () => {
			expect(stringSequence.prev('holiday' as never, 'sunday')).toBe('sunday');
			expect(objectSequence.prev('holiday' as never, { day: 'fallback' } as never))
				.toStrictEqual({ day: 'fallback' });
		});

		it('Returns default value instead of wrapping', () => {
			expect(stringSequence.prev('sunday', 'fallback' as never)).toBe('fallback');
		});

		it('Returns `null` when an item is not found and default is not provided', () => {
			expect(stringSequence.prev('holiday' as never)).toBeNull();
			expect(objectSequence.prev('holiday' as never)).toBeNull();
		});
	});

	describe('next', () => {
		it('Returns the next item and wraps to the beginning', () => {
			expect(stringSequence.next('sunday')).toBe('monday');
			expect(stringSequence.next('monday')).toBe('tuesday');
			expect(stringSequence.next('saturday')).toBe('sunday');
		});

		it('Accepts keys and object references', () => {
			expect(objectSequence.next('sunday')).toStrictEqual({ day: 'monday' });
			expect(objectSequence.next({ day: 'sunday' })).toStrictEqual({ day: 'monday' });
			expect(objectSequence.next('monday')).toStrictEqual({ day: 'tuesday' });
			expect(objectSequence.next({ day: 'monday' })).toStrictEqual({ day: 'tuesday' });
		});

		it('Returns default value when an item is not found', () => {
			expect(stringSequence.next('holiday' as never, 'sunday')).toBe('sunday');
			expect(objectSequence.next('holiday' as never, { day: 'fallback' } as never))
				.toStrictEqual({ day: 'fallback' });
		});

		it('Returns default value instead of wrapping', () => {
			expect(stringSequence.next('saturday', 'fallback' as never)).toBe('fallback');
		});

		it('Returns `null` when an item is not found and default is not provided', () => {
			expect(stringSequence.next('holiday' as never)).toBeNull();
			expect(objectSequence.next('holiday' as never)).toBeNull();
		});
	});

	describe('findNext', () => {
		it('Returns the next item matching predicate without wrapping', () => {
			const input = extendedSequence.findNext(
				'sunday',
				(item) => !!item.value && 'bar' in item.value,
			);

			expect(input).toStrictEqual({ day: 'monday', value: { foo: 1, bar: 2 } });
		});

		it('Returns the next matching nullable item', () => {
			const input = extendedSequence.findNext('sunday', (item) => !item.value);

			expect(input).toStrictEqual({ day: 'friday', value: null });
		});

		it('Wraps when enabled', () => {
			const input = extendedSequence.findNext('friday', (item) => !!item.value, { wrap: true });

			expect(input).toStrictEqual({ day: 'sunday', value: { foo: 1 } });
		});

		it('Returns `null` when the current item is not found', () => {
			expect(extendedSequence.findNext('holiday' as never, () => true)).toBeNull();
		});

		it('Returns `null` when no next item matches', () => {
			expect(extendedSequence.findNext('wednesday', (item) => item.day === 'sunday')).toBeNull();
		});

		it('Does not match the current item when wrapping', () => {
			expect(singleItemSequence.findNext('monday', (item) => item === 'monday', { wrap: true })).toBeNull();
		});

		it('Returns `null` for an empty sequence', () => {
			expect(emptySequence.findNext('monday' as never, () => true)).toBeNull();
		});
	});

	describe('findPrev', () => {
		it('Returns the previous item matching predicate without wrapping', () => {
			const input = extendedSequence.findPrev(
				'thursday',
				(item) => !!item.value && 'bar' in item.value,
			);

			expect(input).toStrictEqual({ day: 'wednesday', value: { foo: 1, bar: 2 } });
		});

		it('Returns `null` when no previous item matches', () => {
			const input = extendedSequence.findPrev('thursday', (item) => !item.value);

			expect(input).toBeNull();
		});

		it('Wraps when enabled', () => {
			const input = extendedSequence.findPrev('monday', (item) => !item.value, { wrap: true });

			expect(input).toStrictEqual({ day: 'saturday', value: null });
		});

		it('Returns `null` when the current item is not found', () => {
			expect(extendedSequence.findPrev('holiday' as never, () => true)).toBeNull();
		});

		it('Returns `null` when no previous item matches even with wrapping disabled', () => {
			expect(extendedSequence.findPrev('monday', (item) => item.day === 'tuesday')).toBeNull();
		});

		it('Does not match the current item when wrapping', () => {
			expect(singleItemSequence.findPrev('monday', (item) => item === 'monday', { wrap: true })).toBeNull();
		});

		it('Returns `null` for an empty sequence', () => {
			expect(emptySequence.findPrev('monday' as never, () => true)).toBeNull();
		});
	});

	describe('spin', () => {
		it('Returns an item shifted by offset with wrapping', () => {
			expect(stringSequence.spin('sunday', 0)).toBe('sunday');
			expect(stringSequence.spin('sunday', 1)).toBe('monday');
			expect(stringSequence.spin('sunday', -1)).toBe('saturday');
			expect(stringSequence.spin('sunday', 8)).toBe('monday');
			expect(stringSequence.spin('sunday', -9)).toBe('friday');
		});

		it('Accepts keys and object references', () => {
			expect(objectSequence.spin('sunday', 0)).toStrictEqual({ day: 'sunday' });
			expect(objectSequence.spin({ day: 'sunday' }, 0)).toStrictEqual({ day: 'sunday' });
			expect(objectSequence.spin('sunday', 1)).toStrictEqual({ day: 'monday' });
			expect(objectSequence.spin({ day: 'sunday' }, 1)).toStrictEqual({ day: 'monday' });
			expect(objectSequence.spin('sunday', 8)).toStrictEqual({ day: 'monday' });
			expect(objectSequence.spin({ day: 'sunday' }, 8)).toStrictEqual({ day: 'monday' });
			expect(objectSequence.spin('sunday', -9)).toStrictEqual({ day: 'friday' });
			expect(objectSequence.spin({ day: 'sunday' }, -9)).toStrictEqual({ day: 'friday' });
		});

		it('Returns `null` when an item is not found', () => {
			expect(stringSequence.spin('holiday' as never, 1)).toBeNull();
			expect(objectSequence.spin('holiday' as never, 1)).toBeNull();
		});
	});
});
