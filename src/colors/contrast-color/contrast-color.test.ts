/**
 * Well, it's not a fair test - it can't be done on values,
 * so the tests are written to match popular contrast checkers,
 * and some values are picked by eye.
 */
import { contrastColor } from './contrast-color';

describe('contrast-color', () => {
	it('Calculates right contrast color using defaults (black and white)', () => {
		expect(contrastColor('#f00')).toBe('#000000');
		expect(contrastColor('#0f0')).toBe('#000000');
		expect(contrastColor('#00f')).toBe('#ffffff');
		expect(contrastColor('#fafafa')).toBe('#000000');
		expect(contrastColor('#949494')).toBe('#000000');
		expect(contrastColor('#707070')).toBe('#ffffff');
	});

	it('Respects `preferableNotation` option', () => {
		expect(contrastColor('#f00', null, { preferableNotation: 'short' })).toBe('#000');
		expect(contrastColor('#0f0', null, { preferableNotation: 'short' })).toBe('#000');
		expect(contrastColor('#00f', null, { preferableNotation: 'short' })).toBe('#fff');
	});

	it('Calculates right contrast color using non-default colors', () => {
		expect(contrastColor('#f00', ['#0000ff', '#fff'])).toBe('#ffffff');
		//
		expect(contrastColor('#f00', ['#0000ff', '#fff'], { preferableNotation: 'preserve' })).toBe('#fff');
		expect(contrastColor('#f00', ['#0000ff', '#fff'], { preferableNotation: 'short' })).toBe('#fff');
		expect(contrastColor('#f00', ['#0000ff', '#fafafa'], { preferableNotation: 'short' })).toBe('#fafafa');
	});

	it('Ignores an alpha channel information since the background color is unknown', () => {
		expect(contrastColor('#ff000000', ['#0000ff80', '#ffffffff'])).toBe('#ffffff');
		expect(contrastColor('#ff000000', ['#0000ff80', '#ffffffff'], { preferableNotation: 'short' })).toBe('#fff');
	});
});
