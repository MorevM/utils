/**
 * Object from entries. \
 * Suitable for typing `Object.fromEntries()`
 */
export type ObjectFromEntries<
	Key extends PropertyKey,
	Entries extends ReadonlyArray<readonly [Key, any]>,
> = {
	[K in Extract<Entries[number], readonly [Key, any]>[0]]: Extract<Entries[number], readonly [K, any]>[1]
};
