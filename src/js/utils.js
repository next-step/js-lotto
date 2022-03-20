import { UNIT_AMOUNT } from './constants.js';

export function validateMultipleOf1000(amount) {
  if (amount % UNIT_AMOUNT) {
    return false;
  }

  return true;
}

export function getUniqueRandomNumbers(low, high, count) {
  const result = [];

  while (result.length < count) {
    const number = Math.floor(Math.random() * (high - low + 1)) + low;

    if (result.indexOf(number) > 0) continue;

    result.push(number);
  }

  return result;
}
