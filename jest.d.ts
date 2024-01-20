import 'jest';
import 'jest-date';

declare global {
	/**
	 * Utility function to run the same callback multiple times. \
	 * The result of the execution of each iteration will be placed in the array.
	 *
	 * This allows better testing of utilities that rely on random (`arraySample`, `randomDate`, etc.).
	 *
	 * Alternatively, this can be done by extending the `Jest.It` object,
	 * but in that case the name of the test is printed for each test execution, making the `--verbose` option useless.
	 * I didn't find a way around this, so I declare a global function.
	 *
	 * @param   times   How many times to run the function.
	 * @param   fn      A function to run.
	 *
	 * @returns         An array of length `times` filled with the result of the function execution at each iteration.
	 */
	function callTimes<T extends number, F extends (...args: any) => any>(times: T, fn: F): Array<ReturnType<F>>;
}
