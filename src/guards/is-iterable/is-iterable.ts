// eslint-disable-next-line unicorn/new-for-builtins
export const isIterable = (value: any) => Symbol.iterator in Object(value);
