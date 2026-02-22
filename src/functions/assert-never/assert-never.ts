import { isFunction, isString } from '../../guards';

/**
 * Asserts that a code path is unreachable by requiring a value of type `never`.
 *
 * Typical usage is to enforce exhaustiveness in `switch` statements or
 * discriminated unions: if a new variant is added and not handled, this function
 * ensures exhaustiveness at compile-time and throws at runtime if reached
 *
 * @example
 * type Shape =
 * 	| { kind: 'circle'; radius: number }
 * 	| { kind: 'square'; size: number };
 *
 * function area(s: Shape): number {
 * 	switch (s.kind) {
 * 		case 'circle':
 * 			return Math.PI * s.radius * s.radius;
 * 		case 'square':
 * 			return s.size * s.size;
 * 		default:
 * 			// If a new kind is added and not handled above, this line won't compile.
 * 			return assertNever(s, 'Unhandled Shape variant');
 * 	}
 * }
 *
 * @param   value     A value that must be of type `never`.
 * @param   message   Optional custom error message or a generator of such message.
 *
 * @throws            Always throws to signal unreachable code was executed.
 */
export const assertNever = (
	value: never,
	message?: string | ((value: unknown) => string),
): never => {
	if (isFunction(message)) {
		throw new Error(message(value));
	}

	if (isString(message)) {
		throw new Error(message);
	}

	// `value` is `never` at the type level, but we still try to surface something
	// readable at runtime in case of misuse (e.g., `as never` cast).
	const details = (() => {
		try {
			return JSON.stringify(value);
		} catch {
			return '[unstringifiable]';
		}
	})();

	throw new Error(`Unexpected value: ${details}`);
};
