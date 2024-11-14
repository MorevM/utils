import { isMotionless } from './is-motionless';

describe('is-motionless', () => {
	it('Returns `true` if user has requested the operating system to minimize the amount of animation or motion it uses', () => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: true,
				media: query,
				onchange: null,
			})),
		});

		expect(isMotionless()).toBe(true);
	});

	it('Returns `false` if user has not requested the operating system to minimize the amount of animation or motion it uses', () => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
			})),
		});

		expect(isMotionless()).toBe(false);
	});
});
