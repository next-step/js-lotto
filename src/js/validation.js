import { PRICE_INPUT_UNIT } from "./constants.js";
const canBeDivided = (inputNumber, unit) => {
  if (inputNumber <= 0) {
    return false;
  }
  return inputNumber % unit === 0;
};

const isNumber = (input) => {
  return typeof input === "number";
};

export const isValidPriceInput = (inputNumber) => {
  return isNumber(inputNumber) && canBeDivided(inputNumber, PRICE_INPUT_UNIT);
};
