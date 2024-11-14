/* eslint-disable regexp/no-unused-capturing-group  -- It's better here for "readability" :D */
import { isString } from '../is-string/is-string';

/**
 * Checks whether a given string is a valid email.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a valid email address.
 */
export const isEmail = (value: unknown): value is string =>
	isString(value) && /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d\-A-Za-zЁА-яё]+\.)+[A-Za-zЁА-яё]{2,}))$/.test(value);
