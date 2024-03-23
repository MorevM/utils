import { getScrollLimit } from './get-scroll-limit';

describe('get-scroll-limit', () => {
	const windowSize = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	beforeAll(() => {
		window.innerWidth = 1920;
		window.innerHeight = 1080;
		window.dispatchEvent(new Event('resize'));
	});

	afterAll(() => {
		window.innerWidth = windowSize.width;
		window.innerHeight = windowSize.height;
		window.dispatchEvent(new Event('resize'));
	});

	it('Returns the maximum scroll value by x-axis if `axis` argument value is `x`', () => {
		vi.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 3000);

		expect(getScrollLimit('x')).toBe(3000 - 1920);
	});

	it('Returns the maximum scroll value by y-axis if `axis` argument value is `y`', () => {
		vi.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);

		expect(getScrollLimit('y')).toBe(6000 - 1080);
	});

	it('Returns the maximum scroll value by y-axis if `axis` argument is omitted', () => {
		vi.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);

		expect(getScrollLimit()).toBe(6000 - 1080);
	});

	it('Returns `0` if document scroll size is less than window size (typically because of scrollbar)', () => {
		vi.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 1903);
		vi.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 1063);

		expect(getScrollLimit('x')).toBe(0);
		expect(getScrollLimit('y')).toBe(0);
	});

	it('Returns both scroll limits if `axis` argument value is `both`', () => {
		vi.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 3000);
		vi.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);

		expect(getScrollLimit('both')).toStrictEqual({ x: 3000 - 1920, y: 6000 - 1080 });
	});
});
