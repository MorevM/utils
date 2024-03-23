import { getDocumentSize } from './get-document-size';

describe('get-document-size', () => {
	beforeEach(() => {
		vi.spyOn(document.body, 'scrollWidth', 'get').mockImplementation(() => 3000);
		vi.spyOn(document.body, 'scrollHeight', 'get').mockImplementation(() => 6000);
	});

	it('Returns the document scroll width if `axis` argument value is `x`', () => {
		expect(getDocumentSize('x')).toBe(3000);
	});

	it('Returns the document scroll height if `axis` argument value is `y`', () => {
		expect(getDocumentSize('y')).toBe(6000);
	});

	it('Returns the both values if `axis` argument value is `both`', () => {
		expect(getDocumentSize('both')).toStrictEqual({ x: 3000, y: 6000 });
	});

	it('Returns the document scroll height if `axis` argument is omitted', () => {
		expect(getDocumentSize()).toBe(6000);
	});
});
