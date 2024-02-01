import { padStart } from '../../strings';

export const TOKEN = /H{1,2}|L{1,4}|M{1,4}|X{1,3}|_L{3,4}|_M{3,4}|_c{3,4}|_e{3,4}|c{1,4}|d{1,2}|e{1,4}|h{1,2}|m{1,2}|s{1,2}|yy(?:yy)?|\[[^\]]*]/g;
export const ORDERED_DAY_INDICES = [0, 1, 2, 3, 4, 5, 6];
export const pad = (value: string | number, length: number = 2) => padStart(value, length, '0');
