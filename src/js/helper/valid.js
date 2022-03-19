import { REGEXP_SPECIAL } from '../constants.js';

export const isNull = value => value === null || value === undefined;

export const isEquals = (target1, target2) => target1 === target2;

export const isSpecial = value => REGEXP_SPECIAL.test(value);
