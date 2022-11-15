import { ERROR_MESSAGE, LOTTO } from '../constants/index.js';

const isPositiveNumber = (number) => number > 0;

const isZeroNumber = (number) => number === 0;

const isRemainderZero = (number, unit) => number % unit === 0;

export const isInvalidLottoPurchasePrice = (lottoPurchasePrice) => {
  if (isZeroNumber(lottoPurchasePrice)) {
    throw Error(ERROR_MESSAGE.INVALID_ZERO_LOTTO_PRICE);
  }

  if (!isPositiveNumber(lottoPurchasePrice)) {
    throw Error(ERROR_MESSAGE.INVALID_NEGATIVE_LOTTO_PRICE);
  }

  if (!isRemainderZero(lottoPurchasePrice, LOTTO.PRICE)) {
    throw Error(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
  }
};
