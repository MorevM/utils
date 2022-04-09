/**
 * Delays a given function invoking until a given `delay` time have elapsed since the last time a function was invoked.
 *
 * @param     {Function}   fn            A function being invoked.
 * @param     {number}     [delay]       Timeout between function invoking, ms.
 * @param     {boolean}    [immediate]   Whether to invoke a given function immediately after initialization.
 *
 * @returns   {Function}
 */
export const debounce = <F extends (...args: any[]) => any>(
	fn: F,
	delay = 60,
	immediate = false,
) => {
	let timer: ReturnType<typeof setTimeout>;
	let started = false;

	const debounced = function (this: any, ...args: Parameters<F>) {
		if (!started) {
			if (immediate) fn.apply(this, args);
			started = true;
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
			started = false;
		}, delay);
	};

	return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
