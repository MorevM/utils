import { normalizeHex } from './normalize-hex';

describe('normalize-hex', () => {
	it('Returns `null` for invalid HEX strings', () => {
		expect(normalizeHex('')).toBeNull();
		expect(normalizeHex('foo')).toBeNull();
		expect(normalizeHex('000')).toBeNull();
		expect(normalizeHex('#00')).toBeNull();
		expect(normalizeHex('#00000')).toBeNull();
		expect(normalizeHex('#0000005')).toBeNull();
		expect(normalizeHex('#000000zz')).toBeNull();
		expect(normalizeHex('str#000')).toBeNull();
	});

	it('Normalizes the HEX string regardless of extra spaces', () => {
		expect(normalizeHex('  #000  ', { alphaChannel: 'always', notation: 'long' })).toBe('#000000ff');
		expect(normalizeHex('#f00 ', { alphaChannel: 'always', notation: 'long' })).toBe('#ff0000ff');
		expect(normalizeHex('  #0f0', { alphaChannel: 'always', notation: 'long' })).toBe('#00ff00ff');
		expect(normalizeHex('  #0f0c  ', { alphaChannel: 'always', notation: 'long' })).toBe('#00ff00cc');
	});

	describe('Long notation (default)', () => {
		it('Properly normalizes a HEX string if `alphaChannel` is `always` (default)', () => {
			expect(normalizeHex('#f00')).toBe('#ff0000ff');
			expect(normalizeHex('#00ff00')).toBe('#00ff00ff');
			expect(normalizeHex('#0000ff80')).toBe('#0000ff80');
			expect(normalizeHex('#000c')).toBe('#000000cc');
		});

		it('Properly normalizes a HEX string if `alphaChannel` value is `if-presented`', () => {
			expect(normalizeHex('#f00', { alphaChannel: 'if-presented' })).toBe('#ff0000');
			expect(normalizeHex('#00ff00', { alphaChannel: 'if-presented' })).toBe('#00ff00');
			expect(normalizeHex('#0000ff80', { alphaChannel: 'if-presented' })).toBe('#0000ff80');
			expect(normalizeHex('#000c', { alphaChannel: 'if-presented' })).toBe('#000000cc');
		});

		it('Properly normalizes a HEX string if `alphaChannel` value is `never`', () => {
			expect(normalizeHex('#f00', { alphaChannel: 'never' })).toBe('#ff0000');
			expect(normalizeHex('#00ff00', { alphaChannel: 'never' })).toBe('#00ff00');
			expect(normalizeHex('#0000ff80', { alphaChannel: 'never' })).toBe('#0000ff');
			expect(normalizeHex('#000c', { alphaChannel: 'never' })).toBe('#000000');
		});
	});

	describe('Short notation', () => {
		describe('`alphaChannel` is `always` (default)', () => {
			it('Properly normalizes a HEX string if it can be expressed in a short form', () => {
				expect(normalizeHex('#f00', { notation: 'short' })).toBe('#f00f');
				expect(normalizeHex('#00ff00', { notation: 'short' })).toBe('#0f0f');
				expect(normalizeHex('#000c', { notation: 'short' })).toBe('#000c');
			});

			it('Returns a HEX in a long form if it\'s not possible to express a resulting HEX in a short form', () => {
				expect(normalizeHex('#f1ff00', { notation: 'short' })).toBe('#f1ff00ff');
				expect(normalizeHex('#00fa00', { notation: 'short' })).toBe('#00fa00ff');
				expect(normalizeHex('#0000fa', { notation: 'short' })).toBe('#0000faff');
				expect(normalizeHex('#00000080', { notation: 'short' })).toBe('#00000080');
			});
		});

		describe('`alphaChannel` is `if-presented`', () => {
			it('Properly normalizes a HEX string if it can be expressed in a short form', () => {
				expect(normalizeHex('#f00', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#f00');
				expect(normalizeHex('#00ff00', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#0f0');
				expect(normalizeHex('#0000ff', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#00f');
				//
				expect(normalizeHex('#f00c', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#f00c');
				expect(normalizeHex('#00ffaaaa', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#0faa');
				expect(normalizeHex('#0000bbbb', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#00bb');
			});

			it('Returns a HEX in a long form if it\'s not possible to express a resulting HEX in a short form', () => {
				expect(normalizeHex('#f1ff00', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#f1ff00');
				expect(normalizeHex('#00fa00', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#00fa00');
				expect(normalizeHex('#0000fa', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#0000fa');
				//
				expect(normalizeHex('#00000080', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#00000080');
				expect(normalizeHex('#0f0000ff', { notation: 'short', alphaChannel: 'if-presented' })).toBe('#0f0000ff');
			});
		});

		describe('`alphaChannel` is `never`', () => {
			it('Properly normalizes a HEX string if it can be expressed in a short form', () => {
				expect(normalizeHex('#f00', { notation: 'short', alphaChannel: 'never' })).toBe('#f00');
				expect(normalizeHex('#00ff00', { notation: 'short', alphaChannel: 'never' })).toBe('#0f0');
				expect(normalizeHex('#0000ff', { notation: 'short', alphaChannel: 'never' })).toBe('#00f');
				//
				expect(normalizeHex('#f00c', { notation: 'short', alphaChannel: 'never' })).toBe('#f00');
				expect(normalizeHex('#00ffaaaa', { notation: 'short', alphaChannel: 'never' })).toBe('#0fa');
				expect(normalizeHex('#0000bbbb', { notation: 'short', alphaChannel: 'never' })).toBe('#00b');
			});

			it('Returns a HEX in a long form if it\'s not possible to express a resulting HEX in a short form', () => {
				expect(normalizeHex('#f1ff00', { notation: 'short', alphaChannel: 'never' })).toBe('#f1ff00');
				expect(normalizeHex('#00fa00', { notation: 'short', alphaChannel: 'never' })).toBe('#00fa00');
				expect(normalizeHex('#0000fa', { notation: 'short', alphaChannel: 'never' })).toBe('#0000fa');
			});
		});
	});
});
