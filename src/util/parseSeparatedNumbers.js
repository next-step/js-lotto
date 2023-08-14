import { SEPERATOR } from '../domain/constants/index.js';
export const parseSeparatedNumbers = (str) =>
  str.includes(SEPERATOR) ? str.split(SEPERATOR).map(Number) : [Number(str)];
