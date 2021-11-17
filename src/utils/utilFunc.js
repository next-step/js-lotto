import { ERROR_MESSAGE } from "./constants.js";

export const isValidPrice = (price) => {
  if (price === "") {
    alert(ERROR_MESSAGE.EMPTY_PRICE);
    return false;
  }
  if (price < 1000 || 100000 < price) {
    alert(ERROR_MESSAGE.OUT_OF_AMOUNT_RANGE);
    return false;
  }
  if (price % 1000 !== 0) {
    alert(ERROR_MESSAGE.NOT_IN_UNITS_OF);
    return false;
  }
  return true;
};

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandomNumbers = () => {
  const newLottoNumbers = Array.from({ length: 6 }, () => {
    return generateRandomNumber(1, 99);
  });
  return newLottoNumbers;
};
