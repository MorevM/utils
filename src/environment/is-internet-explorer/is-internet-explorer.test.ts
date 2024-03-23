import { isInternetExplorer } from './is-internet-explorer';

describe('is-internet-explorer', () => {
	it('Returns `true` if IE 11 is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko');

		expect(isInternetExplorer()).toBe(true);
	});

	it('Returns `true` if IE 10 is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');

		expect(isInternetExplorer()).toBe(true);
	});

	it('Returns `true` if IE 9 is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)');

		expect(isInternetExplorer()).toBe(true);
	});

	it('Returns `true` if IE 8 is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('	Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)');

		expect(isInternetExplorer()).toBe(true);
	});

	it('Returns `false` if not a legacy Internet Explorer browser used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36');

		expect(isInternetExplorer()).toBe(false);
	});
});
