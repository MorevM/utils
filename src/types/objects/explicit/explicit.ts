/**
 * Makes keys of a given type / union type visible in editor hints.
 */
export type Explicit<T> = { [KeyType in keyof T]: T[KeyType] };
