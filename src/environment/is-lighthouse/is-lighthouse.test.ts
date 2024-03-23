import { isLighthouse } from './is-lighthouse';

const LIGHTHOUSE_UA = 'Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4590.2 Mobile Safari/537.36 Chrome-Lighthouse';
const NON_LIGHTHOUSE_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36';


describe('is-lighthouse', () => {
	it('Returns `true` if the Lighthouse user agent is being used', () => {
		expect(isLighthouse(LIGHTHOUSE_UA)).toBe(true);
	});

	it('Returns `false` if not the Lighthouse user agent is being used', () => {
		expect(isLighthouse(NON_LIGHTHOUSE_UA)).toBe(false);
	});

	it('Returns `true` in browser if the argument is omitted and Lighthouse user agent is being used', () => {
		vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(LIGHTHOUSE_UA);

		expect(isLighthouse()).toBe(true);
	});

	it('Returns `false` on server side if the argument is omitted', () => {
		vi.spyOn(global as any, 'window', 'get').mockReturnValue(undefined);

		expect(isLighthouse()).toBe(false);
	});
});
