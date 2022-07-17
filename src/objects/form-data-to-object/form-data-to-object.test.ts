import { isObject } from '../../guards/is-object/is-object';
import { formDataToObject } from './form-data-to-object';

describe('form-data-to-object', () => {
	it('Returns empty object for empty `FormData` given', () => {
		const formData = new FormData();

		expect(formDataToObject(formData)).toStrictEqual({});
	});

	it('Returns plain object builded from given `FormData`', () => {
		const formData = new FormData();
		formData.append('string', 'string');
		formData.append('another_one', 'another');

		const plainObject = formDataToObject(formData);

		expect(isObject(plainObject)).toBe(true);
		expect(plainObject).toStrictEqual({ string: 'string', another_one: 'another' });
	});

	it('Returns plain object builded from given `FormData` considering repeating fields (assume `input type="file" multiple`)', () => {
		const formData = new FormData();
		formData.append('string', 'string');
		formData.append('FILES[]', 'pseudo-file 1');
		formData.append('FILES[]', 'pseudo-file 2');

		const plainObject = formDataToObject(formData);

		expect(isObject(plainObject)).toBe(true);
		expect(plainObject).toStrictEqual({ 'string': 'string', 'FILES[]': ['pseudo-file 1', 'pseudo-file 2'] });
	});
});
