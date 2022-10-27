/* eslint-disable regexp/no-unused-capturing-group, no-autofix/regexp/no-unused-capturing-group  -- It's better here for "readability" :D */
/**
 * Checks whether a given string is a valid email.
 *
 * @param   str   The value being evaluated.
 *
 * @returns       Whether the value is a valid email address
 */
export const isEmail = (str: string): boolean =>
	// eslint-disable-next-line unicorn/no-unsafe-regex
	/^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d\-A-Za-zЁА-яё]+\.)+[A-Za-zЁА-яё]{2,}))$/.test(str);
