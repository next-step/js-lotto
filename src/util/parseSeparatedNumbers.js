import { SEPERATOR } from '../domain/constants/index.js';
import { validateNumber } from '../domain/validator.js';

export const parseSeparatedNumbers = (str) =>
  str.includes(SEPERATOR) ? str.split(SEPERATOR).map(Number) : [validateNumber(Number(str))];
