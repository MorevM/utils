import { isObject } from '../../types/is-object/is-object';
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
});
