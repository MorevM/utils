import { isOSX } from './is-osx';

describe('is-osx', () => {
	it('Returns `true` if a MacOS device is being used', () => {
		vi.spyOn(window.navigator, 'platform', 'get')
			.mockReturnValue('MacIntel');

		expect(isOSX()).toBe(true);
	});

	it('Returns `true` if iPhone is being used', () => {
		vi.spyOn(window.navigator, 'platform', 'get')
			.mockReturnValue('iPhone');

		expect(isOSX()).toBe(true);
	});

	it('Returns `true` if iPad is being used', () => {
		vi.spyOn(window.navigator, 'platform', 'get')
			.mockReturnValue('iPad');

		expect(isOSX()).toBe(true);
	});

	it('Returns `true` if iPod is being used', () => {
		vi.spyOn(window.navigator, 'platform', 'get')
			.mockReturnValue('iPod');

		expect(isOSX()).toBe(true);
	});

	it('Returns `false` if not an iOS device used', () => {
		vi.spyOn(window.navigator, 'platform', 'get')
			.mockReturnValue('Win32');

		expect(isOSX()).toBe(false);
	});
});
