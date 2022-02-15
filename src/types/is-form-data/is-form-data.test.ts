import { isFormData } from './is-form-data';

describe('is-form-data', () => {
	it('Returns `true` if a given value is a `FormData` object', () => {
		expect(isFormData(new FormData())).toBe(true);
	});

	it('Returns `false` if a given value is not a `FormData` object', () => {
		expect(isFormData({})).toBe(false);
	});
});
