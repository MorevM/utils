/**
 * Infers the element type of an array.
 */
export type ElementOf<T> = T extends Array<infer E> ? E : never;
