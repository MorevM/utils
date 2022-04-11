import { getScrollLimit } from './get-scroll-limit';

describe('getScrollLimit', () => {
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
		jest.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 3000);
		const result = getScrollLimit('x');

		expect(result).toBe(3000 - 1920);
	});

	it('Returns the maximum scroll value by y-axis if `axis` argument value is `y`', () => {
		jest.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);
		const result = getScrollLimit('y');

		expect(result).toBe(6000 - 1080);
	});

	it('Returns `0` if document scroll size is less than window size (typically because of scrollbar)', () => {
		jest.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 1903);
		jest.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 1063);

		const resultX = getScrollLimit('x');
		const resultY = getScrollLimit('y');

		expect(resultX).toBe(0);
		expect(resultY).toBe(0);
	});

	it('Returns both scroll limits if `axis` argument value is `both`', () => {
		jest.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 3000);
		jest.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);

		const result = getScrollLimit('both');

		expect(result).toStrictEqual({ x: 3000 - 1920, y: 6000 - 1080 });
	});
});
