/**
 * Checks whether a given string is a valid email.
 *
 * @param   str   The value being evaluated.
 *
 * @returns         Whether the value is a valid email address
 */
export const isEmail = (str: string): boolean =>
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яА-ЯёЁ\-0-9]+\.)+[a-zA-Zа-яА-ЯёЁ]{2,}))$/.test(str); // eslint-disable-line
