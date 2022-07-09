import { ERROR_MESSAGE, MAX_PRICE, MIN_PRICE } from "../constants/index.js";

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