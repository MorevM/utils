/**
 * A very simple alternative of `pipeline operator` working with single return value
 *
 * @see https://github.com/tc39/proposal-pipeline-operator
 *
 * @example
 * const func1 = (v) => v + '-baz';
 * const func2 = (v) => v + '-bar';
 *
 * compose(func1, func2)('foo') -> func1(func2('foo')) -> 'foo-bar-baz'
 *
 * @param   functions   Functions to proccess value with.
 *
 * @returns               Composed function
 */
export const compose = (...functions: readonly Function[]): any => (value: any) =>
	[...functions].reverse().reduce((acc, curr) => (acc = curr(acc)), value);
