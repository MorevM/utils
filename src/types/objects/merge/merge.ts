/**
 * A simple one-level depth type merge.
 */
export type Merge<T, R> = Omit<T, keyof R> & R;
