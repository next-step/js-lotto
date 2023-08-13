import { SEPERATOR } from '../domain/constants/index.js';
export const stringSplitter = (str) =>
  str.includes(SEPERATOR) ? str.split(SEPERATOR).map(Number) : Number(str);
