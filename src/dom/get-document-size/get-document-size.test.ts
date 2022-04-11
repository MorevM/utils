import { getDocumentSize } from './get-document-size';

describe('getDocumentSize', () => {
	it('Returns the document scroll width if `axis` argument value is `x`', () => {
		jest.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 3000);
		const result = getDocumentSize('x');

		expect(result).toBe(3000);
	});

	it('Returns the document scroll height if `axis` argument value is `y`', () => {
		jest.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);
		const result = getDocumentSize('y');

		expect(result).toBe(6000);
	});

	it('Returns the both values if `axis` argument value is `both`', () => {
		jest.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 3000);
		jest.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);
		const result = getDocumentSize('both');

		expect(result).toStrictEqual({ x: 3000, y: 6000 });
	});
});
