/* eslint-disable jest/max-nested-describe */
import { rgbToHex } from './rgb-to-hex';

describe('rgb-to-hex', () => {
	describe('String', () => {
		it('Returns `null` in case of invalid input', () => {
			expect(rgbToHex('bgr(0, 0, 0)')).toBeNull();
			expect(rgbToHex('    rgb')).toBeNull();
			expect(rgbToHex('string')).toBeNull();
			expect(rgbToHex('rgb(0,0,0,0,0)')).toBeNull();
			expect(rgbToHex('rgb(Infinity,Infinity,0)')).toBeNull();
			expect(rgbToHex('rgb(-1,0,0)')).toBeNull();
		});

		it('Parses CSS string regardless of extra spaces', () => {
			expect(rgbToHex('     rgb(  0,     0, 0  )   ', { alphaChannel: 'always' })).toBe('#000000ff');
			expect(rgbToHex('rgb(\t\t255, 0, 0)', { alphaChannel: 'always' })).toBe('#ff0000ff');
			expect(rgbToHex('rgba( 255, \n\n 0  , 0    ,   100%  );   ', { alphaChannel: 'always' })).toBe('#ff0000ff');
			expect(rgbToHex('rgba( 255, \n\n 0  , 0    ,   .5  );   ', { alphaChannel: 'always' })).toBe('#ff000080');
			expect(rgbToHex('rgba( 255    0  0    /   .5  );   ', { alphaChannel: 'always' })).toBe('#ff000080');
			expect(rgbToHex('  rgba( 255    0  0    /   50%  );   ', { alphaChannel: 'always' })).toBe('#ff000080');
		});

		describe('HEX string', () => {
			it('Returns HEX with transformations applied, if HEX was passed originally', () => {
				expect(rgbToHex('#000')).toBe('#000000ff');
				expect(rgbToHex('#0000')).toBe('#00000000');
				expect(rgbToHex('#ff0000')).toBe('#ff0000ff');
				expect(rgbToHex('#ff000080')).toBe('#ff000080');
				//
				expect(rgbToHex('#000', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('#0000', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('#ff0000', { alphaChannel: 'never' })).toBe('#ff0000');
				expect(rgbToHex('#ff000080', { alphaChannel: 'never' })).toBe('#ff0000');
				//
				expect(rgbToHex('#000', { alphaChannel: 'if-presented' })).toBe('#000000');
				expect(rgbToHex('#0000', { alphaChannel: 'if-presented' })).toBe('#00000000');
				expect(rgbToHex('#ff0000', { alphaChannel: 'if-presented' })).toBe('#ff0000');
				expect(rgbToHex('#ff000080', { alphaChannel: 'if-presented' })).toBe('#ff000080');
			});

			it('Respects `preferableNotation` option with the value `short`', () => {
				expect(rgbToHex('#000', { preferableNotation: 'short' })).toBe('#000f');
				expect(rgbToHex('#0000', { preferableNotation: 'short' })).toBe('#0000');
				expect(rgbToHex('#ff0000', { preferableNotation: 'short' })).toBe('#f00f');
				expect(rgbToHex('#ff000080', { preferableNotation: 'short' })).toBe('#ff000080');
				//
				expect(rgbToHex('#000', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('#0000', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('#ff0000', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#f00');
				expect(rgbToHex('#ff000080', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#f00');
				//
				expect(rgbToHex('#000', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('#0000', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0000');
				expect(rgbToHex('#ff0000', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f00');
				expect(rgbToHex('#ff000080', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#ff000080');
			});

			it('Respects `preferableNotation` option with the value `long`', () => {
				expect(rgbToHex('#000', { preferableNotation: 'long' })).toBe('#000000ff');
				expect(rgbToHex('#0000', { preferableNotation: 'long' })).toBe('#00000000');
				expect(rgbToHex('#ff0000', { preferableNotation: 'long' })).toBe('#ff0000ff');
				expect(rgbToHex('#ff000080', { preferableNotation: 'long' })).toBe('#ff000080');
				//
				expect(rgbToHex('#000', { alphaChannel: 'never', preferableNotation: 'long' })).toBe('#000000');
				expect(rgbToHex('#0000', { alphaChannel: 'never', preferableNotation: 'long' })).toBe('#000000');
				expect(rgbToHex('#ff0000', { alphaChannel: 'never', preferableNotation: 'long' })).toBe('#ff0000');
				expect(rgbToHex('#ff000080', { alphaChannel: 'never', preferableNotation: 'long' })).toBe('#ff0000');
				//
				expect(rgbToHex('#000', { alphaChannel: 'if-presented', preferableNotation: 'long' })).toBe('#000000');
				expect(rgbToHex('#0000', { alphaChannel: 'if-presented', preferableNotation: 'long' })).toBe('#00000000');
				expect(rgbToHex('#ff0000', { alphaChannel: 'if-presented', preferableNotation: 'long' })).toBe('#ff0000');
				expect(rgbToHex('#ff000080', { alphaChannel: 'if-presented', preferableNotation: 'long' })).toBe('#ff000080');
			});
		});

		describe('Legacy CSS string notation', () => {
			it('Adds alpha channel information if `alphaChannel` option value is `always` (default)', () => {
				expect(rgbToHex('rgb(0, 0, 0)', { alphaChannel: 'always' })).toBe('#000000ff');
				expect(rgbToHex('rgb(255, 0, 0)', { alphaChannel: 'always' })).toBe('#ff0000ff');
				expect(rgbToHex('rgb(0, 129, 204)', { alphaChannel: 'always' })).toBe('#0081ccff');
				//
				expect(rgbToHex('rgb(0, 0, 0)', { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#000f');
				expect(rgbToHex('rgb(255, 0, 0)', { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f00f');
				expect(rgbToHex('rgb(0, 129, 204)', { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#0081ccff');
			});

			it('Removes alpha channel information if `alphaChannel` option value is `never`', () => {
				expect(rgbToHex('rgb(0, 0, 0, 50%)', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('rgb(0, 0, 0, .5)', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('rgba(0, 0, 0, 50%)', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('rgba(0, 0, 0, .5)', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('rgba(0, 0, 0, 0)', { alphaChannel: 'never' })).toBe('#000000');
				//
				expect(rgbToHex('rgb(0, 0, 0, 50%)', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('rgb(0, 0, 0, .5)', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
			});

			it('Conditionall adds/removes alpha channel information if `alphaChannel` option value is `if-presented`', () => {
				expect(rgbToHex('rgb(0, 0, 0, 50%)', { alphaChannel: 'if-presented' })).toBe('#00000080');
				expect(rgbToHex('rgb(0, 0, 0, .5)', { alphaChannel: 'if-presented' })).toBe('#00000080');
				expect(rgbToHex('rgb(0, 0, 0, 0)', { alphaChannel: 'if-presented' })).toBe('#00000000');
				expect(rgbToHex('rgb(0, 0, 0)', { alphaChannel: 'if-presented' })).toBe('#000000');
				expect(rgbToHex('rgba(0, 0, 0)', { alphaChannel: 'if-presented' })).toBe('#000000');
				//
				expect(rgbToHex('rgb(0, 0, 0, 50%)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#00000080');
				expect(rgbToHex('rgb(0, 0, 0, .5)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#00000080');
				expect(rgbToHex('rgb(0, 0, 0, 0)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0000');
				expect(rgbToHex('rgb(0, 0, 0)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('rgba(0, 0, 0)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#000');
			});
		});

		describe('Modern CSS string notation', () => {
			it('Adds alpha channel information if `alphaChannel` option value is `always` (default)', () => {
				expect(rgbToHex('rgb(0 0 0)', { alphaChannel: 'always' })).toBe('#000000ff');
				expect(rgbToHex('rgb(255 0 0)', { alphaChannel: 'always' })).toBe('#ff0000ff');
				expect(rgbToHex('rgb(0 129 204)', { alphaChannel: 'always' })).toBe('#0081ccff');
				//
				expect(rgbToHex('rgb(0 0 0)', { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#000f');
				expect(rgbToHex('rgb(255 0 0)', { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f00f');
				expect(rgbToHex('rgb(0 129 204)', { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#0081ccff');
			});

			it('Removes alpha channel information if `alphaChannel` option value is `never`', () => {
				expect(rgbToHex('rgb(0 0 0 / 50%)', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('rgb(0 0 0 / .5)', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('rgba(0 0 0 / 50%)', { alphaChannel: 'never' })).toBe('#000000');
				expect(rgbToHex('rgba(0 0 0 / .5)', { alphaChannel: 'never' })).toBe('#000000');
				//
				expect(rgbToHex('rgb(0 0 0 / 50%)', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('rgb(0 0 0 / .5)', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('rgba(0 0 0 / 50%)', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('rgba(0 0 0 / .5)', { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
			});

			it('Conditionall adds/removes alpha channel information if `alphaChannel` option value is `if-presented`', () => {
				expect(rgbToHex('rgb(0 0 0 / 50%)', { alphaChannel: 'if-presented' })).toBe('#00000080');
				expect(rgbToHex('rgb(0 0 0 / .5)', { alphaChannel: 'if-presented' })).toBe('#00000080');
				expect(rgbToHex('rgb(0 0 0 / 0)', { alphaChannel: 'if-presented' })).toBe('#00000000');
				expect(rgbToHex('rgb(0 0 0 / 0%)', { alphaChannel: 'if-presented' })).toBe('#00000000');
				expect(rgbToHex('rgb(0 0 0)', { alphaChannel: 'if-presented' })).toBe('#000000');
				expect(rgbToHex('rgba(0 0 0)', { alphaChannel: 'if-presented' })).toBe('#000000');
				//
				expect(rgbToHex('rgb(0 0 0 / 50%)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#00000080');
				expect(rgbToHex('rgb(0 0 0 / .5)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#00000080');
				expect(rgbToHex('rgb(0 0 0 / 0)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0000');
				expect(rgbToHex('rgb(0 0 0 / 0%)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0000');
				expect(rgbToHex('rgb(0 0 0)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#000');
				expect(rgbToHex('rgba(0 0 0)', { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#000');
			});
		});
	});

	describe('Tuple', () => {
		it('Returns `null` in case of invalid input', () => {
			expect(rgbToHex([-1, 0, 0])).toBeNull();
			expect(rgbToHex([0, 0, 0.5])).toBeNull();
			expect(rgbToHex([0, 256, 0])).toBeNull();
			expect(rgbToHex([0, 0, Infinity])).toBeNull();
			//
			expect(rgbToHex([0, 0, 0, Infinity])).toBeNull();
			expect(rgbToHex([255, 0, 0, -1])).toBeNull();
			expect(rgbToHex([0, 255, 0, 1.1])).toBeNull();
		});

		it('Adds alpha channel information if `alphaChannel` option value is `always` (default)', () => {
			expect(rgbToHex([255, 0, 0], { alphaChannel: 'always' })).toBe('#ff0000ff');
			expect(rgbToHex([0, 255, 0], { alphaChannel: 'always' })).toBe('#00ff00ff');
			expect(rgbToHex([0, 0, 255], { alphaChannel: 'always' })).toBe('#0000ffff');
			//
			expect(rgbToHex([0, 0, 0, 1], { alphaChannel: 'always' })).toBe('#000000ff');
			expect(rgbToHex([255, 0, 0, 0], { alphaChannel: 'always' })).toBe('#ff000000');
			expect(rgbToHex([0, 255, 0, .5], { alphaChannel: 'always' })).toBe('#00ff0080');
			expect(rgbToHex([0, 255, 255, .99], { alphaChannel: 'always' })).toBe('#00fffffc');
			// //
			expect(rgbToHex([255, 0, 0], { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f00f');
			expect(rgbToHex([0, 255, 0], { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#0f0f');
			expect(rgbToHex([0, 0, 255], { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#00ff');
			//
			expect(rgbToHex([0, 0, 0, 1], { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#000f');
			expect(rgbToHex([255, 0, 0, 0], { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f000');
			expect(rgbToHex([0, 255, 0, .5], { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#00ff0080');
			expect(rgbToHex([0, 255, 255, .99], { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#00fffffc');
		});

		it('Removes alpha channel information if `alphaChannel` option value is `never`', () => {
			expect(rgbToHex([0, 0, 0], { alphaChannel: 'never' })).toBe('#000000');
			expect(rgbToHex([0, 0, 0, 1], { alphaChannel: 'never' })).toBe('#000000');
			expect(rgbToHex([255, 0, 0, 0], { alphaChannel: 'never' })).toBe('#ff0000');
			expect(rgbToHex([0, 255, 0, .5], { alphaChannel: 'never' })).toBe('#00ff00');
			expect(rgbToHex([0, 255, 255, .99], { alphaChannel: 'never' })).toBe('#00ffff');
			//
			expect(rgbToHex([0, 0, 0], { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#000');
			expect(rgbToHex([255, 0, 0, 0], { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#f00');
			expect(rgbToHex([255, 123, 0, .5], { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#ff7b00');
		});

		it('Conditionally adds/removes alpha channel information if `alphaChannel` option value is `if-presented`', () => {
			expect(rgbToHex([0, 0, 0], { alphaChannel: 'if-presented' })).toBe('#000000');
			expect(rgbToHex([255, 0, 0], { alphaChannel: 'if-presented' })).toBe('#ff0000');
			expect(rgbToHex([0, 255, 0], { alphaChannel: 'if-presented' })).toBe('#00ff00');
			expect(rgbToHex([0, 255, 255], { alphaChannel: 'if-presented' })).toBe('#00ffff');
			//
			expect(rgbToHex([0, 0, 0, 1], { alphaChannel: 'if-presented' })).toBe('#000000ff');
			expect(rgbToHex([255, 0, 0, .5], { alphaChannel: 'if-presented' })).toBe('#ff000080');
			expect(rgbToHex([0, 255, 0, 0], { alphaChannel: 'if-presented' })).toBe('#00ff0000');
			expect(rgbToHex([0, 255, 255, .1], { alphaChannel: 'if-presented' })).toBe('#00ffff1a');
			// //
			expect(rgbToHex([0, 0, 0], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#000');
			expect(rgbToHex([255, 0, 0], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f00');
			expect(rgbToHex([0, 255, 0], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0f0');
			expect(rgbToHex([0, 255, 255], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0ff');
			expect(rgbToHex([255, 123, 0], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#ff7b00');
			expect(rgbToHex([255, 123, 0, 1], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#ff7b00ff');
			//
			expect(rgbToHex([0, 0, 0, 1], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#000f');
			expect(rgbToHex([255, 0, 0, .5], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#ff000080');
			expect(rgbToHex([0, 255, 0, 0], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0f00');
			expect(rgbToHex([0, 255, 255, .1], { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#00ffff1a');
		});
	});

	describe('Object (short form)', () => {
		it('Returns `null` in case of invalid input', () => {
			expect(rgbToHex({ r: -1, g: 0, b: 0 })).toBeNull();
			expect(rgbToHex({ r: Infinity, g: 0, b: 0, a: 1 })).toBeNull();
			/* @ts-expect-error -- Edge case */
			expect(rgbToHex({ r: 1, a: 1 })).toBeNull();
			expect(rgbToHex({ r: 0, g: 0, b: 0, a: Infinity })).toBeNull();
			expect(rgbToHex({ r: 0.5, g: 0, b: 0, a: 1.1 })).toBeNull();
		});

		it('Adds alpha channel information if `alphaChannel` option value is `always` (default)', () => {
			expect(rgbToHex({ r: 255, g: 0, b: 0 }, { alphaChannel: 'always' })).toBe('#ff0000ff');
			expect(rgbToHex({ r: 0, g: 255, b: 0 }, { alphaChannel: 'always' })).toBe('#00ff00ff');
			expect(rgbToHex({ r: 0, g: 0, b: 255 }, { alphaChannel: 'always' })).toBe('#0000ffff');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 1 }, { alphaChannel: 'always' })).toBe('#ff0000ff');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: .5 }, { alphaChannel: 'always' })).toBe('#ff000080');
			//
			expect(rgbToHex({ r: 255, g: 0, b: 0 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f00f');
			expect(rgbToHex({ r: 0, g: 255, b: 0 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#0f0f');
			expect(rgbToHex({ r: 0, g: 0, b: 255 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#00ff');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 1 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f00f');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: .5 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#ff000080');
		});

		it('Removes alpha channel information if `alphaChannel` option value is `never`', () => {
			expect(rgbToHex({ r: 255, g: 0, b: 0 }, { alphaChannel: 'never' })).toBe('#ff0000');
			expect(rgbToHex({ r: 0, g: 255, b: 0 }, { alphaChannel: 'never' })).toBe('#00ff00');
			expect(rgbToHex({ r: 0, g: 0, b: 255 }, { alphaChannel: 'never' })).toBe('#0000ff');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 1 }, { alphaChannel: 'never' })).toBe('#ff0000');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: .5 }, { alphaChannel: 'never' })).toBe('#ff0000');
			//
			expect(rgbToHex({ r: 255, g: 0, b: 0 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#f00');
			expect(rgbToHex({ r: 0, g: 255, b: 0 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#0f0');
			expect(rgbToHex({ r: 0, g: 0, b: 255 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#00f');
			expect(rgbToHex({ r: 255, g: 123, b: 0, a: 1 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#ff7b00');
		});

		it('Conditionally adds/removes alpha channel information if `alphaChannel` option value is `if-presented`', () => {
			expect(rgbToHex({ r: 255, g: 0, b: 0 }, { alphaChannel: 'if-presented' })).toBe('#ff0000');
			expect(rgbToHex({ r: 0, g: 255, b: 0 }, { alphaChannel: 'if-presented' })).toBe('#00ff00');
			expect(rgbToHex({ r: 0, g: 0, b: 255 }, { alphaChannel: 'if-presented' })).toBe('#0000ff');
			//
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 1 }, { alphaChannel: 'if-presented' })).toBe('#ff0000ff');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: .5 }, { alphaChannel: 'if-presented' })).toBe('#ff000080');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 0 }, { alphaChannel: 'if-presented' })).toBe('#ff000000');
			// //
			expect(rgbToHex({ r: 255, g: 0, b: 0 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f00');
			expect(rgbToHex({ r: 0, g: 255, b: 0 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0f0');
			expect(rgbToHex({ r: 0, g: 0, b: 255 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#00f');
			//
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 1 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f00f');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: .5 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#ff000080');
			expect(rgbToHex({ r: 255, g: 0, b: 0, a: 0 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f000');
		});
	});

	describe('Object (long form)', () => {
		it('Returns `null` in case of invalid input', () => {
			expect(rgbToHex({ red: -1, green: 0, blue: 0 })).toBeNull();
			expect(rgbToHex({ red: Infinity, green: 0, blue: 0, alpha: 1 })).toBeNull();
			/* @ts-expect-error -- Edge case */
			expect(rgbToHex({ red: 1, alpha: 1 })).toBeNull();
			expect(rgbToHex({ red: 0, green: 0, blue: 0, alpha: Infinity })).toBeNull();
			expect(rgbToHex({ red: 0.5, green: 0, blue: 0, alpha: 1.1 })).toBeNull();
		});

		it('Adds alpha channel information if `alphaChannel` option value is `always` (default)', () => {
			expect(rgbToHex({ red: 255, green: 0, blue: 0 }, { alphaChannel: 'always' })).toBe('#ff0000ff');
			expect(rgbToHex({ red: 0, green: 255, blue: 0 }, { alphaChannel: 'always' })).toBe('#00ff00ff');
			expect(rgbToHex({ red: 0, green: 0, blue: 255 }, { alphaChannel: 'always' })).toBe('#0000ffff');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 1 }, { alphaChannel: 'always' })).toBe('#ff0000ff');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: .5 }, { alphaChannel: 'always' })).toBe('#ff000080');
			//
			expect(rgbToHex({ red: 255, green: 0, blue: 0 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f00f');
			expect(rgbToHex({ red: 0, green: 255, blue: 0 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#0f0f');
			expect(rgbToHex({ red: 0, green: 0, blue: 255 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#00ff');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 1 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#f00f');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: .5 }, { alphaChannel: 'always', preferableNotation: 'short' })).toBe('#ff000080');
		});

		it('Removes alpha channel information if `alphaChannel` option value is `never`', () => {
			expect(rgbToHex({ red: 255, green: 0, blue: 0 }, { alphaChannel: 'never' })).toBe('#ff0000');
			expect(rgbToHex({ red: 0, green: 255, blue: 0 }, { alphaChannel: 'never' })).toBe('#00ff00');
			expect(rgbToHex({ red: 0, green: 0, blue: 255 }, { alphaChannel: 'never' })).toBe('#0000ff');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 1 }, { alphaChannel: 'never' })).toBe('#ff0000');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: .5 }, { alphaChannel: 'never' })).toBe('#ff0000');
			//
			expect(rgbToHex({ red: 255, green: 0, blue: 0 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#f00');
			expect(rgbToHex({ red: 0, green: 255, blue: 0 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#0f0');
			expect(rgbToHex({ red: 0, green: 0, blue: 255 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#00f');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 1 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#f00');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: .5 }, { alphaChannel: 'never', preferableNotation: 'short' })).toBe('#f00');
		});

		it('Conditionally adds/removes alpha channel information if `alphaChannel` option value is `if-presented`', () => {
			expect(rgbToHex({ red: 255, green: 0, blue: 0 }, { alphaChannel: 'if-presented' })).toBe('#ff0000');
			expect(rgbToHex({ red: 0, green: 255, blue: 0 }, { alphaChannel: 'if-presented' })).toBe('#00ff00');
			expect(rgbToHex({ red: 0, green: 0, blue: 255 }, { alphaChannel: 'if-presented' })).toBe('#0000ff');
			//
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 1 }, { alphaChannel: 'if-presented' })).toBe('#ff0000ff');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: .5 }, { alphaChannel: 'if-presented' })).toBe('#ff000080');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 0 }, { alphaChannel: 'if-presented' })).toBe('#ff000000');
			// //
			expect(rgbToHex({ red: 255, green: 0, blue: 0 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f00');
			expect(rgbToHex({ red: 0, green: 255, blue: 0 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#0f0');
			expect(rgbToHex({ red: 0, green: 0, blue: 255 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#00f');
			//
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 1 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f00f');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: .5 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#ff000080');
			expect(rgbToHex({ red: 255, green: 0, blue: 0, alpha: 0 }, { alphaChannel: 'if-presented', preferableNotation: 'short' })).toBe('#f000');
		});
	});
});
