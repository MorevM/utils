import { isMobile } from './is-mobile';

describe('is-mobile', () => {
	it('Returns `true` if Android device is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (Linux; Android 11; SM-A102U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36');

		expect(isMobile()).toBe(true);
	});

	it('Returns `true` if LG WebOS device is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (WebOS; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager');

		expect(isMobile()).toBe(true);
	});

	it('Returns `true` if iPhone is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');

		expect(isMobile()).toBe(true);
	});

	it('Returns `true` if iPad is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');

		expect(isMobile()).toBe(true);
	});

	it('Returns `true` if iPod is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1');

		expect(isMobile()).toBe(true);
	});

	it('Returns `true` if BlackBerry device is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (BlackBerry; U; BlackBerry 9700; en) AppleWebKit/534.8+ (KHTML, like Gecko) Version/6.0.0.668 Mobile Safari/534.8+');

		expect(isMobile()).toBe(true);
	});

	it('Returns `true` if IE Mobile browser is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; Microsoft; Lumia 950)');

		expect(isMobile()).toBe(true);
	});

	it('Returns `true` if Opera Mini browser is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Opera/9.80 (Android; Opera Mini/12.0.1987/37.7327; U; pl) Presto/2.12.423 Version/12.16');

		expect(isMobile()).toBe(true);
	});

	it('Returns `false` if not a mobile device used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get')
			.mockReturnValue('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36');

		expect(isMobile()).toBe(false);
	});
});
