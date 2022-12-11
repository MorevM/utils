/**
 * Object from entries. \
 * Suitable for typing `Object.fromEntries()`
 */
export type ObjectFromEntries<
	Key extends PropertyKey,
	Entries extends ReadonlyArray<readonly [Key, unknown]>,
> = {
	[K in Extract<Entries[number], readonly [Key, unknown]>[0]]: Extract<Entries[number], readonly [K, unknown]>[1]
};
