import { PRICE_INPUT_UNIT } from "./constants.js";

export const isValidPriceInput = (inputNumber) => {
  if (inputNumber <= 0) {
    return false;
  }
  return (
    typeof inputNumber === "number" && inputNumber % PRICE_INPUT_UNIT === 0
  );
};
