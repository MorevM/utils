import { isObject } from '../../guards';

type Options = {
	delay: number;
	leading?: boolean;
	trailing?: boolean;
};

const parseOptions = (optionsOrDelay?: Options | number): [number, boolean, boolean] => {
	if (isObject(optionsOrDelay)) {
		return [
			optionsOrDelay.delay ?? 0,
			optionsOrDelay.leading ?? true,
			optionsOrDelay.trailing ?? true,
		];
	}

	return [optionsOrDelay ?? 0, true, true];
};

export const throttle = (callback: Function, optionsOrDelay?: Options | number) => {
	const [delay, leading, trailing] = parseOptions(optionsOrDelay);

	let timeoutID: any = null;
	let cancelled: boolean;
	let lastExec = leading ? 0 : Date.now();

	const clearExistingTimeout = () => {
		if (!timeoutID) return;
		clearTimeout(timeoutID);
		timeoutID = null;
	};

	const cancel = () => {
		clearExistingTimeout();
		cancelled = true;
	};

	const trailingExec = (exec: Function) => {
		if (!trailing) return;
		clearExistingTimeout();
		timeoutID ||= setTimeout(exec, delay);
	};

	// eslint-disable-next-line func-style -- Needed to preserve `this` context
	function wrapper(...args: any[]) {
		if (cancelled) return;
		/* @ts-expect-error -- `this` can be typed in external call */
		const self = this;

		const exec = () => {
			lastExec = Date.now();
			callback.apply(self, args);
		};

		trailingExec(exec);

		const runTime = Date.now() - lastExec;
		if (runTime > delay) exec();
	}

	wrapper.cancel = cancel;

	return wrapper;
};
