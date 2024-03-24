import { stripIndent } from './strip-indent';

describe('strip-indent', () => {
	it('Returns the string as is if there is no extra indentation and leading/trailing linebreaks', () => {
		expect(stripIndent('')).toBe('');
		expect(stripIndent('foo')).toBe('foo');
		expect(stripIndent('foo\n\t\t\tbar\n\nbar')).toBe('foo\n\t\t\tbar\n\nbar');
	});

	it('Removes leading/trailing linebreaks and lines containing only space\tab characters by default', () => {
		expect(stripIndent('\nfoo\n')).toBe('foo');
		expect(stripIndent('\n\t   \nfoo\n\t\t  \t\t\n')).toBe('foo');
	});

	it('Preserves leading linebreaks and lines containing only space\tab characters using `trimLeadingSpacings: false`', () => {
		expect(stripIndent('\nfoo\n', { trimLeadingSpacings: false })).toBe('\nfoo');
		expect(stripIndent('\n\t   \nfoo\n\t\t  \t\t\n', { trimLeadingSpacings: false })).toBe('\n\t   \nfoo');
	});

	it('Preserves trailing linebreaks and lines containing only space\tab characters using `trimTrailingSpacings: false`', () => {
		expect(stripIndent('\nfoo\n', { trimTrailingSpacings: false })).toBe('foo\n');
		expect(stripIndent('\n\t   \nfoo\n\t\t  \t\t\n', { trimTrailingSpacings: false })).toBe('foo\n\t\t  \t\t\n');
	});

	it('Removes extra indentation and linebreaks', () => {
		expect(stripIndent(`

			<div>
				<div></div>
			</div>

		`)).toBe('<div>\n\t<div></div>\n</div>');
	});

	it('Removes extra indentation and linebreaks considering extra spacings', () => {
		expect(stripIndent(`

			<div>
				<div></div>
				  <div></div>
						<div></div>
			</div>

		`)).toBe('<div>\n\t<div></div>\n\t  <div></div>\n\t\t\t<div></div>\n</div>');
	});

	it('Removes only extra indentation using `trim[X]Spacings: false`', () => {
		expect(stripIndent(`

			<div>
				<div></div>
			</div>

		`, { trimLeadingSpacings: false, trimTrailingSpacings: false })).toBe('\n\n<div>\n\t<div></div>\n</div>\n\n\t\t');
	});
});
