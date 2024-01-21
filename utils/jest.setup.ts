import 'jest-date';

import { arrayOfLength } from '../src';

// Extending Jest `it` object and executing `test(name, fn, timeout)`
// multiple times makes the output too much verbose, so..
global.callTimes = <T extends number, F extends (...args: any) => any>(times: T, fn: F) => {
	return arrayOfLength(times).reduce<Array<ReturnType<F>>>((acc) => {
		acc.push(fn());
		return acc;
	}, []);
};
