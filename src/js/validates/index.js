import { ERROR_MESSAGE, MAX_LOTTO_NUMBER, MAX_PRICE, MIN_LOTTO_NUMBER, MIN_PRICE } from "../constants/index.js";
import { winningNumber } from "../store/index.js";

export const validatePrice = (inputValue) => {
  if (inputValue < MIN_PRICE) {
    throw ERROR_MESSAGE.MIN_PRICE_MESSAGE;
  }
  if (inputValue > MAX_PRICE) {
    throw ERROR_MESSAGE.MAX_PRICE_MESSAGE;
  }
  if (inputValue % MIN_PRICE !== 0) {
    throw ERROR_MESSAGE.INVALID_PRICE;
  }
}

export const validateWinningNumber = () => {
  const lottoSet = new Set(winningNumber);
  if (winningNumber.length !== 7) {
    throw ERROR_MESSAGE.REQUIRED_WINNING_AND_BONUS_NUMBER;
  }
  if (winningNumber.length !== lottoSet.size) {
    throw ERROR_MESSAGE.DUPLICATED_MESSAGE
  }
  winningNumber.forEach((number) => {
    if (number > MAX_LOTTO_NUMBER) {
      throw ERROR_MESSAGE.MAX_LOTTO_NUMBER
    }
    if (number < MIN_LOTTO_NUMBER) {
      throw ERROR_MESSAGE.MIN_LOTTO_NUMBER
    }
  })
}
