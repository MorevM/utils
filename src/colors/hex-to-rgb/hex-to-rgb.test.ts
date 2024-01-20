/* eslint-disable sonarjs/no-duplicate-string */
import { hexToRgb } from './hex-to-rgb';

describe('hex-to-rgb', () => {
	it('Returns `null` if a given value is not a valid HEX string', () => {
		expect(hexToRgb('')).toBeNull();
		expect(hexToRgb('000')).toBeNull();
		expect(hexToRgb('#00')).toBeNull();
		expect(hexToRgb('#00000')).toBeNull();
		expect(hexToRgb('#0000005')).toBeNull();
		expect(hexToRgb('string')).toBeNull();
		expect(hexToRgb('str#000')).toBeNull();
	});

	it('Can parse the HEX regardless of extra spaces or mixed case', () => {
		expect(hexToRgb('         #000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
		expect(hexToRgb('         #000     ')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
		expect(hexToRgb('         #FF00ff     ')).toStrictEqual({ r: 255, g: 0, b: 255, a: 1 });
		expect(hexToRgb('         #FF00ffAA     ')).toStrictEqual({ r: 255, g: 0, b: 255, a: .67 });
	});

	describe('object-short form (default)', () => {
		it('Returns an object containing `r`, `g`, `b` and `a` keys using default `alphaChannel` option value `always`', () => {
			expect(hexToRgb('#000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
			expect(hexToRgb('#00fc')).toStrictEqual({ r: 0, g: 0, b: 255, a: .8 });
			expect(hexToRgb('#000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
			expect(hexToRgb('#ff0000ff')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
			expect(hexToRgb('#00ff0000')).toStrictEqual({ r: 0, g: 255, b: 0, a: 0 });
			expect(hexToRgb('#0000ff80')).toStrictEqual({ r: 0, g: 0, b: 255, a: .5 });
			expect(hexToRgb('#000000b3')).toStrictEqual({ r: 0, g: 0, b: 0, a: .7 });

			expect(hexToRgb('#ff0000')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
			expect(hexToRgb('#f00')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
			expect(hexToRgb('#ff00001a')).toStrictEqual({ r: 255, g: 0, b: 0, a: .1 });
			expect(hexToRgb('#ff00008C')).toStrictEqual({ r: 255, g: 0, b: 0, a: .55 });
			expect(hexToRgb('#ff0000fc')).toStrictEqual({ r: 255, g: 0, b: 0, a: .99 });
			expect(hexToRgb('#ff0000ff')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
			expect(hexToRgb('#ff0000FF')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
		});

		it('Returns an object containing only `r`, `g`, `b` keys if `alphaChannel` option is `never`', () => {
			expect(hexToRgb('#000000', { alphaChannel: 'never' })).toStrictEqual({ r: 0, g: 0, b: 0 });
			expect(hexToRgb('#0000001a', { alphaChannel: 'never' })).toStrictEqual({ r: 0, g: 0, b: 0 });
			expect(hexToRgb('#000000b3', { alphaChannel: 'never' })).toStrictEqual({ r: 0, g: 0, b: 0 });

			expect(hexToRgb('#ff0000', { alphaChannel: 'never' })).toStrictEqual({ r: 255, g: 0, b: 0 });
			expect(hexToRgb('#ff00001a', { alphaChannel: 'never' })).toStrictEqual({ r: 255, g: 0, b: 0 });
			expect(hexToRgb('#ff0000ff', { alphaChannel: 'never' })).toStrictEqual({ r: 255, g: 0, b: 0 });
		});

		it('Conditionally adds `a` key if `alphaChannel` option is `if-presented`', () => {
			expect(hexToRgb('#000000', { alphaChannel: 'if-presented' })).toStrictEqual({ r: 0, g: 0, b: 0 });
			expect(hexToRgb('#0000001a', { alphaChannel: 'if-presented' })).toStrictEqual({ r: 0, g: 0, b: 0, a: .1 });
			expect(hexToRgb('#000000b3', { alphaChannel: 'if-presented' })).toStrictEqual({ r: 0, g: 0, b: 0, a: .7 });

			expect(hexToRgb('#ff0000', { alphaChannel: 'if-presented' })).toStrictEqual({ r: 255, g: 0, b: 0 });
			expect(hexToRgb('#ff00001a', { alphaChannel: 'if-presented' })).toStrictEqual({ r: 255, g: 0, b: 0, a: .1 });
			expect(hexToRgb('#ff0000ff', { alphaChannel: 'if-presented' })).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
		});
	});

	describe('object-long form', () => {
		it('Returns an object containing `red`, `green`, `blue` and `alpha` keys if `returnType` is `object-long`', () => {
			expect(hexToRgb('#000000', { returnType: 'object-long' })).toStrictEqual({ red: 0, green: 0, blue: 0, alpha: 1 });
			expect(hexToRgb('#0000001a', { returnType: 'object-long' })).toStrictEqual({ red: 0, green: 0, blue: 0, alpha: .1 });
			expect(hexToRgb('#000000b3', { returnType: 'object-long' })).toStrictEqual({ red: 0, green: 0, blue: 0, alpha: .7 });

			expect(hexToRgb('#ff0000', { returnType: 'object-long' })).toStrictEqual({ red: 255, green: 0, blue: 0, alpha: 1 });
			expect(hexToRgb('#ff00001a', { returnType: 'object-long' })).toStrictEqual({ red: 255, green: 0, blue: 0, alpha: .1 });
			expect(hexToRgb('#ff0000ff', { returnType: 'object-long' })).toStrictEqual({ red: 255, green: 0, blue: 0, alpha: 1 });
		});

		it('Returns an object containing only `red`, `green`, `blue` keys if if `returnType` option is `object-long` and `alphaChannel` option is `never`', () => {
			expect(hexToRgb('#000000', { returnType: 'object-long', alphaChannel: 'never' })).toStrictEqual({ red: 0, green: 0, blue: 0 });
			expect(hexToRgb('#0000001a', { returnType: 'object-long', alphaChannel: 'never' })).toStrictEqual({ red: 0, green: 0, blue: 0 });
			expect(hexToRgb('#000000b3', { returnType: 'object-long', alphaChannel: 'never' })).toStrictEqual({ red: 0, green: 0, blue: 0 });

			expect(hexToRgb('#ff0000', { returnType: 'object-long', alphaChannel: 'never' })).toStrictEqual({ red: 255, green: 0, blue: 0 });
			expect(hexToRgb('#ff00001a', { returnType: 'object-long', alphaChannel: 'never' })).toStrictEqual({ red: 255, green: 0, blue: 0 });
			expect(hexToRgb('#ff0000ff', { returnType: 'object-long', alphaChannel: 'never' })).toStrictEqual({ red: 255, green: 0, blue: 0 });
		});

		it('Conditionally adds `alpha` key if `alphaChannel` option is `if-presented`', () => {
			expect(hexToRgb('#000000', { returnType: 'object-long', alphaChannel: 'if-presented' })).toStrictEqual({ red: 0, green: 0, blue: 0 });
			expect(hexToRgb('#0000001a', { returnType: 'object-long', alphaChannel: 'if-presented' })).toStrictEqual({ red: 0, green: 0, blue: 0, alpha: .1 });
			expect(hexToRgb('#000000b3', { returnType: 'object-long', alphaChannel: 'if-presented' })).toStrictEqual({ red: 0, green: 0, blue: 0, alpha: .7 });

			expect(hexToRgb('#ff0000', { returnType: 'object-long', alphaChannel: 'if-presented' })).toStrictEqual({ red: 255, green: 0, blue: 0 });
			expect(hexToRgb('#ff00001a', { returnType: 'object-long', alphaChannel: 'if-presented' })).toStrictEqual({ red: 255, green: 0, blue: 0, alpha: .1 });
			expect(hexToRgb('#ff0000ff', { returnType: 'object-long', alphaChannel: 'if-presented' })).toStrictEqual({ red: 255, green: 0, blue: 0, alpha: 1 });
		});
	});

	describe('array form', () => {
		it('Returns a tuple containing 4 elements if `returnType` is `array`', () => {
			expect(hexToRgb('#000000', { returnType: 'array' })).toStrictEqual([0, 0, 0, 1]);
			expect(hexToRgb('#0000001a', { returnType: 'array' })).toStrictEqual([0, 0, 0, .1]);
			expect(hexToRgb('#000000b3', { returnType: 'array' })).toStrictEqual([0, 0, 0, .7]);

			expect(hexToRgb('#ff0000', { returnType: 'array' })).toStrictEqual([255, 0, 0, 1]);
			expect(hexToRgb('#ff00001a', { returnType: 'array' })).toStrictEqual([255, 0, 0, .1]);
			expect(hexToRgb('#ff0000ff', { returnType: 'array' })).toStrictEqual([255, 0, 0, 1]);
		});

		it('Returns a tuple containing 3 elements if `returnType` option is `array` and `useAlphaChannel` option is `false`', () => {
			expect(hexToRgb('#000000', { returnType: 'array', alphaChannel: 'never' })).toStrictEqual([0, 0, 0]);
			expect(hexToRgb('#0000001a', { returnType: 'array', alphaChannel: 'never' })).toStrictEqual([0, 0, 0]);
			expect(hexToRgb('#000000b3', { returnType: 'array', alphaChannel: 'never' })).toStrictEqual([0, 0, 0]);

			expect(hexToRgb('#f00', { returnType: 'array', alphaChannel: 'never' })).toStrictEqual([255, 0, 0]);
			expect(hexToRgb('#ff00', { returnType: 'array', alphaChannel: 'never' })).toStrictEqual([255, 255, 0]);
			expect(hexToRgb('#ff00001a', { returnType: 'array', alphaChannel: 'never' })).toStrictEqual([255, 0, 0]);
			expect(hexToRgb('#ff0000ff', { returnType: 'array', alphaChannel: 'never' })).toStrictEqual([255, 0, 0]);
		});

		it('Conditionally adds fourth element if `alphaChannel` option is `if-presented`', () => {
			expect(hexToRgb('#000', { returnType: 'array', alphaChannel: 'if-presented' })).toStrictEqual([0, 0, 0]);
			expect(hexToRgb('#000000', { returnType: 'array', alphaChannel: 'if-presented' })).toStrictEqual([0, 0, 0]);
			expect(hexToRgb('#0000001a', { returnType: 'array', alphaChannel: 'if-presented' })).toStrictEqual([0, 0, 0, .1]);
			expect(hexToRgb('#000000b3', { returnType: 'array', alphaChannel: 'if-presented' })).toStrictEqual([0, 0, 0, .7]);

			expect(hexToRgb('#ff0000', { returnType: 'array', alphaChannel: 'if-presented' })).toStrictEqual([255, 0, 0]);
			expect(hexToRgb('#ff00001a', { returnType: 'array', alphaChannel: 'if-presented' })).toStrictEqual([255, 0, 0, .1]);
			expect(hexToRgb('#ff0000ff', { returnType: 'array', alphaChannel: 'if-presented' })).toStrictEqual([255, 0, 0, 1]);
		});
	});

	describe('css-legacy form', () => {
		it('Returns a valid CSS string if `returnType` is `css-legacy`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-legacy' })).toBe('rgba(0, 0, 0, 100%)');
			expect(hexToRgb('#0000001a', { returnType: 'css-legacy' })).toBe('rgba(0, 0, 0, 10%)');
			expect(hexToRgb('#000000b3', { returnType: 'css-legacy' })).toBe('rgba(0, 0, 0, 70%)');

			expect(hexToRgb('#ff0000', { returnType: 'css-legacy' })).toBe('rgba(255, 0, 0, 100%)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-legacy' })).toBe('rgba(255, 0, 0, 10%)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-legacy' })).toBe('rgba(255, 0, 0, 100%)');
		});

		it('Returns a valid CSS string containing number for alpha channel if `cssAlphaNotation` is `number`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-legacy', cssAlphaNotation: 'number' })).toBe('rgba(0, 0, 0, 1)');
			expect(hexToRgb('#0000001a', { returnType: 'css-legacy', cssAlphaNotation: 'number' })).toBe('rgba(0, 0, 0, 0.1)');
			expect(hexToRgb('#000000b3', { returnType: 'css-legacy', cssAlphaNotation: 'number' })).toBe('rgba(0, 0, 0, 0.7)');

			expect(hexToRgb('#ff0000', { returnType: 'css-legacy', cssAlphaNotation: 'number' })).toBe('rgba(255, 0, 0, 1)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-legacy', cssAlphaNotation: 'number' })).toBe('rgba(255, 0, 0, 0.1)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-legacy', cssAlphaNotation: 'number' })).toBe('rgba(255, 0, 0, 1)');
		});

		it('Returns a CSS string without alpha channel if `alphaChannel` is `never`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-legacy', alphaChannel: 'never' })).toBe('rgb(0, 0, 0)');
			expect(hexToRgb('#0000001a', { returnType: 'css-legacy', alphaChannel: 'never' })).toBe('rgb(0, 0, 0)');
			expect(hexToRgb('#000000b3', { returnType: 'css-legacy', alphaChannel: 'never' })).toBe('rgb(0, 0, 0)');

			expect(hexToRgb('#ff0000', { returnType: 'css-legacy', alphaChannel: 'never' })).toBe('rgb(255, 0, 0)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-legacy', alphaChannel: 'never' })).toBe('rgb(255, 0, 0)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-legacy', alphaChannel: 'never' })).toBe('rgb(255, 0, 0)');
		});

		it('Conditionally switches between `rgb` and `rgba` if `alphaChannel` option is `if-presented`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-legacy', alphaChannel: 'if-presented' })).toBe('rgb(0, 0, 0)');
			expect(hexToRgb('#0000001a', { returnType: 'css-legacy', alphaChannel: 'if-presented' })).toBe('rgba(0, 0, 0, 10%)');
			expect(hexToRgb('#000000b3', { returnType: 'css-legacy', alphaChannel: 'if-presented' })).toBe('rgba(0, 0, 0, 70%)');

			expect(hexToRgb('#ff0000', { returnType: 'css-legacy', alphaChannel: 'if-presented' })).toBe('rgb(255, 0, 0)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-legacy', alphaChannel: 'if-presented' })).toBe('rgba(255, 0, 0, 10%)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-legacy', alphaChannel: 'if-presented' })).toBe('rgba(255, 0, 0, 100%)');
		});
	});

	describe('css-modern form', () => {
		it('Returns a valid CSS string if `returnType` is `css-modern`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-modern' })).toBe('rgba(0 0 0 / 100%)');
			expect(hexToRgb('#0000001a', { returnType: 'css-modern' })).toBe('rgba(0 0 0 / 10%)');
			expect(hexToRgb('#000000b3', { returnType: 'css-modern' })).toBe('rgba(0 0 0 / 70%)');

			expect(hexToRgb('#ff0000', { returnType: 'css-modern' })).toBe('rgba(255 0 0 / 100%)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-modern' })).toBe('rgba(255 0 0 / 10%)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-modern' })).toBe('rgba(255 0 0 / 100%)');
		});

		it('Returns a valid CSS string containing number for alpha channel if `cssAlphaNotation` is `number`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-modern', cssAlphaNotation: 'number' })).toBe('rgba(0 0 0 / 1)');
			expect(hexToRgb('#0000001a', { returnType: 'css-modern', cssAlphaNotation: 'number' })).toBe('rgba(0 0 0 / 0.1)');
			expect(hexToRgb('#000000b3', { returnType: 'css-modern', cssAlphaNotation: 'number' })).toBe('rgba(0 0 0 / 0.7)');

			expect(hexToRgb('#ff0000', { returnType: 'css-modern', cssAlphaNotation: 'number' })).toBe('rgba(255 0 0 / 1)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-modern', cssAlphaNotation: 'number' })).toBe('rgba(255 0 0 / 0.1)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-modern', cssAlphaNotation: 'number' })).toBe('rgba(255 0 0 / 1)');
		});

		it('Returns a CSS string without alpha channel if `alphaChannel` is `never`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-modern', alphaChannel: 'never' })).toBe('rgb(0 0 0)');
			expect(hexToRgb('#0000001a', { returnType: 'css-modern', alphaChannel: 'never' })).toBe('rgb(0 0 0)');
			expect(hexToRgb('#000000b3', { returnType: 'css-modern', alphaChannel: 'never' })).toBe('rgb(0 0 0)');

			expect(hexToRgb('#ff0000', { returnType: 'css-modern', alphaChannel: 'never' })).toBe('rgb(255 0 0)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-modern', alphaChannel: 'never' })).toBe('rgb(255 0 0)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-modern', alphaChannel: 'never' })).toBe('rgb(255 0 0)');
		});

		it('Conditionally switches between `rgb` and `rgba` if `alphaChannel` option is `if-presented`', () => {
			expect(hexToRgb('#000000', { returnType: 'css-modern', alphaChannel: 'if-presented' })).toBe('rgb(0 0 0)');
			expect(hexToRgb('#0000001a', { returnType: 'css-modern', alphaChannel: 'if-presented' })).toBe('rgba(0 0 0 / 10%)');
			expect(hexToRgb('#000000b3', { returnType: 'css-modern', alphaChannel: 'if-presented' })).toBe('rgba(0 0 0 / 70%)');

			expect(hexToRgb('#ff0', { returnType: 'css-modern', alphaChannel: 'if-presented' })).toBe('rgb(255 255 0)');
			expect(hexToRgb('#ff0000', { returnType: 'css-modern', alphaChannel: 'if-presented' })).toBe('rgb(255 0 0)');
			expect(hexToRgb('#ff00001a', { returnType: 'css-modern', alphaChannel: 'if-presented' })).toBe('rgba(255 0 0 / 10%)');
			expect(hexToRgb('#ff0000ff', { returnType: 'css-modern', alphaChannel: 'if-presented' })).toBe('rgba(255 0 0 / 100%)');
		});
	});
});
