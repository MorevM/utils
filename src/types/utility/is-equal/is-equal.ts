/**
 * Returns a boolean for whether the two given types are equal.
 *
 * @see https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
 * @see https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796
 */
export type IsEqual<T, U> =
	(<G>() => G extends T ? 1 : 2) extends
	(<G>() => G extends U ? 1 : 2)
		? true
		: false;
