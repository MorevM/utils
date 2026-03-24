import { isTouch } from './is-touch';

describe(isTouch, () => {
	afterEach(() => {
		delete window.ontouchstart;
	});

	it('Returns `true` if a touch device is being used', () => {
		window.ontouchstart = null;

		expect(isTouch()).toBe(true);
	});

	it('Returns `false` if not a touch device used', () => {
		expect(isTouch()).toBe(false);
	});
});
