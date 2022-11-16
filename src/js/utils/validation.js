import { ERROR_MESSAGE, LOTTO } from '../constants/index.js';

const isPositiveNumber = (number) => number > 0;

const isZeroNumber = (number) => number === 0;

const isRemainderZero = (number, unit) => number % unit === 0;

const assert = (predicate, message) => {
  if (!predicate) {
    throw new Error(message);
  }
};

export const assertLottoPurchasePrice = (price) => {
  assert(!isZeroNumber(price), ERROR_MESSAGE.INVALID_ZERO_LOTTO_PRICE);
  assert(isPositiveNumber(price), ERROR_MESSAGE.INVALID_NEGATIVE_LOTTO_PRICE);
  assert(isRemainderZero(price, LOTTO.PRICE), ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
};
