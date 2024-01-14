import { isHex } from './is-hex';

describe('is-hex', () => {
	it('Returns `false` if a given value is not a string', () => {
		expect(isHex(undefined)).toBe(false);
		expect(isHex(null)).toBe(false);
		expect(isHex(new Date('foo'))).toBe(false);
		expect(isHex({ r: 255, g: 255, b: 255 })).toBe(false);
	});

	it('Returns `false` if a given value lacks leading `#`', () => {
		expect(isHex('000000')).toBe(false);
		expect(isHex('00000055')).toBe(false);
		expect(isHex('fff')).toBe(false);
		expect(isHex('fff5')).toBe(false);
	});

	it('Returns `false` if a given value is not a valid HEX in a short form', () => {
		expect(isHex('#00055')).toBe(false);
		expect(isHex('#000zz')).toBe(false);
		expect(isHex('#000AA')).toBe(false);
	});

	it('Returns `false` if a given value is not a valid HEX in a long form', () => {
		expect(isHex('#ffffff5')).toBe(false);
		expect(isHex('#ffffffa')).toBe(false);
		expect(isHex('#ffffffA')).toBe(false);
		expect(isHex('#ffffffag')).toBe(false);
	});

	it('Returns `true` if a given value is a valid HEX in a short form', () => {
		expect(isHex('#000')).toBe(true);
		expect(isHex('#f001')).toBe(true);
		expect(isHex('#f00a')).toBe(true);
		expect(isHex('#f00f')).toBe(true);
		expect(isHex('#F001')).toBe(true);
		expect(isHex('#F00A')).toBe(true);
		expect(isHex('#F00F')).toBe(true);
	});

	it('Returns `true` if a given value is a valid HEX in a long form', () => {
		expect(isHex('#000000')).toBe(true);
		expect(isHex('#ffffffa5')).toBe(true);
		expect(isHex('#ffffff55')).toBe(true);
		expect(isHex('#FFFFFFA5')).toBe(true);
		expect(isHex('#FFFFFF55')).toBe(true);
	});
});
