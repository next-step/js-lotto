import { SEPERATOR } from '../domain/constants/index.js';
export const splitString = (str) =>
  str.includes(SEPERATOR) ? str.split(SEPERATOR).map(Number) : [Number(str)];
