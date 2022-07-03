/**
 * Checks whether the current browser supports passive event listeners.
 *
 * @returns   Whether the browser supports passive events
 */
export const supportsPassive = () => {
	let supports = false;

	const options = Object.defineProperty({}, 'passive', {
		get() {
			supports = true;
			return null;
		},
	});

	try {
		const noop = () => {};
		window.addEventListener('test:passive', noop, options);
		window.removeEventListener('test:passive', noop, options);
	} catch {
		// no catch
	}

	return supports;
};
