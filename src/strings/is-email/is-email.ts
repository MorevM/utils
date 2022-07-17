/**
 * Checks whether a given string is a valid email.
 *
 * @param   str   The value being evaluated.
 *
 * @returns         Whether the value is a valid email address
 */
export const isEmail = (str: string): boolean =>
	// eslint-disable-next-line unicorn/no-unsafe-regex
	/^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-zЁА-яё-]+\.)+[A-Za-zЁА-яё]{2,}))$/.test(str);
