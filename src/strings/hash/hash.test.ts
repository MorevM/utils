import { hash } from './hash';

describe('hash', () => {
	it('Generates the same hash for the same strings', () => {
		expect(hash('some-random-string')).toBe(hash('some-random-string'));
		expect(hash('ANOTHER-string!')).toBe(hash('ANOTHER-string!'));
	});

	it('Generates a different hash for different strings', () => {
		expect(hash('!!!')).not.toBe(hash('???'));
		expect(hash('ANOTHER-string')).not.toBe(hash('another-string'));
	});
});
