import type { Constructor } from '../constructor/constructor';

export type Class<T, Args extends any[] = any[]> = Constructor<T, Args> & { prototype: T };
