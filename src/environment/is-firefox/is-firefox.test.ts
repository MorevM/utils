import { isFirefox } from './is-firefox';

describe('is-firefox', () => {
	it('Returns `true` if a Firefox browser is being used', () => {
		jest.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0');

		expect(isFirefox()).toBe(true);
	});

	it('Returns `false` if not a Firefox browser used', () => {
		jest.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36');

		expect(isFirefox()).toBe(false);
	});
});
