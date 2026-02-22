import { assertNever } from './assert-never';

describe(assertNever, () => {
	it('Has the correct function type', () => {
		type Fn = (v: never, message?: string | ((value: unknown) => string)) => never;

		expectTypeOf(assertNever).toEqualTypeOf<Fn>();
	});

	it('Always throws with a default message', () => {
		expect(() => assertNever('oops' as never)).toThrowError(/Unexpected value: /);
	});

	it('Uses a custom message when provided as a string', () => {
		expect(() => assertNever(1 as never, 'Custom message')).toThrowError('Custom message');
	});

	it('Uses a custom message when provided as a function', () => {
		expect(() => assertNever(1 as never, (value) => `Custom message: ${value as string}`))
			.toThrowError('Custom message: 1');
	});

	it('Is useful for exhaustive checks (online demo)', () => {
		type Variant =
			| { kind: 'a'; value: number }
			| { kind: 'b'; text: string };

		const handle = (x: Variant): string => {
			switch (x.kind) {
				case 'a':
					return `A:${x.value}`;
				case 'b':
					return `B:${x.text}`;
				default:
					// If a new variant is added and not handled, this would be unreachable
					// and fail at compile-time. Here we only hit at runtime if misused.
					return assertNever(x);
			}
		};

		expect(handle({ kind: 'a', value: 1 })).toBe('A:1');
		expect(handle({ kind: 'b', text: 'x' })).toBe('B:x');
	});

	it('Formats objects in the default message', () => {
		let errorMessage = null;

		try {
			assertNever({ foo: 'bar' } as never);
		} catch (error) {
			errorMessage = (error as Error).message;
		}


		expect(errorMessage).toMatch(/{"foo":"bar"}/);
	});

	it('Handles unstringifiable value in the default message', () => {
		const cyclic: any = { foo: 'bar' };
		cyclic.self = cyclic;

		let errorMessage: string | null = null;

		try {
			assertNever(cyclic as never);
		} catch (error) {
			errorMessage = (error as Error).message;
		}

		expect(errorMessage).toMatch('[unstringifiable]');
	});
});
